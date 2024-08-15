import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./LoginSignup/Signup";
import PageNotFoundComponent from "./PageNotFound/PageNotFoundComponent";
import EmployeeForm from "./Employee/EmployeeForm";
import EmployeeList from "./Employee/EmployeeList";
import EmployeeDetails from "./Employee/EmployeeDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <PageNotFoundComponent />,
  },
  {
    path: "/hr",
    element: <EmployeeList />, // Parent component
    children: [
      {
        path: "employees",
        element: <EmployeeList />, // List of employees
      },
      {
        path: "employeeform",
        element: <EmployeeForm />,
      },
      {
        path: "employees/:id", // Details view for a specific employee
        element: <EmployeeDetails />,
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
