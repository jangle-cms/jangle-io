module.exports = {
  css: [
    '@/assets/styles/main.scss'
  ],
  head: {
    title: 'Jangle',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'a cms for humans.' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i|Source+Sans+Pro:600,600i' },
      { rel: 'icon', href: '/jangle-circle.png' }
    ]
  },
  loading: {
    color: '#FA824C'
  },
  modules: [
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true
  },
  router: {
    linkExactActiveClass: 'link--active'
  },
  transition: {
    name: 'transition',
    mode: 'out-in'
  }
}
