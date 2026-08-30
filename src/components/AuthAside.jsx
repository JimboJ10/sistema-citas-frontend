/*
  Panel visual de la izquierda para /login y /registro.
  Placeholder: color solido teal oscuro + patron geometrico sutil (sin stock photo).
  Ocupa ~58% del ancho en desktop; oculto en movil.
*/
export default function AuthAside() {
  return (
    <aside className="relative hidden flex-col justify-between overflow-hidden bg-brand-700 px-14 py-16 text-cream-100 lg:flex">
      {/* Patron geometrico sutil */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full text-cream-100/[0.06]"
      >
        <defs>
          <pattern
            id="auth-grid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            <path
              d="M28 14v28M14 28h28"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#auth-grid)" />
      </svg>

      <div className="relative">
        <span className="font-heading text-lg font-medium tracking-tight">
          VitalCare
        </span>
      </div>

      <div className="relative max-w-md">
        <h2 className="font-heading text-4xl font-medium leading-[1.15] text-cream-50">
          Tu salud, coordinada en un solo lugar.
        </h2>
        <p className="mt-5 leading-relaxed text-cream-100/75">
          Agenda citas, habla con tu asistente y consulta tu historial sin
          filas ni llamadas.
        </p>
      </div>

      <div className="relative flex items-center gap-3 text-sm text-cream-100/55">
        <span className="h-px w-8 bg-cream-100/25" />
        Plataforma de gestion de citas medicas
      </div>
    </aside>
  )
}
