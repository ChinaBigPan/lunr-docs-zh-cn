---
title: 接口 PipelineFunction
sidebarDepth: 2
---

# Interface: PipelineFunction

[英文原地址](https://lunrjs.com/docs/lunr.PipelineFunction.html)

## lunr.PipelineFunction

将`lunr.Token`映射到`lunr.Token`的管道函数。`lunr.Token`包含了关键词字符串及所有已知的元数据。管道函数可以更改关键词字符串或更改(或添加)传入关键词的元数据。

管道函数可以通过返回`null`、`undefined`或空字符串来丢弃传入的关键词。此关键词不会传递给任何下游的管道函数，也不会添加到索引中。

可以通过返回一个关键词数组的方式返回多个关键词。每个关键词都会传给下游的管道函数，所有将返回的关键词都会被添加到索引当中。

可以使用`lunr.Pipeline`将任意数量的管道函数链接在一起。