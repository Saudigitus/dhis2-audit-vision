---
id: integration-user
title: Integration User
sidebar_position: 3
---

# Integration User

DHIS2 Audit Vision connects to your DHIS2 instance using a dedicated service account. This user should have the minimum permissions required — following the principle of least privilege.

## Required Permissions

Create a user in DHIS2 with the following authorities:

| Authority | Purpose |
|---|---|
| `F_METADATA_EXPORT` | Allows exporting metadata for diff and dependency tracking |
| `F_AUDIT_READ` | Allows reading the DHIS2 audit log |

## How to Create the User

1. Log in to DHIS2 as an administrator.
2. Go to **User Management** → **Users** → **Add new user**.
3. Fill in the user details (username, password, email).
4. Under **Roles**, assign a role that includes `F_METADATA_EXPORT` and `F_AUDIT_READ`.  
   You can create a dedicated role named `Audit Vision Integration`.
5. Under **User Groups**, add the user to the `AUDIT_VISION_ADMINS` group.
6. Save the user.

## Configure Credentials in the API

Once the user is created, encode the credentials as Base64 and set them in the `.env` file:

```bash
echo -n "username:password" | base64
```

Paste the result into the `SERVER_DHIS2_AUTH` variable in your `.env`:

```bash
SERVER_DHIS2_AUTH=dXNlcm5hbWU6cGFzc3dvcmQ=
```

## Next Steps

- [SQL View Management →](./sql-views)
