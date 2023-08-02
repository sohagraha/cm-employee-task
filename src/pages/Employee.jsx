import { Form, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import {
  deleteFromLocalStorage,
  getDataFromLocalStorage,
  uniqueIdGenerator,
} from "../utils/comonFunction";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getDataFromLocalStorage("employeeList", setEmployeeList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("employeeList")]);

  const handleOk = async () => {
    await form.validateFields();
    const data = form.getFieldsValue(true);

    // if uniqueId already exists, update the existing record
    if (data.uniqueId) {
      const newEmployeeList = employeeList.map((item) => {
        if (item.uniqueId === data.uniqueId) {
          return data;
        }
        return item;
      });

      localStorage.setItem("employeeList", JSON.stringify(newEmployeeList));
    } else {
      const uniqueId = uniqueIdGenerator("employeeList");
      const newData = { ...data, uniqueId: uniqueId };
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
      // eslint-disable-next-line no-unused-vars
      render: (text, record) => (
        <span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mx-2"
            onClick={() => {
              setIsModalOpen(true);
              form.setFieldsValue(record);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              deleteFromLocalStorage("employeeList", record, setEmployeeList);
            }}
          >
            Delete
          </button>
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
            className="bg-green-500 text-white px-4 py-2 rounded-md mb-2"
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
    </div>
  );
};

export default EmployeeList;
