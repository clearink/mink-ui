import type { FormErrorListProps } from './props'

import { GroupTransition } from '../../_shared/components'
import { usePrefixCls } from '../../_shared/hooks'
import { cls } from '../../_shared/utils'
import useFormatExplains from './hooks/use-format-explains'
import handlers from './utils/transition-handlers'

export default function FormErrorList(props: FormErrorListProps) {
  const { className, onFinished } = props

  const prefixCls = usePrefixCls('form-item-message')

  const explains = useFormatExplains(props)

  return (
    <div className={cls(prefixCls, className)}>
      <GroupTransition
        appear
        classNames={`${prefixCls}-motion`}
        {...handlers}
        onFinished={onFinished}
      >
        {explains.map(item => (
          <div key={item.key} className={`${prefixCls}--${item.status}`}>
            {item.value}
          </div>
        ))}
      </GroupTransition>
    </div>
  )
}
