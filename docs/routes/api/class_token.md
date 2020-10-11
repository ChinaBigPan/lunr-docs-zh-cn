---
title: 类 Token
sidebarDepth: 2
---

# Class:Token

[英文原地址](https://lunrjs.com/docs/lunr.Token.html)

## lunr.Token(str?, metadata?)`

### `new Token(str?, metadata?)`

关键词在通过文本处理管道传递时包装了的关键词的字符串表示。

| 参数名 | 类型 | 属性 | 默认 | 描述 |
|:---:|:---:|:---:|:---:|----|
| `str` | string | 可选 | `""` | 要被包装的字符串关键词。|
| `metadata` | object | 可选 | `{}` | 与该标记关联的元数据。 |

## 方法

### `clone(fn?) → {lunr.Token}`

创建该关键词的克隆。可以传入一个函数，作用于被克隆的关键词。

[lunr.Token~updateFunction]:https://lunrjs.com/docs/lunr.Token.html#~updateFunction

| 参数名 | 类型 | 属性 | 描述 |
|:---:|:---:|:---:|----|
| `fn` | [lunr.Token~updateFunction][lunr.Token~updateFunction] | 可选 | 应用于被克隆的关键词的函数。|

### `toString() → {string}`

返回被此对象包裹的关键词字符串。

### `update(fn) → {lunr.Token}`

将给定的函数应用于包裹好的字符串关键词。

| 参数名 | 类型 | 属性 | 描述 |
|:---:|:---:|:---:|----|
| `fn` | [lunr.Token~updateFunction][lunr.Token~updateFunction] | 可选 | 应用于被克隆的关键词的函数。|

**例子：**

```js
token.update(function (str, metadata) {
  return str.toUpperCase()
})
```

## 类型定义

### `updateFunction(str, metadata)`

在更新关键词时或在克隆关键词时(可选)使用的更新函数。

| 参数名 | 类型 |  描述 |
|:---:|:---:|----|
| `str` | string | 代表关键词的字符串 |
| `metadata` | Object | 与关键词相关的所有元数据 |