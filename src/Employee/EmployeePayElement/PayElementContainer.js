import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Image, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";
import EmployeeHeader from "../../components/EmployeeHeader";

const PayElementConatiner = () => {
  const [payElements, setPayElements] = useState([]);
  const [renderPayElements, setRenderPayElements] = useState([]);
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);

  const fetchPayElement = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeePayElements/"
      );
      const data = response.data;
      setPayElements(data.employeePayElement);
      setRenderPayElements(data.employeePayElement);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchPayElement();
  }, []);

  const handleSearch = () => {
    setRenderPayElements((prevState) =>
      prevState.filter((_, index) => _.element_type.includes(search))
    );
    setSearch("");
  };

  const handleReset = () => {
    setRenderPayElements(payElements);
  };

  return (
    <div className="ubuntu bg" style={{ height: "100vh" }}>
      <EmployeeHeader
        btnText={"Employee Pay Elements"}
        renderTo="/hr/employeePayElements/employeePayElementForm"
        title={"Create Pay Element"}
      />
      <BackButton to={"hr"} />
      <div className="px-3">
        <Table responsive hover>
          <thead>
            <tr className="py-1">
              <th colSpan={5}>
                <div className="d-flex justify-content-center gap-1">
                  <Form.Control
                    type="text"
                    id="search"
                    size="sm"
                    placeholder="Search by Employee Pay Element Type"
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
                  className="ms-auto router-link-btn btn-custom-light"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </th>
            </tr>
            <tr className="py-1">
              {[
                "Edit",
                "Employee",
                "Pay Element Type",
                "Processing Type",
                "Entry Type",
                "Start Date",
                "End Date",
              ].map((_, index) => (
                <th key={index}>{_}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderPayElements.map((_, index) => (
              <tr key={index} className="py-2">
                <td>
                  <Link
                    to={`/hr/employeePayElements/:${_._id}`}
                    className="router-link-btn btn-custom"
                    state={{
                      payElementObj: _,
                      username: _.employeeInfo,
                    }}
                  >
                    Edit
                  </Link>
                </td>
                <td>{_.employeeInfo}</td>
                <td>{_.element_type}</td>
                <td>{_.processing_type}</td>
                <td>{_.entry_type}</td>
                <td>{_.start_date.slice(0, 10)}</td>
                <td>{_.end_date.slice(0, 10)}</td>
              </tr>
            ))}
            <tr className="py-2">
              <td className="text-end  px-5" colSpan="7">
                <strong>Total {renderPayElements.length}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PayElementConatiner;
