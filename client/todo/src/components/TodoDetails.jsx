import React from 'react'
import { useParams } from 'react-router-dom'
import { TodoDet } from '../APIs/FetchApi'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DelTodo } from '../APIs/FetchApi'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

function TodoDetails() {

    const {id}=useParams()
    const [todo,setTodo]=useState({})
    const Navigate=useNavigate()

    useEffect(()=>{
      const header={
      "Authorization":`Token ${sessionStorage.getItem("token")}`,
      "Content-Type":"application/json"
      }
        TodoDet(id,header).then((res)=>{
            setTodo(res.data)    
        })
    },[])

    const Delete=()=>{
      const header = {
          "Authorization": `Token ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
      };
      DelTodo(id,header).then((res)=>{
        console.log(res);
        toast.success("Todo Deleted")
        Navigate('/')
      }).catch((res)=>{
        console.error(res);
        
      })
    }

    const Home=()=>{
        Navigate('/')
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

  <div className="container-fluid mt-5">
  <div className="row justify-content-center">
    <div className="col-12 col-md-8 col-lg-6">
      <div className="card">
        <div className="card-header bg-dark text-white text-center">
          <h2 className="card-title">{todo.title}</h2>
        </div>
        <div className="card-body">
          <p className="card-text">
            <strong>Description:</strong> {todo.desc}
          </p>
          <p className="card-text">
            <strong>Status:</strong> {todo.status}
          </p>
          <h6 className="card-subtitle mt-2 mb-2 text-muted">
            Due Date: {todo.date}
          </h6>
        </div>
        <div className="card-footer text-center">
          <button
            className="btn btn-outline-primary me-2"
            onClick={Home}
          >
            Home
          </button>
          <button className="btn btn-outline-danger" onClick={Delete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

</>
  )
}

export default TodoDetails
