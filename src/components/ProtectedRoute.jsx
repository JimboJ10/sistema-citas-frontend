import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'

/*
  Envuelve una ruta que requiere sesion.

  - Sin token -> redirige a /login (guardando de donde venia en location.state).
  - Con `allowedRoles` -> si el rol del usuario no esta permitido, lo saca a una
    ruta segura segun su propio rol.

  Uso:
    <ProtectedRoute><Chat /></ProtectedRoute>
    <ProtectedRoute allowedRoles={['ADMIN']}><Admin /></ProtectedRoute>
*/

const HOME_BY_ROLE = {
  PACIENTE: '/citas',
  DOCTOR: '/agenda',
  ADMIN: '/admin',
}

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(user?.rol)) {
    return <Navigate to={HOME_BY_ROLE[user?.rol] ?? '/login'} replace />
  }

  return children
}
