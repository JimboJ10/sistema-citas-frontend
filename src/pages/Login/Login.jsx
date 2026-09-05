import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'

import Field from '../../components/Field.jsx'
import AuthAside from '../../components/AuthAside.jsx'
import { login as loginRequest } from '../../api/auth.js'
import { useAuth } from '../../context/AuthContext.jsx'

function validar(form) {
  const errores = {}
  if (!form.username.trim()) errores.username = 'Ingresa tu usuario.'
  if (!form.password) errores.password = 'Ingresa tu contraseña.'
  return errores
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ username: '', password: '' })
  const [errores, setErrores] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function update(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrores((prev) => ({ ...prev, [e.target.name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const erroresValidacion = validar(form)
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion)
      return
    }

    setLoading(true)
    try {
      const data = await loginRequest(form)
      login(data.token, {
        username: data.username,
        rol: data.rol,
        pacienteId: data.pacienteId,
        doctorId: data.doctorId,
      })
      navigate('/citas')
    } catch (err) {
      const mensaje =
        err.response?.data?.error ?? 'No se pudo iniciar sesión. Intenta de nuevo.'
      setError(mensaje)
    } finally {
      setLoading(false)
    }
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
            Iniciar sesión
          </h1>
          <p className="mt-2 text-sm text-muted">
            Ingresa tus credenciales para acceder a tu panel.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-6">
            <Field
              label="Usuario"
              id="username"
              name="username"
              autoComplete="username"
              placeholder="tu.usuario"
              value={form.username}
              onChange={update}
              error={errores.username}
            />
            <Field
              label="Contraseña"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="********"
              value={form.password}
              onChange={update}
              error={errores.password}
            />

            {error && (
              <p className="rounded-lg bg-accent-50 px-4 py-2.5 text-sm text-accent-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-sm transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
              ) : (
                <>
                  Entrar
                  <ArrowRight className="size-4" strokeWidth={1.75} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-sm text-muted">
            ¿No tienes cuenta?{' '}
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