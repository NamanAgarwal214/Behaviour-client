import React from "react";

const ListItem = ({ item, setOldVal, setEdit, setImp, deleteHandler }) => {
  return (
    <div className="list my-3 mx-3 d-flex flex-column justify-content-center align-items-center">
      <div className="p-4">{item}</div>
      <div className="d-flex button justify-content-center align-items-center">
        <button
          className="butn"
          onClick={() => {
            setOldVal(item);
            setImp(item);
            setEdit(true);
          }}
        >
          Edit
        </button>
        <button className="butn" onClick={() => deleteHandler(item)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListItem;
