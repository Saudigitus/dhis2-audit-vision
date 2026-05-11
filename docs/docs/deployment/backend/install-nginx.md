---
id: install-nginx
title: Install Nginx & Clone Repository
sidebar_position: 2
---

# Install Nginx & Clone the Repository

## 1. Install Nginx

```bash
sudo apt install nginx
sudo ufw allow 'Nginx HTTP'
systemctl status nginx
```

After running these commands, Nginx should be active and serving on port 80.

## 2. Install Git and Clone the Repository

```bash
sudo apt install git
cd /var/www/
git clone https://github.com/Saudigitus/dhis-audit-vision-api.git
cd dhis-audit-vision-api/
git checkout develop
```

## 3. Install Python Dependencies

```bash
pip install -r requirements.txt
pip install alembic psycopg2-binary
```

## Next Steps

- [Install PostgreSQL →](./install-postgresql)
