import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { company, nav, sitemap } from '../data/site.js'
import Icon from './Icon.jsx'

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo" aria-label={`${company.name} home`}>
          <img src="/images/logo.png" alt={company.name} />
        </Link>
        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Main">
          {nav.map((item) =>
            item.children ? (
              <div className="nav__item" key={item.label}>
                <NavLink to={item.to} className="nav__parent">{item.label}</NavLink>
                <div className="nav__drop">
                  {item.children.map((c) => <NavLink key={c.to} to={c.to} end>{c.label}</NavLink>)}
                </div>
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>{item.label}</NavLink>
            ),
          )}
        </nav>
        <Link to="/contact" className="btn btn--gold">Request a Quote</Link>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}

function Footer() {
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
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
    </>
  )
}
