import { existsSync, mkdirSync, writeFileSync } from 'fs'

// 2025-1-1
function GetCurrentDateString() {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`
}

const DefaultArticleSchemaString = `---
id: ""
category: ["general"]
order: 1

meta:
    title: ""
    description: ""
    author: "kai-orion"
    keywords: []
    createdAt: ${GetCurrentDateString()}
    publishedAt: ${GetCurrentDateString()}
    updatedAt: ${GetCurrentDateString()}
    language: "zh_Hant"

hasOverview: false
overview: ""

status:
    isDraft: false
    isVisible: true
    isFeatured: false

hasCover: false
cover:
    image: null
    alt: ""

related: []
references: []
---
`

if(!existsSync('./src/content/articles')) {
    mkdirSync('./src/content/articles')
}

writeFileSync('./src/content/articles/template.mdx', DefaultArticleSchemaString, { flag: 'a', encoding: 'utf-8' })
