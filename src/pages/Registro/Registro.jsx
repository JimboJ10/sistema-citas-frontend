import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'

import Field from '../../components/Field.jsx'
import AuthAside from '../../components/AuthAside.jsx'
import { register as registerRequest } from '../../api/auth.js'

function validar(form) {
  const errores = {}
  if (!form.nombres.trim()) errores.nombres = 'Ingresa tus nombres.'
  if (!form.apellidos.trim()) errores.apellidos = 'Ingresa tus apellidos.'
  if (!form.telefono.trim()) errores.telefono = 'Ingresa tu teléfono.'
  if (!form.username.trim()) {
    errores.username = 'Elige un usuario.'
  } else if (form.username.trim().length < 4) {
    errores.username = 'El usuario debe tener al menos 4 caracteres.'
  }
  if (!form.password) {
    errores.password = 'Elige una contraseña.'
  } else if (form.password.length < 8) {
    errores.password = 'La contraseña debe tener al menos 8 caracteres.'
  }
  return errores
}

export default function Registro() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    password: '',
    nombres: '',
    apellidos: '',
    telefono: '',
  })
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
      await registerRequest(form)
      navigate('/login')
    } catch (err) {
      const mensaje =
        err.response?.data?.error ??
        'No se pudo crear la cuenta. Intenta de nuevo.'
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
            Crear cuenta
          </h1>
          <p className="mt-2 text-sm text-muted">
            Completa tus datos para empezar a usar VitalCare.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Nombres"
                id="nombres"
                name="nombres"
                autoComplete="given-name"
                placeholder="María"
                value={form.nombres}
                onChange={update}
                error={errores.nombres}
              />
              <Field
                label="Apellidos"
                id="apellidos"
                name="apellidos"
                autoComplete="family-name"
                placeholder="Torres"
                value={form.apellidos}
                onChange={update}
                error={errores.apellidos}
              />
            </div>
            <Field
              label="Teléfono"
              id="telefono"
              name="telefono"
              type="tel"
              autoComplete="tel"
              placeholder="0991234567"
              value={form.telefono}
              onChange={update}
              error={errores.telefono}
            />
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
              autoComplete="new-password"
              placeholder="Mínimo 8 caracteres"
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
                  Crear cuenta
                  <ArrowRight className="size-4" strokeWidth={1.75} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-sm text-muted">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="font-medium text-accent-600 transition-colors hover:text-accent-500"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}