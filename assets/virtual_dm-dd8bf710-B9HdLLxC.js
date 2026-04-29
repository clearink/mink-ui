import{j as n,R as o,I as e}from"./index-lKdCcfyw.js";import"./index-BSCRxZB_.js";function t(){return n.jsxs(n.Fragment,{children:[n.jsx(o,{children:n.jsx(e,{span:24,children:"col"})}),n.jsxs(o,{children:[n.jsx(e,{span:12,children:"col-12"}),n.jsx(e,{span:12,children:"col-12"})]}),n.jsxs(o,{children:[n.jsx(e,{span:8,children:"col-12"}),n.jsx(e,{span:8,children:"col-12"}),n.jsx(e,{span:8,children:"col-12"})]}),n.jsxs(o,{children:[n.jsx(e,{span:6,children:"col-12"}),n.jsx(e,{span:6,children:"col-12"}),n.jsx(e,{span:6,children:"col-12"}),n.jsx(e,{span:6,children:"col-12"})]})]})}const a={metaInfo:{"zh-CN":`基础用法

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
\`\`\``,cssName:"css-821c6ece",relativePath:"packages/core/src/grid/__docs__/examples/basic.md"};function r(){return n.jsxs(n.Fragment,{children:[n.jsxs(o,{children:[n.jsx(e,{span:8,children:"col-8"}),n.jsx(e,{offset:8,span:8,children:"col-8"})]}),n.jsxs(o,{children:[n.jsx(e,{offset:6,span:6,children:"col-6 col-offset-6"}),n.jsx(e,{offset:6,span:6,children:"col-6 col-offset-6"})]}),n.jsx(o,{children:n.jsx(e,{offset:6,span:12,children:"col-12 col-offset-6"})})]})}const c={metaInfo:{"zh-CN":"列偏移。\n\n使用 `offset` 可以将列向右侧偏。例如，`offset={4}` 将元素向右侧偏移了 4 个列（column）的宽度。\n\n","en-US":"列偏移。\n\n使用 `offset` 可以将列向右侧偏。例如，`offset={4}` 将元素向右侧偏移了 4 个列（column）的宽度。\n\n"},rawText:`\`\`\`tsx
import { Col, Row } from '@mink-ui/core'

export default function App() {
  return (
    <>
      <Row>
        <Col span={8}>col-8</Col>
        <Col offset={8} span={8}>
          col-8
        </Col>
      </Row>
      <Row>
        <Col offset={6} span={6}>
          col-6 col-offset-6
        </Col>
        <Col offset={6} span={6}>
          col-6 col-offset-6
        </Col>
      </Row>
      <Row>
        <Col offset={6} span={12}>
          col-12 col-offset-6
        </Col>
      </Row>
    </>
  )
}
\`\`\``,cssName:"css-faca3a5e",relativePath:"packages/core/src/grid/__docs__/examples/offset.md"};function p(){return n.jsxs(o,{children:[n.jsx(e,{push:6,span:18,children:"col-18 col-push-6"}),n.jsx(e,{pull:18,span:6,children:"col-6 col-pull-18"})]})}const i={metaInfo:{"zh-CN":"列排序。\n\n通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。\n\n","en-US":"列排序。\n\n通过使用 `push` 和 `pull` 类就可以很容易的改变列（column）的顺序。\n\n"},rawText:`\`\`\`tsx
import { Col, Row } from '@mink-ui/core'

export default function App() {
  return (
    <Row>
      <Col push={6} span={18}>
        col-18 col-push-6
      </Col>
      <Col pull={18} span={6}>
        col-6 col-pull-18
      </Col>
    </Row>
  )
}
\`\`\``,cssName:"css-c5deb847",relativePath:"packages/core/src/grid/__docs__/examples/sort.md"},m=[{name:"ref",type:"Ref<HTMLDivElement>","zh-CN":"外部引用","en-US":"External ref"},{name:"align",enum:!0,type:["top","middle","bottom","stretch"],"zh-CN":"垂直对齐方式，支持响应式配置","en-US":"Vertical alignment, supports responsive config"},{name:"justify",enum:!0,type:["start","center","end","space-around","space-between","space-evenly"],"zh-CN":"水平对齐方式，支持响应式配置","en-US":"Horizontal alignment, supports responsive config"},{name:"gutter",type:"[GridGutter, GridGutter] | GridGutter",defaultValue:"0","zh-CN":"间距，数组形式为 [水平, 垂直]，支持响应式配置","en-US":"Gutter, array form is [horizontal, vertical], supports responsive config"},{name:"wrap",type:"boolean",defaultValue:"true","zh-CN":"是否换行","en-US":"Whether to wrap"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"}],f=[{name:"ref",type:"Ref<HTMLDivElement>","zh-CN":"外部引用","en-US":"External ref"},{name:"span",type:"number","zh-CN":"占位格数，0 代表不占位","en-US":"Number of grid columns to span, 0 means hidden"},{name:"offset",type:"number","zh-CN":"偏移格数","en-US":"Number of grid columns to offset"},{name:"order",type:"number","zh-CN":"排序值","en-US":"Order value"},{name:"pull",type:"number","zh-CN":"向左移动格数","en-US":"Number of grid columns to pull left"},{name:"push",type:"number","zh-CN":"向右移动格数","en-US":"Number of grid columns to push right"},{name:"flex",type:"'auto' | 'none' | string | number","zh-CN":"flex 布局配置","en-US":"Flex layout config"},{name:"xs",type:"ColLayout | number","zh-CN":"<576px 响应式配置","en-US":"<576px responsive config"},{name:"sm",type:"ColLayout | number","zh-CN":"≥576px 响应式配置","en-US":"≥576px responsive config"},{name:"md",type:"ColLayout | number","zh-CN":"≥768px 响应式配置","en-US":"≥768px responsive config"},{name:"lg",type:"ColLayout | number","zh-CN":"≥992px 响应式配置","en-US":"≥992px responsive config"},{name:"xl",type:"ColLayout | number","zh-CN":"≥1200px 响应式配置","en-US":"≥1200px responsive config"},{name:"xxl",type:"ColLayout | number","zh-CN":"≥1600px 响应式配置","en-US":"≥1600px responsive config"},{name:"className",type:"string","zh-CN":"自定义类名","en-US":"Custom class name"},{name:"style",type:"React.CSSProperties","zh-CN":"自定义样式","en-US":"Custom style"},{name:"prefixCls",type:"string","zh-CN":"自定义类名前缀","en-US":"Custom class name prefix"}];export{t as A,a as M,m as P,c as a,r as b,i as c,p as d,f as e};
