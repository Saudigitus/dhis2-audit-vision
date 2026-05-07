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
   git clone https://github.com/Saudigitus/dhis_audit_vision.git
   cd dhis_audit_vision/
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
   # Database config
   DB_NAME=your_database_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=127.0.0.1
   DB_PORT=5432
   ENVIRONMENT=development

   # Server config
   HOST=0.0.0.0
   PORT=8000
   SERVER_DHIS2_URL=https://your-dhis2-instance-url
   SERVER_DHIS2_AUTH=your_base64_encoded_credentials
   SQL_VIEW_ID=your_sql_view_id
   CONTROL_FILE_PATH=./data/control_file.json
   DATA_BASE_DIR=./data

   # Security
   SECRET_KEY=your_secret_key_here
   TOKEN_EXPIRE_MINUTES=60

   # Admin account
   ADMIN_USERNAME=your_admin_username
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_admin_password
   
6. **Run database migrations and seeders**:
   ```bash
   alembic revision --autogenerate -m "Create all tables"
   alembic upgrade head
   python3 commands.py start-audit
   ```
   
7. **Configure the systemd service**:
   ```bash
   nano /etc/systemd/system/auditapi.service
   ```
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
   
8. **Enable and start the service**:
   ```bash
   systemctl daemon-reload
   systemctl enable auditapi.service
   systemctl restart auditapi.service
   ```

9. **Configure Nginx as a reverse proxy**:
   ```bash
   nano /etc/nginx/sites-available/default
   ```
   server {
        listen 80;
        server_name your_server_ip_or_domain;

        location / {
            proxy_pass http://127.0.0.1:8000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
   
10. **Validate and reload**:
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

### 3. Automatic SQL View Management

The DHIS2 Audit Vision automatically creates and maintains the required SQL Views in your DHIS2 instance. It also checks if existing views are compatible and updates them automatically if needed. No manual SQL View creation is required.

### Understanding DHIS2 Auditing

Starting in version 2.35+, DHIS2 uses an asynchronous message-based audit service powered by Apache ActiveMQ Artemis. Once an entity (such as a data value, metadata, or tracker record) is modified and successfully written to the database, an audit message is sent to the audit queue and logged.

DHIS2 records these audit logs directly into your PostgreSQL database in the respective audit and trackedentityaudit tables. Currently, these logs are designed to be extracted directly via backend database queries or through internal system monitoring setups.


## Backend API Development Guide (For Contributors)

### Prerequisites
- Python 3.11+
- pip (Python package installer)
- PostgreSQL installed and configured
- Git

### Setup Instructions
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

7. **Run seeders**:
   ```bash
   python commands.py
   ```

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
