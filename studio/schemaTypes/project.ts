import { defineArrayMember, defineField, defineType } from 'sanity'

export const PROJECT_TYPES = ['Residential', 'Commercial', 'Hospitality', 'Industrial', 'Institutional', 'Architecture', 'Engineering', 'Environmental']
export const STATUSES = ['At design stage', 'Awaiting approvals', 'Under construction', 'Completed']

// A residence / unit type (shown on residential projects as “Residence layout”)
export const unit = defineType({
  name: 'unit',
  title: 'Unit type',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', description: 'For example “Type A” or “3-bedroom maisonette”.', validation: (r) => r.required() }),
    defineField({ name: 'beds', title: 'Bedrooms', type: 'number' }),
    defineField({ name: 'baths', title: 'Bathrooms', type: 'number' }),
    defineField({ name: 'area', title: 'Floor area', type: 'string', description: 'For example “95 m²”.' }),
    defineField({ name: 'count', title: 'Number of units', type: 'number' }),
  ],
  preview: { select: { title: 'name', beds: 'beds', area: 'area' }, prepare: ({ title, beds, area }) => ({ title, subtitle: [beds != null && `${beds} bed`, area].filter(Boolean).join(' · ') }) },
})

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'details', title: 'Details' },
    { name: 'gallery', title: 'Gallery' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Project name', type: 'string', group: 'basics', validation: (r) => r.required().max(100) }),
    defineField({ name: 'slug', title: 'Web address (slug)', type: 'slug', group: 'basics', options: { source: 'name', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'type', title: 'Sector', type: 'string', group: 'basics', options: { list: PROJECT_TYPES }, initialValue: 'Residential', validation: (r) => r.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string', group: 'basics', description: 'Area and county, for example “Runda, Kiambu County”. Used for the map link.', validation: (r) => r.required() }),
    defineField({ name: 'year', title: 'Year', type: 'number', group: 'basics', validation: (r) => r.integer().min(1990).max(2100) }),
    defineField({ name: 'order', title: 'Display order', type: 'number', group: 'basics', description: 'Lower numbers appear first. Leave empty to sort newest first.' }),
    defineField({ name: 'status', title: 'Project status', type: 'string', group: 'details', options: { list: STATUSES } }),
    defineField({ name: 'description', title: 'Short description', type: 'string', group: 'details', description: 'One line, shown under the project name and on cards.', validation: (r) => r.max(160) }),
    defineField({ name: 'features', title: 'Project features', type: 'array', group: 'details', of: [{ type: 'string' }], description: 'One short line per feature. Shown as a bulleted list.' }),
    defineField({ name: 'scope', title: 'Scope of work', type: 'text', rows: 3, group: 'details', description: 'Used when no features are listed.' }),
    defineField({ name: 'layout', title: 'Residence layout', type: 'array', group: 'details', of: [defineArrayMember({ type: 'unit' })], hidden: ({ document }) => document?.type !== 'Residential' }),
    defineField({ name: 'value', title: 'Cost estimate', type: 'string', group: 'details', description: 'For example “KES 25M”. Leave empty to show “To be confirmed”.' }),
    defineField({
      name: 'images',
      title: 'Gallery',
      type: 'array',
      group: 'gallery',
      description: 'The first image is the project thumbnail. Drag to reorder.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Describe the image', type: 'string', description: 'For example “Four-storey residential block, Kilimani, completed 2024”.' })],
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  orderings: [
    { title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }, { field: 'year', direction: 'desc' }] },
    { title: 'Newest first', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
  preview: { select: { title: 'name', subtitle: 'location', media: 'images.0' } },
})
