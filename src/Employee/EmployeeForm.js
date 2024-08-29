import React, { useEffect, useState } from "react";
import {  Form } from "react-bootstrap";
import "../index.css";
import {
  validNationalities,
  payrolls,
  workingStatuses,
} from "../utils/employeeData";
import EmployeeHeader from "../components/EmployeeHeader";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const navigate = useNavigate();
  function validateNationality(nationality) {
    const normalizedNationality = nationality.trim().toLowerCase();
    return validNationalities
      .map((n) => n.toLowerCase())
      .includes(normalizedNationality);
  }
  function validateCNIC(cnic) {
    const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
    return cnicPattern.test(cnic);
  }
  const [employees, setEmployees] = useState([]);
  const [employeesDesignation, setEmployeesDesignation] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [workCalender, setWorkCalender] = useState([]);
  const [employeeGrades, setEmployeeGrades] = useState([]);
  const [employeeJobs, setEmployeeJobs] = useState([]);
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeesInfo/"
      );
      const data = response.data;
      if (data) {
        setEmployees(data.allEmployeesInfo);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const fetchDesignations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeeDesignations/"
      );
      const data = response.data;
      setEmployeesDesignation(data.allEmployeeDesignations);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const fetchEmployeeTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeeTypes/"
      );
      const data = response.data;
      setEmployeeTypes(data.allEmployeeTypes);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const fetchWorkCalender = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/workCalenders/"
      );
      const data = response.data;
      setWorkCalender(data.workCalender);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const fetchEmployeeGrades = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeeGrades/"
      );
      const data = response.data;
      setEmployeeGrades(data.allEmployeeGrades);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const fetchEmployeeJobs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeeJobs/"
      );
      const data = response.data;
      setEmployeeJobs(data.allEmployeeJobs);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const [newEmployee, setNewEmployee] = useState({
    hired_date: "",
    name: "",
    username: "",
    birth_date: "",
    religion: "",
    cnic: "",
    guardian: "",
    gender: "male",
    role: "",
    nationality: "Pakistani",
    city: "",
    state: "",
    email: "",
    zipcode: "",
    phone: "",
    martial_status: "single",
    current_address: "",
    permanent_address: "",
    designation: "",
    department_name: "",
    employeeType: "",
    location_name: "",
    workCalander: "",
    payroll: "Monthly Payroll",
    working_status: "",
    employeeGrade: "",
    supervisor: "",
    is_sales_representative: false,
    is_delivery_man: false,
    report_to: "",
    shift: "morning",
    country: "",
    location_name: "",
    employeeJob: "",
  });
  const [availableDepartments, setAvailableDepartments] = useState([]);

  useEffect(() => {
    fetchEmployees();
    fetchDesignations();
    fetchEmployeeTypes();
    fetchWorkCalender();
    fetchEmployeeGrades();
    fetchEmployeeJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEmployee((prevPayElements) => {
      return {
        ...prevPayElements,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const regex = /^\+\d{1,3}\d{10}$/;
    const zipCodePattern = /^\d{5}(-\d{4})?$/;

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newEmployee.email)) {
      return toast.error("invalid email address");
    } else if (newEmployee.phone && !regex.test(newEmployee.phone)) {
      return toast.error("Invalid phone number");
    } else if (
      newEmployee.zipcode &&
      !zipCodePattern.test(newEmployee.zipcode)
    ) {
      return toast.error("invalid zipcode");
    } else if (!validateNationality(newEmployee.nationality)) {
      return toast.error("invalid nationality");
    } else if (newEmployee.cnic && !validateCNIC(newEmployee.cnic)) {
      return toast.error("invalid CNIC should be 'xxxxx-xxxxxx-x'");
    }
    console.log(newEmployee);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/employeesInfo",
        newEmployee
      );
      console.log(response.data);
      if (response.status === 201) {
        toast.success(`new employee is created `);
      }
      setTimeout(() => {
        navigate("/hr/employees/");
      }, [2500]);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  const handleEmployeeTypeChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEmployee((prevPayElements) => {
      return {
        ...prevPayElements,
        [name]: type === "checkbox" ? checked : value,
      };
    });

    const filteredDepartments = employeeTypes.filter(
      (department) => department.employeeType === value
    );
    setAvailableDepartments(filteredDepartments);
  };

  console.log(employeeGrades);

  return (
    <div className="ubuntu pb-5">
      <>
        <EmployeeHeader
          btnText={"Back"}
          renderTo={"/hr/employees"}
          title={"Employee Personal Information"}
        />
        <Form onSubmit={handleFormSubmit} className="px-5">
          <div className="d-flex flex-wrap justify-content-start align-items-center gap-3">
            <div className="d-flex  justify-content-start  gap-2 align-items-center">
              <label htmlFor="name">
                {" "}
                <sup className="star">*</sup> Full Name{" "}
              </label>
              <input
                required
                type="text"
                name="name"
                className="px-2 form-width"
                onChange={handleChange}
                value={newEmployee.name}
              />
            </div>
            <div className="d-flex justify-content-start  gap-2 align-items-center">
              <label htmlFor="username">
                <sup className="star">*</sup> username{" "}
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                className=" px-2 form-width"
                value={newEmployee.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex justify-content-start  gap-2 align-items-center">
              <label htmlFor="hired_date">
                <sup className="star">*</sup> Hired Date{" "}
              </label>
              <input
                type="date"
                name="hired_date"
                placeholder="Enter your Hired Date"
                className=" px-2 form-width"
                value={newEmployee.hired_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex justify-content-start  py-3 gap-2 align-items-center">
              <label htmlFor="status"> Status </label>
              <div
                role="group"
                className="d-flex gap-2"
                aria-labelledby="my-radio-group"
              >
                <label>single</label>{" "}
                <input
                  type="radio"
                  name="martial_status"
                  onChange={handleChange}
                  value={"single"}
                  checked={newEmployee.martial_status === "single"}
                />
              </div>
              <div
                role="group"
                className="d-flex gap-2"
                aria-labelledby="my-radio-group"
              >
                <label>married </label>{" "}
                <input
                  type="radio"
                  name="martial_status"
                  onChange={handleChange}
                  value={"married"}
                  checked={newEmployee.martial_status === "married"}
                />
              </div>
            </div>
            <div className="d-flex justify-content-start gap-2 align-items-center">
              <label htmlFor="birth_date">Birth Date </label>
              <input
                type="date"
                name="birth_date"
                placeholder="Enter your Birth Date"
                className=" px-2 form-width"
                value={newEmployee.birth_date}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex justify-content-start  gap-2 align-items-center">
              <label htmlFor="religion"> Religion </label>
              <input
                type="text"
                name="religion"
                className=" px-2 form-width"
                value={newEmployee.religion}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-start gap-2 align-items-center">
              <label htmlFor="role"> Role </label>
              <input
                type="text"
                name="role"
                value={newEmployee.role}
                onChange={handleChange}
                className=" px-2 form-width"
              />
            </div>

            <div className="d-flex gap-2 justify-content-start align-items-center ">
              <label htmlFor="gender"> Gender: </label>
              <div
                role="group"
                className="d-flex gap-4"
                aria-labelledby="my-radio-group"
              >
                <div>
                  <label>Male</label>{" "}
                  <input
                    type="radio"
                    name="gender"
                    onChange={handleChange}
                    value={"male"}
                    checked={newEmployee.gender === "male"}
                  />
                </div>
                <div>
                  <label>Female </label>{" "}
                  <input
                    type="radio"
                    name="gender"
                    onChange={handleChange}
                    value={"female"}
                    checked={newEmployee.gender === "female"}
                  />
                </div>
                <div>
                  <label>Other </label>{" "}
                  <input
                    type="radio"
                    name="gender"
                    onChange={handleChange}
                    value={"other"}
                    checked={newEmployee.gender === "other"}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-start gap-2  align-items-center">
              <label htmlFor="guardian"> Guardian </label>
              <input
                type="text"
                name="guardian"
                value={newEmployee.guardian}
                onChange={handleChange}
                className=" px-2 form-width"
              />
            </div>
            <div className="d-flex gap-2 justify-content-start align-items-center">
              <label htmlFor="cnic"> CNIC </label>
              <input
                type="text"
                name="cnic"
                placeholder="xxxxx-xxxxxx-x"
                className=" px-2 form-width"
                value={newEmployee.cnic}
                onChange={handleChange}
              />
              <label htmlFor="cnic" style={{ color: "lightgreen" }}>
                {" "}
                xxxxx-xxxxxx-x{" "}
              </label>
            </div>
          </div>
          <h4 className="text-start mt-5 py-2 px-2 form-heading-color">
            Employee Address Information
          </h4>
          <div className="d-flex flex-wrap justify-content-start align-items-center gap-3">
            <div className="d-flex gap-2 justify-content-start align-items-center pe-3">
              <label htmlFor="nationality"> Nationality </label>
              <select
                component="select"
                className="py-1 form-width"
                name="nationality"
                value={newEmployee.nationality}
                onChange={handleChange}
              >
                {validNationalities.map((value, index) => {
                  return (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="d-flex gap-2 pe-3 justify-content-start align-items-center">
              <label htmlFor="city">City </label>
              <input
                type="text"
                value={newEmployee.city}
                onChange={handleChange}
                name="city"
                className="px-2 form-width"
              />
            </div>
            <div className="d-flex pe-3 justify-content-start  gap-2 align-items-center">
              <label htmlFor="state"> State </label>

              <input
                type="text"
                value={newEmployee.state}
                onChange={handleChange}
                name="state"
                className="px-2 form-width"
              />
            </div>

            <div className="d-flex pe-3 justify-content-start  gap-2 align-items-center">
              <label htmlFor="location_name"> Location name </label>
              <input
                type="text"
                name="location_name"
                className="px-2 form-width"
                value={newEmployee.location_name}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex pe-3 justify-content-end  gap-2 align-items-center">
              <label htmlFor="email">
                <sup className="star">*</sup> Email{" "}
              </label>
              <input
                type="email"
                name="email"
                value={newEmployee.email}
                onChange={handleChange}
                className="px-2 form-width"
                required
              />
            </div>
            <div className="d-flex gap-2 pe-3 justify-content-start align-items-center">
              <label htmlFor="zipcode"> Zipcode </label>
              <input
                type="number"
                name="zipcode"
                value={newEmployee.zipcode}
                onChange={handleChange}
                className="px-2 form-width"
              />
            </div>
            <div className="d-flex gap-2 pe-3 justify-content-start align-items-center">
              <label htmlFor="phone"> Phone </label>
              <input
                type="text"
                placeholder="+00 000 0000000"
                name="phone"
                value={newEmployee.phone}
                onChange={handleChange}
                className="px-2 form-width"
              />
              <label htmlFor="cnic" style={{ color: "lightgreen" }}>
                {" "}
                +00 000 0000000{" "}
              </label>
            </div>
            <div className="d-flex gap-2 pe-3 justify-content-start align-items-center">
              <label htmlFor="current_address"> Current Address </label>
              <input
                type="text"
                name="current_address"
                className="form-width px-2"
                value={newEmployee.current_address}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex gap-3 pe-3 justify-content-start align-items-center">
              <label htmlFor="permanent_address"> Permanent Address </label>
              <input
                type="text"
                name="permanent_address"
                className="form-width px-2"
                value={newEmployee.permanent_address}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex gap-2 justify-content-start align-items-center">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                placeholder="Enter Country"
                className=" px-2 form-width"
                value={newEmployee.country}
                onChange={handleChange}
              />
            </div>
          </div>
          <h4 className="text-start mt-5 py-2 px-2 form-heading-color">
            Job details
          </h4>
          <div className="d-flex flex-wrap justify-content-start align-items-center gap-3">
            <div className="d-flex  justify-content-start  gap-2 align-items-center">
              <label htmlFor="designation">
                <sup className="star">*</sup> Designation{" "}
              </label>
              <select
                component="select"
                name="designation"
                className="px-2 form-width py-1"
                value={newEmployee.designation}
                required
                onChange={handleChange}
              >
                <option value={""}></option>
                {employeesDesignation.map((value, index) => {
                  return (
                    <option value={value.designation} key={index}>
                      {value.designation}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="d-flex justify-content-start gap-2 align-items-center">
              <label htmlFor="employee_type">
                <sup className="star">*</sup> Employee Type{" "}
              </label>
              <select
                component="select"
                name="employeeType"
                className="px-2 form-width py-1"
                required
                value={newEmployee.employeeType}
                onChange={handleEmployeeTypeChange}
              >
                {[
                  "",
                  "full-time",
                  "part-time",
                  "temporary",
                  "seasonal",
                  "leased",
                  "at-will",
                ].map((value, index) => {
                  return (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="d-flex justify-content-start  gap-2 align-items-center">
              <label htmlFor="department_name">
                <sup className="star">*</sup> Department Name{" "}
              </label>
              <select
                type="text"
                name="department_name"
                className=" px-2 form-width py-1"
                value={newEmployee.department_name}
                onChange={handleChange}
              >
                <option value={""}></option>
                {availableDepartments.map((value, index) => {
                  return (
                    <option value={value.department_name} key={index}>
                      {value.department_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="d-flex justify-content-start  gap-2 align-items-center">
              <label htmlFor="location_name"> Location Name </label>
              <select
                component="select"
                name="location_name"
                className="px-2 form-width py-1"
                value={newEmployee.location_name}
                onChange={handleChange}
              >
                {["Head Office", "Branch"].map((value, index) => {
                  return (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="d-flex justify-content-start gap-2  align-items-center">
              <label htmlFor="work_calander">
                <sup className="star">*</sup> Work Calander{" "}
              </label>
              <select
                component="select"
                name="workCalander"
                required
                className="px-2 form-width py-1"
                value={newEmployee.workCalander}
                onChange={handleChange}
              >
                <option value=""></option>
                {workCalender.map((value, index) => {
                  return (
                    <option value={value.work_calender} key={index}>
                      {value.work_calender}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="d-flex gap-2 justify-content-start align-items-center">
              <label htmlFor="payroll">
                <sup className="star">*</sup> Define Payroll{" "}
              </label>
              <select
                component="select"
                name="payroll"
                className="px-2 form-width py-1"
                value={newEmployee.payroll}
                onChange={handleChange}
              >
                {payrolls.map((value, index) => {
                  return (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="d-flex gap-2 justify-content-start align-items-center">
              <label htmlFor="working_status">Working Status </label>
              <select
                component="select"
                name="working_status"
                className="px-2 form-width py-1"
                value={newEmployee.working_status}
                onChange={handleChange}
              >
                {workingStatuses.map((value, index) => {
                  return (
                    <option value={value} key={index}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="d-flex gap-2 justify-content-start align-items-center">
              <label htmlFor="employeeJob">Employee Job </label>
              <select
                component="select"
                name="employeeJob"
                className="px-2 form-width py-1"
                value={newEmployee.employeeJob}
                onChange={handleChange}
                required
              >
                <option value={""}></option>
                {employeeJobs.map((value, index) => {
                  return (
                    <option value={value.job} key={index}>
                      {value.job}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="d-flex gap-2 justify-content-start align-items-center">
              <label htmlFor="employee_grade">
                <sup className="star">*</sup> Employee Scale{" "}
              </label>
              <select
                component="select"
                name="employeeGrade"
                className="px-2 form-width py-1"
                value={newEmployee.employeeGrade}
                onChange={handleChange}
                required
              >
                <option value={""}></option>
                {employeeGrades.map((value, index) => {
                  return (
                    <option value={value.employee_grade} key={index}>
                      {value.employee_grade}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="d-flex gap-2 justify-content-start align-items-center">
              <label htmlFor="supervisor"> Supervisor </label>
              <select
                component="select"
                name="supervisor"
                className="px-2 form-width py-1"
                value={newEmployee.supervisor}
                onChange={handleChange}
              >
                <option value=""></option>
                {employees.map((value, index) => {
                  return (
                    <option value={value.username} key={index}>
                      {value.username}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="d-flex gap-2 justify-content-start align-items-center">
              <label htmlFor="report_to"> report to </label>
              <input
                type="text"
                name="report_to"
                placeholder="report to"
                className=" px-2 form-width"
              />
            </div>
            <label htmlFor="supervisor"> Shift </label>
            <select
              component="select"
              name="shift"
              className="px-2 form-width py-1"
            >
              {["morning", "night", "evening"].map((value, index) => {
                return (
                  <option value={value} key={index}>
                    {value}
                  </option>
                );
              })}
            </select>
            <div className="d-flex gap-2 justify-content-start align-items-center">
              <input
                type="checkbox"
                value={newEmployee.is_sales_representative}
                onChange={handleChange}
                name="is_sales_representative"
              />
              <label htmlFor="is_sales_representative">
                {" "}
                Is Sales Representative{" "}
              </label>
            </div>

            <div className="d-flex gap-2 justify-content-start align-items-center">
              <input
                type="checkbox"
                value={newEmployee.is_delivery_man}
                onChange={handleChange}
                name="is_delivery_man"
              />
              <label htmlFor="is_delivery_man"> Is Delivery Man </label>
            </div>
          </div>

          <button type="submit" className="btn-custom mt-4">
            Submit
          </button>
          <Toaster />
        </Form>
      </>
    </div>
  );
};

export default EmployeeForm;
