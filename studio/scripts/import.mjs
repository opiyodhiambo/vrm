// One-off import of the website's current services and projects into Sanity.
//   1. Put the real project ID and a write token in studio/.env (see .env.example)
//   2. npm run import            (add -- --dry first to see what would be created)
// Safe to re-run: documents use fixed IDs, so nothing is duplicated, and by default documents that already
// exist are LEFT ALONE (your Studio edits are kept). Add --overwrite to reset them to the original content.
// A document you deleted in the Studio will be created again, because it no longer exists.
// The project's confidential "client" field is deliberately NOT imported (the dataset is public).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
import * as site from '../../src/data/site.js'

const dry = process.argv.includes('--dry')
const overwrite = process.argv.includes('--overwrite')
const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN
const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public')

if (!dry && (!projectId || projectId === 'YOUR_SANITY_PROJECT_ID' || !token)) {
  console.error('Set SANITY_STUDIO_PROJECT_ID and SANITY_WRITE_TOKEN in studio/.env first (or run with --dry).')
  process.exit(1)
}
const client = dry ? null : createClient({ projectId, dataset, token, apiVersion: '2025-01-01', useCdn: false })

const stageOf = {}
site.stages.forEach((st) => st.services.forEach((slug) => { stageOf[slug] = st.id }))
const slugField = (v) => ({ _type: 'slug', current: v })
const key = (s) => s.replace(/[^a-z0-9]/gi, '').slice(-12) + Math.random().toString(36).slice(2, 6)

const uploaded = new Map()
async function uploadImage(webPath) {
  if (uploaded.has(webPath)) return uploaded.get(webPath)
  const file = path.join(publicDir, webPath.replace(/^\//, ''))
  if (!fs.existsSync(file)) { console.warn('  missing image', webPath); return null }
  if (dry) return { _type: 'reference', _ref: 'dry-run' }
  const asset = await client.assets.upload('image', fs.createReadStream(file), { filename: path.basename(file) })
  const ref = { _type: 'reference', _ref: asset._id }
  uploaded.set(webPath, ref)
  return ref
}

const docs = []

site.services.forEach((s, i) => {
  docs.push({
    _id: `service-${s.slug}`, _type: 'service',
    title: s.title, slug: slugField(s.slug), summary: s.summary, points: s.points,
    stage: stageOf[s.slug], icon: s.icon, order: (i + 1) * 10,
  })
})

for (const [i, p] of site.projects.entries()) {
  const own = [...new Set(p.ownImages || p.images)]
  const images = []
  for (const src of own) {
    const ref = await uploadImage(src)
    if (ref) images.push({ _type: 'image', _key: key(src), asset: ref, alt: `${p.name}, ${p.location}` })
  }
  docs.push({
    _id: `project-${p.slug}`, _type: 'project',
    name: p.name, slug: slugField(p.slug), type: p.type, location: p.location, year: p.year,
    description: p.description, scope: p.scope, value: p.value, images, order: (i + 1) * 10,
  })
}

console.log(`${dry ? 'Would import' : 'Importing'} ${docs.filter((d) => d._type === 'service').length} services and ${docs.filter((d) => d._type === 'project').length} projects`)
if (dry) { docs.slice(0, 2).forEach((d) => console.log(JSON.stringify(d).slice(0, 220))); process.exit(0) }
const tx = client.transaction()
docs.forEach((d) => (overwrite ? tx.createOrReplace(d) : tx.createIfNotExists(d)))
await tx.commit()
console.log(overwrite ? 'Done. Every document was reset to the original content.' : 'Done. Existing documents were left untouched; only missing ones were created.')
