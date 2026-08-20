import React from 'react'
import { PlusCircle, ChevronDown, Plus, Trash2 } from 'lucide-react'
import { useResume } from '../../../context/ResumeContext'

export default function CustomSection({ isOpen, onToggle }) {
  const { activeResume, updateActiveResume, addToast } = useResume()
  const customSections = activeResume.customSections || []

  const handleAdd = () => {
    const newItem = {
      id: 'cs-' + Date.now(),
      title: 'Sección Personalizada (ej. Publicaciones, Voluntariado)',
      content: 'Escribe aquí los detalles, enlaces o menciones relevantes...'
    }
    updateActiveResume({ customSections: [...customSections, newItem] })
    addToast('Nueva sección personalizada creada', 'info')
  }

  const handleUpdate = (id, field, value) => {
    const updated = customSections.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value }
      }
      return item
    })
    updateActiveResume({ customSections: updated })
  }

  const handleDelete = (id) => {
    updateActiveResume({ customSections: customSections.filter(item => item.id !== id) })
  }

  return (
    <div id="section-custom" className={`form-section ${!isOpen ? 'collapsed' : ''}`}>
      <div className="form-section-header" onClick={onToggle}>
        <div className="section-title-group">
          <div className="section-icon-box">
            <PlusCircle size={16} />
          </div>
          <div>
            <h3 className="section-title-text">Secciones Personalizadas</h3>
            <p className="section-subtitle-text">{customSections.length} sección(es) extra</p>
          </div>
        </div>
        <ChevronDown size={18} className="section-chevron" />
      </div>

      <div className="form-section-body">
        <div className="dynamic-items-container">
          {customSections.map((item) => (
            <div key={item.id} className="dynamic-item-card">
              <div className="dynamic-item-top">
                <input
                  type="text"
                  className="form-input"
                  style={{ fontWeight: '700', width: '80%' }}
                  value={item.title || ''}
                  onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                  placeholder="Título de la sección..."
                />
                <button
                  type="button"
                  className="btn-item-action delete"
                  onClick={() => handleDelete(item.id)}
                  title="Eliminar"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="form-group" style={{ marginTop: '0.4rem' }}>
                <textarea
                  className="form-textarea"
                  rows="3"
                  value={item.content || ''}
                  onChange={(e) => handleUpdate(item.id, 'content', e.target.value)}
                  placeholder="Contenido libre de la sección..."
                />
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="btn-add-item" onClick={handleAdd}>
          <Plus size={16} /> Añadir Sección a Medida
        </button>
      </div>
    </div>
  )
}
