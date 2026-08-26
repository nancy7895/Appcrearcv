// =============================================================================
// SECCIÓN: PROYECTOS DESTACADOS (ProjectsSection.jsx)
// =============================================================================

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
      {/* Cabecera del acordeón */}
      <div className="form-section-header" onClick={onToggle}>
        <div className="section-title-group">
          <div className="section-icon-box">
            <FolderGit2 size={18} />
          </div>
          <div>
            <h3 className="section-title-text">Proyectos Destacados</h3>
            <p className="section-subtitle-text">{projects.length} proyecto(s) registrado(s)</p>
          </div>
        </div>
        <div className="section-header-meta">
          <span className="section-count-badge">{projects.length}</span>
          <ChevronDown size={18} className="section-chevron" />
        </div>
      </div>

      {/* Contenedor con animación fluida CSS Grid */}
      <div className="form-section-content">
        <div className="form-section-body-wrapper">
          <div className="form-section-body">
            <div className="dynamic-items-container">
              {projects.map((item, idx) => (
                <div key={item.id} className="dynamic-item-card">
                  <div className="dynamic-item-top">
                    <div className="dynamic-item-title-wrapper">
                      <span className="dynamic-item-badge">{idx + 1}</span>
                      <span className="dynamic-item-title">{item.name || 'Proyecto'}</span>
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

                  {/* Nombre y Rol */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Nombre del Proyecto *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.name || ''}
                        onChange={(e) => handleUpdate(item.id, 'name', e.target.value)}
                        placeholder="Ej. CloudPulse Analytics"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Rol en el Proyecto</label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.role || ''}
                        onChange={(e) => handleUpdate(item.id, 'role', e.target.value)}
                        placeholder="Ej. Arquitecto & Lead Dev"
                      />
                    </div>
                  </div>

                  {/* Demo/Repo y Stack Tecnológico */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Enlace / Demo / Repositorio</label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.link || ''}
                        onChange={(e) => handleUpdate(item.id, 'link', e.target.value)}
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
                        placeholder="Ej. React, TypeScript, Docker"
                      />
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="form-group">
                    <label className="form-label">Descripción del Proyecto</label>
                    <textarea
                      className="form-textarea"
                      rows="2"
                      value={item.description || ''}
                      onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                      placeholder="Explica qué problema resuelve, qué tecnologías clave implementaste o qué métricas consiguió..."
                    />
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="btn-add-item" onClick={handleAdd}>
              <Plus size={16} /> Añadir Nuevo Proyecto
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
