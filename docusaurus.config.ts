import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Jexi WC Headless API',
  tagline: 'Complete REST API Documentation for WooCommerce Headless Development',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://alibinzulfiqar.live',
  baseUrl: '/docs/',

  organizationName: 'alibinzulfiqar',
  projectName: 'jexi-wc-headless',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Jexi WC Headless API',
      logo: {
        alt: 'Jexi Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://alibinzulfiqar.live',
          label: 'Developer',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started',
            },
            {
              label: 'API Reference',
              to: '/category/api-reference',
            },
          ],
        },
        {
          title: 'API Categories',
          items: [
            {
              label: 'Products',
              to: '/api-reference/products',
            },
            {
              label: 'Cart & Checkout',
              to: '/api-reference/cart',
            },
            {
              label: 'Authentication',
              to: '/api-reference/authentication',
            },
          ],
        },
        {
          title: 'Developer',
          items: [
            {
              label: 'Ali Bin Zulfiqar',
              href: 'https://alibinzulfiqar.live',
            },
            {
              label: 'Plugin Site',
              href: 'https://jexi.dev/plugins/wc-headless',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'WooCommerce',
              href: 'https://woocommerce.com',
            },
            {
              label: 'WordPress REST API',
              href: 'https://developer.wordpress.org/rest-api/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Jexi WC Headless. Developed by Ali Bin Zulfiqar. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['php', 'bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
