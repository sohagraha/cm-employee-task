/* eslint-disable react/prop-types */
import { Button, Form } from "antd";
import CommonStaticForm from "../common/CommonStaticForm";

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
      <h1 className="text-center text-2xl font-bold mb-4">
        {isEdit ? "Edit Task" : "Add Task"}
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

export default TaskForm;
