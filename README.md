# DHIS2 Audit Vision

A monitoring and audit platform for DHIS2 instances.

## Introduction

DHIS2 Audit Vision is a powerful monitoring and audit platform that tracks every change made to your DHIS2 metadata,
providing real-time alerts, complete traceability, and security monitoring for your DHIS2 instance.

By providing comprehensive monitoring and audit capabilities, Audit Vision empowers ministries of health, NGOs, and other
stakeholders to ensure data integrity, monitor system changes, and maintain a secure and accountable DHIS2 implementation.

## Key Features

1. **Complete Traceability**: Track every change made to your DHIS2 metadata with Diff visualization, dependency tracking, and complete audit trails.
2. **Real Time Monitoring**: Monitor user activity and system changes in real time.
3. **Reverse Any Change**: Quickly revert accidental or unwanted changes with detailed change history and one-click rollback capabilities.
4. **Automatic Alerts**: Receive intelligent notifications categorized by severity level (High, Medium, Low) when critical changes happen.

## Deployment

### Frontend Application

The DHIS2 Audit Vision frontend is a DHIS2 custom application.

#### Prerequisites

- A configured DHIS2 instance (minimum version 2.40)
- Administrator access to the DHIS2 instance to install apps

#### Installation

1. **Download the latest release**:
   Go to the [DHIS2 Audit Vision Releases page](https://github.com/Saudigitus/dhis2-audit-vision/releases) and download the latest version of the app.

**Install the app in your DHIS2 instance**:

- Access your DHIS2 server as an administrator

* [ ] Go to **App Management** to upload the app bundle manually

1. **Set the API URL in the application**:
   - Open the application
   - Go to **Settings**
   - Enter the URL of your deployed Audit API
   - Save the configuration


### Audit API (Backend)

The Audit API provides the backend functionality for DHIS2 Audit Vision.

#### Prerequisites

- Python 3.11+
- pip (Python package installer)
- Docker and Docker Compose (recommended for production deployment)
- A configured DHIS2 instance with auditing enabled

#### Opção 1: Configuração com Docker (Contêineres - Recomendado para Produção)

Esta é a forma recomendada para ambientes de produção, pois automatiza a instalação e gerenciamento dos serviços em contêineres.

**Pré-requisito**: Docker e Docker Compose já instalados no servidor Linux.

1. **Clonar o repositório da API**:
   ```bash
   git clone https://github.com/Saudigitus/dhis-audit-vision-api.git
   cd dhis-audit-vision-api
   ```

2. **Configurar variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (ajuste os valores conforme sua instalação):
   ```env
   DHIS2_INSTANCE_URL=https://seu-dhis2-instancia.org
   DHIS2_USERNAME=seu-usuario
   DHIS2_PASSWORD=sua-senha
   DB_NAME=dhis2_audit
   DB_USER=postgres
   DB_PASSWORD=sua-senha-do-banco
   DB_HOST=db
   DB_PORT=5432
   ```

3. **Iniciar os serviços com Docker Compose**:
   ```bash
   docker compose up -d
   ```

4. **Verificar se os serviços estão rodando**:
   ```bash
   docker compose ps
   ```

---

#### Opção 2: Configuração Manual (Sem Docker)

Use esta opção se preferir instalar e gerenciar os componentes diretamente no servidor Linux sem contêineres (funciona para desenvolvimento e produção).

##### Pré-requisitos adicionais:
- Python 3.11+
- pip (Python package installer)
- PostgreSQL instalado e configurado no servidor

##### Passos de instalação:

1. **Criar ambiente virtual**:
   ```bash
   python -m venv .venv
   ```

2. **Ativar o ambiente virtual**:
   ```bash
   # Linux/Mac
   source .venv/bin/activate
   ```

3. **Instalar dependências**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configurar variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto com as mesmas variáveis da configuração Docker, mas ajuste `DB_HOST` para o endereço do seu PostgreSQL (ex: `localhost`):
   ```env
   DHIS2_INSTANCE_URL=https://seu-dhis2-instancia.org
   DHIS2_USERNAME=seu-usuario
   DHIS2_PASSWORD=sua-senha
   DB_NAME=dhis2_audit
   DB_USER=postgres
   DB_PASSWORD=sua-senha-do-banco
   DB_HOST=localhost
   DB_PORT=5432
   ```

5. **Executar migrações do banco de dados**:
   ```bash
   alembic revision --autogenerate -m "Create all tables"
   alembic upgrade head
   ```

6. **Executar seeders** (dados iniciais):
   ```bash
   python commands.py
   ```

7. **Iniciar o servidor**:
   ```bash
   python runserver.py
   ```

## DHIS2 Instance Configuration

For the API to work correctly, you need to enable auditing on your DHIS2 server.

**Minimum DHIS2 Version**: 2.40

### 1. Configure Audit System in dhis.conf

To enable or configure the audit system on a DHIS2 server, you must modify your dhis.conf file:

#### Step 1: Open your dhis.conf file

Locate your DHIS2 configuration file. Depending on your server installation, this is usually found at:

- `/etc/dhis/dhis.conf` or in your DHIS2 home directory.

#### Step 2: Configure Audit Properties

Add or modify the audit property in your dhis.conf file. You can specify the scope of the events you want the server to audit.

For example, if you only want to audit the creation and updates of Metadata and Tracker data, add the following line:

```properties
audit = METADATA, TRACKER
```

To enable auditing for a specific set of operations, you can list them separated by commas. The supported options include:

- `READ`
- `CREATE`
- `UPDATE`
- `DELETE`
- `SEARCH`
- `DISABLED` (Turns the audit log system off)

Note: If you want all operations audited, you can often omit this line, as DHIS2 enables auditing for standard scopes by default.

#### Step 3: Save and Restart

1. Save the changes to your dhis.conf file.
2. Restart your DHIS2 instance (e.g., your Tomcat service) to apply the new configuration.

```bash
sudo systemctl restart tomcat
```

### 2. Integration User

Create a specific user for integration with the following minimum permissions:

- F\_METADATA\_EXPORT
- F\_AUDIT\_READ

### 3. Automatic SQL View Management

The DHIS2 Audit Vision automatically creates and maintains the required SQL Views in your DHIS2 instance. It also checks if existing views are compatible and updates them automatically if needed. No manual SQL View creation is required.

### Understanding DHIS2 Auditing

Starting in version 2.35+, DHIS2 uses an asynchronous message-based audit service powered by Apache ActiveMQ Artemis. Once an entity (such as a data value, metadata, or tracker record) is modified and successfully written to the database, an audit message is sent to the audit queue and logged.

DHIS2 records these audit logs directly into your PostgreSQL database in the respective audit and trackedentityaudit tables. Currently, these logs are designed to be extracted directly via backend database queries or through internal system monitoring setups.


## Backend API Development Guide (For Contributors)

### Prerequisites
- Python 3.11+
- pip (Python package installer)
- PostgreSQL installed and configured
- Git

### Setup Instructions
1. **Clone the API repository**:
   ```bash
   git clone https://github.com/Saudigitus/dhis-audit-vision-api.git
   cd dhis-audit-vision-api
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv .venv
   ```

3. **Activate virtual environment**:
   - Linux/Mac:
     ```bash
     source .venv/bin/activate
     ```
   - Windows:
     ```bash
     .venv\Scripts\activate
     ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables**:
   Create a `.env` file in the root of the project with the database and DHIS2 instance variables (see "Configuração Manual (Sem Docker)" section for an example).

6. **Run database migrations**:
   ```bash
   alembic revision --autogenerate -m "Create all tables"
   alembic upgrade head
   ```

7. **Run seeders**:
   ```bash
   python commands.py
   ```

8. **Start the development server**:
   ```bash
   python runserver.py
   ```

### Contributing
1. Create a new branch for your feature or bugfix
2. Make your changes
3. Ensure tests pass
4. Submit a pull request

---

## Frontend Application Development Guide (For Contributors)

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Saudigitus/dhis2-audit-vision.git
   cd dhis2-audit-vision
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the application in development mode (DHIS2 app scripts)**:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Contributing

1. Create a new branch for your feature or bugfix
2. Make your changes
3. Ensure tests pass
4. Submit a pull request

## License

This project is licensed under the terms of the MIT license.
