import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroSlides, company, services, projects, stats, stages, process, accreditations } from '../data/site.js'
import { SectionHead, CTA, Typewriter, LogoMarquee } from '../components/ui.jsx'
import { ContainerScroll, CardSticky } from '../components/CardStack.jsx'
import Icon from '../components/Icon.jsx'

const StageMachine = lazy(() => import('../components/StageMachine.jsx'))

// Mounts the 3D machine (and downloads three.js) only once the section is near the viewport.
function MachineOnView() {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setShow(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect() } }, { rootMargin: '400px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className="machine">
      {show && <Suspense fallback={<div className="machine__fallback">Assembling the machine…</div>}><StageMachine height="100%" /></Suspense>}
    </div>
  )
}

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
          <span className="eyebrow">Building what matters</span>
          <h1><Typewriter parts={['Your vision brought to life ', { em: 'from foundation to finish.' }]} /></h1>
          <p>Building a home or developing a property should feel exciting, not exhausting. We bring your architects, engineers, and builders under one roof so you always know who to call and your project gets built right the first time.</p>
          <div className="hero__actions">
            <Link to="/contact" className="btn btn--primary">Talk to Our Team</Link>
            <Link to="/projects" className="btn btn--inverse">Explore Our Work</Link>
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

      <section className="section achieve">
        <div className="container achieve__grid">
          <div className="achieve__intro">
            <SectionHead eyebrow="Our background" title={<Typewriter parts={['Built on trust and hands-on experience...']} />}>
              {company.name} has spent over ten years helping families, developers, and public institutions across Kenya turn their ideas into lasting physical spaces.
            </SectionHead>
            <Link to="/about" className="link-arrow">Get to know us</Link>
          </div>
          <ContainerScroll className="achieve__cards">
            {stats.map((st, i) => (
              <CardSticky key={st.label} index={i + 2} incrementY={20} className={`achieve-card achieve-card--${i + 1}`} style={{ rotate: `${i + 2}deg` }}>
                <strong>{st.value}</strong>
                <span>{st.label}</span>
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
        <div className="container achieve__reg">
          <div className="achieve__reg-head">
            <span className="eyebrow">Regulatory registrations</span>
            <p>Our directors are registered and licensed to practise by</p>
          </div>
          <LogoMarquee items={accreditations} />
        </div>
      </section>

      <section className="section section--navy section--machine">
        <div className="container">
          <SectionHead eyebrow="What we do" title={<Typewriter parts={['Every discipline working as one team...']} />}
            action={<Link to="/services" className="link-arrow stages__all-top">View all {services.length} services</Link>}>
            Skip the stress of juggling multiple contractors. Our architects, engineers, and specialists work together under one roof to handle everything for you.
          </SectionHead>
          <p className="stages__all-bottom"><Link to="/services" className="link-arrow">View all {services.length} services</Link></p>
          <div className="machine-wrap">
            {/* <div className="machine-wrap__head">
              <span className="eyebrow">See it run</span>
              <p>One brief, four stages, one team. Drag to rotate, hover a station, or press <strong>One project</strong> to follow a brief from survey to handover.</p>
            </div> */}
            <MachineOnView />
          </div>
        </div>
      </section>

      <section className="section section--navy section--blueprint work">
        <div className="container">
          <div className="work__head">
            <span className="eyebrow">Recent projects</span>
            {/* <h2><Typewriter parts={['Take a look around our recent builds...']} /></h2> */}
            <p>Take a look around our recent builds...</p>
            <Link to="/projects" className="link-arrow">See all projects</Link>
          </div>
          <ContainerScroll className="work__cards">
            {projects.slice(0, 4).map((p, i) => (
              <CardSticky key={p.slug} index={i} incrementY={64} incrementZ={5} className="work-card">
                <Link to={`/projects/${p.slug}`} className="work-card__head">
                  <h3>{p.name}</h3>
                  <div className="work-card__chips">
                    {[p.type, p.location, p.year, p.description].filter(Boolean).map((c) => <span key={c}>{c}</span>)}
                  </div>
                </Link>
                <img className="work-card__img" src={p.images[0]} alt={`${p.name}, ${p.location}`} loading="lazy" />
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
      </section>

      <section className="section section--process">
        <div className="container">
          <div className="process-stack">
            <div className="process-stack__intro">
              <SectionHead eyebrow="How we work" title={<Typewriter parts={['What working with us feels like...']} />}>
                We keep things simple with five clear steps and one person who answers your questions from your very first call all the way to handing over your keys.
              </SectionHead>
            </div>
            <ContainerScroll className="process-stack__cards">
              {process.map((st, i) => (
                <CardSticky key={st.title} index={i + 2} className="process-card">
                  <header>
                    <span className="process-card__icon"><Icon name={st.icon} /></span>
                    <h3>{st.title}</h3>
                    <span className="process-card__n">{String(i + 1).padStart(2, '0')}</span>
                  </header>
                  <p>{st.text}</p>
                </CardSticky>
              ))}
            </ContainerScroll>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}