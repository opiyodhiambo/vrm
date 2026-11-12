import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as site from '../data/site.js'
import { client, imageUrl, sanityConfigured } from './sanity.js'

// The single place the website gets services and projects from.
//  - Sanity configured: fetched from the CMS (and cached in the browser for instant repeat visits).
//  - Not configured, or the request fails: the content in src/data/site.js.

const SERVICES_QUERY = `*[_type == "service"] | order(order asc){ title, "slug": slug.current, summary, points, stage, icon, order }`
const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, year desc){ name, "slug": slug.current, type, location, year, status, description, scope, features, layout, value, "images": images[]{ alt, asset } }`
const CACHE_KEY = 'vrm-content-v1'
const TIMEOUT_MS = 2000

const STAGE_META = site.stages.map(({ id, n, title, icon, gets }) => ({ id, n, title, icon, gets }))

function buildStages(services) {
  return STAGE_META.map((m) => ({ ...m, services: services.filter((s) => s.stage === m.id).map((s) => s.slug) }))
}

function buildSitemap(services) {
  const link = (s) => ({ label: s.title, to: `/services/${s.slug}` })
  const half = Math.ceil(services.length / 2)
  return [
    site.sitemap[0],
    { heading: 'Services', links: services.slice(0, half).map(link) },
    { heading: 'More Services', links: services.slice(half).map(link) },
    site.sitemap[site.sitemap.length - 1],
  ]
}

function staticContent() {
  // services in the static file carry no `stage`; derive it from the static stage lists
  const stageOf = {}
  site.stages.forEach((st) => st.services.forEach((slug) => { stageOf[slug] = st.id }))
  const services = site.services.map((s) => ({ ...s, stage: stageOf[s.slug] }))
  return { services, projects: site.projects, stages: site.stages, sitemap: site.sitemap }
}

function fromSanity(rawServices, rawProjects) {
  const stageIndex = Object.fromEntries(STAGE_META.map((m, i) => [m.id, i]))
  const services = [...rawServices]
    .filter((s) => s.slug && s.title)
    .sort((a, b) => (stageIndex[a.stage] ?? 9) - (stageIndex[b.stage] ?? 9) || (a.order ?? 100) - (b.order ?? 100))
    .map((s) => ({ ...s, icon: s.icon || 'structure', points: s.points || [], summary: s.summary || '' }))
  const projects = rawProjects
    .filter((p) => p.slug && p.name)
    .map((p) => ({
      ...p,
      images: (p.images || []).filter((i) => i?.asset).map((i) => imageUrl(i)),
      features: p.features?.length ? p.features : undefined,
      layout: p.layout?.length ? p.layout : undefined,
    }))
    .filter((p) => p.images.length)
  return { services, projects, stages: buildStages(services), sitemap: buildSitemap(services) }
}

const ContentContext = createContext({ ...staticContent(), source: 'static' })
export const useContent = () => useContext(ContentContext)

function readCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null') } catch { return null }
}

export function ContentProvider({ children }) {
  const fallback = useMemo(staticContent, [])
  const cached = sanityConfigured ? readCache() : null
  const [state, setState] = useState(cached ? { ...cached, source: 'cache' } : { ...fallback, source: 'static' })
  const [ready, setReady] = useState(!sanityConfigured || !!cached)

  useEffect(() => {
    if (!sanityConfigured) return
    let alive = true
    const timer = setTimeout(() => alive && setReady(true), TIMEOUT_MS) // never block the site on the CMS
    Promise.all([client.fetch(SERVICES_QUERY), client.fetch(PROJECTS_QUERY)])
      .then(([rawServices, rawProjects]) => {
        if (!alive) return
        const next = fromSanity(rawServices, rawProjects)
        // The CMS answered, so it is the source of truth, even if a list is empty (a clean slate).
        // The built-in content is only used when the CMS cannot be reached at all.
        setState({ ...next, source: 'sanity' })
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(next)) } catch { /* private mode */ }
      })
      .catch((err) => {
        // Keep what we have, but say why. A 403 / CORS error here means this site's address is not in
        // sanity.io/manage > API > CORS origins.
        console.warn('[content] Could not load from Sanity, showing built-in content instead:', err?.message || err)
      })
      .finally(() => { clearTimeout(timer); alive && setReady(true) })
    return () => { alive = false; clearTimeout(timer) }
  }, [fallback])

  if (!ready) return <div className="content-splash" role="status" aria-live="polite"><span>Loading</span></div>
  return <ContentContext.Provider value={state}>{children}</ContentContext.Provider>
}
