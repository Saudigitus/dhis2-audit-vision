/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  deploymentSidebar: [
    {
      type: 'doc',
      id: 'deployment/intro',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'deployment/frontend/index',
      label: 'DHIS2 Audit Vision',
    },
    {
      type: 'category',
      label: 'DHIS2 Audit Vision API',
      link: { type: 'doc', id: 'deployment/backend/index' },
      items: [
        'deployment/backend/install-nginx',
        'deployment/backend/install-postgresql',
        'deployment/backend/environment-variables',
        'deployment/backend/systemd-service',
        'deployment/backend/nginx-reverse-proxy',
      ],
    },
  ],

  configurationSidebar: [
    {
      type: 'doc',
      id: 'configuration/intro',
      label: 'Introduction',
    },
    'configuration/enable-audit-system',
    'configuration/integration-user',
    'configuration/sql-views',
    'configuration/api-routes',
    'configuration/understanding-dhis2-audit',
    'configuration/configure-api-url',
  ],

  developmentSidebar: [
    {
      type: 'doc',
      id: 'development/intro',
      label: 'Development Guide',
    },
    'development/backend',
    'development/frontend',
    'development/contributing',
  ],

  userGuideSidebar: [
    {
      type: 'doc',
      id: 'user-guide/intro',
      label: 'Introduction',
    },
    'user-guide/dashboard',
    'user-guide/change-explorer',
    'user-guide/metadata-grouping',
    'user-guide/user-audit',
    'user-guide/severity-rules',
  ],
};

export default sidebars;
