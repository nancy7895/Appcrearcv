import React from 'react'
import { Briefcase, ChevronDown, Plus, Trash2, ArrowUp, ArrowDown, Sparkles } from 'lucide-react'
import { useResume } from '../../../context/ResumeContext'

export default function ExperienceSection({ isOpen, onToggle }) {
  const { activeResume, updateActiveResume, enhanceBulletPoint, addToast } = useResume()
  const experience = activeResume.experience || []

  const handleAdd = () => {
    const newItem = {
      id: 'exp-' + Date.now(),
      role: 'Puesto de Trabajo',
      company: 'Empresa',
      location: 'Ciudad / Remoto',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: '• Responsabilidad principal y logro cuantitativo alcanzado.'
    }
    updateActiveResume({ experience: [...experience, newItem] })
    addToast('Nueva experiencia añadida', 'info')
  }

  const handleUpdate = (id, field, value) => {
    const updated = experience.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value }
      }
      return item
    })
    updateActiveResume({ experience: updated })
  }

  const handleDelete = (id) => {
    updateActiveResume({ experience: experience.filter(item => item.id !== id) })
  }

  const handleMove = (index, direction) => {
    const newIdx = index + direction
    if (newIdx < 0 || newIdx >= experience.length) return
    const items = [...experience]
    const temp = items[index]
    items[index] = items[newIdx]
    items[newIdx] = temp
    updateActiveResume({ experience: items })
  }

  const handleAiEnhance = (id, currentText) => {
    const enhanced = enhanceBulletPoint(currentText)
    handleUpdate(id, 'description', enhanced)
    addToast('¡Viñeta optimizada con verbos de acción e impacto!', 'success')
  }

  return (
    <div id="section-experience" className={`form-section ${!isOpen ? 'collapsed' : ''}`}>
      <div className="form-section-header" onClick={onToggle}>
        <div className="section-title-group">
          <div className="section-icon-box">
            <Briefcase size={16} />
          </div>
          <div>
            <h3 className="section-title-text">Experiencia Laboral</h3>
            <p className="section-subtitle-text">{experience.length} puesto(s) registrado(s)</p>
          </div>
        </div>
        <ChevronDown size={18} className="section-chevron" />
      </div>

      <div className="form-section-body">
        <div className="dynamic-items-container">
          {experience.map((item, idx) => (
            <div key={item.id} className="dynamic-item-card">
              <div className="dynamic-item-top">
                <span className="dynamic-item-title">{item.role || 'Puesto'} {item.company ? `· ${item.company}` : ''}</span>
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
                    disabled={idx === experience.length - 1}
                    onClick={() => handleMove(idx, 1)}
                    title="Mover abajo"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    className="btn-item-action delete"
                    onClick={() => handleDelete(item.id)}
                    title="Eliminar puesto"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Puesto o Cargo *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={item.role || ''}
                    onChange={(e) => handleUpdate(item.id, 'role', e.target.value)}
                    placeholder="Ej. Software Engineer"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Empresa *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={item.company || ''}
                    onChange={(e) => handleUpdate(item.id, 'company', e.target.value)}
                    placeholder="Ej. Google / Startup"
                  />
                </div>
              </div>

              <div className="form-row-3" style={{ marginTop: '0.6rem' }}>
                <div className="form-group">
                  <label className="form-label">Ubicación</label>
                  <input
                    type="text"
                    className="form-input"
                    value={item.location || ''}
                    onChange={(e) => handleUpdate(item.id, 'location', e.target.value)}
                    placeholder="Madrid / Remoto"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Fecha Inicio</label>
                  <input
                    type="text"
                    className="form-input"
                    value={item.startDate || ''}
                    onChange={(e) => handleUpdate(item.id, 'startDate', e.target.value)}
                    placeholder="2021-06"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Fecha Fin</label>
                  <input
                    type="text"
                    className="form-input"
                    disabled={item.current}
                    value={item.current ? 'Presente' : (item.endDate || '')}
                    onChange={(e) => handleUpdate(item.id, 'endDate', e.target.value)}
                    placeholder="2023-12"
                  />
                </div>
              </div>

              <div style={{ marginTop: '0.4rem' }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={!!item.current}
                    onChange={(e) => handleUpdate(item.id, 'current', e.target.checked)}
                  />
                  Trabajo actualmente en este puesto
                </label>
              </div>

              <div className="form-group" style={{ marginTop: '0.6rem' }}>
                <div className="form-label">
                  <span>Logros y Responsabilidades (Viñetas)</span>
                  <button
                    type="button"
                    className="btn-ai-assist"
                    onClick={() => handleAiEnhance(item.id, item.description)}
                  >
                    <Sparkles size={11} /> Mejorar con IA
                  </button>
                </div>
                <textarea
                  className="form-textarea"
                  rows="3"
                  value={item.description || ''}
                  onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                  placeholder="• Lideré el desarrollo de...\n• Aumenté el rendimiento en un 30% gracias a..."
                />
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="btn-add-item" onClick={handleAdd}>
          <Plus size={16} /> Añadir Experiencia
        </button>
      </div>
    </div>
  )
}
