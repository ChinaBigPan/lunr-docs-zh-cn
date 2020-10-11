---
title: 预构建索引
sidebarDepth: 3
---

# 预构建索引

[英文原地址](https://lunrjs.com/guides/index_prebuilding.html)

对于大量的文档，Lunr 需要花费时间来建立索引。建立索引所花费的时间会导致浏览器阻塞，从而降低用户体验。

更好的方法是预先构建索引，并提供一个序列化的索引，Lunr 可以更快地在客户端加载该索引。

这种技术对于大量索引或静态文档(比如静态网站)非常有用。

## 序列化

lunr 索引支持 JSON 序列化。假设已经创建了索引，您可以使用内置的 JSON 对象进行序列化：

```js
var serializedIdx = JSON.stringify(idx)
```

然后，我们可以将这个序列化的索引写入文件、压缩并与其他静态资源一同提供。

下面的示例是一个可用于构建序列化索引的脚本。它假设文档在标准输入流(STDIN)中为可用的 JSON 格式，并且具有`title`和`body`字段以及用于引用的`id`。

```js
var lunr = require('lunr'),
    stdin = process.stdin,
    stdout = process.stdout,
    buffer = []

stdin.resume()
stdin.setEncoding('utf8')

stdin.on('data', function (data) {
  buffer.push(data)
})

stdin.on('end', function () {
  var documents = JSON.parse(buffer.join(''))

  var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
      this.add(doc)
    }, this)
  })

  stdout.write(JSON.stringify(idx))
})
```

假设上面的脚本在当前目录下一个名为`build-index.js`的文件中，我们可以使用它从标准输入流中创建一个 JSON 序列化的索引：

```shell
$ echo '[{ "id": "1", "title": "Foo", "body": "Bar" }]' | node build-index.js > index.json
```

## 加载

加载一个序列化索引要比从头构建索引快得多。假设一个名为`data`的变量包含了序列化索引，那么我们这样加载：

```js
var idx = lunr.Index.load(JSON.parse(data))
```

