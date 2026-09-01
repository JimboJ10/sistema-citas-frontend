import { useEffect, useState } from 'react'
import { CalendarClock, MapPin, Plus, Loader2 } from 'lucide-react'

import PageHeader from '../../components/PageHeader.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { listarMisCitas } from '../../api/citas.js'

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
  const fechaTexto = fecha.toLocaleDateString('es', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const horaTexto = fecha.toLocaleTimeString('es', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${fechaTexto} - ${horaTexto}`
}

export default function Citas() {
  const { user } = useAuth()
  const [citas, setCitas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.pacienteId) return

    listarMisCitas(user.pacienteId)
      .then(setCitas)
      .catch(() => setError('No se pudieron cargar tus citas.'))
      .finally(() => setLoading(false))
  }, [user?.pacienteId])

  return (
    <>
      <PageHeader
        eyebrow="Paciente"
        title="Mis citas"
        description="Tus próximas consultas y el historial reciente."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-accent-600"
          >
            <Plus className="size-4" strokeWidth={1.75} />
            Agendar cita
          </button>
        }
      />

      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted">
          <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
          Cargando tus citas...
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-accent-50 px-4 py-2.5 text-sm text-accent-700">
          {error}
        </p>
      )}

      {!loading && !error && citas.length === 0 && (
        <p className="text-sm text-muted">Todavía no tienes citas agendadas.</p>
      )}

      <ul className="grid gap-4 sm:grid-cols-2">
        {citas.map((cita) => (
          <li
            key={cita.id}
            className="rounded-xl border border-hairline bg-cream-50 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-medium text-ink">
                  {cita.doctorNombreCompleto}
                </h2>
                {cita.notas && (
                  <p className="mt-0.5 text-sm text-muted">{cita.notas}</p>
                )}
              </div>
              <span
                className={`rounded-md px-2 py-1 text-xs font-medium ${
                  ESTADO_STYLES[cita.estado] ?? 'bg-cream-300 text-muted'
                }`}
              >
                {ESTADO_LABELS[cita.estado] ?? cita.estado}
              </span>
            </div>

            <dl className="mt-5 space-y-2 text-sm text-muted">
              <div className="flex items-center gap-2">
                <CalendarClock className="size-4 shrink-0" strokeWidth={1.5} />
                <span className="capitalize">{formatFechaHora(cita.fechaHora)}</span>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  )
}