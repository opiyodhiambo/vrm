import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Centre-focus carousel: the active project opens up into a detail card,
// neighbours shrink to image slivers on each side. Click a sliver, a dot,
// or use the arrow keys to move. Autoplays with a progress dot; pauses on hover/focus.
const OFFSETS = [-3, -2, -1, 0, 1, 2, 3]
const GAP = 14

function layoutFor(width) {
  if (width >= 1000) return { tier: 'desktop', aw: 780, ah: 440, sides: [{ w: 90, h: 340 }, { w: 60, h: 220 }] }
  if (width >= 640) return { tier: 'tablet', aw: Math.min(580, width - 200), ah: 430, sides: [{ w: 90, h: 330 }, null] }
  return { tier: 'mobile', aw: Math.max(220, width - 100), ah: 500, sides: [{ w: 40, h: 360 }, null] }
}

export default function ProjectCarousel({ projects, interval = 6000 }) {
  const total = projects.length
  const boxRef = useRef(null)
  const [page, setPage] = useState(0)
  const [width, setWidth] = useState(1200)
  const [hold, setHold] = useState(false)
  const active = ((page % total) + total) % total
  const L = layoutFor(width)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width))
    ro.observe(el)
    setWidth(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  const go = (delta) => setPage((p) => p + delta)
  const goTo = (idx) => {
    let diff = idx - active
    if (diff > total / 2) diff -= total
    else if (diff < -total / 2) diff += total
    go(diff)
  }

  const frame = (offset) => {
    const abs = Math.abs(offset)
    const dir = offset < 0 ? -1 : 1
    const cx = width / 2
    if (abs === 0) return { left: cx - L.aw / 2, width: L.aw, height: L.ah, opacity: 1 }
    const s1 = L.sides[0]
    const s2 = L.sides[1]
    if (abs === 1) {
      return { left: dir < 0 ? cx - L.aw / 2 - GAP - s1.w : cx + L.aw / 2 + GAP, width: s1.w, height: s1.h, opacity: 1 }
    }
    if (abs === 2 && s2) {
      const edge = L.aw / 2 + GAP + s1.w + GAP
      return { left: dir < 0 ? cx - edge - s2.w : cx + edge, width: s2.w, height: s2.h, opacity: 1 }
    }
    // hidden, parked just beyond the visible slivers
    const far = L.aw / 2 + GAP + s1.w + GAP + (s2 ? s2.w + GAP : 0)
    const hw = s2 ? s2.w : s1.w
    const hh = s2 ? s2.h : s1.h
    return { left: dir < 0 ? cx - far - hw - 60 : cx + far + 60, width: hw, height: hh, opacity: 0 }
  }

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') go(-1)
    else if (e.key === 'ArrowRight') go(1)
  }

  return (
    <div
      className={`pc ${hold ? 'is-hold' : ''}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Recent projects"
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <div ref={boxRef} className={`pc__stage pc__stage--${L.tier}`} style={{ height: L.ah }} aria-live="polite">
        {OFFSETS.map((offset) => {
          const idx = (((page + offset) % total) + total) % total
          const p = projects[idx]
          const isActive = offset === 0
          const f = frame(offset)
          const detailImg = p.images[1] || p.images[0]
          return (
            <div
              key={page + offset}
              className={`pc__card ${isActive ? 'is-active' : ''}`}
              style={{ left: f.left, width: f.width, height: f.height, opacity: f.opacity, pointerEvents: f.opacity ? 'auto' : 'none' }}
              onClick={isActive ? undefined : () => go(offset)}
              role={isActive ? undefined : 'button'}
              aria-label={isActive ? undefined : `Show ${p.name}`}
            >
              <img className="pc__thumb" src={p.images[0]} alt="" loading="lazy" draggable="false" />
              <div className="pc__detail" aria-hidden={!isActive} style={{ width: L.aw, height: L.ah }}>
                <div className="pc__text">
                  <span className="tag">{p.type}</span>
                  <h3>{p.name}</h3>
                  <p className="pc__meta">{p.location}{p.year ? ` · ${p.year}` : ''}</p>
                  <p className="pc__desc">{p.description}</p>
                  <Link to={`/projects/${p.slug}`} className="link-arrow" tabIndex={isActive ? 0 : -1}>View project</Link>
                </div>
                <div className="pc__photo"><img src={detailImg} alt={`${p.name}, ${p.location}`} draggable="false" /></div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="pc__dots" role="tablist" aria-label="Choose project">
        {projects.map((p, i) => (
          <button key={p.slug} type="button" role="tab" aria-selected={i === active} aria-label={`Project ${i + 1}: ${p.name}`}
            className={`pc__dot ${i === active ? 'is-active' : ''}`} onClick={() => goTo(i)}>
            <span>{i === active && <i key={page} style={{ animationDuration: `${interval}ms` }} onAnimationEnd={() => go(1)} />}</span>
          </button>
        ))}
      </div>

    </div>
  )
}
