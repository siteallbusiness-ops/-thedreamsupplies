'use client'
import { useState, useRef, useEffect } from 'react'
import { Brain, X, Sparkles, ArrowRight, Zap } from 'lucide-react'

const suggestions = [
  'Household cleaning products under £1',
  'Best-selling health & beauty pallets',
  'Colgate or Persil at trade prices',
  'Toys & games for market stalls',
]

export default function AIFloatingButton() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [thinking, setThinking] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
    else { setQuery(''); setResult(null); setThinking(false) }
  }, [open])

  const handleSubmit = (q = query) => {
    if (!q.trim()) return
    setThinking(true)
    setResult(null)
    setTimeout(() => {
      setThinking(false)
      setResult(`Great choice! We found 240+ products matching "${q}". Showing AI-ranked results now.`)
    }, 1600)
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Panel */}
        {open && (
          <div className="w-72 bg-teal-900 border border-white/15 rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
            style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(236,72,153,0.2)' }}>

            {/* Header */}
            <div className="relative px-4 py-3 border-b border-white/10 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(167,139,250,0.15))' }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #a78bfa)' }}>
                  <Brain size={14} className="text-white" />
                </div>
                <div>
                  <div className="text-white text-xs font-bold">Dream AI</div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white/40 text-[10px]">Online · Ready</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)}
                className="text-white/40 hover:text-white/80 transition-colors w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/10">
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <p className="text-white/60 text-xs leading-relaxed">
                Tell me what you're looking for — I'll find the best-matched wholesale products for you.
              </p>

              {/* Suggestions */}
              {!result && !thinking && (
                <div className="space-y-1.5">
                  {suggestions.map(s => (
                    <button key={s} onClick={() => { setQuery(s); handleSubmit(s) }}
                      className="w-full text-left text-[11px] text-white/60 hover:text-white/90 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg transition-all flex items-center gap-2 group">
                      <Zap size={10} className="text-orange-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Thinking state */}
              {thinking && (
                <div className="flex flex-col items-center py-4 gap-3">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded-full border-2 border-orange-500/30 animate-spin"
                      style={{ borderTopColor: '#ec4899' }} />
                    <div className="absolute inset-1.5 rounded-full flex items-center justify-center bg-teal-900">
                      <Brain size={14} className="text-orange-400 animate-pulse" />
                    </div>
                  </div>
                  <p className="text-white/50 text-xs text-center">AI is scanning 10,000+ products…</p>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full shimmer-sweep"
                      style={{ background: 'linear-gradient(90deg, #ec4899, #a78bfa, #ec4899)', backgroundSize: '200%' }} />
                  </div>
                </div>
              )}

              {/* Result */}
              {result && !thinking && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles size={12} className="text-emerald-400" />
                    <span className="text-emerald-300 text-[11px] font-bold">AI Match Found</span>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">{result}</p>
                  <a href="/products"
                    className="inline-flex items-center gap-1 mt-2 text-emerald-400 text-[11px] font-semibold hover:text-emerald-300 transition-colors">
                    View Results <ArrowRight size={11} />
                  </a>
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="e.g. cleaning products…"
                  className="flex-1 bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-white/15 transition-all"
                />
                <button onClick={() => handleSubmit()}
                  className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #a78bfa)', boxShadow: '0 4px 12px rgba(236,72,153,0.4)' }}>
                  <ArrowRight size={14} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main FAB */}
        <button
          onClick={() => setOpen(o => !o)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: open
              ? 'linear-gradient(135deg, #475569, #334155)'
              : 'linear-gradient(135deg, #ec4899, #a78bfa)',
            boxShadow: open ? '0 4px 20px rgba(0,0,0,0.4)' : '0 8px 32px rgba(236,72,153,0.55)',
          }}
          aria-label="Open AI Assistant"
        >
          {/* Sonar rings — only when closed */}
          {!open && (
            <>
              <span className="absolute inset-0 rounded-full animate-sonar"
                style={{ background: 'linear-gradient(135deg, #ec4899, #a78bfa)', opacity: 0.4 }} />
              <span className="absolute inset-0 rounded-full animate-sonar"
                style={{ background: 'linear-gradient(135deg, #ec4899, #a78bfa)', opacity: 0.2, animationDelay: '0.7s' }} />
            </>
          )}

          <div className="relative z-10 transition-transform duration-300" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            {open ? <X size={20} className="text-white" /> : <Brain size={22} className="text-white" />}
          </div>
        </button>

        {/* Tooltip label — only when closed */}
        {!open && (
          <div className="absolute right-16 bottom-3.5 pointer-events-none animate-slide-right">
            <div className="bg-teal-900 border border-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-lg"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}>
              Ask AI ✦
            </div>
          </div>
        )}
      </div>
    </>
  )
}
