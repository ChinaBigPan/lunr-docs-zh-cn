---
title: 类 Builder
sidebarDepth: 2
---

# Class: Builder

## lunr.Builder()

```js
new Builder()
```

`lunr.Builder`对一组文档执行索引，并返回`lunr.index`的实例，以便进行查询。

索引的所有配置都是通过该 builder 完成的，要索引的字段、文档引用、文本处理管道和文档评分参数都要在创建索引之前在 builder 上设置好。

[lunr.tokenizer]:https://lunrjs.com/docs/lunr.html#.tokenizer
[lunr.Pipeline]:https://lunrjs.com/docs/lunr.Pipeline.html


**属性：**

| 属性名 | 类型 | 描述 |
|:---:|:---:|----|
| `_ref` | string | 文档引用字段的内部引用 |
| `_fields` || 对要建立索引的文档字段的内部引用 |
| `invertedIndex` | object | 反向索引将关键词映射到文档字段 |
| `documentTermFrequencies` | object | 跟踪文档关键词的频率 |
| `documentLengths` | object | 跟踪添加到索引中的文档的长度 |
| `tokenizer` | [lunr.tokenizer][lunr.tokenizer] | 函数，用于将字符串拆分为用于索引的关键词 |
| `pipeline` | [lunr.Pipeline][lunr.Pipeline] | 在建立索引之前，管道对关键词执行文本处理 |
| `searchPipeline` | [lunr.Pipeline][lunr.Pipeline] | 在查询索引之前处理搜索词的管道 |
| `documentCount` | number | 跟踪索引的文档总数 |
| `_b` | number | 控制字段长度规范化的参数，设置为`0`禁用规范化，`1`则完全规范化字段长度，默认值为`0.75`。 |
| `_k1` | number | 控制关键词频率增加多快导致关键词频率饱和的参数，默认值为1.2。 |
| `termIndex` | number | 针对每个唯一关键词递增的计数器，用于标识关键词在向量空间中的位置。 |
| `metadataWhitelist` | array | 已列入白名单索引的元数据键列表。 |

## 方法

### `add(doc, attributes)`

将文档添加到索引中。

在向索引中添加字段之前，索引应该已经设置完全，文档 ref 和要索引的所有字段都已经指定。

文档必须有 ref 指定的字段名(默认情况下是'id')，它应该为索引定义所有字段，尽管`null`或`undefined`的值不会导致错误。

可以在构建时对整个文档提升权重(boost)。对文档提升权重表示该文档在搜索结果中的排名应该高于其他文档。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `doc` | object | 要添加到索引的文档 |
| `attributes` | object | 与此文档关联的可选属性。<br /><br />- `boost` number 默认值是`1`。向文档中所有关键词引用权重。|

### `b(number)`

用于调整计算相关性分数时对文档及其字段长度的重视程度的参数。值必须在`0` ~ `1` 之间，默认值为`0.75`。值为`0`时将完全禁用任何规范化行为。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `number` | number | 设置的值 |

[lunr.Index]:https://lunrjs.com/docs/lunr.Index.html

### `build() → {lunr.Index}`

构建索引值，创建 lunr.Index 的实例。

这就完成了索引过程，并且只有在所有文档都添加到索引中时才应该调用它。

**返回值：** [lunr.Index][lunr.Index]

### `field(fieldName, attributes)`

将自动添加到将被索引的文档字段列表中。每个被索引的文档都应该拥有这个字段。若索引文档中该字段为`null`不会导致错误，但会限制搜索检索该文档的机会。

在将文档添加到索引之前，应该添加所有字段。在之后添加字段将不会对已经建立索引的文档产生影响。

我们可以在构建时提升(boost)字段的权重。这使得该字段中的关键词在排名搜索结果时更加重要。使用字段`boost`来指定一个字段中的匹配比其他字段更重要。

[fieldExtractor]:https://lunrjs.com/docs/global.html#fieldExtractor

**参数：**
| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `fieldName` | number | 设置的值 |
| `attributes` | object | 与该字段相关的配置属性<br /><br />- `boost` number 默认值`1` 应用到该字段中所有关键词的提升权重。<br />- `extractor` [fieldExtractor][fieldExtractor] 从文档中提取字段的函数。 |

**报错：**

`fieldName`不能包含不支持的字符`/`，否则会抛出`RangeError`

### `k1(number)`

控制项频率上升导致项频率饱和的速度的参数。默认值是1.2。设置一个较高的值会给较慢的饱和度，一个较低的值会导致更快的饱和度。

**参数：**
| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `number` | number | 设置的值 |

### `ref(ref)`

设置用作文档引用的字段。每个文档都必须有这个字段。该字段在文档中的类型应该是字符串，如果不是字符串，则通过调用`toString`将其强制为字符串。

默认的`ref`是`id`。

索引期间不应该更改`ref`，它应该在任何文档添加到索引之前设置。在索引期间更改它可能会导致结果出现不一致。

**参数：**
| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `ref` | string | 设置的值 |


### `use(plugin)`

使用插件。

插件为一个函数，以索引构建器(builder)作为上下文调用。插件可以通过某种方式定制或扩展索引的行为。插件封装了构建索引时应该应用的自定义行为。

`plugin`函数将以索引构建器作为参数调用，在调用`use`时也可以传递其他参数。该函数将使用索引构建器作为其上下文来调用。


**参数：**
| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `plugin` | function | 插件 |
