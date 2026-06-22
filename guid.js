import { nanoid } from 'nanoid'
import { writeFile } from 'node:fs/promises'

let ids = []

for (let i = 0; i < 20; i++) {
    const id = nanoid()
    ids.push(id)
}


writeFile('./ids.txt', ids.join('\n'), 'utf-8')
