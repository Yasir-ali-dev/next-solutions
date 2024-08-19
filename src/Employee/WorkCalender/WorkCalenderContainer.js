import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Image, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const WorkCalenderContainer = () => {
  const [workCalender, setWorkCalender] = useState([]);
  const [renderWorkCalender, setRenderWorkCalender] = useState([]);
  const [search, setSearch] = useState("");

  const fetchWorkCalender = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/workCalenders/"
      );
      const data = response.data;
      setWorkCalender(data.workCalender);
      setRenderWorkCalender(data.workCalender);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchWorkCalender();
  }, []);

  const handleSearch = () => {
    setRenderWorkCalender((prevState) =>
      prevState.filter((_, index) => _.work_calender.includes(search))
    );
  };

  const handleReset = () => {
    setRenderWorkCalender(workCalender);
  };

  return (
    <div className="ubuntu">
      <div className="py-1 px-2 mb-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">Work Calenders</h4>
        <Link
          to="/hr/workCalenders/workCalenderForm"
          className="router-link-btn btn-custom"
        >
          Create Work Calender
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
                    placeholder="Search by Work Calender"
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
                "Work Calender",
                "Days Per Week",
                "Work Hours Per Day",
              ].map((_, index) => (
                <th key={index}>{_}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderWorkCalender.map((_, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={`/hr/workCalenders/:${_._id}`}
                    className="router-link-btn btn-custom"
                    state={{ workCalender: _ }}
                  >
                    Edit
                  </Link>
                </td>
                <td>{_.work_calender}</td>
                <td>{_.days_per_week}</td>
                <td>{_.work_hours_per_day}</td>
              </tr>
            ))}
            <tr>
              <td className="text-end  px-5" colSpan="4">
                <strong>Total {renderWorkCalender.length}</strong>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default WorkCalenderContainer;
