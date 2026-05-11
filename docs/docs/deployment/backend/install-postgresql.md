---
id: install-postgresql
title: Install PostgreSQL
sidebar_position: 3
---

# Install PostgreSQL

## Installation

```bash
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql
```

## Create the Database and User

Once inside the PostgreSQL shell, create a dedicated database and user for the Audit API:

```sql
CREATE DATABASE audit_vision;
CREATE USER audit_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE audit_vision TO audit_user;
\q
```

:::tip
Use a strong, unique password and keep it safe — you will need it when configuring the [environment variables](./environment-variables).
:::

## Next Steps

- [Configure Environment Variables →](./environment-variables)
