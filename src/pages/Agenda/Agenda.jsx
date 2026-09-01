import { useEffect, useState } from 'react'
import { Loader2, Check, X as XIcon, CheckCheck } from 'lucide-react'

import PageHeader from '../../components/PageHeader.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { listarAgenda, actualizarEstadoCita } from '../../api/agenda.js'

const ESTADO_LABELS = {
  PENDIENTE: 'Pendiente',
  CONFIRMADA: 'Confirmada',
  CANCELADA: 'Cancelada',
  COMPLETADA: 'Completada',
}

const ESTADO_STYLES = {
  PENDIENTE: 'bg-accent-400/15 text-accent-600',
  CONFIRMADA: 'bg-brand-50 text-brand-700',
  CANCELADA: 'bg-cream-300 text-muted line-through',
  COMPLETADA: 'bg-cream-300 text-muted',
}

function formatFechaHora(iso) {
  const fecha = new Date(iso)
  return {
    fecha: fecha.toLocaleDateString('es', { day: 'numeric', month: 'short' }),
    hora: fecha.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
  }
}

export default function Agenda() {
  const { user } = useAuth()
  const [agenda, setAgenda] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actualizandoId, setActualizandoId] = useState(null)

  function cargarAgenda() {
    if (!user?.doctorId) return
    setLoading(true)
    listarAgenda(user.doctorId)
      .then(setAgenda)
      .catch(() => setError('No se pudo cargar la agenda.'))
      .finally(() => setLoading(false))
  }

  useEffect(cargarAgenda, [user?.doctorId])

  async function cambiarEstado(citaId, nuevoEstado) {
    setActualizandoId(citaId)
    setError(null)
    try {
      await actualizarEstadoCita(citaId, nuevoEstado)
      cargarAgenda()
    } catch (err) {
      const mensaje =
        err.response?.data?.error ?? 'No se pudo actualizar la cita.'
      setError(mensaje)
    } finally {
      setActualizandoId(null)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Doctor"
        title="Mi agenda"
        description="Citas asignadas a tu consulta."
      />

      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted">
          <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
          Cargando agenda...
        </div>
      )}

      {error && (
        <p className="mb-4 rounded-lg bg-accent-50 px-4 py-2.5 text-sm text-accent-700">
          {error}
        </p>
      )}

      {!loading && !error && agenda.length === 0 && (
        <p className="text-sm text-muted">No tienes citas asignadas todavía.</p>
      )}

      {!loading && agenda.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-hairline bg-cream-50 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Fecha</th>
                <th className="px-5 py-3 font-medium">Paciente</th>
                <th className="px-5 py-3 font-medium">Notas</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {agenda.map((cita) => {
                const { fecha, hora } = formatFechaHora(cita.fechaHora)
                const enProceso = actualizandoId === cita.id

                return (
                  <tr key={cita.id} className="transition-colors hover:bg-cream-100">
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-ink">
                      {fecha} · {hora}
                    </td>
                    <td className="px-5 py-4 text-ink">{cita.pacienteNombreCompleto}</td>
                    <td className="px-5 py-4 text-muted">{cita.notas ?? '—'}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-medium ${
                          ESTADO_STYLES[cita.estado] ?? 'bg-cream-300 text-muted'
                        }`}
                      >
                        {ESTADO_LABELS[cita.estado] ?? cita.estado}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {enProceso ? (
                        <Loader2 className="size-4 animate-spin text-muted" strokeWidth={1.75} />
                      ) : (
                        <div className="flex items-center gap-2">
                          {cita.estado === 'PENDIENTE' && (
                            <button
                              onClick={() => cambiarEstado(cita.id, 'CONFIRMADA')}
                              className="text-brand-600 transition-colors hover:text-brand-700"
                              title="Confirmar"
                            >
                              <Check className="size-4" strokeWidth={1.75} />
                            </button>
                          )}
                          {cita.estado === 'CONFIRMADA' && (
                            <button
                              onClick={() => cambiarEstado(cita.id, 'COMPLETADA')}
                              className="text-brand-600 transition-colors hover:text-brand-700"
                              title="Marcar como completada"
                            >
                              <CheckCheck className="size-4" strokeWidth={1.75} />
                            </button>
                          )}
                          {cita.estado !== 'CANCELADA' && cita.estado !== 'COMPLETADA' && (
                            <button
                              onClick={() => cambiarEstado(cita.id, 'CANCELADA')}
                              className="text-accent-600 transition-colors hover:text-accent-700"
                              title="Cancelar"
                            >
                              <XIcon className="size-4" strokeWidth={1.75} />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}