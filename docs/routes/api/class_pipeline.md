---
title: 类 Pipeline
sidebarDepth: 3
---

# Class:Pipeline

[英文原地址](https://lunrjs.com/docs/lunr.Pipeline.html)

## lunr.Pipeline()

### `new Pipeline()`

`lunr.Pipeline`维护一个有序的函数列表，文档中输入搜索索引的所有关键词以及针对该索引运行的查询都会应用到这些函数。

使用 lunr 快捷方式创建的`lunr.Index`实例将包含一个函数管道，其中包含停止词过滤器和英语词干提取器。额外函数可以添加到这些函数之前或之后，也可以删除这些默认函数。

运行时，函数管道将依次调用每个函数，传入关键词、关键词在所有关键词的原始列表中的索引，最后在传入所有原始的关键词列表。

管道中函数的输出将被传递给管道中的下一个函数。函数应该返回`undefined`以从索引中排除关键词，管道的其余部分在调用时将不会使用该关键词。

为了使管道序列化工作，管道实例中使用的所有的函数都应该在`lunr.Pipeline`中注册。然后就可以加载注册的函数了。如果想要加载使用未注册函数的序列化管道，将抛出错误。

如果不打算序列化管道，那么就没有必要注册管道函数。

## 方法

### `load(serialised) → {lunr.Pipeline}` <Badge text="static" />

加载前一个序列化管道。

所有要加载的函数必须已经在`lunr.Pipeline`中注册。如果来自序列化数据的任何函数没有注册，则会抛出一个错误。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `serialised` | Object | 要加载的序列化函数管道。 |

### `registerFunction(fn, label)` <Badge text="static" />

在管道中注册一个函数。

如果管道需要序列化，或者序列化的管道需要加载，则应该注册管道中使用的函数。

注册一个函数并不会将其添加到管道中，函数仍然必须添加到管道的实例中，以便在运行管道时使用。

### `add(functions)`

将新函数添加到管道的末尾。

如果函数没有被注册将抛出警告。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `functions` | | 要添加到管道中的任意数量的函数。|

### `after(existingFn, newFn)`

在管道中已经存在的函数之后添加单个函数。

如果函数没有被注册将抛出警告。

[lunr.PipelineFunction]:https://lunrjs.com/docs/lunr.PipelineFunction.html

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `existingFn` | [lunr.PipelineFunction][lunr.PipelineFunction] | 管道中已经存在的函数。 |
| `existingFn` | [lunr.PipelineFunction][lunr.PipelineFunction] | 要添加到管道中的新函数。 |

### `before(existingFn, newFn)`

在管道中已经存在的函数之前添加一个函数。

如果函数没有被注册将抛出警告。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `existingFn` | [lunr.PipelineFunction][lunr.PipelineFunction] | 管道中已经存在的函数。 |
| `newFn` | [lunr.PipelineFunction][lunr.PipelineFunction] | 要添加到管道中的新函数。 |

### `remove(fn)`

从管道中删除一个函数。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `fn` | [lunr.PipelineFunction][lunr.PipelineFunction] | 要从管道中删除的函数。 |

### `reset()`

通过删除任何现有处理器重置函数管道。


### `run(tokens) → {Array}`

根据传递的关键词运行组成管道的当前函数列表。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `tokens` | Array | 要通过函数管道运行的关键词。|

### `runString(str, metadatanullable) → {}`

通过管道传递字符串并将字符串输出的简便方法。该方法负责将传入的字符串包装在关键词中，并将结果关键词映射回字符串。

| 参数名 | 类型 | 属性 | 描述 |
|:---:|:---:|---|----|
| `str` | string | | 要通过管道的字符串。|
| `metadata` | object | 可空 | 可选参数，元数据，用于与传递给管道的关键词相关联。 |

### `toJSON() → {Array}`

返回准备进行序列化的管道的表示形式。

如果函数没有被注册将抛出警告。
