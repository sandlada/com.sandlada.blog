import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { readFile } from "fs/promises"
import { glob } from "glob"
import { contentType } from 'mime-types'
import { dirname, normalize, relative, resolve } from "path"
import { fileURLToPath } from 'url'
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

const __dirname = dirname(fileURLToPath(import.meta.url))
const baseDir = resolve(__dirname, process.env.articleRootPath)

async function syncBlogContent() {
    const files = await glob(`${baseDir}/**/*`, {
        nodir: true,
    })

    if (files.length === 0) return
    console.log(`== Found ${files.length} files to sync.`)

    const uploadPromises = files.map(async (filePath) => {
        const key = normalize(relative(baseDir, filePath))
        try {
            const fileContent = await readFile(filePath, { encoding: 'utf-8', })
            await app.send(new PutObjectCommand({
                Bucket: 'articles',
                Key: key,
                Body: fileContent,
                ContentType: contentType(filePath),
              }))
            console.log(`= Uploaded File: ${key}`)
        } catch (err) {
            console.error(`== Failed to upload ${filePath}:`, err)
        }
    })

    return Promise.all(uploadPromises)
}

console.log("== Starting sync of articles to R2.");
await syncBlogContent()
console.log("== Sync completed successfully.")