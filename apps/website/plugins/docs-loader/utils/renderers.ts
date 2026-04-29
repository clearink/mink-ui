import type { Tokens } from 'marked'
import type { SourceSection } from '../interface.ts'

export function renderCodeExample(token: Tokens.Generic): SourceSection {
  return {
    deps: [`import CodeExample from '@/_shared/components/code-example'`],
    imports: token.imports,
    code: token.render(),
  }
}
export function renderSemanticDom(token: Tokens.Generic): SourceSection {
  return {
    deps: [`import SemanticDom from '@/_shared/components/semantic-dom'`],
    imports: token.imports,
    code: token.render(),
  }
}

export function renderPropsTable(token: Tokens.Generic): SourceSection {
  return {
    deps: [`import PropsTable from '@/_shared/components/props-table'`],
    imports: token.imports,
    code: token.render(),
  }
}

export function renderMarkdown(token: Tokens.Generic): SourceSection {
  return {
    deps: [`import MarkdownBlock from '@/_shared/components/markdown-block'`],
    imports: [],
    code: `<MarkdownBlock rawText={${JSON.stringify(token.raw)}} />`,
  }
}
