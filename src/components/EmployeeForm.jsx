/* eslint-disable react/prop-types */
import { Button, Form } from "antd";
import CommonStaticForm from "../common/CommonStaticForm";

// eslint-disable-next-line react/prop-types
const EmployeeForm = ({ form, onOk, onCancel }) => {
  const isEdit = form.getFieldValue("uniqueId");

  const formFields = [
    {
      name: "name",
      label: "Name",
      rules: [
        {
          required: true,
          message: "Please Enter Employee Name",
        },
      ],
      type: "text",
      group: "input",
    },
    {
      name: "id",
      label: "ID",
      rules: [
        {
          required: true,
          message: "Please Enter Employee ID",
        },
      ],
      type: "text",
      group: "input",
    },
    {
      name: "designation",
      label: "Designation",
      rules: [
        {
          required: true,
          message: "Please Enter Employee Designation",
        },
      ],
      type: "text",
      group: "input",
    },
    {
      name: "email",
      label: "Email",
      rules: [
        {
          required: true,
          type: "email",
          message: "Please Enter Employee Email",
        },
      ],
      type: "email",
      group: "input",
    },
    {
      name: "phone",
      label: "Phone",
      rules: [
        {
          required: true,
          message: "Please Enter Employee Phone",
        },
      ],
      type: "number",
      group: "input",
    },
  ];

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">
        {isEdit ? "Edit Employee" : "Add Employee"}
      </h1>
      <Form form={form} layout="vertical">
        <CommonStaticForm formFields={formFields} form={form} />
        {/* cancle and submit button */}

        <div className="flex justify-end">
          <Button
            className="bg-red-500 text-white"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-green-500 text-white ml-2"
            onClick={() => {
              onOk();
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EmployeeForm;
