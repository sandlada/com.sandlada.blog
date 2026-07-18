import { GetObjectCommand, ListObjectsCommand, S3Client } from '@aws-sdk/client-s3';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, parse, sep, resolve } from 'node:path';
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

const baseDir = resolve(process.env.articleRootPath)

for (const fileInR2DB of fileList) {
    requestArray.push(new Promise((res, reject) => app.send(new GetObjectCommand({ Bucket: 'articles', Key: fileInR2DB.Key }))
        .then(res => res.Body.transformToByteArray())
        .then(arr => {
            const targetPath = resolve(baseDir, fileInR2DB.Key)

            // SECURITY: Prevent Path Traversal by ensuring the resolved target path
            // remains within the intended base directory.
            if (!targetPath.startsWith(baseDir + sep) && targetPath !== baseDir) {
                console.error(`= Security Error: Attempted path traversal for key: ${fileInR2DB.Key}`)
                return reject(new Error('Path Traversal Attempt Detected'))
            }

            const articleFileConfig = parse(targetPath)
            mkdirSync(articleFileConfig.dir, { recursive: true, })
            writeFileSync(`${articleFileConfig.dir}${sep}${articleFileConfig.base}`, arr, {encoding: 'utf-8', flag: 'w+'})
            console.log(`= Downloaded Successfully: ${articleFileConfig.dir}${sep}${articleFileConfig.base}`)
            res()
        })
        .catch((e) => {
            console.log(e)
            reject(e)
        })
    ))
}

await Promise.all(requestArray)

console.log('== ALL DONE')