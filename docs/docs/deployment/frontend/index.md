---
id: index
title: DHIS2 Audit Vision Deployment
sidebar_position: 1
---

# DHIS2 Audit Vision Deployment

The DHIS2 Audit Vision is a **DHIS2 custom application** that runs inside your DHIS2 instance. It requires no separate server — it is uploaded and managed through the DHIS2 App Management interface.

## Prerequisites

Before installing, ensure you have:

- A running DHIS2 instance (**minimum version 2.40**)
- Administrator access to the DHIS2 instance
- A deployed [DHIS2 Audit Vision API](../backend/) that the frontend will connect to

## Step 1 – Installing the App in DHIS2

### Download the Latest Release

Go to the [DHIS2 Audit Vision Releases page](https://github.com/Saudigitus/dhis2-audit-vision/releases) and download the latest `.zip` bundle of the application.

### Upload via App Management

1. Log in to your DHIS2 instance as an **administrator**.
2. Navigate to **App Management** (search in the main menu or go to `dhis-web-app-management`).
3. Click **Upload App**.
4. Select the `.zip` file you downloaded and confirm the upload.
5. The app will appear in your DHIS2 app list once installed.


## Next Steps

After installation, you must configure the API URL:

- [Configure the Audit API URL →](../../configuration/configure-api-url)
