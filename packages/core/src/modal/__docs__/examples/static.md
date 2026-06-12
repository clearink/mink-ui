## zh-CN

通过 Modal.confirm 直接 Modal。

## en-US

通过 Modal.confirm 直接 Modal。en-US

```tsx
import { createContext } from 'react'
import { Button, Modal, Space } from '@mink-ui/core'

const config = {
  title: 'Static Method',
  onOk: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
  },
  content: (
    <div>
      modal content
    </div>
  ),
}

export default function App() {
  return (
    <Space>
      <Button
        theme="info"
        onClick={async () => {
          const confirmed = await Modal.confirm(config)
          console.log('Confirmed: ', confirmed)
        }}
      >
        Confirm
      </Button>
      <Button
        theme="info"
        onClick={() => { Modal.warning(config) }}
      >
        Warning
      </Button>
      <Button
        theme="info"
        onClick={() => { Modal.info(config) }}
      >
        Info
      </Button>
      <Button
        theme="info"
        onClick={() => { Modal.error(config) }}
      >
        Error
      </Button>
    </Space>
  )
}
```
