import api from './axios.js'

/**
 * @param {number} doctorId
 * @returns {Promise<Array>} citas asignadas al doctor
 */
export async function listarAgenda(doctorId) {
  const { data } = await api.get(`/citas/doctor/${doctorId}`)
  return data
}

/**
 * @param {number} citaId
 * @param {'PENDIENTE'|'CONFIRMADA'|'CANCELADA'|'COMPLETADA'} nuevoEstado
 */
export async function actualizarEstadoCita(citaId, nuevoEstado) {
  const { data } = await api.patch(`/citas/${citaId}/estado`, null, {
    params: { nuevoEstado },
  })
  return data
}