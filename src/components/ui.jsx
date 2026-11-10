import { Link } from 'react-router-dom'

export function PageHeader({ title, intro, crumbs = [] }) {
  return (
    <section className="page-header">
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
        <h2>{title}</h2>
        {children && <p className="lead">{children}</p>}
      </div>
      {action}
    </div>
  )
}

export function CTA({ title = 'Have a project in mind?', text = 'Tell us what you want to build. We will design it, plan it, and deliver it.' }) {
  return (
    <section className="cta">
      <div className="container cta__inner">
        <div><h2>{title}</h2><p>{text}</p></div>
        <Link to="/contact" className="btn btn--gold">Request a Quote</Link>
      </div>
    </section>
  )
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
