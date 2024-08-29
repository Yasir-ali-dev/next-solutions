import React, { useState } from 'react'
import {  Form, Image, Nav, Navbar, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../index.css"
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, XAxis, YAxis } from 'recharts';

const COLORS = ['#0088FE', '#FF8042'];

const Dashboard = () => {
    const [search,setSearch]=useState("");
    const handleSearch=()=>{
       console.log(search) 
    }
  return (
    <div>
        <Navbar className='roboto form-heading-color px-3' >
            <Navbar.Brand >Human Resource</Navbar.Brand>
            <Nav className="d-flex px-3 justify-content-center gap-3" >
                <Link className='router-link' to={"/hr/employees"}>Employees</Link>
                <Link className='router-link' to={"/hr/employeeTypes"}>  Employee Types</Link>
                <Link className='router-link' to={"/hr/employeeGrades"}>Employee Scale</Link>
                <Link className='router-link' to={"/hr/workCalenders"}>Work Calenders</Link>
                <Link className='router-link' to={"/hr/employeeDesignations"}>Designations </Link>
                <Link className='router-link' to={"/hr/employeeJobs"}>Employee Jobs</Link>
                <Link className='router-link' to={"/hr/employeePerFormanceCriteria"}>Performance Criteria</Link>
                <Link className='router-link' to={"/hr/employeePayElements"}>Pay Elements</Link>
                <Link className='router-link' to={"/hr/employeeSalaries"}>Employee Salary</Link>
                <Link className='router-link' to={"/hr/employeePerFormanceEvaluations/"}>PerFormance Evaluations</Link>
                
            </Nav>
        </Navbar>
        <div className='d-flex flex-column'> 
            <div className='row'>
                <div className='col-9 py-2 mb-2 px-4 d-flex flex-column'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center gap-5 justify-content-between'>
                            <div className='p-1 d-flex align-items-center'>
                                <Image src='/hr/employees.png' width="30px"/>
                                <p className='pt-3 ps-2'>Total Employees</p>
                            </div>
                            <h5>
                                <span className='badge mt-2 text-bg-secondary'>
                                    93
                                </span>
                            </h5>
                        </div>
                        <div className='d-flex align-items-center gap-5 justify-content-between'>
                            <div className='p-1 d-flex align-items-center'>
                                <Image src='/hr/management.png' width="30px"/>
                                <p className='pt-3 ps-2'>Total Department</p>
                            </div>
                            <h5>
                                <span className='badge mt-2 text-bg-secondary'>
                                    5
                                </span>
                            </h5>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center flex-wrap align-items-center gap-3'>
                    <div className='border border-end-0 pt-2'>
                        <BarChart width={250} height={250} 
                            data={[{ name: 'Engineering', Engineering: 12  }]}
                            margin={{ top: 0, right: 0, bottom: 0, left: 5 }}
                            barSize={25}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Engineering" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Engineering" fill="#8884d8" />
                        </BarChart>
                        <p className='text-center pt-2 '>Department Wise Employees</p>
                    </div> 
                    <div className='border border-end-0 pt-2'>
                        <BarChart width={250} height={250} 
                            data={[{ name: 'FullTime', FullTime: 12  },{name:"PartTime",PartTime:3},{name:"Contract",Contract:1}]}
                            margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
                            barSize={25}
                            >
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="Full-time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="FullTime" fill="#92d884" />
                            <Bar dataKey="PartTime" fill="#d379bc" />
                            <Bar dataKey="Contract" fill="#79d0d3" />
                        </BarChart>
                        <p className='text-center pt-2'>Type Wise Employees</p>
                    </div>
                    <div className='border border-end-0 pt-2'>
                        <PieChart width={250} height={250} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                            <Pie 
                            data={[ {
                                "name": "Male",
                                "value": 40
                                },
                                {
                                "name": "Female",
                                "value": 3
                                },]}
                                label={(entry) => `${entry.name}: ${entry.value}`}
                                dataKey="value" nameKey="name" cx="50%" cy="50%" 
                                outerRadius={40} fill="#8884d8"
                            >
                                {[ {
                                "name": "Male",
                                "value": 40
                                },
                                {
                                "name": "Female",
                                "value": 3
                                },].map((entry,index)=>{
                                    return <Cell key={index} fill={`${COLORS[index]}`} />
                                })}
                            </Pie>
                        </PieChart>
                        <p className='text-center pt-2'>Type Wise Employees</p>
                    </div>
                     <div className='border border-end-0 pt-2'>
                    <BarChart width={250} height={250} 
                        data={[{ name: 'Working', Working: 5  }]}
                        margin={{ top: 0, right: 0, bottom: 0, left: 5 }}
                        barSize={25}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Working" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Working" fill="#ffa378" />
                    </BarChart>
                    <p className='text-center pt-2'>Status Wise Employees</p>
                    </div> 
                    <div className='border border-end-0 pt-2'>
                        <PieChart width={250} height={250} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                            <Pie 
                            data={[ {
                                "name": "A",
                                "value": 2
                                },
                                {
                                "name": "B",
                                "value": 3
                                },
                                {
                                    "name": "C",
                                    "value": 12
                                    },
                                    {
                                    "name": "D",
                                    "value": 3
                                    },
                            ]}
                                label={(entry) => `${entry.name}: ${entry.value}`}
                                dataKey="value" nameKey="name" cx="50%" cy="50%" 
                                outerRadius={40} fill="#8884d8"
                            >
                                {[ {
                                "name": "Male",
                                "value": 40
                                },
                                {
                                "name": "Female",
                                "value": 3
                                },].map((entry,index)=>{
                                    return <Cell key={index} fill={`${COLORS[index]}`} />
                                })}
                            </Pie>
                        </PieChart>
                        <p className='text-center pt-2'>Grade Wise Employees</p>
                    </div>        
                 </div>    
                </div>
                <div className='col-3 py-3 d-flex flex-column align-items-center border-start'>
                    <div className='d-flex gap-3'>
                        <Image src='/employees/search.png' height="20px" width="20px" />
                        <h5 className='text-center'>Filters</h5>
                    </div>
                    <div 
                        className="d-flex justify-content-center align-items-center"
                    >
                        <Form.Control
                            type="text"
                            id="search"
                            size="sm"
                            placeholder="Search by Name"
                            className="form-field py-1"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                            <button 
                                className="btn-custom fs-6" 
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                    </div>
                </div>
            </div>

        </div>
    </div> 
  )
}

export default Dashboard;
