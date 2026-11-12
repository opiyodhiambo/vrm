import { useState } from 'react'
import { useContent } from '../lib/content.jsx'
import { Link } from 'react-router-dom'
import { PageHeader, CTA } from '../components/ui.jsx'

export default function Projects() {
  const { projects } = useContent()
  const types = ['All', ...new Set(projects.map((p) => p.type).filter(Boolean))]
  const [filter, setFilter] = useState('All')
  const list = filter === 'All' ? projects : projects.filter((p) => p.type === filter)
  return (
    <>
      <PageHeader scene="projects" title="Our Projects" intro="Residential apartments, homes, hospitality and industrial work across Nairobi and surrounding counties." />
      <section className="section">
        <div className="container">
          <div className="legend" role="tablist" aria-label="Filter projects">
            <span className="legend__label">Filter</span>
            {types.map((t) => <button key={t} type="button" role="tab" aria-selected={t === filter} className={t === filter ? 'on' : ''} onClick={() => setFilter(t)}>{t}</button>)}
            <span className="legend__count">{list.length} {list.length === 1 ? 'project' : 'projects'}</span>
          </div>
          {list.length === 0 && <p className="lead" style={{ margin: 0 }}>Our projects will be listed here shortly.</p>}
          {list.length > 0 && <div className="lattice lattice--3">
            {list.map((p, n) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className="lattice__cell prj">
                <i className="mark" aria-hidden="true" />
                <div className="prj__img"><img src={p.images[0]} alt={`${p.name}, ${p.location}`} loading="lazy" /></div>
                <div className="prj__meta"><span className="idx">{String(n + 1).padStart(2, '0')}</span><span className="prj__type">{p.type}</span>{p.year && <span className="prj__year">{p.year}</span>}</div>
                <h3>{p.name}</h3>
                <p>{p.location}</p>
              </Link>
            ))}
            {Array.from({ length: (3 - (list.length % 3)) % 3 }).map((_, i) => (
              <div key={`fill-${i}`} className="lattice__cell lattice__cell--void" aria-hidden="true"><i className="mark" /></div>
            ))}
            <i className="mark mark--tr" aria-hidden="true" /><i className="mark mark--bl" aria-hidden="true" /><i className="mark mark--br" aria-hidden="true" />
          </div>}
        </div>
      </section>
      <CTA />
    </>
  )
}
