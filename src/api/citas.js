import api from './axios.js'

/*
  Citas del paciente logueado.
*/

/** @returns {Promise<Array>} lista de citas del paciente */
export async function listarMisCitas() {
  // TODO: const { data } = await api.get('/citas')
  // TODO: return data
  throw new Error('api/citas.listarMisCitas() todavia no implementado')
}

/** @param {{ especialidadId: number, fecha: string, hora: string }} payload */
export async function crearCita(payload) {
  // TODO: const { data } = await api.post('/citas', payload)
  // TODO: return data
  throw new Error('api/citas.crearCita() todavia no implementado')
}

/** @param {number} id */
export async function cancelarCita(id) {
  // TODO: await api.delete(`/citas/${id}`)
  throw new Error('api/citas.cancelarCita() todavia no implementado')
}

void api
