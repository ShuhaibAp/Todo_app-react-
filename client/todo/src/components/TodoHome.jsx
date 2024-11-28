import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TodoList, UpdStatus } from '../APIs/FetchApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Home() {
    const [todos, setTodos] = useState([]);
    const [statusFilter, setStatusFilter] = useState(""); // Current filter
    const [ordering, setOrdering] = useState(""); // Current sorting option
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Function to fetch data from the server
    const fetchTodos = async () => {
        setLoading(true); // Set loading to true while fetching
        setError(null); // Reset any previous errors

    try {
      // Construct query parameters
      const queryParams = new URLSearchParams();
      if (statusFilter) queryParams.append("status", statusFilter);
      if (ordering) queryParams.append("ordering", ordering);

      // Fetch data from server
      const response = await fetch(`http://127.0.0.1:8000/todo?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json(); // Parse JSON response
      setTodos(data); // Update state with fetched todos
    } catch (err) {
      setError(err.message); // Set error if fetch fails
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Fetch todos when the component mounts or filters/sorting change
  useEffect(() => {
    fetchTodos();
  }, [statusFilter, ordering]);

    const updateStatus = (tid) => {
        UpdStatus(tid, { status: 'Completed' })
            .then(() => {
                toast.success('Task Completed');
                setTodos((prevStatus) =>
                    prevStatus.map((todo) =>
                        todo.id === tid ? { ...todo, status: 'Completed' } : todo
                    )
                );
            })
            .catch((err) => {
                console.error(err);
                toast.error('Failed to update');
            });
    };

    const formatDate = (date) => {
        return format(new Date(date), 'dd/MM/yyyy');
    };

    return (
        <div>
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
                            <Link to="/calendar" className="btn btn-dark">
                                Calendar
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mt-5 ">
                <h1 className="my-4 text-black text-center">My To-Do List</h1>
                <div className="row mb-4">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="statusFilter">Filter by Status:</label>
                        <select
                            id="statusFilter"
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="col-md-4 mb-3">
                        <label htmlFor="ordering">Sort by:</label>
                        <select
                            id="ordering"
                            className="form-select"
                            value={ordering}
                            onChange={(e) => setOrdering(e.target.value)}
                        >
                            <option value="">Default</option>
                            <option value="due_date">Due Date (Ascending)</option>
                            <option value="-due_date">Due Date (Descending)</option>
                        </select>
                    </div>
                </div>

                {/* Loading Spinner */}
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border text-info" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        {todos.length > 0 ? (
                            todos.map((todo) => (
                                <div className="col-md-6 col-lg-4 mb-4" key={todo.id}>
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{todo.title}</h5>
                                            <p className="card-text">
                                                {todo.desc.length > 100
                                                    ? todo.desc.slice(0, 50) + '...'
                                                    : todo.desc}
                                            </p>
                                            <p>
                                                <strong>Due Date:</strong> {formatDate(todo.due_date)}
                                            </p>
                                            <p>
                                                <strong>Status:</strong>{' '}
                                                <span
                                                    className={`badge ${
                                                        todo.status === 'Completed'
                                                            ? 'bg-success'
                                                            : todo.status === 'Pending'
                                                            ? 'bg-warning'
                                                            : 'bg-primary'
                                                    }`}
                                                >
                                                    {todo.status}
                                                </span>
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <Link
                                                    to={`/det/${todo.id}`}
                                                    className="btn btn-outline-info btn-sm"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    to={`/upd/${todo.id}`}
                                                    className="btn btn-outline-warning btn-sm"
                                                >
                                                    Update
                                                </Link>
                                                {(todo.status === 'Pending' || todo.status === 'In Progress') && (
                                                <button
                                                    className="btn btn-outline-success btn-sm"
                                                    onClick={() => updateStatus(todo.id)}
                                                >
                                                    Complete
                                                </button>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <p className="text-muted">You have no current tasks...</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
