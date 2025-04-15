import{j as n,I as l,F as o}from"./index-BoMhpNC_.js";import"./index-4b6efSp6.js";function e(){return n.jsxs(n.Fragment,{children:[n.jsx(l,{children:n.jsx(o,{span:24,children:"col"})}),n.jsxs(l,{children:[n.jsx(o,{span:12,children:"col-12"}),n.jsx(o,{span:12,children:"col-12"})]}),n.jsxs(l,{children:[n.jsx(o,{span:8,children:"col-12"}),n.jsx(o,{span:8,children:"col-12"}),n.jsx(o,{span:8,children:"col-12"})]}),n.jsxs(l,{children:[n.jsx(o,{span:6,children:"col-12"}),n.jsx(o,{span:6,children:"col-12"}),n.jsx(o,{span:6,children:"col-12"}),n.jsx(o,{span:6,children:"col-12"})]})]})}const p={desc:{"zh-CN":`基础用法

`,"en-US":`基础用法

`},rawText:`\`\`\`tsx
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
\`\`\``,cssWrapName:"css10840e96f9e7f347d7ec768e821c6ece"};function a(){return n.jsxs(n.Fragment,{children:[n.jsxs(l,{children:[n.jsx(o,{span:8,children:"col-8"}),n.jsx(o,{span:8,offset:8,children:"col-8"})]}),n.jsxs(l,{children:[n.jsx(o,{span:6,offset:6,children:"col-6 col-offset-6"}),n.jsx(o,{span:6,offset:6,children:"col-6 col-offset-6"})]}),n.jsx(l,{children:n.jsx(o,{span:12,offset:6,children:"col-12 col-offset-6"})})]})}const f={desc:{"zh-CN":"列偏移。\n\n使用 `offset` 可以将列向右侧偏。例如，`offset={4}` 将元素向右侧偏移了 4 个列（column）的宽度。\n\n","en-US":"列偏移。\n\n使用 `offset` 可以将列向右侧偏。例如，`offset={4}` 将元素向右侧偏移了 4 个列（column）的宽度。\n\n"},rawText:`\`\`\`tsx
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
\`\`\``,cssWrapName:"css1b5ff1b65d774accea3c66a7faca3a5e"};function r(){return n.jsxs(l,{children:[n.jsx(o,{span:18,push:6,children:"col-18 col-push-6"}),n.jsx(o,{span:6,pull:18,children:"col-6 col-pull-18"})]})}const t={desc:{"zh-CN":"列排序。\n\n通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。\n\n","en-US":"列排序。\n\n通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。\n\n"},rawText:`\`\`\`tsx
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
\`\`\``,cssWrapName:"css3c333bf66db9708993b1df98c5deb847"};export{e as A,f as a,a as b,t as c,r as d,p as i};
