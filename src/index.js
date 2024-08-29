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
import PayElementConatiner from "./Employee/EmployeePayElement/PayElementContainer";
import PayElementForm from "./Employee/EmployeePayElement/PayElementForm";
import PayElementEdit from "./Employee/EmployeePayElement/PayElementEdit";
import EmployeeJobsContainer from "./Employee/EmployeeJobs/EmployeeJobsContainer";
import EmployeeJobsForm from "./Employee/EmployeeJobs/EmployeeJobsForm";
import EmployeeJobsEdit from "./Employee/EmployeeJobs/EmployeeJobsEdit";
import PerFormanceCriteriaContainer from "./Employee/PerformanceCriteria/PerFormanceCriteriaContainer";
import PerformanceCriteriaForm from "./Employee/PerformanceCriteria/PerFormanceCriteriaForm";
import PerformanceCriteriaEdit from "./Employee/PerformanceCriteria/PerformanceCriteriaEdit";
import EmployeeDesignationController from "./Employee/EmployeeDesignation/EmployeeDesignationController";
import EmployeeDesignationForm from "./Employee/EmployeeDesignation/EmployeeDesignationForm";
import EmployeeDesignationEdit from "./Employee/EmployeeDesignation/EmployeeDesignationEdit";
import EmployeeSalaryContainer from "./Employee/EmployeeSalary/EmployeeSalaryContainer";
import EmployeeSalaryForm from "./Employee/EmployeeSalary/EmployeeSalaryForm";
import EmployeeSalaryEdit from "./Employee/EmployeeSalary/EmployeeSalaryEdit";
import PerformanceEvaluationForm from "./Employee/PerformanceEvaluation/PerformanceEvaluationForm";
import PerformanceEvaluationContainer from "./Employee/PerformanceEvaluation/PerformanceEvaluationContainer";
import PerformanceEvaluationEdit from "./Employee/PerformanceEvaluation/PerformanceEvaluationEdit";

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
      {/* employee pay element type */}
      <Route path="/hr/employeePayElements" element={<PayElementConatiner />} />
      <Route
        path="/hr/employeePayElements/employeePayElementForm"
        element={<PayElementForm />}
      />
      <Route path="/hr/employeePayElements/:id" element={<PayElementEdit />} />
      {/* employee jobs */}
      <Route path="/hr/employeeJobs" element={<EmployeeJobsContainer />} />
      <Route
        path="/hr/employeeJobs/employeeJobForm"
        element={<EmployeeJobsForm />}
      />
      <Route path="/hr/employeeJobs/:id" element={<EmployeeJobsEdit />} />
      {/* employee PerFormance Criteria */}
      <Route
        path="/hr/employeePerFormanceCriteria"
        element={<PerFormanceCriteriaContainer />}
      />
      <Route
        path="/hr/employeePerFormanceCriteria/PerFormanceCriteriaForm"
        element={<PerformanceCriteriaForm />}
      />
      <Route
        path="/hr/employeePerFormanceCriteria/:id"
        element={<PerformanceCriteriaEdit />}
      />
      {/* designations */}
      <Route
        path="/hr/employeeDesignations"
        element={<EmployeeDesignationController />}
      />
      <Route
        path="/hr/employeeDesignations/employeeDesignationForm"
        element={<EmployeeDesignationForm />}
      />
      <Route
        path="/hr/employeeDesignations/:id"
        element={<EmployeeDesignationEdit />}
      />
      {/* salary */}
      <Route
        path="/hr/employeeSalaries/"
        element={<EmployeeSalaryContainer />}
      />
      <Route
        path="/hr/employeeSalaries/employeeSalaryForm"
        element={<EmployeeSalaryForm />}
      />
      <Route path="/hr/employeeSalaries/:id" element={<EmployeeSalaryEdit />} />

      {/* Performance Evaluation */}
      <Route
        path="/hr/employeePerFormanceEvaluations/"
        element={<PerformanceEvaluationContainer />}
      />
      <Route
        path="/hr/employeePerFormanceEvaluations/employeePerFormanceEvaluationForm"
        element={<PerformanceEvaluationForm />}
      />
      <Route
        path="hr/employeePerFormanceEvaluations/:id"
        element={<PerformanceEvaluationEdit />}
      />

      {/* not found handler */}
      <Route path="*" element={<PageNotFoundComponent />} />
    </Routes>
  </BrowserRouter>
);
