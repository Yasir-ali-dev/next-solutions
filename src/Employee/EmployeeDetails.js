import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import "../index.css";
import { useParams } from "react-router-dom";
import {
  validNationalities,
  designations,
  employeeTypes,
  arrayOfEmployees,
} from "../utils/employeeData";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    setEmployee(
      arrayOfEmployees.filter((employee) => employee.id === Number(id))[0]
    );
  }, []);

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

  return (
    <div className="ubuntu">
      <div className="py-1 gap-5 mb-1 px-2 d-flex justify-content-start align-items-center  form-heading-color">
        <h5 className="text-start">Employee - {employee.name} </h5>
        <div className="d-flex align-items-center gap-3">
          {["Apply Changes", "Delete", "Profile", "Back"].map((btn, index) => {
            return <button className="btn-custom-link">{btn}</button>;
          })}
        </div>
      </div>
      <Formik
        initialValues={
          arrayOfEmployees.filter((employee) => employee.id === Number(id))[0]
        }
        validate={(values) => {
          const regex = /^\+\d{1,3}\d{10}$/;
          const zipCodePattern = /^\d{5}(-\d{4})?$/;
          const errors = {};
          if (!values.hired_date) {
            errors.hired_date = "hired date is required";
          } else if (!values.name) {
            errors.name = "name is required";
          } else if (!values.department_name) {
            errors.department_name = "department name is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "invalid email address";
          } else if (!regex.test(values.phone)) {
            errors.phone = "Invalid phone number";
          } else if (!zipCodePattern.test(values.zipcode)) {
            errors.zipcode = "invalid zipcode";
          } else if (!validateNationality(values.nationality)) {
            errors.nationality = "invalid nationality";
          } else if (!validateCNIC(values.cnic)) {
            errors.cnic = "invalid cnic";
          } else if (!values.employee_type) {
            errors.employee_type = "employee type is required";
          } else if (!values.payroll) {
            errors.payroll = "payroll is required";
          } else if (!values.working_status) {
            errors.working_status = "working status is required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mx-sm-3 mx-xs-3 mx-md-5">
            <h4 className="text-start rounded py-2  px-2 form-heading-color">
              Employee Personal Information
            </h4>
            <div className="d-flex flex-wrap py-1 justify-content-start align-items-center gap-3">
              <div className="d-flex  justify-content-start  gap-2 align-items-center">
                <label htmlFor="name">
                  {" "}
                  <sup className="star">*</sup> Full Name{" "}
                </label>
                <Field type="text" name="name" className="px-2 form-width" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex justify-content-start  gap-2 align-items-center">
                <label htmlFor="hired_date">
                  <sup className="star">*</sup> Hired Date{" "}
                </label>
                <Field
                  type="date"
                  name="hired_date"
                  placeholder="Enter your Hired Date"
                  className=" px-2 form-width"
                />
                <ErrorMessage
                  name="hired_date"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex justify-content-start gap-2 align-items-center">
                <label htmlFor="birth_date">
                  <sup className="star">*</sup> Birth Date{" "}
                </label>
                <Field
                  type="date"
                  name="birth_date"
                  placeholder="Enter your Birth Date"
                  className=" px-2 form-width"
                />
              </div>

              <div className="d-flex justify-content-start  gap-2 align-items-center">
                <label htmlFor="religion"> Religion </label>
                <Field
                  type="text"
                  name="religion"
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
                    <Field type="radio" name="gender" value="Male" />
                  </div>
                  <div>
                    <label>Female </label>{" "}
                    <Field type="radio" name="gender" value="Female" />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-start gap-2  align-items-center">
                <label htmlFor="guardian"> Guardian </label>
                <Field
                  type="text"
                  name="guardian"
                  className=" px-2 form-width"
                />
              </div>
              <div className="d-flex gap-2 justify-content-start align-items-center">
                <label htmlFor="cnic"> CNIC </label>
                <Field
                  type="text"
                  name="cnic"
                  placeholder="xxxxx-xxxxxx-x"
                  className=" px-2 form-width"
                />
                <ErrorMessage
                  name="cnic"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <h4 className="text-start rounded mt-4 py-2 px-2 form-heading-color">
              Employee Address Information
            </h4>
            <div className="d-flex flex-wrap py-1 justify-content-start align-items-center gap-3">
              <div className="d-flex gap-2 justify-content-start align-items-center pe-3">
                <label htmlFor="nationality"> Nationality </label>
                <Field
                  component="select"
                  className="py-1 form-width"
                  name="nationality"
                >
                  {validNationalities.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </Field>

                <ErrorMessage
                  name="nationality"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex gap-2 pe-3 justify-content-start align-items-center">
                <label htmlFor="city">City </label>
                <Field type="text" name="city" className="px-2 form-width" />
              </div>
              <div className="d-flex pe-3 justify-content-start  gap-2 align-items-center">
                <label htmlFor="state"> State </label>
                <Field type="text" name="state" className="px-2 form-width" />
              </div>
              <div className="d-flex pe-3 justify-content-end  gap-2 align-items-center">
                <label htmlFor="email"> Email </label>
                <Field type="email" name="email" className="px-2 form-width" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex gap-2 pe-3 justify-content-start align-items-center">
                <label htmlFor="zipcode"> Zipcode </label>
                <Field
                  type="number"
                  name="zipcode"
                  className="px-2 form-width"
                />
              </div>
              <div className="d-flex gap-2 pe-3 justify-content-start align-items-center">
                <label htmlFor="phone"> Phone </label>
                <Field
                  type="text"
                  placeholder="+00 000 0000000"
                  name="phone"
                  className="px-2 form-width"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex gap-2 pe-3 justify-content-start align-items-center">
                <label htmlFor="current_address"> Current Address </label>
                <Field
                  type="text"
                  name="current_address"
                  className="form-width px-2"
                />
              </div>
              <div className="d-flex gap-3 pe-3 justify-content-start align-items-center">
                <label htmlFor="permanent_address"> Permanent Address </label>
                <Field
                  type="text"
                  name="permanent_address"
                  className="form-width px-2"
                />
              </div>
            </div>
            <h4 className="text-start rounded mt-4 py-2 px-2 form-heading-color">
              Job details
            </h4>
            <div className="d-flex flex-wrap py-1 justify-content-start align-items-center gap-3">
              <div className="d-flex  justify-content-start  gap-2 align-items-center">
                <label htmlFor="designation"> Designation </label>
                <Field
                  component="select"
                  name="designation"
                  className="px-2 form-width py-1"
                >
                  {designations.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <div className="d-flex justify-content-start  gap-2 align-items-center">
                <label htmlFor="department_name">
                  <sup className="star">*</sup> Department Name{" "}
                </label>
                <Field
                  type="text"
                  name="department_name"
                  className=" px-2 form-width"
                />
                <ErrorMessage
                  name="department_name"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex justify-content-start gap-2 align-items-center">
                <label htmlFor="employee_type">
                  <sup className="star">*</sup> Employee Type{" "}
                </label>
                <Field
                  component="select"
                  name="employee_type"
                  className="px-2 form-width py-1"
                >
                  {employeeTypes.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage
                  name="employee_type"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="d-flex justify-content-start  gap-2 align-items-center">
                <label htmlFor="location_name"> Location Name </label>
                <Field
                  component="select"
                  name="location_name"
                  className="px-2 form-width py-1"
                >
                  {["Head Office", "Branch"].map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </Field>
              </div>

              <div className="d-flex justify-content-start gap-2  align-items-center">
                <label htmlFor="work_calander"> Work Calander </label>
                <Field
                  component="select"
                  name="work_calander"
                  className="px-2 form-width py-1"
                >
                  {["Morning Shift", "Night Shift"].map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <div className="d-flex gap-2 justify-content-start align-items-center">
                <label htmlFor="payroll">
                  <sup className="star">*</sup> Define Payroll{" "}
                </label>
                <Field
                  component="select"
                  name="payroll"
                  className="px-2 form-width py-1"
                >
                  {["Daily Wages", "Hourly Wages", "Monthly Payroll"].map(
                    (value, index) => {
                      return (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      );
                    }
                  )}
                </Field>
                <ErrorMessage
                  name="payroll"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex gap-2 justify-content-start align-items-center">
                <label htmlFor="working_status">
                  <sup className="star">*</sup> Working Status{" "}
                </label>
                <Field
                  component="select"
                  name="working_status"
                  className="px-2 form-width py-1"
                >
                  {["Working", "Freezed", "Transferred", "Terminated"].map(
                    (value, index) => {
                      return (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      );
                    }
                  )}
                </Field>
                <ErrorMessage
                  name="working_status"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex gap-2 justify-content-start align-items-center">
                <label htmlFor="employee_grade"> Employee Grade </label>
                <Field
                  component="select"
                  name="employee_grade"
                  className="px-2 form-width py-1"
                >
                  {["Grade 1", "Grade 2", "Grade 3", "Grade 4"].map(
                    (value, index) => {
                      return (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      );
                    }
                  )}
                </Field>
              </div>
              <div className="d-flex gap-2 justify-content-start align-items-center">
                <label htmlFor="supervisor"> Supervisor </label>
                <Field
                  component="select"
                  name="supervisor"
                  className="px-2 form-width py-1"
                >
                  {["CTO", "Lead", "Manager", "CEO"].map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </Field>
              </div>

              <div className="d-flex gap-2 justify-content-start align-items-center">
                <Field type="checkbox" name="is_sales_representative"></Field>
                <label htmlFor="is_sales_representative">
                  {" "}
                  Is Sales Representative{" "}
                </label>
              </div>

              <div className="d-flex gap-2 justify-content-start align-items-center">
                <Field type="checkbox" name="is_delivery_man"></Field>
                <label htmlFor="is_delivery_man"> Is Delivery Man </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn-custom mt-4"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeDetails;
