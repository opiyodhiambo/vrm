import { useState } from 'react'
import { company, services } from '../data/site.js'
import { PageHeader } from '../components/ui.jsx'

export default function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <PageHeader title="Contact Us" intro="Request a quote or talk to our team about your next project." />
      <section className="section">
        <div className="container split">
          <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true) /* TODO: wire to backend / email service */ }}>
            <div className="form__row">
              <label>Full name<input required name="name" /></label>
              <label>Email<input required type="email" name="email" /></label>
            </div>
            <div className="form__row">
              <label>Phone<input name="phone" /></label>
              <label>Service<select name="service">{services.map((s) => <option key={s.slug}>{s.title}</option>)}</select></label>
            </div>
            <label>Project details<textarea rows="6" name="message" /></label>
            <button className="btn btn--gold" type="submit">Send enquiry</button>
            {sent && <p role="status"><strong>Thanks!</strong> (Demo only — the form is not connected yet.)</p>}
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
