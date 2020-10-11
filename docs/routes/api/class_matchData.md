---
title: 类 MatchData
sidebarDepth: 3
---

# Class: MatchData

[英文原地址](https://lunrjs.com/docs/lunr.MatchData.html)

## lunr.MatchData(term, field, metadata)

### `new MatchData(term, field, metadata)`

包括且收集关于匹配文档的元数据。`lunr.MatchData`单个实例作为每个`lunr.Index~Result`的一部分返回。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `term` | string | 与匹配数据相关联的关键词。|
| `field` | string | 发现关键词的字段。|
| `metadata` | object | 在此字段中记录的关于此关键词的元数据。|

| 对象属性名 | 类型 | 描述 |
|:---:|:---:|----|
| `metadata` | object | 与此文档相关联的元数据的克隆集合。|

## 方法

### `add(term, field, metadata)`

将关键词字段对的元数据添加到该匹配数据实例中。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `term` | string | 与匹配数据相关联的关键词。|
| `field` | string | 发现关键词的字段。|
| `metadata` | object | 在此字段中记录的关于此关键词的元数据。|

### `combine(otherMatchData)`

将为与文档匹配的每个术语创建一个`lunr.MatchData`实例。然而，在`lunrIndex~Result`中只需要一个实例。该方法将来自另一个lunr.MatchData实例的元数据与此对象元数据组合在一起。

[lunr.MatchData]:https://lunrjs.com/docs/lunr.MatchData.html

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|
| `otherMatchData` | [lunr.MatchData][lunr.MatchData] | 与该匹配数据合并的另一个实例。 |