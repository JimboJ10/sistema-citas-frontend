import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Loader2, Stethoscope, Mail, Phone, Clock, ArrowLeft } from 'lucide-react'

import { obtenerDoctor, listarHorariosDeDoctor } from '../../api/catalogo.js'

export default function DoctorDetalle() {
  const { id } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [horarios, setHorarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([obtenerDoctor(id), listarHorariosDeDoctor(id)])
      .then(([doc, hor]) => {
        setDoctor(doc)
        setHorarios(hor)
      })
      .catch(() => setError('No se pudo cargar la información del doctor.'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <>
      <Link
        to="/doctores"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} />
        Volver a doctores
      </Link>

      {loading && (
        <div className="mt-10 flex items-center gap-2 text-sm text-muted">
          <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
          Cargando...
        </div>
      )}

      {error && (
        <p className="mt-10 rounded-lg bg-accent-50 px-4 py-2.5 text-sm text-accent-700">
          {error}
        </p>
      )}

      {!loading && doctor && (
        <div className="mt-8">
          <div className="flex size-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Stethoscope className="size-7" strokeWidth={1.5} />
          </div>

          <h1 className="mt-5 text-2xl font-medium text-ink lg:text-3xl">
            {doctor.nombres} {doctor.apellidos}
          </h1>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {doctor.especialidades?.map((esp) => (
              <span
                key={esp.id}
                className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
              >
                {esp.nombre}
              </span>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-sm text-muted">
            <div className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" strokeWidth={1.5} />
              {doctor.email}
            </div>
            {doctor.telefono && (
              <div className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" strokeWidth={1.5} />
                {doctor.telefono}
              </div>
            )}
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
              Horarios de atención
            </h2>
            {horarios.filter((h) => h.activo).length === 0 ? (
              <p className="mt-3 text-sm text-muted">
                Horarios no disponibles por el momento.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {horarios
                  .filter((h) => h.activo)
                  .map((h) => (
                    <li
                      key={h.id}
                      className="flex items-center gap-2 rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink"
                    >
                      <Clock className="size-4 shrink-0 text-muted" strokeWidth={1.5} />
                      <span className="capitalize">{h.diaSemana}</span>
                      <span className="text-muted">
                        {h.horaInicio.slice(0, 5)} - {h.horaFin.slice(0, 5)}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <Link
            to="/chat"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-accent-600"
          >
            Agendar con este doctor
          </Link>
        </div>
      )}
    </>
  )
}