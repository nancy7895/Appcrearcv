// =============================================================================
// GALERÍA DE PLANTILLAS (TemplatesView.jsx)
// =============================================================================
// Esta pantalla muestra una vitrina con los diferentes estilos visuales de CV:
// 1. Permite filtrar por categorías (Modernas, Minimalistas, Ejecutivas, etc.).
// 2. Muestra miniaturas dinámicas en vivo con los datos reales del usuario.
// 3. Permite abrir una ventana emergente (Modal) con vista previa a pantalla completa
//    o aplicar la plantilla al CV actual con un solo clic.

import React, { useState } from 'react'
import { Eye, Check, Sparkles, Filter, ShieldCheck } from 'lucide-react'
import { TEMPLATES } from '../../data/templateDefinitions'
import { useResume } from '../../context/ResumeContext'
import ResumeCanvas from '../preview/ResumeCanvas'
import TemplateModal from './TemplateModal'

export default function TemplatesView() {
  const { activeResume, updateActiveResume, setActiveTab, addToast } = useResume()
  // 'selectedCategory': Almacena la categoría de filtro seleccionada ('all', 'modern', etc.)
  const [selectedCategory, setSelectedCategory] = useState('all')
  // 'modalTemplate': Guarda la plantilla que se está inspeccionando en pantalla completa
  const [modalTemplate, setModalTemplate] = useState(null)

  const categories = [
    { id: 'all', label: 'Todas las Plantillas' },
    { id: 'modern', label: 'Modernas' },
    { id: 'minimal', label: 'Minimalistas / ATS' },
    { id: 'executive', label: 'Ejecutivas' },
    { id: 'technical', label: 'Tech & Código' },
    { id: 'creative', label: 'Creativas' }
  ]

  // Filtramos la lista de plantillas según la categoría activa
  const filteredTemplates = selectedCategory === 'all'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === selectedCategory)

  // Función para aplicar la plantilla seleccionada y volver al editor
  const handleSelectTemplate = (templateId) => {
    updateActiveResume({ templateId })
    setActiveTab('editor')
    addToast('Plantilla aplicada a tu currículum actual', 'success')
  }

  return (
    <div className="templates-view-container">
      {/* 1. Título y descripción de la galería */}
      <div className="templates-hero">
        <h1>Galería de Plantillas Profesionales</h1>
        <p>Diseños probados y optimizados para destacar ante reclutadores y superar filtros automáticos ATS.</p>
      </div>

      {/* 2. Botones de Filtro por Categorías */}
      <div className="template-categories-bar">
        {categories.map(c => (
          <button
            key={c.id}
            className={`category-chip ${selectedCategory === c.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* 3. Cuadrícula de Plantillas */}
      <div className="templates-grid">
        {filteredTemplates.map(tpl => {
          const isCurrentActive = activeResume.templateId === tpl.id
          // Generamos una copia de los datos del usuario con los estilos recomendados de la plantilla para la miniatura
          const previewData = {
            ...activeResume,
            templateId: tpl.id,
            accentColor: tpl.recommendedColor || activeResume.accentColor,
            fontFamily: tpl.recommendedFont || activeResume.fontFamily
          }

          return (
            <div key={tpl.id} className="template-card">
              {tpl.badge && <span className="template-card-badge">{tpl.badge}</span>}

              {/* Caja de Miniatura con escala reducida (0.36 = 36% del tamaño real) */}
              <div className="template-card-preview">
                <div className="template-card-preview-inner">
                  <ResumeCanvas customData={previewData} customScale={0.36} />
                </div>

                {/* Botones que aparecen al pasar el ratón por encima (Hover) */}
                <div className="template-card-overlay">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSelectTemplate(tpl.id)}
                  >
                    <Check size={16} /> {isCurrentActive ? 'Plantilla en uso' : 'Usar esta plantilla'}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setModalTemplate(tpl)}
                  >
                    <Eye size={16} /> Vista Previa
                  </button>
                </div>
              </div>

              {/* Información y Etiquetas de la Plantilla */}
              <div className="template-card-body">
                <div className="template-name-row">
                  <span className="template-name">{tpl.name}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <ShieldCheck size={14} /> {tpl.atsScore}% ATS
                  </span>
                </div>

                <p className="template-desc">{tpl.description}</p>

                <div className="template-tags">
                  {tpl.tags.map((tag, idx) => (
                    <span key={idx} className="template-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 4. Ventana Modal Emergente de Vista Previa Grande */}
      {modalTemplate && (
        <TemplateModal
          template={modalTemplate}
          onClose={() => setModalTemplate(null)}
          onSelectTemplate={handleSelectTemplate}
        />
      )}
    </div>
  )
}

