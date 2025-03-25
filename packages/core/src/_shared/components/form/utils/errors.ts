import { toArray } from '@mink-ui/shared'

import type { InternalFormValidateErrorInfo, InternalNamePath, RuleIssue } from '../_shared.props'

// 单个字段校验错误
export class FieldValidateError extends Error {
  errors: string[]

  warnings: string[] = []

  path: InternalNamePath

  constructor(result: { issues?: RuleIssue[] }, options: { path: InternalNamePath }) {
    super(`mink-ui 'Field' validation error. has 'errors', 'warnings', 'path' property`)

    const issues = toArray(result?.issues)

    this.path = options.path

    this.errors = issues.length === 0
      ? [`validation error on field '${options.path.join('.')}'`]
      : issues.map(issue => issue.message)

    if (issues.length === 0) console.error(result)
  }
}

// 多个字段校验错误
export class FieldsValidateError extends Error {
  errors: FieldValidateError[]

  constructor(errors: FieldValidateError[]) {
    super(`mink-ui 'form.validateFields' method failed. has errors property`)

    this.errors = errors
  }

  static from(results: PromiseSettledResult<FieldValidateError | null>[]) {
    const errors = results.reduce((errors, item) => {
      if (item.status === 'fulfilled' && item.value) {
        errors.push(item.value)
      }

      return errors
    }, [] as FieldValidateError[])

    if (errors.length === 0) return null

    return new FieldsValidateError(errors)
  }
}

// 整个 Form 校验错误
export class FormValidateError<S = any> extends Error {
  errorFields: InternalFormValidateErrorInfo['errorFields']

  isExpired: boolean

  values: S

  firstMessage: string

  constructor(errors: FieldsValidateError | null, isExpired: boolean, values: S) {
    super(`mink-ui 'Form' validation error`)

    this.isExpired = isExpired

    this.errorFields = errors?.errors?.map(e => ({ errors: e.errors, name: e.path })) || []

    this.values = values

    this.firstMessage = errors?.errors?.[0]?.errors?.[0] || ''
  }

  toJSON(): InternalFormValidateErrorInfo<S> {
    return {
      isExpired: this.isExpired,
      values: this.values,
      message: this.firstMessage,
      errorFields: this.errorFields,
    }
  }
}
