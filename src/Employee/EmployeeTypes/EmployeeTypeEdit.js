import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { employeeTypes } from "../../utils/employeeData";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const EmployeeTypeEdit = () => {
  const { employeeType } = useLocation().state;
  const [employeeTypeObject, setEmployeeTypeObject] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setEmployeeTypeObject(employeeType);
  }, []);

  const handleEmployeeTypeEdit = async (values) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/employeeTypes/${id}`,
        values
      );
      if (response.status === 200) {
        toast.success("Employee Type is edited successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeeTypes/");
      }, 2000);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  const handleDeleteEmployeeType = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/employeeTypes/${id}`
      );
      if (response.status === 200) {
        toast.success("Employee Type is deleted successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeeTypes/");
      }, 2000);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  return (
    <div className="ubuntu">
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">
          Employee Type {employeeTypeObject.employeeType}
        </h4>
      </div>
      <Formik
        initialValues={employeeType}
        enableReinitialize={true}
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
          console.log(values);
          handleEmployeeTypeEdit(values);
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
                  {employeeTypes.map((value, index) => {
                    if (index === 0) {
                      return (
                        <option value={employeeType.employeeType} key={index}>
                          {employeeType.employeeType}
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
                  name="employeeType"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div>
                <label htmlFor="department_name" className="px-2">
                  Department
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
          className="btn-custom my-1 mt-2"
          onClick={handleDeleteEmployeeType}
        >
          Delete
        </button>
        <Toaster position="top-right" />

        <Link to={`/hr/employeeTypes/`} className="router-link-btn pt-1 fs-4">
          Back
        </Link>
      </div>
    </div>
  );
};

export default EmployeeTypeEdit;
