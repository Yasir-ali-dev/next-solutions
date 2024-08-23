import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Form } from "react-bootstrap";
import EmployeeHeader from "../../components/EmployeeHeader";

const EmployeeDesignationForm = () => {
  const [employeeDesignations, setEmployeeDesignations] = useState({
    designation: "",
  });
  const navigate = useNavigate();
  const createEmployeeDesignation = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/employeeDesignations",
        employeeDesignations
      );
      console.log(response.data);

      const newDesignation = response.data.newEmployeeDesignation;
      if (response.status === 201) {
        toast.success(`${newDesignation.designation} is created `);
      }
      setTimeout(() => {
        navigate("/hr/employeeDesignations/");
      }, [2500]);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployeeDesignations((prevPayElements) => {
      return {
        ...prevPayElements,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  return (
    <div className="ubuntu ">
      <EmployeeHeader
        btnText={"Back"}
        renderTo={"/hr/employeeDesignations"}
        title={"Employee designation Form"}
      />
      <Form
        onSubmit={createEmployeeDesignation}
        className="d-flex gap-4 mx-5 flex-wrap justify-content-evenly align-items-center py-3"
      >
        <div className="d-flex gap-3">
          <p>
            <sup className="star">*</sup>Employee Designation
          </p>
          <div>
            <input
              type="text"
              className="px-1 mx-2 form-width py-2"
              name="designation"
              onChange={handleChange}
              value={employeeDesignations.designation}
              required
            />
          </div>
        </div>

        <button className="btn-custom my-1 mx-5 mt-2" type="submit">
          Create Employee Designation
        </button>
        <Toaster position="top-right" />
      </Form>
    </div>
  );
};

export default EmployeeDesignationForm;
