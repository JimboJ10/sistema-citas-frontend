import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import Field from '../../components/Field.jsx'
import AuthAside from '../../components/AuthAside.jsx'
// import { login as loginRequest } from '../../api/auth.js'
// import { useAuth } from '../../context/AuthContext.jsx'

export default function Login() {
  const navigate = useNavigate()
  // const { login } = useAuth()

  const [form, setForm] = useState({ username: '', password: '' })

  function update(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    // TODO: conectar con la API
    //   const data = await loginRequest(form)          // { token, username, rol }
    //   login(data.token, { username: data.username, rol: data.rol })
    //   navigate('/citas')
    console.log('login submit (placeholder):', form)
    navigate('/citas')
  }

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-[7fr_5fr]">
      <AuthAside />

      {/* Columna del formulario: contenido alineado a la izquierda dentro de la columna */}
      <section className="flex min-h-screen flex-col justify-center bg-cream-100 px-6 py-16 sm:px-12 lg:px-16">
        <div className="w-full max-w-sm">
          <span className="font-heading text-base font-medium text-brand-700 lg:hidden">
            VitalCare
          </span>

          <h1 className="mt-3 text-2xl font-medium text-ink lg:mt-0">
            Iniciar sesion
          </h1>
          <p className="mt-2 text-sm text-muted">
            Ingresa tus credenciales para acceder a tu panel.
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
              autoComplete="current-password"
              placeholder="********"
              value={form.password}
              onChange={update}
            />

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-brand-600"
            >
              Entrar
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </button>
          </form>

          <p className="mt-8 text-sm text-muted">
            No tienes cuenta?{' '}
            <Link
              to="/registro"
              className="font-medium text-accent-600 transition-colors hover:text-accent-500"
            >
              Crear una
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
