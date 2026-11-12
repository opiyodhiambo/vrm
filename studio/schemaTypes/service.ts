import { defineField, defineType } from 'sanity'

// Keep in step with the website's icon set (src/components/Icon.jsx)
export const ICONS = [
  { title: 'Floor plan', value: 'plan' },
  { title: 'Building / structure', value: 'structure' },
  { title: 'Electrical', value: 'bolt' },
  { title: 'Leaf (environment)', value: 'leaf' },
  { title: 'Road', value: 'road' },
  { title: 'Layers (ground / materials)', value: 'layers' },
  { title: 'Survey / scan', value: 'scan' },
  { title: 'Shield (safety / review)', value: 'shield' },
  { title: 'Clipboard (QS / cost)', value: 'clipboard' },
  { title: 'Hard hat (construction)', value: 'hardhat' },
  { title: 'Interior', value: 'interior' },
  { title: 'Pin (location)', value: 'pin' },
]

export const STAGES = [
  { title: '01 · Plan & Approve', value: 'plan-approve' },
  { title: '02 · Design', value: 'design' },
  { title: '03 · Build', value: 'build' },
  { title: '04 · Manage', value: 'manage' },
]

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fieldsets: [{ name: 'placement', title: 'Where it appears', options: { columns: 2 } }],
  fields: [
    defineField({ name: 'title', title: 'Service name', type: 'string', validation: (r) => r.required().max(80) }),
    defineField({
      name: 'slug',
      title: 'Web address (slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Generated from the name. It is used in the “Request this service” link, so avoid changing it once published.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'summary',
      title: 'One-sentence summary',
      type: 'text',
      rows: 3,
      description: 'Shown under the service name when it is in focus on the Services page.',
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: 'points',
      title: 'What’s included',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'One short line per item. Shown as a bulleted list on the Services page.',
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: 'stage', title: 'Project stage', type: 'string', fieldset: 'placement', options: { list: STAGES, layout: 'radio' }, initialValue: 'design', validation: (r) => r.required() }),
    defineField({ name: 'icon', title: 'Icon', type: 'string', fieldset: 'placement', options: { list: ICONS }, initialValue: 'structure' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', fieldset: 'placement', description: 'Lower numbers appear first within the stage.', initialValue: 100 }),
  ],
  orderings: [
    { title: 'Stage, then order', name: 'stageOrder', by: [{ field: 'stage', direction: 'asc' }, { field: 'order', direction: 'asc' }] },
    { title: 'Name A–Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'stage' },
    prepare: ({ title, subtitle }) => ({ title, subtitle: STAGES.find((s) => s.value === subtitle)?.title || subtitle }),
  },
})
