import { createContext, useContext, useState } from 'react'

const ChatWidgetContext = createContext(null)

export function ChatWidgetProvider({ children }) {
  const [abierto, setAbierto] = useState(false)

  const value = {
    abierto,
    abrir: () => setAbierto(true),
    cerrar: () => setAbierto(false),
    alternar: () => setAbierto((prev) => !prev),
  }

  return (
    <ChatWidgetContext.Provider value={value}>
      {children}
    </ChatWidgetContext.Provider>
  )
}

export function useChatWidget() {
  const ctx = useContext(ChatWidgetContext)
  if (!ctx) {
    throw new Error('useChatWidget() debe usarse dentro de <ChatWidgetProvider>')
  }
  return ctx
}