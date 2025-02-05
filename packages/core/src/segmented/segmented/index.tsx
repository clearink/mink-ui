import type { ForwardedRef } from 'react'

import { CssTransition } from '@mink-ui/core/_shared/components'
import { useDeepMemo, usePrefixCls, useSemanticStyles } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, withDefaults } from '@mink-ui/core/_shared/utils'
import { SizeContext } from '@mink-ui/core/config-provider/_shared.context'
import { forwardRef, useEffect } from 'react'

import type { SegmentedProps } from './props'

import SegmentedItem from '../segmented-item'
import useFormatClassNames from './hooks/use-format-class-names'
import useSegmented from './hooks/use-segmented'
import useSegmentedValue from './hooks/use-segmented-value'
import { defaultSegmentedProps } from './props'
import normalizeOptions from './utils/normalize-options'

function Segmented(_props: SegmentedProps, _ref: ForwardedRef<HTMLDivElement>) {
  const props = withDefaults(_props, {
    ...defaultSegmentedProps,
    size: SizeContext.useState(),
  })

  const { disabled, options: _options } = props

  const prefixCls = usePrefixCls('segmented')

  const classNames = useFormatClassNames(prefixCls, props)

  const styles = useSemanticStyles(props)

  const options = useDeepMemo(() => normalizeOptions(_options), [_options])

  const [active, onChange] = useSegmentedValue(props, options)

  const { returnEarly, refs, showThumb, handleEnter, handleEntering, handleEntered } = useSegmented(active)

  // fix react strict mode
  useEffect(() => () => { refs.reset() }, [refs])

  if (returnEarly) return null

  return (
    <div ref={_ref} className={classNames.root} style={styles.root}>
      <div ref={refs.$group} className={classNames.group} style={styles.group}>
        {/* TODO: 舍弃该实现方式,采用 shardLayout方式实现 */}
        {showThumb && (
          <CssTransition
            appear
            when
            timeouts={3000}
            classNames={`${prefixCls}-thumb-motion`}
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={handleEntered}
          >
            <div ref={refs.$thumb} className={classNames.thumb} style={styles.thumb} />
          </CssTransition>
        )}
        {options.map(item => (
          <SegmentedItem
            {...item}
            key={item.value}
            ref={(el) => {
              if (el) refs.items.set(item.value, el)
              else refs.items.delete(item.value)
            }}
            checked={active === item.value}
            disabled={disabled || item.disabled}
            showThumb={showThumb}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  )
}

betterDisplayName(Segmented)

export default forwardRef(Segmented) as <T>(
  props: React.RefAttributes<HTMLDivElement> & SegmentedProps<T>,
) => JSX.Element
