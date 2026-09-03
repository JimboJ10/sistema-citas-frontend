import { useEffect, useState } from 'react'
import { Loader2, Save, Check } from 'lucide-react'

import PageHeader from '../../components/PageHeader.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { obtenerPerfil, actualizarPerfil } from '../../api/perfil.js'

export default function Perfil() {
  const { user } = useAuth()

  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
  })
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
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setGuardando(true)
    setGuardado(false)

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
        <form onSubmit={handleSubmit} className="max-w-md space-y-5">
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
                className="mt-2 block w-full rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
              />
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
                className="mt-2 block w-full rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
              />
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
              className="mt-2 block w-full rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
            />
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
              className="mt-2 block w-full rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
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
              className="mt-2 block w-full rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
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