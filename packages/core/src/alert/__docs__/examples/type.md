## zh-CN

警告提示，展现需要关注的信息，适用于简短的警告提示。

## en-US

警告提示，展现需要关注的信息，适用于简短的警告提示。

xxx en

```tsx
import { Alert, Space } from '@mink-ui/core'

function App() {
  return (
    <Space orientation="vertical">
      {['info', 'success', 'warning', 'error'].map(type => (
        <Alert key={type} showIcon message={`${type} Text`} type={type} />
      ))}
    </Space>
  )
}

export default App
```
