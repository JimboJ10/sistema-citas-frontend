import { motion } from 'framer-motion'

// Easing suave (ease-out tipo "expo"), sin bounce.
export const EASE_SOFT = [0.22, 1, 0.36, 1]

/*
  Envuelve un bloque para que aparezca con fade-in + un ligero translate-y
  cuando entra al viewport. `once: true` => no se repite al volver a subir.
*/
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.55,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, ease: EASE_SOFT, delay }}
    >
      {children}
    </motion.div>
  )
}
