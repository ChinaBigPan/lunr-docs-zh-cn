---
title: 类 TokenSet
sidebarDepth: 3
---

# Class: TokenSet

[英文原地址](https://lunrjs.com/docs/lunr.TokenSet.html)

## lunr.TokenSet()

### `new TokenSet()`

关键词集是用于存储索引中所有关键词的唯一列表。关键词集还用于表示对索引的查询，然后将该查询关键词集和索引关键词集取交集，以在倒排索引中查找要查找的关键词号。

关键词集合可以包含一个或多个关键词。

另外，关键词集用于执行通配符匹配。它支持前置、后置和包含通配符，还可以匹配编辑距离。

关键词集是一个最小的有限状态自动机，其中关键词之间共享公共前缀和后缀。这有助于减少用于存储关键词集的空间。

## 方法

### `fromArray(arr) → {lunr.TokenSet}` <Badge text="static" />

根据传入的已排序词汇数组创建`TokenSet`实例。


| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `arr` |  | 要从中创建集合的排好序的字符串数组。|

如果传入的数组不是已排序数组则会抛出错误。

[lunr.Vector]:https://lunrjs.com/docs/lunr.Vector.html

### `fromFuzzyString(str, editDistance) → {lunr.Vector}` <Badge text="static" />

创建表示带有指定编辑距离的单个字符串的关键词集。

插入、删除、替换和调换都被视为编辑距离为`1`。

增加编辑距离将对创建和交叉这些关键词集的性能产生巨大的影响。建议编辑距离小于`3`。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `str` | string | 要从中创建关键词集的字符串。 |
| `editDistance` | number | 用以匹配的允许编辑距离。 |

### `fromString(str) → {lunr.TokenSet}` <Badge text="static" />

从字符串创建关键词集。

字符串可以包含一个或多个通配符(*)，当与另一个关键词集相交时，这些通配符将允许进行通配符匹配。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `str` | string | 用来创建关键词集的字符串。|

### `intersect(b) → {lunr.TokenSet}`

返回一个新的关键词集，它是这个关键词集和传入关键词集的交集。

这个交集将考虑到关键词集中包含的所有通配符。

[lunr.TokenSet]:https://lunrjs.com/docs/lunr.TokenSet.html

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `b` | [lunr.TokenSet][lunr.TokenSet] | 要与之相交的另一个关键词集。|

### `toArray() → {}`

将此关键词集转换为关键词集中包含的字符串数组。

这并不会应用于包含通配符的关键词集，在结果是`undefined`的情况下可能会导致无限循环。

### `toString() → {string}`

生成关键词集的字符串表示形式。

这是为了允许关键词集在对象中作为键来使用，很大程度上帮助构造并最小化关键词集。因此，它并不是为方便人类理解关键词集而设计的。