require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require('path')

module.exports = {
  siteMetadata: {
    title: `Mattressville`,
    description: `🛒 Theme to build a blazing simple and fast store with Gatsby and Shopify.`,
    author: `@4nkit-5hukla`,
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
      },
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        storeUrl: `${process.env.SHOP_NAME}.myshopify.com`,
        password: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
        shopifyConnections: ['collections'],
        salesChannel: 'Gatsby App',
        downloadImages: true,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        // This type will contain remote schema Query type
        typeName: 'ShopifyStore',
        // This is field under which it's accessible
        fieldName: 'store',
        // Url to query from
        url: `https://${process.env.SHOP_NAME}.myshopify.com/api/2022-04/graphql.json`,
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          'X-Shopify-Storefront-Access-Token': `${process.env.SHOPIFY_ACCESS_TOKEN}`,
          'Content-Type': 'application/graphql',
        },
        // refetchInterval: 60,
      },
    },
    // {
    //   resolve: 'gatsby-source-graphql',
    //   options: {
    //     // This type will contain remote schema Query type
    //     typeName: 'ShopifyStoreAdmin',
    //     // This is field under which it's accessible
    //     fieldName: 'storeAdmin',
    //     // Url to query from
    //     url: `https://${process.env.SHOP_NAME}.myshopify.com/admin/api/2022-04/graphql.json`,
    //     headers: {
    //       // Learn about environment variables: https://gatsby.dev/env-vars
    //       'X-Shopify-Access-Token': `${process.env.SHOPIFY_ADMIN_ACCESS_TOKEN}`,
    //       'Content-Type': 'application/graphql',
    //     },
    //     // refetchInterval: 60,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '~': path.join(__dirname, 'src/'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 100,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-shopify-theme`,
        short_name: `gatsby-shopify`,
        start_url: `/`,
        background_color: `#707070`,
        theme_color: `#ff3057`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('sass'),
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/',
        excludes: [
          '/mattress-matchmaker/results',
          '/login',
          '/account',
          '/account/*',
          '/cart',
          '/search',
          '/nine-reasons-time-consider-getting-new-mattress',
          '/terms-and-conditions',
        ],
        query: `{
            allSitePage {
              nodes {
                path
                context {
                  lastModifiedDate
                }
              }
            }
        }`,
        resolveSiteUrl: () => process.env.SITE_URL,
        resolvePages: ({ allSitePage: { nodes: allPages } }) =>
          allPages.map(page => page),
        serialize: ({ path, context }) => {
          return {
            url: path,
            ...(context.lastModifiedDate
              ? { lastmod: context.lastModifiedDate }
              : {}),
            ...(context.lastModifiedDate === null
              ? { changefreq: 'daily' }
              : {}),
            priority: 0.7,
          }
        },
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: process.env.SITE_URL,
        sitemap: `${process.env.SITE_URL}/sitemap-index.xml`,
        env: {
          production: {
            policy: [
              { userAgent: '*', allow: '/', crawlDelay: 120 },
              { userAgent: '*', disallow: '/search' },
              { userAgent: '*', disallow: '/account' },
              { userAgent: '*', disallow: '/account/*' },
              { userAgent: '*', disallow: '/login' },
              { userAgent: '*', disallow: '/mattress-matchmaker/results' },
            ],
          },
        },
      },
    },
    `gatsby-plugin-minify`,
    // `gatsby-plugin-feed`,
    // `gatsby-remark-autolink-headers`,
    // `gatsby-plugin-netlify-cms`,
    // `gatsby-plugin-netlify`,
    // `gatsby-transformer-remark-frontmatter`,
    // {
    //   resolve: `gatsby-source-wordpress`,
    //   options: {
    //     url:
    //       process.env.WPGRAPHQL_URL ||
    //       `https://appsandprojects.com/mattressville/graphql`,
    //     protocol: 'https',
    //     hostingWPCOM: false,
    //     useACF: true,
    //     verboseOutput: false,
    //     excludedRoutes: ['**/settings', '**/wp/v2/users/me', '**/wp/v2/themes'],
    //     acfOptionPageIds: [],
    //   },
    // },
  ],
}
