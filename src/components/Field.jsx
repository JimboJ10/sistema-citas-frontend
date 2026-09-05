/*
  Campo de formulario etiquetado y reutilizable (login, registro, ...).
  Si le pasas `children` renderiza eso (p. ej. un <select>); si no, un <input>.
  Si le pasas `error`, resalta el borde en rojo/acento y muestra el mensaje debajo.
*/
export default function Field({ label, id, type = 'text', hint, error, children, ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>

      {children ?? (
        <input
          id={id}
          type={type}
          className={`mt-2 block w-full rounded-lg border bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:ring-2 ${
            error
              ? 'border-accent-400 focus:border-accent-400 focus:ring-accent-500/15'
              : 'border-hairline focus:border-brand-400 focus:ring-brand-500/15'
          }`}
          {...inputProps}
        />
      )}

      {error ? (
        <p className="mt-1.5 text-xs text-accent-600">{error}</p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>
      )}
    </div>
  )
}