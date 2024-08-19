import React, { useEffect, useState } from "react";
import { Card, Form, Image, Pagination } from "react-bootstrap";
import "../index.css";
import { Link } from "react-router-dom";

import { arrayOfEmployees } from "../utils/employeeData";
const EmployeeList = () => {
  const [employees, setEmployees] = useState(arrayOfEmployees);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.max(1, Math.ceil(employees.length / itemsPerPage)); // Ensure
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [search, setSearch] = useState("");

  const handleItemsPerPage = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setPaginatedItems(
      employees.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [itemsPerPage, employees, currentPage]);

  const handleSelectChange = (event) => {
    const order = event.target.value;

    if (order === "ascending") {
      setEmployees((prevEmployees) =>
        [...prevEmployees].sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        })
      );
    } else if (order === "descending") {
      setEmployees((prevEmployees) =>
        [...prevEmployees].sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
          return 0;
        })
      );
    } else if (order === "clear") {
      setEmployees(arrayOfEmployees);
    }
    setCurrentPage(1); // Reset to the first page when sorting changes
  };

  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handleSearch = () => {
    console.log(search);
    const employeeWithSearchName = employees.filter(
      (employee) => employee.name.toLowerCase() == search.toLowerCase()
    );
    if (employeeWithSearchName.length < 1) {
    }
    setEmployees(employeeWithSearchName);
    setCurrentPage(1);
  };

  if (employees.length < 1) {
    setTimeout(() => {
      setEmployees(arrayOfEmployees);
    }, 2000);
  }

  return (
    <div className="ubuntu">
      <div className="py-1 px-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">Employees</h4>
        <Link
          to="/hr/employees/employeeform"
          className="router-link-btn btn-custom"
        >
          Create Employee
        </Link>
      </div>
      <div className="form-heading-color mt-1 p-1 ms-md-5">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <Form.Select
            onChange={handleSelectChange}
            aria-label="Default select example"
            size="sm"
            className="w-50"
          >
            <option value="">Filter</option>
            <option value="ascending">ascending</option>
            <option value="descending">descending</option>
            <option value="clear">clear</option>
          </Form.Select>
          <Form.Select
            aria-label="Page select"
            value={itemsPerPage}
            onChange={handleItemsPerPage}
            size="sm"
            className="w-50"
          >
            <option value={`3`}>3 items per page </option>
            <option value="5">5 items per page </option>
            <option value="10">10 items per page</option>
          </Form.Select>

          <div className="d-flex justify-content-center w-50 align-items-center">
            <Form.Control
              type="text"
              id="search"
              size="sm"
              placeholder="Search by Name"
              className="form-field"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-button-style" onClick={handleSearch}>
              <Image src={`/employees/search.png`} />
            </button>
          </div>
          <div className="w-50 py-1 d-flex justify-content-end gap-2">
            <button
              className="btn-custom text-center"
              onClick={() => setEmployees(arrayOfEmployees)}
            >
              Clear Search
            </button>
          </div>
        </div>
      </div>
      {employees.length < 1 ? (
        <>
          <div className="p-5 d-flex gap-4 justify-content-center">
            <Image src="/employees/empty.png" />
          </div>
          <h5 className="text-center py-3 ubuntu">No data Found</h5>
        </>
      ) : (
        <>
          <div className="d-flex px-2 gap-4 justify-content-center flex-wrap py-3">
            {paginatedItems.map((employee, index) => {
              return (
                <Card key={index} style={{ width: "20rem" }}>
                  <Card.Header style={{ backgroundColor: "#c1e6fa" }}>
                    <Link
                      className="router-link d-flex align-items-center justify-content-between"
                      to={`/hr/employees/${employee.id}`}
                    >
                      <h5>{employee.name}</h5>
                      <Image src="/person.png" width="35px" />
                    </Link>
                  </Card.Header>
                  <Card.Body>
                    <p>Department: {employee.department_name}</p>
                    <div className="d-flex justify-content-between">
                      <p className="form-text">{employee.designation}</p>
                      <p className="form-text">
                        Hired Date: {employee.hired_date}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
          <div className="d-flex py-2 justify-content-center">
            <Pagination size="sm">{paginationItems}</Pagination>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
