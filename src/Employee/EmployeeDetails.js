import React from "react";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const params = useParams();
  console.log(params);
  return <div>fsa</div>;
};

export default EmployeeDetails;
