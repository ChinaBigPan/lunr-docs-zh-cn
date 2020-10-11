---
title: 定制
sidebarDepth: 3
---

# 定制

Lunr 提供了合理的默认值来方便大多数用例。此外还提供了定制索引的能力，以提供额外的特性，并允许对文档如何建立索引和匹配评分进行更多的控制。

[英文原地址](https://lunrjs.com/guides/customising.html)

## 插件

任何定制和扩展都可以打包为插件。这让在索引和其他人之间共享您的定制变得更加容易，同时还提供了一种单一、受支持的 Lunr 定制方式。

插件只是一个由 Lunr 在索引构建器上下文中执行的函数。例如，一个向索引中添加默认字段的插件是这样的：

```js
var articleIndex = function () {
  this.field('text')
}
```

这个插件可以在定义索引时这样使用：

```js
var idx = lunr(function () {
  this.use(articleIndex)
})
```

插件函数将其上下文设置为索引生成器，并且生成器也作为第一个参数传递给插件。在索引中使用插件时，也可以向插件传递额外参数。例如，使用上面的插件并将其字段传入并添加到索引可以像这样:

```js
var parameterisedPlugin = function (builder, fields) {
  fields.forEach(function (field) {
    builder.field(field)
  })
}
```

```js
var idx = lunr(function () {
  this.use(parameterisedPlugin, ['title', 'body'])
})
```

## 管道函数

Lunr 中最常见的定制部分是文本处理管道。例如，如果你想支持搜索英式或美式拼写，你可以添加一个管道函数来规范化某些单词。比方说，我们想规范“grey”这个词，这样用户就可以通过英式拼写“grey”或美式拼写“gray”进行搜索。为此，我们可以添加一个管道函数来进行规范化:

```js
var normaliseSpelling = function (builder) {

  // 定义将 gray 转换为 grey 的管道函数
  var pipelineFunction = function (token) {
    if (token.toString() == "gray") {
      return token.update(function () { return "grey" })
    } else {
      return token
    }
  }

  // 注册管道函数以序列化索引
  lunr.Pipeline.registerFunction(pipelineFunction, 'normaliseSpelling')

  // 将管道函数添加到索引管道和搜索管道中
  builder.pipeline.before(lunr.stemmer, pipelineFunction)
  builder.searchPipeline.before(lunr.stemmer, pipelineFunction)
}

```

和以前一样，这个插件可以用于索引:

```js
var idx = lunr(function () {
  this.use(normaliseSpelling)
})
```

在索引期间，管道在文档的所有字段上运行。传递给管道函数的每个关键词都包含元数据，这些元数据指示关键词来自哪个字段，这可以用于控制哪些管道函数处理哪些字段。下面的示例将跳过从文档的“name”字段提取词干的过程。

```js
// 定义跳过指定字段的管道函数的函数
var skipField = function (fieldName, fn) {
  return function (token, i, tokens) {
    if (token.metadata["fields"].indexOf(fieldName) >= 0) {
      return token
    }

    return fn(token, i, tokens)
  }
}

// 创建忽略 “name” 字段的词干提取器
var selectiveStemmer = skipField('name', lunr.stemmer)
```

## 关键词元数据

Lunr 中的管道函数能够将元数据附加到关键词上。以是关键词的位置数据，即关键词在索引文档中的位置为例。默认情况下，索引中不存储元数据;这是为了减少索引的大小。可以将某些关键词元数据列入白名单。白名单元数据将与搜索结果一同返回，它也可以被其他管道函数使用。

`lunr.Token`支持添加元数据。举例来说，下面的插件将通过`tokenLength`键将关键词的长度附加为元数据。因其在搜索结果中可用，元数据键已经添加到元数据的白名单中：

```js
var tokenLengthMetadata = function (builder) {
  // 定义一个管道函数，将关键词长度存储为元数据
  var pipelineFunction = function (token) {
    token.metadata['tokenLength'] = token.toString().length
    return token
  }

  // 注册管道函数以序列化索引
  lunr.Pipeline.registerFunction(pipelineFunction, 'tokenLenghtMetadata')

  // 将管道函数添加至索引管道
  builder.pipeline.before(lunr.stemmer, pipelineFunction)

  // 加入白名单
  builder.metadataWhitelist.push('tokenLength')
}
```

与所有插件一样，在索引中使用它很简单:

```js
var idx = lunr(function () {
  this.use(tokenLengthMetadata)
})
```

## 相似性调优

Lunr 用来计算查询和文档之间相似度的算法可以使用两个参数进行调优。Lunr 提供的默认值很合理，我们也可以对其进行调整，为给定的文档集合提供最佳结果。

| 参数 | 描述 |
|:---:|----|
| `b` | 该参数控制对文档及其字段长度的重视程度。值必须在`0` ~ `1` 之间，默认值为`0.75`。减少该值会减少不同长度的文档对此术语在该文档的重要性的影响。|
| `k1` | 它可以控制一个普通单词搜索权重达到饱和的速度。增加该值会减慢饱和的速率，反之则会导致更快的饱和。默认值是1.2。如果被索引的文档集合中有大量未被停止此过滤器覆盖到的词，那么这些词可以很快地主导相似度的计算。在这些情况下，可以降低该值以平衡结果。  |

这两个参数都可以在构建索引值时调整:

```js
var idx = lunr(function () {
  this.k1(1.3)
  this.b(0)
})
```