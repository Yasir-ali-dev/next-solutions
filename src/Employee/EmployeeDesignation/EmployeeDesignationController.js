import axios from "axios";
import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import EmployeeHeader from "../../components/EmployeeHeader";
import TableLength from "../../components/TableLength";
import TableHeadComponent from "../../components/TableHeadComponent";

import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const EmployeeDesignationController = () => {
  const [employeeDesignations, setEmployeeDesignations] = useState([]);
  const [renderEmployeeDesignations, setRenderEmployeeDesignations] = useState(
    []
  );
  const [search, setSearch] = useState("");
  const fetchEmployeeDesignations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeeDesignations/"
      );
      const data = response.data;
      setEmployeeDesignations(data.allEmployeeDesignations);
      setRenderEmployeeDesignations(data.allEmployeeDesignations);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  useEffect(() => {
    fetchEmployeeDesignations();
  }, []);

  const handleSearch = () => {
    setRenderEmployeeDesignations((prevState) =>
      prevState.filter((_, index) => _.designation.includes(search))
    );
  };

  return (
    <div className="ubuntu bg" style={{ height: "100vh" }}>
      <EmployeeHeader
        btnText={"Create Employee Designation"}
        renderTo="/hr/employeeDesignations/employeeDesignationForm"
        title={"Employee Designations"}
      />
      <BackButton to={"hr"} />
      <div className="px-3">
        <Table responsive hover bordered>
          <TableHeadComponent
            placeholder={"Employee Designation"}
            setSearch={setSearch}
            handleSearch={handleSearch}
            setRender={setRenderEmployeeDesignations}
            data={employeeDesignations}
            headings={["Edit", "Employee Designation"]}
          />
          <tbody>
            {renderEmployeeDesignations.map((_, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/hr/employeeDesignations/:${_._id}`}
                    className="router-link-btn btn-custom"
                    state={{ employeeDesignation: _ }}
                  >
                    Edit
                  </Link>
                </td>
                <td>{_.designation}</td>
              </tr>
            ))}
            <TableLength
              colSpan="3"
              length={renderEmployeeDesignations.length}
            />
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeDesignationController;
