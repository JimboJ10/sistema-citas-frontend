import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, Stethoscope } from 'lucide-react'

import { listarDoctores } from '../../api/catalogo.js'

export default function Doctores() {
  const [doctores, setDoctores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    listarDoctores()
      .then(setDoctores)
      .catch(() => setError('No se pudieron cargar los doctores.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-500">
        Equipo médico
      </p>
      <h1 className="mt-2 text-2xl font-medium text-ink lg:text-3xl">
        Nuestros doctores
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
        Conoce a los especialistas disponibles en VitalCare antes de agendar tu cita.
      </p>

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

      {!loading && !error && (
        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctores.map((doc) => (
            <Link
              key={doc.id}
              to={`/doctores/${doc.id}`}
              className="rounded-xl border border-hairline bg-cream-50 p-5 shadow-sm transition-colors hover:border-brand-300"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Stethoscope className="size-5" strokeWidth={1.5} />
              </div>
              <h2 className="mt-4 text-base font-medium text-ink">
                {doc.nombres} {doc.apellidos}
              </h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {doc.especialidades?.map((esp) => (
                  <span
                    key={esp.id}
                    className="rounded-md bg-cream-200 px-2 py-0.5 text-xs text-muted"
                  >
                    {esp.nombre}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  )
}