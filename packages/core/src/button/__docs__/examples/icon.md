## zh-CN

使用图标按钮。

## en-US

Use icon button.

```tsx
import { Button, Space, Tooltip } from '@mink-ui/core'
import { SearchOutlined } from '@mink-ui/icons'

export default function App() {
  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Tooltip content="search">
          <Button icon={<SearchOutlined />} shape="circle" theme="primary" variant="solid" />
        </Tooltip>
        <Button shape="circle" theme="primary" variant="solid">
          A
        </Button>
        <Button icon={<SearchOutlined />} theme="primary" variant="solid">
          Search
        </Button>
        <Tooltip content="search">
          <Button icon={<SearchOutlined />} shape="circle" />
        </Tooltip>
        <Button icon={<SearchOutlined />}>Search</Button>
      </Space>
      <Space>
        <Tooltip content="search">
          <Button icon={<SearchOutlined />} shape="circle" />
        </Tooltip>
        <Button icon={<SearchOutlined />}>Search</Button>
        <Tooltip content="search">
          <Button icon={<SearchOutlined />} shape="circle" variant="dashed" />
        </Tooltip>
        <Button icon={<SearchOutlined />} variant="dashed">
          Search
        </Button>
        <Button href="https://www.google.com" icon={<SearchOutlined />} target="_blank" />
      </Space>
    </div>
  )
}
```
