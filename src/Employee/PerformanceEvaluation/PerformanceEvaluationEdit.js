import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Form, Table } from "react-bootstrap";
import EmployeeHeader from "../../components/EmployeeHeader";

const PerformanceEvaluationEdit = () => {
  const { id } = useParams();
  const { employeePerFormanceEvaluation } = useLocation().state;

  const [performanceEvaluation, setPerformanceEvaluation] = useState({});
  const navigate = useNavigate();
  const [performanceCriteria, setPerformanceCriteria] = useState([]);
  const [selectedCriterias, setSelectedCriterias] = useState([]);
  const [employees, setEmployees] = useState([]);
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

  const fetchPerformanceCriteria = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeePerFormanceCriteria/"
      );
      const data = response.data;
      setPerformanceCriteria(data.employeePerFormanceCriteria);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    setPerformanceEvaluation(employeePerFormanceEvaluation);
    fetchPerformanceCriteria();
    fetchEmployees();
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

  const handleEditPerformanceEvaluatoin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/employeePerFormanceEvaluations/${id}`,
        performanceEvaluation
      );
      if (response.status === 200) {
        toast.success("performance evaluation is edited!");
      }
      setTimeout(() => {
        navigate("/hr/employeePerFormanceEvaluations/");
      }, 2500);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  const handleDeletePerformanceEvaluatoin = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/employeePerFormanceEvaluations/${id}`
      );
      if (response.status === 200) {
        toast.success("PerFormance Evaluations is deleted successfully");
      }
      setTimeout(() => {
        navigate("/hr/employeePerFormanceEvaluations/");
      }, 2500);
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
        onSubmit={handleEditPerformanceEvaluatoin}
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
              value={
                performanceEvaluation.transactionDate &&
                performanceEvaluation.transactionDate.slice(0, 10)
              }
            />
          </div>
        </div>
        <div className="d-flex gap-3">
          <p>Supervisor</p>
          <div>
            <select
              name="supervisor"
              onChange={handleChange}
              value={performanceEvaluation.supervisor}
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
          <p>Employee</p>
          <div>
            <select
              name="employee_username"
              value={performanceEvaluation.employeeInfo}
              className="px-1  form-width py-1"
              onChange={handleChange}
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
              {performanceCriteria.map((_, index) => (
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
          <div className="d-flex gap-3 align-items-center justify-content-center">
            <div>
              <button type="submit" className="btn-custom my-1 mt-2">
                Apply Changes
              </button>
              <Toaster position="top-right" />
            </div>

            <div className="d-flex gap-3 justify-content-center">
              <button
                type="button"
                className="btn-custom-light my-1 mt-2"
                onClick={handleDeletePerformanceEvaluatoin}
              >
                Delete
              </button>
              <Toaster position="top-right" />
              <Link
                className="btn-custom mt-2 py-1 my-1"
                style={{ textDecoration: "none", height: "30px" }}
                to={"/hr/employeePerFormanceEvaluations"}
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PerformanceEvaluationEdit;
