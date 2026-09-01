import { motion } from 'framer-motion'
import { BadgeCheck, Bot, LayoutGrid, ShieldCheck } from 'lucide-react'

import { EASE_SOFT } from '../../components/Reveal.jsx'

const FEATURES = [
  {
    icon: Bot,
    title: 'Asistente con IA',
    desc: 'Agenda por conversacion, sin formularios largos.',
  },
  {
    icon: BadgeCheck,
    title: 'Doctores verificados',
    desc: 'Especialidades y horarios reales, siempre al dia.',
  },
  {
    icon: LayoutGrid,
    title: 'Todo en un lugar',
    desc: 'Gestiona tus citas sin llamar a nadie.',
  },
  {
    icon: ShieldCheck,
    title: 'Tus datos protegidos',
    desc: 'Autenticacion segura: tu decides quien ve tu informacion.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_SOFT } },
}

/*
  FEATURES - grid 2x2 en mobile, 4 en fila en desktop.
  Aparecen con stagger (una tras otra) al entrar al viewport.
*/
export default function Features() {
  return (
    <section id="caracteristicas" className="scroll-mt-24 bg-cream-200">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE_SOFT }}
          className="mb-12 max-w-lg"
        >
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-500">
            Caracteristicas
          </p>
          <h2 className="mt-3 text-3xl font-medium text-ink">
            Pensada para que gestionar tu salud sea simple.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5"
        >
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <motion.article
              key={title}
              variants={card}
              className="rounded-xl border border-hairline bg-cream-50 p-6"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon className="size-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 text-sm font-medium text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
