import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Image, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";
const PerFormanceCriteriaContainer = () => {
  const [performanceCriterias, setPerformanceCriterias] = useState([]);

  const [renderPerformanceCriterias, setRenderPerformanceCriterias] = useState(
    []
  );
  const [search, setSearch] = useState("");

  const fetchEmployeeTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeePerFormanceCriteria/"
      );
      const data = response.data;
      setPerformanceCriterias(data.employeePerFormanceCriteria);
      setRenderPerformanceCriterias(data.employeePerFormanceCriteria);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchEmployeeTypes();
  }, []);

  const handleSearch = () => {
    setRenderPerformanceCriterias((prevState) =>
      prevState.filter((_, index) => _.type.includes(search))
    );
  };

  const handleReset = () => {
    setRenderPerformanceCriterias(performanceCriterias);
  };
  return (
    <div className="ubuntu bg" style={{ height: "100vh" }}>
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">Employee PerFormance Criteria</h4>
        <Link
          to="/hr/employeePerFormanceCriteria/perFormanceCriteriaForm"
          className="router-link-btn btn-custom"
        >
          Create Performance Criteria
        </Link>
      </div>
      <BackButton to={"hr"} />
      <div className="px-3">
        <Table responsive hover bordered>
          <thead>
            <tr>
              <th colSpan={4}>
                <div className="d-flex justify-content-center gap-1">
                  <Form.Control
                    type="text"
                    id="search"
                    size="sm"
                    placeholder="Search by Performance Type"
                    className="form-field"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="search-button-style"
                    onClick={handleSearch}
                  >
                    <Image src={`/employees/search.png`} />
                  </button>
                </div>
              </th>
              <th colSpan={3}>
                <button
                  className="ms-auto router-link-btn btn-custom"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </th>
            </tr>
            <tr>
              {[
                "Edit",
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
            {renderPerformanceCriterias.map((_, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/hr/employeePerFormanceCriteria/:${_._id}`}
                    className="router-link-btn btn-custom"
                    state={{ employeePerFormanceCriteria: _ }}
                  >
                    Edit
                  </Link>
                </td>
                <td>{_.type}</td>
                <td>{_.name}</td>
                <td>{_.criteria}</td>
                <td>{_.total}</td>
                <td>
                  <input type="checkbox" checked={_.is_group} disabled={true} />
                </td>
              </tr>
            ))}
            <tr>
              <td className="text-end  px-5" colSpan="6 ">
                <strong>Total {renderPerformanceCriterias.length}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PerFormanceCriteriaContainer;
