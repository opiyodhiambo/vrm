import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { company, nav } from '../data/site.js'
import { useContent } from '../lib/content.jsx'
import Icon from './Icon.jsx'

function TopBar() {
  const socials = [['facebook', 'Facebook'], ['x', 'X'], ['instagram', 'Instagram'], ['linkedin', 'LinkedIn']]
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__info">
          <span className="topbar__item">
            <Icon name="pin" />
            <span className="topbar__label">Location:</span>
            <strong>{company.location}</strong>
          </span>
          <span className="topbar__sep" aria-hidden="true" />
          <a className="topbar__item" href={`mailto:${company.email}`} aria-label="Email">
            <Icon name="mail" />
            <span className="topbar__label">Email:</span>
            <strong>{company.email}</strong>
          </a>
          <span className="topbar__sep" aria-hidden="true" />
          <span className="topbar__item">
            <Icon name="phone" />
            <span className="topbar__label">Contact:</span>
            <strong>
              {company.phones.map((ph, i) => (
                <span key={ph}>{i > 0 && ', '}<a href={`tel:${ph.replace(/\s/g, '')}`}>{ph}</a></span>
              ))}
            </strong>
          </span>
        </div>
        {/* Social icons are placeholders until the accounts exist: deliberately not links. */}
        <div className="topbar__social">
          {socials.map(([icon, label]) => <span key={icon} title={label} aria-hidden="true"><Icon name={icon} /></span>)}
        </div>
      </div>
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [sub, setSub] = useState(null)
  const { pathname } = useLocation()
  const phone = company.phones[0]

  useEffect(() => { setOpen(false); setSub(null) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); setSub(null) } }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="header">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="container header__inner">
        <Link to="/" className="header__logo" aria-label={`${company.name} home`}>
          <img src="/images/logo.png" alt={company.name} />
        </Link>
        <nav id="main-nav" className={`nav ${open ? 'is-open' : ''}`} aria-label="Main">
          {nav.map((item) =>
            item.children ? (
              <div className="nav__item" key={item.label}>
                <NavLink to={item.to} className="nav__parent">{item.label}</NavLink>
                <button
                  type="button"
                  className="nav__toggle"
                  aria-expanded={sub === item.label}
                  aria-controls={`sub-${item.label}`}
                  aria-label={`Show ${item.label} pages`}
                  onClick={() => setSub(sub === item.label ? null : item.label)}
                >
                  <Icon name="chevron-down" />
                </button>
                <div id={`sub-${item.label}`} className={`nav__drop ${sub === item.label ? 'is-open' : ''}`}>
                  {item.children.map((c) => <NavLink key={c.to} to={c.to} end>{c.label}</NavLink>)}
                </div>
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>{item.label}</NavLink>
            ),
          )}
        </nav>
        <div className="header__actions">
          <Link to="/contact" className="btn btn--primary header__cta">Request a Quote <span className="arrow" aria-hidden="true">→</span></Link>
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="header__call" aria-label={`Call ${phone}`}><Icon name="phone" /></a>
          <button
            type="button"
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}

function WhatsAppFloat() {
  const { pathname } = useLocation()
  const href = `https://wa.me/254763591276?text=${encodeURIComponent('Hello VRM Engineering Solutions, I would like to make an enquiry.')}`
  return (
    <a className={`wa-float${pathname === '/services' ? ' wa-float--lift' : ''}`} href={href} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp" title="Chat on WhatsApp">
      <Icon name="whatsapp" />
    </a>
  )
}

function MobileActionBar() {
  const phone = company.phones[0].replace(/\s/g, '')
  return (
    <div className="action-bar" role="region" aria-label="Quick contact">
      <a href={`tel:${phone}`} className="btn btn--secondary"><Icon name="phone" />Call</a>
      <Link to="/contact" className="btn btn--primary">Get a Quote</Link>
    </div>
  )
}

function Footer() {
  const { sitemap } = useContent()
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div>
          <div className="footer__logo"><img src="/images/logo.png" alt={company.name} /></div>
          <p>{company.tagline}. {company.incorporation}.</p>
          <p>{company.location}<br />{company.phones.join(' · ')}<br />{company.email}</p>
        </div>
        {sitemap.map((col) => (
          <div key={col.heading}>
            <h4>{col.heading}</h4>
            <ul>{col.links.map((l) => <li key={l.label}><Link to={l.to}>{l.label}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
        <span>{company.strapline}</span>
        
      </div>
    </footer>
  )
}

export default function Layout() {
  const { pathname, hash } = useLocation()
  // We handle scroll position ourselves; the browser's own restore on reload would briefly show lower
  // sections and set off their typing headings before we scroll back to the top.
  useEffect(() => { if ('scrollRestoration' in history) history.scrollRestoration = 'manual' }, [])
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    const el = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (el) el.scrollIntoView()
  }, [pathname, hash])
  return (
    <>
      <TopBar />
      <Header />
      <main id="main"><Outlet /></main>
      <div className="closing">
        <div id="cta-slot" />
        <Footer />
      </div>
      <WhatsAppFloat />
      <MobileActionBar />
    </>
  )
}
