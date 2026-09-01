import { Routes, Route } from 'react-router-dom'

import AppLayout from './components/AppLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Landing from './pages/Landing/Landing.jsx'
import Login from './pages/Login/Login.jsx'
import Registro from './pages/Registro/Registro.jsx'
import Citas from './pages/Citas/Citas.jsx'
import Chat from './pages/Chat/Chat.jsx'
import Agenda from './pages/Agenda/Agenda.jsx'
import Admin from './pages/Admin/Admin.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      {/* Publicas */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Protegidas: comparten Navbar + contenedor via AppLayout */}
      <Route element={<AppLayout />}>
        <Route
          path="/citas"
          element={
            <ProtectedRoute allowedRoles={['PACIENTE']}>
              <Citas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agenda"
          element={
            <ProtectedRoute allowedRoles={['DOCTOR']}>
              <Agenda />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
