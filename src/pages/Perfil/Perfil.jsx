import { useEffect, useState } from 'react'
import { Loader2, Save, Check } from 'lucide-react'

import PageHeader from '../../components/PageHeader.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { obtenerPerfil, actualizarPerfil } from '../../api/perfil.js'

function validar(form) {
  const errores = {}
  if (!form.nombres.trim()) errores.nombres = 'Ingresa tus nombres.'
  if (!form.apellidos.trim()) errores.apellidos = 'Ingresa tus apellidos.'
  if (!form.telefono.trim()) errores.telefono = 'Ingresa tu teléfono.'
  return errores
}

function inputClass(hasError) {
  return `mt-2 block w-full rounded-lg border bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:ring-2 ${
    hasError
      ? 'border-accent-400 focus:border-accent-400 focus:ring-accent-500/15'
      : 'border-hairline focus:border-brand-400 focus:ring-brand-500/15'
  }`
}

export default function Perfil() {
  const { user } = useAuth()

  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
  })
  const [errores, setErrores] = useState({})
  const [loading, setLoading] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState(null)
  const [guardado, setGuardado] = useState(false)

  useEffect(() => {
    if (!user?.pacienteId) return

    obtenerPerfil(user.pacienteId)
      .then((data) =>
        setForm({
          nombres: data.nombres ?? '',
          apellidos: data.apellidos ?? '',
          email: data.email ?? '',
          telefono: data.telefono ?? '',
          fechaNacimiento: data.fechaNacimiento ?? '',
        })
      )
      .catch(() => setError('No se pudo cargar tu perfil.'))
      .finally(() => setLoading(false))
  }, [user?.pacienteId])

  function update(e) {
    setGuardado(false)
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrores((prev) => ({ ...prev, [e.target.name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setGuardado(false)

    const erroresValidacion = validar(form)
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion)
      return
    }

    setGuardando(true)
    try {
      await actualizarPerfil(user.pacienteId, {
        ...form,
        email: form.email.trim() || null,
        fechaNacimiento: form.fechaNacimiento || null,
      })
      setGuardado(true)
    } catch (err) {
      const mensaje = err.response?.data?.error ?? 'No se pudo guardar el perfil.'
      setError(mensaje)
    } finally {
      setGuardando(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Paciente"
        title="Mi perfil"
        description="Mantén tus datos actualizados."
      />

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted">
          <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
          Cargando tu perfil...
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="max-w-md space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-ink" htmlFor="nombres">
                Nombres
              </label>
              <input
                id="nombres"
                name="nombres"
                value={form.nombres}
                onChange={update}
                className={inputClass(errores.nombres)}
              />
              {errores.nombres && (
                <p className="mt-1.5 text-xs text-accent-600">{errores.nombres}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-ink" htmlFor="apellidos">
                Apellidos
              </label>
              <input
                id="apellidos"
                name="apellidos"
                value={form.apellidos}
                onChange={update}
                className={inputClass(errores.apellidos)}
              />
              {errores.apellidos && (
                <p className="mt-1.5 text-xs text-accent-600">{errores.apellidos}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-ink" htmlFor="telefono">
              Teléfono
            </label>
            <input
              id="telefono"
              name="telefono"
              value={form.telefono}
              onChange={update}
              className={inputClass(errores.telefono)}
            />
            {errores.telefono && (
              <p className="mt-1.5 text-xs text-accent-600">{errores.telefono}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-ink" htmlFor="email">
              Email (opcional)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              className={inputClass(false)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink" htmlFor="fechaNacimiento">
              Fecha de nacimiento (opcional)
            </label>
            <input
              id="fechaNacimiento"
              name="fechaNacimiento"
              type="date"
              value={form.fechaNacimiento}
              onChange={update}
              className={inputClass(false)}
            />
          </div>

          {error && (
            <p className="rounded-lg bg-accent-50 px-4 py-2.5 text-sm text-accent-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={guardando}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {guardando ? (
              <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
            ) : guardado ? (
              <>
                <Check className="size-4" strokeWidth={1.75} />
                Guardado
              </>
            ) : (
              <>
                <Save className="size-4" strokeWidth={1.75} />
                Guardar cambios
              </>
            )}
          </button>
        </form>
      )}
    </>
  )
}