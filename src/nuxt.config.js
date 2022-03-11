export default {
  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  head: {
    title: 'my_chatapp',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  css: ['@/assets/css/main.css'],

  plugins: [{ src: '~/plugins/firebase.js', ssr: false }],

  components: true,

  buildModules: ['@nuxt/postcss8'],

  modules: ['@nuxtjs/axios', '@nuxtjs/gtm'],

  gtm: {
    id: 'GTM-KTQGFCW',
  },

  axios: {
    proxy: true,
  },

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  router: {
    middleware: 'authenticated',
  },
}
