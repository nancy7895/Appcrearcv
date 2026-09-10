// =============================================================================
// MODAL DE ADVERTENCIA DE CAMBIOS SIN GUARDAR (UnsavedChangesModal.jsx)
// =============================================================================
// Se abre si el usuario intenta navegar a otra pestaña ("Plantillas", "Mis Documentos")
// teniendo modificaciones pendientes, protegiéndolo de perder información por descuido.

import React, { useEffect } from 'react'
import { AlertTriangle, Save, Trash2, X, Loader2 } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'

export default function UnsavedChangesModal() {
  const {
    isNavModalOpen,
    activeResume,
    isCreatingNew,
    isSaving,
    confirmNavigationAndSave,
    confirmNavigationAndDiscard,
    cancelNavigation
  } = useResume()

  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isNavModalOpen) {
        cancelNavigation()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isNavModalOpen])

  if (!isNavModalOpen) return null

  return (
    <div className="unsaved-modal-backdrop" onClick={cancelNavigation} role="dialog" aria-modal="true">
      <div className="unsaved-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera del Modal */}
        <div className="unsaved-modal-header">
          <div className="unsaved-modal-icon-badge">
            <AlertTriangle size={22} />
          </div>
          <button
            type="button"
            className="unsaved-modal-close"
            onClick={cancelNavigation}
            aria-label="Cerrar ventana"
          >
            <X size={18} />
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="unsaved-modal-body">
          <h3 className="unsaved-modal-title">¿Deseas guardar los cambios antes de salir?</h3>
          <p className="unsaved-modal-desc">
            Tienes cambios pendientes en{' '}
            <strong className="unsaved-modal-resume-name">
              "{activeResume?.title || 'Mi Currículum'}"
            </strong>
            . Si sales sin guardar, se perderán las últimas ediciones no confirmadas.
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="unsaved-modal-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={cancelNavigation}
            disabled={isSaving}
          >
            Seguir editando
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-sm unsaved-btn-danger"
            onClick={confirmNavigationAndDiscard}
            disabled={isSaving}
          >
            <Trash2 size={14} />
            <span>Descartar y salir</span>
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm unsaved-btn-save"
            onClick={confirmNavigationAndSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 size={14} className="spin-icon" />
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>{isCreatingNew ? 'Guardar y salir' : 'Actualizar y salir'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
