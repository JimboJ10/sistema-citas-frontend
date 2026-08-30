import api from './axios.js'

/*
  Gestion de doctores y especialidades (solo ADMIN).
*/

export async function listarDoctores() {
  // TODO: const { data } = await api.get('/admin/doctores')
  // TODO: return data
  throw new Error('api/admin.listarDoctores() todavia no implementado')
}

export async function listarEspecialidades() {
  // TODO: const { data } = await api.get('/admin/especialidades')
  // TODO: return data
  throw new Error('api/admin.listarEspecialidades() todavia no implementado')
}

/** @param {{ nombre: string, especialidadId: number }} payload */
export async function crearDoctor(payload) {
  // TODO: const { data } = await api.post('/admin/doctores', payload)
  // TODO: return data
  throw new Error('api/admin.crearDoctor() todavia no implementado')
}

/** @param {{ nombre: string }} payload */
export async function crearEspecialidad(payload) {
  // TODO: const { data } = await api.post('/admin/especialidades', payload)
  // TODO: return data
  throw new Error('api/admin.crearEspecialidad() todavia no implementado')
}

void api
