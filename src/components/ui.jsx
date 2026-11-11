import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

export function PageHeader({ title, intro, crumbs = [], scene }) {
  return (
    <section className={`page-header${scene ? ' page-header--scene' : ''}`} style={scene ? { '--scene': `url(/images/bg-scene-${scene}.svg)` } : undefined}>
      <div className="container">
        <div className="crumbs">
          <Link to="/">Home</Link>
          {crumbs.map((c) => <span key={c.label}> / <Link to={c.to}>{c.label}</Link></span>)}
        </div>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, children, action }) {
  return (
    <div className={`section-head ${action ? 'section-head--row' : ''}`}>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        {title && <h2>{title}</h2>}
        {children && <p className="lead">{children}</p>}
      </div>
      {action}
    </div>
  )
}

export function CTA({ title = 'Have a project in mind?', text = 'Tell us what you want to build. We will design it, plan it, and deliver it.' }) {
  // Rendered inside the shared "closing" block (CTA + footer) so both sit on one backdrop.
  const [slot, setSlot] = useState(null)
  useEffect(() => { setSlot(document.getElementById('cta-slot')) }, [])
  const band = (
    <section className="cta">
      <div className="container cta__inner">
        <div><h2>{title}</h2><p>{text}</p></div>
        <Link to="/contact" className="btn btn--primary">Request a Free Quote</Link>
      </div>
    </section>
  )
  return slot ? createPortal(band, slot) : null
}

export function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="project-card">
      <div className="project-card__img"><img src={project.images[0]} alt={project.name} loading="lazy" /></div>
      <div className="project-card__body">
        <span className="tag">{project.type}</span>
        <h3>{project.name}</h3>
        <p className="project-card__meta">{project.location}{project.year ? ` · ${project.year}` : ''}</p>
      </div>
    </Link>
  )
}

// Types its text out once, when it scrolls into view. `parts` is a list of strings or { em: 'text' }.
// The full text is always in the DOM (invisible, reserves space, read by screen readers).
export function Typewriter({ parts, speed = 55 }) {
  const items = parts.map((p) => (typeof p === 'string' ? { t: p } : { t: p.em, em: true }))
  const total = items.reduce((n, i) => n + i.t.length, 0)
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduce) { setCount(total); return }
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setStarted(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect() } }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [reduce, total])

  useEffect(() => {
    if (!started || reduce) return
    if (count >= total) return
    const t = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(t)
  }, [started, count, total, speed, reduce])

  const render = (limit) => {
    let left = limit
    return items.map((i, k) => {
      const chunk = i.t.slice(0, Math.max(0, left))
      left -= i.t.length
      return i.em ? <em key={k}>{chunk}</em> : chunk
    })
  }

  const typing = count < total
  return (
    <span ref={ref} className="typewriter">
      <span className="typewriter__full">{render(total)}</span>
      <span className="typewriter__live" aria-hidden="true">{render(count)}{typing && started && <span className="typewriter__caret" />}</span>
    </span>
  )
}

// Journey timeline: icons joined by a line (static, no animation).
export function ProcessTimeline({ steps }) {
  return (
    <ol className="process">
      {steps.map((st, i) => (
        <li key={st.title} className={i === steps.length - 1 ? 'is-last' : ''}>
          <span className="process__icon"><Icon name={st.icon} /></span>
          <span className="process__n">0{i + 1}</span>
          <h3>{st.title}</h3>
          <p>{st.text}</p>
        </li>
      ))}
    </ol>
  )
}

// Sliding strip of accreditation logos (left to right). Tiles are one fixed size; entries without `logo` show initials.
export function LogoMarquee({ items }) {
  const tile = (a, hidden) => (
    <li className="marquee__item" key={a.abbr + (hidden ? '-2' : '')} aria-hidden={hidden || undefined}>
      <div className="marquee__tile" title={a.name}>
        {a.logo ? <img src={a.logo} alt={hidden ? '' : a.name} loading="lazy" draggable="false" /> : <span className="marquee__initials">{a.abbr}</span>}
      </div>
    </li>
  )
  return (
    <div className="marquee" role="region" aria-label="Registrations and memberships">
      <ul className="marquee__track">
        {items.map((a) => tile(a, false))}
        {items.map((a) => tile(a, true))}
      </ul>
    </div>
  )
}
