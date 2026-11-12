import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../lib/content.jsx'
import { PageHeader, CTA } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'

const ROW = 64          // height of an inactive row in the wheel (px)
const ACTIVE_H = 172    // approximate height of the active row (title + one sentence)
const HEADER = 76       // sticky site header height

export default function Services() {
  const { services, stages } = useContent()
  // Services in stage order; the first of each stage carries the anchor the home page links to.
  const list = stages.flatMap((st) =>
    st.services
      .map((slug, i) => ({ s: services.find((x) => x.slug === slug), anchor: i === 0 ? st.id : undefined }))
      .filter((e) => e.s),
  )
  const n = list.length
  const secRef = useRef(null)
  const [active, setActive] = useState(0)

  // Scroll position -> active service. The section is tall; a sticky stage stays on screen while it scrolls.
  useEffect(() => {
    let raf = 0
    const step = () => window.innerHeight * 0.5
    const update = () => {
      raf = 0
      const el = secRef.current
      if (!el) return
      const scrolled = HEADER - el.getBoundingClientRect().top
      setActive(Math.max(0, Math.min(n - 1, Math.round(scrolled / step()))))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [n])

  const goTo = (i) => {
    const el = secRef.current
    if (!el) return
    const y = window.scrollY + el.getBoundingClientRect().top - HEADER + Math.max(0, Math.min(n - 1, i)) * window.innerHeight * 0.5
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
  const onKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1) }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); goTo(active - 1) }
  }

  if (!n) return <><PageHeader scene="services" title="Integrated Consultancy, Design & Construction Services" intro="Our services will be listed here shortly." /><CTA /></>
  const cur = list[Math.min(active, n - 1)].s
  return (
    <>
      <PageHeader
        scene="services"
        title="Integrated Consultancy, Design & Construction Services"
        intro="One team across the whole project life: surveys and approvals, design and engineering, procurement and construction, then handover and facilities management."
      />
      <section className="swheel" ref={secRef} style={{ '--n': n }}>
        {list.map(({ anchor }, i) => anchor && <span key={anchor} id={anchor} className="swheel__anchor" style={{ '--i': i }} />)}
        <div className="swheel__stage">
          <div className="container swheel__grid" tabIndex={0} onKeyDown={onKey} role="region" aria-roledescription="carousel" aria-label="Services">
            {/* left: the wheel */}
            <div className="swheel__left">
              <div className="swheel__head">
                <span className="eyebrow">Services</span>
                <span className="idx">{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
              </div>
              <div className="swheel__rail" aria-hidden="true"><i style={{ height: `${((active + 1) / n) * 100}%` }} /></div>
              <ol className="swheel__list">
                {list.map(({ s }, i) => {
                  const d = i - active
                  const y = d === 0 ? 0 : Math.sign(d) * (ACTIVE_H / 2 + ROW / 2 + (Math.abs(d) - 1) * ROW)
                  const dist = Math.abs(d)
                  return (
                    <li
                      key={s.slug}
                      className={`swheel__item${d === 0 ? ' is-active' : ''}`}
                      style={{ transform: `translateY(calc(-50% + ${y}px)) scale(${1 - Math.min(dist, 4) * 0.035})`, opacity: dist > 4 ? 0 : 1 - Math.min(dist, 4) * 0.22, pointerEvents: dist > 4 ? 'none' : 'auto' }}
                    >
                      <button type="button" onClick={() => goTo(i)} aria-current={d === 0} tabIndex={d === 0 ? 0 : -1}>
                        <span className="swheel__n">{String(i + 1).padStart(2, '0')}</span>
                        <span className="swheel__title">{s.title}</span>
                        <span className="swheel__sum">{s.summary}</span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* right: the sheet for the active service */}
            <div className="swheel__sheet">
              <i className="mark" aria-hidden="true" /><i className="mark mark--tr" aria-hidden="true" /><i className="mark mark--bl" aria-hidden="true" /><i className="mark mark--br" aria-hidden="true" />
              <div className="swheel__sheet-in" key={cur.slug}>
                <div className="swheel__sheet-top">
                  <span className="svc__icon"><Icon name={cur.icon} /></span>
                  <span className="idx">{String(active + 1).padStart(2, '0')}</span>
                </div>
                <h3>{cur.title}</h3>
                <p className="swheel__label">What's included</p>
                <ul className="swheel__points">
                  {cur.points.map((p, k) => (
                    <li key={p} style={{ '--k': k }}><i className="swheel__dot" aria-hidden="true" /><span>{p}</span></li>
                  ))}
                </ul>
              </div>
              <div className="swheel__sheet-foot">
                <Link to={`/contact?service=${cur.slug}`} className="btn btn--primary">Request this service</Link>
                <div className="swheel__nav">
                  <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous service"><Icon name="chevron-down" /></button>
                  <button type="button" onClick={() => goTo(active + 1)} disabled={active === n - 1} aria-label="Next service"><Icon name="chevron-down" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  )
}
