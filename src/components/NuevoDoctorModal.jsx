import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'

import { crearDoctor } from '../api/admin.js'

export default function NuevoDoctorModal({ especialidades, onClose, onCreado }) {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
  })
  const [especialidadesElegidas, setEspecialidadesElegidas] = useState([])
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  function update(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function alternarEspecialidad(id) {
    setEspecialidadesElegidas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (especialidadesElegidas.length === 0) {
      setError('Elige al menos una especialidad.')
      return
    }

    setError(null)
    setEnviando(true)

    try {
      await crearDoctor({ ...form, especialidadIds: especialidadesElegidas })
      onCreado()
    } catch (err) {
      const mensaje = err.response?.data?.error ?? 'No se pudo crear el doctor.'
      setError(mensaje)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-md rounded-xl border border-hairline bg-cream-50 shadow-lg">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <h2 className="text-base font-medium text-ink">Nuevo doctor</h2>
          <button
            onClick={onClose}
            className="text-muted transition-colors hover:text-ink"
            aria-label="Cerrar"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[28rem] space-y-4 overflow-y-auto px-5 py-5">
          <div className="grid grid-cols-2 gap-3">
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
            <label className="text-sm font-medium text-ink" htmlFor="email">
              Email
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
            <label className="text-sm font-medium text-ink" htmlFor="telefono">
              Teléfono (opcional)
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
            <span className="text-sm font-medium text-ink">Especialidades</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {especialidades.map((esp) => {
                const elegida = especialidadesElegidas.includes(esp.id)
                return (
                  <button
                    key={esp.id}
                    type="button"
                    onClick={() => alternarEspecialidad(esp.id)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                      elegida
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-hairline text-muted hover:border-brand-300'
                    }`}
                  >
                    {esp.nombre}
                  </button>
                )
              })}
            </div>
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
              'Crear doctor'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}