import { Link } from 'react-router-dom'
import { services, stages } from '../data/site.js'
import { PageHeader, CTA } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'

export default function Services() {
  return (
    <>
      <PageHeader scene="services" title="Our Services" intro="Integrated consultancy and construction services — design, supervise and build with one accountable team." />
      <section className="section">
        <div className="container grid grid--3">
          {stages.flatMap((st) =>
            st.services.map((slug, i) => {
              const s = services.find((x) => x.slug === slug)
              if (!s) return []
              // The first card of each stage carries the anchor used by the home page's "View services" links.
              return [(
                <Link key={s.slug} id={i === 0 ? st.id : undefined} to={`/services/${s.slug}`} className="card service-anchor">
                  <div className="icon-box"><Icon name={s.icon} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                  <span className="link-arrow">Learn more</span>
                </Link>
              )]
            }),
          )}
        </div>
      </section>
      <CTA />
    </>
  )
}
