---
id: backend
title: Backend Development
sidebar_position: 2
---

# Backend Development

Choose one of the setup methods below:

---

## Option 1: Manual Setup (Python Virtual Environment)

### Prerequisites

- Python 3.11+
- pip
- PostgreSQL installed and configured
- Git

### Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/Saudigitus/dhis-audit-vision-api.git
cd dhis-audit-vision-api
```

#### 2. Create a Virtual Environment

```bash
python -m venv .venv
```

#### 3. Activate the Virtual Environment

```bash
# Linux / macOS
source .venv/bin/activate

# Windows
.venv\Scripts\activate
```

#### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 5. Configure Environment Variables

Create a `.env` file in the root of the project. See the [Environment Variables](../deployment/backend/environment-variables) reference for all required values.

#### 6. Run Database Migrations

```bash
alembic revision --autogenerate -m "Create all tables"
alembic upgrade head
```

#### 7. Create the Superuser and Get Access Token

```bash
python commands.py seed-superuser
```

This command creates the configured admin user if it does not exist and prints a new access token every time it runs. **Save this token** - you'll need it to configure the frontend in DHIS2 Audit Vision's Settings page.

#### 8. Start the Development Server

```bash
python runserver.py
```

The API will be available at `http://localhost:8000`.

---

## Option 2: Docker Setup (Recommended)

### Prerequisites

- Docker and Docker Compose
- Git

### Option 3: Docker Compose with DHIS2 (Scenario 3, Dev/Test)

### Quick start commands:
```bash
cd docker/scenario-3-dev-docker-compose
docker compose --env-file ../../.env up --build -d
docker compose --env-file ../../.env exec api alembic upgrade head
docker compose --env-file ../../.env exec api python commands.py seed-superuser
```

### Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/Saudigitus/dhis-audit-vision-api.git
cd dhis-audit-vision-api
```

#### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit the `.env` file to configure your environment.

#### 3. Build and Start Services

```bash
docker compose up --build -d
```

#### 4. Run Database Migrations

```bash
docker compose exec api alembic upgrade head
```

#### 5. Create a Superuser and Get Access Token

```bash
docker compose exec api python commands.py seed-superuser
```

This command creates the configured admin user if it does not exist and prints a new access token every time it runs. **Save this token** - you'll need it to configure the frontend in DHIS2 Audit Vision's Settings page.

#### 6. View Logs

```bash
docker compose logs -f api
```

The API will be available at `http://localhost:8000`.
