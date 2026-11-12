import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { vrmTheme } from './theme'
import { Logo } from './components/Logo'

// (or set SANITY_STUDIO_PROJECT_ID in studio/.env).
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'bbl7h451'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'vrmengineering',
  title: 'VRM Engineering CMS',

  projectId,
  dataset,

  plugins: [structureTool({ structure }), visionTool()],

  schema: { types: schemaTypes },

  theme: vrmTheme,
  studio: { components: { logo: Logo } },
})
