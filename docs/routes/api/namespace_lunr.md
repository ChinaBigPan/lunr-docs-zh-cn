---
title: 命名空间 lunr
sidebarDepth: 2
---

# Namespace: lunr

[英文原地址](https://lunrjs.com/docs/lunr.html)

## lunr

用于配置和构造新的 lunr 索引的函数。

创建一个`lunr.Builder`实例，并使用`trimmer`、`stopWordFilter`和`stemmer`等工具设置管道。

该`Builder`对象被提供给以参数传递的配置函数，允许自定义字段列表和其他构建器参数。

所有文档都**必须**添加到入的配置函数中。

**示例：**

```js
var idx = lunr(function () {
  this.field('title')
  this.field('body')
  this.ref('id')

  documents.forEach(function (doc) {
    this.add(doc)
  }, this)
})
```

## 方法

### `generateStopWordFilter(token) → {lunr.PipelineFunction}` <Badge text="static" />

`lunr.GenerateStopWordFilter`从提供的停止词列表中构建一个`stopWordFilter`函数。

在`lunr.stopWordFilter`中使用这个生成器构建，可以用于为应用程序或非英语语言生成自定义的`stopWordFilters`。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `token` | Array | 要通过过滤器的关键词。|

### `stemmer(token) → {lunr.Token}` <Badge text="static" />

`lunr.stemmer`是一种英语语言的词干提取器。是[PorterStemmer](http://tartarus.org/~martin)的 JavaScript 实现。

[lunr.Token]:https://lunrjs.com/docs/lunr.Token.html

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `token` | [lunr.Token][lunr.Token] | 要提取的字符串。|


### `stopWordFilter() → {lunr.Token}` <Badge text="static" />

`lunr.stopWordFilter`是一个英文停止单词列表过滤器，列表中包含的任何单词都不会通过过滤器。

这是在管道函数中使用的方法。如果关键词没有通过过滤器，则将返回`undefined`。

### `tokenizer(obj = null, metadata = null) → {}` <Badge text="static" />

用于将字符串分割为关键词的函数，以便插入到搜索索引当中。使用`lunr.tokenizer.separator`来分割字符串，改变该属性的值可以更改将字符串分割成关键词的方式。

它会通过调用`toString`将其参数转换为字符串，然后在`lunr.tokenizer.separator`中对该字符串进行分割。数组将把其元素转换为字符串并包装在一个`lunr.Token`中。

可选参数`metadata`可以传递给`tokenizer`，`metadata`将被克隆，并作为元数据添加到从要转换为关键词的对象创建的每个关键词中。

| 参数名 | 类型 | 属性 | 描述 |
|:---:|:---:|----|----|
| `obj` | string 或 object 或 object[] | 可空 | 要提取的字符串。|
| `metadata` | object | 可空 | 与每个关键词相关联的可选的元数据。 |

### `trimmer(token) → {lunr.Token}` <Badge text="static" />

`lunr.trimmer`是一个管道函数，用以在非单词字符进入索引之前清除关键词的前后的多余字符。

对于非拉丁字符，它可能不能正常工作，请不要使用或进行修改以用于非拉丁字符的语言。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|----|
| `token` | [lunr.Token][lunr.Token] | 要通过过滤器的关键词。|