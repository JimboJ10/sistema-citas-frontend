import { useState } from 'react'
import { X, Loader2, Trash2 } from 'lucide-react'

import { crearEspecialidad, editarEspecialidad, eliminarEspecialidad } from '../api/admin.js'

export default function EspecialidadModal({ especialidad, onClose, onGuardada, onEliminada }) {
  const esEdicion = Boolean(especialidad)

  const [nombre, setNombre] = useState(especialidad?.nombre ?? '')
  const [descripcion, setDescripcion] = useState(especialidad?.descripcion ?? '')
  const [enviando, setEnviando] = useState(false)
  const [eliminando, setEliminando] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setEnviando(true)

    try {
      const payload = { nombre, descripcion: descripcion.trim() || null }
      if (esEdicion) {
        await editarEspecialidad(especialidad.id, payload)
      } else {
        await crearEspecialidad(payload)
      }
      onGuardada()
    } catch (err) {
      const mensaje =
        err.response?.data?.error ?? 'No se pudo guardar la especialidad.'
      setError(mensaje)
    } finally {
      setEnviando(false)
    }
  }

  async function handleEliminar() {
    if (!window.confirm(`¿Eliminar la especialidad "${especialidad.nombre}"?`)) return

    setError(null)
    setEliminando(true)
    try {
      await eliminarEspecialidad(especialidad.id)
      onEliminada()
    } catch (err) {
      const mensaje =
        err.response?.data?.error ?? 'No se pudo eliminar. Puede tener doctores asociados.'
      setError(mensaje)
      setEliminando(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-sm rounded-xl border border-hairline bg-cream-50 shadow-lg">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <h2 className="text-base font-medium text-ink">
            {esEdicion ? 'Editar especialidad' : 'Nueva especialidad'}
          </h2>
          <button
            onClick={onClose}
            className="text-muted transition-colors hover:text-ink"
            aria-label="Cerrar"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="nombre-esp">
              Nombre
            </label>
            <input
              id="nombre-esp"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Traumatología"
              className="mt-2 block w-full rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-ink" htmlFor="descripcion-esp">
              Descripción (opcional)
            </label>
            <textarea
              id="descripcion-esp"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={2}
              className="mt-2 block w-full resize-none rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-accent-50 px-4 py-2.5 text-sm text-accent-700">
              {error}
            </p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={enviando || !nombre.trim()}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {enviando ? (
                <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
              ) : esEdicion ? (
                'Guardar cambios'
              ) : (
                'Crear especialidad'
              )}
            </button>

            {esEdicion && (
              <button
                type="button"
                onClick={handleEliminar}
                disabled={eliminando}
                className="inline-flex items-center justify-center rounded-lg border border-hairline p-2.5 text-accent-600 transition-colors hover:border-accent-300 hover:bg-accent-50 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Eliminar especialidad"
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