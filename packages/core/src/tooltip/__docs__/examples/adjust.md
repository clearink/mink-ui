## zh-CN

当 Tooltip 贴边时，自动偏移并且调整箭头位置。当超出过多时，则一同滚出屏幕。

## en-US

当 Tooltip 贴边时，自动偏移并且调整箭头位置。当超出过多时，则一同滚出屏幕。

```tsx
import { useEffect, useRef } from 'react'
import { Button, Tooltip } from '@mink-ui/core'

export default function App() {
  const $container = useRef<HTMLDivElement>(null)
  const $content = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = $container.current
    const content = $content.current

    if (!container || !content) return

    container.scrollTop = (content.scrollHeight - container.clientHeight) / 2
    container.scrollLeft = (content.scrollWidth - container.clientWidth) / 2
  }, [])

  return (
    <div
      ref={$container}
      style={{
        position: 'relative',
        overflow: 'auto',
        height: 300,
        width: '100%'
      }}
    >
      <div
        ref={$content}
        style={{
          width: '300vw',
          height: '300vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Tooltip isOpen content="Tooltip Content" getContainer={$container}>
          <Button variant="solid">Scroll The Window</Button>
        </Tooltip>
      </div>
    </div>
  )
}
```
