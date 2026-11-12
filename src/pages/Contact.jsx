import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { company } from '../data/site.js'
import { useContent } from '../lib/content.jsx'

export default function Contact() {
  const { services } = useContent()
  const [sent, setSent] = useState(false)
  const [params] = useSearchParams()
  const preselected = services.find((x) => x.slug === params.get('service'))
  const tel = (p) => `tel:${p.replace(/\s/g, '')}`
  const details = [
    { label: 'Contact person', body: <p>{company.contactPerson}</p> },
    { label: 'Phone', body: company.phones.map((p) => <p key={p}><a href={tel(p)}>{p}</a></p>) },
    { label: 'Email', body: <p><a href={`mailto:${company.email}`}>{company.email}</a></p> },
    { label: 'Location', body: <p>{company.location}</p> },
  ]
  return (
    <section className="contact">
      <div className="container">
        <div className="contact__head">
          <div className="crumbs"><Link to="/">Home</Link></div>
          <h2>Tell us about your project</h2>
          {/* <p>Request a quote or talk to our team about your next project.</p> */}
        </div>

        <div className="contact__grid">
          <div className="contact__cell contact__form">
            <i className="values__mark" aria-hidden="true" />
            <span className="eyebrow">Request a quote</span>
            <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true) /* TODO: wire to backend / email service */ }}>
              <div className="form__row">
                <label className="fld"><span className="fld__label"><i>01</i>Full name</span><input required name="name" autoComplete="name" /></label>
                <label className="fld"><span className="fld__label"><i>02</i>Email</span><input required type="email" name="email" autoComplete="email" /></label>
              </div>
              <div className="form__row">
                <label className="fld"><span className="fld__label"><i>03</i>Phone</span><input name="phone" type="tel" autoComplete="tel" /></label>
                <label className="fld fld--select"><span className="fld__label"><i>04</i>Service</span><select name="service" key={preselected?.slug || 'none'} defaultValue={preselected?.title}>{services.map((s) => <option key={s.slug}>{s.title}</option>)}</select></label>
              </div>
              <label className="fld"><span className="fld__label"><i>05</i>Project details</span><textarea rows="3" name="message" /></label>
              <button className="btn btn--primary" type="submit">Request a Free Quote</button>
              <p className="form__note">What happens next: we review your details and call you to arrange a site visit. <em>(Response time to be confirmed.)</em></p>
              {sent && (
                <div className="form__success" role="status">
                  <p><strong>Thank you. We have your request.</strong></p>
                  <p>Prefer to talk now? Call <a href={tel(company.phones[0])}><strong>{company.phones[0]}</strong></a>.</p>
                  <p><em>Demo only: the form is not connected yet.</em></p>
                </div>
              )}
            </form>
          </div>
          {details.map((d, i) => (
            <div className="contact__cell contact__detail" key={d.label}>
              <i className="values__mark" aria-hidden="true" />
              <span className="contact__n">0{i + 1}</span>
              <h3>{d.label}</h3>
              {d.body}
            </div>
          ))}
          <i className="values__mark values__mark--tr" aria-hidden="true" />
          <i className="values__mark values__mark--bl" aria-hidden="true" />
          <i className="values__mark values__mark--br" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
