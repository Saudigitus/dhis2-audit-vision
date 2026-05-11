---
id: nginx-reverse-proxy
title: Configure Nginx Reverse Proxy
sidebar_position: 6
---

# Configure Nginx as a Reverse Proxy

Nginx will forward all public HTTP traffic to the FastAPI app running on port `8000`.

## Edit the Default Site Configuration

```bash
nano /etc/nginx/sites-available/default
```

Replace the contents with:

```nginx title="/etc/nginx/sites-available/default"
server {
    listen 80;
    server_name your_server_ip_or_domain;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Replace `your_server_ip_or_domain` with the actual IP address or domain name of your server.

## Validate and Reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

If `nginx -t` reports `syntax is ok` and `test is successful`, the configuration is valid and Nginx is now proxying requests to the Audit API.

:::tip Setting up HTTPS
For production environments, it is strongly recommended to configure HTTPS using **Let's Encrypt**:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com
```
:::

## Deployment Complete ✅

Your Audit API is now fully deployed and accessible. Proceed to configure your DHIS2 instance to work with Audit Vision:

- [DHIS2 Instance Configuration →](../../configuration/intro)
