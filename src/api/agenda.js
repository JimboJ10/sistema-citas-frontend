import api from './axios.js'

/*
  Agenda del doctor logueado (citas asignadas).
*/

/** @returns {Promise<Array>} citas asignadas al doctor */
export async function listarAgenda() {
  // TODO: const { data } = await api.get('/agenda')
  // TODO: return data
  throw new Error('api/agenda.listarAgenda() todavia no implementado')
}

/** @param {number} citaId @param {string} estado */
export async function actualizarEstadoCita(citaId, estado) {
  // TODO: const { data } = await api.patch(`/agenda/${citaId}`, { estado })
  // TODO: return data
  throw new Error('api/agenda.actualizarEstadoCita() todavia no implementado')
}

void api
