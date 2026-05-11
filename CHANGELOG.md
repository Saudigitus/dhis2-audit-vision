# Changelog

All notable changes to DHIS2 Audit Vision will be documented in this file.

## [1.0.2] - 2026-05-11

### 🚀 CI/CD
- **Workflow**: Add manual trigger to deploy workflow

### 📦 DHIS2 AUDIT VISION – Version 1.0.2 Release Notes

**Release Date:** 2026-05-11

### ✨ New Features

- **Complete Traceability**: Track every change made to DHIS2 metadata with Diff visualization, dependency tracking, and complete audit trails
- **Real-Time Monitoring**: Monitor user activity and system changes in real time
- **Rollback Capability**: Quickly revert accidental or unwanted changes with detailed change history and one-click rollback
- **Automatic Alerts**: Receive intelligent notifications categorized by severity level (High, Medium, Low) when critical changes happen
- **DHIS2 Integration**: Seamless integration with DHIS2 instances (version 2.40+)
- **Dashboard**: Visual overview of system health, user activity, and recent changes
- **Change Explorer**: Detailed view of all metadata changes with filter and search capabilities
- **User Audit**: Monitor user activity and changes made by specific users
- **Severity Rules**: Configure custom alert rules based on severity levels
- **Monitoring Groups**: Organize metadata into monitoring groups for focused tracking
- **Settings Panel**: Configure API URL and other application settings

### 🔧 Technical Features

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **DHIS2 UI Components**: Integration with @dhis2/ui component library
- **State Management**: Recoil for state management
- **Routing**: React Router DOM for navigation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for UI icons
- **Internationalization**: i18n support with @dhis2/d2-i18n
- **Backend API**: Python-based REST API (separate repository)
- **Database**: PostgreSQL with Alembic migrations
- **Deployment**: Docker support for production deployment

### 📦 Deployment Options

- **Frontend**: DHIS2 custom app bundle
- **Backend API**: 
  - Docker Compose (recommended for production)
  - Manual installation (for development or custom setups)

### 📋 Requirements

- **DHIS2 Instance**: Minimum version 2.40 with auditing enabled
- **Frontend**: Node.js 18+ for development
- **Backend API**: 
  - Python 3.11+
  - PostgreSQL
  - Docker & Docker Compose (optional)

### 📝 Documentation

- Complete README with installation and deployment instructions
- DHIS2 instance configuration guide
- Frontend and backend development guides for contributors

### 🔒 Security

- Integration user with minimum required permissions (F_METADATA_EXPORT, F_AUDIT_READ)
- Automatic SQL View management with compatibility checks
- Secure environment variable configuration

## [1.0.0] - 2026-05-06

### ✨ New Features

- **Complete Traceability**: Track every change made to DHIS2 metadata with Diff visualization, dependency tracking, and complete audit trails
- **Real-Time Monitoring**: Monitor user activity and system changes in real time
- **Rollback Capability**: Quickly revert accidental or unwanted changes with detailed change history and one-click rollback
- **Automatic Alerts**: Receive intelligent notifications categorized by severity level (High, Medium, Low) when critical changes happen
- **DHIS2 Integration**: Seamless integration with DHIS2 instances (version 2.40+)
- **Dashboard**: Visual overview of system health, user activity, and recent changes
- **Change Explorer**: Detailed view of all metadata changes with filter and search capabilities
- **User Audit**: Monitor user activity and changes made by specific users
- **Severity Rules**: Configure custom alert rules based on severity levels
- **Monitoring Groups**: Organize metadata into monitoring groups for focused tracking
- **Security Audit**: Dedicated security monitoring capabilities
- **Trends Analytics**: Visualize change trends over time with charts
- **Settings Panel**: Configure API URL and other application settings

### 🔧 Technical Features

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **DHIS2 UI Components**: Integration with @dhis2/ui component library
- **State Management**: Recoil for state management
- **Routing**: React Router DOM for navigation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for UI icons
- **Internationalization**: i18n support with @dhis2/d2-i18n
- **Backend API**: Python-based REST API (separate repository)
- **Database**: PostgreSQL with Alembic migrations
- **Deployment**: Docker support for production deployment

### 📦 Deployment Options

- **Frontend**: DHIS2 custom app bundle
- **Backend API**: 
  - Docker Compose (recommended for production)
  - Manual installation (for development or custom setups)

### 📋 Requirements

- **DHIS2 Instance**: Minimum version 2.40 with auditing enabled
- **Frontend**: Node.js 18+ for development
- **Backend API**: 
  - Python 3.11+
  - PostgreSQL
  - Docker & Docker Compose (optional)

### 📝 Documentation

- Complete README with installation and deployment instructions
- DHIS2 instance configuration guide
- Frontend and backend development guides for contributors

### 🔒 Security

- Integration user with minimum required permissions (F_METADATA_EXPORT, F_AUDIT_READ)
- Automatic SQL View management with compatibility checks
- Secure environment variable configuration
