<template>
  <div class="docs docs__container container">
    <div class="docs__main docs__content rich-text">
      <h1 class="docs__title" v-html="meta.title"></h1>
      <div v-if="markdown" v-html="$md.render(markdown)"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import highlightjs from 'highlight.js'
import SideNavigation from '@/components/SideNavigation'

export default {
  head: {
    title: 'Docs | Jangle'
  },
  data: () => ({
    path: undefined,
    markdown: undefined
  }),
  components: {
    SideNavigation
  },
  computed: {
    meta () {
      const path = {
        folder: this.$route.params.section,
        file: this.$route.params.slug
      }
      const section = this.$store.state.docs
        .filter(({ file }) => file === path.folder)[0]
      const meta = section && section.children.length > 0
        ? section.children
            .filter(({ file }) => file === path.file)[0]
        : undefined
      return meta
    }
  },
  beforeCreate () {
    const path = {
      folder: this.$route.params.section,
      file: this.$route.params.slug
    }
    axios.get(`/docs/${path.folder}/${path.file}.md`)
      .then(({ data }) => {
        this.markdown = data
        setTimeout(() => document.querySelectorAll('pre code').forEach(block => highlightjs.highlightBlock(block)), 0)
      })
  }
}
</script>

