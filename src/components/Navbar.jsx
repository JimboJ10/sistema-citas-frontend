import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

import { useAuth } from '../context/AuthContext.jsx'

/*
  Navbar minimalista. Los links cambian segun el rol del usuario logueado.
  Si no hay sesion, muestra solo el logo (link a inicio) y "Iniciar sesion",
  para que /chat y /doctores (publicas, dentro de AppLayout) siempre tengan
  una forma de volver al inicio.
*/
const LINKS_BY_ROLE = {
  PACIENTE: [
    { to: '/citas', label: 'Mis citas' },
    { to: '/chat', label: 'Asistente' },
    { to: '/doctores', label: 'Doctores' },
    { to: '/perfil', label: 'Mi perfil' },
  ],
  DOCTOR: [
    { to: '/agenda', label: 'Agenda' },
    { to: '/chat', label: 'Asistente' },
  ],
  ADMIN: [{ to: '/admin', label: 'Administración' }],
}

function linkClass({ isActive }) {
  return [
    'rounded-md px-3 py-1.5 text-sm transition-colors',
    isActive
      ? 'bg-brand-50 text-brand-700'
      : 'text-muted hover:text-ink hover:bg-cream-200',
  ].join(' ')
}

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const links = isAuthenticated ? LINKS_BY_ROLE[user?.rol] ?? [] : []

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <header className="sticky top-0 z-10 border-b border-hairline bg-cream-100/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-10 px-6 py-4 lg:px-10">
        <Link
          to="/"
          className="font-heading text-lg font-medium tracking-tight text-brand-700"
        >
          VitalCare
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          {isAuthenticated ? (
            <>
              {user?.username && (
                <span className="hidden text-sm text-muted sm:inline">
                  {user.username}
                  <span className="mx-1.5 text-hairline">/</span>
                  <span className="capitalize">{user.rol?.toLowerCase()}</span>
                </span>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors hover:text-accent-600"
              >
                <LogOut className="size-4" strokeWidth={1.5} />
                Salir
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-brand-600"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}