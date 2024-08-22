import axios from "axios";
import { Form } from "formik";
import React, { useEffect, useState } from "react";
import { Image, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";

const EmployeeJobsContainer = () => {
  const [employeeJobs, setEmployeeJobs] = useState([]);
  const [renderEmployeeJobs, setRenderEmployeeJobs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchEmployeeJobs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeeJobs/"
      );
      const data = response.data;
      console.log(data);
      setEmployeeJobs(data.allEmployeeJobs);
      setRenderEmployeeJobs(data.allEmployeeJobs);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  useEffect(() => {
    fetchEmployeeJobs();
  }, []);

  const handleSearch = () => {
    setRenderEmployeeJobs((prevState) =>
      prevState.filter((_, index) => _.job.includes(search))
    );
  };

  return (
    <div className="ubuntu bg" style={{ height: "100vh" }}>
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">Employee Jobs</h4>
        <Link
          to="/hr/employeeJobs/employeeJobForm"
          className="router-link-btn btn-custom"
        >
          Create Employee Job
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
                    placeholder="Search by Employee job"
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
                  onClick={() => setRenderEmployeeJobs(employeeJobs)}
                >
                  Reset
                </button>
              </th>
            </tr>
            <tr>
              {["Edit", "Employee Job", "Description"].map((_, index) => (
                <th key={index}>{_}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderEmployeeJobs.map((_, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/hr/employeeJobs/:${_._id}`}
                    className="router-link-btn btn-custom"
                    state={{ employeeJob: _ }}
                  >
                    Edit
                  </Link>
                </td>
                <td>{_.job}</td>
                <td>{_.description}</td>
              </tr>
            ))}
            <tr>
              <td className="text-end  px-5" colSpan="3">
                <strong>Total {renderEmployeeJobs.length}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeJobsContainer;
