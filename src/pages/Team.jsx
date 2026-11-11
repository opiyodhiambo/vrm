import { team, manpower, stats } from '../data/site.js'
import { PageHeader, SectionHead, CTA } from '../components/ui.jsx'
import { useEffect, useRef, useState } from 'react'
import OrgChart from '../components/OrgChart.jsx'

function PinBoard({ children }) {
  const ref = useRef(null)
  const [d, setD] = useState('')
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const draw = () => {
      const b = el.getBoundingClientRect()
      const pts = [...el.querySelectorAll('.pin__card')].map((c) => {
        const r = c.getBoundingClientRect()
        return [r.left + r.width / 2 - b.left, r.top + r.height / 2 - b.top]
      })
      if (pts.length < 2) return
      let path = `M${pts[0][0]},${pts[0][1]}`
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]
        const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2
        path += ` Q${cx + (y1 - y0) * 0.18},${cy - (x1 - x0) * 0.18} ${x1},${y1}`
      }
      setD(path)
    }
    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(el)
    window.addEventListener('resize', draw)
    return () => { ro.disconnect(); window.removeEventListener('resize', draw) }
  }, [])
  return (
    <div className="pins__wrap" ref={ref}>
      <svg className="pins__thread" aria-hidden="true"><path d={d} /></svg>
      {children}
    </div>
  )
}

export default function Team() {
  return (
    <>
      <PageHeader scene="team" title="Our Team" crumbs={[{ label: 'About', to: '/about' }]}
        intro="Architects, engineers, environmental specialists and construction project managers — backed by finance, administration and an extended network of associates." />
      <section className="section section--navy pins">
        <div className="container">
          <SectionHead eyebrow="Manpower" title={`${manpower.total} professionals, ${manpower.technical} technical`}>
            Technical staff {manpower.technical} · Management & administration {manpower.admin} · IT {manpower.it} · Business development {manpower.bizDev}.
          </SectionHead>
          <PinBoard><ol className="pins__board">
            {team.map((t, i) => (
              <li className={`pin pin--${i + 1}`} key={t.type}>
                <span className="pin__tack" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M15.5 2.5 21.5 8.5l-2 1-1.3-.4-3.6 3.6.2 3.4-1.4 1.4-4-4-5.9 5.9-1.4-1.4 5.9-5.9-4-4 1.4-1.4 3.4.2 3.6-3.6-.4-1.3z"/></svg></span>
                <div className="pin__card">
                  <span className="pin__n">0{i + 1}</span>
                  <h3>{t.type}{t.count ? <span className="pin__count"> · {t.count}</span> : ''}</h3>
                  <ul>{t.areas.map((a) => <li key={a}>{a}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol></PinBoard>
        </div>
      </section>
      <section className="section section--navy section--orgboard">
        <div className="container">
          <SectionHead eyebrow="Structure" title="Organisational chart">
            From the Board to the site teams: one line of accountability, with audit and legal advice alongside.
          </SectionHead>
          <OrgChart />
        </div>
      </section>
      <CTA />
    </>
  )
}
