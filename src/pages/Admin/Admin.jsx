import { useEffect, useState } from 'react'
import { Plus, Stethoscope, Loader2 } from 'lucide-react'
import { KeyRound } from 'lucide-react'

import CrearAccesoModal from '../../components/CrearAccesoModal.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import NuevoDoctorModal from '../../components/NuevoDoctorModal.jsx'
import NuevaEspecialidadModal from '../../components/NuevaEspecialidadModal.jsx'
import HorariosModal from '../../components/HorariosModal.jsx'
import { listarDoctores, listarEspecialidades } from '../../api/catalogo.js'
import { Clock } from 'lucide-react'

export default function Admin() {
  const [doctores, setDoctores] = useState([])
  const [especialidades, setEspecialidades] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalDoctorAbierto, setModalDoctorAbierto] = useState(false)
  const [modalEspecialidadAbierto, setModalEspecialidadAbierto] = useState(false)
  const [doctorParaAcceso, setDoctorParaAcceso] = useState(null)
  const [doctorParaHorarios, setDoctorParaHorarios] = useState(null)

  function cargarDatos() {
    setLoading(true)
    Promise.all([listarDoctores(), listarEspecialidades()])
      .then(([doc, esp]) => {
        setDoctores(doc)
        setEspecialidades(esp)
      })
      .catch(() => setError('No se pudieron cargar los datos.'))
      .finally(() => setLoading(false))
  }

  useEffect(cargarDatos, [])

  return (
    <>
      <PageHeader
        eyebrow="Administración"
        title="Doctores y especialidades"
        description="Gestiona el equipo médico y el catálogo de especialidades."
        action={
          <button
            type="button"
            onClick={() => setModalDoctorAbierto(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-accent-600"
          >
            <Plus className="size-4" strokeWidth={1.75} />
            Nuevo doctor
          </button>
        }
      />

      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted">
          <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
          Cargando...
        </div>
      )}

      {error && (
        <p className="mb-4 rounded-lg bg-accent-50 px-4 py-2.5 text-sm text-accent-700">
          {error}
        </p>
      )}

      {!loading && (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctores.map((doc) => (
            <article
              key={doc.id}
              className="rounded-xl border border-hairline bg-cream-50 p-5 shadow-sm"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Stethoscope className="size-5" strokeWidth={1.5} />
              </div>
              <h2 className="mt-4 text-base font-medium text-ink">
                {doc.nombres} {doc.apellidos}
              </h2>
              <p className="mt-0.5 text-sm text-muted">{doc.email}</p>
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

              <div className="mt-4 flex items-center justify-between">
                {doc.tieneAcceso ? (
                  <p className="text-xs text-brand-600">Tiene acceso al sistema</p>
                ) : (
                  <button
                    onClick={() => setDoctorParaAcceso(doc)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-600 transition-colors hover:text-accent-700"
                  >
                    <KeyRound className="size-3.5" strokeWidth={1.75} />
                    Crear acceso
                  </button>
                )}

                <button
                  onClick={() => setDoctorParaHorarios(doc)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 transition-colors hover:text-brand-700"
                >
                  <Clock className="size-3.5" strokeWidth={1.75} />
                  Ver horarios
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
          Especialidades
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {especialidades.map((esp) => (
            <li
              key={esp.id}
              className="rounded-lg border border-hairline bg-cream-50 px-3 py-1.5 text-sm text-ink"
            >
              {esp.nombre}
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => setModalEspecialidadAbierto(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-brand-300 px-3 py-1.5 text-sm text-brand-600 transition-colors hover:bg-brand-50"
            >
              <Plus className="size-3.5" strokeWidth={1.75} />
              Añadir
            </button>
          </li>
        </ul>
      </section>

      {modalDoctorAbierto && (
        <NuevoDoctorModal
          especialidades={especialidades}
          onClose={() => setModalDoctorAbierto(false)}
          onCreado={() => {
            setModalDoctorAbierto(false)
            cargarDatos()
          }}
        />
      )}

      {modalEspecialidadAbierto && (
        <NuevaEspecialidadModal
          onClose={() => setModalEspecialidadAbierto(false)}
          onCreada={() => {
            setModalEspecialidadAbierto(false)
            cargarDatos()
          }}
        />
      )}

      {doctorParaAcceso && (
        <CrearAccesoModal
          doctor={doctorParaAcceso}
          onClose={() => setDoctorParaAcceso(null)}
          onCreado={() => {
            setDoctorParaAcceso(null)
            cargarDatos()
          }}
        />
      )}

      {doctorParaHorarios && (
        <HorariosModal
          doctor={doctorParaHorarios}
          onClose={() => setDoctorParaHorarios(null)}
        />
      )}
    </>
  )
}