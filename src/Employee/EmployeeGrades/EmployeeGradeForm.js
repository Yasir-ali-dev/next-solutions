import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { employeeGrades } from "../../utils/employeeData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const EmployeeGradeForm = () => {
  const initialValues = {
    employee_grade: "low-level",
    designation: "",
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
          `${response.data.newEmployeeGrade.employee_grade} employee grade is created `
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
    <div className="ubuntu">
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">Employee Grade Form</h4>
      </div>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (!values.employee_grade) {
            errors.employee_grade = "employee_grade type is required";
          } else if (!values.designation) {
            errors.designation = "designation  is required";
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
                <label htmlFor="employeeType">Employee Grade</label>
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
                <label htmlFor="designation" className="px-2">
                  Designation
                </label>
                <Field
                  type="text"
                  name="designation"
                  placeholder="Enter your designation "
                  className="py-2 px-1 mx-2 form-width"
                />
                <ErrorMessage
                  name="designation"
                  component="div"
                  className="text-danger"
                />
              </div>
              <button
                type="submit"
                className="btn-custom my-1 mt-2"
                disabled={isSubmitting}
              >
                Create Employee Grade
              </button>
              <Toaster position="top-right" />
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeGradeForm;
