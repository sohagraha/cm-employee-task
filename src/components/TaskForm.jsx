import { Button, Form, Input } from "antd";

// eslint-disable-next-line react/prop-types
const TaskForm = ({ form, onOk, onCancel }) => {
  return (
    <div>
      <h1 className="text-md font-bold text-center">
        {
          // eslint-disable-next-line react/prop-types
          form.getFieldValue("name") ? "Edit Task" : "Add Task"
        }
      </h1>
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>

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
