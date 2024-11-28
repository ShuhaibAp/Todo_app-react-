README.txt

# To-Do List Application

This is a full-stack To-Do List application built using Django as the backend framework, React for the frontend, and MySQL as the database. It allows users to manage their tasks with functionalities like adding, updating, viewing, and marking tasks as completed.

---

## Prerequisites

Before you begin, ensure that you have the following installed on your UNIX-based system:

1. Python (version 3.8 or later)
2. Node.js and npm (latest stable version)
3. MySQL server
4. Virtualenv (optional, for creating isolated Python environments)

---

## Step-by-Step Setup Instructions

### Backend Setup (Django)

1. Clone the project repository:git clone <repository_url> cd server/cd todo
2. Create and activate a virtual environment:python3 -m venv venv source venv/scripts/activate
3. Configure MySQL database:
- Create a MySQL database:
  ```
  mysql -u root -p
  CREATE DATABASE todo_app;
  ```
- Update the `DATABASES` section in `settings.py` to reflect your MySQL credentials:
  ```python
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.mysql',
          'NAME': 'todo_app',
          'USER': 'your_mysql_user',
          'PASSWORD': 'your_mysql_password',
          'HOST': 'localhost',
          'PORT': '3306',
      }
  }
  ```

4. Apply migrations to set up the database schema:python manage.py makemigrations python manage.py migrate
5. Start the Django development server:python manage.py runserver


### Frontend Setup (React)

1. Navigate to the React frontend directory:cd client/cd todo
2. Install the required npm packages:npm install
3. Start the React development server:npm run dev

## Running the Application

Once both servers are running:
- Open your browser and visit the React frontend at `http://localhost:3000`.
- The backend Django server is available at `http://127.0.0.1:8000`.

## Testing API Endpoints

### Using Postman
1. Open Postman and create a new request.
2. Use the following endpoint examples to test the API:

#### Endpoints
- **GET all tasks**:GET http://127.0.0.1:8000/todo/
- **GET a specific task**:GET http://127.0.0.1:8000/todo/<task_id>/
- **POST a new task**:POST http://127.0.0.1:8000/todo/ Body (JSON): { "title": "Sample Task", "desc": "This is a test task", "due_date": "2023-12-01", "status": "Pending"}
- **PUT to update a task**:PUT http://127.0.0.1:8000/todo/<task_id>/ Body (JSON): { "title": "Updated Task Title", "desc": "Updated task description", "due_date": "2023-12-05", "status": "In Progress" }
- **PATCH to update task status**:PATCH http://127.0.0.1:8000/todo/<task_id>/ Body (JSON): { "status": "Completed" }
- **DELETE a task**:DELETE http://127.0.0.1:8000/todo/<task_id>/

## Troubleshooting

1. **Backend Issues**:
   - Ensure the virtual environment is activated.
   - Check database credentials in `settings.py`.
   - Ensure MySQL server is running.

2. **Frontend Issues**:
   - Ensure `npm install` was successful.
   - Check if the React development server is running.

3. **API Issues**:
   - Verify that the Django server is running.
   - Use Postman or curl to check API responses directly.


## Future Enhancements

- Add user authentication for multi-user task management.
- Enhance the UI for mobile responsiveness.
- Integrate advanced filtering and sorting features.

## Author
Developed by Shuhaib Ap.
