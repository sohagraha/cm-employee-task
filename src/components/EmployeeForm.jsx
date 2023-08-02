/* eslint-disable react/prop-types */
import { Button, Form } from "antd";
import CommonForm from "../common/CommonForm";

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
          message: "Please input the title of collection!",
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
          message: "Please input the title of collection!",
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
          message: "Please input the title of collection!",
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
          message: "Please input the title of collection!",
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
          message: "Please input the title of collection!",
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
        <CommonForm formFields={formFields} form={form} />
        {/* cancle and submit button */}

        <div className="flex justify-end">
          <Button
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
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
