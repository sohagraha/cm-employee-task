/* eslint-disable react/prop-types */
import { Button, Form } from "antd";
import CommonForm from "../common/CommonForm";

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
];

// eslint-disable-next-line react/prop-types
const TaskForm = ({ form, onOk, onCancel }) => {
  const isEdit = form.getFieldValue("uniqueId");
  return (
    <div>
      <h1 className="text-md font-bold text-center">
        {isEdit ? "Edit Task" : "Add Task"}
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

export default TaskForm;
