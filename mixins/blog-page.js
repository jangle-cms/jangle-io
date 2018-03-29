
import highlightjs from 'highlight.js'

export default {
  mounted () {
    document.querySelectorAll('pre code').forEach(block => highlightjs.highlightBlock(block))
  }
}
