import api from './axios.js'

/**
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ token: string, username: string, rol: string }>}
 */
export async function login(credentials) {
  const { data } = await api.post('/auth/login', credentials)
  return data
}

/**
 * @param {{ username: string, password: string, rol: string, pacienteId?: number|null, doctorId?: number|null }} payload
 */
export async function register(payload) {
  const { data } = await api.post('/auth/registro', payload)
  return data
}