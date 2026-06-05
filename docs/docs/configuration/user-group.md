---
id: user-group
title: Audit Vision User Groups
sidebar_position: 5
---

# Audit Vision User Groups

DHIS2 Audit Vision automatically creates and manages two dedicated user groups to control access to sensitive audit resources in your DHIS2 instance.

## 1. Audit Vision Administrators

This group is automatically created with a stable code (`AUDIT_VISION_ADMINS`) to ensure consistent access across updates. Members of this group are granted:

- Full read/write access to all Audit Vision SQL views
- Full read/write access to the Audit Vision event hook

## 2. Audit Vision Viewers

This group is automatically created with a stable code (`AUDIT_VISION_VIEWERS`) to provide read-only access. Members of this group are granted:

- Read-only access to all Audit Vision SQL views
- Read-only access to the Audit Vision event hook

## Post-Setup Steps

After deploying Audit Vision and running the app for the first time:

1. Open the DHIS2 **Users** app → **User Groups**
2. Find both **"Audit Vision Administrators"** and **"Audit Vision Viewers"** (created automatically during initialization)
3. Add all relevant users to **"Audit Vision Administrators"** who should be able to configure or manage Audit Vision
4. Add users who only need to view audit data to **"Audit Vision Viewers"**
5. Users who are not members of either group will not have access to Audit Vision's resources

## Group Permissions

### Administrators Group (`AUDIT_VISION_ADMINS`)
- `rwrw----` access to all Audit Vision SQL Views (full read/write)
- `rw------` access to the Audit Vision Event Hook

### Viewers Group (`AUDIT_VISION_VIEWERS`)
- `r-------` access to all Audit Vision SQL Views (read-only)
- `r-------` access to the Audit Vision Event Hook

This helps prevent unauthorized modifications to critical audit resources while still allowing users to view the data!
