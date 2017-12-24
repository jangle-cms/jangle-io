import Vuex from 'vuex'
import docs from '@/static/docs/_manifest'

const contains = (words, query) =>
  words.toLowerCase().indexOf(query.toLowerCase()) > -1

const highlightMatch = (words, query) =>
  words.replace(new RegExp(`(${query})`, 'ig'), '<strong>$1</strong>')

const createStore = () => {
  return new Vuex.Store({
    state: {
      docs,
      searchQuery: ''
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
