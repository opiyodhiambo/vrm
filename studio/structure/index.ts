import type { StructureResolver } from 'sanity/structure'

// Left-hand navigation: only the two content types the website uses.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().title('Services').id('services').child(S.documentTypeList('service').title('Services').defaultOrdering([{ field: 'stage', direction: 'asc' }, { field: 'order', direction: 'asc' }])),
      S.listItem().title('Projects').id('projects').child(S.documentTypeList('project').title('Projects').defaultOrdering([{ field: 'order', direction: 'asc' }, { field: 'year', direction: 'desc' }])),
    ])
