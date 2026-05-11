---
id: index
title: DHIS2 Audit Vision API Deployment
sidebar_position: 1
---

# DHIS2 Audit Vision API Deployment

The DHIS2 Audit Vision API is a **FastAPI** Python application that connects to your DHIS2 PostgreSQL database and exposes audit data to the frontend application.

## Prerequisites

Before deploying, ensure you have:

- **Ubuntu 22.04 LTS** server (fresh install recommended)
- **Python 3.11+** and `pip`
- **PostgreSQL** installed and configured
- **Git** access to the repository
- A running DHIS2 instance accessible from this server

## Deployment Steps

Follow the steps in order:

1. [Install Nginx](./install-nginx)
2. [Install PostgreSQL](./install-postgresql)
3. [Configure Environment Variables](./environment-variables)
4. [Set up the systemd Service](./systemd-service)
5. [Configure Nginx as a Reverse Proxy](./nginx-reverse-proxy)

## Architecture Overview

```
Internet → Nginx (port 80/443) → Uvicorn/FastAPI (port 8000) → PostgreSQL
                                                              ↕
                                                         DHIS2 Instance
```

The API runs as a `systemd` service managed by **Uvicorn**, with **Nginx** acting as a reverse proxy on the standard HTTP/HTTPS port.
