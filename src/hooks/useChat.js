import { useCallback, useRef, useState } from 'react'
import { enviarMensaje } from '../api/chat.js'
import { useAuth } from '../context/AuthContext.jsx'

const MENSAJE_BIENVENIDA = {
  id: 'bienvenida',
  autor: 'bot',
  texto:
    'Hola, soy el asistente de VitalCare. Puedo ayudarte a consultar especialidades, doctores, horarios y agendar tu cita.',
}

function generarConversationId() {
  return `conv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useChat() {
  const { user } = useAuth()
  const [mensajes, setMensajes] = useState([MENSAJE_BIENVENIDA])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const conversationIdRef = useRef(generarConversationId())

  const enviar = useCallback(
    async (texto) => {
      const value = texto.trim()
      if (!value) return

      setError(null)
      setMensajes((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, autor: 'user', texto: value },
      ])
      setLoading(true)

      try {
        const respuesta = await enviarMensaje(
          value,
          conversationIdRef.current,
          user?.pacienteId ?? null
        )
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
    },
    [user?.pacienteId]
  )

  return { mensajes, enviar, loading, error }
}