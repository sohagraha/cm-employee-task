/* eslint-disable react/prop-types */
import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import CommonForm from "../common/CommonForm";

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

  const isEdit = form.getFieldValue("uniqueId");

  const formFields = [
    {
      name: "employee",
      label: "Employee",
      rules: [
        {
          required: true,
          message: "Please input the title of collection!",
        },
      ],
      group: "select",
      options: employeeList,
    },
    {
      name: "task",
      label: "Task",
      rules: [
        {
          required: true,
          message: "Please input the title of collection!",
        },
      ],
      group: "select",
      options: taskList,
    },
  ];

  return (
    <div>
      <h1 className="text-md font-bold text-center">
        {isEdit ? "Edit Assigned Task" : "Assign Task"}
      </h1>
      {/* ddl form  */}
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

export default AssignTaskForm;
