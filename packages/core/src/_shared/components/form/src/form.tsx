import type { InternalFormProps } from './form.props'

import { isFunction } from '@mink-ui/shared/is/is-function'
import { isNullish } from '@mink-ui/shared/is/is-nullish'

import { defineName } from '../../../utils/define-name'
import {
  InternalFormInstanceContext,
  InternalFormListContext,
  InternalFormPropsContext,
} from './_shared.context'
import InternalFormScheduler from './form-scheduler'
import { useInternalFormProps } from './hooks/use-form-props'

function InternalForm<S = any>(props: InternalFormProps<S>) {
  const {
    picked,
    omitted,
    $element,
    formInstance,
    internalHooks,
    propsContextValue,
    restAttrs,
    handleOnReset,
    handleOnSubmit,
  } = useInternalFormProps(props)

  const { component: JsxTag } = picked
  const { children } = omitted

  const element = (
    /* Form.List 嵌套时清除影响 */
    <InternalFormListContext value={null}>
      {/* 提供 FormInstance 实例 */}
      <InternalFormInstanceContext value={formInstance}>
        {/* 透传给 Field 某些属性 */}
        <InternalFormPropsContext value={propsContextValue}>
          {/* 批量调度器 */}
          <InternalFormScheduler ref={internalHooks.registerScheduler} />
          {/* 渲染子元素 */}
          {isFunction(children) ? children(formInstance.getFieldsValue(true), formInstance) : children}
        </InternalFormPropsContext>
      </InternalFormInstanceContext>
    </InternalFormListContext>
  )

  if (isNullish(JsxTag)) return element

  return (
    <JsxTag
      {...restAttrs()}
      ref={$element}
      onReset={handleOnReset}
      onSubmit={handleOnSubmit}
    >
      {element}
    </JsxTag>
  )
}

defineName(InternalForm)

export default InternalForm
