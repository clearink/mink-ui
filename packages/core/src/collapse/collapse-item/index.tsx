import type { ForwardedRef } from 'react'

import { CssTransition } from '@mink-ui/core/_shared/components'
import { keyboard, semanticNames } from '@mink-ui/core/_shared/constants'
import { usePrefixCls, useSemanticStyles } from '@mink-ui/core/_shared/hooks'
import { betterDisplayName, withDefaults } from '@mink-ui/core/_shared/utils'
import CaretRightOutlined from '@mink-ui/icons/lib/icons/CaretRightOutlined'
import { isFunction, isNullish, omit, pick } from '@mink-ui/shared'
import { forwardRef } from 'react'

import type { CollapsibleType } from '../collapse/props'
import type { CollapseItemProps } from './props'

import { CollapseContext } from '../_shared.context'
import useFormatClassNames from './hooks/use-format-class-names'
import { defaultCollapseItemProps } from './props'
import handlers from './utils/transition-handlers'

const excluded = [
  'name',
  'title',
  'extra',
  'disabled',
  'showExpandIcon',
  'keepMounted',
  'unmountOnExit',
  'expandIcon',
  // 子元素
  'children',
  // 样式
  ...semanticNames,
] as const

function CollapseItem(_props: CollapseItemProps, ref: ForwardedRef<HTMLDivElement>) {
  const ctx = CollapseContext.useState()

  const props = withDefaults(
    { ..._props, disabled: _props.disabled || ctx.disabled },
    pick(ctx, ['expandIcon', 'keepMounted', 'unmountOnExit']),
    { ...defaultCollapseItemProps, expandIcon: <CaretRightOutlined /> },
  )

  const { disabled, expandIcon, extra, name, showExpandIcon, title } = props

  const prefixCls = usePrefixCls('collapse-item')

  const expanded = ctx.expandedNames.includes(name)

  const classNames = useFormatClassNames(prefixCls, props, { ctx, expanded })

  const styles = useSemanticStyles(props)

  const getItemClickHandler = (type: CollapsibleType) => {
    if (disabled || ctx.collapsible !== type) return undefined

    return () => { ctx.onItemClick(name) }
  }

  const handleHeaderEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === keyboard.enter) ctx.onItemClick(name)
  }

  const attrs = omit(props, excluded)

  return (
    <div {...attrs} ref={ref} className={classNames.root} style={styles.root}>
      <div
        className={classNames.header}
        style={styles.header}
        aria-disabled={!!disabled}
        aria-expanded={!!expanded}
        role={ctx.accordion ? 'tab' : 'button'}
        tabIndex={0}
        onClick={getItemClickHandler('header')}
        onKeyDown={handleHeaderEnter}
      >
        {!!showExpandIcon && (
          <span
            className={classNames.icon}
            style={styles.icon}
            onClick={getItemClickHandler('icon')}
          >
            {isFunction(expandIcon) ? expandIcon({ expanded, name }) : expandIcon}
          </span>
        )}
        <span
          className={classNames.title}
          style={styles.title}
          onClick={getItemClickHandler('title')}
        >
          {title}
        </span>
        {!isNullish(extra) && (
          <span className={classNames.extra} style={styles.extra}>
            {extra}
          </span>
        )}
      </div>
      <CssTransition
        mountOnEnter={!props.keepMounted}
        classNames={`${prefixCls}-motion`}
        unmountOnExit={!props.keepMounted && props.unmountOnExit}
        when={expanded}
        {...handlers}
      >
        <div role={ctx.accordion ? 'tabpanel' : undefined}>
          <div className={classNames.content} style={styles.content}>
            {props.children}
          </div>
        </div>
      </CssTransition>
    </div>
  )
}

betterDisplayName(CollapseItem, 'Collapse.Item')

export default forwardRef(CollapseItem)
