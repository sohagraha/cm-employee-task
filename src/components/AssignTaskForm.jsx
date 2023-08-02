import { Button, Form, Select } from "antd";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const AssignTaskForm = ({ form, onOk, onCancel }) => {
  const [employeeList, setEmployeeList] = useState([]);
  const [taskList, setTaskList] = useState([]);

  const getEmployeeList = () => {
    const employeeList = JSON.parse(localStorage.getItem("employeeList"));
    const modifiedEmployeeList = employeeList?.map((item) => {
      return {
        ...item,
        value: item.uniqueId,
        label: item.name,
      };
    });
    setEmployeeList(modifiedEmployeeList);
  };
  const getTaskList = () => {
    const taskList = JSON.parse(localStorage.getItem("tasklist"));
    const modifiedTaskList = taskList?.map((item) => {
      return {
        ...item,
        value: item.uniqueId,
        label: item.name,
      };
    });
    setTaskList(modifiedTaskList);
  };

  useEffect(() => {
    getEmployeeList();
    getTaskList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("employeeList"), localStorage.getItem("taskList")]);

  return (
    <div>
      <h1 className="text-md font-bold text-center">
        {
          // eslint-disable-next-line react/prop-types
          form.getFieldValue(true) ? "Edit Task" : "Add Task"
        }
      </h1>
      {/* ddl form  */}
      <Form form={form} layout="vertical">
        <Form.Item
          name="employee"
          label="Employee"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Select
            options={employeeList || []}
            onChange={(value, option) => {
              // eslint-disable-next-line react/prop-types
              form?.setFieldsValue({
                employee: option,
              });
            }}
          />
        </Form.Item>
        <Form.Item
          name="task"
          label="Task Name"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Select
            options={taskList || []}
            onChange={(value, option) => {
              // eslint-disable-next-line react/prop-types
              form?.setFieldsValue({
                task: option,
              });
            }}
          />
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

export default AssignTaskForm;
