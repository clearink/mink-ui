import{S as o,M as l}from"./index-kJ7Chwl2.js";import{C as s}from"./index-7yhjIDBL.js";import{A as e,a as t,b as p}from"./muv_3c333bf66db9708993b1df98c5deb847_salt_32-CN3qO83i.js";import{j as n}from"./index-DHQ-hocX.js";import"./index-XS5s4EQe.js";function i(){return n.jsxs("div",{className:"source-container",children:[n.jsx(o,{title:"设计理念",children:n.jsx(l,{rawText:"假装有一张图片"})}),n.jsx(o,{title:"概述",children:n.jsx(l,{rawText:"..."})}),n.jsx(o,{title:"代码演示",children:n.jsx(s,{items:[{desc:{"zh-CN":`基础用法

`,"en-US":`基础用法

\`\`\`tsx
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
\`\`\`

\`\`\`scss
.grid-example-basic {
  .mink-row {
    margin-bottom: 16px;
  }
}
\`\`\`
`},disabled:!1,element:n.jsx(e,{}),rawText:`\`\`\`tsx
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
\`\`\``,title:"基础用法"},{desc:{"zh-CN":"列偏移。\n\n使用 `offset` 可以将列向右侧偏。例如，`offset={4}` 将元素向右侧偏移了 4 个列（column）的宽度。\n\n","en-US":`列偏移。

使用 \`offset\` 可以将列向右侧偏。例如，\`offset={4}\` 将元素向右侧偏移了 4 个列（column）的宽度。

\`\`\`tsx
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
\`\`\`

\`\`\`scss
.grid-example-basic {
  .mink-row {
    margin-bottom: 16px;
  }
}
\`\`\`
`},disabled:!1,element:n.jsx(t,{}),rawText:`\`\`\`tsx
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
\`\`\``,title:"左右偏移"},{desc:{"zh-CN":"列排序。\n\n通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。\n\n","en-US":`列排序。

通过使用 \`push\` 和 \`pull\` 类就可以很容易的改变列（column）的顺序。

\`\`\`tsx
import { Col, Row } from '@mink-ui/core'

export default function App() {
  return (
    <Row>
      <Col span={18} push={6}>
        col-18 col-push-6
      </Col>
      <Col span={6} pull={18}>
        col-6 col-pull-18
      </Col>
    </Row>
  )
}
\`\`\`

\`\`\`scss
.grid-example-basic {
  .mink-row {
    margin-bottom: 16px;
  }
}
\`\`\`
`},disabled:!1,element:n.jsx(p,{}),rawText:`\`\`\`tsx
import { Col, Row } from '@mink-ui/core'

export default function App() {
  return (
    <Row>
      <Col span={18} push={6}>
        col-18 col-push-6
      </Col>
      <Col span={6} pull={18}>
        col-6 col-pull-18
      </Col>
    </Row>
  )
}
\`\`\``,title:"栅格排序"}]})})]})}export{i as default};
