---
id: intro
title: Introduction
sidebar_position: 1
---

# Deployment

This section provides comprehensive documentation on how to deploy the DHIS2 Audit Vision application and its backend API in various environments.

## Overview

The DHIS2 Audit Vision project consists of two main components:

1. **DHIS2 Audit Vision** – A DHIS2 custom application installed directly into your DHIS2 instance via the App Management module.
2. **DHIS2 Audit Vision API** – A FastAPI-based backend service that connects to your DHIS2 instance and provides audit data to the frontend.

Each component has its own deployment requirements, detailed in the respective sections below.

## Deployment Options

### DHIS2 Audit Vision Deployment

The frontend is packaged as a standard DHIS2 custom app and is installed directly into your DHIS2 instance:

- Download the latest release from GitHub
- Upload via DHIS2 App Management
- Configure the API URL (see [Configuration section](../configuration/configure-api-url))

### DHIS2 Audit Vision API Deployment

The backend API is a Python FastAPI application that can be deployed in two ways:

#### Option 1: Docker (Recommended)
- Uses Docker Compose to orchestrate all services
- Includes PostgreSQL, the FastAPI app, and optional Nginx
- Easier to set up and maintain

#### Option 2: Manual Deployment
- Deployed directly on a Ubuntu server
- Uses **Nginx** as a reverse proxy
- Uses **PostgreSQL** as the database
- Uses **systemd** to manage the service process

:::info Minimum DHIS2 Version
The DHIS2 instance must be running **version 2.40 or higher** for the audit system to be compatible.
:::

## Next Steps

Choose the component you want to deploy:

- [DHIS2 Audit Vision Deployment](./frontend/)
- [DHIS2 Audit Vision API Deployment](./backend/)
