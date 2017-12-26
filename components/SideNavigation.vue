<template>
  <aside class="sidenav">
    <section class="sidenav__section"
      v-if="hasChildren(section)"
      v-bind:class="sectionClasses(section)"
      v-for="(section, i) in sections" v-bind:key="i">
      <h3 class="sidenav__header" v-html="section.title"></h3>
      <ol class="sidenav__links">
        <li class="sidenav__link-item"
          v-for="(child, j) in section.children" v-bind:key="j">
          <nuxt-link
            class="sidenav__link link" v-bind:to="url([ section, child ])" v-html="child.title"></nuxt-link>
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
    }
  },
  methods: {
    url (sections) {
      return `/docs/${sections.map(section => section.file).join('/')}`
    },
    hasChildren (section) {
      return section && section.children && section.children.length > 0
    },
    sectionClasses (section) {
      const isActiveSection = this.$route.params.section === section.file
      return {
        'sidenav__section--active': isActiveSection
      }
    }
  }
}
</script>
