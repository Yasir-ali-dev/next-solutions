import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const WorkCalenderEdit = () => {
  const { workCalender } = useLocation().state;
  const [workCalenderObject, setWorkCalenderObject] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setWorkCalenderObject(workCalender);
  }, []);

  const handleWorkCalenderForm = async (values) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/workCalenders/${id}`,
        values
      );
      if (response.status === 200) {
        toast.success("Work Calender is edited successfully");
      }
      setTimeout(() => {
        navigate("/hr/workCalenders/");
      }, 2500);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      setTimeout(() => {
        navigate("/hr/workCalenders/");
      }, 2500);
    }
  };

  const handleDeleteWorkCalender = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/workCalenders/${id}`
      );
      if (response.status === 200) {
        toast.success("Work Calender is deleted successfully");
      }
      console.log(response.data);
      setTimeout(() => {
        navigate("/hr/workCalenders/");
      }, 2500);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      setTimeout(() => {
        navigate("/hr/workCalenders/");
      }, 2500);
    }
  };

  return (
    <div className="ubuntu">
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">
          Work Calender {workCalenderObject.employeeType}
        </h4>
      </div>
      <Formik
        initialValues={workCalender}
        validate={(values) => {
          const errors = {};
          if (!values.work_calender) {
            errors.work_calender = "work_calender is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          //   console.log(values);
          handleWorkCalenderForm(values);
        }}
      >
        {({ isSubmitting }) => (
          <>
            <Form className="d-flex gap-2 flex-column justify-content-center align-items-center py-3">
              <div>
                <label htmlFor="work_calender">Work Calender </label>
                <Field
                  type="text"
                  name="work_calender"
                  placeholder="Enter work calender"
                  className="py-2 px-1 mx-2 form-width"
                />

                <ErrorMessage
                  name="work_calender"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div>
                <label htmlFor="days_per_week" className="px-2">
                  days per week
                </label>
                <Field
                  type="number"
                  name="days_per_week"
                  placeholder="Enter days per week "
                  className="py-2 px-1 mx-2 form-width-sm"
                />
              </div>
              <div>
                <label htmlFor="work_hours_per_day" className="px-2">
                  work hours per day
                </label>
                <Field
                  type="number"
                  name="work_hours_per_day"
                  placeholder="Enter work hours per day "
                  className="py-2 px-1 mx-2 form-width-xs"
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
          className="btn btn-danger btn-sm"
          onClick={handleDeleteWorkCalender}
        >
          Delete
        </button>
        <Toaster position="top-right" />

        <Link to={`/hr/workCalenders/`} className="btn-custom my-1 mt-2">
          Back
        </Link>
      </div>
    </div>
  );
};

export default WorkCalenderEdit;
