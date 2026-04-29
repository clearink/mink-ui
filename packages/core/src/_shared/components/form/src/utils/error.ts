import type { InternalFieldName, InternalFormValidateErrorInfo, RuleValidateOptions } from '../_shared.props'

import { toArray } from '@mink-ui/shared/array/to-array'

import { logger } from '../../../../utils/logger'

/**
 * @description 单个字段校验错误
 */
export class FieldValidateError extends Error {
  /**
   * @description 告警信息
   */
  public warnings: string[] = []

  /**
   * @description 错误信息
   */
  public errors: string[]

  /**
   * @description 字段路径
   */
  public path: InternalFieldName

  constructor(result: any, options: RuleValidateOptions) {
    super(`mink-ui Form.Field validation error`)

    const issues = toArray(result?.issues)

    if (issues.length === 0) logger.error('', result)

    this.path = options.path

    this.errors = issues.length === 0
      ? [`validation error on field '${options.path.join('.')}'`]
      : issues.map(issue => issue.message)
  }
}

/**
 * @description 多个字段校验错误
 */
export class FieldsValidateError extends Error {
  public errors: FieldValidateError[]

  constructor(errors: FieldValidateError[]) {
    super(`[mink-ui] 'form.validateFields' method failed`)

    this.errors = errors
  }

  public static from(results: PromiseSettledResult<FieldValidateError | null>[]) {
    const errors = results.reduce((result, item) => {
      if (item.status === 'fulfilled' && item.value) {
        result.push(item.value)
      }
      return result
    }, [] as FieldValidateError[])

    if (errors.length === 0) return null

    return new FieldsValidateError(errors)
  }
}

/**
 * @description Form 校验错误
 */
export class FormValidateError<S> extends Error {
  /**
   * @description 错误字段
   */
  public errorFields: InternalFormValidateErrorInfo['errorFields']

  /**
   * @description 是否过期
   */
  public isExpired: boolean

  /**
   * @description 表单值
   */
  public values: S

  /**
   * @description 第一个错误信息
   */
  firstMessage: string

  constructor(options: { error: FieldsValidateError | null, isExpired: boolean, values: S }) {
    super(`[mink-ui] 'Form' validation failed`)

    const { isExpired, error, values } = options

    this.isExpired = !!isExpired

    this.values = values

    this.errorFields = (error?.errors || []).map(_ => ({ errors: _.errors, name: _.path }))

    this.firstMessage = this.errorFields[0]?.errors?.[0] || ''
  }

  public toJSON(): InternalFormValidateErrorInfo<S> {
    return {
      isExpired: this.isExpired,
      values: this.values,
      message: this.firstMessage,
      errorFields: this.errorFields,
    }
  }
}
