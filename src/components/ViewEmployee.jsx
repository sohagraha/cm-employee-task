/* eslint-disable react/prop-types */
import { Descriptions } from "antd";

const ViewEmployee = ({ employee }) => {
  return (
    <div className="mt-2">
      <h1 className="text-md font-bold text-center mb-2">
        View Employee Details
      </h1>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Employee Name">
          {employee?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Employee Id">
          {employee?.id}
        </Descriptions.Item>
        <Descriptions.Item label="Designation">
          {employee.designation}
        </Descriptions.Item>
        <Descriptions.Item label="Email Address">
          {employee.email}
        </Descriptions.Item>
        <Descriptions.Item label="Phone No">{employee.phone}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ViewEmployee;
