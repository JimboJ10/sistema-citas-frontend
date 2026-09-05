import { useState } from 'react'
import { X, Loader2, Trash2 } from 'lucide-react'

import { crearDoctor, editarDoctor, eliminarDoctor } from '../api/admin.js'

function validar(form, especialidadesElegidas) {
  const errores = {}
  if (!form.nombres.trim()) errores.nombres = 'Ingresa los nombres.'
  if (!form.apellidos.trim()) errores.apellidos = 'Ingresa los apellidos.'
  if (!form.email.trim()) {
    errores.email = 'Ingresa un email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errores.email = 'El email no tiene un formato válido.'
  }
  if (especialidadesElegidas.length === 0) {
    errores.especialidades = 'Elige al menos una especialidad.'
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

export default function DoctorModal({ doctor, especialidades, onClose, onGuardado, onEliminado }) {
  const esEdicion = Boolean(doctor)

  const [form, setForm] = useState({
    nombres: doctor?.nombres ?? '',
    apellidos: doctor?.apellidos ?? '',
    email: doctor?.email ?? '',
    telefono: doctor?.telefono ?? '',
  })
  const [especialidadesElegidas, setEspecialidadesElegidas] = useState(
    doctor?.especialidades?.map((e) => e.id) ?? []
  )
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [eliminando, setEliminando] = useState(false)
  const [error, setError] = useState(null)

  function update(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrores((prev) => ({ ...prev, [e.target.name]: undefined }))
  }

  function alternarEspecialidad(id) {
    setEspecialidadesElegidas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
    setErrores((prev) => ({ ...prev, especialidades: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const erroresValidacion = validar(form, especialidadesElegidas)
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion)
      return
    }

    setEnviando(true)
    try {
      const payload = { ...form, especialidadIds: especialidadesElegidas }
      if (esEdicion) {
        await editarDoctor(doctor.id, payload)
      } else {
        await crearDoctor(payload)
      }
      onGuardado()
    } catch (err) {
      const mensaje = err.response?.data?.error ?? 'No se pudo guardar el doctor.'
      setError(mensaje)
    } finally {
      setEnviando(false)
    }
  }

  async function handleEliminar() {
    if (!window.confirm(`¿Eliminar a ${doctor.nombres} ${doctor.apellidos}?`)) return

    setError(null)
    setEliminando(true)
    try {
      await eliminarDoctor(doctor.id)
      onEliminado()
    } catch (err) {
      const mensaje =
        err.response?.data?.error ?? 'No se pudo eliminar. Puede tener citas asociadas.'
      setError(mensaje)
      setEliminando(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-md rounded-xl border border-hairline bg-cream-50 shadow-lg">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <h2 className="text-base font-medium text-ink">
            {esEdicion ? 'Editar doctor' : 'Nuevo doctor'}
          </h2>
          <button
            onClick={onClose}
            className="text-muted transition-colors hover:text-ink"
            aria-label="Cerrar"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="max-h-[28rem] space-y-4 overflow-y-auto px-5 py-5">
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
            <label className="text-sm font-medium text-ink" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              className={inputClass(errores.email)}
            />
            {errores.email && (
              <p className="mt-1.5 text-xs text-accent-600">{errores.email}</p>
            )}
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
              className={inputClass(false)}
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
            {errores.especialidades && (
              <p className="mt-1.5 text-xs text-accent-600">{errores.especialidades}</p>
            )}
          </div>

          {error && (
            <p className="rounded-lg bg-accent-50 px-4 py-2.5 text-sm text-accent-700">
              {error}
            </p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={enviando}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {enviando ? (
                <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
              ) : esEdicion ? (
                'Guardar cambios'
              ) : (
                'Crear doctor'
              )}
            </button>

            {esEdicion && (
              <button
                type="button"
                onClick={handleEliminar}
                disabled={eliminando}
                className="inline-flex items-center justify-center rounded-lg border border-hairline p-2.5 text-accent-600 transition-colors hover:border-accent-300 hover:bg-accent-50 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Eliminar doctor"
              >
                {eliminando ? (
                  <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
                ) : (
                  <Trash2 className="size-4" strokeWidth={1.75} />
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}