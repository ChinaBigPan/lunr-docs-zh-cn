---
title: 类 Vector
sidebarDepth: 2
---

# Class:Vector

[英文原地址](https://lunrjs.com/docs/lunr.Vector.html)

## lunr.Vector(elements?)

### `new Vector(elements?)`

向量用于构造文档和查询的向量空间。这些向量支持确定两个文档或文档与查询之间的相似性的操作。

通常初始化向量不需要参数，但是在加载以前的向量的情况下，可以向构造函数提供原始元素。

出于性能考虑，向量是用平面数组实现的，其中元素索引紧跟着它的值。例如:`[索引，值，索引，值]`。这么做让底层数组尽可能稀疏，并且在用于向量计算时仍然提供良好的性能。

| 参数名 | 类型 | 属性 | 描述 |
|:---:|:---:|:---:|----|
| `elements` || 可选 | 元素索引和元素值对的列表。 |

## 方法

### `dot(otherVector) → {Number}`

计算该向量和另一个向量的点积。

[lunr.Vector]:https://lunrjs.com/docs/lunr.Vector.html

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `otherVector` | [lunr.Vector][lunr.Vector] | 计算点积的向量。 |

### `insert(insertIdx, val)`

在向量的索引处插入一个元素。

不允许重复元素出现，如果已经有该索引的条目则会抛出错误。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `insertIdx` | Number | 应该插入元素的索引。 |
| `val` | Number | 要插入到向量中的值。 |

### `upsert(insertIdx, val, fn)`

插入或更新向量中的现有索引。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `insertIdx` | Number | 应该插入元素的索引。 |
| `val` | Number | 要插入到向量中的值。 |
| `fn` | function | 为更新而调用的函数，现有索引和要更新的索引会以参数形式传入。 |

### `magnitude() → {Number}`

计算这个向量的大小。

### `positionForIndex(insertIdx) → {Number}`

计算要插入传入索引向量中的位置。

内部在使用`insert`和`upsert`时会使用它。如果有重复的索引，和要更新该索引的值一样返回该位置，但是调用方负责检查该索引上是否有重复的索引。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `insertIdx` | Number | 应该插入元素的索引。|

### `similarity(otherVector) → {Number}`

计算该向量和另一个向量之间的相似性。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `otherVector` | [lunr.Vector][lunr.Vector] | 要计算相似程度的另一个向量。|

### `toArray() → {}`

将向量转换为由向量中元素组成的数组。

### `toJSON() → {}`

向量的 JSON 可序列化表示。