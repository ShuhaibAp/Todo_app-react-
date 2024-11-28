import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { TodoDet } from '../APIs/FetchApi'
import { UpdTodo } from '../APIs/FetchApi'
import { toast } from 'react-toastify'
import './form.css'
import { Link } from 'react-router-dom'

function TodoEdit() {
  const [todoedit,setTodoEdit]=useState({
    title:"",desc:"",data:""
  })
  const {id}=useParams()
  const Navigate=useNavigate()
  useEffect(()=>{
    TodoDet(id).then((res)=>{
        setTodoEdit(res.data)
        console.log(res.data);
    })
  },[])
  console.log(todoedit);

  const Cancel=()=>{
    Navigate('/')
  }

  const UpdateTodo=()=>{
    UpdTodo(id,todoedit).then((res)=>{
      toast.success("Task updated")
      Navigate('/')
    }).catch((err)=>{
      console.error(err);
      
    })
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
                            <Link to="/add" className="btn btn-dark">
                                New Task
                            </Link>
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
                <h2 className="text-center mb-4">Update Task</h2>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter todo title"
                        value={todoedit.title}
                        onChange={(e) => { setTodoEdit({ ...todoedit, title: e.target.value }) }}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        placeholder="Enter todo description"
                        rows="5"
                        value={todoedit.desc}
                        onChange={(e) => { setTodoEdit({ ...todoedit, desc: e.target.value }) }}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={todoedit.due_date}
                        onChange={(e) => { setTodoEdit({ ...todoedit, due_date: e.target.value }) }}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-control"
                        value={todoedit.status} // Bind the value to the state
                        onChange={(e) => {
                            setTodoEdit({ ...todoedit, status: e.target.value });
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
                    <button type="submit" className="btn btn-primary" onClick={(e) => { UpdateTodo(e) }}>Submit</button>
                </div>
            </div>
        </>
  )
}

export default TodoEdit
