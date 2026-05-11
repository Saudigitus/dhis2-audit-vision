---
id: systemd-service
title: Configure systemd Service
sidebar_position: 5
---

# Configure systemd Service

To keep the Audit API running automatically (including after reboots), configure it as a `systemd` service.

## Create the Service File

```bash
nano /etc/systemd/system/auditapi.service
```

Paste the following content:

```ini title="/etc/systemd/system/auditapi.service"
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

## Enable and Start the Service

```bash
systemctl daemon-reload
systemctl enable auditapi.service
systemctl restart auditapi.service
```

## Verify the Service is Running

```bash
systemctl status auditapi.service
```

You should see `Active: active (running)`. The API is now running on port `8000`.

## Next Steps

- [Configure Nginx as a Reverse Proxy →](./nginx-reverse-proxy)
