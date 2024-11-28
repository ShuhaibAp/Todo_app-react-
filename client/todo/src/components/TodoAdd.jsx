import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddTodo } from '../APIs/FetchApi';
import './form.css'
import { Link } from 'react-router-dom';

function TodoAdd() {
    const [todoadd,setTodoAdd]=useState({
      title:"",desc:"",due_date:"",status:""
    })
    console.log(todoadd);
    const Navigate=useNavigate()

    const Cancel=()=>{
      Navigate('/')
    }

    const SubmitTodo=()=>{
      const {title,desc,due_date}=todoadd
      if(!title || !desc || !due_date){
        toast.error("Invalid Input")
      }
      else{
        AddTodo(todoadd).then((res)=>{
          console.log(res.data);
          toast.success("New task added")
          Navigate('/') 
        }).catch((err)=>{
          console.error(err);
          
        })
      }
    }

    

  return (
    <>
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <div className="container-fluid">
                    {/* Brand Section */}
                    <span
                        className="navbar-brand"
                        style={{
                            fontSize: '25px',
                            fontFamily: '"Bakbak One", sans-serif',
                            fontWeight: '700',
                        }}
                    >
                        <i
                            className="fa-regular fa-square-check"
                            style={{
                                color: '#000000',
                                fontSize: '23px',
                                marginRight: '10px',
                            }}
                        ></i>
                        FUTURE LOG
                    </span>

                    {/* Toggler Button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible Links */}
                    <div className="collapse navbar-collapse" id="navbarContent">
                        <div className="ms-auto d-flex gap-2">
                            <Link to="/" className="btn btn-dark">
                                List
                            </Link>
                            <Link to="/calendar" className="btn btn-dark">
                                Calendar
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mt-5 form-container">
                <h2 className="text-center mb-4">Add New Task</h2>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter todo title"
                        onChange={(e) => { setTodoAdd({ ...todoadd, title: e.target.value }) }}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        placeholder="Enter todo description"
                        rows="5"
                        onChange={(e) => { setTodoAdd({ ...todoadd, desc: e.target.value }) }}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input
                        type="date"
                        className="form-control"
                        onChange={(e) => { setTodoAdd({ ...todoadd, due_date: e.target.value }) }}
                        required
                    />
                </div>
               <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-control"
                        value={todoadd.status} // Bind the value to the state
                        onChange={(e) => {
                            setTodoAdd({ ...todoadd, status: e.target.value });
                        }}
                        required
                    >
                        <option value="" disabled>Select status</option> {/* Placeholder */}
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="button-container">
                    <button type="button" className="btn btn-danger mx-3" onClick={Cancel}>Cancel</button>
                    <button type="submit" className="btn btn-primary" onClick={(e) => { SubmitTodo(e) }}>Submit</button>
                </div>
            </div>
        </>
  )
}

export default TodoAdd
