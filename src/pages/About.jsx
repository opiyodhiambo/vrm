import { company, values, pillars, accreditations } from '../data/site.js'
import { PageHeader, SectionHead, CTA, Typewriter, LogoMarquee } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'

export default function About() {
  return (
    <>
      <PageHeader scene="about" title="Who We Are" crumbs={[{ label: 'About', to: '/about' }]}
        intro="A Kenyan engineering and construction consultancy with over a decade of experience serving private and government clients, locally and internationally." />

      <section className="story">
        <div className="story__bg" style={{ backgroundImage: 'url(/images/our-story-bg.jpeg)' }} role="img" aria-label="A VRM project" />
        <div className="container story__inner">
          <div className="story__content">
            <span className="eyebrow">Our story</span>
            <h2><Typewriter parts={['Quality, timely, standards-driven…']} /></h2>
            <p>{company.name} is incorporated under the Companies Act (Cap. 486) Laws of Kenya. A team of highly qualified and innovative professionals delivers services that meet client specifications while adhering to both local and international standards.</p>
            <p>Our directors are duly registered and licensed to practise by the relevant regulatory and professional institutions. We aim to provide globally competitive services in the most effective, efficient and economical way — leveraging advanced and current technologies.</p>
          </div>
        </div>
      </section>

      <section className="section direction">
        <div className="container">
          <SectionHead eyebrow="Direction" title={<Typewriter parts={['What drives us…']} />} />
          <div className="direction__grid">
            <div className="direction__panel">
              <i className="values__mark" aria-hidden="true" />
              <span className="direction__icon" aria-hidden="true"><Icon name="eye" /></span>
              <span className="eyebrow">Vision</span>
              <p className="direction__quote"><span className="direction__q" aria-hidden="true">“</span>{company.vision}</p>
            </div>
            <div className="direction__panel">
              <i className="values__mark" aria-hidden="true" />
              <span className="direction__icon" aria-hidden="true"><Icon name="target" /></span>
              <span className="eyebrow">Mission</span>
              <p className="direction__quote"><span className="direction__q" aria-hidden="true">“</span>{company.mission}</p>
            </div>
            <i className="values__mark values__mark--tr" aria-hidden="true" />
            <i className="values__mark values__mark--bl" aria-hidden="true" />
            <i className="values__mark values__mark--br" aria-hidden="true" />
          </div>

          <div className="dim">
            <div className="dim__head">
              <span className="eyebrow">Objectives</span>
              <p>Seven commitments we measure every project against.</p>
            </div>
            <div className="dim__rule" aria-hidden="true" />
            <ol className="dim__items">
              {company.objectives.map((o, i) => (
                <li className="dim__item" key={o}>
                  <span className="dim__tick" aria-hidden="true" />
                  <span className="dim__label"><span className="dim__n">0{i + 1}</span>{o}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section values">
        <div className="container">
          <div className="values__grid">
            <div className="values__head">
              <i className="values__mark" aria-hidden="true" />
              <span className="values__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></svg>
              </span>
              <span className="eyebrow">Core values</span>
              <h2>How we work</h2>
            </div>
            {values.map((v, i) => (
              <div className="values__cell" key={v.title}>
                <i className="values__mark" aria-hidden="true" />
                <span className="values__n">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
            <div className="values__cell values__cell--fill" aria-hidden="true">
              <i className="values__mark" />
              <span className="values__strap">{company.strapline}</span>
            </div>
            <i className="values__mark values__mark--tr" aria-hidden="true" />
            <i className="values__mark values__mark--bl" aria-hidden="true" />
            <i className="values__mark values__mark--br" aria-hidden="true" />
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
          <LogoMarquee items={accreditations} />
        </div>
      </section>
      <CTA />
    </>
  )
}
