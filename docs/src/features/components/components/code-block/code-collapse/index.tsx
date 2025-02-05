import { CssTransition } from '@mink-ui/core/_shared/components'
import MarkedBlock from '@shared/components/markdown-block'

import styles from './style.module.scss'

export interface CodeCollapseProps {
  rawText: string
  isOpen: boolean
}

export default function CodeCollapse(props: CodeCollapseProps) {
  const { isOpen, rawText } = props
  return (
    <CssTransition
      when={isOpen}
      classNames="code-collapse-motion"
      onEnter={(el) => { el.style.setProperty('height', '0px') }}
      onEntering={(el) => { el.style.setProperty('height', `${el.scrollHeight}px`) }}
      onEntered={(el) => { el.style.removeProperty('height') }}
      onEnterCancel={(el) => { el.style.setProperty('height', `${el.offsetHeight}px`) }}
      onExit={(el) => { el.style.setProperty('height', `${el.offsetHeight}px`) }}
      onExiting={(el) => { el.style.setProperty('height', '0px') }}
      onExited={(el) => { el.style.removeProperty('height') }}
      onExitCancel={(el) => { el.style.setProperty('height', `${el.offsetHeight}px`) }}
    >
      <div>
        <MarkedBlock rawText={rawText} className={styles.code_collapse__content} />
      </div>
    </CssTransition>
  )
}
