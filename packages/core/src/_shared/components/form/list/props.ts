import type { ExternalNamePath, InternalFieldMeta } from '../_shared.props'
import type { ExternalFormFieldProps } from '../field/props'
import type { FormListHelpers, InternalListField } from './control/props'

export interface InternalFormListProps extends Pick<ExternalFormFieldProps, 'rule'> {
  children: (
    fields: InternalListField[],
    helpers: FormListHelpers,
    meta: InternalFieldMeta,
  ) => React.ReactNode
  /**
   * @zh-CN 设置子元素默认值，如果与 Form 的 initialValues 冲突则以 Form 为准
   */
  initialValue?: any[]

  name: ExternalNamePath

  /**
  /* @private
   * @zh-CN 嵌套 List 表单时标识
   */
  refreshField?: () => void

}
