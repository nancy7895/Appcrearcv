// =============================================================================
// BARRA DE NAVEGACIÓN SUPERIOR (Header.jsx)
// =============================================================================
// Este componente está visible siempre en la parte de arriba de la página.
// Cumple 3 funciones principales:
// 1. Mostrar el logotipo de la aplicación (AuraCV).
// 2. Permitir navegar entre las 3 pestañas principales (Editor, Plantillas y Mis Documentos).
// 3. Ofrecer botones rápidos para cambiar entre Modo Oscuro/Claro y crear un nuevo CV.

import React from 'react'
import { Sparkles, Edit3, LayoutTemplate, FolderOpen, Sun, Moon, Plus } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import { useTheme } from '../../context/ThemeContext'

export default function Header() {
  // Extraemos la pestaña activa y la función para crear CVs desde la memoria global
  const { activeTab, setActiveTab, createNewResume } = useResume()
  // Extraemos el tema actual y la función para alternarlo
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="app-header">
      {/* 1. Logotipo: Al hacer clic nos lleva de vuelta a la vista de edición */}
      <button className="brand-container" onClick={() => setActiveTab('editor')}>
        <div className="brand-icon">
          <Sparkles size={22} />
        </div>
        <span className="brand-text">AuraCV</span>
        <span className="brand-badge">PRO</span>
      </button>

      {/* 2. Pestañas de Navegación */}
      <nav className="nav-tabs">
        {/* Pestaña: Editor */}
        <button
          className={`nav-tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
          onClick={() => setActiveTab('editor')}
        >
          <Edit3 size={16} />
          <span>Editor de CV</span>
        </button>

        {/* Pestaña: Galería de Plantillas */}
        <button
          className={`nav-tab-btn ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          <LayoutTemplate size={16} />
          <span>Plantillas</span>
        </button>

        {/* Pestaña: Dashboard / Mis Documentos */}
        <button
          className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <FolderOpen size={16} />
          <span>Mis Documentos</span>
        </button>
      </nav>

      {/* 3. Botones de Acción a la derecha */}
      <div className="header-actions">
        {/* Botón para cambiar entre Modo Oscuro y Modo Claro */}
        <button
          className="btn-icon"
          onClick={toggleTheme}
          title={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Botón para crear un nuevo currículum desde cero */}
        <button
          className="btn btn-primary btn-sm"
          onClick={() => createNewResume()}
        >
          <Plus size={15} />
          <span>Nuevo CV</span>
        </button>
      </div>
    </header>
  )
}

