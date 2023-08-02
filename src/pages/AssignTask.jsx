import { Form, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import AssignTaskForm from "../components/AssignTaskForm";

const AssignTaskPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignTaskData, setAssignTaskData] = useState({
    name: "",
  });
  const [taskassignlist, setTasklist] = useState([]);

  const handleOk = async () => {
    await form.validateFields();
    const data = form.getFieldsValue(true);
    console.log(data);
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
      setTasklist(newTasAssignList);
      form.resetFields();
      setIsModalOpen(false);
      return;
    } else {
      const uniqueId =
        taskassignlist.sort((a, b) => b.uniqueId - a.uniqueId)[0]?.uniqueId ||
        0;
      const newData = { ...data, uniqueId: uniqueId + 1 };
      taskassignlist.push(newData);
      localStorage.setItem("taskassignlist", JSON.stringify(taskassignlist));
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
              const taskassignlist =
                JSON.parse(localStorage.getItem("taskassignlist")) || [];
              const newTasAssignList = taskassignlist.filter(
                (item) => item.uniqueId !== record.uniqueId
              );
              localStorage.setItem(
                "taskassignlist",
                JSON.stringify(newTasAssignList)
              );
              setTasklist(newTasAssignList);
            }}
          >
            Delete
          </button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    const taskassignlist =
      JSON.parse(localStorage.getItem("taskassignlist")) || [];
    setTasklist(taskassignlist);
  }, [localStorage.getItem("taskassignlist")]);

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
        dataSource={taskassignlist}
        columns={columns}
        bordered
        pagination={false}
      />

      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        <AssignTaskForm
          form={form}
          onOk={handleOk}
          onCancel={handleCancel}
          initData={assignTaskData}
        />
      </Modal>
    </div>
  );
};

export default AssignTaskPage;
