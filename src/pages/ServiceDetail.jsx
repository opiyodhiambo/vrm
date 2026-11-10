import { Link, useParams } from 'react-router-dom'
import { services, projects } from '../data/site.js'
import { PageHeader, CTA, ProjectCard } from '../components/ui.jsx'
import NotFound from './NotFound.jsx'

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = services.find((x) => x.slug === slug)
  if (!s) return <NotFound />
  return (
    <>
      <PageHeader title={s.title} intro={s.summary} crumbs={[{ label: 'Services', to: '/services' }]} />
      <section className="section">
        <div className="container split">
          <div>
            <h2>What's included</h2>
            <ul className="check-list">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <p style={{ marginTop: '1.5rem' }}>TODO: detailed description, process and deliverables for this service.</p>
          </div>
          <aside className="facts">
            <dl>
              <dt>Other services</dt>
              {services.filter((x) => x.slug !== s.slug).slice(0, 5).map((x) => (
                <dd key={x.slug}><Link to={`/services/${x.slug}`}>{x.title}</Link></dd>
              ))}
            </dl>
          </aside>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container grid grid--3">
          {projects.slice(0, 3).map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>
      <CTA />
    </>
  )
}
