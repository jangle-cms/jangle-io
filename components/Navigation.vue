<template>
  <section class="nav">
    <div class="nav__container container">
      <header class="nav__header">
        <div class="nav__brand">
          <nuxt-link to="/" class="nav__brand-link">
            <i class="nav__brand-icon"></i>
            <span class="nav__brand-text">Jangle</span>
          </nuxt-link>
        </div>
        <div class="nav__spacer"></div>
        <div class="nav__links">
          <nuxt-link class="nav__link link" v-for="(link, index) in links" v-bind:key="index" v-bind:to="link.url" v-html="link.label"></nuxt-link>
        </div>
        <div class="nav__search search">
          <form class="search__wrapper" v-bind:class="searchWrapperClasses" v-on:submit.prevent="onSubmit">
            <input v-model="search.query" ref="input" class="search__input" type="search" placeholder="search" aria-label="Search" v-on:blur="onSearchBlur" v-on:focus="onSearchFocus" />
            <button class="search__button" aria-label="Search" v-on:click="onSearchClick" v-on:blur="onSearchBlur" v-on:focus="onSearchFocus">
              <i class="icon ion-search"></i>
            </button>
          </form>
        </div>
      </header>
      <div class="nav__side">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    links: [
      { url: '/learn', label: 'learn' },
      { url: '/docs', label: 'docs' }
    ],
    search: {
      query: '',
      inputFocused: false,
      expanded: false
    }
  }),
  computed: {
    searchWrapperClasses () {
      return {
        'search__wrapper--expanded': this.search.expanded
      }
    }
  },
  watch: {
    'search.query' (newValue) {
      this.$store.commit('updateSearchQuery', newValue)
    }
  },
  methods: {
    onSearchClick () {
      if (!this.search.expanded) {
        this.search.expanded = true
        setTimeout(() => this.$refs.input.focus())
      }
    },
    onSubmit () {
      if (this.search.expanded && this.search.query) {
        console.log('Search for: ', this.search.query)
      }
    },
    onSearchBlur () {
      this.search.focused = false
      setTimeout(() => {
        if (this.search.focused === false) {
          this.search.expanded = this.search.query.length > 0
        }
      }, 0)
    },
    onSearchFocus () {
      this.search.focused = true
    }
  }
}
</script>
