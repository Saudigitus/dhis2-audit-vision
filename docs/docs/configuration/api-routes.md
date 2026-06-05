---
id: api-routes
title: API Routes Management
sidebar_position: 4
---

# Automatic API Routes Management

DHIS2 Audit Vision **automatically creates and maintains** the required API Routes in your DHIS2 instance. This works similarly to how SQL Views are managed automatically.

## What Happens Automatically

- When you configure and save the Audit API URL in the frontend Settings page, the system automatically:
  - Checks whether the required API Routes exist in DHIS2
  - If they do not exist, they are created automatically with the correct configuration
  - If they exist but are outdated or incompatible, they are updated automatically
  - If any errors occur during creation/updating, they are logged and displayed in the error modal
  - Access is automatically granted to both user groups:
    - **Audit Vision Administrators**: Full read/write access
    - **Audit Vision Viewers**: Read-only access

:::success No Manual Setup Required
You do not need to create or manage API Routes manually. The system handles this for you automatically when you save the configuration in the frontend.
:::

## What Are API Routes?

API Routes in DHIS2 act as proxies between the Audit Vision frontend and your external Audit API. They handle:
- Forwarding requests from the frontend to the Audit API
- Authentication using the API token you provide
- Security and access control

## Included Routes

The following routes are automatically managed:

| Name                  | Code                | Purpose                                                                 |
|-----------------------|---------------------|-------------------------------------------------------------------------|
| Audit Metadata        | `audit-metadata`    | Retrieves audit data for specific metadata items                       |
| Audits                | `audits`            | Retrieves all audit records                                            |
| Audit Objects         | `audit-objects`     | Retrieves audit objects for detailed change information                |
| Create Notification   | `create-notification` | Creates new severity rules notifications                              |
| Delete Notification   | `delete-notification` | Deletes severity rules notifications                                  |
| Notifications         | `notifications`     | Manages severity rules notifications                                  |

## Next Steps

- [Audit Vision User Groups →](./user-group)
- [Configuring the Audit API URL and Token →](./configure-api-url)
