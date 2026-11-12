// Sticky card stack (ported from the cards-stack concept). Each card pins at `top` while the next one
// slides up over it, so the deck builds as you scroll. Plain CSS sticky: no animation library needed.
// `--stack-top` leaves room for the sticky site header.
export function ContainerScroll({ className = '', style, children, ...rest }) {
  return (
    <div className={`stack ${className}`} style={{ perspective: '1000px', ...style }} {...rest}>
      {children}
    </div>
  )
}

export function CardSticky({ index, incrementY = 10, incrementZ = 10, className = '', style, children, ...rest }) {
  return (
    <div
      className={`stack__card ${className}`}
      style={{
        top: `calc(var(--stack-top, 96px) + ${index * incrementY}px)`,
        transform: `translateZ(${index * incrementZ}px)`,
        zIndex: index + 1,
        backfaceVisibility: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
