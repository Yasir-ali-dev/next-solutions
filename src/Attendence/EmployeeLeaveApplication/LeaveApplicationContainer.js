import React, { useEffect, useState } from "react";
import EmployeeHeader from "../../components/EmployeeHeader";
import TableLength from "../../components/TableLength";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { Table } from "react-bootstrap";
import TableHeadComponent from "../../components/TableHeadComponent";

const LeaveApplicationContainer = () => {
  const [employeeLeaveApplications, setEmployeeLeaveApplications] = useState(
    []
  );
  // const [renderEmployeeDesignations, setRenderEmployeeDesignations] = useState(
  //   []
  // );
  const [search, setSearch] = useState("");
  const fetchEmployeeLeaveApplications = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:8080/api/v1/employeeDesignations/"
    //     );
    //     const data = response.data;
    //     setEmployeeDesignations(data.allEmployeeDesignations);
    //     setRenderEmployeeDesignations(data.allEmployeeDesignations);
    //   } catch (error) {
    //     console.error(error.response.data);
    //   }
  };
  useEffect(() => {
    fetchEmployeeLeaveApplications();
  }, []);

  const handleSearch = () => {
    //   setRenderEmployeeDesignations((prevState) =>
    //     prevState.filter((_, index) => _.designation.includes(search))
    //   );
  };
  return (
    <div>
      <EmployeeHeader
        title={"Employee Leave Application"}
        btnText={"Back"}
        renderTo={"/hr"}
      />
      <BackButton to={"hr"} />
      <div className="px-3">
        <Table responsive hover bordered>
          <TableHeadComponent
            placeholder={"Employee Designation"}
            setSearch={setSearch}
            handleSearch={handleSearch}
            setRender={setEmployeeLeaveApplications}
            data={employeeLeaveApplications}
            headings={["Edit", "Employee Designation"]}
          />
          <tbody>
            {employeeLeaveApplications.map((_, index) => (
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
              colSpan="5"
              length={employeeLeaveApplications.length}
            />
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default LeaveApplicationContainer;
