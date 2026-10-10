# Employee Directory Search System

A full-stack employee directory application built using React, Vite, Python, FastAPI, and PostgreSQL. It allows users to search for employees by name or department and view their details.

## Tech Stack

Frontend: React, Vite

Backend: Python, FastAPI

Database: PostgreSQL

ORM: SQLAlchemy

Database Driver: Psycopg

Validation: Pydantic

## Setup Instructions

1. Clone the Repository

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Employee-Directory-Search-System

2. Setup the Backend

cd backend
python -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt

Create a backend/.env file and configure the database connection:

DATABASE_URL=postgresql+psycopg://postgres:YOUR_PASSWORD@localhost:5432/employee_directory

Replace YOUR_PASSWORD with your PostgreSQL password. Create the employee_directory database in PostgreSQL before starting the backend.

## Run the backend:

python -m uvicorn app.main:app --reload

API documentation: http://127.0.0.1:8000/docs

3. Setup the Frontend

## Open a new terminal:

cd frontend
npm install

## Create a frontend/.env file:

VITE_API_BASE_URL=http://127.0.0.1:8000

## Start the frontend:

npm run dev

Open the local URL displayed by Vite in your terminal.

Database Choice

PostgreSQL is used because it is a reliable relational database suitable for structured employee records.

## Reasons for choosing PostgreSQL:

Stores employee information in a structured table.

Supports primary keys, unique constraints, and data types.

Supports indexes to improve search performance.

Handles SQL queries and pagination efficiently.

Integrates with FastAPI through SQLAlchemy and Psycopg.

The employees table stores the employee ID, name, email, department, designation, and date of joining. Employee email addresses are unique.

*Note: The assignment prefers MySQL; PostgreSQL was chosen as an alternative relational database for this implementation.*

## Search Performance Optimization

The application uses the following techniques to make employee searches more efficient:

Debouncing: Delays the search request until the user pauses typing, reducing unnecessary API calls.

Database Indexes: Indexes on employee name and department help PostgreSQL locate matching records more efficiently.

Prefix Search: Searches for values beginning with the entered text, such as Rah matching Rahul.

Pagination: Uses limit and offset to return a manageable number of records instead of loading every employee at once.

Efficient Queries: SQLAlchemy builds database queries that retrieve only the required employee records.

Request Cancellation: Prevents outdated search requests from unnecessarily updating the interface when a newer search has been made.

These techniques reduce unnecessary network requests and database work, helping the application remain responsive as employee records grow.
