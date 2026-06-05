---
id: user-group
title: Audit Vision Administrators Group
sidebar_position: 5
---

# Audit Vision Administrators Group

DHIS2 Audit Vision automatically creates and manages a dedicated user group called **"Audit Vision Administrators" to control access to sensitive audit resources in your DHIS2 instance.

## What the Group Does

This group is automatically created with a stable code (`AUDIT_VISION_ADMINS`) to ensure consistent access across updates. Members of this group are granted:

- Full read/write access to all Audit Vision SQL views
- Full read/write access to the Audit Vision event hook

## Post-Setup Steps

After deploying Audit Vision and running the app for the first time:

1. Open the DHIS2 **Users** app → **User Groups**
2. Find **"Audit Vision Administrators"** (created automatically during initialization)
3. Add all relevant users to this group who should be able to configure or manage Audit Vision
4. Only members not in this group will not have access to Audit Vision's SQL views or event hook

## Group Permissions

The group is automatically granted:
- `rwrw----` access to all Audit Vision SQL Views (full read/write access)
- `rw------` access to the Audit Vision Event Hook

This helps prevent unauthorized modifications to critical audit resources!
