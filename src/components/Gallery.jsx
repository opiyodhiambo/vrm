import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'

// Project gallery: a carousel with a thumbnail strip, and a full-screen viewer.
export default function Gallery({ images, name }) {
  const n = images.length
  const [i, setI] = useState(0)
  const [full, setFull] = useState(false)
  const go = (d) => setI((v) => (v + d + n) % n)

  useEffect(() => {
    if (!full) return
    const onKey = (e) => {
      if (e.key === 'Escape') setFull(false)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [full, n])

  return (
    <div className="gal">
      <div className="gal__main">
        <i className="mark" aria-hidden="true" /><i className="mark mark--tr" aria-hidden="true" /><i className="mark mark--bl" aria-hidden="true" /><i className="mark mark--br" aria-hidden="true" />
        <div className="gal__slides" style={{ transform: `translateX(-${i * 100}%)` }}>
          {images.map((src, k) => <img key={`${k}-${src}`} src={src} alt={`${name}, image ${k + 1} of ${n}`} loading={k === 0 ? 'eager' : 'lazy'} />)}
        </div>
        <span className="gal__count idx">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
        {n > 1 && (
          <div className="gal__nav">
            <button type="button" onClick={() => go(-1)} aria-label="Previous image"><Icon name="chevron-down" /></button>
            <button type="button" onClick={() => go(1)} aria-label="Next image"><Icon name="chevron-down" /></button>
          </div>
        )}
        <button type="button" className="gal__full" onClick={() => setFull(true)} aria-label="View full screen"><Icon name="expand" /><span>Full screen</span></button>
      </div>
      {n > 1 && (
        <div className="gal__thumbs">
          {images.map((src, k) => (
            <button key={`${k}-${src}`} type="button" className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Show image ${k + 1}`}><img src={src} alt="" loading="lazy" /></button>
          ))}
        </div>
      )}
      {full && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${name} gallery`} onClick={() => setFull(false)}>
          <div className="lightbox__top" onClick={(e) => e.stopPropagation()}>
            <span className="idx">{name} · {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
            <button type="button" onClick={() => setFull(false)} aria-label="Close full screen"><Icon name="close" /></button>
          </div>
          <img className="lightbox__img" src={images[i]} alt={`${name}, image ${i + 1} of ${n}`} onClick={(e) => e.stopPropagation()} />
          {n > 1 && (
            <>
              <button type="button" className="lightbox__prev" onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous image"><Icon name="chevron-down" /></button>
              <button type="button" className="lightbox__next" onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next image"><Icon name="chevron-down" /></button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
