import { company, values, pillars, accreditations } from '../data/site.js'
import { PageHeader, SectionHead, CTA, Typewriter } from '../components/ui.jsx'

export default function About() {
  return (
    <>
      <PageHeader scene="about" title="Who We Are" crumbs={[{ label: 'About', to: '/about' }]}
        intro="A Kenyan engineering and construction consultancy with over a decade of experience serving private and government clients, locally and internationally." />

      <section className="story">
        <div className="story__bg" style={{ backgroundImage: 'url(/images/p43.jpg)' }} role="img" aria-label="A VRM project" />
        <div className="container story__inner">
          <div className="story__content">
            <span className="eyebrow">Our story</span>
            <h2><Typewriter parts={['Quality, timely, standards-driven…']} /></h2>
            <p>{company.name} is incorporated under the Companies Act (Cap. 486) Laws of Kenya. A team of highly qualified and innovative professionals delivers services that meet client specifications while adhering to both local and international standards.</p>
            <p>Our directors are duly registered and licensed to practise by the relevant regulatory and professional institutions. We aim to provide globally competitive services in the most effective, efficient and economical way — leveraging advanced and current technologies.</p>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container grid grid--2">
          <div className="card"><span className="eyebrow">Vision</span><p className="lead">{company.vision}</p></div>
          <div className="card"><span className="eyebrow">Mission</span><p className="lead">{company.mission}</p></div>
        </div>
        <div className="container" style={{ marginTop: '1.5rem' }}>
          <div className="card">
            <span className="eyebrow">Objectives</span>
            <ul className="check-list grid grid--4">{company.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Core values" title="How we work" />
          <div className="grid grid--3">
            {values.map((v) => <div className="card" key={v.title}><h3>{v.title}</h3><p>{v.text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <SectionHead eyebrow="Our foundation" title="Pillars of excellence" />
          <ul className="check-list grid grid--3">{pillars.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Accreditation" title="Regulatory registrations" />
          <div className="grid grid--4">
            {accreditations.map((a) => <div className="badge" key={a.abbr}><strong>{a.abbr}</strong><span>{a.name}</span></div>)}
          </div>
        </div>
      </section>
      <CTA />
    </>
  )
}
