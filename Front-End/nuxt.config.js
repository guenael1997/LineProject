export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'facebooklikeapp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    BaseStrapiUrl: "http://localhost:1337",
    BaseApiStrapiUrl : "http://localhost:1337/api",
    ApiStrapiTokenPublic : {headers:{'Autorization': 'Bearer a41011dfb778461b1619678552cd0ed9ce5bc9886a0a47cd08263370538fcfbf631eaf898da26763d5fbec82ca608f37c701c8982a7b6a3626b4ac63dc2a84b0c43591c98b5cd800ac42e08231e9cd6970a2a2ff1b70aa535f98625becca92f93a33c3be35952cb79b4dfa7fe34fb18d35dfeaef76ba52cfcf6776b95341c2ad',}},
    DefaultAvatar:{
      "id": 28,
      "name": "149071.png",
      "alternativeText": "149071.png",
      "caption": "149071.png",
      "width": 512,
      "height": 512,
      "formats": {
          "thumbnail": {
              "name": "thumbnail_149071.png",
              "hash": "thumbnail_149071_78f1cdd503",
              "ext": ".png",
              "mime": "image/png",
              "path": null,
              "width": 156,
              "height": 156,
              "size": 9.88,
              "url": "/uploads/thumbnail_149071_78f1cdd503.png"
          },
          "small": {
              "name": "small_149071.png",
              "hash": "small_149071_78f1cdd503",
              "ext": ".png",
              "mime": "image/png",
              "path": null,
              "width": 500,
              "height": 500,
              "size": 40.96,
              "url": "/uploads/small_149071_78f1cdd503.png"
          }
      },
      "hash": "149071_78f1cdd503",
      "ext": ".png",
      "mime": "image/png",
      "size": 4.48,
      "url": "/uploads/149071_78f1cdd503.png",
      "previewUrl": null,
      "provider": "local",
      "provider_metadata": null,
      "createdAt": "2022-09-17T10:24:24.818Z",
      "updatedAt": "2022-09-17T10:24:24.818Z"
  }
  }
}
