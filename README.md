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

## Documentation

The complete documentation is available at: https://saudigitus.github.io/dhis2-audit-vision.

### Quick Links

- [User Guide](https://saudigitus.github.io/dhis2-audit-vision/docs/user-guide/intro)
- [Deployment Guide](https://saudigitus.github.io/dhis2-audit-vision/docs/deployment/intro)
- [Configuration Guide](https://saudigitus.github.io/dhis2-audit-vision/docs/configuration/intro)
- [Development Guide](https://saudigitus.github.io/dhis2-audit-vision/docs/development/intro)

## Quick Start

### Frontend Application

The DHIS2 Audit Vision frontend is a DHIS2 custom application.

#### Prerequisites

- A configured DHIS2 instance (minimum version 2.40)
- Administrator access to the DHIS2 instance to install apps

#### Installation

1. **Download the latest release**:
   Go to the [DHIS2 Audit Vision Releases page](https://github.com/Saudigitus/dhis2-audit-vision/releases) and download the latest version of the app.

2. **Install the app in your DHIS2 instance**:

   - Access your DHIS2 server as an administrator
   - Go to **App Management** to upload the app bundle manually

3. **Set the API URL in the application**:
   - Open the application
   - Go to **Settings**
   - Enter the URL of your deployed Audit API
   - Save the configuration

### Audit API (Backend)

For detailed deployment instructions, see the [Deployment Guide](https://saudigitus.github.io/dhis2-audit-vision/docs/deployment/intro).

### Quick Start with Docker (Recommended)

For a quick and easy setup, use Docker:

1. Clone the repository
2. Copy `.env.example` to `.env` and configure (see [Environment Variables](https://saudigitus.github.io/dhis2-audit-vision/docs/deployment/backend/environment-variables))
3. Choose the appropriate `docker-compose.yml` based on your deployment scenario (see [Deployment Scenarios](https://saudigitus.github.io/dhis2-audit-vision/docs/deployment/intro))
4. Build and start services: `docker compose up --build -d`
5. Run migrations: `docker compose exec api alembic upgrade head`
6. Create superuser and get access token: `docker compose exec api python commands.py seed-superuser`

The API will be available at http://localhost:8000. **Save the generated access token** - you'll need it to configure DHIS2 Audit Vision's Settings page.

## DHIS2 Instance Configuration

For detailed configuration of your DHIS2 instance (including audit system setup, integration user, etc.), see the [Configuration Guide](https://saudigitus.github.io/dhis2-audit-vision/docs/configuration/intro).

## Development

For development instructions, see the [Development Guide](https://saudigitus.github.io/dhis2-audit-vision/docs/development/intro).

## Contributing

1. Create a new branch for your feature or bugfix
2. Make your changes
3. Ensure tests pass
4. Submit a pull request

## License

This project is licensed under the terms of the MIT license.
