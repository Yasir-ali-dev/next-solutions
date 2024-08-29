import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Form, Table } from "react-bootstrap";
import EmployeeHeader from "../../components/EmployeeHeader";
import { v4 as uuid } from "uuid";

const PerformanceEvaluationForm = () => {
  const [performanceEvaluation, setPerformanceEvaluation] = useState({
    transactionNumber: "",
    transactionDate: Date,
    totalScore: Number,
    obtainScore: Number,
    percentage: Number,
    employee_username: String,
    supervisor: String,
  });

  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [performanceCriterias, setPerformanceCriterias] = useState([]);
  const [selectedCriterias, setSelectedCriterias] = useState([]);

  const handleCriteriaCount = (e, index) => {
    const { checked } = e.target;
    setSelectedCriterias((prevSelected) => {
      if (checked) {
        return [...prevSelected, index];
      } else {
        return prevSelected.filter((i) => i !== index);
      }
    });
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeesInfo/"
      );
      const data = response.data;
      setEmployees(data.allEmployeesInfo);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  const fetchPerformanceCriteria = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeePerFormanceCriteria/"
      );
      const data = response.data;
      setPerformanceCriterias(data.employeePerFormanceCriteria);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchPerformanceCriteria();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPerformanceEvaluation((prevEvaluatoin) => {
      return {
        ...prevEvaluatoin,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const createPerformanceEvaluation = async (event) => {
    event.preventDefault();
    const evolution = { totalWeight: 0, obtain: 0, percentage: 0 };
    performanceCriterias.forEach((criteria, index) => {
      evolution.totalWeight += criteria.total;
      if (selectedCriterias.includes(index)) {
        evolution.obtain += criteria.total;
      }
    });
    evolution.percentage = (evolution.obtain / evolution.totalWeight) * 100;
    performanceEvaluation.obtainScore = evolution.obtain;
    performanceEvaluation.percentage = evolution.percentage;
    performanceEvaluation.totalScore = evolution.totalWeight;
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/employeePerFormanceEvaluations",
        performanceEvaluation
      );
      if (response.status === 201) {
        toast.success(
          `${response.data.newEmployeePerformanceEvaluation.employeeInfo} evaluation is created`
        );
      }
      setTimeout(() => {
        navigate("/hr/employeePerFormanceEvaluations/");
      }, [2500]);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  return (
    <div className="ubuntu ">
      <EmployeeHeader
        btnText={"Back"}
        renderTo={"/hr/employeePerFormanceEvaluations"}
        title={"Employee Performance Evaluation"}
      />
      <Form
        onSubmit={createPerformanceEvaluation}
        className="d-flex gap-4 mx-5 flex-wrap justify-content-evenly align-items-center py-3"
      >
        <div className="d-flex gap-3">
          <p>Transaction Number</p>
          <div>
            <input
              type="text"
              className="px-1 form-width py-1"
              name="transactionNumber"
              placeholder="To be generated"
              onChange={handleChange}
              disabled
              value={performanceEvaluation.transactionNumber}
            />
          </div>
        </div>
        <div className="d-flex gap-3">
          <p>Transaction Date</p>
          <div>
            <input
              type="Date"
              className="px-1 form-width py-1"
              name="transactionDate"
              onChange={handleChange}
              value={performanceEvaluation.transactionDate}
            />
          </div>
        </div>
        <div className="d-flex gap-3">
          <p>Supervisor</p>
          <div>
            <select
              name="supervisor"
              onChange={handleChange}
              className="px-1  form-width py-1"
              id=""
            >
              <option value=""></option>
              {employees.map((_, index) => {
                return (
                  <option key={index} value={_.username}>
                    {_.username}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="d-flex gap-3">
          <p>
            <span className="star">*</span> Employee
          </p>
          <div>
            <select
              name="employee_username"
              className="px-1  form-width py-1"
              onChange={handleChange}
              required
            >
              <option value=""></option>
              {employees.map((_, index) => {
                return (
                  <option key={index} value={_.username}>
                    {_.username}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="d-flex flex-column w-100">
          <Table responsive hover bordered className="">
            <thead>
              <tr>
                {[
                  "~",
                  "Performance Criteria Type",
                  "Performance Criteria Name",
                  "Criteria",
                  "Total",
                  "Is Group",
                ].map((_, index) => (
                  <th key={index}>{_}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {performanceCriterias.map((_, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      name={`criteria-${index}`}
                      onChange={(e) => handleCriteriaCount(e, index)}
                      checked={selectedCriterias.includes(index)}
                    />
                  </td>

                  <td>{_.type}</td>
                  <td>{_.name}</td>
                  <td>{_.criteria}</td>
                  <td>{_.total}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={_.is_group}
                      disabled={true}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <button className="btn-custom my-1 w-25 mx-5 mt-2" type="submit">
            Create Performance Evaluation
          </button>
          <Toaster position="top-right" />
        </div>
      </Form>
    </div>
  );
};

export default PerformanceEvaluationForm;
