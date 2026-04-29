import type { FormErrorListProps } from './form-error-list.props'

import { isNullish } from '@mink-ui/shared/is/is-nullish'

import { GroupTransition } from '../../_shared/components/transition/src'
import { cn } from '../../_shared/libs/cn'
import { defineName } from '../../_shared/utils/define-name'
import { useFormErrorListProps } from './hooks/use-form-error-list-props'

function FormErrorList(props: FormErrorListProps) {
  const { omitted, ns, explains } = useFormErrorListProps(props)

  const { className, style, help, itemId, onFinished } = omitted

  return (
    <div
      className={cn(ns, className)}
      style={style}
      id={itemId ? `${itemId}_help` : undefined}
      role="alert"
    >
      <GroupTransition
        classNames={`${ns}-motion`}
        appear={isNullish(help)}
        onEnter={() => ({ height: 0 })}
        onEntering={el => ({ height: el.scrollHeight })}
        onExit={el => ({ height: el.getBoundingClientRect().height })}
        onExiting={() => ({ height: 0 })}
        onFinished={onFinished}
      >
        {explains.map(item => (
          <div key={item.key} className={`${ns}--${item.status}`}>
            {item.value}
          </div>
        ))}
      </GroupTransition>
    </div>
  )
}

defineName(FormErrorList, 'Form.ErrorList')

export default FormErrorList
