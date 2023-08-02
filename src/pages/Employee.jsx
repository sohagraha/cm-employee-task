import { Form, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";

const EmployeeList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    id: "",
    designation: "",
    email: "",
    phone: "",
  });
  const [employeeList, setEmployeeList] = useState([]);

  const handleOk = async () => {
    await form.validateFields();
    const data = form.getFieldsValue(true);
    const employeeList = JSON.parse(localStorage.getItem("employeeList")) || [];

    if (data.uniqueId) {
      const newEmployeeList = employeeList.map((item) => {
        if (item.uniqueId === data.uniqueId) {
          return data;
        }
        return item;
      });
      console.log(newEmployeeList);
      localStorage.setItem("employeeList", JSON.stringify(newEmployeeList));
      setEmployeeList(newEmployeeList);
      form.resetFields();
      setIsModalOpen(false);
      return;
    } else {
      const uniqueId =
        employeeList.sort((a, b) => b.uniqueId - a.uniqueId)[0]?.uniqueId || 0;
      const newData = { ...data, uniqueId: uniqueId + 1 };
      employeeList.push(newData);
      localStorage.setItem("employeeList", JSON.stringify(employeeList));
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
              const employeeList =
                JSON.parse(localStorage.getItem("employeeList")) || [];
              const newEmployeeList = employeeList.filter(
                (item) => item.uniqueId !== record.uniqueId
              );
              localStorage.setItem(
                "employeeList",
                JSON.stringify(newEmployeeList)
              );
              setEmployeeList(newEmployeeList);
            }}
          >
            Delete
          </button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    const employeeList = JSON.parse(localStorage.getItem("employeeList")) || [];
    setEmployeeList(employeeList);
  }, [localStorage.getItem("employeeList")]);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl text-center">Employee List</h1>
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

      <Modal
        title={employeeData.id ? "Edit Employee" : "Create Employee"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <EmployeeForm
          form={form}
          onOk={handleOk}
          onCancel={handleCancel}
          initData={employeeData}
        />
      </Modal>
    </div>
  );
};

export default EmployeeList;
