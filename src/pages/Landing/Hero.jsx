import { Link } from 'react-router-dom'
import { ArrowRight, MessageSquareText } from 'lucide-react'

import GeometricPattern from '../../components/GeometricPattern.jsx'

/*
  HERO - visible al cargar, sin animacion de scroll.
  Mismo lenguaje visual que AuthAside (teal oscuro + patron geometrico).
  Composicion a dos columnas, contenido alineado a la izquierda.
*/
export default function Hero() {
  return (
    <section
      id="landing-hero"
      className="relative overflow-hidden bg-brand-700 text-cream-100"
    >
      <GeometricPattern className="text-cream-100/[0.06]" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:px-10 lg:py-28">
        <div className="max-w-xl">
          <h1 className="font-heading text-4xl font-medium leading-[1.12] text-cream-50 sm:text-5xl">
            Tu salud, coordinada en un solo lugar.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-cream-100/75">
            Agenda, mueve y consulta tus citas medicas hablando con un
            asistente. Sin filas, sin llamadas, sin horarios de oficina.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/chat"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-5 py-3 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-accent-600"
            >
              <MessageSquareText className="size-4" strokeWidth={1.75} />
              Hablar con el asistente
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-cream-100/30 px-5 py-3 text-sm font-medium text-cream-50 transition-colors hover:bg-cream-100/10"
            >
              Iniciar sesion
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        {/* Preview de chat: aporta asimetria y evita el "hero centrado" */}
        <div className="relative lg:justify-self-end">
          <div className="w-full max-w-sm rounded-xl border border-cream-100/15 bg-brand-800/60 p-5 backdrop-blur">
            <p className="mb-4 text-xs uppercase tracking-wider text-cream-100/45">
              Asistente VitalCare
            </p>
            <div className="space-y-3 text-sm">
              <div className="ml-auto max-w-[78%] rounded-xl rounded-br-sm bg-brand-500 px-3.5 py-2 text-cream-50">
                Quiero una cita con cardiologia esta semana
              </div>
              <div className="max-w-[85%] rounded-xl rounded-bl-sm bg-cream-100/10 px-3.5 py-2 text-cream-100/85">
                Tengo el jueves a las 09:30 con la Dra. Ruiz. La confirmo?
              </div>
              <div className="ml-auto max-w-[45%] rounded-xl rounded-br-sm bg-brand-500 px-3.5 py-2 text-cream-50">
                Si, gracias
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
