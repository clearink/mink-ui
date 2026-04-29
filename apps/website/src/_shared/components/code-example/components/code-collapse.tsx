import { CssTransition } from '@mink-ui/core/_shared/components/transition/src'

import MarkedBlock from '@/_shared/components/markdown-block'

import styles from './code-collapse.module.scss'

export default function CodeCollapse(props: CodeCollapseProps) {
  const { isOpen, rawText } = props

  return (
    <CssTransition
      classNames="x-collapse"
      unmountOnExit
      when={isOpen}
      onEnter={() => ({ height: 0 })}
      onEntering={el => ({ height: el.scrollHeight })}
      onExit={el => ({ height: el.getBoundingClientRect().height })}
      onExiting={() => ({ height: 0 })}
    >
      {($motion, getters) => (
        <div ref={$motion} className={getters.names()} style={getters.attrs()}>
          <MarkedBlock className={styles.code_collapse__content} rawText={rawText} />
        </div>
      )}
    </CssTransition>

  )
}

export interface CodeCollapseProps {
  rawText: string
  isOpen: boolean
}
