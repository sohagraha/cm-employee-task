import { Form, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import {
  deleteFromLocalStorage,
  getDataFromLocalStorage,
  uniqueIdGenerator,
} from "../utils/comonFunction";

const TaskPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasklist, setTasklist] = useState([]);
  useEffect(() => {
    getDataFromLocalStorage("tasklist", setTasklist);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("tasklist")]);

  const [form] = Form.useForm();

  const handleOk = async () => {
    await form.validateFields();
    const data = form.getFieldsValue(true);
    const tasklist = JSON.parse(localStorage.getItem("tasklist")) || [];

    if (data.uniqueId) {
      const newTaskList = tasklist.map((item) => {
        if (item.uniqueId === data.uniqueId) {
          return data;
        }
        return item;
      });
      localStorage.setItem("tasklist", JSON.stringify(newTaskList));
    } else {
      const uniqueId = uniqueIdGenerator("tasklist");
      const newData = { ...data, uniqueId: uniqueId, createtedAt: new Date() };
      tasklist.push(newData);
      localStorage.setItem("tasklist", JSON.stringify(tasklist));
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
              deleteFromLocalStorage("tasklist", record, setTasklist);
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
        <h1 className="text-2xl text-center">Task List</h1>
        {/* // create emploee button  */}
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mb-2"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Create Task
          </button>
        </div>
      </div>

      <Table
        dataSource={tasklist}
        columns={columns}
        bordered
        pagination={false}
      />

      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        <TaskForm form={form} onOk={handleOk} onCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default TaskPage;
