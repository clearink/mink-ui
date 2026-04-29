import type { ModalProps } from '../props'

import { useExactState, useWatchValue } from '../../../_shared/hooks'

export default function useWrapperVisible(isOpen: ModalProps['isOpen']) {
  const [visible, setVisible] = useExactState(isOpen)

  const returnEarly = useWatchValue(isOpen, () => { isOpen && setVisible(true) })

  return [returnEarly, visible, setVisible] as const
}
