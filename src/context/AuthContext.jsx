import { createContext, useCallback, useContext, useMemo, useState } from 'react'

/*
  AuthContext
  -----------
  Guarda en estado de React el token JWT y los datos del usuario (username, rol),
  y lo persiste en localStorage para sobrevivir recargas.

  La logica de "hacer login contra la API" NO vive aqui: las paginas llamaran a
  las funciones de src/api/ y, cuando reciban la respuesta, invocaran login().
*/

const AuthContext = createContext(null)

export const AUTH_STORAGE_KEY = 'vitalcare.auth'

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return { token: null, user: null }
    const parsed = JSON.parse(raw)
    return { token: parsed.token ?? null, user: parsed.user ?? null }
  } catch {
    return { token: null, user: null }
  }
}

/**
 * Lectura sincrona del token fuera de React (la usa el interceptor de axios,
 * que no puede llamar hooks).
 */
export function getStoredToken() {
  return readStoredAuth().token
}

export function AuthProvider({ children }) {
  const [{ token, user }, setAuth] = useState(readStoredAuth)

  const login = useCallback((nextToken, nextUser) => {
    setAuth({ token: nextToken, user: nextUser })
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ token: nextToken, user: nextUser }),
    )
  }, [])

  const logout = useCallback(() => {
    setAuth({ token: null, user: null })
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  const value = useMemo(
    () => ({
      token,
      user, // { username, rol }
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth() debe usarse dentro de <AuthProvider>')
  }
  return ctx
}
