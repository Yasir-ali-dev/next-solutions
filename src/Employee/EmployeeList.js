import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Card, Container, Form, Image, Pagination } from "react-bootstrap";

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
  {
    id: 6,
    hired_date: "2022-07-18",
    name: "Emily Clark",
    birth_date: "1995-10-25",
    religion: "Christianity",
    cnic: "56789-0123456-7",
    guardian: "Thomas Clark",
    gender: "Female",
    nationality: "British",
    city: "London",
    state: "London",
    email: "emily.clark@example.com",
    zipcode: "E1 6AN",
    phone: "555-2345",
    current_address: "123 Abbey Rd, London, E1 6AN",
    permanent_address: "456 Baker St, London, E1 6AR",
    designation: "UX Designer",
    department_name: "Design",
    employee_type: "Full-time",
    location_name: "Headquarters",
    work_calander: "Monday to Friday",
    payroll: "Monthly",
    working_status: "Active",
    employee_grade: "B",
    supervisor: "Charles Green",
    is_sales_representative: false,
    is_delivery_man: false,
  },
  {
    id: 7,
    hired_date: "2021-02-10",
    name: "Carlos Gomez",
    birth_date: "1987-06-17",
    religion: "Christianity",
    cnic: "67890-1234567-8",
    guardian: "Maria Gomez",
    gender: "Male",
    nationality: "Mexican",
    city: "Mexico City",
    state: "CDMX",
    email: "carlos.gomez@example.com",
    zipcode: "01000",
    phone: "555-6789",
    current_address: "789 Reforma Ave, Mexico City, CDMX 01000",
    permanent_address: "101 Insurgentes Ave, Mexico City, CDMX 01001",
    designation: "Backend Developer",
    department_name: "Engineering",
    employee_type: "Full-time",
    location_name: "Branch Office",
    work_calander: "Monday to Friday",
    payroll: "Monthly",
    working_status: "Active",
    employee_grade: "A",
    supervisor: "Luisa Martinez",
    is_sales_representative: false,
    is_delivery_man: false,
  },
  {
    id: 8,
    hired_date: "2023-01-29",
    name: "Sophia Wang",
    birth_date: "1998-12-09",
    religion: "Buddhism",
    cnic: "78901-2345678-9",
    guardian: "James Wang",
    gender: "Female",
    nationality: "Chinese",
    city: "Beijing",
    state: "Beijing",
    email: "sophia.wang@example.com",
    zipcode: "100010",
    phone: "555-3456",
    current_address: "234 Tsinghua Rd, Beijing, 100010",
    permanent_address: "567 Peking St, Beijing, 100012",
    designation: "Data Scientist",
    department_name: "Data Science",
    employee_type: "Full-time",
    location_name: "Branch Office",
    work_calander: "Monday to Friday",
    payroll: "Monthly",
    working_status: "Active",
    employee_grade: "A",
    supervisor: "Yi Zhang",
    is_sales_representative: false,
    is_delivery_man: false,
  },
  {
    id: 9,
    hired_date: "2020-11-11",
    name: "Ahmed Khan",
    birth_date: "1982-03-22",
    religion: "Islam",
    cnic: "89012-3456789-0",
    guardian: "Fatima Khan",
    gender: "Male",
    nationality: "Pakistani",
    city: "Karachi",
    state: "Sindh",
    email: "ahmed.khan@example.com",
    zipcode: "75500",
    phone: "555-4567",
    current_address: "123 Clifton St, Karachi, Sindh 75500",
    permanent_address: "456 DHA Rd, Karachi, Sindh 75501",
    designation: "HR Specialist",
    department_name: "Human Resources",
    employee_type: "Full-time",
    location_name: "Headquarters",
    work_calander: "Monday to Friday",
    payroll: "Monthly",
    working_status: "Active",
    employee_grade: "B",
    supervisor: "Ayesha Ali",
    is_sales_representative: false,
    is_delivery_man: false,
  },
  {
    id: 10,
    hired_date: "2018-06-14",
    name: "Hiroshi Tanaka",
    birth_date: "1979-09-30",
    religion: "Shinto",
    cnic: "90123-4567890-1",
    guardian: "Yuki Tanaka",
    gender: "Male",
    nationality: "Japanese",
    city: "Tokyo",
    state: "Tokyo",
    email: "hiroshi.tanaka@example.com",
    zipcode: "100-0001",
    phone: "555-7891",
    current_address: "123 Shibuya St, Tokyo, 100-0001",
    permanent_address: "456 Roppongi St, Tokyo, 100-0002",
    designation: "Marketing Manager",
    department_name: "Marketing",
    employee_type: "Full-time",
    location_name: "Branch Office",
    work_calander: "Monday to Friday",
    payroll: "Monthly",
    working_status: "Active",
    employee_grade: "A",
    supervisor: "Takashi Yamamoto",
    is_sales_representative: false,
    is_delivery_man: false,
  },
];

const EmployeeList = () => {
  const [employees, setEmployees] = useState(arrayOfEmployees);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const totalPages = Math.max(1, Math.ceil(employees.length / itemsPerPage)); // Ensure
  const [paginatedItems, setPaginatedItems] = useState([]);

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
            <option value={`3`}>3 items per page </option>
            <option value="5">5 items per page </option>
            <option value="10">10 items per page</option>
          </Form.Select>
        </div>
        <button type="buttin" className="btn-custom">
          Create Employee
        </button>
      </div>

      <div className="d-flex gap-3 justify-content-between flex-wrap py-3">
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
      <Pagination size="sm">{paginationItems}</Pagination>
    </Container>
  );
};

export default EmployeeList;
