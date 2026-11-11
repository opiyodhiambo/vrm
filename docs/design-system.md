# Construction Company Website: Design System and Sitemap

Version 1.0 · For the design and front end team

## 0. Read this first

Some uncomfortable points before the system itself.

1. **"Attention" is the wrong goal.** People who hire construction firms are not browsing for entertainment. They are about to commit a large sum of money and are afraid of delays, cost overruns, poor workmanship and contractors who disappear. The site wins on **trust and reduced perceived risk**, not on being eye catching. Every rule below serves that.
2. **The target audience is not defined yet, and it changes the design.** A homeowner building a house, a developer commissioning apartments, and a procurement officer evaluating a tender look for different proof. Decide your primary audience (one) and secondary audience (one) before the team designs a single page. Section 1.1 gives a template.
3. **Your current navigation has trust leaks.** Placeholder social icons that do nothing, a top bar that repeats the footer, and a dropdown that does not work on touch screens. Details and fixes in Section 12.
4. **"Color agnostic" means roles, not no rules.** The system below defines what each color *does*. Your brand colors plug into those roles. The class name `btn--gold` breaks this already: rename it to `btn--primary`.

## 1. Audience psychology

### 1.1 Define the audience (fill this in)

| Field | Primary | Secondary |
|---|---|---|
| Who | e.g. Private developer, 1 to 10 unit projects | e.g. Homeowner building a family house |
| Budget range | | |
| Biggest fear | e.g. Cost overrun, project stalls midway | e.g. Being cheated, poor finishing |
| Proof they need | Completed similar projects, licences, client references | Photos of finished homes, transparent process, testimonials |
| How they contact | Email, formal quote request | Phone call, WhatsApp |
| Device | Desktop at office, mobile on site | Mostly mobile |

If you cannot fill this table with real evidence (sales calls, past clients), interview 5 past clients first. That is cheaper than redesigning later.

### 1.2 What the buyer's brain is doing

| Psychological driver | What it means | Design response |
|---|---|---|
| **Risk aversion / loss aversion** | Fear of losing money weighs about twice as much as the hope of gain | Lead with proof: years operating, projects completed, licences, insurance, warranties. Show a clear process so nothing feels unknown |
| **Authority** | People trust credentials and expertise | Registration numbers, certifications, professional memberships, named engineers. Shown near the CTA, not buried |
| **Social proof** | People copy what others like them did | Client logos, testimonials with full name, role and project, case studies. Never anonymous quotes |
| **Concreteness** | Specific claims feel true, vague ones feel like marketing | "142 projects since 2009" beats "many years of experience" |
| **Cognitive load** | Stressed decision makers abandon complex pages | One primary action per screen, short labels, generous whitespace |
| **Uncertainty reduction** | Unknown next steps stop people acting | Say what happens after they click: "We call you within 24 hours with a site visit date" |
| **Peak end rule** | People judge an experience by its best moment and its end | Make the quote form and its confirmation page excellent |
| **Stability perception** | Visual heaviness and order signal a solid company | Strong horizontal structure, aligned grids, solid weights, restrained motion |

### 1.3 Proven principles the team must apply

| Principle | Rule for this project |
|---|---|
| **Hick's Law** (more choices, slower decisions) | Max 5 primary nav items plus one CTA. Max 6 services shown on Home |
| **Fitts's Law** (bigger, closer targets are easier) | Primary buttons min 48px tall. Mobile call button within thumb reach (bottom of screen) |
| **Jakob's Law** (users expect your site to work like others) | Logo top left links home. Contact top right. Nav in header. Do not reinvent these |
| **Von Restorff effect** (the different thing gets noticed) | Only the primary CTA uses the action color. If everything is highlighted, nothing is |
| **Serial position effect** (first and last items remembered) | Most important nav item first, Contact/CTA last. Strongest proof at the top and bottom of pages |
| **Gestalt proximity and similarity** | Related items closer together than unrelated ones. Same function, same look |
| **F and Z scanning patterns** | Headlines and key numbers on the left. CTA at the end of the reading path |
| **Aesthetic usability effect** | A polished site is perceived as more competent. Sloppy alignment reads as sloppy building |

## 2. Brand design principles

Use these to settle design arguments. If a choice violates one, it loses.

1. **Proof over promise.** Show the work. A real photo of a finished project beats any headline.
2. **Built, not decorated.** Structure, alignment and weight carry the design. No ornament without a job.
3. **One clear next step.** Every section ends with an obvious action or nothing.
4. **Specific beats impressive.** Numbers, names, dates, locations.
5. **Fast on a bad network.** If it does not load on a weak 3G connection on site, it does not exist.

## 3. Color system (role based, brand agnostic)

### 3.1 Roles

Designers pick brand values. These roles are fixed.

| Token | Role | Usage limit |
|---|---|---|
| `--color-bg` | Page background | About 60% of surface |
| `--color-surface` | Cards, alternating sections | |
| `--color-surface-inverse` | Dark or heavy bands (hero overlay, footer, stats band) | |
| `--color-text` | Body text | |
| `--color-text-muted` | Secondary text, captions | Must still meet 4.5:1 |
| `--color-text-inverse` | Text on inverse surfaces | |
| `--color-brand` | Brand identity: logo, headings accents, icons | About 30% |
| `--color-action` | Primary buttons and key links ONLY | About 10%. Never decoration |
| `--color-action-hover` | Hover/pressed state of action | |
| `--color-border` | Dividers, input borders | Input borders need 3:1 against background |
| `--color-focus` | Keyboard focus ring | Must be visible on every surface |
| `--color-success` / `--color-warning` / `--color-error` | Form and system feedback | Never used for branding |

### 3.2 Rules

1. **The action color is reserved.** If the brand color is used for buttons, it cannot also be used for large decorative areas. Pick one job per color.
2. **Contrast (WCAG 2.2 AA minimum):** body text 4.5:1, large text (24px+ or 19px bold) 3:1, UI components and focus rings 3:1.
3. **Never use color alone to carry meaning.** Errors get an icon and text, not just red.
4. **Psychology of hue families** (guidance, not law; culture and context override):
   * Blues and deep neutrals: reliability, engineering, corporate buyers
   * Warm yellows, oranges: energy, safety, visibility; strong as an action color, tiring as a background
   * Earth tones, greys, concrete tones: materials, permanence
   * Greens: sustainability; use only if you can back the claim
5. **Test every palette** in grayscale. If hierarchy disappears, the design relies on color too much.
6. **Dark sections** (inverse surface) are used max once or twice per page to create rhythm and signal "important" (stats, final CTA).

## 4. Typography

### 4.1 Typeface selection criteria

Two families maximum.

* **Headings:** a sturdy, geometric or grotesque sans with a solid bold weight. Conveys strength and precision. Condensed widths work well for large hero headings.
* **Body:** a highly legible humanist or neo grotesque sans with a large x height.
* Must support every language on the site, have at least regular, medium, bold, and be available as variable or subset WOFF2 files.
* Avoid scripts, thin weights and decorative fonts. They read as fragile.

### 4.2 Type scale

Ratio 1.25 (major third), base 16px. Use `clamp()` so headings scale with viewport.

| Token | Mobile | Desktop | Weight | Line height | Use |
|---|---|---|---|---|---|
| `--text-display` | 40px | 64px | Bold | 1.05 | Hero headline only |
| `--text-h1` | 32px | 48px | Bold | 1.1 | Page titles |
| `--text-h2` | 28px | 39px | Bold | 1.15 | Section titles |
| `--text-h3` | 22px | 25px | Semibold | 1.25 | Card titles |
| `--text-h4` | 18px | 20px | Semibold | 1.3 | Small headings |
| `--text-lead` | 18px | 20px | Regular | 1.55 | Intro paragraphs |
| `--text-body` | 16px | 17px | Regular | 1.6 | Body |
| `--text-small` | 14px | 14px | Regular | 1.5 | Captions, meta |
| `--text-eyebrow` | 13px | 14px | Semibold, uppercase, +0.08em tracking | 1.2 | Labels above headings |

### 4.3 Rules

1. Line length 45 to 75 characters (`max-width: 65ch` on text blocks).
2. Never go below 16px for body text. Never below 14px for anything.
3. Left align body text. Center only short headings and CTA bands.
4. One H1 per page. Heading levels never skip.
5. Numbers in stats use tabular figures (`font-variant-numeric: tabular-nums`).

## 5. Spacing

8 point system with a 4px half step.

| Token | Value | Typical use |
|---|---|---|
| `--space-1` | 4px | Icon to label |
| `--space-2` | 8px | Tight groups |
| `--space-3` | 12px | Input padding (vertical) |
| `--space-4` | 16px | Default gap, mobile gutter |
| `--space-5` | 24px | Card padding (mobile), gaps between cards |
| `--space-6` | 32px | Card padding (desktop), desktop gutter |
| `--space-7` | 48px | Heading to content |
| `--space-8` | 64px | Section padding (mobile) |
| `--space-9` | 96px | Section padding (desktop) |
| `--space-10` | 128px | Hero padding (desktop) |

**Rules**

1. Internal spacing is always smaller than external spacing (Gestalt proximity). The gap inside a card is less than the gap between cards.
2. Never use arbitrary values like 13px or 27px. If no token fits, the layout is wrong.
3. Sections use consistent vertical padding so the page has a steady rhythm.

## 6. Layout and grid

### 6.1 Breakpoints and containers

| Name | Min width | Columns | Gutter | Side margin |
|---|---|---|---|---|
| `sm` | 0 | 4 | 16px | 16px |
| `md` | 768px | 8 | 24px | 32px |
| `lg` | 1024px | 12 | 32px | 48px |
| `xl` | 1280px | 12 | 32px | auto |

* Container max width: 1240px. Narrow container for reading pages: 760px.
* Design mobile first. Most local traffic for service businesses is mobile.

### 6.2 Section patterns (reuse, do not invent per page)

| Pattern | Structure |
|---|---|
| **Hero** | Headline (outcome), one line support, primary + secondary button, trust strip under it. Real project photo, darkened overlay for contrast |
| **Trust strip** | 3 to 5 items: years, projects, licence/registration, insurance, client logos |
| **Split** | Image 6 cols, text 6 cols (or 5/7). Alternate sides down the page |
| **Card grid** | 3 cols desktop, 2 tablet, 1 mobile. Equal heights |
| **Stats band** | Inverse surface, 3 to 4 numbers, short label each |
| **Process** | 4 to 6 numbered steps, horizontal on desktop, vertical on mobile |
| **Testimonial** | Quote, full name, role, project, photo of the project |
| **CTA band** | Headline, one sentence on what happens next, one primary button, phone number |

### 6.3 Arrangement rules

1. Every page follows the persuasion order: **Claim → Proof → Process → Action.**
2. Alignment: everything snaps to the grid. One dominant alignment axis per section (usually left).
3. Max one hero per page. Max one inverse band in a row.
4. Above the fold on mobile must show: what you build, where, and how to contact you.

## 7. Components

### 7.1 Buttons

**Hierarchy**

| Variant | Class | Look | Use | Limit |
|---|---|---|---|---|
| Primary | `btn--primary` | Solid fill `--color-action`, high contrast text | The one action you want: Request a Quote | One per view |
| Secondary | `btn--secondary` | Outline 2px, transparent fill | Alternative: View Projects | |
| Tertiary | `btn--link` | Text + arrow icon, underline on hover | Low priority: Read case study | |
| Inverse | `btn--inverse` | Primary styled for dark surfaces | CTA bands, hero overlays | |

**Sizes**

| Size | Height | Horizontal padding | Font |
|---|---|---|---|
| `sm` | 40px | 16px | 14px semibold |
| `md` (default) | 48px | 24px | 16px semibold |
| `lg` | 56px | 32px | 18px semibold |

**Shape:** Corner radius 2px to 6px. Small radii read as precise and solid; pill shapes read as consumer app and soft. Pick one radius and use it for buttons, inputs and cards alike.

**States (all required)**

| State | Treatment |
|---|---|
| Default | As above |
| Hover | Darken or lighten fill by one step, cursor pointer, 150ms transition |
| Focus visible | 3px outline in `--color-focus`, 2px offset. Never remove outlines |
| Active/pressed | Slightly darker, translateY(1px) |
| Disabled | Reduced contrast, `cursor: not-allowed`, plus text explaining why if possible |
| Loading | Spinner replaces icon, label changes ("Sending..."), button keeps its width |

**Labels**

* Verb + outcome. "Request a Free Quote", "Book a Site Visit", "See Our Projects".
* Never "Submit", "Click here", "Learn more" alone.
* Max 4 words. Sentence or title case, never all caps on body sized buttons.
* Minimum touch target 48 × 48px, 8px apart.

### 7.2 Links

Body links are underlined (always, not just on hover). Visited state optional. Link color must differ from body text by 3:1 or carry the underline.

### 7.3 Header

* Sticky, 72px desktop / 64px mobile. Shrinks slightly on scroll with a shadow.
* Order: Logo (left) · Nav (center or right) · Phone + Primary CTA (right).
* On mobile: Logo · Call icon button · Menu button. The Request a Quote button moves into the menu and into a sticky bottom bar.

### 7.4 Mobile sticky action bar

Fixed at bottom on mobile only, 56px tall, two buttons: **Call** and **WhatsApp / Get a Quote**. This single component often outperforms any hero redesign for local service businesses. Hide it while the menu or a form is open.

### 7.5 Cards

| Card | Contents (in order) |
|---|---|
| Service card | Icon or photo, title, one sentence benefit, tertiary link |
| Project card | Photo (4:3), category eyebrow, project name, location, one key fact (size, value or duration) |
| Team card | Real photo, name, role, credential |

* Whole card is clickable (one link, stretched), not several competing links.
* Hover: lift by 2 to 4px and image zoom max 1.05.

### 7.6 Forms (the quote form is your most important component)

1. Max 5 fields on first contact: Name, Phone, Email, Project type (select), Short description. Ask budget and timelines later or make them optional.
2. Labels above inputs, always visible. Placeholders are hints, not labels.
3. Inputs 48px tall, 16px font (prevents iOS zoom), border 3:1 contrast.
4. Validate on blur, not on every keystroke. Error message under the field, specific: "Enter a phone number with country code".
5. Next to the submit button, state what happens next and the response time.
6. Success page: thank them, repeat the response time, show the direct phone number, link to projects. This is the "end" of the peak end rule.

### 7.7 Proof components

* **Stat:** large number (`--text-h1`), short label. Only real, verifiable numbers.
* **Credential badge:** logo or mark of the authority + registration number in text.
* **Testimonial:** must include a full name and project. Ideally a photo of that project.
* **Case study block:** Challenge, Solution, Result, with numbers in Result.

### 7.8 Footer

Four columns desktop, accordion or stacked on mobile: Company summary + contact, Services, Company, Resources/Legal. Include registration details, physical address with map link, business hours. The footer is where sceptical visitors go to verify you are real.

## 8. Imagery and iconography

1. **Real photos only** of your own projects, team and sites. Stock photos of smiling models in hard hats destroy trust instantly.
2. Show people working safely (PPE on). Unsafe site photos are a liability signal.
3. Use before/during/after sequences. Progress is persuasive.
4. Aspect ratios: hero 16:9 (mobile 4:5), cards 4:3, team 1:1 or 4:5.
5. Formats: AVIF/WebP with JPEG fallback, `loading="lazy"` below the fold, explicit width/height to prevent layout shift.
6. Icons: one set, one stroke weight (1.5 or 2px), 24px default grid. Line icons for UI, never mix with filled sets.

## 9. Motion

Motion signals precision, not playfulness.

| Token | Value | Use |
|---|---|---|
| `--motion-fast` | 150ms | Hover, focus |
| `--motion-base` | 250ms | Dropdowns, menus |
| `--motion-slow` | 400ms | Section reveals |
| `--ease` | `cubic-bezier(0.2, 0, 0, 1)` | Everything |

* No parallax, no autoplay carousels (users ignore them and they hurt accessibility).
* Count up animation on stats is acceptable once.
* Respect `prefers-reduced-motion`: disable all non essential motion.

## 10. Accessibility (non negotiable, WCAG 2.2 AA)

1. Contrast ratios in Section 3.2.
2. Every interactive element reachable and usable by keyboard, with a visible focus ring.
3. Skip link ("Skip to content") as the first focusable element.
4. Alt text describes the project ("Four storey residential block, Kilimani, completed 2024"), not "image".
5. Menus and dropdowns announce state with `aria-expanded`.
6. Forms: every input has a `<label>`, errors linked with `aria-describedby`.
7. Touch targets 48px.

## 11. Performance budget

| Metric | Target |
|---|---|
| Largest Contentful Paint | under 2.5s on mobile 4G |
| Cumulative Layout Shift | under 0.1 |
| Interaction to Next Paint | under 200ms |
| Home page weight | under 1.5MB |
| Hero image | under 200KB |
| Fonts | max 4 files, WOFF2, `font-display: swap` |

A slow site reads as a disorganised company.

## 12. Sitemap

### 12.1 Principles

* Max 5 top level items plus the CTA (Hick's Law).
* Organise by what the buyer is looking for, not by your internal departments.
* Every page has a path to the quote form within one click.

### 12.2 Proposed structure

```
Home
Services
  ├ Residential Construction
  ├ Commercial Construction
  ├ Renovation & Fit Out
  ├ Civil Works
  └ Design & Build / Project Management
Projects
  ├ Filter by: Residential · Commercial · Civil
  └ Project detail (case study template)
About
  ├ Our Story
  ├ Team & Leadership
  ├ Certifications & Safety
  └ Careers
Contact / Request a Quote   ← primary CTA, styled as button
```

Adjust the service list to what you actually sell. Five is a ceiling, not a target.

**Footer only (not in main nav):** Process ("How we work"), FAQs, Resources/Blog, Privacy Policy, Terms, Careers.

**Why Projects is its own top level item:** it is the most visited page on construction sites because it is the proof. Do not bury it under About.

### 12.3 Page templates (section order)

**Home**
1. Hero: what you build + where, Request a Quote, View Projects
2. Trust strip
3. Services (3 to 6 cards)
4. Featured projects (3)
5. Stats band
6. Process (how a project runs with you)
7. Testimonials
8. Certifications / client logos
9. CTA band

**Service detail**
1. Hero with service specific claim
2. Who it is for, what is included
3. Relevant projects (filtered)
4. Process for this service
5. FAQs (answer cost, time, permits)
6. CTA band

**Project detail (case study)**
1. Hero photo, name, location, category
2. Fact panel: client type, size, duration, value range, services used
3. Challenge, Solution, Result
4. Gallery (before, during, after)
5. Client testimonial
6. Similar projects, CTA band

**About**
1. Story with founding year and milestones
2. Leadership with real photos and credentials
3. Certifications, safety record, insurance
4. CTA band

**Contact / Quote**
1. Short headline + response time promise
2. Form (Section 7.6) beside direct contacts: phone, WhatsApp, email, address, map, hours

## 13. Review of your current navigation code

### 13.1 Problems

| Issue | Why it matters | Fix |
|---|---|---|
| Social icons are shown but are not links | Dead UI reads as an unfinished or abandoned company. Exactly the fear your buyer has | Remove until accounts exist |
| Top bar repeats location, email and phones, and the footer repeats them again | Extra 40px of chrome above the header, competes with the CTA, overflows on mobile | Remove the top bar, or keep only the phone. Put phone in the header |
| Dropdown relies on hover | Touch devices cannot open children; the parent link navigates away instead | Add a toggle button with `aria-expanded` for children |
| Menu button has no `aria-expanded` / `aria-controls` | Screen readers cannot tell if the menu is open | Add both |
| No Escape to close, no body scroll lock | Mobile menu feels broken | Handle keydown and lock scroll |
| `btn--gold` | Ties component to a color, breaks the agnostic system | `btn--primary` |
| `window.scrollTo(0,0)` on every path change | Breaks anchor links like `/services#civil` | Skip when `location.hash` exists |
| No skip link | Fails keyboard users | Add one |
| Email address shown in full in the header | Long strings break small layouts and invite scrapers | Keep in footer and contact page |

### 13.2 Revised Header

```jsx
function Header() {
  const [open, setOpen] = useState(false)
  const [sub, setSub] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false); setSub(null) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && (setOpen(false), setSub(null))
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const phone = company.phones[0]

  return (
    <header className="header">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="container header__inner">
        <Link to="/" className="header__logo" aria-label={`${company.name} home`}>
          <img src="/images/logo.png" alt={company.name} width="160" height="48" />
        </Link>

        <nav id="main-nav" className={`nav ${open ? 'is-open' : ''}`} aria-label="Main">
          {nav.map((item) =>
            item.children ? (
              <div className="nav__item" key={item.label}>
                <NavLink to={item.to} className="nav__parent">{item.label}</NavLink>
                <button
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
          <Link to="/contact" className="btn btn--primary nav__cta-mobile">Request a Quote</Link>
        </nav>

        <a href={`tel:${phone.replace(/\s/g, '')}`} className="header__phone">
          <Icon name="phone" /><span>{phone}</span>
        </a>
        <Link to="/contact" className="btn btn--primary header__cta">Request a Quote</Link>

        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
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

export default function Layout() {
  const { pathname, hash } = useLocation()
  useEffect(() => { if (!hash) window.scrollTo(0, 0) }, [pathname, hash])
  return (
    <>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
      <MobileActionBar />
    </>
  )
}
```

CSS behaviour to pair with it: on desktop, `.nav__drop` also opens on `:hover` and `:focus-within`; on mobile it opens only via `.is-open`. `.header__cta` and `.header__phone` text hide below `md`; `.action-bar` shows only below `md`.

## 14. Content voice

* Plain, confident, specific. Write like a site engineer explaining to a client, not like an advert.
* Headlines state outcomes: "Homes built on schedule and on budget" (only if you can prove it).
* Banned without evidence: "best", "leading", "world class", "quality you can trust".
* Every claim gets a proof element within the same section.

## 15. Tokens starter (CSS)

```css
:root {
  /* Color roles: fill with brand values */
  --color-bg: ;
  --color-surface: ;
  --color-surface-inverse: ;
  --color-text: ;
  --color-text-muted: ;
  --color-text-inverse: ;
  --color-brand: ;
  --color-action: ;
  --color-action-hover: ;
  --color-border: ;
  --color-focus: ;
  --color-success: ;
  --color-warning: ;
  --color-error: ;

  /* Spacing */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;
  --space-9: 96px; --space-10: 128px;

  /* Type */
  --text-display: clamp(2.5rem, 1.6rem + 3.6vw, 4rem);
  --text-h1: clamp(2rem, 1.5rem + 2vw, 3rem);
  --text-h2: clamp(1.75rem, 1.4rem + 1.4vw, 2.44rem);
  --text-h3: clamp(1.375rem, 1.3rem + 0.3vw, 1.56rem);
  --text-body: clamp(1rem, 0.97rem + 0.12vw, 1.0625rem);
  --text-small: 0.875rem;

  /* Shape and motion */
  --radius: 4px;
  --shadow-1: 0 1px 2px rgb(0 0 0 / 0.08);
  --shadow-2: 0 8px 24px rgb(0 0 0 / 0.12);
  --motion-fast: 150ms;
  --motion-base: 250ms;
  --ease: cubic-bezier(0.2, 0, 0, 1);

  --container: 1240px;
  --container-narrow: 760px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 16. Definition of done checklist

Before any page ships:

* [ ] One primary CTA per view, using `--color-action` only
* [ ] Claim → Proof → Process → Action order followed
* [ ] Every claim has a nearby proof element
* [ ] All spacing uses tokens
* [ ] Contrast passes AA, focus ring visible on every surface
* [ ] Works with keyboard only, menus announce state
* [ ] Real photos only, with descriptive alt text
* [ ] LCP under 2.5s on mobile
* [ ] Tested at 360px, 768px, 1280px
* [ ] Quote path reachable in one click