'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

/* ─────────────────────────────────────────────
   Scroll progress bar — fixed top, scales 0→1
   ───────────────────────────────────────────── */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const el = ref.current
        if (!el) return
        const doc = document.documentElement
        const max = doc.scrollHeight - doc.clientHeight
        const p = max <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / max))
        el.style.transform = `scaleX(${p})`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="y-scroll-progress" aria-hidden />
}

/* ─────────────────────────────────────────────
   Grain — fixed SVG noise overlay
   ───────────────────────────────────────────── */
export function GrainOverlay() {
  return <div className="y-grain" aria-hidden />
}

/* ─────────────────────────────────────────────
   Marquee — horizontal scrolling band
   ───────────────────────────────────────────── */
interface MarqueeProps {
  children: ReactNode
  reverse?: boolean
  speed?: 'slow' | 'normal'
  className?: string
}

export function Marquee({
  children,
  reverse = false,
  speed = 'normal',
  className = '',
}: MarqueeProps) {
  const animClass = reverse
    ? 'y-marquee-rev'
    : speed === 'slow'
    ? 'y-marquee-slow'
    : 'y-marquee'

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      <div className={`flex w-max ${animClass}`}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MarqueeBand — full-bleed brutal slogan band
   ───────────────────────────────────────────── */
interface MarqueeBandProps {
  text: string
  variant?: 'green-on-black' | 'black-on-green' | 'outline'
  size?: 'md' | 'lg' | 'xl'
  reverse?: boolean
  separator?: string
}

export function MarqueeBand({
  text,
  variant = 'green-on-black',
  size = 'lg',
  reverse = false,
  separator = '✦',
}: MarqueeBandProps) {
  const tokens = text.split('·').map((t) => t.trim()).filter(Boolean)

  const fontSize =
    size === 'xl'
      ? 'clamp(3rem, 12vw, 9rem)'
      : size === 'lg'
      ? 'clamp(2rem, 8vw, 5.5rem)'
      : 'clamp(1.2rem, 4vw, 2.4rem)'

  const palette = {
    'green-on-black': {
      bg: '#080808',
      text: '#05ed96',
      border: 'rgba(5,237,150,0.18)',
      sep: 'rgba(5,237,150,0.5)',
    },
    'black-on-green': {
      bg: '#05ed96',
      text: '#080808',
      border: 'rgba(8,8,8,0.2)',
      sep: 'rgba(8,8,8,0.5)',
    },
    outline: {
      bg: '#080808',
      text: 'transparent',
      border: 'rgba(5,237,150,0.18)',
      sep: 'rgba(5,237,150,0.5)',
    },
  }[variant]

  return (
    <div
      className="relative w-full overflow-hidden border-y"
      style={{ background: palette.bg, borderColor: palette.border }}
      aria-hidden
    >
      <Marquee reverse={reverse}>
        {tokens.map((token, i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-unbounded)] uppercase whitespace-nowrap flex items-center"
            style={{
              fontSize,
              lineHeight: 1,
              padding: '0.5em 0.6em',
              color: palette.text,
              letterSpacing: '-0.01em',
              WebkitTextStroke:
                variant === 'outline' ? '1.5px #05ed96' : undefined,
            }}
          >
            {token}
            <span
              className="mx-[0.5em] inline-block"
              style={{ color: palette.sep, fontSize: '0.55em' }}
            >
              {separator}
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SplitChars — per-character drop animation
   Spans the text, animates when nearest .reveal
   becomes .visible (uses CSS animation-delay var).
   ───────────────────────────────────────────── */
interface SplitProps {
  text: string
  className?: string
  style?: CSSProperties
  charClassName?: string
  /** ms multiplier between chars */
  stagger?: number
  /** Which animation class to apply on chars */
  effect?: 'drop' | 'rise' | 'wipe'
}

export function SplitChars({
  text,
  className,
  style,
  charClassName = '',
  stagger = 35,
  effect = 'drop',
}: SplitProps) {
  const effectClass =
    effect === 'rise' ? 'y-rise' : effect === 'wipe' ? 'y-wipe' : 'y-drop'

  // Split by word so spaces don't break, then chars inside each word.
  const words = text.split(/(\s+)/)

  let charIdx = 0
  return (
    <span className={className} style={style}>
      {words.map((word, wi) => {
        if (/^\s+$/.test(word)) {
          return (
            <span key={`s-${wi}`} aria-hidden>
              {' '}
            </span>
          )
        }
        return (
          <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => {
              const i = charIdx++
              return (
                <span
                  key={ci}
                  aria-hidden
                  className={`y-char ${effectClass} ${charClassName}`}
                  style={
                    {
                      ['--i' as keyof CSSProperties]: i,
                      animationDelay: `${i * stagger}ms`,
                    } as CSSProperties
                  }
                >
                  {ch}
                </span>
              )
            })}
          </span>
        )
      })}
      <span className="sr-only">{text}</span>
    </span>
  )
}

/* ─────────────────────────────────────────────
   SplitWords — per-word rise animation
   ───────────────────────────────────────────── */
export function SplitWords({
  text,
  className,
  style,
  stagger = 90,
  effect = 'rise',
}: Omit<SplitProps, 'charClassName'>) {
  const effectClass =
    effect === 'drop' ? 'y-drop' : effect === 'wipe' ? 'y-wipe' : 'y-rise'

  const words = text.split(/\s+/)
  return (
    <span className={className} style={style}>
      {words.map((w, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.25em]">
          <span
            aria-hidden
            className={`y-word ${effectClass} inline-block`}
            style={
              {
                ['--i' as keyof CSSProperties]: i,
                animationDelay: `${i * stagger}ms`,
              } as CSSProperties
            }
          >
            {w}
          </span>
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  )
}

/* ─────────────────────────────────────────────
   CountUp — animates a number when in view
   Handles "<2%", "74%", "3.401" (thousands).
   ───────────────────────────────────────────── */
interface CountUpProps {
  target: string
  className?: string
  style?: CSSProperties
  duration?: number
}

function parseTarget(t: string): {
  prefix: string
  num: number
  suffix: string
  thousands: boolean
} {
  const prefixMatch = t.match(/^([^0-9.,]*)/)
  const prefix = prefixMatch ? prefixMatch[0] : ''
  const rest = t.slice(prefix.length)
  const numMatch = rest.match(/^([0-9.,]+)/)
  const numStr = numMatch ? numMatch[0] : '0'
  const suffix = rest.slice(numStr.length)
  const thousands = /[.,]/.test(numStr) && numStr.replace(/[.,]/g, '').length > 3
  // "3.401" → 3401, "74" → 74, "2" → 2
  const num = parseFloat(numStr.replace(/\./g, '').replace(/,/g, '.'))
  return { prefix, num: isNaN(num) ? 0 : num, suffix, thousands }
}

function formatNum(value: number, thousands: boolean): string {
  if (thousands) {
    return Math.round(value).toLocaleString('es-CL')
  }
  return String(Math.round(value))
}

export function CountUp({
  target,
  className,
  style,
  duration = 1600,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState('0')
  const parsed = useRef(parseTarget(target))

  useEffect(() => {
    parsed.current = parseTarget(target)
    setDisplay(`${parsed.current.prefix}0${parsed.current.suffix}`)
  }, [target])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf = 0
    let started = false

    const animate = () => {
      const start = performance.now()
      const { prefix, num, suffix, thousands } = parsed.current

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3)
        const v = num * eased
        setDisplay(`${prefix}${formatNum(v, thousands)}${suffix}`)
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true
            animate()
            io.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [duration])

  return (
    <span ref={ref} className={className} style={style} aria-label={target}>
      {display}
    </span>
  )
}

/* ─────────────────────────────────────────────
   MaskReveal — green sweep that wipes content in
   Pairs with a parent .reveal so it triggers on scroll.
   ───────────────────────────────────────────── */
interface MaskRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function MaskReveal({
  children,
  className = '',
  delay = 0,
}: MaskRevealProps) {
  return (
    <span
      className={`y-wipe inline-block ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </span>
  )
}
