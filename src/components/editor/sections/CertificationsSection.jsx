// =============================================================================
// SECCIÓN: CERTIFICACIONES & LICENCIAS (CertificationsSection.jsx)
// =============================================================================

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
      {/* Cabecera del acordeón */}
      <div className="form-section-header" onClick={onToggle}>
        <div className="section-title-group">
          <div className="section-icon-box">
            <Award size={18} />
          </div>
          <div>
            <h3 className="section-title-text">Certificaciones & Licencias</h3>
            <p className="section-subtitle-text">{certifications.length} certificación(es) registrada(s)</p>
          </div>
        </div>
        <div className="section-header-meta">
          <span className="section-count-badge">{certifications.length}</span>
          <ChevronDown size={18} className="section-chevron" />
        </div>
      </div>

      {/* Contenedor con animación fluida CSS Grid */}
      <div className="form-section-content">
        <div className="form-section-body-wrapper">
          <div className="form-section-body">
            <div className="dynamic-items-container">
              {certifications.map((item, idx) => (
                <div key={item.id} className="dynamic-item-card">
                  <div className="dynamic-item-top">
                    <div className="dynamic-item-title-wrapper">
                      <span className="dynamic-item-badge">{idx + 1}</span>
                      <span className="dynamic-item-title">
                        {item.name || 'Certificación'} {item.issuer ? `· ${item.issuer}` : ''}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn-item-action delete"
                      onClick={() => handleDelete(item.id)}
                      title="Eliminar certificación"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Nombre del Certificado o Licencia *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.name || ''}
                      onChange={(e) => handleUpdate(item.id, 'name', e.target.value)}
                      placeholder="Ej. AWS Certified Solutions Architect"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Entidad Emisora</label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.issuer || ''}
                        onChange={(e) => handleUpdate(item.id, 'issuer', e.target.value)}
                        placeholder="Ej. Amazon Web Services, Google, Coursera"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Año o Fecha de Emisión</label>
                      <input
                        type="text"
                        className="form-input"
                        value={item.date || ''}
                        onChange={(e) => handleUpdate(item.id, 'date', e.target.value)}
                        placeholder="Ej. 2023 o Nov 2023"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="button" className="btn-add-item" onClick={handleAdd}>
              <Plus size={16} /> Añadir Certificación
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
