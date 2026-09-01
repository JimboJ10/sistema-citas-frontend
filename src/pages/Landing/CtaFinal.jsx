import { Link } from 'react-router-dom'
import { MessageSquareText } from 'lucide-react'

import GeometricPattern from '../../components/GeometricPattern.jsx'
import Reveal from '../../components/Reveal.jsx'

/*
  CTA FINAL - retoma el layout de dos columnas de AuthAside:
  panel teal con patron a la izquierda, columna de accion a la derecha
  con el contenido alineado a la izquierda.
*/
export default function CtaFinal() {
  return (
    <section className="bg-cream-100">
      <Reveal className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid overflow-hidden rounded-2xl border border-hairline lg:grid-cols-[7fr_5fr]">
          <div className="relative overflow-hidden bg-brand-700 px-10 py-14 text-cream-100 lg:px-12">
            <GeometricPattern className="text-cream-100/[0.06]" />
            <div className="relative">
              <span className="font-heading text-lg font-medium tracking-tight">
                VitalCare
              </span>
              <p className="mt-8 max-w-sm font-heading text-2xl font-medium leading-snug text-cream-50 lg:text-3xl">
                Tu proxima cita esta a una conversacion de distancia.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-cream-50 px-10 py-14 lg:px-12">
            <h2 className="text-xl font-medium text-ink">
              No tienes cuenta? No hace falta para empezar.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Habla con el asistente y crea tu cuenta solo cuando confirmes
              una cita.
            </p>
            <Link
              to="/chat"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-accent-500 px-5 py-3 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-accent-600"
            >
              <MessageSquareText className="size-4" strokeWidth={1.75} />
              Hablar con el asistente
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
