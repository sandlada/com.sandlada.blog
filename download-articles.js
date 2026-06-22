import { GetObjectCommand, ListObjectsCommand, S3Client } from '@aws-sdk/client-s3';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, parse, sep } from 'node:path';
import { loadEnvFile } from 'node:process'

loadEnvFile('.env')

const app = new S3Client({
    region: "auto",
    endpoint: process.env.endPoint,
    credentials: {
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
    },
})

const fileList = (await app.send(new ListObjectsCommand({ Bucket: 'articles' }))).Contents
const requestArray = []

for (const fileInR2DB of fileList) {
    requestArray.push(new Promise((resolve, reject) => app.send(new GetObjectCommand({ Bucket: 'articles', Key: fileInR2DB.Key }))
        .then(res => res.Body.transformToByteArray())
        .then(arr => {
            const articleFileConfig = parse(join(process.env.articleRootPath, fileInR2DB.Key))
            mkdirSync(articleFileConfig.dir, { recursive: true, })
            writeFileSync(`${articleFileConfig.dir}${sep}${articleFileConfig.base}`, arr, {encoding: 'utf-8', flag: 'w+'})
            console.log(`= Downloaded Successfully: ${articleFileConfig.dir}${sep}${articleFileConfig.base}`)
            resolve()
        })
        .catch((e) => {
            console.log(e)
            reject()
        })
    ))
}

await Promise.all(requestArray)

console.log('== ALL DONE')