import{j as t}from"./index-DFpG6Uas.js";import{S as o,M as n}from"./index-DUqwrWJ6.js";import{C as e}from"./index-CwZ6dHZw.js";import{A as i,a as r,b as l}from"./vm_0b3242867ddba75eca11b802f30b3be7-BNTbEV3-.js";import"./index-B8QgcPLB.js";import"./index-B4818t-L.js";import"./reflow-D11wV1eq.js";function w(){return t.jsxs("div",{className:"source-container",children:[t.jsx(o,{title:"何时使用",children:t.jsx(n,{rawText:"随你"})}),t.jsx(o,{title:"代码演示",children:t.jsx(e,{items:[{desc:{"zh-CN":`基础用法

`,"en-US":`基础用法

\`\`\`tsx
import { Tooltip } from '@mink-ui/core'

export default function App() {
  return (
    <Tooltip content="prompt text">
      <span>Tooltip will show on mouse enter.</span>
    </Tooltip>
  )
}
\`\`\`
`},disabled:!1,element:t.jsx("div",{className:"tooltip-example-Basic",children:t.jsx(i,{})}),rawText:`\`\`\`tsx
import { Tooltip } from '@mink-ui/core'

export default function App() {
  return (
    <Tooltip content="prompt text">
      <span>Tooltip will show on mouse enter.</span>
    </Tooltip>
  )
}
\`\`\`
`,title:"基础用法"},{desc:{"zh-CN":`当 Tooltip 贴边时，自动偏移并且调整箭头位置。当超出过多时，则一同滚出屏幕。

`,"en-US":`当 Tooltip 贴边时，自动偏移并且调整箭头位置。当超出过多时，则一同滚出屏幕。

\`\`\`tsx
import { Button, Tooltip } from '@mink-ui/core'
import { useEffect, } from 'react'

export default function App() {
  return (
    <div
      style={{
        width: '100%',
        height: '300px',
        overflow: 'auto'
      }}
    >
      <div
        style={{
          width: '300vw',
          height: '300vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Tooltip content="popup text popup text popup text popup text popup text popup text" isOpen>
          <Button variant="filled">Scroll The Window</Button>
        </Tooltip>
      </div>
    </div>
  )
}
\`\`\`
`},disabled:!1,element:t.jsx("div",{className:"tooltip-example-Adjust",children:t.jsx(r,{})}),rawText:`\`\`\`tsx
import { Button, Tooltip } from '@mink-ui/core'
import { useEffect, } from 'react'

export default function App() {
  return (
    <div
      style={{
        width: '100%',
        height: '300px',
        overflow: 'auto'
      }}
    >
      <div
        style={{
          width: '300vw',
          height: '300vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Tooltip content="popup text popup text popup text popup text popup text popup text" isOpen>
          <Button variant="filled">Scroll The Window</Button>
        </Tooltip>
      </div>
    </div>
  )
}
\`\`\`
`,title:"自动调整"},{desc:{"zh-CN":`位置有 12 个方向。

`,"en-US":`位置有 12 个方向。

\`\`\`tsx
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
\`\`\`
`},disabled:!1,element:t.jsx("div",{className:"tooltip-example-Placement",children:t.jsx(l,{})}),rawText:`\`\`\`tsx
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
\`\`\`
`,title:"位置与箭头"}]})})]})}export{w as default};
