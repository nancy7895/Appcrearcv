// =============================================================================
// LIENZO DE LA HOJA DE CURRÍCULUM (ResumeCanvas.jsx)
// =============================================================================
// ¿Qué hace este componente?
// 1. Representa físicamente una "hoja de papel A4" en la pantalla.
// 2. Lee qué plantilla eligió el usuario (Modern, Minimalist, Executive, Tech, etc.)
//    y muestra el componente visual correspondiente.
// 3. Aplica dinámicamente el color de acento, la tipografía seleccionada y el nivel de zoom.

import React from 'react'
import { useResume } from '../../context/ResumeContext'

// Importamos las 5 plantillas de diseño disponibles:
import ModernAuraTemplate from './templates/ModernAuraTemplate'
import MinimalCleanTemplate from './templates/MinimalCleanTemplate'
import ExecutiveTemplate from './templates/ExecutiveTemplate'
import TechCyberTemplate from './templates/TechCyberTemplate'
import SplitSidebarTemplate from './templates/SplitSidebarTemplate'

export default function ResumeCanvas({ printRef, customData = null, customScale = null }) {
  // Obtenemos los datos del CV actual y el factor de zoom desde el contexto
  const { activeResume, zoomScale } = useResume()

  // Si pasamos datos personalizados (por ejemplo, en la galería de plantillas para previsualizar), los usamos
  const data = customData || activeResume
  const currentScale = customScale !== null ? customScale : zoomScale

  // Función que decide qué diseño visual renderizar según 'data.templateId'
  const renderTemplate = () => {
    switch (data.templateId) {
      case 'minimal-clean':
        return <MinimalCleanTemplate data={data} />
      case 'executive':
        return <ExecutiveTemplate data={data} />
      case 'tech-cyber':
        return <TechCyberTemplate data={data} />
      case 'split-sidebar':
        return <SplitSidebarTemplate data={data} />
      case 'modern-aura':
      default:
        return <ModernAuraTemplate data={data} />
    }
  }

  // Mapeo de la fuente tipográfica seleccionada a su regla de CSS
  const fontFamilyStyle = {
    'Plus Jakarta Sans': "'Plus Jakarta Sans', sans-serif",
    'Inter': "'Inter', sans-serif",
    'Outfit': "'Outfit', sans-serif",
    'Playfair Display': "'Playfair Display', serif",
    'Fira Code': "'Fira Code', monospace"
  }[data.fontFamily] || "'Plus Jakarta Sans', sans-serif"

  return (
    // 'resume-paper-wrapper' aplica la escala de zoom usando CSS transform: scale(...)
    <div
      className="resume-paper-wrapper"
      style={{
        transform: `scale(${currentScale})`
      }}
    >
      {/* 'resume-paper': Este div tiene las proporciones exactas de una hoja A4 (210mm x 297mm).
          La propiedad ref={printRef} permite a la función de exportar a PDF capturar este elemento exacto. */}
      <div
        id="resume-to-print"
        ref={printRef}
        className={`resume-paper density-${data.density || 'normal'}`}
        style={{
          fontFamily: fontFamilyStyle,
          '--cv-accent': data.accentColor || '#6366f1' // Variable CSS para el color de acento
        }}
      >
        {/* Aquí se dibuja la plantilla seleccionada */}
        {renderTemplate()}
      </div>
    </div>
  )
}

