import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * VRM Project Machine — an interactive 3D model of how a project moves through VRM.
 *
 * A brief drops onto the plate and rides a conveyor through four stations:
 * Plan & Approve (survey + stamp) → Design (drafting board + plotter) → Build (tower crane,
 * slabs rising, mixer) → Manage (site dashboard, beacon) → Handover (certificate + keys).
 * Four modes (Assembled, Cutaway, Stations, One project), five cameras, hover and click.
 * Everything is procedural three.js: no models, no images. Adapted from the "Agentic Factory"
 * concept (src/concept.js) with the same parts, timing and controls, re-themed for construction.
 */
export default function StageMachine({ height = 700, className }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let dispose
    let cancelled = false
    const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()
    ready.then(() => {
      if (cancelled) return
      const cs = getComputedStyle(root)
      dispose = initMachineScene(root, {
        bodyFont: cs.fontFamily,
        displayFont: cs.getPropertyValue('--font-display').trim() || cs.fontFamily,
      })
    })
    return () => {
      cancelled = true
      dispose?.()
    }
  }, [])

  return (
    <div ref={rootRef} className={['stage-machine', className].filter(Boolean).join(' ')} style={{ height }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        id="scene"
        role="img"
        aria-label="Interactive 3D machine with five stations: Plan and Approve, Design, Build, Manage and Handover. Drag to rotate. Hover or tap a station to take a closer look."
      />
      <div className="vignette" />
      <header className="topbar">
        <div className="identity">
          <div className="mark">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <strong>One brief, four stages, one team.</strong>
            <small> Drag to rotate, hover a station, or press "One project" to follow a brief from survey to handover.</small>
          </div>
        </div>
        <div className="status" id="status">
          <i />
          <span id="status-text">Machine running</span>
          <span>SERIES 001</span>
        </div>
      </header>
      <div className="scene-heading">
        How a project moves through VRM <span className="index">4 STAGES / 1 TEAM</span>
      </div>
      <div className="coordinates">PROTOTYPE 01 — FROM BRIEF TO HANDOVER</div>
      <div id="journey">
        <div className="journey-icon">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3 4h10v9H3zM6 4V2h4v2m-5 4h6" stroke="currentColor" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <strong id="journey-title">Brief received</strong>
          <small id="journey-detail">Plan &amp; Approve · a brief from the client</small>
        </div>
        <div className="track">
          <i id="journey-progress" />
        </div>
      </div>
      <div id="labels" />
      <div id="tooltip" role="tooltip">
        <strong />
        <p />
      </div>
      <div className="controls">
        <nav className="mode-bar" aria-label="Machine mode">
          <button type="button" data-mode="assembled" aria-pressed="true">
            <svg viewBox="0 0 16 16" fill="none"><path d="M8 1.5l6 3.3v6.4l-6 3.3-6-3.3V4.8L8 1.5zM2 4.8l6 3.4 6-3.4M8 8.2v6.3" stroke="currentColor" strokeLinejoin="round" /></svg>
            Assembled
          </button>
          <button type="button" data-mode="cutaway" aria-pressed="false">
            <svg viewBox="0 0 16 16" fill="none"><path d="M3 2h10v12H3zM8 2v12M10.5 4l2.5 2.5m-2.5 0L13 9m-2.5 0 2.5 2.5" stroke="currentColor" strokeLinejoin="round" /></svg>
            Cutaway
          </button>
          <button type="button" data-mode="stations" aria-pressed="false">
            <svg viewBox="0 0 16 16" fill="none"><path d="M8 1.5l6 3-6 3-6-3 6-3zM2 8l6 3 6-3M2 11.5l6 3 6-3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Stations
          </button>
          <button type="button" data-mode="project" aria-pressed="false">
            <svg viewBox="0 0 16 16" fill="none"><path d="M5 2.5l8 5.5-8 5.5v-11z" stroke="currentColor" strokeLinejoin="round" /></svg>
            One project
          </button>
        </nav>
        <nav className="camera-row" aria-label="Camera">
          <span className="caption">VIEW</span>
          <button type="button" data-camera="overview" aria-pressed="true">Overview</button>
          <button type="button" data-camera="side" aria-pressed="false">Side</button>
          <button type="button" data-camera="top" aria-pressed="false">Top</button>
          <button type="button" data-camera="station" aria-pressed="false">Station</button>
          <button type="button" data-camera="flight" aria-pressed="false">Flight</button>
          <span className="divider" />
          <button type="button" id="play" aria-label="Pause the animation" aria-pressed="false">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1" width="2.5" height="10" /><rect x="7.5" y="1" width="2.5" height="10" /></svg>
          </button>
        </nav>
      </div>
      <footer className="footer">
        <span className="wordmark">Design. Plan. Build. <span>We Deliver.</span></span>
        <span className="footer-center">ONE ACCOUNTABLE TEAM</span>
        <span className="hint">
          <svg width="13" height="16" viewBox="0 0 13 16" fill="none"><rect x="2" y="1" width="9" height="14" rx="4.5" stroke="currentColor" /><path d="M6.5 4v3" stroke="currentColor" strokeLinecap="round" /></svg>
          Rotate. Explore.
        </span>
      </footer>
      <div id="loading"><i /><span>Assembling the machine</span></div>
      <div id="error" role="alert">
        <strong>Could not start the 3D scene</strong>
        <p>Check that WebGL is turned on in your browser.</p>
        <button type="button" onClick={() => location.reload()}>Try again</button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// The scene
// ---------------------------------------------------------------------------

function initMachineScene(root, fonts) {
  const cleanups = []
  const frameWidth = () => root.clientWidth
  const frameHeight = () => root.clientHeight
  const listen = (target, type, handler) => {
    target.addEventListener(type, handler)
    cleanups.push(() => target.removeEventListener(type, handler))
  }
  function $(id) {
    const el = root.querySelector(`#${id}`)
    if (!el) throw new Error(`Scene markup is missing #${id}`)
    return el
  }
  function showError(message) {
    $('loading').classList.add('done')
    $('error').style.display = 'block'
    if (message) $('error').querySelector('p').textContent = message
  }
  const dispose = () => {
    for (const fn of cleanups.reverse()) fn()
    cleanups.length = 0
  }
  try {
    const TAU = Math.PI * 2
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = matchMedia('(pointer:coarse)').matches
    const GOLD = 0xd4952a, GOLD2 = 0xe6b04f
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(33, frameWidth() / frameHeight(), 0.1, 150)
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch (e) {
      showError('WebGL is not available. Turn on hardware acceleration in your browser settings and reload the page.')
      throw e
    }
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(devicePixelRatio, frameWidth() < 900 ? 1.5 : 1.75))
    renderer.setSize(frameWidth(), frameHeight())
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.localClippingEnabled = true
    $('scene').appendChild(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.065
    controls.enablePan = false
    controls.minDistance = 7
    controls.maxDistance = 55
    controls.minPolarAngle = 0.09
    controls.maxPolarAngle = Math.PI * 0.475
    controls.rotateSpeed = 0.48
    controls.zoomSpeed = 0.7
    // On a landing page the wheel scrolls the page, not the scene; on touch the finger scrolls too.
    controls.enableZoom = false
    if (coarse) {
      controls.enableRotate = false
      renderer.domElement.style.touchAction = 'pan-y'
    }
    const pmrem = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04)
    scene.environment = env.texture
    scene.environmentIntensity = 0.62
    room.dispose()
    pmrem.dispose()
    scene.add(new THREE.HemisphereLight(0xdbe5f4, 0x1a2230, 2))
    const key = new THREE.DirectionalLight(0xfff1d8, 4.2)
    key.position.set(-4, 12, 7)
    key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    Object.assign(key.shadow.camera, { left: -10, right: 10, top: 9, bottom: -9, near: 0.5, far: 35 })
    key.shadow.normalBias = 0.035
    key.shadow.bias = -0.0002
    key.shadow.radius = 4
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xc4d4ed, 3.1)
    rim.position.set(3, 7, -8)
    scene.add(rim)
    const warm = new THREE.PointLight(0xffbd42, 28, 20, 2)
    warm.position.set(-4, 5, 3)
    scene.add(warm)
    const front = new THREE.DirectionalLight(0xffffff, 1)
    front.position.set(5, 3, 10)
    scene.add(front)

    const mat = (color, metalness = 0.1, roughness = 0.4, extra = {}) =>
      new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra })
    const M = {
      body: mat(0x24344a, 0.75, 0.29),
      base: mat(0x16233a, 0.85, 0.32),
      edge: mat(0x66748a, 0.85, 0.24),
      chrome: mat(0xc3cad0, 0.92, 0.18),
      dark: mat(0x0b1420, 0.45, 0.38),
      rubber: mat(0x070c12, 0.1, 0.6),
      gold: mat(GOLD, 0.52, 0.28),
      ivory: mat(0xe0ded4, 0.48, 0.26),
      brass: mat(0xb9892f, 0.85, 0.3),
      black: mat(0x050909, 0, 0.6),
      light: mat(GOLD2, 0.2, 0.25, { emissive: GOLD2, emissiveIntensity: 1.5 }),
      whiteLight: mat(0xfff3d7, 0.1, 0.3, { emissive: 0xfff0d0, emissiveIntensity: 1.8 }),
      green: mat(0xc6d9a1, 0.1, 0.3, { emissive: 0x91b364, emissiveIntensity: 0.7 }),
      glass: mat(0x81949e, 0.45, 0.16, { transparent: true, opacity: 0.19, depthWrite: false }),
      paper: mat(0xf4f1ea, 0, 0.85),
      concrete: mat(0xa3a39c, 0.05, 0.92),
    }
    const geometries = new Map()
    function boxGeo(w, h, d, r = 0.04) {
      const k = `b${w},${h},${d},${r}`
      if (!geometries.has(k))
        geometries.set(k, r ? new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 3, h / 3, d / 3)) : new THREE.BoxGeometry(w, h, d))
      return geometries.get(k)
    }
    function box(parent, w, h, d, x, y, z, m = M.body, r = 0.04) {
      const o = new THREE.Mesh(boxGeo(w, h, d, r), m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }
    function cyl(parent, r, h, x, y, z, m = M.chrome, r2 = r, segments = 24) {
      const k = `c${r},${r2},${h},${segments}`
      if (!geometries.has(k)) geometries.set(k, new THREE.CylinderGeometry(r, r2, h, segments))
      const o = new THREE.Mesh(geometries.get(k), m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }
    function ball(parent, r, x, y, z, m = M.chrome) {
      const k = `s${r}`
      if (!geometries.has(k)) geometries.set(k, new THREE.SphereGeometry(r, 12, 8))
      const o = new THREE.Mesh(geometries.get(k), m)
      o.position.set(x, y, z)
      parent.add(o)
      return o
    }
    function tube(parent, pts, r, m = M.chrome) {
      const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)))
      const o = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(12, pts.length * 7), r, 8, false), m)
      o.castShadow = true
      parent.add(o)
      return o
    }
    const UP = new THREE.Vector3(0, 1, 0)
    // A straight cylinder between two points: crane tie rods, tripod legs.
    function strut(parent, a, b, r, m = M.chrome) {
      const va = new THREE.Vector3(...a), vb = new THREE.Vector3(...b)
      const d = vb.clone().sub(va), len = d.length()
      const o = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 8), m)
      o.position.copy(va).addScaledVector(d, 0.5)
      o.quaternion.setFromUnitVectors(UP, d.normalize())
      o.castShadow = true
      parent.add(o)
      return o
    }
    function screw(parent, x, y, z) {
      cyl(parent, 0.055, 0.026, x, y, z, M.chrome, undefined, 12)
      box(parent, 0.068, 0.005, 0.009, x, y + 0.014, z, M.dark, 0)
    }
    function canvasTexture(w, h, draw) {
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')
      draw(ctx, w, h)
      const t = new THREE.CanvasTexture(c)
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())
      return { texture: t, canvas: c, ctx }
    }
    function print(ctx, txt, x, y, size = 20, color = '#f4f1ea', weight = 500, display = false) {
      ctx.fillStyle = color
      ctx.font = `${weight} ${size}px ${display ? fonts.displayFont : fonts.bodyFont}`
      ctx.fillText(txt, x, y)
    }
    function screenMaterial(texture) {
      return new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })
    }
    function screen(parent, w, h, x, y, z, tex) {
      const map = 'texture' in tex ? tex.texture : tex
      const o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), screenMaterial(map))
      o.position.set(x, y, z)
      parent.add(o)
      return o
    }
    const machine = new THREE.Group()
    scene.add(machine)
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(70, 70), new THREE.ShadowMaterial({ opacity: 0.23 }))
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.43
    floor.receiveShadow = true
    scene.add(floor)
    const shadow = canvasTexture(128, 128, (c, w, h) => {
      const g = c.createRadialGradient(64, 64, 12, 64, 64, 64)
      g.addColorStop(0, 'rgba(0,0,0,.8)')
      g.addColorStop(0.55, 'rgba(0,0,0,.45)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      c.fillStyle = g
      c.fillRect(0, 0, w, h)
    })
    const contact = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 13),
      new THREE.MeshBasicMaterial({ map: shadow.texture, transparent: true, depthWrite: false, opacity: 0.65 })
    )
    contact.rotation.x = -Math.PI / 2
    contact.position.y = -0.415
    scene.add(contact)
    // A chamfered, layered platform with engraved nomenclature and captive screws.
    box(machine, 12.8, 0.38, 8.25, 0, -0.09, 0, M.base, 0.17)
    box(machine, 12.6, 0.055, 8.08, 0, 0.13, 0, M.edge, 0.11)
    box(machine, 12.49, 0.09, 7.96, 0, 0.19, 0, M.body, 0.1)
    box(machine, 12.55, 0.027, 8.02, 0, -0.19, 0, M.dark, 0.06)
    box(machine, 11.9, 0.026, 0.032, 0, -0.17, 4.115, M.light, 0.01)
    for (const x of [-5.6, 5.6])
      for (const z of [-3.35, 3.35]) {
        cyl(machine, 0.39, 0.25, x, -0.31, z, M.rubber)
        cyl(machine, 0.29, 0.09, x, -0.4, z, M.dark)
        screw(machine, x, 0.253, z)
      }
    for (const x of [-6.02, 6.02]) for (const z of [-3.73, 3.73]) screw(machine, x, 0.255, z)
    const engraving = canvasTexture(1536, 176, (c, w, h) => {
      c.fillStyle = '#1b2838'
      c.fillRect(0, 0, w, h)
      c.strokeStyle = '#3f4f66'
      c.lineWidth = 2
      c.strokeRect(2, 2, w - 4, h - 4)
      print(c, 'VRM', 45, 82, 48, '#e6b04f', 700, true)
      print(c, '·  Design  ·  Plan  ·  Build  ·  We Deliver', 180, 79, 34, '#c9d4e4', 450)
      print(c, 'ENGINEERING SOLUTIONS    /    ONE ACCOUNTABLE TEAM', 47, 133, 19, '#7d8ca3', 500)
      print(c, 'No. 001', 1360, 130, 23, '#d4952a')
    })
    const plate = screen(machine, 7.35, 0.84, -0.4, 0.25, 3.51, engraving)
    plate.rotation.x = -Math.PI / 2
    for (let i = 0; i < 16; i++)
      box(machine, 0.015, 0.009, 0.11 + (i % 4) * 0.035, -5.6 + i * 0.09, 0.249, 3.5, M.edge, 0)
    // Faint drafting marks on the floor around the machine.
    const drafting = new THREE.Group()
    scene.add(drafting)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x7b8aa3, transparent: true, opacity: 0.14 })
    const draftingPoints = []
    for (const r of [7.5, 8.1])
      for (let i = 0; i < 120; i++)
        for (const j of [i, i + 1]) {
          const a = (j / 120) * TAU
          draftingPoints.push(new THREE.Vector3(Math.cos(a) * r, -0.4, Math.sin(a) * r * 0.72))
        }
    for (let i = 0; i < 52; i++) {
      const a = (i / 52) * TAU, r = 8.1
      draftingPoints.push(
        new THREE.Vector3(Math.cos(a) * r, -0.395, Math.sin(a) * r * 0.72),
        new THREE.Vector3(Math.cos(a) * (r + (i % 4 === 0 ? 0.16 : 0.07)), -0.395, Math.sin(a) * (r + (i % 4 === 0 ? 0.16 : 0.07)) * 0.72)
      )
    }
    drafting.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(draftingPoints), lineMat))

    // The stations in flow order. `step` is the place in the project journey; `output` is what it hands on.
    const definitions = [
      { id: 'plan', name: 'Plan & Approve', step: 1, output: 'approval', pos: [-4.15, 0.29, -0.65], desc: 'Site survey, soil tests and NEMA approvals before any money is spent on building.' },
      { id: 'design', name: 'Design', step: 2, output: 'drawings', pos: [-1.5, 0.29, -2.05], desc: 'Architecture, structure and MEP drawn and coordinated by one team.' },
      { id: 'build', name: 'Build', step: 3, output: 'structure', pos: [1.6, 0.29, -2.08], desc: 'Crane up, slabs rising: construction supervised by the people who designed it.' },
      { id: 'manage', name: 'Manage', step: 4, output: 'sign-off', pos: [4.03, 0.29, 0.12], desc: 'Progress, cost, quality and safety tracked all the way to handover.' },
      { id: 'handover', name: 'Handover', step: 5, output: 'keys', pos: [0.93, 0.29, 1.85], desc: 'Final inspection, documents and keys delivered to the client.' },
    ]
    const stations = [], cutPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 10), shellMaterials = []
    function shell(m) {
      const s = m.clone()
      s.clippingPlanes = [cutPlane]
      s.clipShadows = true
      s.side = THREE.DoubleSide
      shellMaterials.push(s)
      return s
    }
    const S = { body: shell(M.body), ivory: shell(M.ivory), gold: shell(M.gold), edge: shell(M.edge) }
    const gears = []
    function gear(parent, x, y, z, r = 0.3, vertical = false) {
      const g = new THREE.Group()
      g.position.set(x, y, z)
      if (vertical) g.rotation.x = Math.PI / 2
      parent.add(g)
      cyl(g, r, 0.09, 0, 0, 0, M.brass)
      cyl(g, r * 0.66, 0.105, 0, 0, 0, M.dark)
      cyl(g, r * 0.22, 0.14, 0, 0, 0, M.chrome)
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU
        const b = box(g, r * 0.26, 0.085, r * 0.2, Math.cos(a) * r, 0, Math.sin(a) * r, M.brass, 0.008)
        b.rotation.y = -a
      }
      g.userData.moving = true
      gears.push({ g, vertical })
      return g
    }
    definitions.forEach((d, i) => {
      const group = new THREE.Group()
      group.position.fromArray(d.pos)
      machine.add(group)
      const glowMat = M.light.clone()
      glowMat.emissiveIntensity = 0.5
      const small = d.id === 'handover'
      const fw = small ? 1.6 : 2.05, fd = small ? 1.4 : 1.78
      box(group, fw, 0.12, fd, 0, 0.03, 0, M.dark, 0.1)
      box(group, fw - 0.08, 0.03, fd - 0.08, 0, 0.12, 0, glowMat, 0.09)
      box(group, fw - 0.02, 0.17, fd - 0.03, 0, 0.215, 0, M.body, 0.1)
      for (const x of [-fw / 2 + 0.18, fw / 2 - 0.18]) for (const z of [-fd / 2 + 0.19, fd / 2 - 0.19]) screw(group, x, 0.311, z)
      // Internal mechanics become visible when the shell is cut at deck height.
      gear(group, -0.35, 0.45, 0, 0.27)
      gear(group, 0.22, 0.45, 0.12, 0.21)
      box(group, 0.6, 0.15, 0.36, 0.52, 0.47, -0.33, M.dark)
      for (let j = 0; j < 6; j++) box(group, 0.025, 0.16, 0.37, 0.3 + j * 0.08, 0.47, -0.33, M.edge, 0.004)
      tube(group, [[-0.7, 0.4, -0.4], [-0.55, 0.48, 0.4], [0.35, 0.45, 0.6], [0.7, 0.58, 0.23]], 0.023, M.light)
      const plaque = canvasTexture(512, 116, (c) => {
        c.fillStyle = '#0d1a2c'
        c.fillRect(0, 0, 512, 116)
        print(c, String(i + 1).padStart(2, '0'), 24, 78, 46, '#e6b04f', 700, true)
        print(c, d.name.toUpperCase(), 100, 76, 40, '#e8edf5', 700, true)
      })
      screen(group, small ? 1.2 : 1.54, small ? 0.27 : 0.345, 0, 0.27, fd / 2 + 0.001, plaque)
      const label = document.createElement('div')
      label.className = 'station-label'
      label.innerHTML = `<div class="stem"></div><div class="label-card"><div class="label-title"><span>${String(i + 1).padStart(2, '0')}</span>${d.name}</div><div class="label-meta">Stage ${d.step} · ${d.output}</div></div>`
      $('labels').appendChild(label)
      cleanups.push(() => label.remove())
      stations.push({ ...d, group, base: new THREE.Vector3(...d.pos), glowMat, label, index: i, anchor: new THREE.Vector3(0, small ? 1.6 : 2.5, 0) })
    })

    // ---------------- 01 Plan & Approve: survey instrument, site map, approval stamp ----------------
    const plan = stations[0].group
    box(plan, 1.74, 0.5, 1.33, 0, 0.58, -0.05, S.ivory, 0.13)
    box(plan, 1.5, 0.08, 1.16, 0, 0.86, -0.04, S.body, 0.025)
    // Theodolite on a tripod.
    const tripod = new THREE.Group()
    tripod.position.set(-0.5, 0.9, -0.2)
    plan.add(tripod)
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * TAU + 0.6
      strut(tripod, [Math.cos(a) * 0.42, 0, Math.sin(a) * 0.42], [0, 1.15, 0], 0.022, M.dark)
      cyl(tripod, 0.035, 0.02, Math.cos(a) * 0.42, 0, Math.sin(a) * 0.42, M.rubber, undefined, 10)
    }
    cyl(tripod, 0.11, 0.05, 0, 1.17, 0, M.chrome)
    const theo = new THREE.Group()
    theo.position.set(0, 1.22, 0)
    theo.userData.moving = true
    tripod.add(theo)
    cyl(theo, 0.07, 0.08, 0, 0.04, 0, M.dark)
    box(theo, 0.2, 0.17, 0.16, 0, 0.17, 0, M.gold, 0.03)
    const lens = cyl(theo, 0.045, 0.3, 0, 0.19, 0.09, M.dark)
    lens.rotation.x = Math.PI / 2
    cyl(theo, 0.052, 0.02, 0, 0.19, 0.24, M.chrome).rotation.x = Math.PI / 2
    box(theo, 0.06, 0.04, 0.03, 0.1, 0.26, 0, M.light, 0.006)
    // Ranging pole: red-and-white striped in the field, gold-and-ivory here.
    for (let i = 0; i < 7; i++) cyl(plan, 0.022, 0.2, 0.78, 0.98 + i * 0.2, 0.42, i % 2 ? M.ivory : M.gold, undefined, 10)
    cyl(plan, 0.03, 0.03, 0.78, 0.88, 0.42, M.chrome)
    // Site survey screen.
    box(plan, 1.04, 0.78, 0.07, 0.2, 1.48, -0.56, M.dark, 0.02)
    const survey = canvasTexture(640, 460, () => {})
    let nemaOn = 0
    function drawSurvey(t) {
      const c = survey.ctx, w = 640, h = 460
      c.fillStyle = '#0a1a30'
      c.fillRect(0, 0, w, h)
      c.strokeStyle = '#17304f'
      c.lineWidth = 1
      for (let x = 0; x < w; x += 40) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke() }
      for (let y = 0; y < h; y += 40) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke() }
      // contours
      c.strokeStyle = '#2f5680'
      c.lineWidth = 2
      c.setLineDash([8, 7])
      c.lineDashOffset = -t * 18
      for (let i = 0; i < 4; i++) {
        c.beginPath()
        for (let x = 0; x <= 400; x += 10) c.lineTo(20 + x, 120 + i * 48 + Math.sin(x / 55 + i) * 22)
        c.stroke()
      }
      c.setLineDash([])
      // plot boundary
      c.strokeStyle = '#e6b04f'
      c.lineWidth = 4
      c.beginPath()
      c.moveTo(80, 150); c.lineTo(330, 118); c.lineTo(378, 300); c.lineTo(126, 352); c.closePath()
      c.stroke()
      c.fillStyle = 'rgba(230,176,79,.08)'
      c.fill()
      print(c, 'LR 1234', 170, 245, 26, '#e6b04f', 700, true)
      print(c, 'SITE SURVEY', 25, 48, 24, '#c9d4e4', 600)
      print(c, 'Kitengela · Kajiado County', 25, 76, 15, '#7d8ca3')
      const rows = [['Topographic survey', 1], ['Soil investigation', 1], ['NEMA approval', nemaOn]]
      rows.forEach(([label, ok], i) => {
        const y = 110 + i * 60
        c.fillStyle = '#122a47'
        c.fillRect(420, y, 200, 46)
        print(c, label, 432, y + 20, 13, '#c9d4e4')
        print(c, ok ? 'APPROVED  ✓' : 'PENDING', 432, y + 38, 12, ok ? '#9fd27a' : '#e6b04f', 600)
      })
      print(c, 'DATUM 1640 m', 25, 435, 13, '#5c6d85')
      survey.texture.needsUpdate = true
    }
    drawSurvey(0)
    screen(plan, 0.95, 0.69, 0.2, 1.49, -0.52, survey)
    // Approval stamp over a permit on the deck.
    cyl(plan, 0.05, 0.9, 0.42, 1.3, 0.1, M.chrome)
    box(plan, 0.5, 0.06, 0.08, 0.3, 1.74, 0.1, M.body, 0.01)
    const stamp = new THREE.Group()
    stamp.position.set(0.1, 1.5, 0.1)
    stamp.userData.moving = true
    plan.add(stamp)
    cyl(stamp, 0.028, 0.34, 0, 0.17, 0, M.chrome)
    box(stamp, 0.28, 0.16, 0.26, 0, -0.06, 0, M.body, 0.03)
    box(stamp, 0.3, 0.04, 0.28, 0, -0.16, 0, M.gold, 0.01)
    box(plan, 0.44, 0.012, 0.32, 0.1, 0.905, 0.1, M.paper, 0)
    const approvedTex = canvasTexture(256, 192, (c, w, h) => {
      c.clearRect(0, 0, w, h)
      c.translate(w / 2, h / 2)
      c.rotate(-0.25)
      c.strokeStyle = '#d4952a'
      c.lineWidth = 6
      c.strokeRect(-100, -38, 200, 76)
      c.textAlign = 'center'
      print(c, 'APPROVED', 0, 16, 44, '#d4952a', 700, true)
    })
    const approvedMark = screen(plan, 0.4, 0.3, 0.1, 0.915, 0.1, approvedTex)
    approvedMark.rotation.x = -Math.PI / 2
    approvedMark.material.transparent = true
    approvedMark.material.opacity = 0
    approvedMark.userData.moving = true
    for (let i = 0; i < 4; i++) box(plan, 0.4, 0.014, 0.3, -0.5 + i * 0.02, 0.91 + i * 0.016, 0.42, M.paper, 0)
    box(plan, 0.08, 0.01, 0.3, -0.45, 0.975, 0.42, M.gold, 0)

    // ---------------- 02 Design: drafting board, plotter, elevation monitor ----------------
    const design = stations[1].group
    box(design, 1.9, 0.66, 1.36, 0, 0.67, -0.04, S.body, 0.11)
    const board = new THREE.Group()
    board.position.set(0, 1.01, -0.08)
    board.rotation.x = -0.32
    design.add(board)
    box(board, 1.76, 0.12, 1.27, 0, 0, 0, S.ivory, 0.04)
    const planTex = canvasTexture(768, 480, () => {})
    const planLines = []
    ;(() => {
      const walls = [
        [60, 70, 700, 70], [700, 70, 700, 410], [700, 410, 60, 410], [60, 410, 60, 70],
        [300, 70, 300, 260], [300, 260, 480, 260], [480, 260, 480, 410], [480, 70, 480, 180],
        [60, 260, 190, 260], [560, 180, 700, 180],
      ]
      for (const l of walls) planLines.push({ l, w: 7, c: '#0f2847' })
      const thin = [[120, 410, 120, 440], [640, 410, 640, 440], [120, 440, 640, 440], [720, 70, 750, 70], [720, 410, 750, 410], [750, 70, 750, 410]]
      for (const l of thin) planLines.push({ l, w: 2, c: '#8a5a0b' })
      for (let i = 0; i < 6; i++) planLines.push({ l: [330 + i * 24, 300, 330 + i * 24, 380], w: 2, c: '#3f5a7a' })
    })()
    function drawPlan(t) {
      const c = planTex.ctx, w = 768, h = 480
      c.fillStyle = '#f3f1ea'
      c.fillRect(0, 0, w, h)
      c.strokeStyle = '#d9d6cc'
      c.lineWidth = 1
      for (let x = 0; x < w; x += 24) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke() }
      for (let y = 0; y < h; y += 24) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke() }
      const progress = (t / 10) % 1, n = planLines.length, reveal = progress * n
      c.lineCap = 'square'
      planLines.forEach(({ l, w: lw, c: col }, i) => {
        const f = Math.max(0, Math.min(1, reveal - i))
        if (f <= 0) return
        c.strokeStyle = col
        c.lineWidth = lw
        c.beginPath()
        c.moveTo(l[0], l[1])
        c.lineTo(l[0] + (l[2] - l[0]) * f, l[1] + (l[3] - l[1]) * f)
        c.stroke()
        if (f < 1) {
          c.fillStyle = '#d4952a'
          c.beginPath()
          c.arc(l[0] + (l[2] - l[0]) * f, l[1] + (l[3] - l[1]) * f, 6, 0, TAU)
          c.fill()
        }
      })
      const labels = [['LIVING', 110, 170], ['KITCHEN', 330, 130], ['BED 1', 520, 130], ['BED 2', 540, 330], ['WC', 100, 340]]
      labels.forEach(([s, x, y], i) => { if (reveal > i * 2 + 2) print(c, s, x, y, 15, '#4a5a70', 600) })
      c.fillStyle = '#0f2847'
      c.fillRect(0, h - 36, w, 36)
      print(c, 'VRM', 18, h - 11, 22, '#e6b04f', 700, true)
      print(c, 'GENERAL ARRANGEMENT · GROUND FLOOR', 80, h - 13, 14, '#dfe6f0', 600)
      print(c, 'A-101  ·  1:100', 620, h - 13, 14, '#9fb0c8')
      planTex.texture.needsUpdate = true
    }
    drawPlan(0)
    const ps = screen(board, 1.53, 0.95, 0, 0.067, -0.08, planTex)
    ps.rotation.x = -Math.PI / 2
    // Plotter gantry sweeping across the board.
    for (const x of [-0.82, 0.82]) box(board, 0.06, 0.2, 0.06, x, 0.13, -0.08, M.dark, 0.01)
    box(board, 1.7, 0.035, 0.035, 0, 0.2, -0.08, M.chrome, 0.01)
    const plotter = new THREE.Group()
    plotter.position.set(0, 0.2, -0.08)
    plotter.userData.moving = true
    board.add(plotter)
    box(plotter, 0.16, 0.18, 0.2, 0, 0, 0, M.body, 0.02)
    cyl(plotter, 0.022, 0.1, 0, -0.1, 0.06, M.chrome)
    box(plotter, 0.05, 0.02, 0.05, 0, -0.145, 0.06, M.light, 0.005)
    // Knobs on the front rail.
    const knobs = []
    for (let i = 0; i < 3; i++) {
      const x = -0.55 + i * 0.36
      cyl(board, 0.074, 0.035, x, 0.1, 0.5, M.dark)
      const k = cyl(board, 0.05, 0.05, x, 0.12, 0.5, M.chrome)
      k.userData.moving = true
      box(k, 0.01, 0.012, 0.045, 0, 0.027, 0.015, M.gold, 0)
      knobs.push(k)
    }
    // Elevation monitor on a stand.
    cyl(design, 0.07, 0.75, -0.35, 1.4, -0.62, M.chrome)
    box(design, 1.12, 0.8, 0.07, -0.3, 1.98, -0.6, M.dark, 0.02)
    const elevation = canvasTexture(640, 440, () => {})
    function drawElevation(t) {
      const c = elevation.ctx, w = 640, h = 440
      c.fillStyle = '#0a1a30'
      c.fillRect(0, 0, w, h)
      print(c, 'ELEVATION A', 24, 42, 20, '#c9d4e4', 600)
      print(c, 'STRUCTURAL CHECK', 460, 42, 13, '#e6b04f', 600)
      // the building
      c.fillStyle = '#17304f'
      c.fillRect(120, 90, 360, 300)
      c.strokeStyle = '#e6b04f'
      c.lineWidth = 3
      c.strokeRect(120, 90, 360, 300)
      for (let f = 0; f < 6; f++) {
        const y = 100 + f * 48
        c.strokeStyle = '#2f5680'
        c.lineWidth = 2
        c.beginPath(); c.moveTo(120, y + 46); c.lineTo(480, y + 46); c.stroke()
        for (let k = 0; k < 6; k++) {
          c.fillStyle = (f * 6 + k) % 5 === 2 ? '#e6b04f' : '#9fb8d8'
          c.fillRect(140 + k * 56, y + 10, 30, 26)
        }
      }
      c.fillStyle = '#0f2847'
      c.fillRect(100, 390, 400, 14)
      const sy = 90 + ((t * 0.18) % 1) * 300
      c.fillStyle = 'rgba(230,176,79,.9)'
      c.fillRect(110, sy, 380, 3)
      c.fillStyle = 'rgba(230,176,79,.18)'
      c.fillRect(110, sy - 40, 380, 40)
      const lvl = 6 - Math.floor(((t * 0.18) % 1) * 6)
      print(c, `LEVEL 0${lvl}  ·  loads OK`, 24, 425, 15, '#9fd27a', 600)
      print(c, 'S-201', 560, 425, 15, '#7d8ca3')
      elevation.texture.needsUpdate = true
    }
    drawElevation(0)
    screen(design, 1.02, 0.7, -0.3, 1.99, -0.56, elevation)
    // Rolled drawings in a rack.
    for (let i = 0; i < 3; i++) {
      const y = 0.52 + i * 0.15
      const roll = cyl(design, 0.062, 0.95, 0.78, y, -0.1, M.paper)
      roll.rotation.x = Math.PI / 2
      for (const z of [-0.49, 0.49]) cyl(design, 0.066, 0.03, 0.78, y, z, M.gold).rotation.x = Math.PI / 2
    }
    box(design, 0.06, 0.5, 1.0, 0.86, 0.6, -0.1, M.dark, 0.01)
    // Desk lamp.
    tube(design, [[-0.85, 1.0, 0.45], [-0.95, 1.5, 0.3], [-0.7, 1.85, 0.05], [-0.45, 1.75, -0.1]], 0.02, M.dark)
    const lampHead = cyl(design, 0.09, 0.16, -0.4, 1.7, -0.14, M.body, 0.05)
    lampHead.rotation.z = 0.8
    cyl(design, 0.045, 0.02, -0.33, 1.65, -0.14, M.whiteLight, undefined, 12).rotation.z = 0.8

    // ---------------- 03 Build: tower crane, slabs rising, concrete mixer ----------------
    const build = stations[2].group
    box(build, 1.5, 0.18, 1.0, 0.05, 0.44, 0.08, S.ivory, 0.045)
    // The building under construction: columns and stacking slabs.
    const frame = new THREE.Group()
    frame.position.set(-0.5, 0.53, 0.2)
    build.add(frame)
    box(frame, 0.95, 0.08, 0.85, 0, 0, 0, M.concrete, 0.01)
    for (const x of [-0.38, 0.38]) for (const z of [-0.33, 0.33]) box(frame, 0.07, 1.65, 0.07, x, 0.86, z, M.concrete, 0.006)
    const slabs = []
    for (let i = 0; i < 5; i++) {
      const s = box(frame, 0.9, 0.05, 0.8, 0, 0.32 + i * 0.32, 0, M.concrete, 0.006)
      s.userData.moving = true
      slabs.push(s)
      for (let k = 0; k < 3; k++) {
        const b = box(frame, 0.03, 0.03, 0.8, -0.3 + k * 0.3, 0.3 + i * 0.32, 0, M.brass, 0)
        b.userData.moving = true
        b.visible = false
        slabs.push(b)
      }
    }
    // Scaffold tube on one face.
    for (let i = 0; i < 4; i++) cyl(frame, 0.012, 0.95, -0.5, 0.42 + i * 0.4, 0, M.gold, undefined, 8).rotation.x = Math.PI / 2
    for (const z of [-0.4, 0, 0.4]) cyl(frame, 0.012, 1.6, -0.5, 0.83, z, M.gold, undefined, 8)
    // Tower crane: lattice mast, slewing unit, jib, trolley and hook.
    const mastX = 0.62, mastZ = -0.3, mastH = 2.55, mastW = 0.2
    cyl(build, 0.3, 0.1, mastX, 0.58, mastZ, M.dark)
    box(build, 0.5, 0.06, 0.5, mastX, 0.6, mastZ, M.concrete, 0.01)
    const half = mastW / 2
    for (const [cx, cz] of [[-half, -half], [half, -half], [half, half], [-half, half]])
      cyl(build, 0.016, mastH, mastX + cx, 0.63 + mastH / 2, mastZ + cz, M.gold, undefined, 8)
    const steps = 11, sh = mastH / steps
    for (let i = 0; i <= steps; i++) {
      const y = 0.63 + i * sh
      box(build, mastW, 0.012, 0.012, mastX, y, mastZ - half, M.gold, 0)
      box(build, mastW, 0.012, 0.012, mastX, y, mastZ + half, M.gold, 0)
      box(build, 0.012, 0.012, mastW, mastX - half, y, mastZ, M.gold, 0)
      box(build, 0.012, 0.012, mastW, mastX + half, y, mastZ, M.gold, 0)
      if (i < steps) {
        const len = Math.hypot(mastW, sh), ang = Math.atan2(mastW, sh) * (i % 2 ? 1 : -1)
        box(build, 0.01, len, 0.01, mastX, y + sh / 2, mastZ + half, M.gold, 0).rotation.z = ang
        box(build, 0.01, len, 0.01, mastX, y + sh / 2, mastZ - half, M.gold, 0).rotation.z = -ang
        box(build, 0.01, len, 0.01, mastX + half, y + sh / 2, mastZ, M.gold, 0).rotation.x = ang
        box(build, 0.01, len, 0.01, mastX - half, y + sh / 2, mastZ, M.gold, 0).rotation.x = -ang
      }
    }
    const crane = new THREE.Group()
    crane.position.set(mastX, 0.63 + mastH, mastZ)
    crane.userData.moving = true
    build.add(crane)
    cyl(crane, 0.14, 0.08, 0, 0.04, 0, M.dark)
    box(crane, 0.24, 0.2, 0.26, 0.06, 0.2, 0.16, M.gold, 0.02)
    box(crane, 0.14, 0.1, 0.02, 0.06, 0.22, 0.3, M.dark, 0.004)
    // Jib (towards +x) and counter-jib (towards -x).
    const jibL = 2.3, cjL = 0.75, jy = 0.32
    box(crane, jibL, 0.03, 0.03, jibL / 2, jy + 0.12, 0, M.gold, 0)
    for (const z of [-0.07, 0.07]) box(crane, jibL, 0.03, 0.03, jibL / 2, jy, z, M.gold, 0)
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * jibL
      box(crane, 0.012, 0.12, 0.012, x, jy + 0.06, -0.07, M.gold, 0)
      box(crane, 0.012, 0.12, 0.012, x, jy + 0.06, 0.07, M.gold, 0)
      box(crane, 0.012, 0.012, 0.14, x, jy, 0, M.gold, 0)
      if (i < 10) {
        const seg = jibL / 10, len = Math.hypot(seg, 0.12), ang = Math.atan2(seg, 0.12) * (i % 2 ? 1 : -1)
        box(crane, 0.01, len, 0.01, x + seg / 2, jy + 0.06, -0.07, M.gold, 0).rotation.z = ang
        box(crane, 0.01, len, 0.01, x + seg / 2, jy + 0.06, 0.07, M.gold, 0).rotation.z = -ang
      }
    }
    box(crane, cjL, 0.04, 0.16, -cjL / 2, jy + 0.02, 0, M.gold, 0.004)
    box(crane, 0.26, 0.3, 0.22, -cjL + 0.1, jy - 0.14, 0, M.dark, 0.01)
    box(crane, 0.14, 0.12, 0.14, -cjL + 0.5, jy + 0.12, 0, M.body, 0.01)
    // Tower top and tie rods.
    cyl(crane, 0.04, 0.5, 0, jy + 0.37, 0, M.gold, 0.02, 8)
    strut(crane, [0, jy + 0.62, 0], [jibL - 0.05, jy + 0.14, 0], 0.006, M.chrome)
    strut(crane, [0, jy + 0.62, 0], [jibL * 0.55, jy + 0.14, 0], 0.006, M.chrome)
    strut(crane, [0, jy + 0.62, 0], [-cjL + 0.05, jy + 0.04, 0], 0.006, M.chrome)
    const beaconMat = M.light.clone()
    ball(crane, 0.05, 0, jy + 0.66, 0, beaconMat)
    const trolley = new THREE.Group()
    trolley.position.set(1.0, jy - 0.03, 0)
    trolley.userData.moving = true
    crane.add(trolley)
    box(trolley, 0.14, 0.07, 0.17, 0, 0, 0, M.dark, 0.01)
    const cable = cyl(trolley, 0.006, 1, 0, -0.5, 0, M.dark, undefined, 6)
    cable.userData.moving = true
    const hook = new THREE.Group()
    hook.userData.moving = true
    trolley.add(hook)
    box(hook, 0.05, 0.1, 0.03, 0, 0, 0, M.chrome, 0.006)
    box(hook, 0.55, 0.05, 0.32, 0, -0.1, 0, M.concrete, 0.006)
    for (const x of [-0.2, 0.2]) strut(hook, [x, -0.08, 0], [0, 0.02, 0], 0.005, M.chrome)
    // Concrete mixer.
    const mixer = new THREE.Group()
    mixer.position.set(0.55, 0.62, 0.55)
    build.add(mixer)
    box(mixer, 0.5, 0.06, 0.3, 0, 0.08, 0, M.dark, 0.01)
    for (const x of [-0.17, 0.17]) cyl(mixer, 0.07, 0.04, x, 0.04, 0.17, M.rubber, undefined, 16).rotation.x = Math.PI / 2
    cyl(mixer, 0.03, 0.4, -0.12, 0.26, 0, M.chrome)
    const drumPivot = new THREE.Group()
    drumPivot.position.set(0.02, 0.4, 0)
    drumPivot.rotation.z = -0.75
    mixer.add(drumPivot)
    const drum = new THREE.Group()
    drum.userData.moving = true
    drumPivot.add(drum)
    cyl(drum, 0.2, 0.42, 0, 0, 0, M.gold, 0.11)
    cyl(drum, 0.12, 0.08, 0, 0.24, 0, M.dark, 0.08)
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * TAU
      box(drum, 0.03, 0.4, 0.03, Math.cos(a) * 0.19, 0, Math.sin(a) * 0.19, M.dark, 0.004)
    }
    box(mixer, 0.28, 0.04, 0.16, 0.3, 0.3, 0, M.chrome, 0.004).rotation.z = 0.5
    // Site safety: a cone and a barrier.
    cyl(build, 0.1, 0.02, -0.9, 0.55, 0.65, M.gold, undefined, 12)
    cyl(build, 0.02, 0.26, -0.9, 0.69, 0.65, M.gold, 0.08, 12)
    cyl(build, 0.055, 0.04, -0.9, 0.7, 0.65, M.ivory, 0.065, 12)

    // ---------------- 04 Manage: site dashboard, beacon, clipboard, hard hat ----------------
    const manage = stations[3].group
    box(manage, 1.75, 1.3, 1.02, 0, 1.0, -0.13, S.body, 0.12)
    box(manage, 1.58, 0.13, 1.09, 0, 1.69, -0.13, S.gold, 0.04)
    box(manage, 1.47, 1.0, 0.055, 0, 1.08, 0.405, M.dark, 0.025)
    const progress = canvasTexture(640, 430, () => {})
    function drawProgress(t) {
      const c = progress.ctx, w = 640, h = 430
      c.fillStyle = '#0a1a30'
      c.fillRect(0, 0, w, h)
      print(c, 'SITE PROGRESS', 28, 46, 24, '#e8edf5', 600)
      print(c, 'Week 24 / 48', 490, 46, 18, '#e6b04f', 600)
      const rows = [['Structure', 1], ['MEP first fix', 0.4 + ((t * 0.05) % 0.6)], ['Finishes', 0.18]]
      rows.forEach(([label, f], i) => {
        const y = 84 + i * 66
        c.fillStyle = '#122a47'
        c.fillRect(24, y, 592, 52)
        print(c, label, 40, y + 22, 15, '#c9d4e4', 600)
        print(c, `${Math.round(f * 100)}%`, 560, y + 22, 14, '#9fb0c8')
        c.fillStyle = '#1f3d63'
        c.fillRect(40, y + 32, 560, 9)
        c.fillStyle = f >= 1 ? '#9fd27a' : '#e6b04f'
        c.fillRect(40, y + 32, 560 * f, 9)
      })
      const y = 290
      c.fillStyle = '#122a47'
      c.fillRect(24, y, 288, 112)
      c.fillRect(328, y, 288, 112)
      print(c, 'BUDGET', 40, y + 28, 12, '#7d8ca3', 600)
      print(c, 'On track', 40, y + 66, 26, '#9fd27a', 600)
      print(c, 'KES 48.2M of 52M', 40, y + 94, 13, '#9fb0c8')
      print(c, 'SAFETY', 344, y + 28, 12, '#7d8ca3', 600)
      print(c, `${Math.floor(t / 3) % 2 ? '0' : '0'} incidents`, 344, y + 66, 26, '#9fd27a', 600)
      print(c, 'Toolbox talk 07:30 ✓', 344, y + 94, 13, '#9fb0c8')
      progress.texture.needsUpdate = true
    }
    drawProgress(0)
    screen(manage, 1.31, 0.88, 0, 1.1, 0.44, progress)
    // Ledge with a clipboard and a hard hat.
    box(manage, 1.27, 0.075, 0.33, 0, 0.5, 0.56, M.chrome, 0.02)
    const clip = new THREE.Group()
    clip.position.set(-0.38, 0.56, 0.5)
    clip.rotation.x = -0.9
    manage.add(clip)
    box(clip, 0.34, 0.46, 0.02, 0, 0.2, 0, M.dark, 0.006)
    box(clip, 0.14, 0.05, 0.03, 0, 0.42, 0, M.chrome, 0.006)
    const checklist = canvasTexture(220, 300, () => {})
    function drawChecklist(t) {
      const c = checklist.ctx, w = 220, h = 300
      c.fillStyle = '#f4f1ea'
      c.fillRect(0, 0, w, h)
      print(c, 'SITE CHECKLIST', 18, 34, 15, '#0f2847', 700, true)
      const items = ['Hoarding & signage', 'PPE on site', 'Rebar inspected', 'Formwork plumb', 'Concrete slump', 'Cover to rebar']
      const done = Math.floor((t / 2) % (items.length + 1))
      items.forEach((s, i) => {
        const y = 66 + i * 36
        c.strokeStyle = '#8a5a0b'
        c.lineWidth = 2
        c.strokeRect(18, y - 14, 16, 16)
        if (i < done) {
          c.strokeStyle = '#2f8a3e'
          c.lineWidth = 3
          c.beginPath(); c.moveTo(21, y - 6); c.lineTo(26, y - 1); c.lineTo(33, y - 12); c.stroke()
        }
        print(c, s, 44, y, 13, '#34445c')
      })
      print(c, 'Eng. V. Ooko', 18, 286, 12, '#7d8ca3')
      checklist.texture.needsUpdate = true
    }
    drawChecklist(0)
    screen(clip, 0.3, 0.41, 0, 0.21, 0.012, checklist)
    const hat = new THREE.Group()
    hat.position.set(0.4, 0.54, 0.52)
    manage.add(hat)
    hat.add(Object.assign(new THREE.Mesh(new THREE.SphereGeometry(0.17, 20, 12, 0, TAU, 0, Math.PI / 2), M.gold), { castShadow: true }))
    cyl(hat, 0.22, 0.02, 0, 0.01, 0, M.gold, 0.2, 24)
    box(hat, 0.04, 0.15, 0.2, 0, 0.1, 0, M.gold, 0.01)
    // Indicator lights under the screen.
    for (let i = 0; i < 5; i++) cyl(manage, 0.03, 0.02, -0.5 + i * 0.25, 0.68, 0.44, i < 4 ? M.green : M.light, undefined, 12).rotation.x = Math.PI / 2
    // Rotating site beacon on a mast, plus a radio antenna.
    cyl(manage, 0.03, 1.0, 0.62, 2.2, -0.3, M.chrome)
    cyl(manage, 0.1, 0.03, 0.62, 2.71, -0.3, M.dark)
    const beacon = new THREE.Group()
    beacon.position.set(0.62, 2.8, -0.3)
    beacon.userData.moving = true
    manage.add(beacon)
    const beaconGlass = M.glass.clone()
    beaconGlass.color.set(GOLD2)
    beaconGlass.opacity = 0.35
    cyl(beacon, 0.09, 0.16, 0, 0, 0, beaconGlass, 0.08, 16)
    const beaconLamp = M.light.clone()
    box(beacon, 0.12, 0.1, 0.04, 0, 0, 0.04, beaconLamp, 0.005)
    cyl(beacon, 0.1, 0.02, 0, 0.09, 0, M.dark, undefined, 16)
    cyl(manage, 0.012, 0.8, -0.6, 2.1, -0.4, M.chrome, undefined, 6)
    ball(manage, 0.03, -0.6, 2.5, -0.4, M.gold)
    for (let i = 0; i < 7; i++) box(manage, 0.55, 0.027, 0.02, 0, 0.3 + i * 0.05, -0.645, M.dark, 0.003)

    // ---------------- 05 Handover: certificate printer and the keys ----------------
    const handover = stations[4].group
    box(handover, 1.3, 0.45, 1.0, 0, 0.5, -0.05, S.ivory, 0.1)
    box(handover, 1.36, 0.16, 1.06, 0, 0.32, -0.04, S.body, 0.04)
    box(handover, 0.5, 0.08, 0.1, -0.3, 0.76, -0.1, M.dark, 0.01)
    box(handover, 0.42, 0.03, 0.03, -0.3, 0.78, -0.03, M.chrome, 0.006)
    const certTex = canvasTexture(280, 400, (c, w, h) => {
      c.fillStyle = '#f4f1ea'
      c.fillRect(0, 0, w, h)
      c.strokeStyle = '#d4952a'
      c.lineWidth = 4
      c.strokeRect(12, 12, w - 24, h - 24)
      c.textAlign = 'center'
      print(c, 'CERTIFICATE', w / 2, 62, 26, '#0f2847', 700, true)
      print(c, 'OF PRACTICAL COMPLETION', w / 2, 86, 13, '#8a5a0b', 600)
      c.textAlign = 'left'
      print(c, 'Project', 34, 140, 12, '#7d8ca3')
      print(c, 'Residential House', 34, 162, 17, '#34445c', 600)
      print(c, 'Kitengela, Kajiado County', 34, 182, 12, '#34445c')
      print(c, 'Delivered by', 34, 224, 12, '#7d8ca3')
      print(c, 'VRM Engineering Solutions Ltd', 34, 246, 14, '#34445c', 600)
      c.strokeStyle = '#d4952a'
      c.lineWidth = 5
      c.beginPath(); c.arc(200, 320, 42, 0, TAU); c.stroke()
      c.textAlign = 'center'
      print(c, 'HANDED', 200, 316, 13, '#d4952a', 700)
      print(c, 'OVER', 200, 334, 13, '#d4952a', 700)
      c.textAlign = 'left'
      c.strokeStyle = '#34445c'
      c.lineWidth = 1
      c.beginPath(); c.moveTo(34, 340); c.lineTo(140, 340); c.stroke()
      print(c, 'Eng. Vincent Ooko', 34, 358, 11, '#34445c')
    })
    const cert = new THREE.Group()
    cert.position.set(-0.3, 0.78, -0.1)
    cert.userData.moving = true
    handover.add(cert)
    const cp = screen(cert, 0.41, 0.6, 0, 0.3, 0.01, certTex)
    cp.material.side = THREE.DoubleSide
    cert.rotation.x = -0.16
    cyl(handover, 0.3, 0.09, 0.35, 0.76, 0.18, M.dark)
    cyl(handover, 0.25, 0.025, 0.35, 0.82, 0.18, M.brass)
    const keys = new THREE.Group()
    keys.userData.moving = true
    handover.add(keys)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.016, 8, 24), M.gold)
    keys.add(ring)
    for (const [a, len] of [[0.3, 0.26], [-0.5, 0.22]]) {
      const k = new THREE.Group()
      k.rotation.z = a
      keys.add(k)
      box(k, 0.03, len, 0.016, 0, -0.09 - len / 2, 0, M.gold, 0.004)
      box(k, 0.07, 0.03, 0.016, 0.02, -0.09 - len + 0.02, 0, M.gold, 0.004)
      box(k, 0.05, 0.03, 0.016, 0.01, -0.09 - len + 0.08, 0, M.gold, 0.004)
    }
    const signTex = canvasTexture(512, 116, (c) => {
      c.fillStyle = '#0d1a2c'
      c.fillRect(0, 0, 512, 116)
      print(c, 'KEYS & DOCUMENTS', 22, 72, 36, '#e6b04f', 700, true)
      print(c, '→ CLIENT', 370, 72, 30, '#e8edf5', 600, true)
    })
    screen(handover, 0.9, 0.2, 0.05, 0.62, 0.46, signTex)

    // Conveyor: a closed spline, instanced treads, continuous rails and phase-locked cargo.
    const path = new THREE.CatmullRomCurve3(
      [
        [-3.9, 0.84, 0.9], [-3.45, 0.84, -0.25], [-2.2, 0.84, -0.95], [0.3, 0.84, -1.05], [2.6, 0.84, -0.85],
        [3.5, 0.84, 0.2], [3.3, 0.84, 1.5], [1.2, 0.84, 2.6], [-1.5, 0.84, 2.5], [-3.4, 0.84, 1.9],
      ].map((p) => new THREE.Vector3(...p)),
      true,
      'catmullrom',
      0.25
    )
    const belt = new THREE.Group()
    machine.add(belt)
    const frameMesh = new THREE.Mesh(new THREE.TubeGeometry(path, 150, 0.35, 8, true), M.dark)
    frameMesh.scale.y = 0.3
    frameMesh.position.y = 0.51
    belt.add(frameMesh)
    const beltCount = 150
    const beltSlats = new THREE.InstancedMesh(boxGeo(0.135, 0.065, 0.63, 0.012), M.body, beltCount)
    beltSlats.receiveShadow = true
    beltSlats.castShadow = false
    belt.add(beltSlats)
    beltSlats.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    const dummy = new THREE.Object3D(), pVec = new THREE.Vector3(), tVec = new THREE.Vector3()
    function updateBelt(t) {
      for (let i = 0; i < beltCount; i++) {
        const u = (i / beltCount + t * 0.012) % 1
        path.getPointAt(u, pVec)
        path.getTangentAt(u, tVec)
        dummy.position.copy(pVec)
        dummy.rotation.set(0, -Math.atan2(tVec.z, tVec.x), 0)
        dummy.updateMatrix()
        beltSlats.setMatrixAt(i, dummy.matrix)
      }
      beltSlats.instanceMatrix.needsUpdate = true
    }
    updateBelt(0)
    for (const side of [-1, 1]) {
      const pts = []
      for (let i = 0; i <= 160; i++) {
        path.getPointAt(i / 160, pVec)
        path.getTangentAt(i / 160, tVec)
        pts.push(pVec.clone().add(new THREE.Vector3(-tVec.z * 0.36 * side, 0.09, tVec.x * 0.36 * side)))
      }
      belt.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 160, 0.028, 6, false), M.chrome))
    }
    for (let i = 0; i < 16; i++) {
      const p = path.getPointAt(i / 16)
      cyl(belt, 0.045, 0.43, p.x, 0.53, p.z, M.chrome)
    }
    // Brass service lines link the station footings independently from the conveyor.
    const pipes = new THREE.Group()
    machine.add(pipes)
    for (let i = 0; i < 4; i++) {
      const a = stations[i].base, b = stations[i + 1].base
      const points = [
        a.clone().add(new THREE.Vector3(0.4, 0.12, 0)),
        a.clone().lerp(b, 0.35).add(new THREE.Vector3(0, 0.1, -0.6)),
        a.clone().lerp(b, 0.65).add(new THREE.Vector3(0, 0.1, -0.6)),
        b.clone().add(new THREE.Vector3(-0.4, 0.12, 0)),
      ]
      pipes.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 30, 0.054, 8, false), M.brass))
    }
    // The five faces a project packet shows along the way.
    const briefTex = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = '#d4952a'
      c.fillRect(0, 0, w, h)
      print(c, 'PROJECT', 21, 52, 30, '#1b2838', 700, true)
      print(c, 'BRIEF', 21, 86, 30, '#1b2838', 700, true)
      c.strokeStyle = '#8a5a0b'
      c.lineWidth = 2
      c.strokeRect(23, 112, 210, 139)
      print(c, 'Mwangi', 42, 170, 34, '#1b2838', 600)
      print(c, '4-bed house · Kitengela', 42, 205, 14, '#3a2d0f')
      print(c, 'RESIDENTIAL / 01', 23, 320, 17, '#5a3f10')
    })
    const permitTex = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = '#eeeae0'
      c.fillRect(0, 0, w, h)
      print(c, 'PERMIT', 24, 50, 30, '#0f2847', 700, true)
      print(c, 'NEMA · County · Survey', 24, 80, 14, '#7d8ca3')
      for (let i = 0; i < 7; i++) {
        c.fillStyle = '#b9b9ae'
        c.fillRect(24, 108 + i * 20, 190 - (i % 3) * 24, 6)
      }
      c.save()
      c.translate(128, 262)
      c.rotate(-0.22)
      c.strokeStyle = '#2f8a3e'
      c.lineWidth = 5
      c.strokeRect(-92, -30, 184, 60)
      c.textAlign = 'center'
      print(c, 'APPROVED', 0, 12, 32, '#2f8a3e', 700, true)
      c.restore()
    })
    const drawingsTex = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = '#f3f1ea'
      c.fillRect(0, 0, w, h)
      c.strokeStyle = '#0f2847'
      c.lineWidth = 5
      c.strokeRect(30, 70, 196, 150)
      c.beginPath(); c.moveTo(110, 70); c.lineTo(110, 150); c.lineTo(226, 150); c.stroke()
      c.strokeStyle = '#8a5a0b'
      c.lineWidth = 2
      c.beginPath(); c.moveTo(30, 240); c.lineTo(226, 240); c.stroke()
      print(c, 'DRAWINGS', 24, 48, 28, '#0f2847', 700, true)
      print(c, 'A-101 · S-201 · M-301', 24, 272, 14, '#34445c', 600)
      print(c, 'ISSUED FOR CONSTRUCTION', 24, 320, 13, '#8a5a0b', 700)
    })
    const buildTex = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = '#0a1a30'
      c.fillRect(0, 0, w, h)
      c.fillStyle = '#17304f'
      c.fillRect(48, 90, 160, 190)
      c.strokeStyle = '#e6b04f'
      c.lineWidth = 3
      c.strokeRect(48, 90, 160, 190)
      for (let f = 0; f < 5; f++) {
        c.fillStyle = f < 3 ? '#9fb8d8' : '#2f5680'
        for (let k = 0; k < 4; k++) c.fillRect(60 + k * 38, 100 + f * 36, 22, 18)
      }
      c.fillStyle = '#e6b04f'
      c.fillRect(200, 60, 4, 230)
      c.fillRect(120, 60, 110, 4)
      print(c, 'UNDER', 24, 44, 26, '#e8edf5', 700, true)
      print(c, 'CONSTRUCTION', 24, 72, 20, '#e6b04f', 700, true)
      c.fillStyle = '#1f3d63'
      c.fillRect(24, 310, 208, 8)
      c.fillStyle = '#e6b04f'
      c.fillRect(24, 310, 130, 8)
      print(c, '62%', 24, 340, 15, '#9fb0c8', 600)
    })
    const packetTextures = [briefTex, permitTex, drawingsTex, buildTex, certTex]
    const packets = []
    for (let i = 0; i < 6; i++) {
      const g = new THREE.Group()
      g.userData.moving = true
      machine.add(g)
      box(g, 0.47, 0.71, 0.04, 0, 0, 0, M.ivory, 0.022)
      const faces = packetTextures.map((tex) => {
        const s = screen(g, 0.43, 0.665, 0, 0, 0.024, tex)
        s.material.side = THREE.DoubleSide
        s.visible = false
        return s
      })
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.4, 0.414, 40),
        new THREE.MeshBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false })
      )
      halo.rotation.x = -Math.PI / 2
      halo.position.y = -0.37
      g.add(halo)
      halo.visible = false
      packets.push({ group: g, faces, halo, stage: -1, phase: 0 })
    }
    // Find ports by arc length, so the travelling project arrives at the actual station.
    function nearestPort(x, z) {
      let best = 0, dist = Infinity
      for (let i = 0; i < 300; i++) {
        const p = path.getPointAt(i / 300), d = (p.x - x) ** 2 + (p.z - z) ** 2
        if (d < dist) { dist = d; best = i / 300 }
      }
      return best
    }
    const planU = nearestPort(-3.85, 0.55),
      designU = nearestPort(-1.5, -1.0),
      buildU = nearestPort(1.6, -1.05),
      manageU = nearestPort(3.5, 0.3),
      handoverU = nearestPort(0.93, 2.6)
    const planPort = path.getPointAt(planU).clone()

    // Merge static geometry per parent/material. Moving assemblies remain separate.
    function compact(group) {
      for (const child of [...group.children]) if (child.isGroup) compact(child)
      const buckets = new Map()
      for (const child of group.children) {
        if (!child.isMesh || child.isInstancedMesh || child.userData.moving || Array.isArray(child.material)) continue
        const k = child.material.uuid
        if (!buckets.has(k)) buckets.set(k, [])
        buckets.get(k).push(child)
      }
      for (const list of buckets.values()) {
        if (list.length < 2) continue
        const geos = list.map((m) => {
          m.updateMatrix()
          const g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone()
          return g.applyMatrix4(m.matrix)
        })
        const merged = mergeGeometries(geos, false)
        for (const geo of geos) geo.dispose()
        if (!merged) continue
        const mesh = new THREE.Mesh(merged, list[0].material)
        mesh.castShadow = list.some((x) => x.castShadow)
        mesh.receiveShadow = list.some((x) => x.receiveShadow)
        for (const m of list) group.remove(m)
        group.add(mesh)
      }
    }
    compact(machine)
    stations.forEach((s) => s.group.traverse((o) => { o.userData.station = s.id }))
    const pickables = stations.map((s) => s.group)

    let mode = 'assembled', cameraMode = 'overview', playing = !reduceMotion, simTime = 0, spread = 0, selected = 'plan', hovered = null
    let width = frameWidth(), height = frameHeight(), mobile = width <= 900, lastInteraction = performance.now(), dragging = false, wasDragged = false, downX = 0, downY = 0
    let cameraAnimating = true, flightTime = 0, lastDraw = -1, visible = true, contextLost = false
    const desiredPosition = new THREE.Vector3(), desiredTarget = new THREE.Vector3(0, 1, 0)
    const viewDirection = new THREE.Vector3(10.5, 10.8, 17).normalize()
    let baseDistance = 25, sized = false
    function layoutCamera() {
      if (!frameWidth() || !frameHeight()) return
      const first = !sized
      sized = true
      width = frameWidth()
      height = frameHeight()
      mobile = width <= 900
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.setViewOffset(width, height, 0, mobile ? 0 : height * 0.025, width, height)
      const aspect = width / height
      const availableWidth = mobile ? 0.91 : Math.min(0.55, aspect > 2 ? 0.54 : 0.57)
      const horizontalFit = 17.3 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspect * availableWidth)
      const verticalFit = 11.5 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 0.62)
      baseDistance = Math.max(horizontalFit, verticalFit) * (mobile ? 0.97 : 0.86)
      controls.maxDistance = Math.max(55, baseDistance * 1.6)
      camera.updateProjectionMatrix()
      setCameraGoal()
      cameraAnimating = true
      if (first) {
        camera.position.copy(desiredPosition)
        controls.target.copy(desiredTarget)
        controls.update()
        cameraAnimating = false
      }
    }
    function setCameraGoal() {
      const expand = mode === 'stations' ? 1.2 : 1
      if (cameraMode === 'station') {
        const s = stations.find((s) => s.id === selected)
        desiredTarget.copy(s.group.position).add(new THREE.Vector3(0, 1.25, 0))
        desiredPosition.copy(desiredTarget).addScaledVector(viewDirection, mobile ? 9 : 12)
      } else {
        desiredTarget.set(0, 1, 0)
        const distance = baseDistance * expand
        if (cameraMode === 'side') desiredPosition.set(13, 5, 20).normalize().multiplyScalar(distance).add(desiredTarget)
        else if (cameraMode === 'top') desiredPosition.set(0.01, distance, 0.8).add(desiredTarget)
        else desiredPosition.copy(viewDirection).multiplyScalar(distance).add(desiredTarget)
      }
    }
    function syncButtons() {
      root.querySelectorAll('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)))
      root.querySelectorAll('[data-camera]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.camera === cameraMode)))
      $('journey').classList.toggle('visible', mode === 'project')
    }
    const modes = ['assembled', 'cutaway', 'stations', 'project'], cameras = ['overview', 'side', 'top', 'station', 'flight']
    function setMode(name) {
      if (!modes.includes(name)) return false
      mode = name
      lastInteraction = performance.now()
      if (mode === 'project') {
        simTime = 0
        lastDraw = -1
        play()
        cameraMode = 'overview'
      } else if (cameraMode === 'station') cameraMode = 'overview'
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function focusStation(id) {
      const s = stations.find((s) => s.id === id)
      if (!s) return false
      selected = id
      if (mode === 'project') mode = 'assembled'
      cameraMode = 'station'
      lastInteraction = performance.now()
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function setCamera(name) {
      if (!cameras.includes(name)) return false
      cameraMode = name
      if (mode === 'project') mode = 'assembled'
      lastInteraction = performance.now()
      flightTime = 0
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function syncPlayback() {
      const b = $('play')
      b.setAttribute('aria-label', playing ? 'Pause the animation' : 'Resume the animation')
      b.setAttribute('aria-pressed', String(!playing))
      b.innerHTML = playing
        ? '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1" width="2.5" height="10"/><rect x="7.5" y="1" width="2.5" height="10"/></svg>'
        : '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M3 1l8 5-8 5z"/></svg>'
      $('status').classList.toggle('paused', !playing)
      $('status-text').textContent = playing ? 'Machine running' : 'Machine paused'
    }
    function play() { playing = true; syncPlayback(); return true }
    function pause() { playing = false; syncPlayback(); return true }
    root.querySelectorAll('[data-mode]').forEach((b) => listen(b, 'click', () => setMode(b.dataset.mode ?? '')))
    root.querySelectorAll('[data-camera]').forEach((b) => listen(b, 'click', () => setCamera(b.dataset.camera ?? '')))
    listen($('play'), 'click', () => (playing ? pause() : play()))
    syncPlayback()
    layoutCamera()
    camera.position.copy(desiredPosition)
    controls.target.copy(desiredTarget)
    controls.update()
    cameraAnimating = false
    listen(window, 'resize', layoutCamera)
    const resizeObserver = new ResizeObserver(() => layoutCamera())
    resizeObserver.observe(root)
    cleanups.push(() => resizeObserver.disconnect())
    controls.addEventListener('start', () => { dragging = true; cameraAnimating = false; lastInteraction = performance.now() })
    controls.addEventListener('end', () => { dragging = false; lastInteraction = performance.now() })
    controls.addEventListener('change', () => { if (dragging) lastInteraction = performance.now() })
    const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2(), tooltip = $('tooltip')
    const local = (e) => {
      const r = root.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top]
    }
    function hitStation(x, y) {
      pointer.set((x / width) * 2 - 1, (-y / height) * 2 + 1)
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(pickables, true)
      return hits.length ? stations.find((s) => s.id === hits[0].object.userData.station) : null
    }
    listen(renderer.domElement, 'pointermove', (e) => {
      const [x, y] = local(e)
      if (Math.hypot(x - downX, y - downY) > 5) wasDragged = true
      if (dragging) return
      const s = hitStation(x, y)
      hovered = s ? s.id : null
      renderer.domElement.style.cursor = s ? 'pointer' : 'grab'
      tooltip.classList.toggle('visible', !!s)
      if (s) {
        tooltip.querySelector('strong').innerHTML = `<span>${String(s.index + 1).padStart(2, '0')}</span>${s.name}`
        tooltip.querySelector('p').textContent = s.desc
        tooltip.style.left = Math.min(width - 255, Math.max(10, x + 16)) + 'px'
        tooltip.style.top = Math.max(10, Math.min(height - 95, y - 65)) + 'px'
      }
    })
    listen(renderer.domElement, 'pointerleave', () => { hovered = null; tooltip.classList.remove('visible') })
    listen(renderer.domElement, 'pointerdown', (e) => {
      ;[downX, downY] = local(e)
      wasDragged = false
      tooltip.classList.remove('visible')
    })
    listen(renderer.domElement, 'pointerup', (e) => {
      if (wasDragged) return
      const s = hitStation(...local(e))
      if (s) focusStation(s.id)
    })
    listen(document, 'visibilitychange', () => { visible = !document.hidden; lastFrame = performance.now() })
    const observer = new IntersectionObserver((entries) => { visible = entries[0].isIntersecting && !document.hidden; lastFrame = performance.now() }, { threshold: 0.01 })
    observer.observe(renderer.domElement)
    cleanups.push(() => observer.disconnect())
    listen(renderer.domElement, 'webglcontextlost', (e) => {
      e.preventDefault()
      contextLost = true
      showError('The graphics context was interrupted. The scene comes back on its own once WebGL is available again.')
    })
    listen(renderer.domElement, 'webglcontextrestored', () => { contextLost = false; $('error').style.display = 'none'; lastFrame = performance.now() })

    const scratch = new THREE.Vector3(), anchor = new THREE.Vector3()
    const journeySteps = [
      ['Brief received', 'Plan & Approve · a brief from the client'],
      ['Approved', 'Plan & Approve · survey done, NEMA permit stamped'],
      ['Drawings issued', 'Design · architecture, structure and MEP coordinated'],
      ['Under construction', 'Build · crane up, slabs rising, site supervised'],
      ['Handed over', 'Manage → Handover · inspected, documented, keys delivered'],
    ]
    let prevJourney = -1, lastFrame = performance.now(), frameCount = 0, measureTime = 0, pixelRatio = renderer.getPixelRatio()
    let rafId = 0
    function animate(now) {
      rafId = requestAnimationFrame(animate)
      const dt = Math.max(0, Math.min((now - lastFrame) / 1000, 0.045))
      lastFrame = now
      if (!visible || contextLost) return
      if (playing) { simTime += dt; flightTime += dt }
      const t = simTime, beat = (t / 4) % 1, tact = (t * TAU) / 4, smooth = 1 - Math.exp(-dt * 5)
      spread = THREE.MathUtils.lerp(spread, mode === 'stations' ? 1 : 0, smooth)
      cutPlane.constant = THREE.MathUtils.lerp(cutPlane.constant, mode === 'cutaway' ? 0.99 : 10, smooth)
      stations.forEach((s, i) => {
        s.group.position.copy(s.base)
        s.group.position.x *= 1 + spread * 0.29
        s.group.position.z *= 1 + spread * 0.37
        s.group.position.y += spread * (i % 2 ? 0.32 : 0.55)
        const pulse = Math.pow(Math.max(0, Math.sin(tact - i * 0.9)), 7)
        s.glowMat.emissiveIntensity = THREE.MathUtils.lerp(
          s.glowMat.emissiveIntensity,
          hovered === s.id || (cameraMode === 'station' && selected === s.id) ? 3.5 : 0.55 + pulse * 0.65,
          smooth
        )
      })
      belt.scale.set(1 + spread * 0.12, 1, 1 + spread * 0.15)
      pipes.scale.set(1 + spread * 0.25, 1, 1 + spread * 0.3)
      gears.forEach(({ g, vertical }, i) => {
        if (vertical) g.rotation.z = t * (i % 2 ? -1 : 1) * 1.1
        else g.rotation.y = t * (i % 2 ? -1 : 1) * 1.1
      })
      // 01 Plan: the theodolite scans, the stamp thumps down on the permit.
      theo.rotation.y = Math.sin(t * 0.5) * 0.9
      const thump = Math.pow(Math.max(0, Math.sin(tact)), 10)
      stamp.position.y = 1.5 - thump * 0.42
      const stamped = Math.max(0, Math.sin(tact - 0.35))
      approvedMark.material.opacity = THREE.MathUtils.lerp(approvedMark.material.opacity, stamped > 0.3 ? 1 : 0, smooth * 2)
      nemaOn = stamped > 0.3 ? 1 : 0
      // 02 Design: the plotter sweeps, the knobs tick.
      plotter.position.x = Math.sin(t * 0.63) * 0.72
      knobs.forEach((k, i) => (k.rotation.y = Math.sin(tact * 0.5 + i) * 1.2))
      // 03 Build: the crane slews, the trolley runs out, the hook lowers a slab; slabs stack up.
      crane.rotation.y = Math.sin(t * 0.22) * 0.55
      trolley.position.x = 0.7 + (Math.sin(t * 0.45) * 0.5 + 0.5) * 1.2
      const cableLen = 0.9 + (Math.sin(tact * 0.5) * 0.5 + 0.5) * 1.1
      cable.scale.y = cableLen
      cable.position.y = -cableLen / 2
      hook.position.y = -cableLen
      hook.rotation.y = -crane.rotation.y * 0.6
      beaconMat.emissiveIntensity = 0.8 + Math.max(0, Math.sin(t * 6)) * 2.2
      drum.rotation.y = t * 2.2
      // 04 Manage: the beacon turns.
      beacon.rotation.y = t * 4
      beaconLamp.emissiveIntensity = 1.2 + Math.max(0, Math.cos(t * 4)) * 1.5
      const projectPhase = (t / 24) % 1
      const cashBeat = mode === 'project' ? THREE.MathUtils.clamp((projectPhase - 0.88) / 0.12, 0, 1) : beat
      cert.visible = keys.visible = mode !== 'project' || projectPhase > 0.88
      cert.scale.y = 0.2 + Math.min(1, cashBeat * 1.5) * 0.8
      keys.position.set(0.35, 2.4 - Math.min(1, cashBeat * 1.7) ** 2 * 1.5, 0.18)
      keys.rotation.y = t * 3.5
      keys.rotation.x = cashBeat > 0.95 ? -Math.PI / 2 : 0
      keys.scale.setScalar(cashBeat > 0.9 ? 1 - (cashBeat - 0.9) * 8 : 1)
      if (t - lastDraw > 1 / 18 || lastDraw < 0) {
        drawSurvey(t)
        drawPlan(t)
        drawElevation(t)
        drawProgress(t)
        drawChecklist(t)
        updateBelt(t)
        lastDraw = t
      }
      let leadU = -1
      packets.forEach((packet, i) => {
        const phase = (t / 24 + i / 6) % 1
        packet.phase = phase
        let stage, u = -1
        if (phase < 0.15) {
          stage = 0
          const f = phase / 0.15
          scratch.copy(planPort).add(new THREE.Vector3(0, 0.43, 0))
          packet.group.position.copy(scratch).add(new THREE.Vector3(-0.3, 2.6, 0.3))
          packet.group.position.lerp(scratch, f)
          packet.group.position.y += Math.sin(f * Math.PI) * 0.6
          packet.group.rotation.set(0, Math.sin(f * Math.PI) * 0.28, Math.sin(f * Math.PI) * -0.1)
          packet.group.position.x *= 1 + spread * 0.12
          packet.group.position.z *= 1 + spread * 0.15
        } else {
          u = planU + ((phase - 0.15) / 0.85) * (handoverU - planU)
          path.getPointAt(u, packet.group.position)
          packet.group.position.x *= 1 + spread * 0.12
          packet.group.position.z *= 1 + spread * 0.15
          packet.group.position.y += 0.43
          packet.group.rotation.set(0, 0.18, 0)
          stage = u < planU + 0.045 ? 0 : u < designU + 0.01 ? 1 : u < buildU + 0.01 ? 2 : u < manageU + 0.01 ? 3 : 4
        }
        if (i === 0) leadU = u
        if (packet.stage !== stage) {
          packet.faces.forEach((f, j) => (f.visible = j === stage))
          packet.stage = stage
        }
        packet.group.visible = mode !== 'project' || i === 0
        packet.halo.visible = mode === 'project' && i === 0
        packet.group.scale.setScalar(mode === 'project' ? 1.35 : 1)
        if (phase > 0.94) packet.group.scale.multiplyScalar(Math.max(0.05, (1 - phase) / 0.06))
      })
      // Slabs rise with the lead project in One project mode, on a slow loop otherwise.
      const rise = mode === 'project' && leadU >= 0 ? THREE.MathUtils.clamp((leadU - buildU) / (manageU - buildU), 0, 1) : (t / 10) % 1
      const slabCount = Math.floor(rise * 5.999)
      slabs.forEach((s, k) => { s.visible = Math.floor(k / 4) < slabCount })
      if (mode === 'project') {
        const packet = packets[0], step = packet.stage
        if (step !== prevJourney) {
          $('journey-title').textContent = journeySteps[step][0]
          $('journey-detail').textContent = journeySteps[step][1]
          prevJourney = step
        }
        $('journey-progress').style.width = packet.phase * 100 + '%'
        if (!dragging && playing) {
          desiredTarget.copy(packet.group.position)
          desiredPosition.copy(desiredTarget).addScaledVector(viewDirection, mobile ? 10 : 15)
          cameraAnimating = true
        }
      } else if (cameraMode === 'flight' && playing && !dragging) {
        const a = flightTime * 0.12, d = baseDistance * (mode === 'stations' ? 1.2 : 1)
        desiredTarget.set(0, 1, 0)
        desiredPosition.set(Math.sin(a + 0.55) * d * 0.83, d * (0.5 + Math.sin(a * 0.7) * 0.09), Math.cos(a + 0.55) * d * 0.83).add(desiredTarget)
        cameraAnimating = true
      } else if (cameraMode === 'station' && cameraAnimating) setCameraGoal()
      if (cameraAnimating && !dragging) {
        const speed = 1 - Math.exp(-dt * (mode === 'project' ? 2.2 : 3))
        camera.position.lerp(desiredPosition, speed)
        controls.target.lerp(desiredTarget, speed)
        if (cameraMode !== 'flight' && mode !== 'project' && camera.position.distanceTo(desiredPosition) < 0.015 && controls.target.distanceTo(desiredTarget) < 0.015)
          cameraAnimating = false
      }
      controls.autoRotate = playing && !reduceMotion && !dragging && !cameraAnimating && mode !== 'project' && cameraMode === 'overview' && now - lastInteraction > 6500
      controls.autoRotateSpeed = 0.24
      controls.update(dt)
      // Project station callouts after the camera update, clamping them inside the frame.
      stations.forEach((s, i) => {
        const show = mode === 'stations'
        s.label.classList.toggle('visible', show)
        if (!show) return
        anchor.copy(s.group.position).add(s.anchor).project(camera)
        const offsets = mobile
          ? [[-30, 25], [-27, -50], [15, -65], [16, -1], [-5, 52]]
          : [[-48, -14], [-8, -64], [30, -12], [30, 20], [-12, 40]]
        let x = (anchor.x * 0.5 + 0.5) * width - 40 + offsets[i][0], y = (-anchor.y * 0.5 + 0.5) * height - 52 + offsets[i][1]
        x = THREE.MathUtils.clamp(x, 9, width - (mobile ? 123 : 165))
        y = THREE.MathUtils.clamp(y, 130, height - 200)
        s.label.style.transform = `translate(${x}px,${y}px)`
      })
      renderer.render(scene, camera)
      // Reduce only raster resolution on sustained slow devices; geometry and timing stay identical.
      if (playing) {
        frameCount++
        measureTime += dt
        if (measureTime > 4) {
          if (frameCount / measureTime < 43 && pixelRatio > 1) {
            pixelRatio = Math.max(1, pixelRatio - 0.25)
            renderer.setPixelRatio(pixelRatio)
          }
          frameCount = 0
          measureTime = 0
        }
      }
    }
    rafId = requestAnimationFrame(animate)
    cleanups.push(() => {
      cancelAnimationFrame(rafId)
      controls.dispose()
      const textures = new Set()
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        const list = object.material ? (Array.isArray(object.material) ? object.material : [object.material]) : []
        for (const material of list) {
          for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value)
          material.dispose()
        }
      })
      geometries.forEach((g) => g.dispose())
      textures.forEach((t) => t.dispose())
      env.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    })
    renderer.compile(scene, camera)
    $('loading').classList.add('done')
    $('error').style.display = 'none'
  } catch (error) {
    console.error('Machine: failed to start', error)
    showError()
  }
  return dispose
}

// ---------------------------------------------------------------------------
// Styles, scoped to .stage-machine. Brand palette; square corners on every control.
// ---------------------------------------------------------------------------

const STYLES = String.raw`
.stage-machine { --bg: #011f41; --white: #f4f6fa; --gold: #d4952a; --gold-2: #e6b04f; --muted: #8fa0b8; --line: rgba(255,255,255,.11);
  position: relative; width: 100%; height: 100%; overflow: hidden; background: var(--bg); color: var(--white); color-scheme: dark; contain: layout;
  font-size: 13px; -webkit-font-smoothing: antialiased; }
.stage-machine, .stage-machine * { box-sizing: border-box; }
.stage-machine button { font: inherit; color: inherit; cursor: pointer; border-radius: 0; -webkit-tap-highlight-color: transparent; }
.stage-machine button:focus-visible { outline: 2px solid var(--gold); outline-offset: 4px; }
.stage-machine #scene { position: absolute; inset: 0; outline: none; }
.stage-machine #scene canvas { display: block; width: 100%; height: 100%; }
.stage-machine .vignette { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at 50% 48%, transparent 30%, rgba(1,15,33,.18) 64%, rgba(1,15,33,.75) 100%); }
.stage-machine .topbar { position: absolute; inset: 24px 28px auto; display: flex; justify-content: space-between; align-items: center; pointer-events: none; }
.stage-machine .identity { display: flex; gap: 12px; align-items: center; }
.stage-machine .mark { width: 30px; height: 30px; border: 1px solid rgba(212,149,42,.5); display: grid; place-items: center; color: var(--gold-2); background: rgba(212,149,42,.1); }
.stage-machine .identity strong { display: block; font-weight: 600; font-size: 13px; }
.stage-machine .identity small { display: block; margin-top: 4px; font-size: 9px; letter-spacing: 1.5px; color: var(--muted); text-transform: uppercase; }
.stage-machine .status { display: flex; align-items: center; gap: 8px; font-size: 10px; color: #b8c4d6; }
.stage-machine .status i { width: 6px; height: 6px; background: var(--gold-2); box-shadow: 0 0 10px rgba(230,176,79,.5); }
.stage-machine .status.paused i { background: #66748a; box-shadow: none; }
.stage-machine .status span:last-child { font-variant-numeric: tabular-nums; color: #66748a; margin-left: 12px; }
.stage-machine .scene-heading { position: absolute; top: 96px; left: 24%; right: 24%; pointer-events: none; display: flex; align-items: center; gap: 12px; font-size: 9px; letter-spacing: 1.8px; color: #aab6c8; text-transform: uppercase; }
.stage-machine .scene-heading:before { content: ''; width: 22px; height: 1px; background: var(--gold); }
.stage-machine .scene-heading .index { margin-left: auto; color: #5e6e88; font-size: 9px; letter-spacing: 1px; }
.stage-machine .coordinates { position: absolute; top: 140px; right: 30px; color: #5e6e88; writing-mode: vertical-rl; font: 9px ui-monospace, Menlo, SFMono-Regular, monospace; letter-spacing: 1.5px; pointer-events: none; }
.stage-machine .controls { position: absolute; bottom: 64px; left: 24px; right: 24px; display: flex; align-items: center; flex-direction: column; gap: 14px; z-index: 5; }
.stage-machine .mode-bar { display: flex; gap: 3px; align-items: center; padding: 5px; border: 1px solid rgba(255,255,255,.1); background: rgba(1,20,45,.88); box-shadow: 0 8px 30px rgba(0,0,0,.25); backdrop-filter: blur(16px); }
.stage-machine .mode-bar button { border: 0; background: none; color: #aab6c8; white-space: nowrap; padding: 11px 15px; display: flex; gap: 8px; align-items: center; font-size: 11px; font-weight: 500; transition: background .2s, color .2s; }
.stage-machine .mode-bar button:hover { background: rgba(255,255,255,.05); color: var(--white); }
.stage-machine .mode-bar button[aria-pressed='true'] { background: var(--gold); color: #011f41; }
.stage-machine svg { flex-shrink: 0; display: block; }
.stage-machine .mode-bar svg { width: 14px; height: 14px; }
.stage-machine .camera-row { display: flex; align-items: center; justify-content: center; gap: 4px; }
.stage-machine .camera-row .caption { font-size: 9px; letter-spacing: 1.4px; color: #5e6e88; margin-right: 9px; }
.stage-machine .camera-row button { border: 0; background: transparent; color: #8fa0b8; padding: 5px 9px; font-size: 10px; transition: color .2s; }
.stage-machine .camera-row button:hover, .stage-machine .camera-row button[aria-pressed='true'] { color: var(--white); }
.stage-machine .camera-row button[aria-pressed='true']:after { content: ''; display: block; width: 3px; height: 3px; background: var(--gold-2); margin: 5px auto -8px; }
.stage-machine .camera-row .divider { width: 1px; height: 13px; background: var(--line); margin: 0 8px; }
.stage-machine .camera-row #play { padding: 5px; width: 25px; height: 25px; display: grid; place-items: center; }
.stage-machine .footer { position: absolute; bottom: 22px; left: 28px; right: 28px; display: flex; align-items: center; justify-content: space-between; gap: 12px; pointer-events: none; }
.stage-machine .wordmark { font-size: 11px; color: #8fa0b8; }
.stage-machine .wordmark span { color: var(--gold-2); }
.stage-machine .hint { display: flex; align-items: center; gap: 7px; color: #8fa0b8; font-size: 10px; }
.stage-machine .hint svg { color: #aab6c8; }
.stage-machine .footer-center { position: absolute; left: 50%; transform: translateX(-50%); font: 9px ui-monospace, Menlo, SFMono-Regular, monospace; letter-spacing: 1.5px; color: #4e5f7a; }
.stage-machine #labels { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.stage-machine .station-label { position: absolute; left: 0; top: 0; opacity: 0; transition: opacity .3s; will-change: transform; pointer-events: none; min-width: 138px; }
.stage-machine .station-label.visible { opacity: 1; }
.stage-machine .station-label .stem { height: 26px; width: 1px; background: linear-gradient(rgba(230,176,79,0), rgba(230,176,79,.7)); margin: 0 0 0 10px; }
.stage-machine .station-label .label-card { background: rgba(4,22,46,.94); backdrop-filter: blur(10px); border: 1px solid rgba(212,149,42,.45); padding: 10px 13px; box-shadow: 0 4px 20px rgba(0,0,0,.25); }
.stage-machine .station-label .label-title { font-weight: 600; font-size: 12px; display: flex; gap: 10px; align-items: center; white-space: nowrap; }
.stage-machine .station-label .label-title span { color: var(--gold-2); font: 9px ui-monospace, Menlo, monospace; }
.stage-machine .station-label .label-meta { font-size: 9px; color: #8fa0b8; margin: 6px 0 0 24px; white-space: nowrap; }
.stage-machine #tooltip { position: absolute; pointer-events: none; z-index: 10; opacity: 0; transition: opacity .15s; padding: 11px 14px; border: 1px solid rgba(255,255,255,.12); background: rgba(4,22,46,.95); backdrop-filter: blur(12px); box-shadow: 0 8px 32px rgba(0,0,0,.35); max-width: 240px; }
.stage-machine #tooltip.visible { opacity: 1; }
.stage-machine #tooltip strong { font-size: 12px; font-weight: 600; }
.stage-machine #tooltip strong span { font-size: 10px; color: var(--gold-2); margin-right: 8px; }
.stage-machine #tooltip p { font-size: 10px; color: #aab6c8; margin: 6px 0 0; line-height: 1.5; }
.stage-machine #journey { position: absolute; left: 24%; right: 24%; top: 132px; opacity: 0; transform: translateY(-5px); transition: .4s; pointer-events: none; display: flex; align-items: center; gap: 13px; }
.stage-machine #journey.visible { opacity: 1; transform: none; }
.stage-machine .journey-icon { width: 28px; height: 28px; border: 1px solid rgba(212,149,42,.45); display: grid; place-items: center; color: var(--gold-2); }
.stage-machine #journey strong { font-size: 11px; font-weight: 600; }
.stage-machine #journey small { display: block; font-size: 9px; margin-top: 4px; color: #8fa0b8; }
.stage-machine #journey .track { height: 2px; background: rgba(255,255,255,.08); flex: 1; margin-left: 8px; }
.stage-machine #journey .track i { display: block; height: 100%; background: var(--gold-2); width: 0; }
.stage-machine #loading { position: absolute; left: 50%; top: 48%; transform: translate(-50%, -50%); display: flex; align-items: center; gap: 12px; color: #8fa0b8; font-size: 11px; transition: opacity .4s; z-index: 20; }
.stage-machine #loading i { height: 18px; width: 18px; border-radius: 50%; border: 1px solid rgba(212,149,42,.2); border-top-color: var(--gold); animation: stage-machine-spin 1s linear infinite; }
@keyframes stage-machine-spin { to { transform: rotate(360deg); } }
.stage-machine #loading.done { opacity: 0; pointer-events: none; }
.stage-machine #error { position: absolute; left: 27.5%; right: 27.5%; top: 40%; border: 1px solid rgba(212,149,42,.3); background: #0a2d57; padding: 24px; display: none; font-size: 13px; line-height: 1.7; }
.stage-machine #error strong { color: var(--gold-2); font-weight: 600; }
.stage-machine #error p { color: #aab6c8; margin: 8px 0 0; }
.stage-machine #error button { border: 1px solid rgba(255,255,255,.2); background: #14407a; padding: 8px 14px; margin-top: 14px; }
@media (max-width: 900px) {
  .stage-machine .topbar { inset: 18px 18px auto; }
  .stage-machine .identity strong { font-size: 12px; }
  .stage-machine .status span:last-child { display: none; }
  .stage-machine .scene-heading { left: 18px; right: 18px; top: 86px; font-size: 8px; }
  .stage-machine .coordinates { display: none; }
  .stage-machine .controls { left: 10px; right: 10px; bottom: 62px; gap: 12px; }
  .stage-machine .mode-bar { gap: 1px; padding: 4px; }
  .stage-machine .mode-bar button { padding: 10px 9px; font-size: 10px; gap: 6px; }
  .stage-machine .mode-bar svg { width: 12px; height: 12px; }
  .stage-machine .camera-row { gap: 0; }
  .stage-machine .camera-row button { padding: 5px 7px; font-size: 9px; }
  .stage-machine .footer { bottom: 18px; left: 18px; right: 18px; align-items: flex-end; }
  .stage-machine .hint { font-size: 9px; }
  .stage-machine .footer-center { display: none; }
  .stage-machine #error { left: 7%; right: 7%; top: 35%; }
  .stage-machine #journey { left: 18px; right: 18px; top: 120px; }
  .stage-machine .station-label { min-width: 100px; }
  .stage-machine .station-label .label-card { padding: 7px 9px; }
  .stage-machine .station-label .label-title { font-size: 10px; gap: 7px; }
  .stage-machine .station-label .label-meta { font-size: 8px; margin-left: 0; }
  .stage-machine .station-label .stem { height: 17px; }
}
@media (max-width: 480px) {
  .stage-machine .mode-bar { flex-wrap: wrap; justify-content: center; max-width: 100%; }
  .stage-machine .mode-bar button { padding: 10px 7px; }
  .stage-machine .mode-bar svg { display: none; }
  .stage-machine .camera-row .caption { display: none; }
  .stage-machine .status { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .stage-machine, .stage-machine * { transition: none !important; }
  .stage-machine #loading i { animation: none; }
}
`
