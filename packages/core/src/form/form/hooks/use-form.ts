import type { FormInstance } from '../props'

import { Form as InternalForm } from '../../../_shared/components'

// form 示例, TODO: 还需要额外实现 scrollToField
export default function useForm<S = any>(form?: FormInstance<S>) {
  const internalForm = InternalForm.useForm<S>(form)

  return internalForm as FormInstance<S>
  // return useMemo<FormInstance<S>>(() => {
  //   return (
  //     form ?? {
  //       ...internalForm,
  //       scrollToField: (name: NamePath) => {
  //         console.log(name)
  //       },
  //     }
  //   )
  // }, [internalForm, form])
}
/** ==================================================== */
/** Features                                             */
/** ==================================================== */

// // TODO: 不属于该处的功能. 因为有可能没有dom
// // 滚动到对应位置
// scrollToField = (namePath: NamePath = []) => {
//   const id = _getId(namePath)

//   if (!id) return

//   const control = this.$controls.getControls().find(({ _id }) => _id === id)

//   const formName = this.$props.props.name
//   const fieldId = control?._getId(formName)
//   /**
//    *   public _getId = (parentName?: string) => {
//   return [parentName, ...this._name].filter((item) => item !== undefined).join('_')
// }
//    */

//   if (fieldId === undefined) return

//   const dom = document.querySelector(`#${fieldId}`)

//   dom?.scrollIntoView({ behavior: 'smooth' })
// }
