import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Form } from "react-bootstrap";
import EmployeeHeader from "../../components/EmployeeHeader";
import FormEditButtonsComponent from "../../components/FormEditButtonsComponent";

const EmployeeDesignationEdit = () => {
  const { employeeDesignation } = useLocation().state;
  const { id } = useParams();
  const navigate = useNavigate();
  const { designation } = employeeDesignation;
  const [employeeDesignations, setEmployeeDesignations] = useState({
    designation: designation,
  });
  console.log(designation);

  const handleEditEmployeeDesignation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/employeeDesignations/${id}`,
        employeeDesignations
      );
      if (response.status === 200) {
        toast.success("Designation is edited successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeeDesignations/");
      }, 2500);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  const handleDeleteEmployeeDesignation = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/employeeDesignations/${id}`
      );
      if (response.status === 200) {
        toast.success("Employee designation is deleted successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeeDesignations/");
      }, 2500);
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
    <div className="ubuntu bg" style={{ height: "100vh" }}>
      <EmployeeHeader title={"Employee Designation"} />
      <Form
        onSubmit={handleEditEmployeeDesignation}
        className="d-flex gap-4 mx-5 flex-wrap justify-content-evenly align-items-center flex-column py-3"
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
        <FormEditButtonsComponent
          handleDelete={handleDeleteEmployeeDesignation}
          renderTo={"/hr/employeeDesignations"}
        />
      </Form>
    </div>
  );
};

export default EmployeeDesignationEdit;
