import api from './axios.js'

/**
 * @param {{ doctorId: number, diaSemana: string, horaInicio: string, horaFin: string }} payload
 */
export async function crearHorario(payload) {
  const { data } = await api.post('/horarios', payload)
  return data
}

/**
 * @param {number} id
 */
export async function eliminarHorario(id) {
  await api.delete(`/horarios/${id}`)
}