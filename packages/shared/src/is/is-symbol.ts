import { rawType } from '../object/raw-type'

export function isSymbol(obj: any): obj is symbol {
  return rawType(obj) === 'Symbol'
}
