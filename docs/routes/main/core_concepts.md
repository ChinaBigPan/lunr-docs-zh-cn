---
title: 核心概念
sidebarDepth: 3
---

# 核心概念

[英文原地址](https://lunrjs.com/guides/core_concepts.html)

用 Lunr 创建一个基本的搜索索引很简单。理解 Lunr 使用的一些概念和术语将允许您提供强大的搜索功能。

## 文档(Documents)

文档包含您希望能够搜索的文本。文档是带有一个或多个字段和一个标识符的 JavaScript 对象，该标识符在搜索结果中返回。表示一篇博客文章的文档可能是这样的:

```js
{
  "id": "http://my.blog/post",
  "title": "Title",
  "body": "Contents of the blog post"
}
```

在这个文档中，有两个字段可以搜索，`title`和`body`，还有一个`id`字段可以用作标识符。通常，字段是字符串，或者它们可以是响应`toString`的任何东西。还可以使用数组，在这种情况下，对数组的每个元素调用`toString`的结果将可用于搜索。

传递给 Lunr 进行索引的文档不必与应用或网站中的数据拥有相同的结构。比方说，搜索一个电子邮件地址，电子邮件地址可以分为`domain`和`local`部分:


```js
{
  "id": "Bob",
  "emailDomain": "example.com",
  "emailLocal": "bob.bobson"
}
```

## 文本处理(Text Processing)

在 Lunr 开始构建索引之前，它必须首先处理文档字段中的文本。这个过程的第一步是将字符串分割成关键词; Lunr 会调用它们。一个字符串，如"foo bar baz "将被分割成三个独立的关键词:"foo"、"bar"和"baz"。

字段的文本被分割成关键词后将通过文本处理管道传递。管道是一个或多个函数的组合，这些函数可以修改关键词，或者提取和存储关键词的元数据。Lunr 中的默认管道提供了一些函数用于删除标点符号、忽略停止词(stop word)和将关键词浓缩为词干。

可以通过删除、重新安排或向管道中添加定制处理器来修改 Lunr 使用的管道。自定义管道函数既可以阻止关键词进入索引(如stop word 过滤器)，也可以修改关键词(如词干分析)。还可以展开关键词，这对于向索引中添加同义词非常有用。下面是一个管道函数将电子邮件地址拆分到一个`local`和`domain`部分例子:

```js
var emailFilter = function (token) {
  return token.toString().split("@").map(function (str) {
    return token.clone().update(function () { return str })
  })
}
```

### 词干提取(Stemming)

词干提取是将派生词还原为词根或词干形式的过程。例如，“搜索”、“已搜索”和“可搜索”的词干应该是“搜索”。这样做有两个好处:首先，大大减少了搜索索引中标记的数量及其大小，另外，它增加了执行搜索时的召回。包含“搜索”一词的文档很可能与“搜索”的查询相关。

有两种方法可以实现词干提取：基于字典提取或基于算法提取。在基于字典的词干分析中，使用将所有单词映射到词干的词典。这种方法可以得到很好的结果，但我们需要一个得到维护且规模足够大的字典。更实用的方法是采用算法进行词干分析，比如 Lunr中使用的[Porter Stemmer](https://tartarus.org/martin/PorterStemmer/)。

Lunr 使用的词干提取方法无法保证它找到的词的词干是一个实际的词，但该词的所有派生应该产生相同的词干。

## 搜索结果

搜索的结果包含一个结果对象数组，表示搜索匹配到的各个文档。每个结果都有三个属性:

`ref`：文档的引用。
`score`：该文档与查询的相似度。关于如何计算这个值，请参阅[这里](https://lunrjs.com/guides/searching.html)
`metadata`：在该文档中发现的与查询关键词想关联的任何元数据。

元数据包含在文档中找到的每个搜索关键词的键以及在其中找到的字段。它将包含关于该关键词和字段的所有元数据；比方说搜索关键词匹配到的位置：

```js
{
  "ref": "123",
  "score": 0.123456,
  "metadata": {
    "test": {
      "body": {
        "position": [[0, 4], [24, 4]]
      }
    }
  }
}
```

我们可以选择需要存储的关键词和字段的元数据，以避免搜索索引占用太多空间。在建立索引时，若要让关键词的位置匹配“位置”元数据则必须列入白名单：

```js
var idx = lunr(function () {
  this.ref('id')
  this.field('body')
  this.metadataWhitelist = ['position']

  documents.forEach(function (doc) { this.add(doc) }, this)
})
```