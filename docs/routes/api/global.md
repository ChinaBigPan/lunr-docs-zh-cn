---
title: 全局 Global
sidebarDepth: 2
---

# Global

[英文原地址](https://lunrjs.com/docs/global.html)

## 类型定义

### `fieldExtractor(doc) → (nullable) {string|object|Array.<object>}`

从文档中提取字段的函数。

Lunr 希望字段可以位于文档的顶层，但是如果该字段嵌套在文档深处，那么可以使用提取器函数来提取正确字段用以索引。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|----|
| `doc` | object | 要添加到索引中的文档。|

**返回值：**

obj - 为该字段建立索引的对象。

**示例：**

提取嵌套字段

```js
function (doc) { return doc.nested.field }
```