import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const WorkCalenderForm = () => {
  const initialValues = {
    work_calender: "full-time",
    days_per_week: Number,
    work_hours_per_day: Number,
  };
  const navigate = useNavigate();
  const handleWorkCalenderForm = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/workCalenders",
        values
      );
      //   console.log(response);
      if (response.status === 201) {
        toast.success(
          `${response.data.newWorkCalender.work_calender} work calender is created`
        );
      }
      setTimeout(() => {
        navigate("/hr/workCalenders");
      }, [2500]);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
      setTimeout(() => {
        navigate("/hr/workCalenders/");
      }, [2500]);
    }
  };

  return (
    <div className="ubuntu">
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">Work Calender Form</h4>
      </div>
      <Formik
        initialValues={initialValues}
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
                Create Work Calender
              </button>
              <Toaster position="top-right" />
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default WorkCalenderForm;
