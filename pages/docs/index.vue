<template>
  <div class="docs">
      <section class="hero">
        <div class="hero__container hero__container--medium container">
          <h1 class="hero__title">Docs</h1>
          <h3 class="hero__subtitle">
            <p>"It's not done until the documentation is great."</p>
          </h3>
          <div class="hero__buttons">
            <nuxt-link class="button button--blue" to="/docs/core">Jangle Core</nuxt-link>
          </div>
        </div>
      </section>
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

