import { marked as _marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import Prism from 'prismjs'

import 'prismjs/components/prism-powershell'
import 'prismjs/components/prism-typescript'

// rename
Prism.languages.tsx = Prism.languages.typescript

Prism.languages.shell = Prism.languages.powershell

const marked = _marked.use(
  markedHighlight({
    langPrefix: 'prism-code language-',
    highlight(code, lang) {
      const grammar = Prism.languages[lang] || Prism.languages.plaintext

      const language = Prism.languages[lang] ? lang : 'txt'

      return Prism.highlight(code, grammar, language)
    },
  }),
)

export default marked
