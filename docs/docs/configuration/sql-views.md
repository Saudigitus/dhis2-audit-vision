---
id: sql-views
title: SQL View Management
sidebar_position: 4
---

# Automatic SQL View Management

DHIS2 Audit Vision **automatically creates and maintains** the required SQL Views in your DHIS2 instance.

## What Happens Automatically

- On startup, the Audit API checks whether the required SQL Views exist in DHIS2.
- If they do not exist, they are created automatically.
- If they exist but are outdated or incompatible, they are updated automatically.

:::success No Manual Setup Required
You do not need to create or manage SQL Views manually. The system handles this for you.
:::

## SQL View ID

The default SQL View ID used by Audit Vision is `InoZ6MNulN4`. This value is pre-configured in the `.env` file:

```bash
SQL_VIEW_ID=InoZ6MNulN4
```

Only change this value if you are managing multiple Audit Vision instances against the same DHIS2 environment and need to isolate views.

## Next Steps

- [Understanding DHIS2 Auditing →](./understanding-dhis2-audit)
