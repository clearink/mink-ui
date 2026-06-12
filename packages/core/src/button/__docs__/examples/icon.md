```tsx
import { Button, Space, Tooltip } from '@mink-ui/core'
import { SearchOutlined } from '@mink-ui/icons'

export default function App() {
  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Tooltip content="search">
          <Button icon={<SearchOutlined />} shape="circle" variant="solid" />
        </Tooltip>
        <Button shape="circle" variant="solid">
          A
        </Button>
        <Button icon={<SearchOutlined />} variant="solid">
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
