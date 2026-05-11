---
id: frontend
title: Frontend Development
sidebar_position: 3
---

# Frontend Development

## Prerequisites

- Node.js version **18 or higher**
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Saudigitus/dhis2-audit-vision.git
cd dhis2-audit-vision
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

The app will be available at `http://localhost:3000`, connected to a DHIS2 instance via the DHIS2 app scripts proxy.

## Building for Production

```bash
npm run build
```

This generates the app bundle in the `build/` directory, ready to be uploaded to a DHIS2 instance.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React |
| DHIS2 Integration | `@dhis2/app-runtime` |
| UI Components | `@dhis2/ui` |
| Build tooling | DHIS2 App Scripts (`@dhis2/cli-app-scripts`) |
| State management | React Context / hooks |
