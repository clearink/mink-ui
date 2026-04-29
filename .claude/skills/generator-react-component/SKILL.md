---
name: generator-react-component
description: 创建 @mink-ui/core 下的 React 组件。当用户想要新建一个 core 组件时使用此 skill。用户只需提供组件名称，skill 会自动生成符合项目规范的完整组件结构。
---

# Generator React Component

## 目的

快速创建 `packages/core/src/` 下的 React 组件，遵循项目现有的编码规范和文件组织结构。

## 使用方式

```
/react-component-generator <component-name>
```

例如：
- `/react-component-generator alert`
- `/react-component-generator badge`

## 命名转换规则

| 输入格式 | kebab-case | PascalCase |
|---------|------------|------------|
| my-component | my-component | MyComponent |
| MyComponent | my-component | MyComponent |
| myComponent | my-component | MyComponent |

## 注意事项

1. **不要过度实现**：生成的代码是基础模板，用户需要根据实际需求填充具体逻辑
2. **保持一致性**：严格遵循声明的组件的代码风格和组织方式
3. **类型安全**：所有 TypeScript 类型定义要完整准确
4. **样式命名**：使用 `$ns-` 前缀的 CSS 变量命名规范
5. **文档完整性**：即使内容是占位符，也要生成完整的文档结构

## 执行步骤

### 1. 确认组件名称

从用户输入获取组件名称，转换为 kebab-case 格式（如 `MyComponent` → `my-component`）。

同时准备 PascalCase 格式用于组件类名（如 `my-component` → `MyComponent`）。

### 2. 创建目录结构

在 `packages/core/src/<component-name>/` 下创建以下目录：

```
<component-name>/
├── __docs__/
│   ├── examples/
│   └── props/
├── src/
│   └── hooks/
└── style/
```

### 3. 生成源码文件

**注意**：
- 将 `Component` 替换为 PascalCase 格式的组件名称
- 将 `component` 替换为 kebab-case 格式的组件名称
- 根据组件语义选择合适的 HTML 元素（`div`、`button`、`span` 等）

#### 3.1 `src/<component-name>.props.ts`

Props 类型定义文件。参考 Button 组件的模式：

```typescript
import type { HasChildren, SemanticsStyled } from '../../_shared/types'

export interface ComponentProps extends
  HasChildren,
  SemanticsStyled<'root'> {
  // TODO: 添加组件特定的 props
}

export type DefaultNames = ''

export type PickedComponentProps = Pick<ComponentProps, DefaultNames>

export type OmittedComponentProps = Omit<ComponentProps, DefaultNames>

/**
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 * |                        constants                        |
 * |---------------------------------------------------------|
 * |---------------------------------------------------------|
 */

export const defaultComponentProps: PickedComponentProps = {
  // TODO: 添加默认值
}

export const excludedComponentProps = [
  // extends
  'children',
  'prefixCls',
  'className',
  'classNames',
  'style',
  'styles',
  // props
] as const
```

#### 3.2 `src/<component-name>.tsx`

主组件文件：

```typescript
import type { ComponentProps } from './component.props'

import { defineName } from '../../_shared/utils/define-name'
import { useComponentProps } from './hooks/use-component-props'

function Component(props: ComponentProps) {
  const {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    restAttrs,
  } = useComponentProps(props)

  const { ref, children } = omitted

  return (
    <div
      {...restAttrs}
      ref={ref}
      className={cssNames.root}
      style={cssAttrs.root}
    >
      {children}
    </div>
  )
}

defineName(Component)

export default Component
```

#### 3.3 `src/hooks/use-component-props.ts`

Props 处理 hook：

```typescript
import type { ComponentProps, OmittedComponentProps, PickedComponentProps } from '../component.props'

import { omit } from '@mink-ui/shared/object/omit'

import { useCombinedSemantics } from '../../../_shared/hooks/use-settings/use-combined'
import { useConfiguration } from '../../../_shared/hooks/use-settings/use-configuration'
import { useComponentClassNames } from './use-class-names'
import { defaultComponentProps as defaultProps, excludedComponentProps } from '../component.props'

export function useComponentProps(props: ComponentProps) {
  const globalConfig = useConfiguration('component')

  const {
    // 解构 props，处理默认值
  } = props

  const omitted = props as OmittedComponentProps
  const picked: PickedComponentProps = {
    // 添加需要 pick 的 props
  }

  const classNames = useComponentClassNames(picked, omitted)

  const [cssNames, cssAttrs] = useCombinedSemantics(
    [
      globalConfig.classNames,
      { root: globalConfig.className },
      classNames,
      omitted.classNames,
      { root: omitted.className },
    ],
    [
      globalConfig.styles,
      { root: globalConfig.style },
      omitted.styles,
      { root: omitted.style },
    ],
    { picked, omitted },
  )

  const restAttrs = omit(props, excludedComponentProps)

  return {
    picked,
    omitted,
    cssNames,
    cssAttrs,
    restAttrs,
  }
}
```

#### 3.4 `src/hooks/use-class-names.ts`

ClassName 生成 hook：

```typescript
import type { OmittedComponentProps, PickedComponentProps } from '../component.props'

import { useNamespace } from '../../../_shared/hooks/use-settings/use-namespace'
import { cn } from '../../../_shared/libs/cn'
import { defaultComponentProps as defaultProps } from '../component.props'

/**
 * @description 获取组件的 className
 */
export function useComponentClassNames(picked: PickedComponentProps, omitted: OmittedComponentProps) {
  const ns = useNamespace('component', omitted.prefixCls)

  return {
    root: cn(ns, {
      // 根据条件添加 modifier classes
    }),
  }
}
```

#### 3.5 `src/index.ts`

导出文件：

```typescript
import _Component from './component'

// CompoundComponent
const Component = Object.assign(_Component, {})

/**
 * |---------------------------------------------------------|
 * |------------------- export definition -------------------|
 * |---------------------------------------------------------|
 */

export type { ComponentProps } from './component.props'

export { Component }
export default Component
```

### 4. 生成样式文件

#### 4.1 `style/index.ts`

```typescript
// builtin
import '../../styles/builtin.scss'
// oneself
import './index.scss'
```

#### 4.2 `style/index.scss`

```scss
@use '../../styles/helpers.scss' as *;

$ns-component: #{$ns}-component;

.#{$ns-component} {
  @include reset-component();

  // 基础样式
}
```

#### 4.3 `style/tokens.scss`

```scss
@use '../../styles/helpers.scss' as *;

// TODO: 定义组件的 design tokens
```

#### 4.4 `style/mixins.scss`

```scss
@use '../../styles/helpers.scss' as *;

// TODO: 定义组件的 mixins
```

### 5. 生成文档文件

#### 5.1 `__docs__/zh-CN.md`

```markdown
---
category: component
path: component
title: Component
subtitle: 组件中文名
desc: 组件描述。
group:
  title: 分类名
  order: 0
---

## 何时使用

TODO: 描述使用场景。

## 代码演示

<code-example src="./examples/basic.md" title="基本用法" />

## API

### Component Props

<props-table src="./props/component.json" />

## Semantic DOM

TODO: 描述组件的语义 DOM 结构。

## FAQ

### Q1

xxx
```

#### 5.2 `__docs__/en-US.md`

```markdown
---
category: component-en
path: component-en
title: Component
subtitle: Component Name
desc: Component description.
group:
  title: Category
  order: 0
---

## When to use

TODO: Describe use cases.

## Examples

<code-example src="./examples/basic.md" title="Basic Usage" />

## API

### Component Props

<props-table src="./props/component.json" />

## Semantic DOM

<semantic-dom src="./examples/semantic.md" />

## FAQ

### Q1

xxx
```

#### 5.3 `__docs__/examples/basic.md`

```markdown
## zh-CN

基本用法描述。

## en-US

Basic usage description.

```tsx
import { Component } from '@mink-ui/core'

export default function App() {
  return (
    <Component/>
  )
}
```
```

#### 5.4 `__docs__/props/<component-name>.json`

```json
[
  {
    "name": "children",
    "type": "React.ReactNode",
    "zh-CN": "组件内容",
    "en-US": "Component content"
  },
  {
    "name": "className",
    "type": "string",
    "zh-CN": "自定义类名",
    "en-US": "Custom class name"
  },
  {
    "name": "style",
    "type": "React.CSSProperties",
    "zh-CN": "自定义样式",
    "en-US": "Custom style"
  },
  {
    "name": "prefixCls",
    "type": "string",
    "zh-CN": "自定义类名前缀",
    "en-US": "Custom class name prefix"
  },
  {
    "name": "classNames",
    "type": "Record<'root', string>",
    "zh-CN": "自定义类名",
    "en-US": "Custom class name"
  },
  {
    "name": "styles",
    "type": "Record<'root', React.CSSProperties>",
    "zh-CN": "自定义样式",
    "en-US": "Custom style"
  }
]
```
## 4. 文件生成后

1. 列出所有创建的文件路径
2. 确认生成的文件路径是否正确。