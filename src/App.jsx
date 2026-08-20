// =============================================================================
// COMPONENTE PRINCIPAL (App.jsx)
// =============================================================================
// En React, la pantalla se construye como piezas de LEGO llamadas "Componentes".
// Cada componente es una función de JavaScript que devuelve el aspecto visual (HTML)
// y su comportamiento interactivo.
//
// Este archivo actúa como el "director de orquesta" de la aplicación:
// 1. Envuelve todo en los "Contextos" (almacenes de datos globales como el tema y los CVs).
// 2. Decide qué pantalla mostrar (el Editor, la Galería de Plantillas o el Dashboard).

import React from 'react'

// Importamos los "Proveedores de Datos" (Context Providers):
// Permiten que cualquier botón o formulario en la aplicación acceda a los datos
// del CV o al modo oscuro sin tener que pasarlos manualmente de pieza en pieza.
import { ThemeProvider } from './context/ThemeContext'
import { ResumeProvider, useResume } from './context/ResumeContext'

// Importamos las piezas visuales (Componentes):
import Header from './components/layout/Header'
import Toast from './components/layout/Toast'
import EditorView from './components/editor/EditorView'
import TemplatesView from './components/templates/TemplatesView'
import DashboardView from './components/dashboard/DashboardView'

// Importamos los estilos visuales (CSS)
import './styles/main.css'
import './styles/editor.css'
import './styles/dashboard.css'
import './styles/templates.css'
import './styles/resume-templates.css'
import './styles/print.css'

// Este componente interno revisa qué pestaña está activa y muestra la vista correspondiente
function AppContent() {
  // 'activeTab' nos dice en qué pantalla está el usuario: 'editor', 'templates' o 'dashboard'
  const { activeTab } = useResume()

  return (
    <div className="app-root">
      {/* Barra superior con el logotipo, selector de pestañas y botones de acción */}
      <Header />

      {/* Área principal: Se muestra UNA SOLA de estas 3 vistas según activeTab */}
      <main className="app-main">
        {/* Renderizado condicional: Si activeTab es 'editor', muestra <EditorView /> */}
        {activeTab === 'editor' && <EditorView />}
        {/* Si activeTab es 'templates', muestra la galería de plantillas */}
        {activeTab === 'templates' && <TemplatesView />}
        {/* Si activeTab es 'dashboard', muestra la lista de currículums guardados */}
        {activeTab === 'dashboard' && <DashboardView />}
      </main>

      {/* Mensajes flotantes de confirmación (ej: "¡Guardado con éxito!") */}
      <Toast />
    </div>
  )
}

// Este es el componente que se exporta hacia 'main.jsx'
export default function App() {
  return (
    // ThemeProvider: Da a toda la app la capacidad de alternar entre Modo Claro y Modo Oscuro
    <ThemeProvider>
      {/* ResumeProvider: Mantiene en memoria el contenido de tu CV (nombre, experiencia, etc.) */}
      <ResumeProvider>
        <AppContent />
      </ResumeProvider>
    </ThemeProvider>
  )
}

