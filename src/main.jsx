// =============================================================================
// PUNTO DE ENTRADA PRINCIPAL (main.jsx)
// =============================================================================
// ¿Qué es este archivo?
// Imagina que tu página web es un lienzo en blanco (el archivo index.html) y tiene
// una caja vacía llamada <div id="root"></div>.
// Este archivo es el "puente" que toma toda nuestra aplicación interactiva (App.jsx)
// y la inyecta dentro de esa caja en el navegador para que cobre vida.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Buscamos el elemento con id="root" en el HTML y "montamos" (dibujamos) la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> es el componente principal que contiene toda la lógica y vistas */}
    <App />
  </React.StrictMode>
)

