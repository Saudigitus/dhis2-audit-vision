---
id: intro
title: Introduction
sidebar_position: 1
---

# Deployment

This section provides comprehensive documentation on how to deploy the DHIS2 Audit Vision application and its backend API in various environments.

## Overview

The DHIS2 Audit Vision project consists of two main components:

1. **Frontend App** – A DHIS2 custom application installed directly into your DHIS2 instance via the App Management module.
2. **Audit API (Backend)** – A FastAPI-based backend service that connects to your DHIS2 PostgreSQL database and exposes audit data to the frontend.

Each component has its own deployment requirements, detailed in the respective sections below.

## Deployment Options

### Frontend App Deployment

The frontend is packaged as a standard DHIS2 custom app and is installed directly into your DHIS2 instance:

- Download the latest release from GitHub
- Upload via DHIS2 App Management
- Configure the API URL (see [Configuration section](../configuration/configure-api-url))

### Audit API Deployment

The backend API is a Python FastAPI application, deployed on a Ubuntu server with:

- **Nginx** as a reverse proxy
- **PostgreSQL** as the database
- **systemd** to manage the service process

:::info Minimum DHIS2 Version
The DHIS2 instance must be running **version 2.40 or higher** for the audit system to be compatible.
:::

## Next Steps

Choose the component you want to deploy:

- [Frontend App Deployment](./frontend/)
- [Audit API (Backend) Deployment](./backend/)
