import { Form, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";

const TaskPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    name: "",
  });
  const [tasklist, setTasklist] = useState([]);

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
      console.log(newTaskList);
      localStorage.setItem("tasklist", JSON.stringify(newTaskList));
      setTasklist(newTaskList);
      form.resetFields();
      setIsModalOpen(false);
      return;
    } else {
      const uniqueId =
        tasklist.sort((a, b) => b.uniqueId - a.uniqueId)[0]?.uniqueId || 0;
      const newData = { ...data, uniqueId: uniqueId + 1 };
      tasklist.push(newData);
      localStorage.setItem("tasklist", JSON.stringify(tasklist));
      form.resetFields();
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
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
              const tasklist =
                JSON.parse(localStorage.getItem("tasklist")) || [];
              const newTaskList = tasklist.filter(
                (item) => item.uniqueId !== record.uniqueId
              );
              localStorage.setItem("tasklist", JSON.stringify(newTaskList));
              setTasklist(newTaskList);
            }}
          >
            Delete
          </button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    const tasklist = JSON.parse(localStorage.getItem("tasklist")) || [];
    setTasklist(tasklist);
  }, [localStorage.getItem("tasklist")]);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl text-center">Lask List</h1>
        {/* // create emploee button  */}
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              setIsModalOpen(true);
              form.resetFields({
                name: "",
                id: "",
                designation: "",
                email: "",
                phone: "",
              });
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
        <TaskForm
          form={form}
          onOk={handleOk}
          onCancel={handleCancel}
          initData={employeeData}
        />
      </Modal>
    </div>
  );
};

export default TaskPage;
