import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Form } from "react-bootstrap";

const PerformanceCriteriaForm = () => {
  const [performanceCriteria, setPerformanceCriteria] = useState({
    type: "prohibition period",
    name: "",
    criteria: "",
    total: Number,
    is_group: false,
  });
  const navigate = useNavigate();

  const handlePerformanceCriteria = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/employeePerFormanceCriteria",
        performanceCriteria
      );
      console.log(response.data);

      const newPerformance = response.data.newEmployeePerFormanceCriteria;
      if (response.status === 201) {
        toast.success(`${newPerformance.name} is created `);
      }
      setTimeout(() => {
        navigate("/hr/employeePerFormanceCriteria/");
      }, [2500]);
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
    <div className="ubuntu ">
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center   form-heading-color">
        <h4 className="text-start">Employee Performance Criteria</h4>
      </div>
      <Form
        onSubmit={handlePerformanceCriteria}
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
        <button className="btn-custom my-1 mx-5 mt-2" type="submit">
          Create Performance Criteria
        </button>
        <Toaster position="top-right" />
        <Link
          className="btn-custom mt-2"
          style={{ textDecoration: "none", height: "30px" }}
          to={`/hr/employeePerFormanceCriteria/`}
        >
          Back
        </Link>
      </Form>
    </div>
  );
};

export default PerformanceCriteriaForm;
