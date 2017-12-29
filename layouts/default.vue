<template>
  <div class="layout">
    <Navigation class="layout__nav" />
    <div class="layout__page">
      <nuxt class="layout__page-content" />
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
    routeNeedsSidenav () {
      return this.$route.path.indexOf('/docs') > -1
    }
  }
}
</script>
