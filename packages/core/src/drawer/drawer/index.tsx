import { FocusTrap, Overlay } from '@mink-ui/core/_shared/components'
import { usePrefixCls, useSemanticStyles } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, withDefaults } from '@mink-ui/core/_shared/utils'
import Button from '@mink-ui/core/button'
import { fallback, isNullish, pick } from '@mink-ui/shared'
import { useId } from 'react'

import type { DrawerProps } from './props'

import useFormatClassNames from './hooks/use-format-class-names'
import { defaultDrawerProps } from './props'

const included = [
  'getContainer',
  'mask',
  'isOpen',
  'transitions',
  'keepMounted',
  'unmountOnExit',
] as const

function Drawer(_props: DrawerProps) {
  const props = withDefaults(_props, defaultDrawerProps)

  const { children, footer, isOpen, title, onIsOpenChange, transitions = {} } = props

  const ariaId = useId()

  const prefix = usePrefixCls()

  const prefixCls = `${prefix}-drawer`

  const classNames = useFormatClassNames(prefixCls, props)

  const styles = useSemanticStyles(props)

  // const onEscapeDown = !props.closeOnEscape
  //   ? undefined
  //   : (e: React.KeyboardEvent<HTMLDivElement>) => {
  //       if (e.key === Keyboard.esc) return

  //       onIsOpenChange?.(!isOpen)
  //     }

  return (
    <Overlay
      {...pick(props, included)}
      classNames={{
        mask: `${prefixCls}-mask`,
      }}
      transitions={{
        content: fallback(transitions.content, `${prefix}-slide-bottom`),
        mask: fallback(transitions.mask, `${prefix}-fade-in`),
      }}
    >
      <div
        className={classNames.root}
        style={styles.root}
        aria-labelledby={title ? ariaId : undefined}
        aria-modal="true"
        role="dialog"
      >
        <FocusTrap active={isOpen}>
          <div className={classNames.main} style={styles.main}>
            <button
              className={classNames.close}
              style={styles.close}
              aria-label="close"
              type="button"
              onClick={() => onIsOpenChange?.(!isOpen)}
            >
              X
            </button>
            <div className={classNames.header} style={styles.header}>
              {!isNullish(title) && (
                <span className={`${prefixCls}__title`} id={ariaId}>
                  {title}
                </span>
              )}
            </div>
            <div className={classNames.body} style={styles.body}>
              {children}
            </div>
            {!isNullish(footer) && (
              <div className={classNames.footer} style={styles.footer}>
                <Button>取消</Button>
                <Button variant="filled">确定</Button>
              </div>
            )}
          </div>
        </FocusTrap>
      </div>
    </Overlay>
  )
}

betterDisplayName(Drawer)

export default Drawer
