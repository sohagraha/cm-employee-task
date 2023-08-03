import { EditTwoTone, EyeTwoTone } from "@ant-design/icons";
import DeletePopover from "./DeletePopover";
/* eslint-disable react/prop-types */
const TableActionButton = ({ type, onClick }) => {
  if (type === "view") {
    return (
      <button
        className="text-green-500 px-2 py-2 rounded-md"
        onClick={onClick ? onClick : () => {}}
      >
        <EyeTwoTone />
      </button>
    );
  } else if (type === "edit") {
    return (
      <button
        className="text-green-500 px-2 py-2 rounded-md"
        onClick={onClick ? onClick : () => {}}
      >
        <EditTwoTone />
      </button>
    );
  } else if (type === "delete") {
    return (
      <button className="text-red-500 px-2 py-2 rounded-md">
        <DeletePopover onDelete={onClick} />
      </button>
    );
  }
};
export default TableActionButton;
