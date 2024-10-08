import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { employeeGrades } from "../../utils/employeeData";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EmployeeGradeForm = () => {
  const initialValues = {
    employee_grade: "low-level",
    description: "",
  };
  const navigate = useNavigate();

  const handleEmployeeTypeForm = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/employeeGrades",
        values
      );
      if (response.status === 201) {
        toast.success(
          `${response.data.newEmployeeGrade.employee_grade} employee scale is created `
        );
      }
      setTimeout(() => {
        navigate("/hr/employeeGrades/");
      }, [2500]);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      setTimeout(() => {
        navigate("/hr/employeeGrades/");
      }, [3000]);
    }
  };

  return (
    <div className="ubuntu bg" style={{ height: "100vh" }}>
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">Employee Scale Form</h4>
      </div>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (!values.employee_grade) {
            errors.employee_grade = "employee_grade type is required";
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
                  <sup className="star">*</sup>Employee Scale
                </label>
                <Field
                  component="select"
                  name="employee_grade"
                  className="px-1 mx-2 form-width py-2"
                >
                  {employeeGrades.map((value, index) => {
                    return (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage
                  name="employee_grade"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div>
                <label htmlFor="description" className="px-2">
                  Description
                </label>
                <Field
                  type="text"
                  name="description"
                  placeholder="Enter your description "
                  className="py-2 px-1 mx-2 form-width"
                />
              </div>
              <button
                type="submit"
                className="btn-custom my-1 mt-2"
                disabled={isSubmitting}
              >
                Create Employee Scale
              </button>
              <Toaster position="top-right" />
              <Link
                className="btn-custom mt-2"
                style={{ textDecoration: "none", height: "30px" }}
                to={`/hr/employeeGrades/`}
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

export default EmployeeGradeForm;
