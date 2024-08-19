import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./LoginSignup/Signup";
import PageNotFoundComponent from "./PageNotFound/PageNotFoundComponent";
import EmployeeForm from "./Employee/EmployeeForm";
import EmployeeList from "./Employee/EmployeeList";
import EmployeeDetails from "./Employee/EmployeeDetails";
import Dashboard from "./HR/Dashboard";
import EmployeeTypesContainer from "./Employee/EmployeeTypes/EmployeeTypesContainer";
import EmployeeTypeFrom from "./Employee/EmployeeTypes/EmployeeTypeForm";
import EmployeeTypeEdit from "./Employee/EmployeeTypes/EmployeeTypeEdit";
import EmployeeGradesContainer from "./Employee/EmployeeGrades/EmployeeGradesContainer";
import EmployeeGradeForm from "./Employee/EmployeeGrades/EmployeeGradeForm";
import EmployeeGradeEdit from "./Employee/EmployeeGrades/EmployeeGradeEdit";
import WorkCalenderContainer from "./Employee/WorkCalender/WorkCalenderContainer";
import WorkCalenderForm from "./Employee/WorkCalender/WorkCalenderForm";
import WorkCalenderEdit from "./Employee/WorkCalender/WorkCalenderEdit";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/hr" element={<Dashboard />} />

      {/* employees info */}
      <Route path="/hr/employees" element={<EmployeeList />} />
      <Route path="/hr/employees/employeeform" element={<EmployeeForm />} />
      <Route path="/hr/employees/:id" element={<EmployeeDetails />} />

      {/* employee types */}
      <Route path="/hr/employeeTypes/" element={<EmployeeTypesContainer />} />
      <Route
        path="/hr/employeeTypes/employeeTypeForm"
        element={<EmployeeTypeFrom />}
      />
      <Route path="/hr/employeeTypes/:id" element={<EmployeeTypeEdit />} />

      {/* employee grades */}
      <Route path="/hr/employeeGrades/" element={<EmployeeGradesContainer />} />
      <Route path="/hr/employeeGrades/:id" element={<EmployeeGradeEdit />} />
      <Route
        path="/hr/employeeGrades/employeeGradeForm"
        element={<EmployeeGradeForm />}
      />

      {/* work calender */}
      <Route path="/hr/workCalenders" element={<WorkCalenderContainer />} />
      <Route
        path="/hr/workCalenders/workCalenderForm"
        element={<WorkCalenderForm />}
      />
      <Route path="/hr/workCalenders/:id" element={<WorkCalenderEdit />} />

      {/* not found handler */}
      <Route path="*" element={<PageNotFoundComponent />} />
    </Routes>
  </BrowserRouter>
);
