function getMainRoute() {
    return ['', 'core_concepts', 'searching', 'upgrading', 'prebuilding_indexes']
}

function getApiRoute() {
    return ['', 
    'class_builder', 
    'class_index', 
    'class_matchData', 
    'class_pipeline', 
    'class_query', 
    'class_set', 
    'class_token', 
    'class_tokenSet', 
    'class_vector',
    'namespace_lunr',
    'namespace_utils',
    'interfaces_pipelinefunction',
    'global'
    ]
}




module.exports= {
    title: 'Lunr.js',
    description: "Lunr.js 是轻量级 JavaScript 全文搜索引擎。它为文档建立索引，并提供简单的搜索界面来检索与文本查询最匹配的文档，对于一些小型的博客、开发者文档来说，可以实现站内离线搜索。",
    base: '/lunr-docs-zh-cn/',
    markdown: {
        lineNumbers: true,
        anchor: {
            permalink: false
        }
    },
    themeConfig: {
        activeHeaderLinks: true,
        displayAllHeaders: false,
        logo: "/images/logo.png",
        nav: [
			{
                text: "大笑文档",
                link: "http://www.febeacon.com"
            },
            {
                text: "文档首页",
                link: "/"
            },
            {
                text: "API",
                link: "/routes/api/"
            }
        ],
        sidebar: {
            '/routes/main/': getMainRoute(),
            '/routes/api/': getApiRoute()
        }
    },
    head: [
        ["link", {
            rel: "icon", href: "/images/favicon.ico"
        }]
    ]
}