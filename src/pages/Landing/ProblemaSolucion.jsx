import {
  CalendarCheck,
  CalendarX,
  Clock,
  MessagesSquare,
  PhoneOff,
  Zap,
} from 'lucide-react'

import Reveal from '../../components/Reveal.jsx'

const ANTES = [
  { icon: PhoneOff, text: 'Llamar y esperar en linea para agendar o cambiar una cita.' },
  { icon: Clock, text: 'Tiempos de espera largos y llamadas que se cortan.' },
  { icon: CalendarX, text: 'Solo gestionas en horario de atencion telefonica.' },
]

const CON = [
  { icon: MessagesSquare, text: 'Chat disponible 24/7, cualquier dia del ano.' },
  { icon: Zap, text: 'Respuesta inmediata: el asistente entiende lo que pides.' },
  { icon: CalendarCheck, text: 'Agenda, reprograma o cancela en un par de minutos.' },
]

/*
  PROBLEMA / SOLUCION - fondo crema, dos bloques asimetricos:
  "Antes" discreto, "Con VitalCare" destacado en teal.
*/
export default function ProblemaSolucion() {
  return (
    <section id="por-que" className="scroll-mt-24 bg-cream-100">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
        <Reveal className="max-w-lg">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-500">
            Por que VitalCare
          </p>
          <h2 className="mt-3 text-3xl font-medium text-ink">
            Pedir una cita no deberia costar una llamada.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:gap-8">
          <Reveal delay={0.05}>
            <div className="h-full rounded-xl border border-hairline bg-cream-50 p-7">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted">
                Antes
              </h3>
              <ul className="mt-6 space-y-4">
                {ANTES.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex gap-3 text-sm text-muted">
                    <Icon className="size-5 shrink-0" strokeWidth={1.5} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="h-full rounded-xl border border-brand-200 bg-brand-50 p-7">
              <h3 className="text-sm font-medium uppercase tracking-wider text-brand-600">
                Con VitalCare
              </h3>
              <ul className="mt-6 space-y-4">
                {CON.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex gap-3 text-sm text-ink">
                    <Icon
                      className="size-5 shrink-0 text-brand-500"
                      strokeWidth={1.5}
                    />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
