import React from "react";

const InputComponent = ({ title, value, handleChange }) => {
  return (
    <div className="d-flex align-items-center">
      <label className="text-capitalize">{title}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e)}
        className="mx-2 form-width-xs py-1 px-1"
        name={title}
      />
    </div>
  );
};

export default InputComponent;
