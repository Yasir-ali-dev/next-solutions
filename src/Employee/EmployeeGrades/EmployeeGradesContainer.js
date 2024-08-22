import axios from "axios";
import { Form } from "formik";
import React, { useEffect, useState } from "react";
import { Image, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";

const EmployeeGradesContainer = () => {
  const [employeeGrades, setEmployeeGrades] = useState([]);
  const [renderEmployeeGrades, setRenderEmployeeGrades] = useState([]);
  const [search, setSearch] = useState("");

  const fetchEmployeeGrades = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeeGrades/"
      );
      const data = response.data;
      setEmployeeGrades(data.allEmployeeGrades);
      setRenderEmployeeGrades(data.allEmployeeGrades);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  useEffect(() => {
    fetchEmployeeGrades();
  }, []);

  const handleSearch = () => {
    setRenderEmployeeGrades((prevState) =>
      prevState.filter((_, index) => _.employee_grade.includes(search))
    );
  };

  return (
    <div className="ubuntu bg" style={{ height: "100vh" }}>
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">Employee Scale</h4>
        <Link
          to="/hr/employeeGrades/employeeGradeForm"
          className="router-link-btn btn-custom"
        >
          Create Employee Scale
        </Link>
      </div>
      <BackButton to={"hr"} />
      <div className="px-3">
        <Table responsive hover bordered>
          <thead>
            <tr>
              <th colSpan={2}>
                <div className="d-flex justify-content-center gap-1">
                  <input
                    placeholder="Search by Employee Grade"
                    className="form-field w-100 py-1 px-1"
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    id="search"
                  ></input>
                  <button
                    className="search-button-style"
                    onClick={handleSearch}
                  >
                    <Image src={`/employees/search.png`} />
                  </button>
                </div>
              </th>
              <th colSpan={1}>
                <button
                  className="ms-auto router-link-btn btn-custom"
                  onClick={() => setRenderEmployeeGrades(employeeGrades)}
                >
                  Reset
                </button>
              </th>
            </tr>
            <tr>
              {["Edit", "Employee Grade", "Designation"].map((_, index) => (
                <th key={index}>{_}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderEmployeeGrades.map((_, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/hr/employeeGrades/:${_._id}`}
                    className="router-link-btn btn-custom"
                    state={{ employeeGrade: _ }}
                  >
                    Edit
                  </Link>
                </td>
                <td>{_.employee_grade}</td>
                <td>{_.description}</td>
              </tr>
            ))}
            <tr>
              <td className="text-end  px-5" colSpan="3">
                <strong>Total {renderEmployeeGrades.length}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeGradesContainer;
