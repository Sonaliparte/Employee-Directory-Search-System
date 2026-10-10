# Employee Directory Search System

A full-stack employee directory application built using React, Vite, Python, FastAPI, and PostgreSQL. It allows users to search for employees by name or department and view their details.

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Python, FastAPI
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Database Driver:** Psycopg
- **Validation:** Pydantic

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Employee-Directory-Search-System
```

### 2. Setup the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate.bat
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure the Database

Create a PostgreSQL database named `employee_directory`.

Create a `backend/.env` file and add the following configuration:

```env
DATABASE_URL=postgresql+psycopg://postgres:YOUR_PASSWORD@localhost:5432/employee_directory
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

Ensure that PostgreSQL is running and the database exists before starting the backend.

### 4. Run the Backend

Start the FastAPI development server:

```bash
python -m uvicorn app.main:app --reload
```

The backend will be available at:

- **API:** http://127.0.0.1:8000
- **API Documentation:** http://127.0.0.1:8000/docs

### 5. Setup the Frontend

Open a new terminal and navigate to the frontend directory from the project root:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Create a `frontend/.env` file and add:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### 6. Run the Frontend

Start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal to access the application.

## Database Choice

PostgreSQL is used as the relational database to store employee information.

### Reasons for Choosing PostgreSQL

- Stores employee information in a structured table.
- Supports primary keys, unique constraints, and appropriate data types.
- Supports database indexes to improve search performance.
- Handles SQL queries and pagination efficiently.
- Integrates with FastAPI through SQLAlchemy and Psycopg.

The `employees` table contains the following fields:

| Field | Type | Description |
|---|---|---|
| `id` | Integer | Primary key |
| `name` | VARCHAR(150) | Employee name |
| `email` | VARCHAR(255) | Unique email address |
| `department` | VARCHAR(100) | Department name |
| `designation` | VARCHAR(150) | Employee designation |
| `date_of_joining` | DATE | Employee joining date |

*Note: The assignment prefers MySQL. PostgreSQL was selected as an alternative relational database for this implementation.*

## Search Performance Optimization

The application uses the following techniques to improve search performance:

- **Debouncing:** Delays the search request until the user pauses typing, reducing unnecessary API calls.
- **Database Indexes:** Indexes on employee name and department can help the database locate matching records more efficiently.
- **Prefix Search:** Searches for values beginning with the entered text. For example, searching for `Rah` can match `Rahul`.
- **Pagination:** Uses `limit` and `offset` to return a manageable number of records instead of loading every employee at once.
- **Efficient Queries:** SQLAlchemy constructs database queries to retrieve the required employee records.
- **Request Cancellation:** Prevents outdated search requests from unnecessarily updating the interface after a newer search is initiated.

These techniques help reduce unnecessary network requests and database work, keeping the application responsive as the number of employee records grows.

## API Endpoint

### Search Employees

**Endpoint:** `GET /employees/`

Search employees by name or department using the `search` query parameter.

Example:

```http
GET /employees/?search=Rah
```

Additional query parameters:

- `search` — Search by employee name or department.
- `limit` — Maximum number of records returned.
- `offset` — Number of records to skip.

Example with pagination:

```http
GET /employees/?search=Rah&limit=10&offset=0
```

## Key Features

- Search employees by name or department.
- Debounced search requests.
- Reusable React components.
- Loading, error, and empty-result states.
- Request validation and pagination.
- Database indexing.
- Environment-based configuration.
- Modular backend architecture using routers, services, and repositories.

## Environment Variables

The application uses environment variables to configure the database connection and backend API URL.

Create `.env.example` files containing placeholder values for other developers.

**Backend — `backend/.env.example`**

```env
DATABASE_URL=postgresql+psycopg://postgres:YOUR_PASSWORD@localhost:5432/employee_directory
```

**Frontend — `frontend/.env.example`**

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```


