// =============================================================================
// SECCIÓN: DATOS PERSONALES (PersonalInfoSection.jsx)
// =============================================================================

import React from 'react'
import { User, ChevronDown, Camera, Sparkles, Upload } from 'lucide-react'
import { useResume } from '../../../context/ResumeContext'

export default function PersonalInfoSection({ isOpen, onToggle }) {
  const { activeResume, updateActiveResume, addToast } = useResume()
  const { personalInfo } = activeResume

  const handleChange = (field, value) => {
    updateActiveResume({
      personalInfo: {
        ...personalInfo,
        [field]: value
      }
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        addToast('La imagen debe pesar menos de 2MB', 'info')
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        handleChange('avatar', event.target.result)
        addToast('Foto de perfil actualizada', 'success')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAiBio = () => {
    const roles = personalInfo.headline || 'Profesional multidisciplinar'
    const generated = `Especialista apasionado con sólida trayectoria en ${roles}. Experiencia demostrada en la consecución de objetivos estratégicos, liderazgo colaborativo y aplicación de metodologías ágiles para maximizar el valor del negocio.`
    handleChange('summary', generated)
    addToast('¡Resumen profesional generado con IA!', 'success')
  }

  return (
    <div id="section-personal" className={`form-section ${!isOpen ? 'collapsed' : ''}`}>
      {/* Cabecera del acordeón */}
      <div className="form-section-header" onClick={onToggle}>
        <div className="section-title-group">
          <div className="section-icon-box">
            <User size={18} />
          </div>
          <div>
            <h3 className="section-title-text">Datos Personales</h3>
            <p className="section-subtitle-text">Información de contacto y cabecera</p>
          </div>
        </div>
        <div className="section-header-meta">
          <span className="section-count-badge">
            {personalInfo.fullName ? 'Completado' : 'Pendiente'}
          </span>
          <ChevronDown size={18} className="section-chevron" />
        </div>
      </div>

      {/* Contenedor con animación fluida CSS Grid */}
      <div className="form-section-content">
        <div className="form-section-body-wrapper">
          <div className="form-section-body">
            {/* Subida de foto de perfil */}
            <div className="avatar-upload-box">
              {personalInfo.avatar ? (
                <img src={personalInfo.avatar} alt="Avatar preview" className="avatar-preview" />
              ) : (
                <div className="avatar-placeholder">
                  <Camera size={26} />
                </div>
              )}
              <div className="avatar-upload-info">
                <span style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--text-primary)' }}>Foto de Perfil</span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>PNG o JPG (Máx. 2MB). Relación 1:1 recomendada.</span>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                    <Upload size={13} />
                    <span>Subir imagen</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>
                  {personalInfo.avatar && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleChange('avatar', '')}
                    >
                      Quitar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Nombre y Cargo */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Nombre Completo *</label>
                <input
                  type="text"
                  className="form-input"
                  value={personalInfo.fullName || ''}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Ej. Alex Vance"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Puesto o Titular *</label>
                <input
                  type="text"
                  className="form-input"
                  value={personalInfo.headline || ''}
                  onChange={(e) => handleChange('headline', e.target.value)}
                  placeholder="Ej. Senior Full Stack Engineer"
                />
              </div>
            </div>

            {/* Email y Teléfono */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email de Contacto</label>
                <input
                  type="email"
                  className="form-input"
                  value={personalInfo.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="alex@ejemplo.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Teléfono Móvil</label>
                <input
                  type="tel"
                  className="form-input"
                  value={personalInfo.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+34 612 345 678"
                />
              </div>
            </div>

            {/* Ubicación y Sitio Web */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Ciudad / País</label>
                <input
                  type="text"
                  className="form-input"
                  value={personalInfo.location || ''}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Madrid, España"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Sitio Web / Portfolio</label>
                <input
                  type="text"
                  className="form-input"
                  value={personalInfo.website || ''}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="https://tudominio.dev"
                />
              </div>
            </div>

            {/* Redes: LinkedIn y GitHub */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Perfil de LinkedIn</label>
                <input
                  type="text"
                  className="form-input"
                  value={personalInfo.linkedin || ''}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/usuario"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Perfil de GitHub</label>
                <input
                  type="text"
                  className="form-input"
                  value={personalInfo.github || ''}
                  onChange={(e) => handleChange('github', e.target.value)}
                  placeholder="github.com/usuario"
                />
              </div>
            </div>

            {/* Resumen / Biografía con botón de IA */}
            <div className="form-group">
              <div className="form-label">
                <span>Resumen Profesional / Perfil</span>
                <button type="button" className="btn-ai-assist" onClick={handleAiBio}>
                  <Sparkles size={12} /> Redactar con IA
                </button>
              </div>
              <textarea
                className="form-textarea"
                rows="3"
                value={personalInfo.summary || ''}
                onChange={(e) => handleChange('summary', e.target.value)}
                placeholder="Breve descripción de tus mayores fortalezas, años de experiencia y metas profesionales..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
