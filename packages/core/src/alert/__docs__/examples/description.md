## zh-CN

描述

## en-US

xxx en

```tsx
import { Alert, Space } from '@mink-ui/core'

function App() {
  return (
    <Space orientation="vertical">
      {['info', 'success', 'warning', 'error'].map(type => (
        <Alert
          key={type}
          showIcon
          description="Description text"
          message={`${type} Text`}
          type={type}
        />
      ))}
    </Space>
  )
}

export default App
```
