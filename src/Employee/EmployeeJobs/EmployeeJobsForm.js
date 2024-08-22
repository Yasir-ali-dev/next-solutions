import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BackButton from "../../components/BackButton";

const EmployeeJobsForm = () => {
  const initialValues = {
    job: "",
    description: "",
  };
  const navigate = useNavigate();

  const handleEmployeeJobForm = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/employeeJobs",
        values
      );
      if (response.status === 201) {
        toast.success(`${response.data.newEmployeeJobs.job} job is created `);
      }
      setTimeout(() => {
        navigate("/hr/employeeJobs/");
      }, [2500]);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      setTimeout(() => {
        navigate("/hr/employeeJobs/");
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
          if (!values.job) {
            errors.job = "employee_job is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleEmployeeJobForm(values);
          setSubmitting(true);
        }}
      >
        {({ isSubmitting }) => (
          <>
            <Form className="d-flex gap-2 flex-column justify-content-center align-items-center py-3">
              <div>
                <label htmlFor="job">
                  <sup className="star">*</sup>Employee Job
                </label>
                <Field
                  type="text"
                  name="job"
                  placeholder="Enter your job "
                  className="py-2 px-1 mx-2 form-width"
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
              <button
                type="submit"
                className="btn-custom my-1 mt-2"
                disabled={isSubmitting}
              >
                Create Employee Job
              </button>
              <Toaster position="top-center" />
              <Link
                className="btn-custom mt-2"
                style={{ textDecoration: "none", height: "30px" }}
                to={`/hr/employeeJobs/`}
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

export default EmployeeJobsForm;
