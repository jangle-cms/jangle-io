import Vuex from 'vuex'

const contains = (words, query) =>
  words.toLowerCase().indexOf(query.toLowerCase()) > -1

const highlightMatch = (words, query) =>
  words.replace(new RegExp(`(${query})`, 'ig'), '<strong>$1</strong>')

const createStore = () => {
  return new Vuex.Store({
    state: {
      docs: {
        'core': {
          title: 'Jangle Core',
          sections: {
            'Start Methods': [
              'start',
              'startAsUser'
            ],
            'Configuration': [
              'Config',
              'UserConfig'
            ],
            'Return Values': [
              'ProtectedJangleCore',
              'JangleCore'
            ],
            'List Service': [
              'ListService',
              'ProtectedListService',
              'AnyFunction',
              'CountFunction',
              'FindFunction',
              'GetFunction',
              'CreateFunction',
              'UpdateFunction',
              'PatchFunction',
              'RemoveFunction',
              'IsLiveFunction',
              'PublishFunction',
              'UnpublishFunction',
              'HistoryFunction',
              'PreviewRollbackFunction',
              'RollbackFunction',
              'SchemaFunction',
              'LiveService'
            ],
            'Item Service': [
              'ItemService',
              'ProtectedItemService',
              'ItemGetFunction',
              'ItemUpdateFunction',
              'ItemPatchFunction',
              'ItemIsLiveFunction',
              'ItemPublishFunction',
              'ItemUnpublishFunction',
              'ItemHistoryFunctio',
              'ItemPreviewRollbackFunction',
              'ItemRollbackFunction',
              'SchemaFunction',
              'ItemLiveService'
            ]
          }
        }
      },
      searchQuery: '',
      blogPosts: [
        {
          title: 'Providing Defaults',
          date: 'March 28th, 2018',
          tags: [ 'mongoose', 'architecture' ],
          excerpt: `Mongoose schema defaults are awesome! But how do they work in Jangle?`,
          slug: 'providing-defaults'
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
