---
id: environment-variables
title: Configure Environment Variables
sidebar_position: 4
---

# Configure Environment Variables

The Audit API uses a `.env` file for all configuration. Create and edit this file:

```bash
nano /var/www/dhis_audit_vision/.env
```

## Full Configuration Reference

```bash title=".env"
# ─── Database ────────────────────────────────────────────────────────────────
DB_NAME=your_database_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=127.0.0.1
DB_PORT=5432
ENVIRONMENT=development

# ─── Server ──────────────────────────────────────────────────────────────────
HOST=0.0.0.0
PORT=8000
SERVER_DHIS2_URL=https://your-dhis2-instance-url
SERVER_DHIS2_AUTH=your_base64_encoded_credentials
SQL_VIEW_ID=InoZ6MNulN4
CONTROL_FILE_PATH=./data/control_file.json
DATA_BASE_DIR=./data

# ─── Security ────────────────────────────────────────────────────────────────
SECRET_KEY=your_secret_key_here
TOKEN_EXPIRE_MINUTES=60

# ─── Admin account ───────────────────────────────────────────────────────────
ADMIN_USERNAME=your_admin_username
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

## Variable Reference

| Variable | Description |
|---|---|
| `DB_NAME` | Name of the PostgreSQL database |
| `DB_USER` | PostgreSQL user |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_HOST` | Database host (usually `127.0.0.1`) |
| `DB_PORT` | Database port (default `5432`) |
| `SERVER_DHIS2_URL` | Full URL of your DHIS2 instance |
| `SERVER_DHIS2_AUTH` | Base64-encoded `username:password` credentials for the [integration user](../../configuration/integration-user) |
| `SQL_VIEW_ID` | ID of the SQL View in DHIS2 (pre-configured as `InoZ6MNulN4`) |
| `SECRET_KEY` | Random secret key for JWT token signing |
| `TOKEN_EXPIRE_MINUTES` | Session token expiry in minutes |
| `ADMIN_USERNAME` | Username for the Audit Vision admin account |
| `ADMIN_EMAIL` | Email for the Audit Vision admin account |
| `ADMIN_PASSWORD` | Password for the Audit Vision admin account |

## Run Migrations and Seeders

After configuring the `.env` file, run database migrations and initialize the audit system:

```bash
alembic revision --autogenerate -m "Create all tables"
alembic upgrade head
python3 commands.py start-audit
```

## Next Steps

- [Set up the systemd Service →](./systemd-service)
