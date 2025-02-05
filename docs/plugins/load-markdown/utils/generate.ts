import type { FormattedSection } from '../interface'

export function generateSourceCode(sections: FormattedSection[]) {
  return `import Section from '@shared/components/section'
import MarkdownBlock from '@shared/components/markdown-block'
import SemanticBlock from '@shared/components/semantic-block'
import { CodeBlockList } from '@features/components'

${sections.map(_ => _.imports || '').join('\n')}

export default function ComponentExample() {
  return (
    <div className="source-container">
    ${sections.reduce((result, _) => `${result}
        <Section title={${JSON.stringify(_.title)}}>
          ${_.code}
        </Section>`, '')}
    </div>
  )
}
`
}
