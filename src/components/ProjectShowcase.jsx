import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

// Staggered photo collage; each photo carries an overlapping label panel (title, short line, arrow).
export default function ProjectShowcase({ projects }) {
  return (
    <div className="pj-grid">
      {projects.map((p, i) => (
        <Link key={p.slug} to={`/projects/${p.slug}`} className={`pj pj--${i + 1}`}>
          <div className="pj__photo"><img src={p.images[0]} alt={`${p.name}, ${p.location}`} loading="lazy" /></div>
          <div className="pj__panel">
            <div className="pj__title">
              <h3>{p.name}</h3>
              <span className="pj__arrow"><Icon name="arrow-up-right" /></span>
            </div>
            <p>{p.description} {p.location}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
