// =============================================================================
// SECCIÓN: IDIOMAS (LanguagesSection.jsx)
// =============================================================================

import React from 'react'
import { Languages, ChevronDown, Plus, Trash2 } from 'lucide-react'
import { useResume } from '../../../context/ResumeContext'

export default function LanguagesSection({ isOpen, onToggle }) {
  const { activeResume, updateActiveResume, addToast } = useResume()
  const languages = activeResume.languages || []

  const handleAdd = () => {
    const newItem = {
      id: 'lang-' + Date.now(),
      language: 'Idioma',
      level: 'Intermedio (B2)'
    }
    updateActiveResume({ languages: [...languages, newItem] })
    addToast('Idioma añadido', 'info')
  }

  const handleUpdate = (id, field, value) => {
    const updated = languages.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value }
      }
      return item
    })
    updateActiveResume({ languages: updated })
  }

  const handleDelete = (id) => {
    updateActiveResume({ languages: languages.filter(item => item.id !== id) })
  }

  return (
    <div id="section-languages" className={`form-section ${!isOpen ? 'collapsed' : ''}`}>
      {/* Cabecera del acordeón */}
      <div className="form-section-header" onClick={onToggle}>
        <div className="section-title-group">
          <div className="section-icon-box">
            <Languages size={18} />
          </div>
          <div>
            <h3 className="section-title-text">Idiomas</h3>
            <p className="section-subtitle-text">{languages.length} idioma(s) registrado(s)</p>
          </div>
        </div>
        <div className="section-header-meta">
          <span className="section-count-badge">{languages.length}</span>
          <ChevronDown size={18} className="section-chevron" />
        </div>
      </div>

      {/* Contenedor con animación fluida CSS Grid */}
      <div className="form-section-content">
        <div className="form-section-body-wrapper">
          <div className="form-section-body">
            <div className="dynamic-items-container">
              {languages.map((item, idx) => (
                <div key={item.id} className="dynamic-item-card" style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
                    <input
                      type="text"
                      className="form-input"
                      value={item.language || ''}
                      onChange={(e) => handleUpdate(item.id, 'language', e.target.value)}
                      placeholder="Ej. Inglés, Francés..."
                      style={{ flex: '1 1 50%' }}
                    />
                    <select
                      className="form-select"
                      value={item.level || 'Intermedio (B2)'}
                      onChange={(e) => handleUpdate(item.id, 'level', e.target.value)}
                      style={{ flex: '1 1 45%' }}
                    >
                      <option value="Nativo">Nativo</option>
                      <option value="C2 Bilingüe">C2 Bilingüe</option>
                      <option value="C1 Profesional">C1 Profesional</option>
                      <option value="B2 Intermedio Alto">B2 Intermedio Alto</option>
                      <option value="B1 Intermedio">B1 Intermedio</option>
                      <option value="A2 / A1 Básico">A2 / A1 Básico</option>
                    </select>
                    <button
                      type="button"
                      className="btn-item-action delete"
                      onClick={() => handleDelete(item.id)}
                      title="Eliminar idioma"
                      style={{ flexShrink: 0 }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="btn-add-item" onClick={handleAdd}>
              <Plus size={16} /> Añadir Idioma
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
