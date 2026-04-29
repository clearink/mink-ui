---
name: generator-requirement-document
description: 生成需求文档
---

# Generator Requirement Document

## 目的

根据用户输入，在 `.aide/<requirement-name>-<now date>` 下生成对应项目文档

## 使用方式

```
/generator-requirement-document <requirement-name>
```

例如：
- `/generator-requirement-document 创建 alert 组件`
- `/generator-requirement-document 创建 pagination 组件`

## 执行步骤

### 1. 确认需求名称

- 确认 `.aide` 下是否存在以 `<requirement-name>` 开头的文件夹。
- 如果用户选择覆盖，则删除对应文件夹下的所有文件。
- 如果用户选择不覆盖，则提示用户重新输入需求名称。

### 2. 生成需求文档

- 在 `.aide/<requirement-name>-<now date>` 下生成以下文件：
  - `README.md`：需求文档的介绍和背景。
  - `design.md`：需求文档的设计和实现。
  - `test.md`：需求文档的测试和验收。
  - `release.md`：需求文档的发布和部署。
  - `changelog.md`：需求文档的变更日志。

### 3. 提示用户完成需求文档

- 提示用户完成需求文档，并保存到 `.aide/<requirement-name>-<now date>` 下。

## 注意事项

- 请确保用户输入的需求名称符合命名规范。
- 请确保用户输入的需求文档符合需求文档的格式和内容要求。
