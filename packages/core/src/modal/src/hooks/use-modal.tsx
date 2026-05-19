import type { ModalHolderItem } from '../_shared.props'
import type { InternalModalProps } from '../modal.props'

import { useMemo, useState } from 'react'
import { pick } from '@mink-ui/shared/object/pick'
import { shallowMerge } from '@mink-ui/shared/object/shallow-merge'

import { useConstant } from '../../../_shared/hooks/use-constant'
import { useInvoke } from '../../../_shared/hooks/use-invoke'
import ModalHolder from '../modal-holder'
import { defaultApiModalProps, includedApiModalProps } from '../modal.props'
import { ModalHookControl } from '../utils/modal-hook-control'

export function useModal() {
  const [items, setItems] = useState(() => new Map<string, ModalHolderItem>())

  const ctrl = useConstant(() => new ModalHookControl())

  useInvoke(() => {
    ctrl._bind(
      (updater) => { setItems(updater) },
      params => shallowMerge<InternalModalProps>(
        params,
        pick(defaultApiModalProps, includedApiModalProps),
      ),
    )
  })

  const methods = useMemo(() => ctrl.expose(), [ctrl])

  return [
    methods,
    <ModalHolder key="modal-holder" items={items} />,
  ] as const
}
