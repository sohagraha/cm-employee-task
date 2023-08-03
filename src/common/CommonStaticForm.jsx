/* eslint-disable react/prop-types */
import { Checkbox, Form, Input, Select } from "antd";

const CommonForm = ({ formFields, form }) => {
  return (
    <div>
      {formFields?.map((field, index) => {
        if (field?.group === "input") {
          return (
            <Form.Item
              key={index}
              name={field?.name || "Undefined"}
              label={field?.label || ""}
              rules={field?.rules || false}
            >
              <Input type={field?.type || "text"} />
            </Form.Item>
          );
        } else if (field?.group === "select") {
          return (
            <Form.Item
              key={index}
              name={field?.name || "Undefined"}
              label={field?.label || ""}
              rules={field?.rules || false}
            >
              <Select
                options={field?.options || []}
                allowClear
                onChange={(value, option) => {
                  form?.setFieldsValue({
                    [field?.name]: option,
                  });
                }}
              />
            </Form.Item>
          );
        } else if (field?.group === "checkbox") {
          return (
            <Form.Item
              key={index}
              name={field?.name || "Undefined"}
              label={field?.label || ""}
              rules={field?.rules || false}
            >
              <Checkbox
                options={field?.options || []}
                onChange={(e) => {
                  form?.setFieldsValue({
                    [field?.name]: e.target.checked,
                  });
                }}
              />
            </Form.Item>
          );
        } else {
          return (
            <Form.Item
              key={index}
              name={field?.name || "Undefined"}
              label={field?.label || ""}
              rules={field?.rules || false}
            >
              <Input type={field?.type || "text"} />
            </Form.Item>
          );
        }
      })}
    </div>
  );
};

export default CommonForm;
