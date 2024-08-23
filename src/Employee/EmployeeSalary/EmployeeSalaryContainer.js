import axios from "axios";
import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import EmployeeHeader from "../../components/EmployeeHeader";
import TableLength from "../../components/TableLength";
import TableHeadComponent from "../../components/TableHeadComponent";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const EmployeeSalaryContainer = () => {
  const [employeeSalaries, setEmployeeSalaries] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/employeeSalaries/"
      );
      const data = response.data;
      setEmployeeSalaries(data.employeeSalaries);
      const ids = [];
      data.employeeSalaries.forEach((element) => {
        ids.push(element.employeeInfo);
      });
      ids.map(async (id) => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/v1/employeesInfo/"
          );
          response.data.allEmployeesInfo.map((emp) => {
            setUsernames((prev) => [...prev, emp.username]);
            return emp.username;
          });
        } catch (error) {
          console.error(error.response.data);
        }
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = () => {
    // setRenderEmployeeSalaries((prevState) =>
    //   prevState.filter((_, index) => _.designation.includes(search))
    // );
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
            {employeeSalaries.map((salary, index) => (
              <tr key={`${index}}`}>
                <td>
                  <Link
                    to={`/hr/employeeSalaries/${salary._id}`}
                    className="router-link-btn btn-custom"
                    state={{ employeeSalary: salary }}
                  >
                    Edit
                  </Link>
                </td>
                <td>{usernames[index]}</td>
                <td>{salary.currentSalary}</td>
                <td>{salary.newSalary}</td>
                <td>{salary.changeAmount}</td>
                <td>{salary.changePercentage}</td>
                <td>{salary.effectiveFromDate.slice(0, 10)}</td>
                <td>{salary.creationDate.slice(0, 10)}</td>
                <td>{salary.lastIncrementId}</td>
              </tr>
            ))}

            <TableLength colSpan="9" length={employeeSalaries.length} />
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeSalaryContainer;
