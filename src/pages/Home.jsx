import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroSlides, company, services, projects, stats, stages, process, accreditations } from '../data/site.js'
import { SectionHead, CTA, ProjectCard, Typewriter, ProcessTimeline, LogoMarquee } from '../components/ui.jsx'
import ProjectShowcase from '../components/ProjectShowcase.jsx'
import Icon from '../components/Icon.jsx'

export default function Home() {
  const [slide, setSlide] = useState(0)
  const [hover, setHover] = useState(false)
  const paused = hover
  useEffect(() => {
    if (paused || heroSlides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setSlide((i) => (i + 1) % heroSlides.length), 6000)
    return () => clearInterval(t)
  }, [paused])

  return (
    <>
      <section className="hero" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}>
        {heroSlides.map((src, i) => (
          <div key={src} className={`hero__bg${i === slide ? ' is-active' : ''}`} style={{ backgroundImage: `url(${src})` }} />
        ))}
        <div className="container hero__inner"><div className="hero__content">
          <span className="eyebrow">The future. built smarter</span>
          <h1><Typewriter parts={['Planned, designed ', { em: 'and built right.' }]} /></h1>
          <p>Planning, approvals, design, engineering and construction handled by one licensed team, so nothing falls between consultants. Trusted by private and government clients for over a decade.</p>
          <div className="hero__actions">
            <Link to="/contact" className="btn btn--primary">Request a Free Quote</Link>
            <Link to="/projects" className="btn btn--inverse">View Our Projects</Link>
          </div>
        </div></div>
        {heroSlides.length > 1 && (
          <div className="hero__controls">
            <div className="hero__dots">
              {heroSlides.map((_, i) => (
                <button key={i} type="button" aria-label={`Show slide ${i + 1}`} aria-current={i === slide} className={i === slide ? 'is-active' : ''} onClick={() => setSlide(i)} />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="stats">
        <div className="container grid grid--4">
          {stats.map((s) => <div className="stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What we do" title={<Typewriter parts={['Eleven disciplines. One accountable team…']} />}
            action={<Link to="/services" className="link-arrow stages__all-top">View all {services.length} services</Link>}>
            You deal with one point of contact, while our architects, engineers, planners and environmental specialists coordinate behind the scenes.
          </SectionHead>
          <div className="stages">
            {stages.map((st) => (
              <Link key={st.n} to={`/services#${st.id}`} className="stage">
                <span className="stage__top"><span className="stage__icon"><Icon name={st.icon} /></span><span className="eyebrow">{st.n}</span></span>
                <h3>{st.title}</h3>
                <p>{st.gets}</p>
                <p className="stage__list">{st.services.map((sl) => services.find((x) => x.slug === sl)?.title).filter(Boolean).join(' · ')}</p>
                <span className="link-arrow">View services</span>
              </Link>
            ))}
          </div>
          <p className="stages__all-bottom"><Link to="/services" className="link-arrow">View all {services.length} services</Link></p>
        </div>
      </section>

      <section className="section section--navy section--blueprint">
        <div className="container">
          <SectionHead eyebrow="Recent projects" action={<Link to="/projects" className="link-arrow">See all projects</Link>} />
          <ProjectShowcase projects={projects.slice(0, 4)} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Trust" title={<Typewriter parts={['Registered and licensed…']} />}>
            {company.name} is led by visionary and hardworking directors who are duly registered and licensed to practice by relevant regulatory and professional institutions
          </SectionHead>
          <LogoMarquee items={accreditations} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="How we work" title={<Typewriter parts={['How your project runs with us…']} />} />
          <ProcessTimeline steps={process} />
        </div>
      </section>

      <CTA />
    </>
  )
}
