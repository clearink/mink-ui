import { CssTransition } from '@mink-ui/core/_shared/components'
import { usePrefixCls } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName } from '@mink-ui/core/_shared/utils'

import type { ScrollNumberProps } from './props'

import { naturalList } from '../_shared.constant'
import useScrollNumber from './hooks/use-scroll-number'

function ScrollNumber(props: ScrollNumberProps) {
  const { char } = props

  const prefixCls = usePrefixCls('badge-scroll-number')

  const {
    returnEarly,
    refs,
    showChar,
    handleEnter,
    handleEntering,
    handleEntered,
  } = useScrollNumber(props)

  if (returnEarly) return null

  if (showChar) return <>{char}</>

  return (
    <CssTransition
      key={char}
      appear
      when
      timeouts={500}
      classNames={`${prefixCls}-motion`}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
    >
      <span ref={refs.$wrapper} className={prefixCls}>
        {naturalList.map(natural => (
          <span
            key={natural}
            ref={(el) => { refs.items.set(natural, el) }}
          >
            {natural}
          </span>
        ))}
      </span>
    </CssTransition>
  )
}

betterDisplayName(ScrollNumber)

export default ScrollNumber
