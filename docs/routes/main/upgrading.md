---
title: 版本迁移
sidebarDepth: 3
---

# 版本迁移

[英文原地址](https://lunrjs.com/guides/upgrading.html)

Lunr 2.x 版本与之前的版本接口和之前相似，因此升级后的搜索的执行方式不会有太大变化。索引的构建和序列化方式以及管道韩式所需的接口都有所不同。本文将介绍二者的差异并说明如何升级。

## 索引构建

0.x/1.x 版本与 2.x 版本的最大区别是 Lunr 索引现在是**不可变的(immutable)**。一旦构建了它们，就不可能在索引中添加、更新或删除任何文档。必须在定义函数退出前添加所有文档。

0.x/1.x 版本是按照下面的方法添加索引的：

```js
var idx = lunr(function () {
  this.ref('id')
  this.field('text')
})

idx.add({ id: 1, text: 'hello' })
```

而在 2.x 中，文档是在配置函数的末尾添加的：

```js
var idx = lunr(function () {
  this.ref('id')
  this.field('text')

  this.add({ id: 1, text: 'hello' })
})
```

## 搜索

搜索接口向后兼容之前版本的 Lunr。0.x/1.x 中的搜索方法在 2.x 中依然试用。

搜索的行为发生了轻微的改变，多关键词搜索现在采用逻辑或`OR`，之前是逻辑和`AND`。

实际上，这一变化意味着在 2.x 中给定的搜索将返回比以前更多的文档，并且最先返回最相关的结果。

## 管道函数

在旧版本中，管道函数的接口非常简单；关键词就是字符串。在 2.x 版本中，关键词以`lunr.Token`表示。

举例来说，假设有一个管道函数将关键词转换为小写。之前的版本可以这样实现：

```js
var downcaser = function (token) {
  return token.toLowerCase()
}
```

在 2.x 版本稍微复杂一点点：

```js
var downcaser = function (token) {
  return token.update(function (str) {
    return str.toLowerCase()
  })
}
```

更多细节请参见 API 文档中的 `new lunr.Token` 对象。