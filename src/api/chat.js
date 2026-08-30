import api from './axios.js'

/*
  Chatbot.
*/

/**
 * @param {string} mensaje
 * @param {string} [conversationId]
 * @returns {Promise<{ respuesta: string, conversationId: string }>}
 */
export async function enviarMensaje(mensaje, conversationId) {
  // TODO: const { data } = await api.post('/chat', { mensaje, conversationId })
  // TODO: return data
  throw new Error('api/chat.enviarMensaje() todavia no implementado')
}

void api
