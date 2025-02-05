import { getElementStyle, nextTick } from '@mink-ui/shared'
import { useEffect } from 'react'

import type { FormItemInputProps } from '../props'

import { useEvent, useExactState, useWatchValue } from '../../../_shared/hooks'

export default function useItemInputOffset(props: FormItemInputProps, hasError: boolean) {
  const { getOuter } = props

  const [offset, setOffset] = useExactState(0)

  const cleanOffset = () => { !hasError && setOffset(0) }

  const updateOffset = useEvent(() => {
    const $outer = getOuter()

    if (!hasError || !$outer) return

    const styles = getElementStyle($outer)

    setOffset(Number.parseFloat(styles.marginBottom))
  })

  const returnEarly = useWatchValue(hasError, updateOffset)

  useEffect(() => nextTick(updateOffset), [updateOffset])

  return { returnEarly, offset, cleanOffset }
}
