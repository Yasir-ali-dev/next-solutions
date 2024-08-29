import React, { useState } from "react";
import EmployeeHeader from "../../components/EmployeeHeader";
import { Button, Form } from "react-bootstrap";
import SelectComponent from "../../components/SelectComponent";
import { locations, payrolls } from "../../utils/employeeData";
import InputComponent from "../../components/InputComponent";
import "../../index.css";
import { Link } from "react-router-dom";
const TimeAttendenceRegister = () => {
  const [timeAttendence, setTimeAttendence] = useState({
    subsidiary: "",
    location: "",
    payroll: "",
    department: "",
    payroll_period: "",
    employee: "",
    days: Number,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimeAttendence((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(timeAttendence);
  };

  return (
    <React.Fragment className={"ubuntu"}>
      <div>
        <EmployeeHeader
          btnText={"Back"}
          renderTo={"/hr"}
          title={"Generate Attendence Register"}
        />
      </div>
      <div className="d-flex px-5 py-1 justify-content-between align-items-center gap-2">
        <header className="">
          <h5>Attendance Register Form</h5>
        </header>
        <div className="d-flex gap-2 align-items-center">
          {[
            "Generate Attendence",
            "Payroll Process",
            "Employee Register",
            "Employee Summary",
          ].map((_, index) => {
            return (
              <Link
                to={"/hr/timeAttendenceRegister/attendencePrint"}
                key={index}
                className="router-link-btn btn-custom"
              >
                {_}
              </Link>
            );
          })}
        </div>
      </div>

      <Form
        className="p-3 d-flex gap-3 justify-content-evenly align-items-center   flex-wrap"
        onSubmit={handleSubmit}
      >
        <SelectComponent
          title={"subsidiary"}
          values={["multi-techno", "e-networks"]}
          handleChange={handleChange}
          value={timeAttendence.subsidiary}
        />
        <SelectComponent
          title={"location"}
          handleChange={handleChange}
          values={locations}
          value={timeAttendence.location}
        />
        <SelectComponent
          title={"payroll"}
          handleChange={handleChange}
          values={payrolls}
          value={timeAttendence.payroll}
        />
        <SelectComponent
          title={"department"}
          handleChange={handleChange}
          values={["sales", "human resource", "operations"]}
          value={timeAttendence.department}
        />
        <SelectComponent
          title={"payroll_period"}
          values={["month", "week", "3 days"]}
          handleChange={handleChange}
          value={timeAttendence.payroll_period}
        />
        <SelectComponent
          title={"employee"}
          handleChange={handleChange}
          values={["haris", "kaleem"]}
          value={timeAttendence.employee}
        />
        <InputComponent
          title={"days"}
          value={timeAttendence.days}
          handleChange={handleChange}
        />
        <Button variant="outline-primary" type="submit">
          Generate Register
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default TimeAttendenceRegister;
