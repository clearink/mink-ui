## zh-CN

描述

## en-US

xxx en

```tsx
import { Alert, Space } from '@mink-ui/core'

function App() {
  return (
    <Space direction="vertical">
      {['info', 'success', 'warning', 'error'].map(type => (
        <Alert
          key={type}
          message={`${type} Text`}
          description="Description text"
          type={type}
          showIcon
        />
      ))}
    </Space>
  )
}

export default App
```
