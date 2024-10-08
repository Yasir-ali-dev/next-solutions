import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { employeeTypes } from "../../utils/employeeData";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EmployeeTypeFrom = () => {
  const initialValues = {
    employeeType: "full-time",
    department_name: "",
    is_active: false,
  };
  const navigate = useNavigate();
  const handleEmployeeTypeForm = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/employeeTypes",
        values
      );
      if (response.status === 201) {
        toast.success(
          `${response.data.newEmployeeType.employeeType} employee type is created `
        );
      }
      setTimeout(() => {
        navigate("/hr/employeeTypes/");
      }, [2500]);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      setTimeout(() => {
        navigate("/hr/employeeTypes/");
      }, [2500]);
    }
  };

  return (
    <div className="ubuntu bg" style={{ height: "100vh" }}>
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">Employee Type Form</h4>
      </div>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (!values.employeeType) {
            errors.employeeType = "employee type is required";
          } else if (!values.department_name) {
            errors.department_name = "department name is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleEmployeeTypeForm(values);
        }}
      >
        {({ isSubmitting }) => (
          <>
            <Form className="d-flex gap-2 flex-column justify-content-center align-items-center py-3">
              <div>
                <label htmlFor="employeeType">
                  <sup className="star">*</sup>Employee Type
                </label>
                <Field
                  component="select"
                  name="employeeType"
                  className="px-1 mx-2 form-width py-2"
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
                  name="employeeType"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div>
                <label htmlFor="department_name" className="px-2">
                  <sup className="star">*</sup> Department
                </label>
                <Field
                  type="text"
                  name="department_name"
                  placeholder="Enter your department name"
                  className="py-2 px-1 mx-2 form-width"
                />
                <ErrorMessage
                  name="department_name"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div>
                <label>is active </label>
                <Field className="mx-3" type="checkbox" name="is_active" />
              </div>
              <button
                type="submit"
                className="btn-custom my-1 mt-2"
                disabled={isSubmitting}
              >
                Create Employee Type
              </button>
              <Toaster position="top-right" />
              <Link
                className="btn-custom mt-2"
                style={{ textDecoration: "none", height: "30px" }}
                to={`/hr/employeeTypes/`}
              >
                Back
              </Link>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeTypeFrom;
