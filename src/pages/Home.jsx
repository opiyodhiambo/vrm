import { Link } from 'react-router-dom'
import { company, services, projects, stats, pillars, accreditations } from '../data/site.js'
import { SectionHead, CTA, ProjectCard } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__bg" style={{ backgroundImage: 'url(/images/p42.jpg)' }} />
        <div className="container hero__inner">
          <span className="eyebrow">Engineering · Architecture · Construction</span>
          <h1>The future, <em>built smarter</em></h1>
          <p>VRM Engineering Solutions Ltd delivers integrated design, engineering and construction services across Kenya — on time, to standard, and built to last.</p>
          <div className="hero__actions">
            <Link to="/projects" className="btn btn--gold">View Our Projects</Link>
            <Link to="/contact" className="btn btn--ghost">Request a Quote</Link>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container grid grid--4">
          {stats.map((s) => <div className="stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What we do" title="One team, from design to delivery"
            action={<Link to="/services" className="link-arrow">All services</Link>}>
            Eleven disciplines under one roof — so design, engineering and construction stay aligned from the first sketch to handover.
          </SectionHead>
          <div className="grid grid--3">
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card">
                <div className="icon-box"><Icon name={s.icon} /></div>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead eyebrow="Selected work" title="Recent projects"
            action={<Link to="/projects" className="link-arrow">All projects</Link>} />
          <div className="grid grid--3">
            {projects.slice(0, 6).map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <SectionHead eyebrow="Why VRM" title="Our pillars of excellence" />
          <div className="grid grid--3">
            {pillars.map((p, i) => (
              <div key={p} className="card" style={{ background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.12)' }}>
                <span className="eyebrow">0{i + 1}</span>
                <h3>{p}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Trust" title="Registered and licensed">
            {company.name}'s directors are registered with Kenya's leading regulatory and professional bodies.
          </SectionHead>
          <div className="grid grid--4">
            {accreditations.map((a) => <div className="badge" key={a.abbr}><strong>{a.abbr}</strong><span>{a.name}</span></div>)}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
