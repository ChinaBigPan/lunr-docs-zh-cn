---
title: 命名空间 utils
sidebarDepth: 2
---

# Namespace:utils

[英文原地址](https://lunrjs.com/docs/lunr.utils.html)

## lunr.utils

包含 lunr 库其余工具部分的命名空间。

## 方法

### `asString(obj) → {String}` <Badge text="static" />

将对象转换为字符串。

在`null`和`undefined`情况下，函数返回空字符串，所有其他情况则返回对传递的对象调用`toString`的结果。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|----|
| `obj` | Any | 要转换为字符串的对象。|

### `warn(message)` <Badge text="static" />

在控制台中打印警告信息。

| 参数名 | 类型 | 描述 |
|:---:|:---:|----|----|
| `message` | String | 要打印的信息。|