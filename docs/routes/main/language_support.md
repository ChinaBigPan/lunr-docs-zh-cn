---
title: 支持的语音
sidebarDepth: 3
---

# 支持的语言

[英文原地址](https://lunrjs.com/guides/language_support.html)

Lunr 对英文文档的索引和搜索提供全面的支持。如果你的文档是其他语言，你需要安装 Lunr 语言插件来获得最好的搜索结果。目前支持下列语言:

- German 德语
- Danish 丹麦语
- Spanish 西班牙语
- Finnish 芬兰语
- French 法语
- Hungarian 匈牙利语
- Italian 意大利语
- Japanese 日语
- Dutch 荷兰语
- Norwegian 挪威语
- Portuguese 葡萄牙语
- Romanian 罗马尼亚语
- Russian 俄语
- Thai 泰语

## 安装

首先，安装`lunr-languages`包：

```shell
npm install lunr-languages
```

接下来加载`lunr.stemmer.support`插件和合适的语言扩展，它们由[ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)语言代码识别。

下面是设置法语插件的示例，并在定义索引时使用它:

```js
var lunr = require("lunr")
require("lunr-languages/lunr.stemmer.support")(lunr)
require("lunr-languages/lunr.fr")(lunr)

var idx = lunr(function () {
  this.use(lunr.fr)
  this.ref('id')
  this.field('text')

  this.add({
    id: 1,
    text: "Ceci n'est pas une pipe"
  })
})

idx.search('pipe')
```

## 多语言内容

如果文档使用一种以上的语言，您仍然可以通过使用`lunr.multiLanguage`插件(`lunr-languages`包内置了)来结合两种及以上的语言并将它们一同索引。

下面是设置英语和德语的示例：

```js
var lunr = require("lunr")
require("lunr-languages/lunr.stemmer.support")(lunr)
require('lunr-languages/lunr.multi')(lunr)
require("lunr-languages/lunr.de")(lunr)

var idx = lunr(function () {
  this.use(lunr.multiLanguage('en', 'de'))
})
```