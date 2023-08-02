import { Table } from "antd";

const dataSource = [
  {
    key: "1",
    name: "John Doe",
    id: "1525",
    designation: "Software Engineer",
    email: "email@gmail.com",
    phone: "01700000000",
  },
];

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
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mx-2">
          Edit
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
          Delete
        </button>
      </span>
    ),
  },
];

const EmployeeList = () => {
  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl text-center">Employee List</h1>
        {/* // create emploee button  */}
        <div className="flex justify-end">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Create Employee
          </button>
        </div>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={false}
      />
    </div>
  );
};

export default EmployeeList;
