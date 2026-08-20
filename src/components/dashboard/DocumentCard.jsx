import React from 'react'
import { Edit3, Copy, Trash2, Calendar, ShieldCheck, Download } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import ResumeCanvas from '../preview/ResumeCanvas'

export default function DocumentCard({ resume }) {
  const { activeResumeId, setActiveResumeId, setActiveTab, duplicateResume, deleteResume, addToast } = useResume()
  const isActive = resume.id === activeResumeId

  const handleEdit = () => {
    setActiveResumeId(resume.id)
    setActiveTab('editor')
  }

  const formattedDate = new Date(resume.lastModified || Date.now()).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return (
    <div className={`doc-card ${isActive ? 'active-doc' : ''}`}>
      {/* Mini Preview Box */}
      <div className="doc-card-preview" onClick={handleEdit} style={{ cursor: 'pointer' }}>
        <div className="doc-card-mini-paper">
          <ResumeCanvas customData={resume} customScale={0.21} />
        </div>

        <div className="doc-card-overlay">
          <button className="btn btn-primary btn-sm" onClick={handleEdit}>
            <Edit3 size={14} /> Editar CV
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="doc-card-info">
        <div className="doc-title-row">
          <h3 className="doc-title" title={resume.title}>{resume.title || 'Sin Título'}</h3>
          {isActive && (
            <span style={{ fontSize: '0.68rem', fontWeight: '800', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', padding: '2px 6px', borderRadius: '4px' }}>
              ACTIVO
            </span>
          )}
        </div>

        <div className="doc-meta">
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={12} /> {formattedDate}
          </span>
          <span className="doc-tag">
            {resume.templateId || 'modern-aura'}
          </span>
        </div>

        {/* Actions */}
        <div className="doc-actions-row">
          <button className="btn btn-secondary btn-sm" onClick={handleEdit}>
            <Edit3 size={13} /> Abrir
          </button>

          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              className="btn-icon"
              style={{ width: '32px', height: '32px' }}
              onClick={() => duplicateResume(resume.id)}
              title="Duplicar"
            >
              <Copy size={14} />
            </button>

            <button
              className="btn-icon"
              style={{ width: '32px', height: '32px' }}
              onClick={() => deleteResume(resume.id)}
              title="Eliminar"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
