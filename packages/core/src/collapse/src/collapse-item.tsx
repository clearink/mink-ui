import type { CollapseItemProps } from './collapse-item.props'

import { isFunction } from '@mink-ui/shared/is/is-function'
import { isNullish } from '@mink-ui/shared/is/is-nullish'

import { CssTransition } from '../../_shared/components/transition/src'
import { defineName } from '../../_shared/utils/define-name'
import { useCollapseItemProps } from './hooks/use-collapse-item-props'

function CollapseItem(props: CollapseItemProps) {
  const {
    omitted,
    ns,
    cssNames,
    cssAttrs,
    restAttrs,
    resolveCollapsibleProps,
  } = useCollapseItemProps(props)

  const {
    ref,
    children,
    title,
    extra,
    name,
    accordion,
    expanded,
    expandIcon,
    keepMounted,
  } = omitted

  const renderExpandIcon = () => {
    const iconNode = isFunction(expandIcon) ? expandIcon({ expanded, name }) : expandIcon

    return !isNullish(iconNode) && (
      <span
        className={cssNames.icon}
        style={cssAttrs.icon}
        {...resolveCollapsibleProps(['icon'])}
      >
        {iconNode}
      </span>
    )
  }

  return (
    <div {...restAttrs} ref={ref} className={cssNames.root} style={cssAttrs.root}>
      <div
        className={cssNames.header}
        style={cssAttrs.header}
        {...resolveCollapsibleProps(['header'])}
      >
        {renderExpandIcon()}

        <span
          className={cssNames.title}
          style={cssAttrs.title}
          {...resolveCollapsibleProps(['title'])}
        >
          {title}
        </span>

        {!isNullish(extra) && (
          <span className={cssNames.extra} style={cssAttrs.extra}>
            {extra}
          </span>
        )}
      </div>
      <CssTransition
        classNames={`${ns}-motion`}
        mountOnEnter={!keepMounted}
        unmountOnExit={!keepMounted}
        when={expanded}
        onEnter={() => ({ height: 0 })}
        onEntering={el => ({ height: el.scrollHeight })}
        onExit={el => ({ height: el.getBoundingClientRect().height })}
        onExiting={() => ({ height: 0 })}
      >
        {($motion, getters) => (
          <div ref={$motion} className={getters.names()} style={getters.attrs()}>
            <div
              className={cssNames.content}
              style={cssAttrs.content}
              role={accordion ? 'tabpanel' : undefined}
            >
              {children}
            </div>
          </div>
        )}
      </CssTransition>
    </div>
  )
}

defineName(CollapseItem, 'Collapse.Item')

export default CollapseItem
