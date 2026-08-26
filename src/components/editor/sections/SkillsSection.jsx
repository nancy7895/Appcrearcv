// =============================================================================
// SECCIÓN: HABILIDADES & TECNOLOGÍAS (SkillsSection.jsx)
// =============================================================================

import React, { useState } from 'react'
import { Wrench, ChevronDown, Plus, X, Sparkles } from 'lucide-react'
import { useResume } from '../../../context/ResumeContext'

export default function SkillsSection({ isOpen, onToggle }) {
  const { activeResume, updateActiveResume, addToast } = useResume()
  const skills = activeResume.skills || []
  const [newSkillText, setNewSkillText] = useState('')

  const popularSuggestions = [
    'React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'AWS', 'Docker',
    'Kubernetes', 'PostgreSQL', 'Redis', 'Git', 'CI/CD', 'Figma', 'GraphQL',
    'Metodologías Ágiles', 'Liderazgo de Equipos'
  ]

  const handleAddSkill = (skillName) => {
    const trimmed = (skillName || newSkillText).trim()
    if (!trimmed) return
    if (skills.some(s => s.name.toLowerCase() === trimmed.toLowerCase())) {
      addToast('Esa habilidad ya está añadida', 'info')
      return
    }
    const newSkill = {
      id: 'sk-' + Date.now() + Math.random(),
      name: trimmed,
      level: 'Avanzado',
      category: 'general'
    }
    updateActiveResume({ skills: [...skills, newSkill] })
    setNewSkillText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleRemoveSkill = (id) => {
    updateActiveResume({ skills: skills.filter(s => s.id !== id) })
  }

  return (
    <div id="section-skills" className={`form-section ${!isOpen ? 'collapsed' : ''}`}>
      {/* Cabecera del acordeón */}
      <div className="form-section-header" onClick={onToggle}>
        <div className="section-title-group">
          <div className="section-icon-box">
            <Wrench size={18} />
          </div>
          <div>
            <h3 className="section-title-text">Habilidades & Tecnologías</h3>
            <p className="section-subtitle-text">{skills.length} habilidad(es) registrada(s)</p>
          </div>
        </div>
        <div className="section-header-meta">
          <span className="section-count-badge">{skills.length}</span>
          <ChevronDown size={18} className="section-chevron" />
        </div>
      </div>

      {/* Contenedor con animación fluida CSS Grid */}
      <div className="form-section-content">
        <div className="form-section-body-wrapper">
          <div className="form-section-body">
            {/* Input Add */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="form-input"
                value={newSkillText}
                onChange={(e) => setNewSkillText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe una habilidad y pulsa Enter (ej. React, Docker...)"
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleAddSkill()}
                style={{ flexShrink: 0, padding: '0 1.1rem' }}
              >
                <Plus size={16} /> Añadir
              </button>
            </div>

            {/* Current Skills Tags */}
            <div>
              <div className="skills-tags-wrapper">
                {skills.map(s => (
                  <div key={s.id} className="skill-tag">
                    <span>{s.name}</span>
                    <span
                      className="skill-tag-remove"
                      onClick={() => handleRemoveSkill(s.id)}
                      title="Eliminar habilidad"
                    >
                      <X size={14} />
                    </span>
                  </div>
                ))}
              </div>
              {skills.length === 0 && (
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  No has añadido habilidades aún. Escribe arriba o selecciona una de las sugerencias rápidas.
                </p>
              )}
            </div>

            {/* Quick Suggestions */}
            <div style={{ marginTop: '0.4rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.8rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                <Sparkles size={13} style={{ color: 'var(--accent-primary)' }} /> Sugerencias populares de un clic:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {popularSuggestions
                  .filter(p => !skills.some(s => s.name.toLowerCase() === p.toLowerCase()))
                  .slice(0, 12)
                  .map(item => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleAddSkill(item)}
                      style={{
                        background: 'rgba(99, 102, 241, 0.08)',
                        border: '1px solid rgba(99, 102, 241, 0.22)',
                        color: 'var(--text-primary)',
                        borderRadius: 'var(--radius-xs)',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      + {item}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
