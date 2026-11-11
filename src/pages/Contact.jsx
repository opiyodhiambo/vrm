import { useState } from 'react'
import { company, services } from '../data/site.js'
import { PageHeader } from '../components/ui.jsx'

export default function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <PageHeader scene="contact" title="Contact Us" intro="Request a quote or talk to our team about your next project." />
      <section className="section">
        <div className="container split">
          <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true) /* TODO: wire to backend / email service */ }}>
            <div className="form__row">
              <label>Full name<input required name="name" autoComplete="name" /></label>
              <label>Email<input required type="email" name="email" autoComplete="email" /></label>
            </div>
            <div className="form__row">
              <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
              <label>Service<select name="service">{services.map((s) => <option key={s.slug}>{s.title}</option>)}</select></label>
            </div>
            <label>Project details<textarea rows="6" name="message" /></label>
            <button className="btn btn--primary" type="submit">Request a Free Quote</button>
            <p className="form__note">What happens next: we review your details and call you to arrange a site visit. <em>(Response time to be confirmed.)</em></p>
            {sent && (
              <div className="form__success" role="status">
                <p><strong>Thank you. We have your request.</strong></p>
                <p>Prefer to talk now? Call <a href={`tel:${company.phones[0].replace(/\s/g, '')}`}><strong>{company.phones[0]}</strong></a>.</p>
                <p><em>Demo only: the form is not connected yet.</em></p>
              </div>
            )}
          </form>
          <aside className="facts">
            <dl>
              <dt>Contact person</dt><dd>{company.contactPerson}</dd>
              <dt>Phone</dt>{company.phones.map((p) => <dd key={p}>{p}</dd>)}
              <dt>Email</dt><dd>{company.email}</dd>
              <dt>Location</dt><dd>{company.location}</dd>
            </dl>
          </aside>
        </div>
      </section>
    </>
  )
}
