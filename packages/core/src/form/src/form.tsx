import type { FormProps } from './form.props'

import InternalForm from '../../_shared/components/form/src'
import { defineName } from '../../_shared/utils/define-name'
import { DisabledContext, SizeContext } from '../../config-provider/src/_shared.context'
import { FormInstanceContext, FormPropsContext } from './_shared.context'
import { FormStatusProvider } from './form-status-provider'
import { useFormProps } from './hooks/use-form-props'

function Form<S = any>(props: FormProps<S>) {
  const {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    restAttrs,
    formInstance,
    propsContextValue,
    validateMessages,
    handleOnFailed,
  } = useFormProps(props)

  const { disabled, size } = picked
  const { name } = omitted

  return (
    <DisabledContext value={disabled}>
      <SizeContext value={size}>
        <FormInstanceContext value={formInstance}>
          <FormPropsContext value={propsContextValue}>
            <InternalForm.FormShared validateMessages={validateMessages}>

              {/* TODO: 避免 Form 嵌套使用时 pure 模式下 Form.Item 组件的问题 */}
              <FormStatusProvider>

                <InternalForm<S>
                  id={name}
                  {...restAttrs}
                  // ref={$element}
                  className={cssNames.root}
                  style={cssAttrs.root}
                  form={formInstance}
                  onFailed={handleOnFailed}
                />

              </FormStatusProvider>
            </InternalForm.FormShared>
          </FormPropsContext>
        </FormInstanceContext>
      </SizeContext>
    </DisabledContext>
  )
}

defineName(Form)

export default Form
