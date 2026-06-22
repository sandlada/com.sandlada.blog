import { existsSync, mkdirSync, writeFileSync } from 'fs'

// 2025-1-1
function GetCurrentDateString() {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`
}

const DefaultArticleSchemaString = `---
category: "general"
part: -1

meta:
    title: ""
    description: ""
    author: "kai-orion"
    keywords: []
    publishTime: ${GetCurrentDateString()}

hasOverview: false
overview: ""

status:
    isDraft: false
    isVisible: true
    isFeatured: false

cover:
    image: null
    alt: ""
---
`

if(!existsSync('./src/content/articles')) {
    mkdirSync('./src/content/articles')
}

writeFileSync('./src/content/articles/template.mdx', DefaultArticleSchemaString, { flag: 'a', encoding: 'utf-8' })
