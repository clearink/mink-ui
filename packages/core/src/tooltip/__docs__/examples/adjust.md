## zh-CN

当 Tooltip 贴边时，自动偏移并且调整箭头位置。当超出过多时，则一同滚出屏幕。

## en-US

当 Tooltip 贴边时，自动偏移并且调整箭头位置。当超出过多时，则一同滚出屏幕。

```tsx
import { Button, Tooltip } from '@mink-ui/core'
import { useEffect, } from 'react'

export default function App() {
  return (
    <div
      style={{
        width: '100%',
        height: '300px',
        overflow: 'auto'
      }}
    >
      <div
        style={{
          width: '300vw',
          height: '300vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Tooltip content="popup text popup text popup text popup text popup text popup text" isOpen>
          <Button variant="filled">Scroll The Window</Button>
        </Tooltip>
      </div>
    </div>
  )
}
```
