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
            <div>
              <div class="blog__navigation-row" v-if="nextPost">
                <div class="blog__navigation-item">
                  <p class="blog__navigation-title">Up Next</p>
                  <a v-bind:href="'/blog/' + nextPost.slug" class="blog__navigation-link link" v-html="nextPost.title"></a>
                </div>
              </div>
            </div>
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

export default {
  head () {
    return {
      title: `${this.post.title} | Blog | Jangle`,
      meta: [
        { hid: 'description', name: 'description', content: this.post.excerpt }
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
  computed: {
    posts () {
      return this.$store.state.blogPosts
    },
    slug () {
      const path = this.$router.currentRoute.path
      const [ nothing, blog, slug ] = path.split('/')
      return slug
    },
    index () {
      return this.posts
        .map((post, index) => ({ post, index }))
        .filter(({ post = {} } = {}) => post.slug === this.slug)
        .map(({ index }) => index)[0]
    },
    post () {
      return this.posts[this.index]
    },
    previousPost () {
      return this.posts[this.index - 1]
    },
    nextPost () {
      return this.posts[this.index + 1]
    }
  }
}
</script>
