## zh-CN

通过 `placement` 属性设置 Tooltip 的弹出位置，支持 12 个方向。

## en-US

Set the popup position with the `placement` attribute. There are 12 placement options available.

```tsx
import { Button, Tooltip } from '@mink-ui/core'

const topPlacements = ['topLeft', 'top', 'topRight'] as const
const bottomPlacements = ['bottomLeft', 'bottom', 'bottomRight'] as const
const leftPlacements = ['leftTop', 'left', 'leftBottom'] as const
const rightPlacements = ['rightTop', 'right', 'rightBottom'] as const

export default function App() {
  return (
    <div className="placement-grid">
      <div className="placement-row">
        {topPlacements.map(placement => (
          <Tooltip key={placement} content={placement} placement={placement}>
            <Button>{placement}</Button>
          </Tooltip>
        ))}
      </div>
      <div className="placement-row">
        <div className="placement-side">
          {leftPlacements.map(placement => (
            <Tooltip key={placement} content={placement} placement={placement}>
              <Button>{placement}</Button>
            </Tooltip>
          ))}
        </div>
        <div className="placement-center" />
        <div className="placement-side">
          {rightPlacements.map(placement => (
            <Tooltip key={placement} content={placement} placement={placement}>
              <Button>{placement}</Button>
            </Tooltip>
          ))}
        </div>
      </div>
      <div className="placement-row">
        {bottomPlacements.map(placement => (
          <Tooltip key={placement} content={placement} placement={placement}>
            <Button>{placement}</Button>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}
```

```scss
.placement-grid {
  display: flex;
  flex-direction: column;
  gap: var(--mink-unit-3);
  align-items: center;
}

.placement-row {
  display: flex;
  gap: var(--mink-unit-3);
  justify-content: center;
}

.placement-side {
  display: flex;
  flex-direction: column;
  gap: var(--mink-unit-3);
}

.placement-center {
  width: 80px;
  height: 80px;
}
```
