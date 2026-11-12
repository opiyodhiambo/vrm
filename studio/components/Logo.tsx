// Wordmark shown top-left in the Studio, in the site's display + annotation fonts.
export function Logo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
      <span style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: '.04em', textTransform: 'uppercase' }}>VRM Engineering</span>
      <span style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', opacity: 0.8 }}>Content studio</span>
    </div>
  )
}
