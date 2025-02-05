```tsx
import { Collapse } from '@mink-ui/core'

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`
const items = [
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
]

export default function App() {
  const onChange = (expandName, expandedNames) => {
    console.log(expandName, expandedNames)
  }

  return (
    <Collapse
      items={items}
      defaultExpandedNames={['1']}
      onChange={onChange}
    />
  )
}
```
