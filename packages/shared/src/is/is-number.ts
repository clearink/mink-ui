import { rawType } from '../object/raw-type'

export function isNumber(obj: any): obj is number {
  return rawType(obj) === 'Number'
}
