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
      <div className="form-section-header" onClick={onToggle}>
        <div className="section-title-group">
          <div className="section-icon-box">
            <Wrench size={16} />
          </div>
          <div>
            <h3 className="section-title-text">Habilidades & Tecnologías</h3>
            <p className="section-subtitle-text">{skills.length} habilidad(es) registradas</p>
          </div>
        </div>
        <ChevronDown size={18} className="section-chevron" />
      </div>

      <div className="form-section-body">
        {/* Input Add */}
        <div className="form-row" style={{ gridTemplateColumns: '1fr auto' }}>
          <input
            type="text"
            className="form-input"
            value={newSkillText}
            onChange={(e) => setNewSkillText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe una habilidad y pulsa Enter (ej. React, Docker...)"
          />
          <button type="button" className="btn btn-primary" onClick={() => handleAddSkill()}>
            <Plus size={16} /> Añadir
          </button>
        </div>

        {/* Current Skills Tags */}
        <div className="skills-tags-wrapper">
          {skills.map(s => (
            <div key={s.id} className="skill-tag">
              <span>{s.name}</span>
              <span
                className="skill-tag-remove"
                onClick={() => handleRemoveSkill(s.id)}
                title="Eliminar habilidad"
              >
                <X size={13} />
              </span>
            </div>
          ))}
          {skills.length === 0 && (
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>No has añadido habilidades aún.</p>
          )}
        </div>

        {/* Quick Suggestions */}
        <div style={{ marginTop: '0.8rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
            <Sparkles size={12} style={{ color: 'var(--accent-primary)' }} /> Sugerencias populares de un clic:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {popularSuggestions
              .filter(p => !skills.some(s => s.name.toLowerCase() === p.toLowerCase()))
              .slice(0, 10)
              .map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleAddSkill(item)}
                  style={{
                    background: 'rgba(99, 102, 241, 0.08)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '3px 8px',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  + {item}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
