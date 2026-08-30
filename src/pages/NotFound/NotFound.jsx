import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-cream-100 px-6 sm:px-16">
      <div className="max-w-md">
        <p className="font-heading text-5xl font-medium text-brand-500">404</p>
        <h1 className="mt-4 text-xl font-medium text-ink">
          No encontramos esta pagina
        </h1>
        <p className="mt-2 text-sm text-muted">
          Puede que el enlace este roto o que la pagina se haya movido.
        </p>
        <Link
          to="/login"
          className="mt-8 inline-flex rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-brand-600"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
