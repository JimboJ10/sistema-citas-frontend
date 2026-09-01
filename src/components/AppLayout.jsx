import { Outlet } from 'react-router-dom'

import Navbar from './Navbar.jsx'
import ChatWidget from './ChatWidget.jsx'

/*
  Marco comun de las paginas protegidas: navbar + un contenedor con aire.
  El contenido interno se alinea a la izquierda (no todo centrado).
*/
export default function AppLayout() {
  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
        <Outlet />
      </main>
      <ChatWidget />
    </div>
  )
}