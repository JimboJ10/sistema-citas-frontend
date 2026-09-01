import api from './axios.js'

/**
 * @param {number} pacienteId
 * @returns {Promise<Array>} lista de citas del paciente
 */
export async function listarMisCitas(pacienteId) {
  const { data } = await api.get(`/citas/paciente/${pacienteId}`)
  return data
}

/**
 * @param {{ pacienteId: number, doctorId: number, fechaHora: string, notas?: string }} payload
 */
export async function crearCita(payload) {
  const { data } = await api.post('/citas', payload)
  return data
}

/**
 * @param {number} id
 */
export async function cancelarCita(id) {
  const { data } = await api.patch(`/citas/${id}/estado`, null, {
    params: { nuevoEstado: 'CANCELADA' },
  })
  return data
}

/**
 * @returns {Promise<Array>} todas las citas del sistema (solo ADMIN)
 */
export async function listarTodasLasCitas() {
  const { data } = await api.get('/citas')
  return data
}