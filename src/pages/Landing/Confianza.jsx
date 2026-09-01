import Reveal from '../../components/Reveal.jsx'

/*
  CONFIANZA - franja teal con datos del propio sistema en numeros grandes.
  Sin testimonios inventados.
*/
const METRICAS = [
  { valor: '24/7', label: 'Disponibilidad del asistente' },
  { valor: '< 5s', label: 'Tiempo de respuesta promedio' },
  { valor: '100%', label: 'De tus datos cifrados' },
  { valor: '0', label: 'Llamadas telefonicas para agendar' },
]

export default function Confianza() {
  return (
    <section id="confianza" className="scroll-mt-24 bg-brand-500 text-cream-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-cream-100/70">
            Confianza
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {METRICAS.map((m) => (
              <div key={m.label}>
                <p className="font-heading text-4xl font-medium lg:text-5xl">
                  {m.valor}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/75">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
