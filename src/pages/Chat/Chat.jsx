import { useEffect, useRef } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { useChat } from '../../hooks/useChat.js'

export default function Chat() {
  const { mensajes, enviar, loading, error } = useChat()
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [mensajes])

  function handleSubmit(e) {
    e.preventDefault()
    const value = inputRef.current.value
    enviar(value)
    inputRef.current.value = ''
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-2xl flex-col">
      <header className="pb-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-500">
          Asistente
        </p>
        <h1 className="mt-2 text-2xl font-medium text-ink">Chat</h1>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-hairline bg-cream-50 shadow-sm">
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
          {mensajes.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.autor === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.autor === 'user'
                    ? 'bg-brand-500 text-cream-50'
                    : 'bg-cream-200 text-ink'
                }`}
              >
                {m.texto}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-xl bg-cream-200 px-4 py-2.5 text-sm text-muted">
                <Loader2 className="size-3.5 animate-spin" strokeWidth={1.75} />
                Escribiendo...
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="border-t border-hairline bg-accent-50 px-4 py-2 text-sm text-accent-700">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border-t border-hairline px-4 py-3"
        >
          <input
            ref={inputRef}
            placeholder="Escribe un mensaje..."
            disabled={loading}
            className="flex-1 rounded-lg border border-hairline bg-cream-100 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-cream-50 transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Enviar mensaje"
          >
            <Send className="size-4" strokeWidth={1.75} />
          </button>
        </form>
      </div>
    </div>
  )
}