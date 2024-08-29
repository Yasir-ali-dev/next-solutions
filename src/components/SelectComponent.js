import React from "react";

const SelectComponent = ({ title, values, value, handleChange, required }) => {
  return (
    <div className="d-flex align-items-center">
      <label className="text-capitalize">
        {required && <span className="star">* </span>} {title.replace("_", " ")}
      </label>
      <select
        name={title}
        value={value}
        onChange={(e) => handleChange(e)}
        className="mx-2 form-width-xs py-1"
        required={required}
      >
        <option value=""></option>
        {values.map((_, index) => {
          return (
            <option key={index} value={_}>
              {_}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectComponent;
