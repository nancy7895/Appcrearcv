// =============================================================================
// SECCIÓN: EDUCACIÓN & ESTUDIOS (EducationSection.jsx)
// =============================================================================

import React from 'react'
import { GraduationCap, ChevronDown, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import { useResume } from '../../../context/ResumeContext'

export default function EducationSection({ isOpen, onToggle }) {
  const { activeResume, updateActiveResume, addToast } = useResume()
  const education = activeResume.education || []

  const handleAdd = () => {
    const newItem = {
      id: 'edu-' + Date.now(),
      degree: 'Título o Grado Académico',
      institution: 'Universidad o Instituto',
      location: 'Ciudad',
      startDate: '2016-09',
      endDate: '2020-06',
      honors: ''
    }
    updateActiveResume({ education: [...education, newItem] })
    addToast('Educación añadida', 'info')
  }

  const handleUpdate = (id, field, value) => {
    const updated = education.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value }
      }
      return item
    })
    updateActiveResume({ education: updated })
  }

  const handleDelete = (id) => {
    updateActiveResume({ education: education.filter(item => item.id !== id) })
  }

  const handleMove = (index, direction) => {
    const newIdx = index + direction
    if (newIdx < 0 || newIdx >= education.length) return
    const items = [...education]
    const temp = items[index]
    items[index] = items[newIdx]
    items[newIdx] = temp
    updateActiveResume({ education: items })
  }

  return (
    <div id="section-education" className={`form-section ${!isOpen ? 'collapsed' : ''}`}>
      {/* Cabecera del acordeón */}
      <div className="form-section-header" onClick={onToggle}>
        <div className="section-title-group">
          <div className="section-icon-box">
            <GraduationCap size={18} />
          </div>
          <div>
            <h3 className="section-title-text">Educación & Estudios</h3>
            <p className="section-subtitle-text">{education.length} titulación(es) registrada(s)</p>
          </div>
        </div>
        <div className="section-header-meta">
          <span className="section-count-badge">{education.length}</span>
          <ChevronDown size={18} className="section-chevron" />
        </div>
      </div>

      {/* Contenedor con animación fluida CSS Grid */}
      <div className="form-section-content">
        <div className="form-section-body-wrapper">
          <div className="form-section-body">
            <div className="dynamic-items-container">
              {education.map((item, idx) => (
                <div key={item.id} className="dynamic-item-card">
                  <div className="dynamic-item-top">
                    <div className="dynamic-item-title-wrapper">
                      <span className="dynamic-item-badge">{idx + 1}</span>
                      <span className="dynamic-item-title">
                        {item.degree || 'Titulación'} {item.institution ? `· ${item.institution}` : ''}
                      </span>
                    </div>
                    <div className="dynamic-item-actions">
                      <button
                        type="button"
                        className="btn-item-action"
                        disabled={idx === 0}
                        onClick={() => handleMove(idx, -1)}
                        title="Mover arriba"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        className="btn-item-action"
                        disabled={idx === education.length - 1}
                        onClick={() => handleMove(idx, 1)}
                        title="Mover abajo"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button
                        type="button"
                        className="btn-item-action delete"
                        onClick={() => handleDelete(item.id)}
                        title="Eliminar titulación"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Carrera e Institución */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Titulación o Carrera *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.degree || ''}
                        onChange={(e) => handleUpdate(item.id, 'degree', e.target.value)}
                        placeholder="Ej. Grado en Ingeniería Informática"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Institución o Universidad *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.institution || ''}
                        onChange={(e) => handleUpdate(item.id, 'institution', e.target.value)}
                        placeholder="Ej. Universidad Politécnica"
                      />
                    </div>
                  </div>

                  {/* Fechas de inicio y fin */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Fecha de Inicio</label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.startDate || ''}
                        onChange={(e) => handleUpdate(item.id, 'startDate', e.target.value)}
                        placeholder="2016-09 o Sep 2016"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Fecha Fin / Graduación</label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.endDate || ''}
                        onChange={(e) => handleUpdate(item.id, 'endDate', e.target.value)}
                        placeholder="2020-06 o Jun 2020"
                      />
                    </div>
                  </div>

                  {/* Ubicación y Menciones */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Ciudad / País</label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.location || ''}
                        onChange={(e) => handleUpdate(item.id, 'location', e.target.value)}
                        placeholder="Madrid, España"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Menciones o Honores</label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.honors || ''}
                        onChange={(e) => handleUpdate(item.id, 'honors', e.target.value)}
                        placeholder="Ej. Matrícula de Honor en TFG"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="btn-add-item" onClick={handleAdd}>
              <Plus size={16} /> Añadir Formación Académica
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
