---
title: 类 Set
sidebarDepth: 3
---

# Class:Set

## lunr.Set()

[英文原地址](https://lunrjs.com/docs/lunr.Set.html)

### `new Set()`

lunr 集合。

## 属性

[lunr.Set]:https://lunrjs.com/docs/lunr.Set.html

### `complete: lunr.Set` <Badge text="static" /> <Badge text="readonly" type="error" />

包含所有元素的完整集合。

### `empty: lunr.Set` <Badge text="static" /> <Badge text="readonly" type="error" />

不包含元素的空集合。

## 方法

### `contains(object) → {boolean}`

如果集合包含了指定的对象，则返回`true`。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `object` | object | 要测试其在该集合中是否存在的对象。|

### `intersect(other) → {lunr.Set}`

返回一个新的集合，该集合只包含此集合和指定集合中存在的元素，即交集。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `other` | [lunr.Set][lunr.Set] | 要与该集合计算交集的集合。|

### `union(other) → {lunr.Set}`

返回一个新集合，其中包含该集合的元素和指定集合的元素，即并集。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `other` | [lunr.Set][lunr.Set] | 要与该集合合并的集合。|

