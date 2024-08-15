import { Button } from "bootstrap";
import React, { useState } from "react";
import {
  ButtonGroup,
  Card,
  Container,
  Form,
  Image,
  Pagination,
} from "react-bootstrap";

const arrayOfEmployees = [
  {
    id: 1,
    hired_date: "2023-05-15",
    name: "John Doe",
    birth_date: "1990-04-12",
    religion: "Christianity",
    cnic: "12345-6789012-3",
    guardian: "Jane Doe",
    gender: "Male",
    nationality: "American",
    city: "New York",
    state: "NY",
    email: "john.doe@example.com",
    zipcode: "10001",
    phone: "555-1234",
    current_address: "123 Elm St, New York, NY 10001",
    permanent_address: "456 Oak St, New York, NY 10002",
    designation: "Software Engineer",
    department_name: "Engineering",
    employee_type: "Full-time",
    location_name: "Headquarters",
    work_calander: "Monday to Friday",
    payroll: "Monthly",
    working_status: "Active",
    employee_grade: "A",
    supervisor: "Mary Smith",
    is_sales_representative: false,
    is_delivery_man: false,
  },
  {
    id: 2,
    hired_date: "2022-11-01",
    name: "Alice Johnson",
    birth_date: "1985-07-22",
    religion: "Islam",
    cnic: "23456-7890123-4",
    guardian: "Mohamed Johnson",
    gender: "Female",
    nationality: "British",
    city: "London",
    state: "ENG",
    email: "alice.johnson@example.com",
    zipcode: "E1 6AN",
    phone: "020-7946-0857",
    current_address: "789 Maple St, London, ENG E1 6AN",
    permanent_address: "101 Pine St, London, ENG E1 7AN",
    designation: "Marketing Manager",
    department_name: "Marketing",
    employee_type: "Part-time",
    location_name: "London Office",
    work_calander: "Monday to Friday",
    payroll: "Bi-weekly",
    working_status: "Active",
    employee_grade: "B",
    supervisor: "David Brown",
    is_sales_representative: true,
    is_delivery_man: false,
  },
  {
    id: 3,
    hired_date: "2024-01-20",
    name: "Mohamed Ali",
    birth_date: "1992-12-10",
    religion: "Islam",
    cnic: "34567-8901234-5",
    guardian: "Fatima Ali",
    gender: "Male",
    nationality: "Pakistani",
    city: "Karachi",
    state: "SD",
    email: "mohamed.ali@example.com",
    zipcode: "74200",
    phone: "021-3456789",
    current_address: "321 Birch St, Karachi, SD 74200",
    permanent_address: "654 Cedar St, Karachi, SD 74201",
    designation: "UX Designer",
    department_name: "Design",
    employee_type: "Contract",
    location_name: "Karachi Office",
    work_calander: "Monday to Friday",
    payroll: "Monthly",
    working_status: "Active",
    employee_grade: "C",
    supervisor: "Zara Khan",
    is_sales_representative: false,
    is_delivery_man: false,
  },
  {
    id: 4,
    hired_date: "2023-08-09",
    name: "Emily Davis",
    birth_date: "1994-03-15",
    religion: "Hinduism",
    cnic: "45678-9012345-6",
    guardian: "James Davis",
    gender: "Female",
    nationality: "Canadian",
    city: "Toronto",
    state: "ON",
    email: "emily.davis@example.com",
    zipcode: "M5A 1A1",
    phone: "416-555-6789",
    current_address: "654 Spruce St, Toronto, ON M5A 1A1",
    permanent_address: "987 Elm St, Toronto, ON M5A 1A2",
    designation: "HR Specialist",
    department_name: "Human Resources",
    employee_type: "Full-time",
    location_name: "Toronto Office",
    work_calander: "Monday to Friday",
    payroll: "Monthly",
    working_status: "Active",
    employee_grade: "B",
    supervisor: "Robert Green",
    is_sales_representative: false,
    is_delivery_man: false,
  },
  {
    id: 5,
    hired_date: "2024-04-10",
    name: "Carlos Martinez",
    birth_date: "1988-06-05",
    religion: "Catholicism",
    cnic: "56789-0123456-7",
    guardian: "Maria Martinez",
    gender: "Male",
    nationality: "Mexican",
    city: "Mexico City",
    state: "CDMX",
    email: "carlos.martinez@example.com",
    zipcode: "01000",
    phone: "55-1234-5678",
    current_address: "123 Pine St, Mexico City, CDMX 01000",
    permanent_address: "456 Cedar St, Mexico City, CDMX 01001",
    designation: "Sales Executive",
    department_name: "Sales",
    employee_type: "Full-time",
    location_name: "Mexico City Office",
    work_calander: "Monday to Saturday",
    payroll: "Monthly",
    working_status: "Active",
    employee_grade: "A",
    supervisor: "Laura Gomez",
    is_sales_representative: true,
    is_delivery_man: false,
  },
];

const EmployeeList = () => {
  const [employees, setEmployees] = useState(arrayOfEmployees);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  console.log(totalPages);
  const handleItemsPerPage = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Get items for the current page
  const paginatedItems = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectChange = (event) => {
    if (event.target.value === "ascending") {
      setEmployees(
        employees.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
      );
    } else if (event.target.value === "descending") {
      setEmployees(
        employees.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        })
      );
    } else if (event.target.value === "clear") {
      setEmployees(arrayOfEmployees);
    }
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

  return (
    <Container className="ubuntu">
      <div className="py-1 px-2 d-flex justify-content-between align-items-center  form-heading-color">
        <h4 className="text-start">Employees</h4>
        <div className="d-flex justify-content-center align-items-center gap-1 ">
          <Form.Select
            onChange={handleSelectChange}
            aria-label="Default select example"
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
          >
            <option value={`3`}>3</option>
            <option value="4">4</option>
            <option value="10">10</option>
          </Form.Select>
        </div>
        <button type="buttin" className="btn-custom">
          Create Employee
        </button>
      </div>

      <div className="d-flex gap-3 flex-wrap py-3">
        {paginatedItems.map((employee, index) => {
          return (
            <Card key={index} style={{ width: "20rem" }}>
              <Card.Header
                className="d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#c1e6fa" }}
              >
                <h5>{employee.name}</h5>
                <Image src="/person.png" width="35px" />
              </Card.Header>
              <Card.Body>
                <p>Department: {employee.department_name}</p>
                <div className="d-flex justify-content-between">
                  <p className="form-text">{employee.designation}</p>
                  <p className="form-text">Hired Date: {employee.hired_date}</p>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <Pagination size="lg">{paginationItems}</Pagination>
    </Container>
  );
};

export default EmployeeList;
