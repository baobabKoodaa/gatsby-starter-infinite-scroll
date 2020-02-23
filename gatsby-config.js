module.exports = {
  siteMetadata: {
    title: `Hola Cabo`,
    logo: 'https://nightlife2-webapp.s3.amazonaws.com/HolaCabo%20Logo%20Final%201024.png',
    description: `Say 👋to the best of Los Cabos.`,
    author: `Solco, LLC`,
    // https://react-icons.netlify.com/#/icons/fa
    menuLinks: [
      {
        name: 'home',
        link: '/',
      },
      {
        name: 'about',
        link: '/about'
      },
      {
        name: 'contact',
        link: '/contact'
      },
    ],
    socialLinks: [
      {
        name: 'Instagram',
        link: 'https://instagram.com/holacabo',
        icon: 'instagram'
      },
      {
        name: 'Facebook',
        link: 'https://facebook.com/holacabo',
        icon: 'facebook'
      }
    ]
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        //jsxPragma: `jsx`, // defaults to "React" ??
        allExtensions: true
      },
    },
    {
      resolve: `gatsby-plugin-styled-jsx`,
      options: {
        jsxPlugins: ["styled-jsx-plugin-postcss"],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `white`,
        background_color: `white`,
        theme_color: `white`,
        display: `minimal-ui`,
        icon: `static/holacabo-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App  Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
