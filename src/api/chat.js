import api from './axios.js'

/**
 * @param {string} mensaje
 * @param {string} conversationId
 * @param {number|null} [pacienteId] - si el usuario está logueado como paciente
 * @returns {Promise<string>} la respuesta del asistente en texto plano
 */
export async function enviarMensaje(mensaje, conversationId, pacienteId = null) {
  const { data } = await api.post('/chatbot', { mensaje, conversationId, pacienteId })
  return data
}