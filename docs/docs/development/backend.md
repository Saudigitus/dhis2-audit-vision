---
id: backend
title: Backend Development
sidebar_position: 2
---

# Backend Development

## Prerequisites

- Python 3.11+
- pip
- PostgreSQL installed and configured
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Saudigitus/dhis-audit-vision-api.git
cd dhis-audit-vision-api
```

### 2. Create a Virtual Environment

```bash
python -m venv .venv
```

### 3. Activate the Virtual Environment

```bash
# Linux / macOS
source .venv/bin/activate

# Windows
.venv\Scripts\activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables

Create a `.env` file in the root of the project. See the [Environment Variables](../deployment/backend/environment-variables) reference for all required values.

### 6. Run Database Migrations

```bash
alembic revision --autogenerate -m "Create all tables"
alembic upgrade head
```

### 7. Run Seeders

```bash
python commands.py
```

### 8. Start the Development Server

```bash
python runserver.py
```

The API will be available at `http://localhost:8000`.

## API Documentation

Once the server is running, interactive API docs are available at:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
