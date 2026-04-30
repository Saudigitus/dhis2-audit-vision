# DHIS2 Audit Vision

A monitoring and audit platform for DHIS2 instances.

## Requirements

- Node.js 18+
- Python 3.11+
- pip (Python package installer)
- Docker and Docker Compose (for API deployment)
- A configured DHIS2 instance

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Saudigitus/dhis2-audit-vision.git
   cd dhis2-audit-vision
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure your DHIS2 instance**:
   Edit the `d2.config.json` file (if present) or set your DHIS2 instance URL.

4. **Start the application in development mode**:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`

5. **Connect your instance**:
   Click on **"Connect Instance" in the sidebar and enter your DHIS2 server URL, username, and password.

## Deploy the Audit API

1. **Clone the API repository**:
   ```bash
   git clone https://github.com/Saudigitus/dhis-audit-vision-api.git
   cd dhis-audit-vision-api
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root of the project with the following variables:

   ```env
   DHIS2_INSTANCE_URL=https://your-dhis2-instance.org
   DHIS2_USERNAME=your-username
   DHIS2_PASSWORD=your-password
   ```

3. **Start services with Docker**:
   ```bash
   docker-compose up -d
   ```

## DHIS2 Instance Configuration

For the API to work correctly, you need to enable auditing on your DHIS2 server:

1. **Enable metadata auditing (Audit Trail) on the server**:

   - Access your DHIS2 server as an administrator
   - Go to **Apps → Settings → Audit Trail
   - Enable the "Enable audit trail" option
   - Set the audit log retention period (recommended: 90 days)

2. **Create required SQL Views**:
   The application depends on some SQL Views to display reports:
   - `CojzlwsuuGL - Top 5 Users by Period
   - `B7DrTkhIYld - Audit Summary by User
   - `sGPipQDLMgy - Total Changes This Year

3. **Integration User**:
   Create a specific user for integration with the following minimum permissions:
   - F_METADATA_EXPORT
   - F_AUDIT_READ
   - Access to all created SQL Views

## Configure the App Settings

1. **Set the API URL in the application**:
   - Open the application
   - Go to **Settings**
   - Enter the URL of your deployed Audit API
   - Save the configuration

## Project Structure

```
dhis2-audit-vision/
├── src/
│   ├── components/   # React Components
│   ├── hooks/        # Custom Hooks
│   ├── pages/        # Application Pages
│   ├── types/        # TypeScript Types
│   └── utils/        # Utilities
└── package.json
```

## Key Features

1. **Dashboard**:
   - Overview of system changes
   - Trend charts
   - Cards with important metrics

2. **Change Explorer**:
   - Complete history of all changes
   - Advanced filters
   - Difference visualization (diff)

3. **Users**:
   - List of system users
   - Ranking by activities
   - Details and profile of each user

4. **Settings**:
   - Severity rules
   - Notification configuration

## Technologies

- React
- TypeScript
- Vite
- Tailwind CSS
- @dhis2/app-runtime
- Recharts
- Lucide React (icons)
