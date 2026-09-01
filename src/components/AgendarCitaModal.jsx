import { useEffect, useState } from 'react'
import { X, Loader2, ArrowLeft } from 'lucide-react'

import {
  listarEspecialidades,
  listarDoctoresPorEspecialidad,
  listarHorariosDeDoctor,
} from '../api/catalogo.js'
import { crearCita } from '../api/citas.js'

const DIAS_ORDEN = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']

function normalizarDia(dia) {
  return dia
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function AgendarCitaModal({ pacienteId, onClose, onCreada }) {
  const [paso, setPaso] = useState('especialidad') // especialidad | doctor | horario | notas
  const [especialidades, setEspecialidades] = useState([])
  const [doctores, setDoctores] = useState([])
  const [horarios, setHorarios] = useState([])

  const [especialidadElegida, setEspecialidadElegida] = useState(null)
  const [doctorElegido, setDoctorElegido] = useState(null)
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [notas, setNotas] = useState('')

  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    listarEspecialidades()
      .then(setEspecialidades)
      .catch(() => setError('No se pudieron cargar las especialidades.'))
      .finally(() => setLoading(false))
  }, [])

  function elegirEspecialidad(especialidad) {
    setEspecialidadElegida(especialidad)
    setLoading(true)
    setError(null)
    listarDoctoresPorEspecialidad(especialidad.id)
      .then((data) => {
        setDoctores(data)
        setPaso('doctor')
      })
      .catch(() => setError('No se pudieron cargar los doctores.'))
      .finally(() => setLoading(false))
  }

  function elegirDoctor(doctor) {
    setDoctorElegido(doctor)
    setLoading(true)
    setError(null)
    listarHorariosDeDoctor(doctor.id)
      .then((data) => {
        setHorarios(data)
        setPaso('horario')
      })
      .catch(() => setError('No se pudieron cargar los horarios.'))
      .finally(() => setLoading(false))
  }

  async function confirmar() {
    if (!fecha || !hora) {
      setError('Elige una fecha y hora.')
      return
    }

    setEnviando(true)
    setError(null)

    try {
      const fechaHora = `${fecha}T${hora}:00`
      const cita = await crearCita({
        pacienteId,
        doctorId: doctorElegido.id,
        fechaHora,
        notas: notas.trim() || null,
      })
      onCreada(cita)
    } catch (err) {
      const mensaje =
        err.response?.data?.error ?? 'No se pudo agendar la cita. Intenta de nuevo.'
      setError(mensaje)
    } finally {
      setEnviando(false)
    }
  }

  // Dias en los que el doctor atiende, segun sus horarios (para restringir el <input type="date">)
  const diasPermitidos = horarios
    .filter((h) => h.activo)
    .map((h) => normalizarDia(h.diaSemana))

  function fechaValida(valor) {
    if (!valor) return false
    const dia = new Date(`${valor}T00:00:00`).getDay() // 0=domingo
    const nombreDia = DIAS_ORDEN[(dia + 6) % 7] // reordena para que 0=lunes
    return diasPermitidos.includes(nombreDia)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-md rounded-xl border border-hairline bg-cream-50 shadow-lg">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <div className="flex items-center gap-2">
            {paso !== 'especialidad' && (
              <button
                onClick={() => {
                  if (paso === 'doctor') setPaso('especialidad')
                  if (paso === 'horario') setPaso('doctor')
                }}
                className="text-muted transition-colors hover:text-ink"
                aria-label="Volver"
              >
                <ArrowLeft className="size-4" strokeWidth={1.75} />
              </button>
            )}
            <h2 className="text-base font-medium text-ink">Agendar cita</h2>
          </div>
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
            <div className="flex items-center gap-2 py-8 text-sm text-muted">
              <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
              Cargando...
            </div>
          )}

          {error && (
            <p className="mb-4 rounded-lg bg-accent-50 px-4 py-2.5 text-sm text-accent-700">
              {error}
            </p>
          )}

          {!loading && paso === 'especialidad' && (
            <ul className="space-y-2">
              {especialidades.map((esp) => (
                <li key={esp.id}>
                  <button
                    onClick={() => elegirEspecialidad(esp)}
                    className="w-full rounded-lg border border-hairline px-4 py-3 text-left transition-colors hover:border-brand-400 hover:bg-brand-50"
                  >
                    <p className="text-sm font-medium text-ink">{esp.nombre}</p>
                    {esp.descripcion && (
                      <p className="mt-0.5 text-xs text-muted">{esp.descripcion}</p>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {!loading && paso === 'doctor' && (
            <ul className="space-y-2">
              {doctores.length === 0 && (
                <p className="text-sm text-muted">
                  No hay doctores disponibles en {especialidadElegida?.nombre}.
                </p>
              )}
              {doctores.map((doc) => (
                <li key={doc.id}>
                  <button
                    onClick={() => elegirDoctor(doc)}
                    className="w-full rounded-lg border border-hairline px-4 py-3 text-left transition-colors hover:border-brand-400 hover:bg-brand-50"
                  >
                    <p className="text-sm font-medium text-ink">
                      {doc.nombres} {doc.apellidos}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {!loading && paso === 'horario' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-ink" htmlFor="fecha">
                  Fecha
                </label>
                <input
                  id="fecha"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
                />
                {fecha && !fechaValida(fecha) && (
                  <p className="mt-1.5 text-xs text-accent-600">
                    El doctor no atiende ese día. Revisa sus horarios abajo.
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-ink" htmlFor="hora">
                  Hora
                </label>
                <input
                  id="hora"
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-ink" htmlFor="notas">
                  Notas (opcional)
                </label>
                <textarea
                  id="notas"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  rows={2}
                  className="mt-2 block w-full resize-none rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
                />
              </div>

              <div className="rounded-lg bg-cream-200 px-3.5 py-2.5 text-xs text-muted">
                <p className="font-medium text-ink">Horarios de {doctorElegido?.nombres}:</p>
                <ul className="mt-1 space-y-0.5">
                  {horarios.filter((h) => h.activo).map((h) => (
                    <li key={h.id} className="capitalize">
                      {h.diaSemana}: {h.horaInicio.slice(0, 5)} - {h.horaFin.slice(0, 5)}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={confirmar}
                disabled={enviando || !fecha || !hora}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {enviando ? (
                  <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
                ) : (
                  'Confirmar cita'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}