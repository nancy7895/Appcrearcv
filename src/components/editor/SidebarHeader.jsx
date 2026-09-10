import React from 'react'
import { Save, RotateCcw, Sparkles, Copy, Trash2, Check, PlusCircle } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'

export default function SidebarHeader() {
  const { 
    activeResume, 
    updateActiveResume, 
    saveCurrentResume, 
    discardChanges, 
    hasUnsavedChanges, 
    isCreatingNew,
    isSaving,
    duplicateResume, 
    deleteResume, 
    loadSample 
  } = useResume()

  const handleTitleChange = (e) => {
    updateActiveResume({ title: e.target.value })
  }

  return (
    <div className="sidebar-header">
      <div className="cv-meta-title">
        <input
          type="text"
          className="cv-name-input"
          value={activeResume.title || 'Mi Currículum'}
          onChange={handleTitleChange}
          placeholder="Nombre del documento..."
        />
        <div className={`cv-status-badge ${isCreatingNew ? 'warning' : (hasUnsavedChanges ? 'warning' : 'success')}`}>
          <span className={`cv-status-dot ${isCreatingNew ? 'warning' : (hasUnsavedChanges ? 'warning' : 'success')}`} />
          {isCreatingNew 
            ? 'Nuevo CV (Sin guardar)' 
            : (hasUnsavedChanges ? 'Cambios sin guardar' : 'Guardado')}
        </div>
      </div>

      <div className="sidebar-header-actions">
        {/* MODO 1: Creando un Nuevo CV -> Botón "Guardar" */}
        {isCreatingNew ? (
          <>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={saveCurrentResume}
              disabled={isSaving}
              title="Guardar este nuevo currículum"
            >
              <Save size={14} />
              <span>{isSaving ? 'Guardando...' : 'Guardar'}</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm btn-discard"
              onClick={discardChanges}
              disabled={isSaving}
              title="Cancelar creación y no guardar"
            >
              <RotateCcw size={13} />
              <span>Cancelar</span>
            </button>
          </>
        ) : (
          /* MODO 2: Editando un CV existente -> Botón "Actualizar" */
          <>
            <button
              type="button"
              className={`btn btn-sm ${hasUnsavedChanges ? 'btn-primary' : 'btn-secondary'}`}
              onClick={saveCurrentResume}
              title={hasUnsavedChanges ? 'Guardar los datos editados' : 'Sin cambios pendientes'}
              disabled={!hasUnsavedChanges || isSaving}
            >
              <Save size={14} />
              <span>{isSaving ? 'Guardando...' : 'Actualizar'}</span>
            </button>

            {hasUnsavedChanges && (
              <button
                type="button"
                className="btn btn-secondary btn-sm btn-discard"
                onClick={discardChanges}
                disabled={isSaving}
                title="Descartar cambios y regresar a como estaba antes"
              >
                <RotateCcw size={13} />
                <span>Descartar</span>
              </button>
            )}
          </>
        )}

        <div className="dropdown-container" style={{ position: 'relative' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              const menu = document.getElementById('samples-dropdown')
              if (menu) menu.style.display = menu.style.display === 'block' ? 'none' : 'block'
            }}
            title="Cargar perfil de ejemplo"
          >
            <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
            <span>Ejemplos</span>
          </button>

          <div
            id="samples-dropdown"
            style={{
              display: 'none',
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '6px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 100,
              minWidth: '220px',
              padding: '6px'
            }}
          >
            <button
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none', textAlign: 'left', marginBottom: '4px' }}
              onClick={() => {
                loadSample('softwareEngineer')
                document.getElementById('samples-dropdown').style.display = 'none'
              }}
            >
              💻 Software Engineer & Cloud
            </button>
            <button
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', justifyContent: 'flex-start', border: 'none', textAlign: 'left' }}
              onClick={() => {
                loadSample('productDesigner')
                document.getElementById('samples-dropdown').style.display = 'none'
              }}
            >
              🎨 Product & UX/UI Designer
            </button>
          </div>
        </div>

        <button
          className="btn-icon"
          onClick={() => duplicateResume(activeResume.id)}
          title="Duplicar currículum"
        >
          <Copy size={15} />
        </button>

        <button
          className="btn-icon"
          onClick={() => deleteResume(activeResume.id)}
          title="Eliminar currículum"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  )
}
