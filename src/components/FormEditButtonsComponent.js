import React from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const FormEditButtonsComponent = ({ handleDelete, renderTo }) => {
  return (
    <div className="d-flex gap-3 align-items-center justify-content-center">
      <div>
        <button type="submit" className="btn-custom my-1 mt-2">
          Apply Changes
        </button>
        <Toaster position="top-right" />
      </div>

      <div className="d-flex gap-3 justify-content-center">
        <button className="btn-custom-light my-1 mt-2" onClick={handleDelete}>
          Delete
        </button>
        <Toaster position="top-right" />

        <Link
          className="btn-custom mt-2 py-1 my-1"
          style={{ textDecoration: "none", height: "30px" }}
          to={renderTo}
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default FormEditButtonsComponent;
