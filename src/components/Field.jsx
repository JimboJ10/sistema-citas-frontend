/*
  Campo de formulario etiquetado y reutilizable (login, registro, ...).
  Si le pasas `children` renderiza eso (p. ej. un <select>); si no, un <input>.
*/
export default function Field({ label, id, type = 'text', hint, children, ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>

      {children ?? (
        <input
          id={id}
          type={type}
          className="mt-2 block w-full rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
          {...inputProps}
        />
      )}

      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  )
}
