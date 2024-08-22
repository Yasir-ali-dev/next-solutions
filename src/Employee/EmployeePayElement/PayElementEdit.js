import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const PayElementEdit = () => {
  const { payElementObj } = useLocation().state;
  const navigate = useNavigate();
  const [employeeUsername, setEmployeeUsername] = useState({});

  payElementObj.start_date = formatDateToYYYYMMDD(payElementObj.start_date);
  payElementObj.end_date = formatDateToYYYYMMDD(payElementObj.end_date);
  const { id } = useParams();

  function formatDateToYYYYMMDD(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/employeesInfo/:${payElementObj.employeeInfo}`
      );

      const data = response.data;

      setEmployeeUsername(data.employeeInformation.username);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handlePayElementForm = async (values) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/employeePayElements/${id}`,
        values
      );
      if (response.status === 200) {
        toast.success("Employee Type is edited successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeePayElements/");
      }, 2500);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      setTimeout(() => {
        navigate("/hr/employeePayElements/");
      }, 2500);
    }
  };

  const handleDeletePayElement = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/employeePayElements/${id}`
      );
      if (response.status === 200) {
        toast.success("Employee Pay is deleted successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeePayElements/");
      }, 2500);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      setTimeout(() => {
        navigate("/hr/employeePayElements/");
      }, 2500);
    }
  };

  return (
    <div className="ubuntu bg" style={{ height: "100vh" }}>
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">Employee Pay Element</h4>
      </div>
      <Formik
        initialValues={payElementObj}
        validate={(values) => {
          const errors = {};
          if (!values.element_type) {
            errors.element_type = "element_type is required";
          } else if (!values.start_date) {
            errors.start_date = "start_date is required";
          }
          if (!values.end_date) {
            errors.end_date = "end_date is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          handlePayElementForm(values);
        }}
      >
        {({ isSubmitting }) => (
          <>
            <Form className="d-flex gap-4 justify-content-evenly align-items-center py-3 px-5 flex-wrap">
              <div className="d-flex ">
                <label htmlFor="element_type">
                  <sup className="star">*</sup>Employee
                </label>

                <Field
                  type="text"
                  name="employee_user"
                  placeholder="Enter element_type"
                  className="py-2 px-1 mx-2 form-width"
                  disabled
                  value={employeeUsername}
                />
              </div>

              <div>
                <label htmlFor="element_type">
                  <sup className="star">*</sup>Element Type{" "}
                </label>
                <Field
                  type="text"
                  name="element_type"
                  placeholder="Enter element_type"
                  className="py-2 px-1 mx-2 form-width"
                  disabled
                />

                <ErrorMessage
                  name="element_type"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="d-flex gap-3">
                <p>Processing Type</p>
                <div>
                  <Field
                    type="radio"
                    name="processing_type"
                    value="recurring"
                    checked={payElementObj.processing_type === "recurring"}
                    disabled
                  />

                  <label htmlFor="recurring" className="ms-2">
                    recurring
                  </label>
                  <Field
                    type="radio"
                    name="processing_type"
                    value="non recurring"
                    disabled
                    checked={payElementObj.processing_type === "non recurring"}
                  />

                  <label htmlFor="non recurring" className="ms-2">
                    non recurring
                  </label>
                </div>
              </div>

              <div className="d-flex gap-3">
                <p>Element Type</p>
                <div>
                  <input
                    type="radio"
                    disabled
                    name="entry_type"
                    value={"normal"}
                    checked={payElementObj.entry_type === "normal"}
                  />
                  <label htmlFor="normal" className="ms-2">
                    normal
                  </label>
                  <Field
                    type="radio"
                    name="entry_type"
                    value={"override"}
                    className="ms-4"
                    disabled
                    checked={payElementObj.entry_type === "override"}
                  />
                  <label htmlFor="override" className="ms-2">
                    {" "}
                    override
                  </label>
                  <Field
                    type="radio"
                    name="entry_type"
                    value={"additional"}
                    className="ms-4"
                    disabled
                    checked={payElementObj.entry_type === "additional"}
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
                <Field
                  name="start_date"
                  className="px-1 mx-2 form-width py-2"
                  type="date"
                  required
                />
              </div>
              <div>
                <label htmlFor="end_date">
                  <sup className="star">*</sup>End Date
                </label>
                <Field
                  name="end_date"
                  className="px-1 mx-2 form-width py-2"
                  type="date"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-custom my-1 mt-2 "
                disabled={isSubmitting}
              >
                Apply Changes
              </button>
              <Toaster position="top-right" />
            </Form>
          </>
        )}
      </Formik>

      <div className="d-flex gap-3 justify-content-center">
        <button
          className="btn-custom-light my-1 mt-2"
          onClick={handleDeletePayElement}
        >
          Delete
        </button>
        <Toaster position="top-right" />

        <Link
          className="btn-custom mt-2"
          style={{ textDecoration: "none", height: "30px" }}
          to={`/hr/employeePayElements/`}
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default PayElementEdit;
