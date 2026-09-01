import { useEffect, useState } from 'react'
import { X, Loader2, Plus, Trash2 } from 'lucide-react'

import { listarHorariosDeDoctor } from '../api/catalogo.js'
import { crearHorario, eliminarHorario } from '../api/horarios.js'

const DIAS = [
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
  'domingo',
]

export default function HorariosModal({ doctor, onClose }) {
  const [horarios, setHorarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [diaSemana, setDiaSemana] = useState(DIAS[0])
  const [horaInicio, setHoraInicio] = useState('')
  const [horaFin, setHoraFin] = useState('')
  const [agregando, setAgregando] = useState(false)

  function cargarHorarios() {
    setLoading(true)
    listarHorariosDeDoctor(doctor.id)
      .then(setHorarios)
      .catch(() => setError('No se pudieron cargar los horarios.'))
      .finally(() => setLoading(false))
  }

  useEffect(cargarHorarios, [doctor.id])

  async function handleAgregar(e) {
    e.preventDefault()
    if (!horaInicio || !horaFin) {
      setError('Elige hora de inicio y fin.')
      return
    }

    setError(null)
    setAgregando(true)
    try {
      await crearHorario({ doctorId: doctor.id, diaSemana, horaInicio, horaFin })
      setHoraInicio('')
      setHoraFin('')
      cargarHorarios()
    } catch (err) {
      const mensaje = err.response?.data?.error ?? 'No se pudo agregar el horario.'
      setError(mensaje)
    } finally {
      setAgregando(false)
    }
  }

  async function handleEliminar(id) {
    try {
      await eliminarHorario(id)
      cargarHorarios()
    } catch {
      setError('No se pudo eliminar el horario.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-md rounded-xl border border-hairline bg-cream-50 shadow-lg">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <h2 className="text-base font-medium text-ink">
            Horarios · {doctor.nombres} {doctor.apellidos}
          </h2>
          <button
            onClick={onClose}
            className="text-muted transition-colors hover:text-ink"
            aria-label="Cerrar"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="max-h-[28rem] overflow-y-auto px-5 py-5">
          {loading && (
            <div className="flex items-center gap-2 py-4 text-sm text-muted">
              <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
              Cargando...
            </div>
          )}

          {!loading && horarios.length === 0 && (
            <p className="mb-4 text-sm text-muted">Sin horarios registrados.</p>
          )}

          {!loading && horarios.length > 0 && (
            <ul className="mb-5 space-y-2">
              {horarios.map((h) => (
                <li
                  key={h.id}
                  className="flex items-center justify-between rounded-lg border border-hairline px-3.5 py-2.5"
                >
                  <span className="text-sm capitalize text-ink">
                    {h.diaSemana} · {h.horaInicio.slice(0, 5)} - {h.horaFin.slice(0, 5)}
                  </span>
                  <button
                    onClick={() => handleEliminar(h.id)}
                    className="text-muted transition-colors hover:text-accent-600"
                    aria-label="Eliminar horario"
                  >
                    <Trash2 className="size-4" strokeWidth={1.75} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {error && (
            <p className="mb-4 rounded-lg bg-accent-50 px-4 py-2.5 text-sm text-accent-700">
              {error}
            </p>
          )}

          <form onSubmit={handleAgregar} className="space-y-3 border-t border-hairline pt-4">
            <p className="text-sm font-medium text-ink">Agregar horario</p>

            <select
              value={diaSemana}
              onChange={(e) => setDiaSemana(e.target.value)}
              className="block w-full rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm capitalize text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
            >
              {DIAS.map((dia) => (
                <option key={dia} value={dia} className="capitalize">
                  {dia}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-3">
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="flex-1 rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
              />
              <span className="text-sm text-muted">a</span>
              <input
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                className="flex-1 rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
              />
            </div>

            <button
              type="submit"
              disabled={agregando}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {agregando ? (
                <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
              ) : (
                <>
                  <Plus className="size-4" strokeWidth={1.75} />
                  Agregar horario
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}