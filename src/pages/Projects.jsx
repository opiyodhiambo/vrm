import { useState } from 'react'
import { projects } from '../data/site.js'
import { PageHeader, CTA, ProjectCard } from '../components/ui.jsx'

const types = ['All', ...new Set(projects.map((p) => p.type))]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const list = filter === 'All' ? projects : projects.filter((p) => p.type === filter)
  return (
    <>
      <PageHeader scene="projects" title="Our Projects" intro="Residential apartments, homes, hospitality and industrial work across Nairobi and surrounding counties." />
      <section className="section">
        <div className="container">
          <div className="filters">
            {types.map((t) => <button key={t} className={t === filter ? 'on' : ''} onClick={() => setFilter(t)}>{t}</button>)}
          </div>
          <div className="grid grid--3">{list.map((p) => <ProjectCard key={p.slug} project={p} />)}</div>
        </div>
      </section>
      <CTA />
    </>
  )
}
