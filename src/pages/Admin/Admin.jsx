import { useEffect, useState } from 'react'
import { Plus, Stethoscope, Loader2, KeyRound, Clock, CalendarClock } from 'lucide-react'

import CrearAccesoModal from '../../components/CrearAccesoModal.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import NuevoDoctorModal from '../../components/NuevoDoctorModal.jsx'
import EspecialidadModal from '../../components/EspecialidadModal.jsx'
import HorariosModal from '../../components/HorariosModal.jsx'
import { listarDoctores, listarEspecialidades } from '../../api/catalogo.js'
import { listarTodasLasCitas } from '../../api/citas.js'

const TABS = [
  { id: 'doctores', label: 'Doctores' },
  { id: 'citas', label: 'Citas' },
]

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
  return fecha.toLocaleString('es', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function Admin() {
  const [tab, setTab] = useState('doctores')

  const [doctores, setDoctores] = useState([])
  const [especialidades, setEspecialidades] = useState([])
  const [citas, setCitas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [modalDoctorAbierto, setModalDoctorAbierto] = useState(false)
  const [modalEspecialidadAbierto, setModalEspecialidadAbierto] = useState(false)
  const [doctorParaAcceso, setDoctorParaAcceso] = useState(null)
  const [doctorParaHorarios, setDoctorParaHorarios] = useState(null)
  const [especialidadEditando, setEspecialidadEditando] = useState(null)

  function cargarDatos() {
    setLoading(true)
    Promise.all([listarDoctores(), listarEspecialidades(), listarTodasLasCitas()])
      .then(([doc, esp, cit]) => {
        setDoctores(doc)
        setEspecialidades(esp)
        setCitas(cit)
      })
      .catch(() => setError('No se pudieron cargar los datos.'))
      .finally(() => setLoading(false))
  }

  useEffect(cargarDatos, [])

  return (
    <>
      <PageHeader
        eyebrow="Administración"
        title="Panel de administración"
        description="Gestiona el equipo médico, especialidades y supervisa las citas."
        action={
          tab === 'doctores' && (
            <button
              type="button"
              onClick={() => setModalDoctorAbierto(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-accent-600"
            >
              <Plus className="size-4" strokeWidth={1.75} />
              Nuevo doctor
            </button>
          )
        }
      />

      <div className="mb-8 flex gap-1 border-b border-hairline">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === t.id
                ? 'border-brand-500 text-brand-700'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

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

      {!loading && tab === 'doctores' && (
        <>
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

          <section className="mt-12">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
              Especialidades
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {especialidades.map((esp) => (
              <li
                key={esp.id}
                onClick={() => setEspecialidadEditando(esp)}
                className="cursor-pointer rounded-lg border border-hairline bg-cream-50 px-3 py-1.5 text-sm text-ink transition-colors hover:border-brand-300"
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
        </>
      )}

      {!loading && tab === 'citas' && (
        <>
          {citas.length === 0 ? (
            <p className="text-sm text-muted">No hay citas registradas todavía.</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-hairline bg-cream-50 shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-hairline text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-5 py-3 font-medium">Fecha</th>
                    <th className="px-5 py-3 font-medium">Paciente</th>
                    <th className="px-5 py-3 font-medium">Doctor</th>
                    <th className="px-5 py-3 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {citas.map((cita) => (
                    <tr key={cita.id} className="transition-colors hover:bg-cream-100">
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-ink">
                        {formatFechaHora(cita.fechaHora)}
                      </td>
                      <td className="px-5 py-4 text-ink">{cita.pacienteNombreCompleto}</td>
                      <td className="px-5 py-4 text-muted">{cita.doctorNombreCompleto}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-md px-2 py-1 text-xs font-medium ${
                            ESTADO_STYLES[cita.estado] ?? 'bg-cream-300 text-muted'
                          }`}
                        >
                          {ESTADO_LABELS[cita.estado] ?? cita.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

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
        <EspecialidadModal
          onClose={() => setModalEspecialidadAbierto(false)}
          onGuardada={() => {
            setModalEspecialidadAbierto(false)
            cargarDatos()
          }}
        />
      )}

      {especialidadEditando && (
        <EspecialidadModal
          especialidad={especialidadEditando}
          onClose={() => setEspecialidadEditando(null)}
          onGuardada={() => {
            setEspecialidadEditando(null)
            cargarDatos()
          }}
          onEliminada={() => {
            setEspecialidadEditando(null)
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