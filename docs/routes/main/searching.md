---
title: 搜索
sidebarDepth: 3
---

# 搜索

[英文原地址](https://lunrjs.com/guides/searching.html)

在构建了文档索引之后，就要实际执行搜索了。

最简单的方法是将你想要搜索的文本传递到搜索方法中:

```js
idx.search('foo')
```

这样就会返回所有匹配关键词“foo”的所有文档的细节了。尽管它看起来像字符串，但是`search`方法将该字符串解析为一个搜索查询。它支持定义更复杂查询的特殊语法。

它还支持搜索多个关键词。如果一个文档匹配了**至少**一个搜索关键词，那么就会显示在结果中。搜索关键词之间使用`空格`连接。

```js
idx.search('foo bar')
```

上面的示例将匹配包含“foo”或“bar”的文档。同时包含这两个关键词的文档将获得更高的`score`分，且在结果中位列前茅。

## 匹配得分(scoring)

文档的匹配得分(也称为相关性)是由[BM25](https://en.wikipedia.org/wiki/Okapi_BM25)算法计算的，此外还受[权重提升](https://lunrjs.com/guides/searching.html#Boosts)因素的影响。您无需过多地关心 BM25 如何实现的细节；总之，搜索词在**单个文档**中出现的次数越多，该词对文档得分增加的贡献就越多，但是搜索词在**整个文档集合**中出现的次数越多，该词对文档得分增加的贡献就越少。

举个例子，假设您正在为一组关于 JavaScript 测试库的文档建立索引。那么关键词“JavaScript”、“库”和“测试”在整个集合中就可能经常出现，因此找到一个提到这些关键词之一的文档并不是很重要。但是如果您搜索的是“集成测试”，则集合中只有三个文档中出现了关键词“集成”，其中之一多次提到，那么这个文档的得分就是最高的。

## 通配符(wildcards)

Lunr 在执行搜索时指出通配符。通配符表示为星号(*)，它可以出现在搜索关键词中的任何位置。例如，下面的代码匹配所有以“foo”开头的文档：

```js
idx.search('foo*')
```

下面的代码匹配所有以“oo”结尾的文档：

```js
idx.search('*oo')
```

如上面的示例所示的前置通配符应该谨慎使用。它们会对搜索性能产生负面影响，特别是在大型搜索中。

最后，通配符可以位于关键词的中间。下面代码将匹配任何包含以“f”开头、以“o”结尾的术语的文档:

```js
idx.search('f*o')
```

还值得注意的是，当搜索关键词包含通配符时，不会对其执行词干分析。

## 字段(fields)

默认情况，Lunr 将搜索文档中查询关键词的所有字段，并且将关键字限制在特定字段中。下面是在字段`title`中搜索`"foo"`关键词的示例：

```js
idx.search('title:foo')
```

搜索关键词以字段名称为前缀，后面跟冒号(`:`)。该字段必须是构建索引时定义的字段之一。未识别的字段将报错。

基于字段的搜索可以与所有其他关键词修饰符、通配符以及其他关键词进行组合。例如，要搜索`title`中以`foo`开头的单词或在任何字段中以`"bar"`开头的单词，可以使用以下代码：

```js
idx.search('title:foo* bar')
```

## 权重提升(boosts)

在多个关键词搜索中，其中一个可能比其他词要重要一些。对这种情况，Lunr 支持长期关键词等级提升。任何同提升的关键词匹配的文档都会获得更高的相关性分数，并在结果中出现在更高的位置。我们可以在关键词中插入(`^`)符号和一个正整数来实现。

```js
idx.search('foo^10 bar')
```

在上面的例子中，搜索关键词`"foo"`的权重是`"bar"`的`10` 倍。提升倍数可以是任意正整数，不同的关键词可以有不同的值：

```js
idx.search('foo^10 bar^5 baz')
```

## 模糊匹配(fuzzy matches)

Lunr 支持在文档中进行关键词模糊匹配搜索，如果我们不清楚一个词的拼写则可以这么做，或者可以增加返回的搜索结果的数量。搜索时允许的模糊量也可以控制。模糊性是通过向关键词添加波浪号(`~`)和一个**正整数**来实现的。下面的代码搜索匹配所有文档中拥有`"foo"`相关`1`个单位编辑距离的文档:

```js
idx.search('foo~1')
```

编辑距离为`1`意味着在添加、删除、更改或调换单词中的`1`个字符也会触发匹配行为。例如，“boo”会触发匹配因为它需要`1`次编辑(用“b”替换“f”)，但是“boot”不需要，因为它还需要在末尾加上一个“t”。

## 指定关键词(term presence)

默认情况下，Lunr 使用逻辑或`OR`将搜索中的多个术语组合起来。也就是说，搜索“foo bar”将匹配包含“foo”或包含“bar”或两者都包含的文档。我们可以使用关键词级别来控制，也就是说，可以指定匹配文档中每个关键词的存在情况。默认情况下每个关键词在匹配的文档中都是可配置的，但是必须至少存在一个匹配关键词。我们可以指定关键词**必须**或**必须不**在匹配的文档中出现。

为了表示某个关键词必须出现在匹配的文档中，该关键词的前缀应该是加号(+);为了表示某个术语必须不存在，该术语的前缀应该是减号(-)。如果没有前缀，则该关键词在匹配文档中的存在与否并不强制。

下面的示例表示搜索**必须包含**“foo”，**可能包含**“bar”和**必须不**包含“baz”的文档:

```js
idx.search("+foo bar -baz")
```

模拟逻辑和`AND`搜索必须存在两个术语`“foo 和 bar”`的文档:

```js
idx.search("+foo +bar")
```