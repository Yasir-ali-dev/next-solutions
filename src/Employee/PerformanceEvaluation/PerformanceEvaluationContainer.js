import axios from "axios";
import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import EmployeeHeader from "../../components/EmployeeHeader";
import TableLength from "../../components/TableLength";
import TableHeadComponent from "../../components/TableHeadComponent";

import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const PerformanceEvaluationContainer = () => {
  const [performanceEvaluation, setPerformanceEvaluation] = useState([]);
  const [renderPerformanceEvaluation, setRenderPerformanceEvaluation] =
    useState([]);
  const [search, setSearch] = useState("");
  const fetchPerformanceEvaluation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeePerFormanceEvaluations/"
      );
      const data = response.data;
      setRenderPerformanceEvaluation(data.allEmployeePerformanceEvaluations);
      setPerformanceEvaluation(data.allEmployeePerformanceEvaluations);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  useEffect(() => {
    fetchPerformanceEvaluation();
  }, []);

  const handleSearch = () => {
    setRenderPerformanceEvaluation((prevState) =>
      prevState.filter((_, index) => _.employeeInfo.includes(search))
    );
  };

  return (
    <div className="ubuntu bg" style={{ height: "100vh" }}>
      <EmployeeHeader
        btnText={"Create Performance Evaluation"}
        renderTo="/hr/employeePerFormanceEvaluations/employeePerFormanceEvaluationForm"
        title={"Employee Performance Evaluation"}
      />
      <BackButton to={"hr"} />
      <div className="px-3">
        <Table responsive hover bordered>
          <TableHeadComponent
            colSpan={7}
            placeholder={"Employee Designation"}
            setSearch={setSearch}
            handleSearch={handleSearch}
            setRender={setRenderPerformanceEvaluation}
            data={performanceEvaluation}
            headings={[
              "Edit",
              "Employee",
              "Supervisor",
              "Transaction Number",
              "Transaction Date",
              "Total Score",
              "Obtain Score",
              "Percentage",
            ]}
          />
          <tbody>
            {renderPerformanceEvaluation.map((_, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/hr/employeePerFormanceEvaluations/:${_._id}`}
                    className="router-link-btn btn-custom"
                    state={{ employeePerFormanceEvaluation: _ }}
                  >
                    Edit
                  </Link>
                </td>
                <td>{_.employeeInfo}</td>
                <td>{_.supervisor}</td>
                <td>{_.transactionNumber ? _.transactionNumber : " "}</td>
                <td>{_.transactionDate && _.transactionDate.slice(0, 10)}</td>
                <td>{_.totalScore}</td>
                <td>{_.obtainScore}</td>
                <td>
                  {Math.round(_.percentage)}
                  {" %"}
                </td>
              </tr>
            ))}
            <TableLength
              colSpan="8"
              length={renderPerformanceEvaluation.length}
            />
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PerformanceEvaluationContainer;
