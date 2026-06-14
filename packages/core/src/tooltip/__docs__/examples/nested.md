## zh-CN

Tooltip 嵌套时。

## en-US

Tooltip 嵌套时。

```tsx
import { useState } from 'react'
import { Button, Tooltip } from '@mink-ui/core'

const hoverContent = <div>This is hover content.</div>

const clickContent = <div>This is click content.</div>

export default function App() {
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)

  const hide = () => {
    setClicked(false)
    setHovered(false)
  }

  const handleHoverChange = (open: boolean) => {
    setHovered(open)
    setClicked(false)
  }

  const handleClickChange = (open: boolean) => {
    setHovered(false)
    setClicked(open)
  }

  return (
    <Tooltip
      style={{ width: 200, textAlign: 'center' }}
      content={hoverContent}
      isOpen={hovered}
      trigger="hover"
      onIsOpenChange={handleHoverChange}
    >
      <Tooltip
        style={{ width: 200, textAlign: 'center' }}
        content={(
          <div>
            {clickContent}
            <Button size="small" onClick={hide}>Close</Button>
          </div>
        )}
        isOpen={clicked}
        trigger="click"
        onIsOpenChange={handleClickChange}
      >
        <Button>Hover and click</Button>
      </Tooltip>
    </Tooltip>
  )
}
```
