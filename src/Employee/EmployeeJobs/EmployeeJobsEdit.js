import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const EmployeeJobsEdit = () => {
  const { employeeJob } = useLocation().state;
  const [employeeJobObject, setEmployeeJobObject] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setEmployeeJobObject(employeeJob);
  }, []);

  const handleEmployeeJobEdit = async (values) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/employeeJobs/${id}`,
        values
      );
      if (response.status === 200) {
        toast.success("Employee job is edited successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeeJobs/");
      }, 2500);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      setTimeout(() => {
        navigate("/hr/employeeJobs/");
      }, 2500);
    }
  };

  const handleDeleteEmployeeJob = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/employeeJobs/${id}`
      );
      if (response.status === 200) {
        toast.success("Employee job is deleted successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeeJobs/");
      }, 2500);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      setTimeout(() => {
        navigate("/hr/employeeJobs/");
      }, 2500);
    }
  };

  return (
    <div className="ubuntu bg" style={{ height: "100vh" }}>
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">Employee Job {employeeJobObject.job}</h4>
      </div>
      <Formik
        initialValues={employeeJob}
        enableReinitialize={true}
        validate={(values) => {
          const errors = {};
          if (!values.job) {
            errors.job = "employee job is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          handleEmployeeJobEdit(values);
          setSubmitting(true);
        }}
      >
        {({ isSubmitting }) => (
          <>
            <Form className="d-flex gap-2 flex-column justify-content-center align-items-center py-3">
              <div>
                <label htmlFor="job">
                  <sup className="star">* </sup> Employee Job
                </label>
                <Field
                  type="text"
                  name="job"
                  className="px-1 mx-2 form-width py-2"
                />
                <ErrorMessage
                  name="job"
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
          className="btn-custom-light my-1 mt-2"
          onClick={handleDeleteEmployeeJob}
        >
          Delete
        </button>
        <Toaster position="top-right" />

        <Link
          className="btn-custom mt-2"
          style={{ textDecoration: "none", height: "30px" }}
          to={`/hr/employeeGrades/`}
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default EmployeeJobsEdit;
