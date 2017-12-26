<template>
  <div class="layout">
    <Navigation class="layout__nav" />
    <div class="layout__page">
      <div class="sidenav__container container">
        <SideNavigation class="sidenav--fixed" />
      </div>
      <nuxt class="layout__page-content" />
    </div>
    <!-- <footer class="footer">
      <div class="footer__copyright">
        Made with love, from <a href="https://www.github.com/ryannhg">@ryannhg</a>
      </div>
    </footer> -->
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import SideNavigation from '@/components/SideNavigation.vue'
export default {
  components: {
    Navigation,
    SideNavigation
  }
}
</script>
