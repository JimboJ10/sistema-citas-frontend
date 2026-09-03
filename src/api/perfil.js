import api from './axios.js'

/**
 * @param {number} pacienteId
 * @returns {Promise<object>} datos del paciente
 */
export async function obtenerPerfil(pacienteId) {
  const { data } = await api.get(`/pacientes/${pacienteId}`)
  return data
}

/**
 * @param {number} pacienteId
 * @param {{ nombres: string, apellidos: string, email?: string, telefono: string, fechaNacimiento?: string }} payload
 */
export async function actualizarPerfil(pacienteId, payload) {
  const { data } = await api.put(`/pacientes/${pacienteId}`, payload)
  return data
}