// =============================================================================
// BARRA FLOTANTE DE GUARDADO Y ACTUALIZACIÓN (FloatingSaveBar.jsx)
// =============================================================================
// Aparece automáticamente en la parte inferior del editor cuando el usuario tiene
// cambios pendientes o está creando un nuevo currículum. Permite guardar o descartar
// sin necesidad de hacer scroll hasta la parte superior.

import React from 'react'
import { Save, RotateCcw, Loader2, AlertCircle, Sparkles } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'

export default function FloatingSaveBar() {
  const {
    hasUnsavedChanges,
    isCreatingNew,
    isSaving,
    saveCurrentResume,
    discardChanges
  } = useResume()

  // Si no hay cambios y no se está creando uno nuevo, no se muestra nada
  if (!hasUnsavedChanges && !isCreatingNew) {
    return null
  }

  // Detectar si el usuario está en Mac o Windows/Linux para el atajo visual
  const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform)

  return (
    <div className="floating-save-bar-container" role="region" aria-label="Acciones de guardado">
      <div className={`floating-save-bar ${isCreatingNew ? 'is-new' : 'is-modified'}`}>
        {/* Indicador de estado con luz pulsante */}
        <div className="floating-bar-info">
          <div className="floating-bar-dot-wrapper">
            <span className={`floating-bar-dot ${isCreatingNew ? 'dot-blue' : 'dot-amber'}`} />
            <span className={`floating-bar-pulse ${isCreatingNew ? 'pulse-blue' : 'pulse-amber'}`} />
          </div>

          <div className="floating-bar-text-group">
            <span className="floating-bar-title">
              {isCreatingNew ? 'Nuevo CV sin guardar' : 'Modificaciones sin guardar'}
            </span>
            <span className="floating-bar-shortcut">
              Atajo: <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd> + <kbd>S</kbd>
            </span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="floating-bar-actions">
          {/* Botón Descartar / Cancelar */}
          <button
            type="button"
            className="btn btn-secondary btn-sm floating-btn-discard"
            onClick={discardChanges}
            disabled={isSaving}
            title={isCreatingNew ? 'Cancelar y no guardar este nuevo CV' : 'Descartar cambios no guardados'}
          >
            <RotateCcw size={13} />
            <span>{isCreatingNew ? 'Cancelar' : 'Descartar'}</span>
          </button>

          {/* Botón Guardar / Actualizar */}
          <button
            type="button"
            className="btn btn-primary btn-sm floating-btn-save"
            onClick={saveCurrentResume}
            disabled={isSaving}
            title={isCreatingNew ? 'Guardar este currículum en la base de datos' : 'Actualizar los cambios realizados'}
          >
            {isSaving ? (
              <>
                <Loader2 size={14} className="spin-icon" />
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>{isCreatingNew ? 'Guardar CV' : 'Actualizar'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
