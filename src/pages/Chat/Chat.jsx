import { useState } from 'react'
import { Send } from 'lucide-react'
// import { enviarMensaje } from '../../api/chat.js'

/* TODO: reemplazar por el historial real de la conversacion. */
const MENSAJES_DEMO = [
  {
    id: 1,
    autor: 'bot',
    texto:
      'Hola, soy el asistente de VitalCare. Puedo ayudarte a agendar, mover o consultar tus citas.',
  },
  { id: 2, autor: 'user', texto: 'Quiero reprogramar mi cita de cardiologia.' },
  {
    id: 3,
    autor: 'bot',
    texto:
      'Tu proxima cita de cardiologia es el 3 de septiembre a las 09:30 con la Dra. Elena Ruiz. Para que fecha te gustaria moverla?',
  },
]

export default function Chat() {
  const [mensajes, setMensajes] = useState(MENSAJES_DEMO)
  const [texto, setTexto] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const value = texto.trim()
    if (!value) return

    // Solo se agrega el mensaje del usuario a la UI.
    setMensajes((prev) => [
      ...prev,
      { id: Date.now(), autor: 'user', texto: value },
    ])
    setTexto('')

    // TODO: llamar a la API y agregar la respuesta del bot
    //   const { respuesta } = await enviarMensaje(value, conversationId)
    //   setMensajes((prev) => [...prev, { id: Date.now(), autor: 'bot', texto: respuesta }])
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
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
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
        </div>

        {/* Input fijo abajo dentro del panel */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border-t border-hairline px-4 py-3"
        >
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 rounded-lg border border-hairline bg-cream-100 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
          />
          <button
            type="submit"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-cream-50 transition-colors hover:bg-brand-600"
            aria-label="Enviar mensaje"
          >
            <Send className="size-4" strokeWidth={1.75} />
          </button>
        </form>
      </div>
    </div>
  )
}
