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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Code+Pro|Source+Sans+Pro:300,300i,600,600i' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css' },
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
    use: [
      [
        'markdown-it-anchor',
        {
          permalink: true,
          permalinkSymbol: ''
        }
      ]
    ]
  },
  router: {
    linkExactActiveClass: 'link--active'
  },
  transition: {
    name: 'transition',
    mode: 'out-in'
  }
}
