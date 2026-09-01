import api from './axios.js'

/*
  Gestión de doctores y especialidades (operaciones de escritura, solo ADMIN).
  La lectura (listar) se reutiliza desde api/catalogo.js, ya que son los
  mismos endpoints públicos de consulta.
*/

/** @param {{ nombres: string, apellidos: string, email: string, telefono?: string, especialidadIds: number[] }} payload */
export async function crearDoctor(payload) {
  const { data } = await api.post('/doctores', payload)
  return data
}

/** @param {{ nombre: string, descripcion?: string }} payload */
export async function crearEspecialidad(payload) {
  const { data } = await api.post('/especialidades', payload)
  return data
}