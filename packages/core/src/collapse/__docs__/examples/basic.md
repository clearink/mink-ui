## zh-CN

基本用法展示折叠面板的展开与收起。

## en-US

Basic usage showing expand and collapse.

```tsx
import { Collapse } from '@mink-ui/core'

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

export default function App() {
  return (
    <Collapse
      items={[
        {
          name: '1',
          title: 'This is panel header 1',
          children: <p>{text}</p>,
        },
        {
          name: '2',
          title: 'This is panel header 2',
          children: <p>{text}</p>,
        },
        {
          name: '3',
          title: 'This is panel header 3',
          children: <p>{text}</p>,
        },
      ]}
    />
  )
}
```
