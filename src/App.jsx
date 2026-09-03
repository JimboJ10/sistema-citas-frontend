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
import Perfil from './pages/Perfil/Perfil.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      {/* Publicas */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Comparten Navbar + contenedor via AppLayout, pero no todas requieren login */}
      <Route element={<AppLayout />}>
        {/* Publica: el chatbot puede usarse sin cuenta (paciente invitado) */}
        <Route path="/chat" element={<Chat />} />

        {/* Protegidas por rol */}
        <Route
          path="/citas"
          element={
            <ProtectedRoute allowedRoles={['PACIENTE']}>
              <Citas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute allowedRoles={['PACIENTE']}>
              <Perfil />
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