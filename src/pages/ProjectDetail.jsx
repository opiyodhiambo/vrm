import { useParams } from 'react-router-dom'
import { projects } from '../data/site.js'
import { PageHeader, CTA } from '../components/ui.jsx'
import NotFound from './NotFound.jsx'

export default function ProjectDetail() {
  const { slug } = useParams()
  const p = projects.find((x) => x.slug === slug)
  if (!p) return <NotFound />
  const facts = [['Client', p.client], ['Location', p.location], ['Sector', p.type], ['Value', p.value], ['Year', p.year]].filter(([, v]) => v)
  return (
    <>
      <PageHeader title={p.name} intro={p.description} crumbs={[{ label: 'Projects', to: '/projects' }]} />
      <section className="section">
        <div className="container split">
          <div>
            <div className="gallery">{p.images.map((src) => <img key={src} src={src} alt={p.name} />)}</div>
            {p.scope && <><h3>Scope of work</h3><p>{p.scope}</p></>}
          </div>
          <aside className="facts">
            <dl>{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          </aside>
        </div>
      </section>
      <CTA />
    </>
  )
}
