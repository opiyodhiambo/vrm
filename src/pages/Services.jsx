import { Link } from 'react-router-dom'
import { services } from '../data/site.js'
import { PageHeader, CTA } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'

export default function Services() {
  return (
    <>
      <PageHeader title="Our Services" intro="Integrated consultancy and construction services — design, supervise and build with one accountable team." />
      <section className="section">
        <div className="container grid grid--3">
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="card">
              <div className="icon-box"><Icon name={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.summary}</p>
              <span className="link-arrow">Learn more</span>
            </Link>
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}
