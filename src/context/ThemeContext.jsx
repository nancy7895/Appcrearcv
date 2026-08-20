// =============================================================================
// CONTROL DEL TEMA (MODO OSCURO / CLARO) (ThemeContext.jsx)
// =============================================================================
// Este archivo maneja si la aplicación se muestra con fondo oscuro o claro.
// Al igual que ResumeContext, utiliza `createContext` y `useState` para que
// cualquier botón en la barra superior pueda cambiar el tema y se aplique a toda la web.

import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // 'theme': Almacena 'dark' o 'light'. Si ya se guardó antes en localStorage, lo recupera.
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('auracv_theme')
    return saved || 'dark' // Por defecto inicia en Modo Oscuro ('dark')
  })

  // Cada vez que cambia el tema, aplicamos un atributo en la etiqueta raíz del HTML
  // <html data-theme="dark"> para que el archivo CSS aplique los colores correspondientes.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('auracv_theme', theme)
  }, [theme])

  // Función para alternar entre claro y oscuro
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook de acceso directo: Permite usar `const { theme, toggleTheme } = useTheme()`
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider')
  }
  return context
}

