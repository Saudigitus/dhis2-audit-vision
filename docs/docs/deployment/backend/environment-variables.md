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
# ─── Database ─────────────────────────────────────────────────────────────────
DB_NAME=dhis2_audit_vision
DB_USER=postgres
DB_PASSWORD=replace_with_a_secure_database_password
DB_HOST=127.0.0.1
DB_PORT=5433
ENVIRONMENT=development

# ─── Server ───────────────────────────────────────────────────────────────────
HOST=0.0.0.0
PORT=8000

SERVER_DHIS2_URL=https://example.org
SERVER_DHIS2_AUTH=replace_with_base64_credentials
# Admin user for Audit Vision - should be a member of the AUDIT_VISION_ADMINS user group in DHIS2
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.org
ADMIN_PASSWORD=replace_with_a_secure_password
# Optional path to a private CA certificate bundle. Standard public CAs need no override.
# DHIS2_CA_BUNDLE=/path/to/ca-bundle.pem
SQL_VIEW_ID=yzUJJJzDYkM
RETRIEVE_SQL_VIEW_ID=aloNfrH2RGq


SECRET_KEY=replace_with_a_random_secret_at_least_32_bytes
TOKEN_EXPIRE_MINUTES=60
OFFSET_HOURS=2

# Comma-separated browser origins. Leave empty when browser access is not required.
CORS_ALLOW_ORIGINS=http://localhost:3000
MAX_REQUEST_BODY_BYTES=1048576
LOG_MAX_BYTES=262144
LOG_ROTATION_MAX_BYTES=5242880
LOG_ROTATION_BACKUP_COUNT=5
DHIS2_OBJECT_FIELDS=*
DHIS2_PROGRAM_DEPENDENCY_FIELDS=*
DHIS2_DATASET_DEPENDENCY_FIELDS=*

# ─── Email ───────────────────────────────────────────────────────────────
EMAIL_HOST=smtp.example.org
EMAIL_PORT=587
EMAIL_HOST_USER=replace_with_smtp_username
EMAIL_HOST_PASSWORD=replace_with_smtp_password
EMAIL_USE_TLS=true
EMAIL_USE_SSL=false

# ─── DHIS2 Configuration (Docker Scenario 3 Only) ───────────────────────────────
DHIS2_IMAGE=dhis2/core:2.40.11
DHIS2_PORT=8080
DHIS2_DB_NAME=dhis
DHIS2_DB_USER=dhis
DHIS2_DB_PASSWORD=dhis
DHIS2_DB_EXPOSED_PORT=5434
DHIS2_DB_DUMP_URL=https://databases.dhis2.org/sierra-leone/2.40.11/dhis2-db-sierra-leone.sql.gz
```

## Variable Reference

| Variable | Description |
|---|---|
| `DB_NAME` | Name of the PostgreSQL database |
| `DB_USER` | PostgreSQL user |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_HOST` | Database host (usually `127.0.0.1`) |
| `DB_PORT` | Database port (default `5433`) |
| `ENVIRONMENT` | Environment type: `development` or `production` |
| `HOST` | Server host (default `0.0.0.0`) |
| `PORT` | Server port (default `8000`) |
| `SERVER_DHIS2_URL` | Full URL of your DHIS2 instance |
| `SERVER_DHIS2_AUTH` | Base64-encoded `username:password` credentials for the [integration user](../../configuration/integration-user) |
| `DHIS2_CA_BUNDLE` (optional) | Path to private CA certificate bundle for DHIS2 |
| `SQL_VIEW_ID` | ID of the SQL View in DHIS2 (pre-configured as `yzUJJJzDYkM`) |
| `RETRIEVE_SQL_VIEW_ID` | ID of the retrieve SQL View in DHIS2 (pre-configured as `aloNfrH2RGq`) |
| `SECRET_KEY` | Random secret key for JWT token signing (at least 32 bytes) |
| `TOKEN_EXPIRE_MINUTES` | Session token expiry in minutes |
| `WEBHOOK_API_TOKEN` (optional) | Static token for DHIS2 event hooks using `auth.type=api-token` (at least 32 bytes) |
| `ADMIN_USERNAME` | Username for the Audit Vision admin account (should be a member of the AUDIT_VISION_ADMINS group in DHIS2) |
| `ADMIN_EMAIL` | Email for the Audit Vision admin account |
| `ADMIN_PASSWORD` | Password for the Audit Vision admin account |
| `OFFSET_HOURS` | Time offset in hours (default `2`) |
| `CORS_ALLOW_ORIGINS` | Comma-separated browser origins (e.g., `http://localhost:3000`) |
| `MAX_REQUEST_BODY_BYTES` | Maximum request body size in bytes (default `1048576`) |
| `LOG_MAX_BYTES` | Max bytes per log file (default `262144`) |
| `LOG_ROTATION_MAX_BYTES` | Max total bytes for log rotation (default `5242880`) |
| `LOG_ROTATION_BACKUP_COUNT` | Number of log backups to keep (default `5`) |
| `DHIS2_OBJECT_FIELDS` | Default fields to retrieve for DHIS2 objects |
| `DHIS2_PROGRAM_DEPENDENCY_FIELDS` | Fields to retrieve for program dependencies |
| `DHIS2_DATASET_DEPENDENCY_FIELDS` | Fields to retrieve for dataset dependencies |
| `EMAIL_HOST` | Email/SMTP server host |
| `EMAIL_PORT` | Email/SMTP server port |
| `EMAIL_HOST_USER` | Email/SMTP username |
| `EMAIL_HOST_PASSWORD` | Email/SMTP password |
| `EMAIL_USE_TLS` | Enable TLS encryption (true/false) |
| `EMAIL_USE_SSL` | Enable SSL encryption (true/false) |
| `DHIS2_IMAGE` (Docker Scenario 3 Only) | DHIS2 Docker image |
| `DHIS2_PORT` (Docker Scenario 3 Only) | DHIS2 Docker port (default `8080`) |
| `DHIS2_DB_NAME` (Docker Scenario 3 Only) | DHIS2 PostgreSQL database name |
| `DHIS2_DB_USER` (Docker Scenario 3 Only) | DHIS2 PostgreSQL user |
| `DHIS2_DB_PASSWORD` (Docker Scenario 3 Only) | DHIS2 PostgreSQL password |
| `DHIS2_DB_EXPOSED_PORT` (Docker Scenario 3 Only) | Exposed PostgreSQL port (default `5434`) |
| `DHIS2_DB_DUMP_URL` (Docker Scenario 3 Only) | URL of DHIS2 database dump |

## Run Migrations and Seeders

After configuring the `.env` file, run database migrations and initialize the audit system:

```bash
alembic revision --autogenerate -m "Create all tables"
alembic upgrade head
python3 commands.py start-audit
```

## Next Steps

- [Set up the systemd Service →](./systemd-service)
