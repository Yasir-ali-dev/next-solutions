import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Image, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const EmployeeTypesContainer = () => {
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [renderEmployeeTypes, setRenderEmployeeTypes] = useState([]);
  const [search, setSearch] = useState("");

  const fetchEmployeeTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeeTypes/"
      );
      const data = response.data;
      setEmployeeTypes(data.allEmployeeTypes);
      setRenderEmployeeTypes(data.allEmployeeTypes);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchEmployeeTypes();
  }, []);

  const handleSearch = () => {
    setRenderEmployeeTypes((prevState) =>
      prevState.filter((_, index) => _.employeeType.includes(search))
    );
  };

  const handleReset = () => {
    setRenderEmployeeTypes(employeeTypes);
  };
  return (
    <div className="ubuntu">
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">Employee Types</h4>
        <Link
          to="/hr/employeeTypes/employeeTypeForm"
          className="router-link-btn btn-custom"
        >
          Create Employee Type
        </Link>
      </div>
      <div className="px-3">
        <Table responsive hover bordered>
          <thead>
            <tr>
              <th colSpan={3}>
                <div className="d-flex justify-content-center gap-1">
                  <Form.Control
                    type="text"
                    id="search"
                    size="sm"
                    placeholder="Search by Employee Type"
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
              {["Edit", "Employee Type", "Department", "Is Active"].map(
                (_, index) => (
                  <th key={index}>{_}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {renderEmployeeTypes.map((_, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/hr/employeeTypes/:${_._id}`}
                    className="router-link-btn btn-custom"
                    state={{ employeeType: _ }}
                  >
                    Edit
                  </Link>
                </td>
                <td>{_.employeeType}</td>
                <td>{_.department_name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={_.is_active}
                    disabled={true}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td className="text-end  px-5" colSpan="4">
                <strong>Total {renderEmployeeTypes.length}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeTypesContainer;
