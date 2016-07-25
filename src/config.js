require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  port: process.env.PORT || 3000,
  app: {
    baseApiUrl: 'https://dock-server.duckdns.org',
    title: 'App Direct Logs',
    meta: [
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'description', content: 'App Direct Logs'},
      {name: 'robots', content: 'index,follow'},
      {name: 'Content-Type', content: 'text/html; charset=utf-8'},
      {name: 'Copyright', content: 'liviu@ignat.email'},
      {name: 'audience', content: 'all'},
      {charset: 'utf-8'},
      {property: 'keywords', content: 'logs, appdirect'},
      {property: 'og:site_name', content: 'AppDirect'},
      {property: 'og:locale', content: 'en_US'},
      {property: 'og:title', content: 'Marketplace, Billing and Distribution, Reseller, and Management Services - AppDirect'},
      {property: 'og:description', content: 'AppDIrect Logs'},
      {property: 'og:image', content: 'https://d1qb2nb5cznatu.cloudfront.net/startups/i/39904-dc51fcb38683e0e2e4f323682a817992-medium_jpg.jpg?buster=1428521947'},
      {property: 'og:image:width', content: '646'},
      {property: 'og:image:height', content: '220'},
    ]
  }
}, environment);
