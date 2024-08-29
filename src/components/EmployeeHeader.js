import React from "react";
import { Link } from "react-router-dom";

const EmployeeHeader = ({ btnText, renderTo, title }) => {
  return (
    <div className="py-1 px-2 d-flex justify-content-between align-items-center  form-heading-color">
      <h4 className="text-start">{title}</h4>
      {renderTo && (
        <Link to={renderTo} className="router-link-btn btn-custom">
          {btnText}
        </Link>
      )}
    </div>
  );
};

export default EmployeeHeader;
