import { useParams } from 'react-router-dom'
import { projects } from '../data/site.js'
import { PageHeader, CTA } from '../components/ui.jsx'
import Gallery from '../components/Gallery.jsx'
import NotFound from './NotFound.jsx'

// Optional per-project fields (add them in src/data/site.js on a project):
//   status:   'Completed' | 'Under construction' | 'At design stage' ...
//   features: ['Passenger lift', 'Basement parking', ...]   (falls back to the scope, split into points)
//   layout:   [{ name: 'Type A', beds: 2, baths: 2, area: '95 m²', count: 12 }, ...]   (residential)
//   value:    'KES 48.2M' (shown as the cost estimate)
const TBC = <span className="pd__tbc">To be confirmed</span>

export default function ProjectDetail() {
  const { slug } = useParams()
  const p = projects.find((x) => x.slug === slug)
  if (!p) return <NotFound />
  const residential = /resid/i.test(p.type || '')
  const features = p.features || (p.scope ? p.scope.split(/,\s*|\s+and\s+/).map((f) => f.replace(/\.$/, '')).filter(Boolean) : null)
  const facts = [['Sector', p.type], ['Year', p.year]].filter(([, v]) => v)
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.location || p.name)}`

  const rows = [
    { label: 'Project status', body: p.status ? <p className="pd__big">{p.status}</p> : TBC },
    { label: 'Project features', body: <>{p.description && <p>{p.description}</p>}{features?.length ? <ul className="pd__list">{features.map((f) => <li key={f}><i className="swheel__dot" aria-hidden="true" /><span>{f}</span></li>)}</ul> : !p.description && TBC}</> },
    residential && { label: 'Residence layout', body: p.layout?.length
      ? <div className="pd__units">{p.layout.map((u) => (
          <div className="pd__unit" key={u.name}><strong>{u.name}</strong><span>{[u.beds != null && `${u.beds} bed`, u.baths != null && `${u.baths} bath`, u.area, u.count != null && `${u.count} units`].filter(Boolean).join(' · ')}</span></div>
        ))}</div>
      : TBC },
    { label: 'Cost estimate', body: p.value ? <p className="pd__big">{p.value}</p> : TBC },
    { label: 'Location', body: <><p className="pd__big">{p.location}</p><a className="link-arrow" href={mapUrl} target="_blank" rel="noreferrer">Open in Google Maps</a></> },
  ].filter(Boolean)

  return (
    <>
      <PageHeader scene="project" compact title={p.name} intro={p.description} crumbs={[{ label: 'Projects', to: '/projects' }]} />
      <section className="section pd">
        <div className="container pd__split">
          <div className="pd__media">
            <Gallery images={p.images} name={p.name} />
          </div>
          <div className="pd__info">
            <h2 className="pd__h">Project details</h2>
            {facts.length > 0 && (
              <dl className="pd__facts-inline">{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            )}
            <div className="pd__rows">
              {rows.map((r, k) => (
                <div className="pd__row" key={r.label}>
                  <div className="pd__rowlabel"><span className="idx">{String(k + 1).padStart(2, '0')}</span><h3>{r.label}</h3></div>
                  <div className="pd__rowbody">{r.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  )
}
