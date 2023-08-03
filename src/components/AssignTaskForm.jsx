/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import CommonStaticForm from "../common/CommonStaticForm";
import { getDataFromLocalStorage } from "../utils/comonFunction";

const AssignTaskForm = ({ form, onOk, onCancel }) => {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    getDataFromLocalStorage("employeeList", setEmployeeList);
  }, [localStorage.getItem("employeeList")]);

  const isEdit = form.getFieldValue("uniqueId");

  const formFields = [
    {
      name: "employee",
      label: "Employee",
      rules: [
        {
          required: true,
          message: "Please Select Employee",
        },
      ],
      group: "select",
      options: employeeList,
    },
    // {
    //   name: "task",
    //   label: "Task",
    //   rules: [
    //     {
    //       required: true,
    //       message: "Please input the title of collection!",
    //     },
    //   ],
    //   group: "select",
    //   options: taskList,
    // },
    {
      name: "task",
      label: "Task",
      rules: [
        {
          required: true,
          message: "Please Enter Task Name",
        },
      ],
      group: "input",
    },
  ];

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">
        {isEdit ? "Edit Assigned Task" : "Assign Task"}
      </h1>
      <Form form={form} layout="vertical">
        <CommonStaticForm formFields={formFields} form={form} />
        {/* cancle and submit button */}
        <div className="flex justify-end">
          <Button
            className="bg-red-500 text-white hover:text-white"
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

export default AssignTaskForm;
