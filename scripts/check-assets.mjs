import { readdir, readFile, access } from 'node:fs/promises'
import path from 'node:path'
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat()
}
const files = [...await walk('src'), 'index.html']
const assets = new Set()
for (const file of files) {
  const text = await readFile(file, 'utf8')
  for (const match of text.matchAll(/['"](\/media\/[^'"\s]+)['"]/g)) assets.add(match[1])
}
let missing = 0
for (const asset of assets) {
  try { await access(`public${asset}`) }
  catch { console.error(`Missing local asset: ${asset}`); missing++ }
}
if (missing) process.exitCode = 1
else console.log(`Verified ${assets.size} local asset references.`)
