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

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/hr" element={<Dashboard />} />
      <Route path="/hr/employees" element={<EmployeeList />} />
      <Route path="/hr/employeeform" element={<EmployeeForm />} />
      <Route path="/hr/employees/:id" element={<EmployeeDetails />} />
      <Route path="*" element={<PageNotFoundComponent />} />
    </Routes>
  </BrowserRouter>
);
