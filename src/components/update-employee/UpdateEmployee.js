import React, {Fragment, useEffect, useState} from "react";
import {useParams , useHistory} from 'react-router-dom';
import Axios from "axios";
import Snakebar from '../common/Snakebar'
import CircularProgress from '@material-ui/core/CircularProgress';

const  UpdateEmployee = () => {
    const {id} = useParams();
    const  history = useHistory();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [message, setMessage] = useState(false)
    const  [isSubmitted , setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false)
    const  [employee , setEmployee] = useState({
        first_name : '',
        last_name : '',
        email : '',
        gender : '',
        mobile : ''
    });


    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/employees/${id}`).then((response) => {
            setEmployee(response.data);
        }).catch((err) => {
            console.error(err);
        });
    } , []);

    const updateEmployee = (e) => {
        setLoading(true)
        e.preventDefault();
        Axios.put(`http://localhost:8000/api/employees/${id}`, employee).then((response) => {
            setInterval(() => {
                setSubmitted(true)
            }, 2000)
            setType("success");
            setMessage("Employee Updated sucessfully");
            setOpen(true);
            setLoading(false)
        }).catch((err) => {
            console.error(err);
            console.error(err);
            setType("error");
            setMessage(err.response.data.error);
            setOpen(true);
            setLoading(false)
        });
    };

    return(
        <Fragment>
            <Snakebar
                type={type}
                message={message}
                open={open}
                close={handleClose}
            />
            {
                isSubmitted ? history.push('/') :

                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="card">
                                    <div className="card-header bg-primary text-white">
                                        <h3>Update Employee</h3>
                                    </div>
                                    <div className="card-body bg-light">
                                        <form >
                                            <div className="form-group">
                                                <input
                                                    required
                                                    value={employee.first_name}
                                                    onChange={(e) => setEmployee({
                                                        ...employee,
                                                        first_name: e.target.value
                                                    })}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="First Name"/>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    required
                                                    value={employee.last_name}
                                                    onChange={(e) => setEmployee({
                                                        ...employee,
                                                        last_name: e.target.value
                                                    })}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Last Name"/>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    required
                                                    value={employee.email}
                                                    onChange={(e) => setEmployee({...employee, email: e.target.value})}
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email"/>
                                            </div>
                                            <div className="form-group">
                                                <select
                                                    required
                                                    value={employee.gender}
                                                    onChange={(e) => setEmployee({...employee, gender: e.target.value})}
                                                    className="form-control">
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    required
                                                    value={employee.mobile}
                                                    onChange={(e) => setEmployee({
                                                        ...employee,
                                                        mobile: e.target.value
                                                    })}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Mobile"/>
                                            </div>
                                            <div className="form-group">
                                                <button className=" btn btn btn-lg btn-block btn-primary"
                                                    onClick={updateEmployee}
                                                >
                                                    {
                                                        loading ? (<CircularProgress size={16} style={{ color: "white" }} />) : "submit"
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </Fragment>
    );
};
export default UpdateEmployee;