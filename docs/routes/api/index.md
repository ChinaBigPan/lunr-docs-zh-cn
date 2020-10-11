---
title: 总览
sidebarDepth: 3
---

# 总览

[英文原地址](https://lunrjs.com/docs/index.html)

## 示例

可以使用下面的代码创建一个简单示例：

```js
var idx = lunr(function () {
  this.field('title')
  this.field('body')

  this.add({
    "title": "Twelfth-Night",
    "body": "If music be the food of love, play on: Give me excess of it…",
    "author": "William Shakespeare",
    "id": "1"
  })
})
```

接下来搜索很简单：

```js
idx.search("love")
```

它将返回匹配到的文档列表，并给出其与搜索查询的匹配度的值和与之相关的元数据：

```js
[
  {
    "ref": "1",
    "score": 0.3535533905932737,
    "matchData": {
      "metadata": {
        "love": {
          "body": {}
        }
      }
    }
  }
]
```

## 描述

Lunr.js 是一个在浏览器中使用的小型全文搜索库。它对 JSON 文档进行索引，并提供一个简单的搜索接口，用于检索与文本查询最佳匹配的文档。

## 为什么使用它？

对于所有数据都在客户端中存储的 web 应用程序，能够在客户端上搜索这些数据意义重大。它省去了在服务器上添加额外压缩服务的工作。本地搜索的速度也更快，没有网络开销，即使没有网络连接也能保持可用性。

## 安装

只要在您想要使用的页面中引入 Lunr.js 文件即可。所有现代浏览器都支持 Lunr.js。

也可以使用`npm install lunr`包进行安装。

不支持ES5的浏览器需要 JavaScript shim 才能让 Lunr 工作。您可以使用Augment.js、ES5- shim 或任何对让浏览器与 ES5 兼容的 JavaScript 库。
























