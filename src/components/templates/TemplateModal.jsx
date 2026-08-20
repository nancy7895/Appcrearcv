import React from 'react'
import { X, Check, Sparkles, Layout } from 'lucide-react'
import ResumeCanvas from '../preview/ResumeCanvas'
import { useResume } from '../../context/ResumeContext'
import { COLOR_PALETTES } from '../../data/templateDefinitions'

export default function TemplateModal({ template, onClose, onSelectTemplate }) {
  const { activeResume } = useResume()

  if (!template) return null

  const previewData = {
    ...activeResume,
    templateId: template.id,
    accentColor: template.recommendedColor || activeResume.accentColor,
    fontFamily: template.recommendedFont || activeResume.fontFamily
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '850px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{template.name}</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{template.description}</p>
          </div>
          <button className="btn-icon" onClick={onClose} title="Cerrar">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '1rem', background: 'var(--bg-primary)' }}>
          <div className="template-modal-preview-box">
            <ResumeCanvas customData={previewData} customScale={0.68} />
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              Compatibilidad ATS:
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
              {template.atsScore}%
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                onSelectTemplate(template.id)
                onClose()
              }}
            >
              <Check size={16} /> Usar esta plantilla
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
