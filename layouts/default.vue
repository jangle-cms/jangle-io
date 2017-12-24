<template>
  <div class="layout">
    <Navigation class="layout__nav" />
    <div class="layout__page">
      <header class="layout__header"></header>
      <nuxt class="layout__page-content" />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
  components: {
    Navigation
  }
}
</script>
