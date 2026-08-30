import PageHeader from '../../components/PageHeader.jsx'
// import { useEffect, useState } from 'react'
// import { listarAgenda } from '../../api/agenda.js'

/* TODO: reemplazar por datos reales de la API (listarAgenda). */
const AGENDA_DEMO = [
  {
    id: 101,
    paciente: 'Luis Contreras',
    motivo: 'Control de presion',
    fecha: '2026-08-29',
    hora: '08:30',
    estado: 'Confirmada',
  },
  {
    id: 102,
    paciente: 'Maria Fernandez',
    motivo: 'Primera consulta',
    fecha: '2026-08-29',
    hora: '09:15',
    estado: 'Confirmada',
  },
  {
    id: 103,
    paciente: 'Andres Rojas',
    motivo: 'Resultados de examenes',
    fecha: '2026-08-29',
    hora: '10:00',
    estado: 'Pendiente',
  },
  {
    id: 104,
    paciente: 'Carla Nunez',
    motivo: 'Seguimiento',
    fecha: '2026-08-29',
    hora: '11:30',
    estado: 'Cancelada',
  },
]

const ESTADO_STYLES = {
  Confirmada: 'bg-brand-50 text-brand-700',
  Pendiente: 'bg-accent-400/15 text-accent-600',
  Cancelada: 'bg-cream-300 text-muted line-through',
}

export default function Agenda() {
  // const [agenda, setAgenda] = useState([])
  // useEffect(() => { listarAgenda().then(setAgenda) }, [])
  const agenda = AGENDA_DEMO

  return (
    <>
      <PageHeader
        eyebrow="Doctor"
        title="Agenda de hoy"
        description="Citas asignadas para el viernes 29 de agosto."
      />

      <div className="overflow-hidden rounded-xl border border-hairline bg-cream-50 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-hairline text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-3 font-medium">Hora</th>
              <th className="px-5 py-3 font-medium">Paciente</th>
              <th className="px-5 py-3 font-medium">Motivo</th>
              <th className="px-5 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {agenda.map((cita) => (
              <tr key={cita.id} className="transition-colors hover:bg-cream-100">
                <td className="whitespace-nowrap px-5 py-4 font-medium text-ink">
                  {cita.hora}
                </td>
                <td className="px-5 py-4 text-ink">{cita.paciente}</td>
                <td className="px-5 py-4 text-muted">{cita.motivo}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${
                      ESTADO_STYLES[cita.estado] ?? 'bg-cream-300 text-muted'
                    }`}
                  >
                    {cita.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
