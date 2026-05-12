'use client'
import { useEffect, useRef, useState } from 'react'

/* Particle trail dot */
interface TrailDot { id: number; x: number; y: number; opacity: number; size: number }

export default function AICursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const mouse   = useRef({ x: -200, y: -200 })
  const ring    = useRef({ x: -200, y: -200 })
  const rafRef  = useRef<number>(0)

  const [visible,  setVisible]  = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [trail,    setTrail]    = useState<TrailDot[]>([])
  const trailId = useRef(0)

  useEffect(() => {
    /* ── Trail emitter ── */
    let lastTrailX = -999, lastTrailY = -999
    const emitTrail = (x: number, y: number) => {
      const dx = x - lastTrailX, dy = y - lastTrailY
      if (Math.sqrt(dx * dx + dy * dy) < 10) return
      lastTrailX = x; lastTrailY = y
      const id = trailId.current++
      setTrail(prev => [
        ...prev.slice(-12),
        { id, x, y, opacity: 0.7, size: 4 + Math.random() * 4 },
      ])
      setTimeout(() => {
        setTrail(prev => prev.filter(d => d.id !== id))
      }, 500)
    }

    /* ── Mouse events ── */
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
      emitTrail(e.clientX, e.clientY)
      const el = document.elementFromPoint(e.clientX, e.clientY)
      setHovering(!!el?.closest('a,button,[role="button"],input,select,textarea,label'))
    }
    const onDown  = () => setClicking(true)
    const onUp    = () => setClicking(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    /* ── RAF loop: move dot instantly, ring with lag ── */
    const animate = () => {
      const { x: mx, y: my } = mouse.current
      const { x: rx, y: ry } = ring.current

      /* snap dot */
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px,${my}px,0)`
      }
      /* lerp ring */
      ring.current.x = rx + (mx - rx) * 0.1
      ring.current.y = ry + (my - ry) * 0.1
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px,${ring.current.y}px,0)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(rafRef.current)
    }
  }, [visible])

  const opacity = visible ? 1 : 0

  return (
    <>
      {/* ── Trail particles ── */}
      {trail.map((d, idx) => (
        <div
          key={d.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997]"
          style={{
            width: d.size,
            height: d.size,
            transform: `translate3d(${d.x - d.size / 2}px,${d.y - d.size / 2}px,0)`,
            background: `hsl(${290 + idx * 8},80%,65%)`,
            opacity: (idx / trail.length) * 0.5,
            filter: 'blur(1px)',
            transition: 'opacity 0.5s ease',
          }}
        />
      ))}

      {/* ── Outer ring (lagged) ── */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: 44,
          height: 44,
          marginLeft: -22,
          marginTop: -22,
          opacity,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
        }}
      >
        {/* Rotating arc ring */}
        <svg
          width="44" height="44"
          viewBox="0 0 44 44"
          style={{
            animation: 'spin-slow 3s linear infinite',
            filter: hovering
              ? 'drop-shadow(0 0 6px rgba(236,72,153,0.9))'
              : 'drop-shadow(0 0 4px rgba(167,139,250,0.6))',
            transform: clicking ? 'scale(0.75)' : hovering ? 'scale(1.3)' : 'scale(1)',
            transition: 'transform 0.25s ease, filter 0.2s ease',
          }}
        >
          <circle
            cx="22" cy="22" r="18"
            fill="none"
            stroke="url(#cursorGrad)"
            strokeWidth="1.5"
            strokeDasharray="28 85"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="cursorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#ec4899" />
              <stop offset="50%"  stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </svg>
        {/* Static faint full ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `1px solid ${hovering ? 'rgba(236,72,153,0.35)' : 'rgba(167,139,250,0.2)'}`,
            transition: 'border-color 0.2s ease',
          }}
        />
      </div>

      {/* ── Center dot (instant) ── */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          opacity,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: clicking
              ? 'rgba(255,255,255,0.95)'
              : 'linear-gradient(135deg,#ec4899,#a78bfa)',
            boxShadow: clicking
              ? '0 0 12px 4px rgba(255,255,255,0.6)'
              : '0 0 10px rgba(236,72,153,0.9)',
            transform: clicking ? 'scale(1.6)' : hovering ? 'scale(1.4)' : 'scale(1)',
            transition: 'transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease',
          }}
        />
      </div>

      {/* ── "AI" label that appears on hoverable elements ── */}
      {hovering && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            transform: `translate3d(${mouse.current.x + 14}px,${mouse.current.y - 20}px,0)`,
            opacity: hovering ? 1 : 0,
            transition: 'opacity 0.15s ease',
          }}
        >
          <span
            className="text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded-md"
            style={{
              background: 'linear-gradient(135deg,#ec4899,#a78bfa)',
              color: '#fff',
              letterSpacing: '0.1em',
            }}
          >
            AI
          </span>
        </div>
      )}
    </>
  )
}
