/*
  Encabezado de pagina consistente: pequeno "eyebrow", titulo y descripcion.
  Alineado a la izquierda; el `action` opcional va a la derecha en pantallas anchas.
*/
export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        {eyebrow && (
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-500">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-2xl font-medium text-ink lg:text-3xl">{title}</h1>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
