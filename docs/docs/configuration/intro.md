---
id: intro
title: Introduction
sidebar_position: 1
---

# Configuration

This section explains how to configure your **DHIS2 instance** to work correctly with DHIS2 Audit Vision.

## Overview

For Audit Vision to read audit data from DHIS2, you need to:

1. **Enable the DHIS2 audit system** in `dhis.conf`
2. **Create a dedicated integration user** with the minimum required permissions
3. **Understand how SQL Views are managed** (automatic)
4. **Configure the Audit API URL** in the frontend application

## Minimum DHIS2 Version

:::info
DHIS2 Audit Vision requires **DHIS2 version 2.40 or higher**.
:::

## Steps

- [Enable the Audit System in dhis.conf](./enable-audit-system)
- [Create the Integration User](./integration-user)
- [SQL View Management](./sql-views)
- [Understanding DHIS2 Auditing](./understanding-dhis2-audit)
- [Configuring the Audit API URL](./configure-api-url)
