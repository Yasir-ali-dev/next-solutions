import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Form } from "react-bootstrap";
import EmployeeHeader from "../../components/EmployeeHeader";
import FormEditButtonsComponent from "../../components/FormEditButtonsComponent";

const EmployeeSalaryEdit = () => {
  const { EmployeeSalary } = useLocation().state;
  const [employeeSalary, setEmployeeSalary] = useState(EmployeeSalary);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEditEmployeeSalary = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/employeeSalaries/${id}`,
        employeeSalary
      );
      if (response.status === 200) {
        toast.success("salary is edited successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeeSalaries/");
      }, 2500);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  const handleDeleteEmployeeSalary = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/employeeSalaries/${id}`
      );
      if (response.status === 200) {
        toast.success("Employee salary is deleted successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeeSalaries/");
      }, 2500);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployeeSalary((prevPayElements) => {
      return {
        ...prevPayElements,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleNewSalary = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployeeSalary((prevPayElements) => {
      return {
        ...prevPayElements,
        [name]: type === "checkbox" ? checked : value,
        changeAmount: prevPayElements.newSalary - value,
        changePercentage: ((prevPayElements.newSalary - value) / value) * 100,
      };
    });
  };

  return (
    <div className="ubuntu bg" style={{ height: "100vh" }}>
      <EmployeeHeader
        title={"Employee Salary "}
        btnText={"Back"}
        renderTo={"/hr/employeeSalaries/"}
      />
      <Form
        onSubmit={handleEditEmployeeSalary}
        className="d-flex gap-4 mx-5 flex-wrap justify-content-evenly align-items-center py-3"
      >
        <div className="d-flex gap-2">
          <p>
            <sup className="star">*</sup>Employee
          </p>
          <div>
            <input
              type="text"
              className="px-1 mx-2 form-width py-2"
              onChange={handleChange}
              name="employeeInfo"
              value={employeeSalary.employeeInfo}
              readOnly
              disabled
            />
          </div>
        </div>

        <div className="d-flex gap-2">
          <p>New Salary</p>
          <div>
            <input
              type="number"
              className="px-1 mx-2 form-width py-2"
              name="newSalary"
              onChange={handleChange}
              value={employeeSalary.newSalary}
            />
          </div>
        </div>
        <div className="d-flex gap-2">
          <p>Current Salary</p>
          <div>
            <input
              type="number"
              className="px-1 mx-2 form-width py-2"
              name="currentSalary"
              onChange={handleNewSalary}
              value={employeeSalary.currentSalary}
            />
          </div>
        </div>

        <div className="d-flex gap-2">
          <p>Change Amount</p>
          <div>
            <input
              type="number"
              className="px-1 mx-2 form-width py-2"
              name="changeAmount"
              onChange={handleChange}
              placeholder="new salary - current salary"
              readOnly
              disabled
              value={employeeSalary.changeAmount}
            />
          </div>
        </div>
        <div className="d-flex gap-2">
          <p>Creation Date</p>
          <div>
            <input
              type="text"
              className="px-1 mx-2 form-width py-2"
              name="creationDate"
              onChange={handleChange}
              readOnly
              disabled
              value={employeeSalary.creationDate}
            />
          </div>
        </div>

        <div className="d-flex gap-2">
          <p>Change Percentage</p>
          <div>
            <input
              type="number"
              placeholder="new salary - current salary / 100"
              className="px-1 mx-2 form-width py-2"
              name="changePercentage"
              onChange={handleChange}
              readOnly
              disabled
              value={employeeSalary.changePercentage}
            />
          </div>
        </div>
        <div className="d-flex gap-2">
          <p>
            <sup className="star">*</sup>Effective From Date
          </p>
          <div>
            <input
              type="date"
              className="px-1 mx-2 form-width py-2"
              name="effectiveFromDate"
              onChange={handleChange}
              required
              value={
                employeeSalary.effectiveFromDate &&
                employeeSalary.effectiveFromDate.slice(0, 10)
              }
            />
          </div>
        </div>

        <div className="d-flex gap-2">
          <p>
            <sup className="star">*</sup>Last Increment Id
          </p>
          <div>
            <input
              type="text"
              className="px-1 mx-2 form-width py-2"
              name="lastIncrementId"
              onChange={handleChange}
              readOnly
              disabled
              value={employeeSalary.lastIncrementId}
            />
          </div>
        </div>
        <div className="d-flex gap-3 align-items-center justify-content-center">
          <div>
            <button type="submit" className="btn-custom my-1 mt-2">
              Apply Changes
            </button>
            <Toaster position="top-right" />
          </div>

          <div className="d-flex gap-3 justify-content-center">
            <button
              type="button"
              className="btn-custom-light my-1 mt-2"
              onClick={handleDeleteEmployeeSalary}
            >
              Delete
            </button>
            <Toaster position="top-right" />
            <Link
              className="btn-custom mt-2 py-1 my-1"
              style={{ textDecoration: "none", height: "30px" }}
              to={"/hr/employeeSalaries"}
            >
              Back
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EmployeeSalaryEdit;
