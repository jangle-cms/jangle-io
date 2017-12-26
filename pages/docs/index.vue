<template>
  <div class="docs container">
    <SideNavigation />
    <div class="docs__content">
      <section class="hero">
        <div class="hero__container">
          <h1 class="hero__title">Docs</h1>
          <h3 class="hero__subtitle">here to help.</h3>
          <div class="hero__buttons button__row"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import SideNavigation from '@/components/SideNavigation'

export default {
  head: {
    title: 'Docs | Jangle'
  },
  components: {
    SideNavigation
  }
}
</script>

