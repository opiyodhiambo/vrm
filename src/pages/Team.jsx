import { team, manpower, stats } from '../data/site.js'
import { PageHeader, SectionHead, CTA } from '../components/ui.jsx'

export default function Team() {
  return (
    <>
      <PageHeader title="Our Team" crumbs={[{ label: 'About', to: '/about' }]}
        intro="Architects, engineers, environmental specialists and construction project managers — backed by finance, administration and an extended network of associates." />
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Manpower" title={`${manpower.total} professionals, ${manpower.technical} technical`}>
            Technical staff {manpower.technical} · Management & administration {manpower.admin} · IT {manpower.it} · Business development {manpower.bizDev}.
          </SectionHead>
          <div className="grid grid--2">
            {team.map((t) => (
              <div className="card" key={t.type}>
                <h3>{t.type}{t.count ? ` — ${t.count}` : ''}</h3>
                <ul className="check-list">{t.areas.map((a) => <li key={a}>{a}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <SectionHead eyebrow="Structure" title="Organisational chart" />
          <img src="/images/org-chart.png" alt="VRM organisational chart" style={{ maxWidth: 720, margin: '0 auto', borderRadius: 12, background: '#fff' }} />
        </div>
      </section>
      <CTA />
    </>
  )
}
