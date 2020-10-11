---
title: 开始
sidebarDepth: 3
---

# 开始

[英文原地址](https://lunrjs.com/guides/getting_started.html)

## 安装

```shell
npm install lunr
```

在浏览器中使用：

```html
<script src="https://unpkg.com/lunr/lunr.js"></script>
```

为了简单起见，下面将使用 node.js 环境作为示例。同样的代码可以在任何 JavaScript 环境中工作。


## 创建索引

我们将在文档集合上创建一个简单的索引，然后对这些文档执行搜索。

首先，我们需要一个文档集合。文档是一个 JavaScript 对象。Lunr 使用它的标识符字段告诉我们集合中哪些文档匹配搜索，以及我们希望搜索的任何其他字段。

```js
var documents = [{
  "name": "Lunr",
  "text": "Like Solr, but much smaller, and not as bright."
}, {
  "name": "React",
  "text": "A JavaScript library for building user interfaces."
}, {
  "name": "Lodash",
  "text": "A modern JavaScript utility library delivering modularity, performance & extras."
}]
```
我们将使用上面的文档数组来构建索引。我们想搜索文本字段，`name`字段就是我们的标识符。让我们定义索引并将这些文档添加到其中。

```js
var idx = lunr(function () {
  this.ref('name')
  this.field('text')

  documents.forEach(function (doc) {
    this.add(doc)
  }, this)
})
```

现在我们已经创建了索引，尝试搜索:

```js
idx.search("bright")
```

## 结论

上面的示例展示了如何用 Lunr 快速进行全文搜索。您可以了解更多关于 Lunr 索引所涉及的核心概念，探索 Lunr 提供的高级搜索功能，并了解如何定制 Lunr 以提供出色的搜索体验。

