import api from './axios.js'

/**
 * @returns {Promise<Array<{id: number, nombre: string, descripcion: string}>>}
 */
export async function listarEspecialidades() {
  const { data } = await api.get('/especialidades')
  return data
}

/**
 * @returns {Promise<Array>} todos los doctores registrados
 */
export async function listarDoctores() {
  const { data } = await api.get('/doctores')
  return data
}

/**
 * @param {number} especialidadId
 * @returns {Promise<Array>} doctores que tienen esa especialidad
 */
export async function listarDoctoresPorEspecialidad(especialidadId) {
  const { data } = await api.get(`/doctores/especialidad/${especialidadId}`)
  return data
}

/**
 * @param {number} doctorId
 * @returns {Promise<Array>} horarios disponibles del doctor
 */
export async function listarHorariosDeDoctor(doctorId) {
  const { data } = await api.get(`/horarios/doctor/${doctorId}`)
  return data
}

/**
 * @param {number} doctorId
 * @returns {Promise<object>} detalle del doctor
 */
export async function obtenerDoctor(doctorId) {
  const { data } = await api.get(`/doctores/${doctorId}`)
  return data
}