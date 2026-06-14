// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DHIS2 Audit Vision',
  tagline: 'Monitoring and Audit Platform for DHIS2 Instances',
  favicon: 'img/favicon.ico',

  url: 'https://saudigitus.github.io',
  baseUrl: '/dhis2-audit-vision/',

  organizationName: 'Saudigitus',
  projectName: 'dhis2-audit-vision',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/Saudigitus/dhis2-audit-vision/tree/develop/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/audit-vision-social.png',
      navbar: {
        title: 'DHIS2 Audit Vision',

        logo: {
          alt: 'DHIS2 Audit Vision Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'deploymentSidebar',
            position: 'left',
            label: 'Deployment',
          },
          {
            type: 'docSidebar',
            sidebarId: 'configurationSidebar',
            position: 'left',
            label: 'Configuration',
          },
          {
            type: 'docSidebar',
            sidebarId: 'userGuideSidebar',
            position: 'left',
            label: 'User Guide',
          },
          {
            type: 'docSidebar',
            sidebarId: 'developmentSidebar',
            position: 'left',
            label: 'Development guide',
          },
          {
            href: 'https://github.com/Saudigitus/dhis2-audit-vision',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Deployment', to: '/docs/deployment/intro' },
              { label: 'Configuration', to: '/docs/configuration/intro' },
              { label: 'Development guide', to: '/docs/development/intro' },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'DHIS2 Community of Practice',
                href: 'https://community.dhis2.org',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Saudigitus/dhis2-audit-vision',
              },
              {
                label: 'Saudigitus',
                href: 'https://saudigitus.org',
              },
              {
                label: 'DHIS2',
                href: 'https://dhis2.org',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Saudigitus. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'nginx', 'ini', 'properties'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
