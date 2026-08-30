import { CalendarClock, MapPin, Plus } from 'lucide-react'

import PageHeader from '../../components/PageHeader.jsx'
// import { useEffect, useState } from 'react'
// import { listarMisCitas } from '../../api/citas.js'

/* TODO: reemplazar por datos reales de la API (listarMisCitas). */
const CITAS_DEMO = [
  {
    id: 1,
    especialidad: 'Cardiologia',
    doctor: 'Dra. Elena Ruiz',
    fecha: '2026-09-03',
    hora: '09:30',
    sede: 'Sede Centro - Consultorio 4',
    estado: 'Confirmada',
  },
  {
    id: 2,
    especialidad: 'Dermatologia',
    doctor: 'Dr. Marco Diaz',
    fecha: '2026-09-11',
    hora: '12:00',
    sede: 'Sede Norte - Consultorio 12',
    estado: 'Pendiente',
  },
  {
    id: 3,
    especialidad: 'Medicina general',
    doctor: 'Dra. Sofia Prat',
    fecha: '2026-08-19',
    hora: '16:15',
    sede: 'Sede Centro - Consultorio 1',
    estado: 'Completada',
  },
]

const ESTADO_STYLES = {
  Confirmada: 'bg-brand-50 text-brand-700',
  Pendiente: 'bg-accent-400/15 text-accent-600',
  Completada: 'bg-cream-300 text-muted',
}

function formatFecha(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('es', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export default function Citas() {
  // const [citas, setCitas] = useState([])
  // useEffect(() => { listarMisCitas().then(setCitas) }, [])
  const citas = CITAS_DEMO

  return (
    <>
      <PageHeader
        eyebrow="Paciente"
        title="Mis citas"
        description="Tus proximas consultas y el historial reciente."
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

      <ul className="grid gap-4 sm:grid-cols-2">
        {citas.map((cita) => (
          <li
            key={cita.id}
            className="rounded-xl border border-hairline bg-cream-50 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-medium text-ink">
                  {cita.especialidad}
                </h2>
                <p className="mt-0.5 text-sm text-muted">{cita.doctor}</p>
              </div>
              <span
                className={`rounded-md px-2 py-1 text-xs font-medium ${
                  ESTADO_STYLES[cita.estado] ?? 'bg-cream-300 text-muted'
                }`}
              >
                {cita.estado}
              </span>
            </div>

            <dl className="mt-5 space-y-2 text-sm text-muted">
              <div className="flex items-center gap-2">
                <CalendarClock className="size-4 shrink-0" strokeWidth={1.5} />
                <span className="capitalize">
                  {formatFecha(cita.fecha)} - {cita.hora}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" strokeWidth={1.5} />
                <span>{cita.sede}</span>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  )
}
