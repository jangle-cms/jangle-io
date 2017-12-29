<template>
  <div class="layout">
    <Navigation class="layout__nav" />
    <div class="layout__page">
      <div class="sidenav__container sidenav__container--visible">
        <SideNavigation class="sidenav--fixed" />
      </div>
      <div class="docs docs__container container" style="z-index: 1;">
        <div class="docs__main docs__content rich-text">
          <h1 v-html="title"></h1>
          <br>
          <hr>
        </div>
        <div class="docs__main docs__content rich-text" style="margin-top: -4rem;">
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
    title () {
      return this.$store.state.docs
        .filter(doc => this.$route.path.indexOf(`/docs/${doc.path}`) === 0)
        .map(doc => doc.title)[0]
    },
    routeNeedsSidenav () {
      return this.$route.path.indexOf('/docs') > -1
    }
  }
}
</script>
