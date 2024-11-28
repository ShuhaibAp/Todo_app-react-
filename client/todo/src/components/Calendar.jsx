import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { TodoList } from "../APIs/FetchApi";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import { Link } from "react-router-dom";

function Calender() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    TodoList()
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const getTasksForDate = (date) => {
    return tasks.filter(
      (task) =>
        new Date(task.due_date).toDateString() === date.toDateString()
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
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

            <div className="collapse navbar-collapse" id="navbarContent">
                <div className="ms-auto d-flex gap-2">
                    <Link to="/add" className="btn btn-dark">
                        New Task
                    </Link>
                    <Link to="/" className="btn btn-dark">
                        List
                    </Link>
                </div>
            </div>
        </div>
    </nav>
    <div className="container ">
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4">
          <h1 className="text-center mb-4 mt-5">Todo Calendar</h1>
          <div className="calendar-container">
            <Calendar
              onClickDay={handleDateClick}
              value={selectedDate}
              className="custom-calendar"
            />
          </div>
        </div>
        
        {/* Task List Section */}
        <div className="col-lg-6 col-md-12">
          <h2 className="text-center mb-4 mt-5">
             {selectedDate.toDateString()}:
          </h2>
          <ul className="list-group task-list">
            {getTasksForDate(selectedDate).length > 0 ? (
              getTasksForDate(selectedDate).map((task) => (
                <li
                  key={task.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {task.title}
                  <span className="text-black">{task.status}
                  </span>
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted text-center">
                No tasks for this date
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Calender;
