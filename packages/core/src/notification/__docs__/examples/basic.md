## zh-CN

基本用法描述。

## en-US

Basic usage description.

```tsx
import { createContext, useMemo, useState } from 'react'
import { Button, Divider, notification, Space } from '@mink-ui/core'
import RadiusBottomleftOutlined from '@mink-ui/icons/RadiusBottomleftOutlined'
import RadiusBottomrightOutlined from '@mink-ui/icons/RadiusBottomrightOutlined'
import RadiusUpleftOutlined from '@mink-ui/icons/RadiusUpleftOutlined'
import RadiusUprightOutlined from '@mink-ui/icons/RadiusUprightOutlined'

const Context = createContext({ name: 'Default' })

export default function App() {
  const [stackEnable, setStackEnable] = useState(true)

  const [api, contextHolder] = notification.useNotification({
    stack: stackEnable
  })

  const openNotification = (placement, key) => {
    const prefix = 'Hello'.repeat(Math.random() > 0.5 ? 12 : 32)
    api.info({
      key,
      title: `Notification ${placement}`,
      description: <Context.Consumer>{({ name }) => `${prefix}, ${name}!`}</Context.Consumer>,
      placement,
      duration: 1e10,
    })
  }

  const contextValue = useMemo(() => ({ name: 'Mink UI' }), [])

  return (
    <Context value={contextValue}>
      {contextHolder}
      <div style={{ marginBottom: 24 }}>
        <Button theme="primary" variant="solid" onClick={() => { setStackEnable(p => !p) }}>
          stackEnable-
          {`${stackEnable}`}
        </Button>
      </div>
      <Space>
        <Button
          theme="info"
          onClick={() => openNotification('topLeft')}
        >
          <RadiusUpleftOutlined />
          topLeft
        </Button>
        <Button
          theme="info"
          onClick={() => openNotification('top')}
        >
          top
        </Button>
        <Button
          theme="info"
          onClick={() => openNotification('topRight')}
        >
          <RadiusUprightOutlined />
          topRight
        </Button>
        <Button
          theme="info"
          onClick={() => openNotification('topRight', '1')}
        >
          <RadiusUprightOutlined />
          topRight--update-1
        </Button>
      </Space>
      <Divider />
      <Space>
        <Button
          theme="info"
          onClick={() => openNotification('bottomLeft')}
        >
          <RadiusBottomleftOutlined />
          bottomLeft
        </Button>
        <Button
          theme="info"
          onClick={() => openNotification('bottom')}
        >
          bottom
        </Button>
        <Button
          theme="info"
          onClick={() => openNotification('bottomRight')}
        >
          <RadiusBottomrightOutlined />
          bottomRight
        </Button>
      </Space>
    </Context>
  )
}
```
