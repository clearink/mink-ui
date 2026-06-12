## zh-CN

添加 loading 属性即可让按钮处于加载状态，loading.icon 可以自定义加载图标，最后三个按钮演示点击后进入加载状态。

## en-US

添加 loading 属性即可让按钮处于加载状态，loading.icon 可以自定义加载图标，最后三个按钮演示点击后进入加载状态。 en-US

```tsx
import { useState } from 'react'
import { Button, Space } from '@mink-ui/core'
import PoweroffOutlined from '@mink-ui/icons/PoweroffOutlined'
import SyncOutlined from '@mink-ui/icons/SyncOutlined'

export default function App() {
  const [loadings, setLoadings] = useState([])

  const enterLoading = (index: number) => {
    console.log('Start loading:', index)

    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = false
        return newLoadings
      })
    }, 3000)
  }

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button loading={{ delay: 600 }} variant="solid">
          Loading
        </Button>
        <Button loading size="small" variant="solid">
          Loading
        </Button>
        <Button loading icon={<PoweroffOutlined />} variant="solid" />
        <Button
          loading={{ icon: <SyncOutlined className="mink-spin" /> }}
          variant="solid"
        >
          Loading Icon
        </Button>
      </Space>
      <Space>
        <Button
          loading={loadings[0]}
          variant="solid"
          onClick={() => enterLoading(0)}
        >
          Icon Start
        </Button>
        <Button
          iconPlacement="end"
          loading={loadings[2]}
          variant="solid"
          onClick={() => enterLoading(2)}
        >
          Icon End
        </Button>
        <Button
          icon={<PoweroffOutlined />}
          loading={loadings[1]}
          variant="solid"
          onClick={() => enterLoading(1)}
        >
          Icon Replace
        </Button>
        <Button
          icon={<PoweroffOutlined />}
          loading={loadings[3]}
          variant="solid"
          onClick={() => enterLoading(3)}
        />
        <Button
          icon={<PoweroffOutlined />}
          loading={loadings[3] && { icon: <SyncOutlined className="mink-spin" /> }}
          variant="link"
          onClick={() => enterLoading(3)}
        >
          Loading Icon
        </Button>
      </Space>
    </div>
  )
}
```
