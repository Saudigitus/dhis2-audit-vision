---
id: configure-api-url
title: Configuring the API URL
sidebar_position: 5
---

# Configuring the Audit API URL

After installing the app, you need to point it to your deployed [Audit API](../deployment/backend/) backend.

## Steps

1. Open the **DHIS2 Audit Vision** app from your DHIS2 dashboard.
2. Go to **Settings** (gear icon in the top-right corner).
3. In the **Audit API URL** field, enter the full URL of your deployed backend.  
   Example: `https://your-server-ip-or-domain`
4. Click **Save**.

![Audit API Settings](/img/audit-api-settings.png)

The app will now connect to your backend and begin displaying audit data.

:::info
Make sure the Audit API server is running and accessible from the network where your DHIS2 instance is hosted. If Nginx is configured correctly as a reverse proxy, the URL should be the server's IP or domain without a port number.
:::
