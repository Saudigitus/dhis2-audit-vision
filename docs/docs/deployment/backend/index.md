---
id: index
title: DHIS2 Audit Vision API Deployment
sidebar_position: 1
---

# DHIS2 Audit Vision API Deployment

The DHIS2 Audit Vision API is a **FastAPI** Python application that connects to your DHIS2 PostgreSQL database and exposes audit data to the frontend application.

## Prerequisites

Choose one of the deployment methods below:

### Option 1: Manual Deployment (Ubuntu 22.04 LTS)
Before deploying, ensure you have:
- **Ubuntu 22.04 LTS** server (fresh install recommended)
- **Python 3.11+** and `pip`
- **PostgreSQL** installed and configured
- **Git** access to the repository
- A running DHIS2 instance accessible from this server

### Option 2: Docker Deployment
Before deploying, ensure you have:
- **Docker** and **Docker Compose** installed
- **Git** access to the repository
- A running DHIS2 instance accessible from this server

---

## Option 1: Manual Deployment Steps (Ubuntu 22.04 LTS)

Follow the steps in order:

1. [Install Nginx](./install-nginx)
2. [Install PostgreSQL](./install-postgresql)
3. [Configure Environment Variables](./environment-variables)
4. Set up the virtual environment and install dependencies
5. [Run database migrations](./environment-variables)
6. **Create the superuser and get access token**:
   ```bash
   cd /var/www/dhis-audit-vision-api
   source .venv/bin/activate
   python commands.py seed-superuser
   ```
   This command creates the configured admin user if it does not exist and prints a new access token every time it runs. **Save this token** - you'll need it to configure the frontend in DHIS2 Audit Vision's Settings page.
7. [Set up the systemd Service](./systemd-service)
8. [Configure Nginx as a Reverse Proxy](./nginx-reverse-proxy)

---

## Option 2: Running with Docker

### 1. Configure the environment variables

Create the `.env` file and replace the required example values:

```bash
cp .env.example .env
```

### 2. Build and start the services

```bash
docker compose up --build -d
```

The API will be available at http://localhost:8000 and the interactive documentation at http://localhost:8000/docs.

### 3. Run the migrations

```bash
docker compose exec api alembic upgrade head
```

To create a new migration:
```bash
docker compose exec api alembic revision --autogenerate -m "Migration description"
```

### 4. Create the superuser and get access token

```bash
docker compose exec api python commands.py seed-superuser
```

This command creates the configured admin user if it does not exist and prints a new access token every time it runs. **Save this token** - you'll need it to configure the frontend in DHIS2 Audit Vision's Settings page.

### 5. View logs and stop the services

```bash
docker compose logs -f api
docker compose down
```

The PostgreSQL data, audit files, and logs are persisted in Docker volumes.

---

## Architecture Overview

```
Internet → Nginx (port 80/443) → Uvicorn/FastAPI (port 8000) → PostgreSQL
                                                              ↕
                                                         DHIS2 Instance
```

### With Docker
```
Docker Compose → [API service (port 8000)] → [PostgreSQL service]
                                                              ↕
                                                         DHIS2 Instance
```

The API runs as a `systemd` service (manual) or Docker container (Docker) managed by **Uvicorn**, with **Nginx** acting as a reverse proxy on the standard HTTP/HTTPS port (manual only).
