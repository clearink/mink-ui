// 内部使用
import type { ExternalNamePath, MetaChangeEvent } from '../_shared/components'

export type NamePath = ExternalNamePath

export type { MetaChangeEvent }

export type FormLabelAlign = 'left' | 'right'

export type ValidateStatus = '' | 'error' | 'success' | 'validating' | 'warning'

export type RequiredMark = 'optional' | boolean

export type FormLayout = 'horizontal' | 'inline' | 'vertical'
