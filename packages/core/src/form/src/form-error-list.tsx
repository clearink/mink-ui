import type { FormErrorListProps } from './form-error-list.props'

import { GroupTransition } from '../../_shared/components/transition/src'
import { cn } from '../../_shared/libs/cn'
import { defineName } from '../../_shared/utils/define-name'
import { isRenderable } from '../../_shared/utils/renderable'
import { useFormErrorListProps } from './hooks/use-form-error-list-props'

function FormErrorList(props: FormErrorListProps) {
  const { omitted, ns, explains } = useFormErrorListProps(props)

  const { className, style, help, itemId, onGroupExited } = omitted

  return (
    <div
      className={cn(ns, className)}
      style={style}
      id={itemId ? `${itemId}_help` : undefined}
      role="alert"
    >
      <GroupTransition
        classNames={`${ns}-motion`}
        appear={!isRenderable(help)}
        items={explains}
        onEnter={() => ({ height: 0 })}
        onEntering={el => ({ height: el.scrollHeight })}
        onExit={el => ({ height: el.getBoundingClientRect().height })}
        onExiting={() => ({ height: 0 })}
        onGroupExited={onGroupExited}
      >
        {($motion, getters, item) => (
          <div
            ref={$motion}
            className={cn(`${ns}--${item.status}`, getters.names)}
            style={getters.attrs()}
          >
            {item.value}
          </div>
        )}

      </GroupTransition>
    </div>
  )
}

defineName(FormErrorList, 'Form.ErrorList')

export default FormErrorList
