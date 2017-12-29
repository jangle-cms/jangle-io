<template>
  <aside class="sidenav">
    <section class="sidenav__section"
      v-if="hasChildren(section)"
      v-bind:class="sectionClasses(section)"
      v-for="(section, i) in sections" v-bind:key="i">
      <h3 class="sidenav__header">
        <nuxt-link class="sidenav__header-link link" v-bind:to="url(section)" v-html="section.title"></nuxt-link>
      </h3>
      <p class="sidenav__list-heading">Methods</p>
      <ol class="sidenav__links">
        <li class="sidenav__link-item"
          v-for="(child, j) in section.methods" v-bind:key="j">
          <nuxt-link
            class="sidenav__link link" v-bind:to="url(section, child.toLowerCase())" v-html="child"></nuxt-link>
        </li>
      </ol>
      <p class="sidenav__list-heading">Types</p>
      <ol class="sidenav__links">
        <li class="sidenav__link-item"
          v-for="(child, j) in section.types" v-bind:key="j">
          <nuxt-link
            class="sidenav__link link" v-bind:to="url(section, child.toLowerCase())" v-html="child"></nuxt-link>
        </li>
      </ol>
    </section>
  </aside>
</template>

<script>
export default {
  computed: {
    sections () {
      return this.$store.state.docs
    },
    routeNeedsSidenav () {
      return this.$route.path.indexOf('/docs') > -1
    }
  },
  methods: {
    url (section, hash) {
      return `/docs/${section.path}` + (hash ? `#${hash}` : '')
    },
    hasChildren (section) {
      return section && section.methods && section.methods.length > 0
    },
    sectionClasses (section) {
      const isActiveSection = this.$route.params.section === section.path
      return {
        'sidenav__section--active': isActiveSection
      }
    }
  }
}
</script>
