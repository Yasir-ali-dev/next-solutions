import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const PayElementForm = () => {
  const [payElement, setPayElement] = useState({
    employee_username: "",
    element_type: "",
    processing_type: "non recurring",
    entry_type: "normal",
    start_date: Date,
    end_date: Date,
  });
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();
  const handleEmployeePayElement = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/employeePayElements",
        payElement
      );

      const newPayElement = response.data.newPayElement;

      if (response.status === 201) {
        toast.success(
          `${newPayElement.element_type} pay element type is created `
        );
      }
      setTimeout(() => {
        navigate("/hr/employeePayElements/");
      }, [2500]);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setPayElement((prevPayElements) => {
      return {
        ...prevPayElements,
        [name]: value,
      };
    });
  };
  return (
    <div className="ubuntu ">
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center   form-heading-color">
        <h4 className="text-start">Employee Type Form</h4>
      </div>
      <form className="d-flex gap-4 flex-wrap justify-content-evenly align-items-center py-3">
        <div className="d-flex ">
          <label htmlFor="element_type">
            <sup className="star">*</sup> Employee
          </label>

          <select
            name="employee_username"
            onChange={handleChange}
            className="px-1 mx-2 form-width py-2"
            required
          >
            <option value="" name="employee_username"></option>
            {employees.map((_, index) => {
              return (
                <option
                  key={_._id}
                  name="employee_username"
                  value={`${_.username}`}
                >
                  {_.username}
                </option>
              );
            })}
          </select>
        </div>

        <div className="d-flex ">
          <label htmlFor="element_type">
            <sup className="star">*</sup>Element Type
          </label>
          <input
            name="element_type"
            className="px-1 mx-2 form-width py-2"
            value={payElement.element_type}
            placeholder="Element Type"
            required
            onChange={handleChange}
          />
        </div>
        <div className="d-flex gap-3">
          <p>Processing Type</p>
          <div>
            <input
              type="radio"
              name="processing_type"
              onChange={handleChange}
              value={"recurring"}
              checked={payElement.processing_type === "recurring"}
            />
            <label htmlFor="recurring" className="ms-2">
              recurring
            </label>
            <input
              type="radio"
              name="processing_type"
              value={"non recurring"}
              className="ms-5"
              onChange={handleChange}
              checked={payElement.processing_type === "non recurring"}
            />
            <label htmlFor="non recurring" className="ms-2">
              {" "}
              non recurring
            </label>
          </div>
        </div>

        <div className="d-flex gap-3">
          <p>Element Type</p>
          <div>
            <input
              type="radio"
              name="entry_type"
              value={"normal"}
              onChange={handleChange}
              checked={payElement.entry_type === "normal"}
            />
            <label htmlFor="normal" className="ms-2">
              normal
            </label>
            <input
              type="radio"
              name="entry_type"
              value={"override"}
              className="ms-4"
              checked={payElement.entry_type === "override"}
              onChange={handleChange}
            />
            <label htmlFor="override" className="ms-2">
              {" "}
              override
            </label>
            <input
              type="radio"
              name="entry_type"
              value={"additional"}
              checked={payElement.entry_type === "additional"}
              onChange={handleChange}
              className="ms-4"
            />
            <label htmlFor="override" className="ms-2">
              {" "}
              additional
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="start_date">
            <sup className="star">*</sup>Start Date
          </label>
          <input
            name="start_date"
            className="px-1 mx-2 form-width py-2"
            type="date"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="end_date">
            <sup className="star">*</sup>End Date
          </label>
          <input
            name="end_date"
            className="px-1 mx-2 form-width py-2"
            type="date"
            required
            onChange={handleChange}
          />
        </div>
      </form>
      <button
        onClick={handleEmployeePayElement}
        className="btn-custom my-1 mx-5 mt-2"
        type="submit"
      >
        Create Employee Pay Element
      </button>
      <Toaster position="top-right" />
    </div>
  );
};

export default PayElementForm;
