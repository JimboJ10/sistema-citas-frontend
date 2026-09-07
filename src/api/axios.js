import axios from 'axios'

import { getStoredToken } from '../context/AuthContext.jsx'

/*
  Instancia base de axios para toda la app.
  baseURL viene de una variable de entorno (VITE_API_URL), configurada
  distinto en desarrollo (.env.local) y en producción (Vercel).
  Si no está definida, cae en localhost:8080 para desarrollo local.
*/
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

/*
  Interceptor de request: agrega Authorization: Bearer <token> en cada peticion.
  El token se lee de localStorage (misma fuente que persiste el AuthContext),
  porque un interceptor no puede usar hooks de React.
*/
api.interceptors.request.use((config) => {
  const token = getStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/*
  TODO (lo haras tu despues):
  Interceptor de response para manejar 401 / token expirado, por ejemplo:

  api.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('vitalcare.auth')
        window.location.assign('/login')
      }
      return Promise.reject(error)
    },
  )
*/

export default api