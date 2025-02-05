import { capitalize } from '@mink-ui/shared'

import { constants } from './constants'

const re = new RegExp(`^${constants.iconAttrNamePrefix}`)

export function formatAttrName(attribute: string) {
  const name = attribute.replace(re, '').split('-').map((str, index) => {
    return index === 0 ? str : capitalize(str)
  }).join('')

  return name === 'class' ? 'className' : name
}
