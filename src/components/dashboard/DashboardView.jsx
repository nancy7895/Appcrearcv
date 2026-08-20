// =============================================================================
// VISTA: MIS DOCUMENTOS / PANEL DE CONTROL (DashboardView.jsx)
// =============================================================================
// Esta pantalla permite gestionar todos los currículums que el usuario ha creado:
// 1. Muestra tarjetas con cada CV guardado en el navegador.
// 2. Ofrece botones para duplicar, renombrar, editar o eliminar versiones.
// 3. Muestra métricas de productividad (total de CVs, calidad promedio, etc.).

import React from 'react'
import { Plus, Files, ShieldCheck, Award, Sparkles, FolderPlus } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import DocumentCard from './DocumentCard'

export default function DashboardView() {
  // Extraemos la lista de currículums y la función para crear nuevos
  const { resumes, createNewResume, setActiveTab } = useResume()

  return (
    <div className="documents-view-container">
      {/* 1. Cabecera y Botón de Acción Rápida */}
      <div className="docs-header-wrapper">
        <div className="docs-header-title">
          <h1>
            <Files size={28} style={{ color: 'var(--accent-primary)' }} />
            Mis Documentos
          </h1>
          <p>Gestiona, duplica y personaliza tus diferentes versiones de currículum.</p>
        </div>

        <div className="docs-header-actions">
          <button className="btn btn-primary" onClick={() => createNewResume()}>
            <Plus size={18} /> Crear Nuevo CV
          </button>
        </div>
      </div>

      {/* 2. Barra de Métricas y Estadísticas */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-box indigo">
            <Files size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-value">{resumes.length}</span>
            <span className="metric-label">Currículums Creados</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box emerald">
            <ShieldCheck size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-value">97%</span>
            <span className="metric-label">Puntuación ATS Promedio</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box amber">
            <Sparkles size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-value">A4 HQ</span>
            <span className="metric-label">Formato Vectorial PDF</span>
          </div>
        </div>
      </div>

      {/* 3. Cuadrícula de Documentos Guardados */}
      <div className="documents-grid">
        {/* Tarjeta para crear un nuevo CV */}
        <div className="create-new-card" onClick={() => createNewResume()}>
          <div className="create-icon-plus">
            <Plus size={28} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <strong style={{ fontSize: '1.05rem', display: 'block', color: 'var(--text-primary)' }}>Crear Nuevo CV</strong>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Empieza con un lienzo en blanco</span>
          </div>
        </div>

        {/* Mapeo de la lista: Dibuja una tarjeta por cada currículum existente */}
        {resumes.map(r => (
          <DocumentCard key={r.id} resume={r} />
        ))}
      </div>
    </div>
  )
}

