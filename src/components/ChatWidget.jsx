import { useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { useChat } from '../hooks/useChat.js'
import { useChatWidget } from '../context/ChatWidgetContext.jsx'

export default function ChatWidget() {
  const { abierto, alternar, cerrar } = useChatWidget()
  const { mensajes, enviar, loading, error } = useChat()
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (abierto) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [mensajes, abierto])

  function handleSubmit(e) {
    e.preventDefault()
    const value = inputRef.current.value
    enviar(value)
    inputRef.current.value = ''
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {abierto && (
        <div className="mb-4 flex h-[28rem] w-80 flex-col overflow-hidden rounded-xl border border-hairline bg-cream-50 shadow-lg sm:w-96">
          <div className="flex items-center justify-between border-b border-hairline bg-brand-700 px-4 py-3">
            <span className="font-heading text-sm font-medium text-cream-50">
              Asistente VitalCare
            </span>
            <button
              onClick={cerrar}
              className="text-cream-100/70 transition-colors hover:text-cream-50"
              aria-label="Cerrar chat"
            >
              <X className="size-4" strokeWidth={1.75} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {mensajes.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.autor === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
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
                <div className="flex items-center gap-2 rounded-lg bg-cream-200 px-3 py-2 text-xs text-muted">
                  <Loader2 className="size-3.5 animate-spin" strokeWidth={1.75} />
                  Escribiendo...
                </div>
              </div>
            )}
          </div>

          {error && (
            <p className="border-t border-hairline bg-accent-50 px-3 py-1.5 text-xs text-accent-700">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-hairline px-3 py-2.5"
          >
            <input
              ref={inputRef}
              placeholder="Escribe un mensaje..."
              disabled={loading}
              className="flex-1 rounded-lg border border-hairline bg-cream-100 px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-cream-50 transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Enviar mensaje"
            >
              <Send className="size-3.5" strokeWidth={1.75} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={alternar}
        className="flex size-14 items-center justify-center rounded-full bg-accent-500 text-cream-50 shadow-lg transition-colors hover:bg-accent-600"
        aria-label={abierto ? 'Cerrar asistente' : 'Abrir asistente'}
      >
        {abierto ? (
          <X className="size-6" strokeWidth={1.75} />
        ) : (
          <MessageCircle className="size-6" strokeWidth={1.75} />
        )}
      </button>
    </div>
  )
}