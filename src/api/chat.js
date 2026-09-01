import api from './axios.js'

/**
 * @param {string} mensaje
 * @param {string} conversationId
 * @returns {Promise<string>} la respuesta del asistente en texto plano
 */
export async function enviarMensaje(mensaje, conversationId) {
  const { data } = await api.post('/chatbot', { mensaje, conversationId })
  return data
}