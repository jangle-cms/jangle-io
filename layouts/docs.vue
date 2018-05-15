<template>
  <div class="layout">
    <Navigation class="layout__nav" />
    <div class="layout__page">
      <div class="sidenav__container sidenav__container--visible">
        <SideNavigation v-bind:path="path" v-bind:doc="doc" class="sidenav--fixed" />
      </div>
      <div class="docs docs__container container" style="z-index: 1;">
        <div class="docs__main docs__content rich-text">
          <h1 v-html="doc.title"></h1>
          <br>
          <hr>
        </div>
        <div class="docs__main docs__content docs__body rich-text">
          <nuxt class="layout__page-content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import SideNavigation from '@/components/SideNavigation.vue'

export default {
  components: {
    Navigation,
    SideNavigation
  },
  computed: {
    docs () {
      return this.$store.state.docs
    },
    path () {
      return this.$route.path.substring('/docs/'.length)
    },
    doc () {
      return this.docs[this.path]
    }
  }
}
</script>
