---
id: understanding-dhis2-audit
title: Understanding DHIS2 Auditing
sidebar_position: 5
---

# Understanding DHIS2 Auditing

This page explains how the DHIS2 audit system works internally and how Audit Vision reads that data.

## How DHIS2 Records Audit Logs

Starting in **DHIS2 version 2.35+**, DHIS2 uses an **asynchronous message-based audit service** powered by **Apache ActiveMQ Artemis**.

The flow works as follows:

1. A user modifies an entity (metadata, data value, tracker record) in DHIS2.
2. The change is written to the PostgreSQL database.
3. An audit message is sent asynchronously to the audit queue.
4. The audit log entry is recorded in the PostgreSQL database.

## Where Audit Logs Are Stored

DHIS2 records audit logs directly into your **PostgreSQL database** in the following tables:

| Table | Contents |
|---|---|
| `audit` | Metadata and general object audit logs |

This table is queried by the Audit API via SQL Views to expose the data to the frontend.

## Audit Vision's Approach

Audit Vision reads directly from these PostgreSQL tables through the DHIS2 SQL View mechanism and the DHIS2 API. This gives it:

- **Complete history** of all audited changes
- **Diff visualization** by comparing consecutive audit entries
