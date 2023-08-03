/* eslint-disable react/prop-types */
import { DeleteOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useState } from "react";

const DeletePopover = ({ onDelete }) => {
  const [visible, setVisible] = useState(false);

  const handleDelete = () => {
    onDelete(); // Call the onDelete function to perform the actual delete operation
    setVisible(false); // Hide the popover after delete action
  };

  const handleCancel = () => {
    setVisible(false); // Hide the popover without performing the delete action
  };

  const content = (
    <div className="text-center">
      <p>Are you sure you want to delete this item?</p>
      <button
        className="bg-red-500 px-2 text-white mt-1"
        onClick={handleDelete}
      >
        Yes
      </button>
      <button
        className="border border-gray-500 px-2 text-gray-500 mt-1"
        style={{ marginLeft: 8 }}
        onClick={handleCancel}
      >
        No
      </button>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={visible}
      onOpenChange={setVisible}
    >
      <DeleteOutlined />
    </Popover>
  );
};

export default DeletePopover;
