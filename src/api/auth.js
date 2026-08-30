import api from './axios.js'

/*
  Endpoints de autenticacion.
  Firmas dejadas listas; la implementacion real la conectas tu.
  Ajusta las rutas ('/auth/login', etc.) a las de tu API de Spring Boot.
*/

/**
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ token: string, username: string, rol: string }>}
 */
export async function login(credentials) {
  // TODO: const { data } = await api.post('/auth/login', credentials)
  // TODO: return data
  throw new Error('api/auth.login() todavia no implementado')
}

/**
 * @param {{ username: string, password: string, rol: string }} payload
 */
export async function register(payload) {
  // TODO: const { data } = await api.post('/auth/register', payload)
  // TODO: return data
  throw new Error('api/auth.register() todavia no implementado')
}

// `api` se importa para tenerlo a mano al descomentar los TODO de arriba.
void api
