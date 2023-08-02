import { message } from "antd";

// key: key of local storage record: record to be deleted setter: set state function
export const deleteFromLocalStorage = (key, record, setter) => {
    const employeeList =
        JSON.parse(localStorage.getItem(key)) || [];
    const newItemList = employeeList.filter(
        (item) => item.uniqueId !== record.uniqueId
    );
    localStorage.setItem(
        key,
        JSON.stringify(newItemList)
    );
    setter(newItemList);
    message.success("Deleted Successfully");
}

export const getDataFromLocalStorage = (key, setter) => {
    const itemList =
        JSON.parse(localStorage.getItem(key)) || [];
    setter(itemList);
}

export const uniqueIdGenerator = (key) => {
    const itemList =
        JSON.parse(localStorage.getItem(key)) || [];
    const uniqueId = itemList.sort((a, b) => b.uniqueId - a.uniqueId)[0]?.uniqueId || 0;
    return uniqueId + 1;
}



