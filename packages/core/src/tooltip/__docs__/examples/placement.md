## zh-CN

位置有 12 个方向。

## en-US

位置有 12 个方向。

```tsx
import { Button, Segmented, Space, Tooltip } from '@mink-ui/core'
import { useMemo, useState } from 'react'

const text = (
  <div>
    <div>content text</div>
    <div>content text</div>
  </div>
)

export default function App() {
  const [arrow, setArrow] = useState<'Center' | 'Hide' | 'Show'>('Show')

  const arrowConfig = useMemo(() => {
    if (arrow === 'Hide') {
      return false
    }

    if (arrow === 'Show') {
      return true
    }

    return {
      pointAtCenter: true,
    }
  }, [arrow])
  return (
    <div>
      <div>
        <Segmented
          value={arrow}
          options={['Show', 'Hide', 'Center']}
          onChange={setArrow}
          style={{ marginBottom: 24 }}
        />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip placement="topLeft" content={text} arrow={arrowConfig}>
            <Button style={{ margin: 4, width: 80 }}>TL</Button>
          </Tooltip>
          <Tooltip placement="top" content={text} arrow={arrowConfig}>
            <Button style={{ margin: 4, width: 80 }}>Top</Button>
          </Tooltip>
          <Tooltip placement="topRight" content={text} arrow={arrowConfig}>
            <Button style={{ margin: 4, width: 80 }}>TR</Button>
          </Tooltip>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Tooltip placement="leftTop" content={text} arrow={arrowConfig}>
              <Button style={{ margin: 4, width: 80 }}>LT</Button>
            </Tooltip>
            <Tooltip placement="left" content={text} arrow={arrowConfig}>
              <Button style={{ margin: 4, width: 80 }}>Left</Button>
            </Tooltip>
            <Tooltip placement="leftBottom" content={text} arrow={arrowConfig}>
              <Button style={{ margin: 4, width: 80 }}>LB</Button>
            </Tooltip>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Tooltip placement="rightTop" content={text} arrow={arrowConfig}>
              <Button style={{ margin: 4, width: 80 }}>RT</Button>
            </Tooltip>
            <Tooltip placement="right" content={text} arrow={arrowConfig}>
              <Button style={{ margin: 4, width: 80 }}>Right</Button>
            </Tooltip>
            <Tooltip placement="rightBottom" content={text} arrow={arrowConfig}>
              <Button style={{ margin: 4, width: 80 }}>RB</Button>
            </Tooltip>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip placement="bottomLeft" content={text} arrow={arrowConfig}>
            <Button style={{ margin: 4, width: 80 }}>BL</Button>
          </Tooltip>
          <Tooltip placement="bottom" content={text} arrow={arrowConfig}>
            <Button style={{ margin: 4, width: 80 }}>Bottom</Button>
          </Tooltip>
          <Tooltip placement="bottomRight" content={text} arrow={arrowConfig}>
            <Button style={{ margin: 4, width: 80 }}>BR</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
```
