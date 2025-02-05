import type { CustomPluginStore } from '../interface'

import md5 from '../utils/md5'

export function formatJsxId(_store: CustomPluginStore, filePath: string) {
  return `${_store.prefix}${md5(`jsx-${filePath}`)}.tsx`
}

export function formatCssId(_store: CustomPluginStore, filePath: string) {
  return `${_store.prefix}${md5(`css-${filePath}`)}.scss`
}
