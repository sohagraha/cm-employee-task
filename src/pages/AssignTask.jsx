/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import AssignTaskForm from "../components/AssignTaskForm";
import {
  deleteFromLocalStorage,
  getDataFromLocalStorage,
  uniqueIdGenerator,
} from "../utils/comonFunction";

const AssignTaskPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskassignlist, setTaskAssignlist] = useState([]);

  useEffect(() => {
    getDataFromLocalStorage("taskassignlist", setTaskAssignlist);
  }, [localStorage.getItem("taskassignlist")]);

  const [form] = Form.useForm();

  const handleOk = async () => {
    await form.validateFields();
    const data = form.getFieldsValue(true);
    const taskassignlist =
      JSON.parse(localStorage.getItem("taskassignlist")) || [];

    if (data.uniqueId) {
      const newTasAssignList = taskassignlist.map((item) => {
        if (item.uniqueId === data.uniqueId) {
          return data;
        }
        return item;
      });
      localStorage.setItem("taskassignlist", JSON.stringify(newTasAssignList));
      setTaskAssignlist(newTasAssignList);
    } else {
      const uniqueId = uniqueIdGenerator("taskassignlist");
      const newData = { ...data, uniqueId: uniqueId, createtedAt: Date.now() };
      taskassignlist.push(newData);
      localStorage.setItem("taskassignlist", JSON.stringify(taskassignlist));
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
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        return <span>{record.employee?.label}</span>;
      },
    },
    {
      title: "Task Name",
      dataIndex: "taskname",
      key: "taskname",
      render: (text, record) => {
        return <span>{record.task?.label}</span>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createtedAt",
      key: "createtedAt",
      render: (text) => <span>{new Date(text).toLocaleString()}</span>,
    },
    {
      title: "Action",
      key: "action",
      width: 200,
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
              deleteFromLocalStorage(
                "taskassignlist",
                record,
                setTaskAssignlist
              );
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
        <h1 className="text-2xl text-center">Assigned Employee List</h1>
        {/* // create emploee button  */}
        <div className="flex justify-end mb-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Assign Task
          </button>
        </div>
      </div>

      <Table
        dataSource={taskassignlist}
        columns={columns}
        bordered
        pagination={false}
      />

      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        <AssignTaskForm form={form} onOk={handleOk} onCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default AssignTaskPage;
