import React, {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Axios from "axios";

const Home = () => {
    const [employees , setEmployees] = useState([]);

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () => {
        Axios.get(`http://localhost:8000/api/employees`).then((response) => {
            setEmployees(response.data);
        }).catch((err) => {
            console.error(err);
        });
    };

    // deconsteEmployee
    const deleteEmployee = (employeeId) => {
        Axios.delete(`http://localhost:8000/api/employees/${employeeId}`).then((response) => {
            getAllEmployees();
        }).catch((err) => {
            console.error(err);
        });
    };

    return(
        <Fragment>
           {/* <pre>{JSON.stringify(employees)}</pre>*/}
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <h1 className="text-center">Employee Portal</h1>
                        
                        <Link to="/add-employee" className="btn btn-success btn-sm">Add Employee</Link>
                    </div>
                </div>
            </div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <table className="table table-hover table-striped text-center table-light">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <td>SNO</td>
                                    <td>FIRST NAME</td>
                                    <td>LAST NAME</td>
                                    <td>GENDER</td>
                                    <td>EMAIL</td>
                                    <td>Mobile</td>
                                    <td>ACTIONS</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employees.length > 0 ?
                                        <Fragment>
                                            {
                                                employees.map((employee , index) => {
                                                    return (
                                                        <tr key={employee._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{employee.first_name}</td>
                                                            <td>{employee.last_name}</td>
                                                            <td>{employee.gender}</td>
                                                            <td>{employee.email}</td>
                                                            <td>{employee.mobile}</td>
                                                            <td>
                                                                <Link to={`/employees/${employee._id}`} className="btn btn-primary text-white btn-sm">Update</Link>
                                                                
                                                                <button onClick={(e) => { if (window.confirm('Are you sure you wish to delete this Employee?')) deleteEmployee(employee._id) }} className="btn btn-danger btn-sm">Delete</button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </Fragment> :
                                        <Fragment>
                                            <tr className="text-danger font-weight-bold">
                                                <td colSpan="7">No Records Found!</td>
                                            </tr>
                                        </Fragment>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default Home;