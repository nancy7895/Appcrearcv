import React from 'react'
import { FolderGit2, ChevronDown, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import { useResume } from '../../../context/ResumeContext'

export default function ProjectsSection({ isOpen, onToggle }) {
  const { activeResume, updateActiveResume, addToast } = useResume()
  const projects = activeResume.projects || []

  const handleAdd = () => {
    const newItem = {
      id: 'prj-' + Date.now(),
      name: 'Nombre del Proyecto',
      role: 'Creador / Lead Dev',
      link: 'https://github.com/usuario/proyecto',
      techStack: 'React, Node.js, Tailwind',
      description: 'Descripción concisa de la solución implementada y los resultados obtenidos.'
    }
    updateActiveResume({ projects: [...projects, newItem] })
    addToast('Proyecto añadido', 'info')
  }

  const handleUpdate = (id, field, value) => {
    const updated = projects.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value }
      }
      return item
    })
    updateActiveResume({ projects: updated })
  }

  const handleDelete = (id) => {
    updateActiveResume({ projects: projects.filter(item => item.id !== id) })
  }

  const handleMove = (index, direction) => {
    const newIdx = index + direction
    if (newIdx < 0 || newIdx >= projects.length) return
    const items = [...projects]
    const temp = items[index]
    items[index] = items[newIdx]
    items[newIdx] = temp
    updateActiveResume({ projects: items })
  }

  return (
    <div id="section-projects" className={`form-section ${!isOpen ? 'collapsed' : ''}`}>
      <div className="form-section-header" onClick={onToggle}>
        <div className="section-title-group">
          <div className="section-icon-box">
            <FolderGit2 size={16} />
          </div>
          <div>
            <h3 className="section-title-text">Proyectos Destacados</h3>
            <p className="section-subtitle-text">{projects.length} proyecto(s)</p>
          </div>
        </div>
        <ChevronDown size={18} className="section-chevron" />
      </div>

      <div className="form-section-body">
        <div className="dynamic-items-container">
          {projects.map((item, idx) => (
            <div key={item.id} className="dynamic-item-card">
              <div className="dynamic-item-top">
                <span className="dynamic-item-title">{item.name || 'Proyecto'}</span>
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
                    disabled={idx === projects.length - 1}
                    onClick={() => handleMove(idx, 1)}
                    title="Mover abajo"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    className="btn-item-action delete"
                    onClick={() => handleDelete(item.id)}
                    title="Eliminar proyecto"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nombre del Proyecto *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={item.name || ''}
                    onChange={(e) => handleUpdate(item.id, 'name', e.target.value)}
                    placeholder="Ej. CloudPulse Dashboard"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Rol en el Proyecto</label>
                  <input
                    type="text"
                    className="form-input"
                    value={item.role || ''}
                    onChange={(e) => handleUpdate(item.id, 'role', e.target.value)}
                    placeholder="Ej. Creador & Lead Dev"
                  />
                </div>
              </div>

              <div className="form-row" style={{ marginTop: '0.6rem' }}>
                <div className="form-group">
                  <label className="form-label">Enlace / Demo / Repo</label>
                  <input
                    type="text"
                    className="form-input"
                    value={item.link || ''}
                    onChange={(e) => handleUpdate(item.link ? item.id : item.id, 'link', e.target.value)}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tecnologías Usadas (Stack)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={item.techStack || ''}
                    onChange={(e) => handleUpdate(item.id, 'techStack', e.target.value)}
                    placeholder="Ej. React, Go, Docker, AWS"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '0.6rem' }}>
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-textarea"
                  rows="2"
                  value={item.description || ''}
                  onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                  placeholder="Explica qué problema resuelve, cómo lo construiste o qué métricas consiguió..."
                />
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="btn-add-item" onClick={handleAdd}>
          <Plus size={16} /> Añadir Proyecto
        </button>
      </div>
    </div>
  )
}
