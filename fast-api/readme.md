<small>
# Fast api practice code and notes (FastAPI Tea Management App)

## 1. About This Code

This is a simple FastAPI application for managing a list of teas. It provides basic CRUD (Create, Read, Update, Delete) operations for tea items stored in memory. The app uses Pydantic for data validation and FastAPI for building the REST API.

Key features:
- In-memory storage (data is lost on restart)
- RESTful endpoints for tea management
- Automatic API documentation via Swagger UI

## 2. About FastAPI

FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. It is built on top of Starlette for the web parts and Pydantic for the data parts.

Key benefits:
- Fast: Very high performance, on par with NodeJS and Go
- Fast to code: Increase development speed by 200-300%
- Fewer bugs: Reduce human-induced errors by 40%
- Intuitive: Great editor support with auto-completion
- Easy: Designed to be easy to use and learn
- Short: Minimize code duplication
- Robust: Get production-ready code with automatic interactive documentation

## 3. About Dependencies

This project uses the following main dependencies:

- **FastAPI**: The web framework for building the API
- **Pydantic**: Data validation and settings management using Python type annotations
- **Uvicorn**: ASGI server for running the FastAPI application
- **Typing**: Standard library for type hints (included in Python 3.5+)

All dependencies are listed in `requirements.txt` and can be installed with `pip install -r requirements.txt`.

## 4. Setup and Run Locally

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Installation Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd fast-api
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
   Alternatively, if starting fresh:
   ```bash
   pip install fastapi uvicorn
   ```

5. **(Optional) Generate requirements.txt** (if not present or to update with current packages):
   ```bash
   pip freeze > requirements.txt
   ```
   This command captures all installed packages and their versions in the virtual environment, useful for sharing or reproducing the environment.

5. **Run the application**:
   ```bash
   uvicorn main:app --reload
   ```
   **Note**: The `--reload` flag enables auto-reloading of the server when code changes are detected, which is useful during development. Without `--reload`, the server runs once and won't automatically restart on changes (better for production).

6. **Access the application**:
   - API: http://127.0.0.1:8000
   - Interactive API documentation: http://127.0.0.1:8000/docs (use this to explore and test all routes interactively)
   - Alternative documentation: http://127.0.0.1:8000/redoc

## 5. About Routes and Inputs

The application provides the following REST API endpoints:

### GET /
- **Description**: Root endpoint that returns a welcome message
- **Method**: GET
- **URL**: /
- **Response**: `{"msg": "hello welcome !"}`

### GET /teas
- **Description**: Retrieve all teas
- **Method**: GET
- **URL**: /teas
- **Response**: Array of tea objects or empty array if no teas exist

### POST /teas
- **Description**: Add a new tea
- **Method**: POST
- **URL**: /teas
- **Input**: JSON object with tea data
  ```json
  {
    "id": 1,
    "name": "Green Tea",
    "origin": "China"
  }
  ```
- **Response**: Success message with the added tea object

### PUT /teas/{tea_id}
- **Description**: Update an existing tea by ID
- **Method**: PUT
- **URL**: /teas/{tea_id} (e.g., /teas/1)
- **Input**: JSON object with updated tea data
  ```json
  {
    "id": 1,
    "name": "Black Tea",
    "origin": "India"
  }
  ```
- **Response**: Updated tea object or error message if not found

### DELETE /teas/{tea_id}
- **Description**: Delete a tea by ID
- **Method**: DELETE
- **URL**: /teas/{tea_id} (e.g., /teas/1)
- **Response**: Deleted tea object or error message if not found

### Tea Data Model
All tea operations use the following data structure:
- `id`: integer (unique identifier)
- `name`: string (name of the tea)
- `origin`: string (country or region of origin)

### Example Usage with curl

```bash
# Add a tea
curl -X POST "http://127.0.0.1:8000/teas" -H "Content-Type: application/json" -d '{"id": 1, "name": "Green Tea", "origin": "China"}'

# Get all teas
curl -X GET "http://127.0.0.1:8000/teas"

# Update a tea
curl -X PUT "http://127.0.0.1:8000/teas/1" -H "Content-Type: application/json" -d '{"id": 1, "name": "Black Tea", "origin": "India"}'

# Delete a tea
curl -X DELETE "http://127.0.0.1:8000/teas/1"
```

## Notes

- Data is stored in memory and will be lost when the server restarts
- No authentication or authorization is implemented
- For production use, consider adding a database, error handling, and security measures

## 6. About Virtual Environments

A virtual environment in Python is an isolated environment that allows you to manage dependencies for different projects separately. It creates a folder containing a copy of the Python interpreter and libraries, ensuring that packages installed in one project don't interfere with others.

### Uses of Virtual Environments
- **Dependency Isolation**: Keep project-specific packages separate from system-wide installations.
- **Version Management**: Use different versions of packages for different projects without conflicts.
- **Reproducibility**: Ensure consistent environments across development, testing, and production.
- **Clean Uninstall**: Easily remove all project dependencies by deleting the venv folder.

### How to Create a Virtual Environment
1. Open your terminal/command prompt.
2. Navigate to your project directory.
3. Run the following command:
   ```bash
   python -m venv venv
   ```
   (Replace `venv` with your preferred name if desired.)
4. Activate it:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
5. Install packages: `pip install package_name`
6. Deactivate when done: `deactivate`

## 7. About Python Decorators

Python decorators are a powerful feature that allows you to modify the behavior of functions or classes without changing their source code. They are essentially functions that take another function as an argument and return a new function with enhanced functionality.

### Key Points
- Decorators use the `@decorator_name` syntax above a function definition.
- They are commonly used for logging, authentication, caching, and timing.
- Decorators can be stacked (applied multiple times).

### Example
```python
def greet_decorator(func):
    def wrapper():
        print("👋 Hello before the function runs!")
        func()
        print("👋 Goodbye after the function runs!")
    return wrapper

@greet_decorator
def say_name():
    print("My name is Ganesh!")

say_name()
```

**Output:**
```
👋 Hello before the function runs!
My name is Ganesh!
👋 Goodbye after the function runs!
```

This decorator adds greeting messages before and after the original function execution.
</small>