import { useCallback, useRef, useState } from 'react'
import { enviarMensaje } from '../api/chat.js'

const MENSAJE_BIENVENIDA = {
  id: 'bienvenida',
  autor: 'bot',
  texto:
    'Hola, soy el asistente de VitalCare. Puedo ayudarte a consultar especialidades, doctores, horarios y agendar tu cita.',
}

function generarConversationId() {
  return `conv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Lógica compartida del chatbot: historial de mensajes, envío y estado de
 * carga/error. Usado tanto por el widget flotante como por la página /chat.
 */
export function useChat() {
  const [mensajes, setMensajes] = useState([MENSAJE_BIENVENIDA])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // El conversationId se mantiene estable durante toda la sesión del componente.
  const conversationIdRef = useRef(generarConversationId())

  const enviar = useCallback(async (texto) => {
    const value = texto.trim()
    if (!value) return

    setError(null)
    setMensajes((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, autor: 'user', texto: value },
    ])
    setLoading(true)

    try {
      const respuesta = await enviarMensaje(value, conversationIdRef.current)
      setMensajes((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, autor: 'bot', texto: respuesta },
      ])
    } catch (err) {
      const mensajeError =
        err.response?.data?.error ??
        'No se pudo contactar al asistente. Intenta de nuevo.'
      setError(mensajeError)
    } finally {
      setLoading(false)
    }
  }, [])

  return { mensajes, enviar, loading, error }
}