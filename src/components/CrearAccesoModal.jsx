import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'

import { crearAccesoDoctor } from '../api/admin.js'

function validar(username, password) {
  const errores = {}
  if (!username.trim()) {
    errores.username = 'Elige un usuario.'
  } else if (username.trim().length < 4) {
    errores.username = 'El usuario debe tener al menos 4 caracteres.'
  }
  if (!password) {
    errores.password = 'Elige una contraseña.'
  } else if (password.length < 8) {
    errores.password = 'La contraseña debe tener al menos 8 caracteres.'
  }
  return errores
}

function inputClass(hasError) {
  return `mt-2 block w-full rounded-lg border bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:ring-2 ${
    hasError
      ? 'border-accent-400 focus:border-accent-400 focus:ring-accent-500/15'
      : 'border-hairline focus:border-brand-400 focus:ring-brand-500/15'
  }`
}

export default function CrearAccesoModal({ doctor, onClose, onCreado }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const erroresValidacion = validar(username, password)
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion)
      return
    }

    setEnviando(true)
    try {
      await crearAccesoDoctor({ username, password, doctorId: doctor.id })
      onCreado()
    } catch (err) {
      const mensaje = err.response?.data?.error ?? 'No se pudo crear el acceso.'
      setError(mensaje)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-sm rounded-xl border border-hairline bg-cream-50 shadow-lg">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <h2 className="text-base font-medium text-ink">
            Crear acceso · {doctor.nombres} {doctor.apellidos}
          </h2>
          <button
            onClick={onClose}
            className="text-muted transition-colors hover:text-ink"
            aria-label="Cerrar"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 px-5 py-5">
          <p className="text-sm text-muted">
            Crea las credenciales que el doctor usará para iniciar sesión y
            gestionar su agenda.
          </p>

          <div>
            <label className="text-sm font-medium text-ink" htmlFor="username-doc">
              Usuario
            </label>
            <input
              id="username-doc"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setErrores((prev) => ({ ...prev, username: undefined }))
              }}
              placeholder="dra.ruiz"
              className={inputClass(errores.username)}
            />
            {errores.username && (
              <p className="mt-1.5 text-xs text-accent-600">{errores.username}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-ink" htmlFor="password-doc">
              Contraseña temporal
            </label>
            <input
              id="password-doc"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setErrores((prev) => ({ ...prev, password: undefined }))
              }}
              placeholder="Mínimo 8 caracteres"
              className={inputClass(errores.password)}
            />
            {errores.password && (
              <p className="mt-1.5 text-xs text-accent-600">{errores.password}</p>
            )}
          </div>

          {error && (
            <p className="rounded-lg bg-accent-50 px-4 py-2.5 text-sm text-accent-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {enviando ? (
              <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
            ) : (
              'Crear acceso'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}