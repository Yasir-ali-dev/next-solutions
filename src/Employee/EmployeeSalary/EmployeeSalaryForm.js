import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Form } from "react-bootstrap";
import EmployeeHeader from "../../components/EmployeeHeader";

const EmployeeSalaryForm = () => {
  const [employeeSalary, setEmployeeSalary] = useState({
    employee_username: "",
    effectiveFromDate: Date,
    creationDate: new Date(),
    currentSalary: Number,
    newSalary: Number,
    changeAmount: Number,
    changePercentage: Number,
  });
  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeesInfo/"
      );
      const data = response.data;
      setEmployees(data.allEmployeesInfo);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const navigate = useNavigate();
  const createEmployeeDesignation = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/employeeSalaries",
        employeeSalary
      );
      if (response.status === 201) {
        toast.success(
          `${response.data.newEmployeeSalary.employeeInfo} salary is created `
        );
      }
      setTimeout(() => {
        navigate("/hr/employeeSalaries/");
      }, [2500]);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const emp = employees.find(
      (emp) => emp.username === employeeSalary.employee_username
    );
    if (name === "effectiveFromDate") {
      setEmployeeSalary((prevPayElements) => {
        return {
          ...prevPayElements,
          [name]: type === "checkbox" ? checked : value,
          lastIncrementId:
            emp.employeeSalary[emp.employeeSalary.length - 1] || "",
        };
      });
    } else {
      setEmployeeSalary((prevPayElements) => {
        return {
          ...prevPayElements,
          [name]: type === "checkbox" ? checked : value,
        };
      });
    }
  };

  return (
    <div className="ubuntu ">
      <EmployeeHeader title={"Employee Salary Form"} />
      <Form
        onSubmit={createEmployeeDesignation}
        className="d-flex gap-4 mx-5 flex-wrap justify-content-evenly align-items-center py-3"
      >
        <div className="d-flex gap-2">
          <p>
            <sup className="star">*</sup>Employee
          </p>
          <div>
            <select
              type="select"
              className="px-1 mx-2 form-width py-2"
              name="employee_username"
              onChange={handleChange}
              required
              value={employeeSalary.employee_username}
            >
              <option value=""></option>
              {employees.map((_, index) => {
                return (
                  <option key={index} value={_.username}>
                    {_.username}
                  </option>
                );
              })}
            </select>
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
              value={employeeSalary.effectiveFromDate}
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

        <button className="btn-custom my-1 mx-5 mt-2" type="submit">
          Create Employee Salary
        </button>
        <Toaster position="top-right" />
      </Form>
    </div>
  );
};

export default EmployeeSalaryForm;
