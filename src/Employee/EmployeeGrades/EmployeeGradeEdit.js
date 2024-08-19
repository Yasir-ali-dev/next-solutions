import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { employeeGrades } from "../../utils/employeeData";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const EmployeeGradeEdit = () => {
  const { employeeGrade } = useLocation().state;
  const [employeeGradeObject, setEmployeeGradeObject] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setEmployeeGradeObject(employeeGrade);
  }, []);

  const handleEmployeeGradeEdit = async (values) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/employeeGrades/${id}`,
        values
      );
      if (response.status === 200) {
        toast.success("Employee Grade is edited successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeeGrades/");
      }, 2500);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      setTimeout(() => {
        navigate("/hr/employeeGrades/");
      }, 2500);
    }
  };

  const handleDeleteEmployeeGrade = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/employeeGrades/${id}`
      );
      if (response.status === 200) {
        toast.success("Employee Grade is deleted successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeeGrades/");
      }, 2500);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      setTimeout(() => {
        navigate("/hr/employeeGrades/");
      }, 2500);
    }
  };

  return (
    <div className="ubuntu">
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">
          Employee Type {employeeGradeObject.employee_grade}
        </h4>
      </div>
      <Formik
        initialValues={employeeGradeObject}
        enableReinitialize={true}
        validate={(values) => {
          const errors = {};
          if (!values.employee_grade) {
            errors.employee_grade = "employee grade is required";
          } else if (!values.designation) {
            errors.designation = "designation is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          handleEmployeeGradeEdit(values);
        }}
      >
        {({ isSubmitting }) => (
          <>
            <Form className="d-flex gap-2 flex-column justify-content-center align-items-center py-3">
              <div>
                <label htmlFor="employeeType">Employee Type</label>
                <Field
                  component="select"
                  name="employeeType"
                  className="px-1 mx-2 form-width py-2"
                >
                  {employeeGrades.map((value, index) => {
                    if (index === 0) {
                      return (
                        <option
                          value={employeeGradeObject.employee_grade}
                          key={index}
                        >
                          {employeeGradeObject.employee_grade}
                        </option>
                      );
                    } else {
                      return (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      );
                    }
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
              <div className="d-flex gap-5 justify-content-between">
                <button
                  type="submit"
                  className="btn-custom my-1 mt-2"
                  disabled={isSubmitting}
                >
                  Apply Changes
                </button>
                <Toaster position="top-right" />
              </div>
            </Form>
          </>
        )}
      </Formik>
      <div className="d-flex gap-3 justify-content-center">
        <button
          className="btn btn-danger btn-sm my-1 mt-2"
          onClick={handleDeleteEmployeeGrade}
        >
          Delete
        </button>
        <Toaster position="top-right" />

        <Link
          to={`/hr/employeeGrades/`}
          className="btn-outline-primary bt-sm pt-1 fs-4"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default EmployeeGradeEdit;
