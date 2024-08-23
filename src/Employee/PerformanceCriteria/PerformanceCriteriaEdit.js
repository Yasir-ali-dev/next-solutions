import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Form } from "react-bootstrap";

const PerformanceCriteriaEdit = () => {
  const { employeePerformanceCriteria } = useLocation().state;
  const { id } = useParams();
  const navigate = useNavigate();

  const [performanceCriteria, setPerformanceCriteria] = useState(
    employeePerformanceCriteria
  );
  console.log(performanceCriteria);

  const handlePerformanceCriteriaEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/employeePerFormanceCriteria/${id}`,
        performanceCriteria
      );
      if (response.status === 200) {
        toast.success("Performance Criteria is edited successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeePerFormanceCriteria/");
      }, 2500);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  const handleDeletePerformanceCriteria = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/employeePerFormanceCriteria/${id}`
      );
      if (response.status === 200) {
        toast.success("Performance Criteria is deleted successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeePerFormanceCriteria/");
      }, 2500);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPerformanceCriteria((prevPayElements) => {
      return {
        ...prevPayElements,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  return (
    <div className="ubuntu bg" style={{ height: "100vh" }}>
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">Employee Performance Criteria</h4>
      </div>
      <Form
        onSubmit={handlePerformanceCriteriaEdit}
        className="d-flex gap-4 mx-5 flex-wrap justify-content-evenly align-items-center py-3"
      >
        <div className="d-flex ">
          <p>
            <sup className="star">*</sup>Performance Type
          </p>
          <select
            name="type"
            id=""
            required
            onChange={handleChange}
            className="px-1 mx-2 form-width py-2"
          >
            {["prohibition period", "annual evaluation"].map((_, index) => {
              return (
                <option key={index} value={_}>
                  {_}
                </option>
              );
            })}
          </select>
        </div>

        <div className="d-flex gap-3">
          <p>
            {" "}
            <sup className="star">*</sup>Performance Name
          </p>
          <div>
            <input
              type="text"
              className="px-1 mx-2 form-width py-2"
              name="name"
              onChange={handleChange}
              value={performanceCriteria.name}
              required
            />
          </div>
        </div>

        <div className="d-flex gap-3">
          <p>Criteria</p>
          <div>
            <input
              type="text"
              name="criteria"
              className="px-1 mx-2 form-width py-2"
              value={performanceCriteria.criteria}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="total">Total</label>
          <input
            name="total"
            className="px-1 mx-2 form-width py-2"
            type="number"
            value={performanceCriteria.total}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex">
          <label htmlFor="is_group">is group</label>
          <input
            name="is_group"
            className="px-1 mx-2 form-width py-2"
            type="checkbox"
            checked={performanceCriteria.is_group}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex gap-5 justify-content-between">
          <button type="submit" className="btn-custom my-1 mt-2">
            Apply Changes
          </button>
          <Toaster position="top-right" />
        </div>
      </Form>

      <div className="d-flex gap-3 justify-content-center">
        <button
          className="btn-custom-light my-1 mt-2"
          onClick={handleDeletePerformanceCriteria}
        >
          Delete
        </button>
        <Toaster position="top-right" />

        <Link
          className="btn-custom mt-2"
          style={{ textDecoration: "none", height: "30px" }}
          to={`/hr/employeeTypes/`}
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default PerformanceCriteriaEdit;
