<template>
  <div class="page">
  
    <!-- Hero -->
    <div class="hero">
      <div class="container">
        <h1 class="hero__title">Blog</h1>
        <h2 class="hero__subtitle">"Understand the problem. Explore all solutions. Pick one."</h2>
      </div>
    </div>

    <!-- Latest Posts -->
    <section class="section">
      <div class="section__container container">
        <h3 class="section__title">Latest Blog Posts</h3>
        <ul class="section__listings listings">
          <li v-for="post in posts" v-bind:key="post.slug" 
            class="listings__item">
            <p class="listings__subtitle">{{post.date}}</p>
            <nuxt-link v-bind:to="url(post)">
              <h4 class="listings__title link">{{post.title}}</h4>
            </nuxt-link>
            <p class="listings__excerpt">{{post.excerpt}}</p>
            <ul class="listings__tags">
              <li v-for="tag in post.tags" v-bind:key="tag"
                class="listings__tag">{{tag}}</li>
            </ul>
            <!-- <div class="listings__buttons button__row">
              <nuxt-link class="button" v-bind:to="url(post)">Read more</nuxt-link>
            </div> -->
          </li>
        </ul>
      </div>
    </section>
  
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Blog | Jangle',
      meta: [
        { hid: 'description', name: 'description', content: 'Explore all possible solutions. Pick one.' }
      ]
    }
  },
  data: () => ({
    page: 1,
    pageSize: 6
  }),
  computed: {
    posts () {
      return this.$store.state.blogPosts.slice(0, this.page * this.pageSize)
    }
  },
  methods: {
    url ({ slug }) {
      return `/blog/${slug}`
    }
  }
}
</script>
