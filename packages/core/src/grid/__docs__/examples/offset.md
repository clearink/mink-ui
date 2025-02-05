## zh-CN

列偏移。

使用 `offset` 可以将列向右侧偏。例如，`offset={4}` 将元素向右侧偏移了 4 个列（column）的宽度。

## en-US

列偏移。

使用 `offset` 可以将列向右侧偏。例如，`offset={4}` 将元素向右侧偏移了 4 个列（column）的宽度。

```tsx
import { Col, Row } from '@mink-ui/core'

export default function App() {
  return (
    <>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8} offset={8}>
          col-8
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={6}>
          col-6 col-offset-6
        </Col>
        <Col span={6} offset={6}>
          col-6 col-offset-6
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          col-12 col-offset-6
        </Col>
      </Row>
    </>
  )
}
```

```scss
.mink-col {
  padding: var(--mink-unit-4) 0;
  background: var(--mink-color-blue-6);
  color: #fff;
  text-align: center;
}

.mink-row {
  margin-bottom: 16px;
  .mink-col:nth-child(2n + 1) {
    background: var(--mink-color-blue-4);
  }
}
```
