/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import {
  deleteFromLocalStorage,
  getDataFromLocalStorage,
  uniqueIdGenerator,
} from "../utils/comonFunction";
import TableActionButton from "../common/TableActionButton";
import ViewEmployee from "../components/ViewEmployee";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  const [form] = Form.useForm();

  useEffect(() => {
    getDataFromLocalStorage("employeeList", setEmployeeList);
    getDataFromLocalStorage("taskAssignList", setTaskList);
  }, [
    localStorage.getItem("employeeList"),
    localStorage.getItem("taskAssignList"),
  ]);

  const handleOk = async () => {
    await form.validateFields();
    const data = form.getFieldsValue(true);

    // if uniqueId already exists, update the existing record
    if (data.uniqueId) {
      const newEmployeeList = employeeList.map((item) => {
        if (item.uniqueId === data.uniqueId) {
          return {
            ...data,
            label: data.name,
            value: data.uniqueId,
          };
        }
        return item;
      });

      localStorage.setItem("employeeList", JSON.stringify(newEmployeeList));

      // change task list in assign task form
      const modifiedTaskList = taskList.map((item) => {
        if (item.employee.uniqueId === data.uniqueId) {
          return {
            ...item,
            employee: {
              ...data,
              label: data.name,
              value: data.uniqueId,
            },
          };
        }
        return item;
      });
      localStorage.setItem("taskAssignList", JSON.stringify(modifiedTaskList));
    } else {
      // if uniqueId does not exist, create a new record
      const uniqueId = uniqueIdGenerator("employeeList");
      const newData = {
        ...data,
        uniqueId: uniqueId,
        label: data.name,
        value: uniqueId,
      };
      employeeList.push(newData);
      localStorage.setItem("employeeList", JSON.stringify(employeeList));
    }
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 200,
      key: "action",
      render: (text, record) => (
        <span>
          <TableActionButton
            type="view"
            onClick={() => {
              setSelectedEmployee(record);
            }}
          />
          <TableActionButton
            type="edit"
            onClick={() => {
              setIsModalOpen(true);
              form.setFieldsValue(record);
            }}
          />
          <TableActionButton
            type="delete"
            onClick={() => {
              deleteFromLocalStorage("employeeList", record, setEmployeeList);
              const newTaskList = taskList.filter(
                (item) => item.employee.uniqueId !== record.uniqueId
              );
              localStorage.setItem(
                "taskAssignList",
                JSON.stringify(newTaskList)
              );
            }}
          />
        </span>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl text-center">Employee List</h1>
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white  px-2 py-2 rounded-md mb-2"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Create Employee
          </button>
        </div>
      </div>

      <Table
        dataSource={employeeList}
        columns={columns}
        bordered
        pagination={false}
      />

      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        <EmployeeForm form={form} onOk={handleOk} onCancel={handleCancel} />
      </Modal>

      <Modal
        open={selectedEmployee?.uniqueId}
        onCancel={() => {
          setSelectedEmployee({});
        }}
        footer={false}
      >
        <ViewEmployee employee={selectedEmployee} />
      </Modal>
    </div>
  );
};

export default EmployeeList;
