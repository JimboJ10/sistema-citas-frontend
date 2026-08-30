import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import Field from '../../components/Field.jsx'
import AuthAside from '../../components/AuthAside.jsx'
// import { register as registerRequest } from '../../api/auth.js'

const ROLES = [
  { value: 'PACIENTE', label: 'Paciente' },
  { value: 'DOCTOR', label: 'Doctor' },
  { value: 'ADMIN', label: 'Administrador' },
]

export default function Registro() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    password: '',
    rol: 'PACIENTE',
  })

  function update(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    // TODO: conectar con la API
    //   await registerRequest(form)   // { username, password, rol }
    //   navigate('/login')
    console.log('registro submit (placeholder):', form)
    navigate('/login')
  }

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-[7fr_5fr]">
      <AuthAside />

      <section className="flex min-h-screen flex-col justify-center bg-cream-100 px-6 py-16 sm:px-12 lg:px-16">
        <div className="w-full max-w-sm">
          <span className="font-heading text-base font-medium text-brand-700 lg:hidden">
            VitalCare
          </span>

          <h1 className="mt-3 text-2xl font-medium text-ink lg:mt-0">
            Crear cuenta
          </h1>
          <p className="mt-2 text-sm text-muted">
            Completa tus datos para empezar a usar VitalCare.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <Field
              label="Usuario"
              id="username"
              name="username"
              autoComplete="username"
              placeholder="tu.usuario"
              value={form.username}
              onChange={update}
            />
            <Field
              label="Contrasena"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Minimo 8 caracteres"
              value={form.password}
              onChange={update}
            />
            <Field label="Rol" id="rol">
              <select
                id="rol"
                name="rol"
                value={form.rol}
                onChange={update}
                className="mt-2 block w-full rounded-lg border border-hairline bg-cream-50 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-500/15"
              >
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </Field>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-brand-600"
            >
              Crear cuenta
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </button>
          </form>

          <p className="mt-8 text-sm text-muted">
            Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="font-medium text-accent-600 transition-colors hover:text-accent-500"
            >
              Inicia sesion
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
