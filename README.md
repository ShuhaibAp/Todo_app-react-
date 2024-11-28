README.txt

# To-Do List Application

This is a full-stack To-Do List application using Django (backend), React (frontend), and MySQL (database). It supports task management features like adding, updating, viewing, and completing tasks.

## Prerequisites
- Python 3.8+, Node.js, npm, MySQL server, Virtualenv (optional).

## Setup Instructions

### Backend (Django)
1. Clone the repo: `git clone https://github.com/ShuhaibAp/Todo_app-react- && cd server`
2. Create a virtual environment: `python3 -m venv venv && source venv/bin/activate`
3. Install dependencies: `pip install -r requirements.txt`
4. Set up MySQL:
   - Create database: `mysql -u root -p -e "CREATE DATABASE todo_app;"`
   - Update `DATABASES` in `settings.py` with MySQL credentials.
5. Apply migrations: `python manage.py makemigrations && python manage.py migrate`
6. Create superuser: `python manage.py createsuperuser`
7. Run the server: `python manage.py runserver`

### Frontend (React)
1. Navigate to the frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Start the React server: `npm start`

## Access
- React app: `http://localhost:3000`
- Django API: `http://127.0.0.1:8000`

## Testing API (Postman/curl)
1. **Get all tasks**: `GET http://127.0.0.1:8000/todo/`
2. **Add a task**:  
   `POST http://127.0.0.1:8000/todo/`  
   Body: `{"title": "Task", "desc": "Details", "due_date": "2023-12-01", "status": "Pending"}`
3. **Update a task**:  
   `PUT http://127.0.0.1:8000/todo/<id>/`  
   Body: `{"title": "Updated Task", "status": "Completed"}`
4. **Delete a task**: `DELETE http://127.0.0.1:8000/todo/<id>/`
