<template>
  <div class="docs docs__container container">
    <div class="docs__main">
      <section class="hero hero--medium hero--steel">
        <div class="hero__container container">
          <h1 class="hero__title">Docs</h1>
          <h3 class="hero__subtitle">here to help.</h3>
          <div class="hero__buttons button__row"></div>
        </div>
      </section>
      <SideNavigation class="docs__mobile-only" />
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

