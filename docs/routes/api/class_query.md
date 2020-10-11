---
title: 类 Query
sidebarDepth: 3
---

# Class:Query

[英文原地址](https://lunrjs.com/docs/lunr.Query.html)

## lunr.Query()

### `new Query()`

`lunr.Query`提供了一种编程方式来定义针对`lunr.Index`执行的查询。

[lunr.Index#query]:https://lunrjs.com/docs/lunr.Index.html#query

最好使用 [lunr.Index#query][lunr.Index#query] 方法来构造 `lunr.Query`，这样可以使用正确的索引字段预先初始化查询对象。

| 属性名 | 类型 | 描述 |
|:----:|:----:|-----|
| `clauses` | | 查询语句的数组。|
| `allFields` || `lunr.Index`中所有可用字段的数组。 |

## 属性

### `presence:number` <Badge text="static" />

常量，用于表示关键词在匹配文档中必须以何种形式出现。

| 属性名 | 类型 | 描述 |
|:----:|:----:|-----|
| `OPTIONAL` | number | 关键词在文档中无论出现与否均可，默认值 |
| `REQUIRED` | number | 关键词在文档中必须出现，不包含该关键词的文档不会返回。 |
| `PROHIBITED` | number | 关键词禁止在文档中出现，包含该关键词的文档不会返回。 |

**例子：**

必须存在的查询术语

```js
query.term('foo', { presence: lunr.Query.presence.REQUIRED })
```

### `wildcard` <Badge text="static" /><Badge text="constant" type="warning" />

常量，用于表示在构造查询语句时自动插入哪种通配符。

这可以让我们将通配符添加到关键的开头和结尾，而不必手动进行任何字符串连接。

通配符常量可以按位组合从而选择前置通配符和后置通配符。

| 属性名 | 类型 | 描述 |
|:---:|:---:|---|
| `wildcard.NONE` | number | 关键词无插入通配符，默认值。|
| `wildcard.LEADING` | number | 在关键词前加上通配符，除非已经存在前置通配符 |
| `wildcard.TRAILING` | number | 在关键词后添加通配符，除非已经存在后置通配符 |

**例子：**

带有后置通配符的查询关键词

```js
query.term('foo', { wildcard: lunr.Query.wildcard.TRAILING })
```

带有前置和后置通配符的查询关键词

```js
query.term('foo', {
  wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING
})
```

## 方法

### `clause(clause) → {lunr.Query}`

[lunr.Query~Clause]:https://lunrjs.com/docs/lunr.Query.html#~Clause

向该查询中添加一个[lunr.Query~Clause]。

除非查询短语包含要匹配的字段，否则将匹配所有字段。此外，查询短语默认的权重为`1`。


| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `clause` | [lunr.Query~Clause][lunr.Query~Clause] | 要添加到此查询的短语。 |

### `isNegated()`

否定查询语句是指每个查询短语中都有一个禁止项。这些查询需要一些特殊的处理才能返回预期的结果。

### `term(term, options) → {lunr.Query}`

将一个关键词添加到当前查询中，这将在组成此查询的短语列表中创建一个[lunr.Query~Clause][lunr.Query~Clause]。

该词是按照原本的样子使用的，也就是说，这种方法不会进行关键词化。相反，应该在调用此方法之前转换为关键词或类似于关键词的字符串。

关键词将通过`toString`转换为字符串。多个关键词可以通过一个数组传递，数组中的每个关键词都将共享相同的配置项。

| 参数名 | 类型 | 属性 | 描述 |
|:---:|:---:|----|----|
| `term` | object 或 object[] |   | 要添加到查询中的关键词。|
| `options` | object | 可选 | 添加到查询短语中的额外属性。  |


**例子：**

添加单个关键词。

```js
query.term("foo")
```

向查询中添加单个关键词，并指定搜索字段、关键词权重提升和自动后置通配符。

```js
query.term("foo", {
  fields: ["title"],
  boost: 10,
  wildcard: lunr.Query.wildcard.TRAILING
})

```

在将字符串用作关键词之前，使用`lunr.tokenizer`将其转换为搜索关键词。

```js
query.term(lunr.tokenizer("foo bar"))
```

## 类型定义

### `Clause:Object`
c
`lunr.Query`中的短语包含了关键词以及关于如何将该关键词与`lunr.Index`匹配的详细信息。

| 对象属性 | 类型 | 属性 | 默认值 | 描述 |
|:----:|:---:|:---:|:---:|----|
| `fields` |||| 索引中该短语中的字段应该被匹配。 |
| `boost` | number | 可选 | `1` | 匹配该短语时应该使用的权重提升。|
| `editDistance` | number | 可选 | | 关键词是否应该应用模糊匹配，以及匹配应该有多模糊。 |
| `usePipeline` | number | 可选 || 关键词是否应该通过搜索管道传递。 |
| `wildcard` | number | 可选 | `lunr.Query.wildcard.NONE` | 关键词是否应该有前置或后置通配符。 |
| `presence` | number | 可选 | `lunr.Query.presence.OPTIONAL` | 该关键词出现在任何匹配的文档中。|