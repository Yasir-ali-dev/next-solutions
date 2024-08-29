import axios from "axios";
import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import EmployeeHeader from "../../components/EmployeeHeader";
import TableLength from "../../components/TableLength";
import TableHeadComponent from "../../components/TableHeadComponent";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const EmployeeSalaryContainer = () => {
  const [employeeSalaries, setEmployeeSalaries] = useState([]);
  const [renderEmployeeSalaries, setRenderEmployeeSalaries] = useState([]);
  const [search, setSearch] = useState("");
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeeSalaries/"
      );
      const data = response.data;
      setEmployeeSalaries(data.employeeSalaries);
      setRenderEmployeeSalaries(data.employeeSalaries);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = () => {
    setRenderEmployeeSalaries((prevState) =>
      prevState.filter((_, index) => _.employeeInfo.includes(search))
    );
  };

  return (
    <div className="ubuntu bg" style={{ height: "100vh" }}>
      <EmployeeHeader
        btnText={"Create Employee Salary"}
        renderTo="/hr/employeeSalaries/employeeSalaryForm"
        title={"Employee Salary Increment"}
      />
      <BackButton to={"hr"} />
      <div className="px-3">
        <Table responsive hover bordered>
          <TableHeadComponent
            placeholder={"Employee"}
            data={employeeSalaries}
            colSpan={8}
            setRender={setRenderEmployeeSalaries}
            handleSearch={handleSearch}
            setSearch={setSearch}
            headings={[
              "Edit",
              "Employee",
              "Current Salary",
              "New Salary",
              "Change Amount",
              "Change Percentage",
              "Effective Date",
              "Creation Date",
              "Last Increment Id",
            ]}
          />
          <tbody>
            {renderEmployeeSalaries.map((salary, index) => (
              <tr key={`${index}}`}>
                <td>
                  <Link
                    to={`/hr/employeeSalaries/:${salary._id}`}
                    className="router-link-btn btn-custom"
                    state={{ EmployeeSalary: salary }}
                  >
                    Edit
                  </Link>
                </td>
                <td>{salary.employeeInfo}</td>
                <td>{salary.currentSalary}</td>
                <td>{salary.newSalary}</td>
                <td>{salary.changeAmount}</td>
                <td>{salary.changePercentage}</td>
                <td>{salary.creationDate.slice(0, 10)}</td>
                <td>
                  {salary.effectiveFromDate &&
                    salary.effectiveFromDate.slice(0, 10)}
                </td>
                <td>{salary.lastIncrementId}</td>
              </tr>
            ))}
            <TableLength colSpan="9" length={renderEmployeeSalaries.length} />
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeSalaryContainer;
