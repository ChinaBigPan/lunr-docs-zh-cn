---
title: 类 Index
sidebarDepth: 3
---

# Class: Index

[英文原地址](https://lunrjs.com/docs/lunr.Index.html)

## lunr.Index(attrs)

```js
new Index(attrs)
```

索引包含所有文档的构建索引，并为索引提供查询接口。

通常，`lunr.Index`的实例不会使用这个构造函数来创建，相反，应该使用`lunr.Builder`来构建新的索引，或者使用`lunr.Index.load`来加载以前构建和序列化的索引。

[lunr.TokenSet]:https://lunrjs.com/docs/lunr.TokenSet.html
[lunr.Pipeline]:https://lunrjs.com/docs/lunr.Pipeline.html

**参数：**
| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `attrs` | object | 构建搜索索引的属性：<br /><br />- `invertedIndex` Object 用于文档引用的术语/字段的索引。<br />- `fieldVectors` 字段矢量。<br />- `tokenSet` [lunr.TokenSet][lunr.TokenSet] 所有关键词标记的集合。<br />- `fields` 索引文档字段的名称。<br />- `pipeline` [lunr.Pipeline][lunr.Pipeline] 搜索关键词的管道。|

## 方法

### `load(serializedIndex) → {lunr.Index}` <Badge text="static" />

加载之前序列化的`lunr.Index`。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `serializedIndex` | Object | 之前序列化的`lunr.Index` |


### `query(fn) → {}`

使用生成的`lunr.Query`对象对索引执行查询。

如果对索引执行编程查询，则此方法优于`lunr.Index#search`，从而避免额外的查询解析开销。

生成的查询对象传入提供的函数，该函数用于表示针对索引运行的查询。

注意，尽管这个函数接受一个回调参数，但这并不是异步操作，该回调仅仅是乘车一个自定义的查询对象而已。

[lunr.Index~queryBuilder]:https://lunrjs.com/docs/lunr.Index.html#~queryBuilder

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `fn` | [lunr.Index~queryBuilder][lunr.Index~queryBuilder] | 用于构建查询的函数。 |

### `search(queryString) → {}`

使用`lunr`查询语法对索引执行搜索。

结果将按权重分数排序返回，最相关的结果将最先返回。有关如何计算权重分数的详细信息，请参阅[指南](https://lunrjs.com/guides/searching.html#scoring)。

要进行更程序化的查询，请使用`lunr.Index#query`。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `queryString` | [lunr.Index~queryBuilder][lunr.Index~queryBuilder] | 包含了 lunr 查询语句的字符串。 |

如果传入的查询字符串无法解析则返回`lunr.QueryParseError`错误。

### `toJSON() → {Object}`

为 JSON 序列化准备索引。

这个 JSON blob 的 schema 将于一个单独的 JSON schema 文件中描述。


## 类型定义

### `queryBuilder(query)`

查询生成器回调提供一个查询对象，用以表示要在索引上执行的查询。

[lunr.Query]:https://lunrjs.com/docs/lunr.Query.html

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `query` | [lunr.Query][lunr.Query] | 要构建的查询对象。|

### `QueryString`

尽管`lunr`提供了使用`lunr.Query`创建查询的能力，但它还提供了一种简单的查询语言，该语言本身可以解析为`lunr.Query`的一个实例。

对于以编程方式构建的查询，建议直接使用`lunr.Query`，查询语言最好用于人类输入的文本，而不是程序生成的文本。

它最简单的查询可以只是单个的关键词，例如，“hello”。同时也支持多个关键词，并使用`OR`进行合并，例如“hello world”将匹配包含“hello”或“world”的文档，尽管包含两个词的结果排名更高。

关键词中可以包含通配符来匹配一个或多个未指定的字符，这些通配符可以插入其中的任何位置，单个关键词中可以存在多个通配符。添加通配符会增加要找到的文档数量，但也可能对查询性能产生负面影响，特别是在词汇开头使用通配符的时候。

关键词可以被限制为特定的字段，如“title:hello”，只有在`title`字段中有关键词“hello”的文档才会匹配此次查询。使用索引中不存在的字段将导致错误。

也可以将修饰器添加到关键词中，lunr 支持编辑关键词的距离和权重提升。一个关键词的权重提升会使该匹配关键词文档拥有更高的得分，比如“foo^5”。编辑距离也支持模糊匹配。举个例子，“hello~2” 将匹配带有“hello”的编辑距离为`2`的文档。应该避免过大的编辑距离值，以免影响查询性能。

每个关键词还支持一个状态修饰符。默认情况下，关键词在文档中的存在是可选，但是可以更改为必需或禁止。关键词的必需状态的设定需要在文档中的这个词使用`+`前缀, 如`+foo bar`是要求搜索的文档必须包含`foo`和可选包含`bar`。反过来`-`则是设置禁止该关键词存在,即不能出现在一个文档中,例如`-foo bar`是要求搜索的文档不包含`foo`但可能包含`bar`。

我们可以使用反斜杠字符`\`转义特殊字符，这允许搜索包括通常被认为是修饰符的字符，例如`foo\~2`将搜索关键词`foo~2`，而不是搜索关键词`foo`时将其权重提升到`2`。

#### 示例

| 查询 | 示例 |
|:---:|----|
| 简单关键词查询 | `hello` |
| 多关键词查询 | `hello world` |
| 字段限定关键词查询 | `title:hello` |
| 关键词权重为10 | `hello^10` |
| 关键词编辑距离为2 | `hello~2` |
| 带有状态修饰符的关键词 | `-foo +bar baz` |

#### 结果

结果为包含匹配搜索查询文档的详细信息的对象。

[lunr.MatchData]:https://lunrjs.com/docs/lunr.MatchData.html

| 对象属性名 | 类型 | 描述 |
|:---:|:---:|----|
| `ref` | string | 表示文档的引用。 |
| `score` | number | `0`到`1`之间的数字，表示该文档与查询的相似程度。 |
| matchData | [lunr.MatchData][lunr.MatchData] | 对于此次匹配的元数据，包括关键词。 |

