---
id: enable-audit-system
title: Enable the Audit System
sidebar_position: 2
---

# Enable the Audit System in dhis.conf

To allow DHIS2 Audit Vision to read audit logs, you must enable the DHIS2 audit system in your server configuration.

## Step 1 – Locate dhis.conf

Your DHIS2 configuration file is typically located at:

- `/etc/dhis/dhis.conf`
- Or in your DHIS2 home directory

## Step 2 – Configure Audit Properties

Open the file and add or modify the `audit` property. For example, to audit Metadata and Tracker data:

```properties title="dhis.conf"
audit = METADATA, TRACKER
```

### Supported Audit Scopes

| Value | Description |
|---|---|
| `METADATA` | Changes to metadata objects (data elements, indicators, etc.) |
| `TRACKER` | Changes to tracked entity instances and enrollments |
| `READ` | Read operations |
| `CREATE` | Creation of new objects |
| `UPDATE` | Updates to existing objects |
| `DELETE` | Deletion of objects |
| `SEARCH` | Search operations |
| `DISABLED` | Turns the audit log system **off** |

:::tip
If you want all standard operations audited, you can often omit this line entirely — DHIS2 enables auditing for standard scopes by default.
:::

## Step 3 – Save and Restart DHIS2

After editing `dhis.conf`, restart your DHIS2 instance (Tomcat) to apply the changes:

```bash
sudo systemctl restart tomcat
```

## Next Steps

- [Create the Integration User →](./integration-user)
