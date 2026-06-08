# DHIS2 Audit Vision

A monitoring and audit platform for DHIS2 instances.

## Introduction

DHIS2 Audit Vision is a powerful monitoring and audit platform that tracks every change made to your DHIS2 metadata,
providing real-time alerts, complete traceability, and security monitoring for your DHIS2 instance.

By providing comprehensive monitoring and audit capabilities, Audit Vision empowers ministries of health, NGOs, and other
stakeholders to ensure data integrity, monitor system changes, and maintain a secure and accountable DHIS2 implementation.

## Key Features

1. **Complete Traceability**: Track every change made to your DHIS2 metadata with Diff visualization, dependency tracking, and complete audit trails.
2. **Real Time Monitoring**: Monitor user activity and system changes in real time.
3. **Reverse Any Change**: Quickly revert accidental or unwanted changes with detailed change history and one-click rollback capabilities.
4. **Automatic Alerts**: Receive intelligent notifications categorized by severity level (High, Medium, Low) when critical changes happen.

## Deployment

### Frontend Application

The DHIS2 Audit Vision frontend is a DHIS2 custom application.

#### Prerequisites

- A configured DHIS2 instance (minimum version 2.40)
- Administrator access to the DHIS2 instance to install apps

#### Installation

1. **Download the latest release**:
   Go to the [DHIS2 Audit Vision Releases page](https://github.com/Saudigitus/dhis2-audit-vision/releases) and download the latest version of the app.

**Install the app in your DHIS2 instance**:

- Access your DHIS2 server as an administrator

* [ ] Go to **App Management** to upload the app bundle manually

1. **Set the API URL in the application**:
   - Open the application
   - Go to **Settings**
   - Enter the URL of your deployed Audit API
   - Save the configuration


### Audit API (Backend)

The Audit API provides the backend functionality for DHIS2 Audit Vision.

### Deployment Scenarios

There are three main scenarios for deploying the Audit API:

---

#### Scenario 1: DHIS2 and Audit API on the Same Server

Use this when both DHIS2 and the Audit API run on the same machine. The API is only accessible locally, and Nginx handles external access.

**`docker-compose.yml`**:

```yaml
services:
  api:
    build:
      context: .
    env_file:
      - .env
    environment:
      DB_HOST: audit-db
      DB_PORT: 5432
      DATA_BASE_DIR: /app/data
      CONTROL_FILE_PATH: /app/data/control_file.json
      SERVER_DHIS2_URL: "http://localhost:8080"
    ports:
      - "127.0.0.1:8000:8000"  # only accessible locally
    volumes:
      - audit_data:/app/data
      - audit_logs:/app/logs
    depends_on:
      audit-db:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - audit-network
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

  audit-db:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: "${DB_NAME:-dhis2_audit_vision}"
      POSTGRES_USER: "${DB_USER:-postgres}"
      POSTGRES_PASSWORD: "${DB_PASSWORD:-postgres}"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-postgres} -d ${DB_NAME:-dhis2_audit_vision}"]
      interval: 5s
      timeout: 5s
      retries: 10
    restart: unless-stopped
    networks:
      - audit-network

networks:
  audit-network:
    driver: bridge

volumes:
  audit_data:
  audit_logs:
  postgres_data:
```

**Nginx configuration** — restrict webhook to localhost only:

```nginx
server {
    listen 80;
    server_name your_server_ip_or_domain;

    # Webhook endpoint — only accessible from the local DHIS2 instance
    location /api/webhooks/ {
        allow 127.0.0.1;
        deny all;
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # All other API endpoints
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**In `.env`**:
```
SERVER_DHIS2_URL=http://localhost:8080
```

**EventHook URL in DHIS2**:
```
http://localhost:8000/api/webhooks/dhis2/event
```

---

#### Scenario 2: DHIS2 and Audit API on Different Servers

Use this when DHIS2 and the Audit API run on separate servers (connected via public internet or private network).

**`docker-compose.yml`**:

```yaml
services:
  api:
    build:
      context: .
    env_file:
      - .env
    environment:
      DB_HOST: audit-db
      DB_PORT: 5432
      DATA_BASE_DIR: /app/data
      CONTROL_FILE_PATH: /app/data/control_file.json
      SERVER_DHIS2_URL: "https://your-dhis2-instance-url"
    ports:
      - "127.0.0.1:8000:8000"  # exposed via Nginx only
    volumes:
      - audit_data:/app/data
      - audit_logs:/app/logs
    depends_on:
      audit-db:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - audit-network
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

  audit-db:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: "${DB_NAME:-dhis2_audit_vision}"
      POSTGRES_USER: "${DB_USER:-postgres}"
      POSTGRES_PASSWORD: "${DB_PASSWORD:-postgres}"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-postgres} -d ${DB_NAME:-dhis2_audit_vision}"]
      interval: 5s
      timeout: 5s
      retries: 10
    restart: unless-stopped
    networks:
      - audit-network

networks:
  audit-network:
    driver: bridge

volumes:
  audit_data:
  audit_logs:
  postgres_data:
```

**Nginx configuration** — restrict webhook to the DHIS2 server IP only:

```nginx
server {
    listen 80;
    server_name your_server_ip_or_domain;

    # Webhook endpoint — only accessible from the DHIS2 server
    # Replace <DHIS2_SERVER_IP> with the actual IP of your DHIS2 server
    location /api/webhooks/ {
        allow <DHIS2_SERVER_IP>;
        deny all;
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # All other API endpoints
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**In `.env`**:
```
SERVER_DHIS2_URL=https://your-dhis2-instance-url
```

**EventHook URL in DHIS2**:
```
https://your-audit-api-domain/api/webhooks/dhis2/event
```

---

#### Scenario 3: DHIS2 and Audit API in the Same Docker Compose (Development / Testing)

Use this when you want to run everything — DHIS2, its database, and the Audit API — together using Docker Compose. This is ideal for development, testing, or evaluation environments.

> **Note**: This scenario is not recommended for production as it bundles DHIS2 and the Audit API in the same compose stack.

**`docker-compose.yml`**:

```yaml
services:
  api:
    build:
      context: .
    env_file:
      - .env
    environment:
      DB_HOST: audit-db
      DB_PORT: 5432
      DATA_BASE_DIR: /app/data
      CONTROL_FILE_PATH: /app/data/control_file.json
      SERVER_DHIS2_URL: "http://dhis2-web:8080"
    volumes:
      - audit_data:/app/data
      - audit_logs:/app/logs
    depends_on:
      audit-db:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - dhis2-network
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

  audit-db:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: "${DB_NAME:-dhis2_audit_vision}"
      POSTGRES_USER: "${DB_USER:-postgres}"
      POSTGRES_PASSWORD: "${DB_PASSWORD:-postgres}"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-postgres} -d ${DB_NAME:-dhis2_audit_vision}"]
      interval: 5s
      timeout: 5s
      retries: 10
    restart: unless-stopped
    networks:
      - dhis2-network

  dhis2-web:
    image: "${DHIS2_IMAGE:-dhis2/core:2.42.5}"
    user: root
    entrypoint: >
      sh -c "mkdir -p /opt/dhis2/logs &&
             chmod 777 /opt/dhis2/logs &&
             exec catalina.sh run"
    environment:
      DB_HOSTNAME: dhis2-db
      DB_NAME: "${DHIS2_DB_NAME:-dhis}"
      DB_USERNAME: "${DHIS2_DB_USER:-dhis}"
      DB_PASSWORD: "${DHIS2_DB_PASSWORD:-dhis}"
    ports:
      - "${DHIS2_PORT:-8080}:8080"
    volumes:
      - ./dhis.conf:/opt/dhis2/dhis.conf:ro
      - dhis2_logs:/opt/dhis2/logs
    depends_on:
      dhis2-db:
        condition: service_healthy
      dhis2-db-dump:
        condition: service_completed_successfully
    restart: unless-stopped
    networks:
      - dhis2-network
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 4G
        reservations:
          cpus: '1.0'
          memory: 2G

  dhis2-db:
    image: ghcr.io/baosystems/postgis:12-3.3
    environment:
      POSTGRES_USER: "${DHIS2_DB_USER:-dhis}"
      POSTGRES_DB: "${DHIS2_DB_NAME:-dhis}"
      POSTGRES_PASSWORD: "${DHIS2_DB_PASSWORD:-dhis}"
      PGPASSWORD: "${DHIS2_DB_PASSWORD:-dhis}"
    volumes:
      - dhis2_db_data:/var/lib/postgresql/data
      - dhis2_db_dump:/docker-entrypoint-initdb.d/
    healthcheck:
      test: ["CMD-SHELL", "psql --no-password --quiet --username ${DHIS2_DB_USER:-dhis} postgres://127.0.0.1/${DHIS2_DB_NAME:-dhis} -p 5432 --command \"SELECT 'ok'\" > /dev/null"]
      start_period: 120s
      interval: 1s
      timeout: 3s
      retries: 5
    ports:
      - "${DHIS2_DB_EXPOSED_PORT:-5434}:5432"
    restart: unless-stopped
    networks:
      - dhis2-network

  dhis2-db-dump:
    image: busybox
    command: sh -c '[ -f dump.sql.gz ] && echo "dump.sql.gz exists" || wget --output-document dump.sql.gz ${DHIS2_DB_DUMP_URL:-https://databases.dhis2.org/sierra-leone/2.42/dhis2-db-sierra-leone.sql.gz}'
    environment:
      DHIS2_DB_DUMP_URL: "${DHIS2_DB_DUMP_URL:-https://databases.dhis2.org/sierra-leone/2.42/dhis2-db-sierra-leone.sql.gz}"
    working_dir: /opt/dump
    volumes:
      - dhis2_db_dump:/opt/dump

networks:
  dhis2-network:
    driver: bridge

volumes:
  audit_data:
  audit_logs:
  postgres_data:
  dhis2_db_data:
  dhis2_db_dump:
  dhis2_logs:
```

In this scenario, the API and DHIS2 communicate directly via the internal Docker network (`dhis2-network`) using the service name `dhis2-web`. No Nginx or port restrictions are needed since the webhook endpoint is not exposed externally.

**In `.env`**:
```
SERVER_DHIS2_URL=http://dhis2-web:8080
```

**EventHook URL in DHIS2**:
```
http://api:8000/api/webhooks/dhis2/event
```

#### Quick Start with Scenario 3
```bash
cd docker/scenario-3-dev-docker-compose
docker compose --env-file ../../.env up --build -d
docker compose --env-file ../../.env exec api alembic upgrade head
docker compose --env-file ../../.env exec api python commands.py seed-superuser
```

---

### Quick Start with Docker (Recommended)

For a quick and easy setup, use Docker:

1. Clone the repository
2. Copy `.env.example` to `.env` and configure
3. Choose the appropriate `docker-compose.yml` based on your deployment scenario above
4. Build and start services: `docker compose up --build -d`
5. Run migrations: `docker compose exec api alembic upgrade head`
6. Create superuser and get access token: `docker compose exec api python commands.py seed-superuser`

The API will be available at http://localhost:8000. **Save the generated access token** - you'll need it to configure DHIS2 Audit Vision's Settings page.

For detailed instructions, see the [Deployment Documentation](https://saudigitus.github.io/dhis2-audit-vision/docs/deployment/intro) and [Development Documentation](https://saudigitus.github.io/dhis2-audit-vision/docs/development/intro).

#### Manual Installation (Ubuntu 22.04 LTS)

For manual installation, follow these steps:

#### Prerequisites

- Ubuntu 22.04 LTS server (fresh install recommended)
- Git access to the repository
- Python 3.11+
- pip (Python package installer)
- PostgreSQL installed and configured on the server

#### Installation steps

1. **Install Nginx**:
   ```bash
   sudo apt install nginx
   sudo ufw allow 'Nginx HTTP'
   systemctl status nginx
   ```

2. **Install Git and clone the repository**:
   ```bash
   sudo apt install git
   cd /var/www/
   git clone https://github.com/Saudigitus/dhis-audit-vision-api.git
   cd dhis-audit-vision-api/
   git checkout develop
   ```

3. **Install PostgreSQL**:
   ```bash
   sudo apt install postgresql postgresql-contrib
   sudo -u postgres psql
   ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   pip install alembic psycopg2-binary
   ```
   
5. **Configure environment variables**:
   ```bash
   nano /var/www/dhis_audit_vision/.env
   ```
   ```bash
   #Database config
   DB_NAME=your_database_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=127.0.0.1
   DB_PORT=5432
   ENVIRONMENT=development

   #Server config
   HOST=0.0.0.0
   PORT=8000
   SERVER_DHIS2_URL=https://your-dhis2-instance-url
   SERVER_DHIS2_AUTH=your_base64_encoded_credentials
   SQL_VIEW_ID=InoZ6MNulN4
   CONTROL_FILE_PATH=./data/control_file.json
   DATA_BASE_DIR=./data

   #Security
   SECRET_KEY=your_secret_key_here
   TOKEN_EXPIRE_MINUTES=60

   #Admin account
   ADMIN_USERNAME=your_admin_username
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_admin_password
   ```
   
7. **Run database migrations and create superuser**:
   ```bash
   alembic revision --autogenerate -m "Create all tables"
   alembic upgrade head
   python3 commands.py seed-superuser
   ```
   
   **Save the generated access token** - you'll need it to configure DHIS2 Audit Vision's Settings page.
   
8. **Configure the systemd service**:
   ```bash
   nano /etc/systemd/system/auditapi.service
   ```
    ```bash
    [Unit]
    Description=AuditAPI FastAPI Service
    After=network.target

    [Service]
    User=root
    WorkingDirectory=/var/www/dhis_audit_vision
    ExecStart=/var/www/dhis_audit_vision/.venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
    Restart=always

    [Install]
    WantedBy=multi-user.target
    ```
   
9. **Enable and start the service**:
   ```bash
   systemctl daemon-reload
   systemctl enable auditapi.service
   systemctl restart auditapi.service
   ```

10. **Configure Nginx as a reverse proxy**:
   ```bash
   nano /etc/nginx/sites-available/default
   ```
   ```nginx
   server {
       listen 80;
       server_name your_server_ip_or_domain;

       # Webhook endpoint — only accessible from the DHIS2 server
       # Replace <DHIS2_SERVER_IP> with the IP address of your DHIS2 instance
       # If DHIS2 and the Audit API are on the same server, use 127.0.0.1
       location /api/webhooks/ {
           allow <DHIS2_SERVER_IP>;
           deny all;
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }

       # All other API endpoints
       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

11. **Validate and reload**:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```
---

## DHIS2 Instance Configuration

For the API to work correctly, you need to enable auditing on your DHIS2 server.

**Minimum DHIS2 Version**: 2.40

### 1. Configure Audit System in dhis.conf

To enable or configure the audit system on a DHIS2 server, you must modify your dhis.conf file:

#### Step 1: Open your dhis.conf file

Locate your DHIS2 configuration file. Depending on your server installation, this is usually found at:

- `/etc/dhis/dhis.conf` or in your DHIS2 home directory.

#### Step 2: Configure Audit Properties

Add or modify the audit property in your dhis.conf file. You can specify the scope of the events you want the server to audit.

For example, if you only want to audit the creation and updates of Metadata and Tracker data, add the following line:

```properties
audit = METADATA, TRACKER
```

To enable auditing for a specific set of operations, you can list them separated by commas. The supported options include:

- `READ`
- `CREATE`
- `UPDATE`
- `DELETE`
- `SEARCH`
- `DISABLED` (Turns the audit log system off)

Note: If you want all operations audited, you can often omit this line, as DHIS2 enables auditing for standard scopes by default.

#### Step 3: Save and Restart

1. Save the changes to your dhis.conf file.
2. Restart your DHIS2 instance (e.g., your Tomcat service) to apply the new configuration.

```bash
sudo systemctl restart tomcat
```

### 2. Integration User

Create a specific user for integration with the following minimum permissions:

- F\_METADATA\_EXPORT
- F\_AUDIT\_READ

### 3. Automatic SQL View & API Routes Management

The DHIS2 Audit Vision automatically creates and maintains:
- The required SQL Views in your DHIS2 instance
- The required API Routes in your DHIS2 instance

It checks if existing views/routes are compatible and updates them automatically if needed. No manual SQL View or API Routes creation is required.

### Understanding DHIS2 Auditing

Starting in version 2.35+, DHIS2 uses an asynchronous message-based audit service powered by Apache ActiveMQ Artemis. Once an entity (such as a data value, metadata, or tracker record) is modified and successfully written to the database, an audit message is sent to the audit queue and logged.

DHIS2 records these audit logs directly into your PostgreSQL database in the respective audit and trackedentityaudit tables. Currently, these logs are designed to be extracted directly via backend database queries or through internal system monitoring setups.


## Backend API Development Guide (For Contributors)

### Quick Start with Docker (Recommended)

For development, Docker provides an easy setup:

1. **Clone the API repository**:
   ```bash
   git clone https://github.com/Saudigitus/dhis-audit-vision-api.git
   cd dhis-audit-vision-api
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```

3. **Build and start services**:
   ```bash
   docker compose up --build -d
   ```

4. **Run database migrations**:
   ```bash
   docker compose exec api alembic upgrade head
   ```

5. **Create a superuser and get access token**:
   ```bash
   docker compose exec api python commands.py seed-superuser
   ```

The API will be available at `http://localhost:8000`. **Save the generated access token** - you'll need it to configure DHIS2 Audit Vision's Settings page.

### Manual Setup (Python Virtual Environment)

#### Prerequisites
- Python 3.11+
- pip (Python package installer)
- PostgreSQL installed and configured
- Git

#### Setup Instructions
1. **Clone the API repository**:
   ```bash
   git clone https://github.com/Saudigitus/dhis-audit-vision-api.git
   cd dhis-audit-vision-api
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv .venv
   ```

3. **Activate virtual environment**:
   - Linux/Mac:
     ```bash
     source .venv/bin/activate
     ```
   - Windows:
     ```bash
     .venv\Scripts\activate
     ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables**:
   Create a `.env` file in the root of the project with the database and DHIS2 instance variables (see "Manual Configuration (Without Docker)" section for an example).

6. **Run database migrations**:
   ```bash
   alembic revision --autogenerate -m "Create all tables"
   alembic upgrade head
   ```

7. **Create a superuser and get access token**:
   ```bash
   python commands.py seed-superuser
   ```
   
   **Save the generated access token** - you'll need it to configure DHIS2 Audit Vision's Settings page.

8. **Start the development server**:
   ```bash
   python runserver.py
   ```

### Contributing
1. Create a new branch for your feature or bugfix
2. Make your changes
3. Ensure tests pass
4. Submit a pull request

---

## Frontend Application Development Guide (For Contributors)

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Saudigitus/dhis2-audit-vision.git
   cd dhis2-audit-vision
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the application in development mode (DHIS2 app scripts)**:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Contributing

1. Create a new branch for your feature or bugfix
2. Make your changes
3. Ensure tests pass
4. Submit a pull request

## License

This project is licensed under the terms of the MIT license.