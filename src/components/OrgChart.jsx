import { useEffect, useMemo, useRef, useState } from 'react'
import { orgChart } from '../data/site.js'

/**
 * Organisational chart as a tilted board: roles are chips on tier plates, reporting lines are drawn
 * live from the chips' positions. Hover (or tap) a role to trace its line up to the Board and down to
 * its team. "Layers" spreads the tiers apart, like the machine's Stations mode.
 */
export default function OrgChart() {
  const boardRef = useRef(null)
  const nodeRefs = useRef(new Map())
  const [links, setLinks] = useState([])
  const [size, setSize] = useState([0, 0])
  const [mode, setMode] = useState('assembled')
  const [hover, setHover] = useState(null)
  const [pinned, setPinned] = useState(null)
  const [beat, setBeat] = useState(-1)
  const active = pinned || hover

  const { parent, children, all } = useMemo(() => {
    const parent = { board: null, ed: 'board', audit: 'ed', legal: 'ed', gm: 'ed' }
    const titles = {}
    orgChart.governance.concat(orgChart.executive).forEach((n) => (titles[n.id] = n.title))
    orgChart.departments.forEach((d) => {
      parent[d.id] = 'gm'
      titles[d.id] = d.title
      d.teams.forEach((t, i) => { parent[`${d.id}-${i}`] = d.id; titles[`${d.id}-${i}`] = t })
    })
    const children = {}
    Object.entries(parent).forEach(([id, p]) => { if (p) (children[p] ||= []).push(id) })
    return { parent, children, all: Object.keys(parent).length }
  }, [])

  const lit = useMemo(() => {
    if (!active) return null
    const set = new Set([active])
    for (let p = parent[active]; p; p = parent[p]) set.add(p)
    const walk = (id) => (children[id] || []).forEach((c) => { set.add(c); walk(c) })
    walk(active)
    return set
  }, [active, parent, children])

  // Idle pulse walks across the department heads when nothing is being traced.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setBeat((b) => (b + 1) % orgChart.departments.length), 2200)
    return () => clearInterval(t)
  }, [])

  const setRef = (id) => (el) => { if (el) nodeRefs.current.set(id, el); else nodeRefs.current.delete(id) }

  useEffect(() => {
    const board = boardRef.current
    if (!board) return
    const pos = (el) => {
      let x = 0, y = 0, n = el
      while (n && n !== board) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent }
      return { x, y, w: el.offsetWidth, h: el.offsetHeight, cx: x + el.offsetWidth / 2, cy: y + el.offsetHeight / 2 }
    }
    const draw = () => {
      const g = (id) => { const el = nodeRefs.current.get(id); return el ? pos(el) : null }
      const out = []
      const board_ = g('board'), ed = g('ed'), gm = g('gm'), audit = g('audit'), legal = g('legal')
      if (!ed || !gm) return
      // Stacked (phone) layout: the Board sits above the Director, so links run down a left rail
      // instead of across; advisory diagonals are dropped.
      const stacked = board_ && board_.y + board_.h <= ed.y
      if (board_) out.push({ from: 'ed', to: 'board', kind: 'arrow', d: stacked ? `M${ed.cx},${ed.y} V${board_.y + board_.h}` : `M${ed.x},${ed.cy} H${board_.x + board_.w}` })
      if (stacked) {
        out.push({ from: 'ed', to: 'gm', d: `M${ed.cx},${ed.y + ed.h} V${ed.y + ed.h + 12} H${gm.x - 10} V${gm.cy} H${gm.x}` })
        if (audit) out.push({ from: 'audit', to: 'gm', kind: 'arrow', d: `M${audit.x + audit.w - 22},${audit.y + audit.h} V${gm.y}` })
        if (legal) out.push({ from: 'legal', to: 'gm', kind: 'arrow', d: `M${legal.x + legal.w - 22},${legal.y} V${gm.y + gm.h}` })
      } else {
        out.push({ from: 'ed', to: 'gm', d: `M${ed.cx},${ed.y + ed.h} V${gm.y}` })
        if (audit) {
          out.push({ from: 'ed', to: 'audit', kind: 'advisory', d: `M${ed.x + 8},${ed.y + ed.h} L${audit.cx},${audit.y}` })
          out.push({ from: 'audit', to: 'gm', kind: 'arrow', d: `M${audit.x + audit.w},${audit.cy} H${gm.x}` })
        }
        if (legal) {
          out.push({ from: 'ed', to: 'legal', kind: 'advisory', d: `M${ed.x + ed.w - 8},${ed.y + ed.h} L${legal.cx},${legal.y}` })
          out.push({ from: 'legal', to: 'gm', kind: 'arrow', d: `M${legal.x},${legal.cy} H${gm.x + gm.w}` })
        }
      }
      const heads = orgChart.departments.map((d) => {
        const el = nodeRefs.current.get(d.id)
        return el ? [d.id, pos(el), pos(el.parentElement)] : null
      }).filter(Boolean)
      if (heads.length) {
        const oneRow = new Set(heads.map(([, , slab]) => Math.round(slab.y))).size === 1
        if (oneRow) {
          // Classic bus: down from the GM, across, and down into each head.
          const busY = (gm.y + gm.h + Math.min(...heads.map(([, p]) => p.y))) / 2
          heads.forEach(([id, p]) => out.push({ from: 'gm', to: id, d: `M${gm.cx},${gm.y + gm.h} V${busY} H${p.cx} V${p.y}` }))
        } else {
          // Wrapped rows: a rail down the left, with a short bus in the gap above each row of slabs.
          const railX = Math.min(...heads.map(([, , slab]) => slab.x)) - 10
          const topY = Math.min(...heads.map(([, , slab]) => slab.y)) - 8
          // When the executive tier is stacked too, leave the GM sideways so the line misses the Legal Advisor below it.
          const start = stacked ? `M${gm.x},${gm.cy} H${railX}` : `M${gm.cx},${gm.y + gm.h} V${topY} H${railX}`
          heads.forEach(([id, p, slab]) => out.push({ from: 'gm', to: id, d: `${start} V${slab.y - 6} H${p.cx} V${p.y}` }))
        }
      }
      orgChart.departments.forEach((d) => {
        const head = g(d.id)
        if (!head) return
        const trunkX = head.x + 14
        d.teams.forEach((_, i) => {
          const t = g(`${d.id}-${i}`)
          if (!t) return
          out.push({ from: d.id, to: `${d.id}-${i}`, d: `M${head.cx},${head.y + head.h} V${head.y + head.h + 10} H${trunkX} V${t.cy} H${t.x}` })
        })
      })
      setLinks(out)
      setSize([board.offsetWidth, board.offsetHeight])
    }
    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(board)
    board.querySelectorAll('.org__slab').forEach((el) => ro.observe(el))
    window.addEventListener('resize', draw)
    return () => { ro.disconnect(); window.removeEventListener('resize', draw) }
  }, [mode])

  const Node = ({ id, title, kind }) => {
    const isLit = lit ? lit.has(id) : true
    const cls = ['org__node', `org__node--${kind}`, lit && !isLit && 'is-dim', active === id && 'is-active', beat >= 0 && !lit && orgChart.departments[beat]?.id === id && 'is-beat'].filter(Boolean).join(' ')
    return (
      <button
        type="button"
        ref={setRef(id)}
        className={cls}
        onMouseEnter={() => setHover(id)}
        onMouseLeave={() => setHover(null)}
        onFocus={() => setHover(id)}
        onBlur={() => setHover(null)}
        onClick={(e) => { e.stopPropagation(); setPinned((p) => (p === id ? null : id)) }}
        aria-pressed={pinned === id}
      >
        {title}
      </button>
    )
  }

  const linkCls = (l) => {
    const on = lit && lit.has(l.from) && lit.has(l.to)
    return ['org__link', l.kind && `org__link--${l.kind}`, lit && (on ? 'is-lit' : 'is-dim')].filter(Boolean).join(' ')
  }
  const sorted = lit ? [...links].sort((a, b) => (lit.has(a.from) && lit.has(a.to) ? 1 : 0) - (lit.has(b.from) && lit.has(b.to) ? 1 : 0)) : links

  return (
    <div className={`org org--${mode}`} onClick={() => setPinned(null)}>
      <div className="org__top">
        <div className="org__identity">
          <span className="org__mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" /></svg></span>
          <div><strong>VRM Organisation</strong><small>Reporting structure</small></div>
        </div>
        <div className="org__status"><i /><span>{active ? 'Tracing a reporting line' : 'Hover a role to trace its line'}</span><span className="org__count">4 TIERS · {all} ROLES</span></div>
      </div>
      <div className="org__stage">
        <div className="org__board" ref={boardRef}>
          <svg className="org__links" width={size[0]} height={size[1]} aria-hidden="true">
            <defs>
              <marker id="org-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="currentColor" /></marker>
            </defs>
            {sorted.map((l, i) => <path key={l.from + l.to + i} d={l.d} className={linkCls(l)} markerEnd={l.kind === 'arrow' ? 'url(#org-arrow)' : undefined} />)}
          </svg>
          <div className="org__tier org__tier--gov">
            <span className="org__tierlabel">01 · Governance</span>
            <div className="org__row org__row--gov">
              {orgChart.governance.map((n) => <Node key={n.id} id={n.id} title={n.title} kind={n.id} />)}
            </div>
          </div>
          <div className="org__tier org__tier--exec">
            <span className="org__tierlabel">02 · Executive</span>
            <div className="org__row org__row--exec">
              {orgChart.executive.map((n) => <Node key={n.id} id={n.id} title={n.title} kind={n.id === 'gm' ? 'gm' : 'advisor'} />)}
            </div>
          </div>
          <div className="org__tier org__tier--depts">
            <span className="org__tierlabel">03 · Departments &amp; 04 · Teams</span>
            <div className="org__depts">
              {orgChart.departments.map((d) => (
                <div className="org__slab" key={d.id}>
                  <Node id={d.id} title={d.title} kind="head" />
                  <div className="org__teams">
                    {d.teams.map((t, i) => <Node key={i} id={`${d.id}-${i}`} title={t} kind="team" />)}
                    {!d.teams.length && <span className="org__none">Managed directly</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="org__controls" onClick={(e) => e.stopPropagation()}>
        <nav className="org__modes" aria-label="Chart view">
          <button type="button" aria-pressed={mode === 'assembled'} onClick={() => setMode('assembled')}>Assembled</button>
          <button type="button" aria-pressed={mode === 'layers'} onClick={() => setMode('layers')}>Layers</button>
        </nav>
        <span className="org__hint">Hover or tap a role. Dash-dot lines are advisory; arrows show who reports to whom.</span>
      </div>
    </div>
  )
}
