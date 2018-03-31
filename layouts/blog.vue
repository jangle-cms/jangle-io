<template>
  <div class="layout">
    <Navigation class="layout__nav" />
    <div class="layout__page">

      <div class="page">
        <div class="hero hero--blog">
          <div class="container">
            <p>{{post.date}}</p>
            <h1 class="hero__title">{{ post.title }}</h1>
            <h2 class="hero__subtitle">{{ post.excerpt }}</h2>
          </div>
        </div>
        <div class="container">
          <div class="rich-text rich-text--legible">
            <nuxt class="layout__page-content" />
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  </div>
</template>

<script>
import SiteFooter from '@/components/SiteFooter.vue'
import Navigation from '@/components/Navigation.vue'

const getPost = ({ $store, $router }) => {
  const path = $router.currentRoute.path
  const [ nothing, blog, postSlug ] = path.split('/')

  return $store.state.blogPosts
    .filter(({ slug }) => slug === postSlug)[0] || {}
}

export default {
  head () {
    const post = getPost(this)
    return {
      title: `${post.title} | Blog | Jangle`,
      meta: [
        { hid: 'description', name: 'description', content: post.excerpt }
      ],
      base: {
        target: '_blank'
      }
    }
  },
  components: {
    Navigation,
    SiteFooter
  },
  data: () => ({
    post: {}
  }),
  mounted () {
    this.post = getPost(this)
  },
}
</script>
