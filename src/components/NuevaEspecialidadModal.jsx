import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'

import { crearEspecialidad } from '../api/admin.js'

export default function NuevaEspecialidadModal({ onClose, onCreada }) {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setEnviando(true)

    try {
      await crearEspecialidad({ nombre, descripcion: descripcion.trim() || null })
      onCreada()
    } catch (err) {
      const mensaje =
        err.response?.data?.error ?? 'No se pudo crear la especialidad.'
      setError(mensaje)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-sm rounded-xl border border-hairline bg-cream-50 shadow-lg">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <h2 className="text-base font-medium text-ink">Nueva especialidad</h2>
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

          <button
            type="submit"
            disabled={enviando || !nombre.trim()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {enviando ? (
              <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
            ) : (
              'Crear especialidad'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}