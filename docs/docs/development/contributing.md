---
id: contributing
title: Contributing
sidebar_position: 4
---

# Contributing

Contributions to DHIS2 Audit Vision are welcome! This page outlines the workflow for both the frontend and backend repositories.

## General Workflow

1. **Fork** the relevant repository on GitHub.
2. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. **Make your changes** and commit using clear, descriptive messages.
4. **Ensure tests pass** before submitting.
5. **Open a pull request** against the `develop` branch.

## Frontend Repository

[github.com/Saudigitus/dhis2-audit-vision](https://github.com/Saudigitus/dhis2-audit-vision)

```bash
# Run linting
npm run lint

# Build to verify
npm run build
```

## Backend Repository

[github.com/Saudigitus/dhis-audit-vision-api](https://github.com/Saudigitus/dhis-audit-vision-api)

```bash
# Run with the development server
python runserver.py
```

## License

Both projects are licensed under the **MIT License**.
