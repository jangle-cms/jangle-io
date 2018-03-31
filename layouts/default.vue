<template>
  <div class="layout">
    <Navigation class="layout__nav" />
    <div class="layout__page">
      <nuxt class="layout__page-content page" />
      <SiteFooter />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import SideNavigation from '@/components/SideNavigation.vue'
import SiteFooter from '@/components/SiteFooter'

export default {
  components: {
    Navigation,
    SideNavigation,
    SiteFooter
  },
  computed: {
    routeNeedsSidenav () {
      return this.$route.path.indexOf('/docs') > -1
    }
  }
}
</script>
