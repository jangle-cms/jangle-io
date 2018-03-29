import Vuex from 'vuex'

const contains = (words, query) =>
  words.toLowerCase().indexOf(query.toLowerCase()) > -1

const highlightMatch = (words, query) =>
  words.replace(new RegExp(`(${query})`, 'ig'), '<strong>$1</strong>')

const createStore = () => {
  return new Vuex.Store({
    state: {
      docs: [
        {
          title: 'Jangle Core',
          path: 'core',
          methods: [
            'start',
            'startAsUser'
          ],
          types: [
            'Config',
            'UserConfig',
            'ProtectedJangleCore',
            'JangleCore'
            // 'LiveService',
            // 'MetaService',
            // 'Service',
            // 'ProtectedMetaService',
            // 'ProtectedService'
          ]
        }
      ],
      searchQuery: '',
      blogPosts: [
        {
          title: 'Handling Defaults',
          date: 'March 28th, 2018',
          tags: [ 'mongoose', 'architecture' ],
          excerpt: `Mongoose schema defaults are awesome! But how do I represent them in my database?`,
          slug: 'handling-defaults'
        },
        {
          title: 'Why Jangle?',
          date: 'March 19th, 2018',
          tags: [ 'design', 'architecture' ],
          excerpt: `Technology moves pretty fast, and it's kinda hard not to make something useless.`,
          slug: 'why-jangle'
        }
      ]
    },
    getters: {
      results (state) {
        return (state.searchQuery)
          ? {
            docs: state.docs
              .filter(doc => contains(doc.title, state.searchQuery))
              .map(({ title }) => ({
                title: highlightMatch(title, state.searchQuery)
              }))
              .sort((a, b) =>
                a.title.length < b.title.length ? -1
                : a.title.length > b.title.length ? 1
                : 0
              )
          }
          : { docs: [] }
      }
    },
    mutations: {
      updateSearchQuery (state, payload) {
        state.searchQuery = payload
      }
    }
  })
}

export default createStore
