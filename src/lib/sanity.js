import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// Set these in web/.env (or the Render environment). While the ID is a placeholder or empty, the site
// uses the content in src/data/site.js instead of calling Sanity.
const projectId = (import.meta.env.VITE_SANITY_PROJECT_ID || '').trim()
const dataset = (import.meta.env.VITE_SANITY_DATASET || 'production').trim()

export const sanityConfigured = !!projectId && projectId !== 'YOUR_SANITY_PROJECT_ID'

export const client = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: true, perspective: 'published' })
  : null

const builder = client ? createImageUrlBuilder(client) : null
export const imageUrl = (source, width = 1600) => (builder ? builder.image(source).width(width).auto('format').fit('max').url() : '')
