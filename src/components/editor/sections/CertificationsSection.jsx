import React from 'react'
import { Award, ChevronDown, Plus, Trash2 } from 'lucide-react'
import { useResume } from '../../../context/ResumeContext'

export default function CertificationsSection({ isOpen, onToggle }) {
  const { activeResume, updateActiveResume, addToast } = useResume()
  const certifications = activeResume.certifications || []

  const handleAdd = () => {
    const newItem = {
      id: 'cert-' + Date.now(),
      name: 'Nombre del Certificado',
      issuer: 'Entidad Emisora',
      date: '2023'
    }
    updateActiveResume({ certifications: [...certifications, newItem] })
    addToast('Certificación añadida', 'info')
  }

  const handleUpdate = (id, field, value) => {
    const updated = certifications.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value }
      }
      return item
    })
    updateActiveResume({ certifications: updated })
  }

  const handleDelete = (id) => {
    updateActiveResume({ certifications: certifications.filter(item => item.id !== id) })
  }

  return (
    <div id="section-certifications" className={`form-section ${!isOpen ? 'collapsed' : ''}`}>
      <div className="form-section-header" onClick={onToggle}>
        <div className="section-title-group">
          <div className="section-icon-box">
            <Award size={16} />
          </div>
          <div>
            <h3 className="section-title-text">Certificaciones & Licencias</h3>
            <p className="section-subtitle-text">{certifications.length} certificación(es)</p>
          </div>
        </div>
        <ChevronDown size={18} className="section-chevron" />
      </div>

      <div className="form-section-body">
        <div className="dynamic-items-container">
          {certifications.map((item) => (
            <div key={item.id} className="dynamic-item-card" style={{ padding: '0.75rem 0.9rem' }}>
              <div className="form-row" style={{ gridTemplateColumns: '1.2fr 1fr 0.6fr auto', alignItems: 'center' }}>
                <input
                  type="text"
                  className="form-input"
                  value={item.name || ''}
                  onChange={(e) => handleUpdate(item.id, 'name', e.target.value)}
                  placeholder="Certificación (ej. AWS CKA)"
                />
                <input
                  type="text"
                  className="form-input"
                  value={item.issuer || ''}
                  onChange={(e) => handleUpdate(item.id, 'issuer', e.target.value)}
                  placeholder="Emisor (ej. Amazon)"
                />
                <input
                  type="text"
                  className="form-input"
                  value={item.date || ''}
                  onChange={(e) => handleUpdate(item.id, 'date', e.target.value)}
                  placeholder="Año"
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
            </div>
          ))}
        </div>

        <button type="button" className="btn-add-item" onClick={handleAdd}>
          <Plus size={16} /> Añadir Certificación
        </button>
      </div>
    </div>
  )
}
