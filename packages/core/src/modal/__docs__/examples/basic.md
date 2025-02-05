## zh-CN

基础用法

## en-US

基础用法

```tsx
import { Button, Modal } from '@mink-ui/core'
import { useState } from 'react'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => { setIsOpen(true) }
  const close = () => { setIsOpen(false) }

  return (
    <>
      <Button onClick={open}>open</Button>
      <Modal isOpen={isOpen} onCancel={close}>
        <div>12331141341</div>
      </Modal>
    </>
  )
}
```
