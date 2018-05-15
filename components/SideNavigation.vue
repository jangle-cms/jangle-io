<template>
  <aside class="sidenav">
    <section class="sidenav__section"
      v-if="hasChildren(doc)">
      <h3 class="sidenav__header">
        <nuxt-link class="sidenav__header-link link" v-bind:to="url(path)" v-html="doc.title"></nuxt-link>
      </h3>
      <div class="sidenav__section"
        v-for="(section, name, i) in doc.sections"
        v-bind:key="i"
        v-bind:class="sectionClasses(section)"
        >
        <p class="sidenav__list-heading">{{ name }}</p>
        <ol class="sidenav__links">
          <li class="sidenav__link-item"
            v-for="(child, j) in section" v-bind:key="j">
            <nuxt-link class="sidenav__link link" v-bind:to="url(path, child.toLowerCase())" v-html="child"></nuxt-link>
          </li>
        </ol>
      </div>
    </section>
  </aside>
</template>

<script>
export default {
  props: [ 'path', 'doc' ],
  methods: {
    url (path, hash) {
      return `/docs/${path}` + (hash ? `#${hash}` : '')
    },
    hasChildren (doc) {
      return doc.sections && Object.keys(doc.sections).some(name => doc.sections[name].length > 0)
    },
    sectionClasses (sections) {
      const hasActiveSection = sections.some(section => this.$route.hash === '#' + section.toLowerCase())
      return {
        'sidenav__section--active': hasActiveSection
      }
    }
  }
}
</script>
