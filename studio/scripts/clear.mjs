// Deletes ALL documents of the given type(s), published and drafts. Irreversible.
//   npm run clear -- project            (shows what would be deleted)
//   npm run clear -- project --yes      (deletes)
//   npm run clear -- project service --yes
// Needs SANITY_WRITE_TOKEN in studio/.env. Uploaded images stay in the media library (harmless; Sanity
// removes unused ones from billing, and re-importing re-uses nothing, so delete them there if you want).
import { createClient } from '@sanity/client'

const types = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const yes = process.argv.includes('--yes')
const allowed = ['project', 'service']
const bad = types.filter((t) => !allowed.includes(t))
if (!types.length || bad.length) { console.error(`Usage: npm run clear -- <${allowed.join('|')}> [more types] [--yes]`); process.exit(1) }

const { SANITY_STUDIO_PROJECT_ID: projectId, SANITY_STUDIO_DATASET: dataset = 'production', SANITY_WRITE_TOKEN: token } = process.env
if (!projectId || !token) { console.error('Set SANITY_STUDIO_PROJECT_ID and SANITY_WRITE_TOKEN in studio/.env first.'); process.exit(1) }
const client = createClient({ projectId, dataset, token, apiVersion: '2025-01-01', useCdn: false })

const filter = `_type in $types`
const count = await client.fetch(`count(*[${filter}])`, { types })
console.log(`${count} document(s) of type ${types.join(', ')} in "${dataset}".`)
if (!yes) { console.log('Nothing deleted. Add --yes to delete them.'); process.exit(0) }
await client.delete({ query: `*[${filter}]`, params: { types } })
console.log('Deleted.')
