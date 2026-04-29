## zh-CN

通过 `arrow` 属性控制箭头的显示与对齐方式。设为 `false` 隐藏箭头，设为 `{ pointAtCenter: true }` 让箭头指向目标元素中心。

## en-US

Use the `arrow` attribute to control arrow display and alignment. Set to `false` to hide the arrow, or `{ pointAtCenter: true }` to center the arrow on the target element.

```tsx
import { Space, Tooltip } from '@mink-ui/core'

export default function App() {
  return (
    <Space>
      <Tooltip arrow content="with arrow" placement="topLeft">
        <span>Show arrow</span>
      </Tooltip>
      <Tooltip arrow={false} content="without arrow" placement="topLeft">
        <span>Hide arrow</span>
      </Tooltip>
      <Tooltip arrow={{ pointAtCenter: true }} content="arrow points at center" placement="topLeft">
        <span>Center arrow</span>
      </Tooltip>
    </Space>
  )
}
```
