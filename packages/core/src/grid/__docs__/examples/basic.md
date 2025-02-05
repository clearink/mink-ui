## zh-CN

基础用法

## en-US

基础用法

```tsx
import { Col, Row } from '@mink-ui/core'

export default function App() {
  return (
    <>
      <Row>
        <Col span={24}>col</Col>
      </Row>
      <Row>
        <Col span={12}>col-12</Col>
        <Col span={12}>col-12</Col>
      </Row>
      <Row>
        <Col span={8}>col-12</Col>
        <Col span={8}>col-12</Col>
        <Col span={8}>col-12</Col>
      </Row>
      <Row>
        <Col span={6}>col-12</Col>
        <Col span={6}>col-12</Col>
        <Col span={6}>col-12</Col>
        <Col span={6}>col-12</Col>
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
