import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui.jsx'
import { company } from '../data/site.js'

export default function Careers() {
  return (
    <>
      <PageHeader scene="careers" title="Careers" crumbs={[{ label: 'About', to: '/about' }]}
        intro="Training, diversity in recruitment and a sense of belonging — we invest in our people." />
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <h2>Join the team</h2>
          <p className="lead">TODO: open roles, internship / attachment programme and benefits. For now, send your CV to <a className="link-arrow" href={`mailto:${company.email}`}>{company.email}</a>.</p>
          <Link to="/contact" className="btn btn--navy">Get in touch</Link>
        </div>
      </section>
    </>
  )
}
