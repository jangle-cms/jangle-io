<template>
  <div class="docs">
      <section class="hero">
        <div class="hero__container hero__container--medium container">
          <h1 class="hero__title">Docs</h1>
          <h3 class="hero__subtitle">
            "It's not done until the docs are great."
          </h3>
          <div class="hero__buttons button__row">
            <nuxt-link class="button" to="/docs/core">Jangle Core</nuxt-link>
            <nuxt-link title="Coming soon!" class="button button--disabled" to="/docs/api">Jangle API</nuxt-link>
            <nuxt-link title="Coming soon!" class="button button--disabled" to="/docs/ui">Jangle UI</nuxt-link>
          </div>
        </div>
      </section>
    </div>
</template>

<script>

export default {
  head () {
    return {
      title: 'Docs | Jangle',
      meta: [
        { hid: 'description', name: 'description', content: `It's not done until the docs are great.` }
      ]
    }
  }
}
</script>

