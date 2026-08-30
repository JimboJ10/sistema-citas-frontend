import { Plus, Stethoscope } from 'lucide-react'

import PageHeader from '../../components/PageHeader.jsx'
// import { useEffect, useState } from 'react'
// import { listarDoctores, listarEspecialidades } from '../../api/admin.js'

/* TODO: reemplazar por datos reales de la API. */
const DOCTORES_DEMO = [
  { id: 1, nombre: 'Dra. Elena Ruiz', especialidad: 'Cardiologia', citasSemana: 18 },
  { id: 2, nombre: 'Dr. Marco Diaz', especialidad: 'Dermatologia', citasSemana: 12 },
  { id: 3, nombre: 'Dra. Sofia Prat', especialidad: 'Medicina general', citasSemana: 25 },
  { id: 4, nombre: 'Dr. Hugo Vera', especialidad: 'Traumatologia', citasSemana: 9 },
]

const ESPECIALIDADES_DEMO = [
  'Cardiologia',
  'Dermatologia',
  'Medicina general',
  'Traumatologia',
  'Pediatria',
  'Nutricion',
]

export default function Admin() {
  // const [doctores, setDoctores] = useState([])
  // const [especialidades, setEspecialidades] = useState([])
  // useEffect(() => {
  //   listarDoctores().then(setDoctores)
  //   listarEspecialidades().then(setEspecialidades)
  // }, [])
  const doctores = DOCTORES_DEMO
  const especialidades = ESPECIALIDADES_DEMO

  return (
    <>
      <PageHeader
        eyebrow="Administracion"
        title="Doctores y especialidades"
        description="Gestiona el equipo medico y el catalogo de especialidades."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-accent-600"
          >
            <Plus className="size-4" strokeWidth={1.75} />
            Nuevo doctor
          </button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctores.map((doc) => (
          <article
            key={doc.id}
            className="rounded-xl border border-hairline bg-cream-50 p-5 shadow-sm"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Stethoscope className="size-5" strokeWidth={1.5} />
            </div>
            <h2 className="mt-4 text-base font-medium text-ink">{doc.nombre}</h2>
            <p className="mt-0.5 text-sm text-muted">{doc.especialidad}</p>
            <p className="mt-4 text-xs text-muted">
              {doc.citasSemana} citas esta semana
            </p>
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
              key={esp}
              className="rounded-lg border border-hairline bg-cream-50 px-3 py-1.5 text-sm text-ink"
            >
              {esp}
            </li>
          ))}
          <li>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-brand-300 px-3 py-1.5 text-sm text-brand-600 transition-colors hover:bg-brand-50"
            >
              <Plus className="size-3.5" strokeWidth={1.75} />
              Anadir
            </button>
          </li>
        </ul>
      </section>
    </>
  )
}
