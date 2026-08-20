// =============================================================================
// VISTA DEL EDITOR DE CV (EditorView.jsx)
// =============================================================================
// Este componente organiza la pantalla de trabajo principal en dos columnas:
// 1. Columna Izquierda (<aside>): Panel de formularios y acordeones donde escribes
//    tus datos personales, experiencia laboral, habilidades, etc.
// 2. Columna Derecha (<main>): Hoja en tiempo real (Canvas) y barra de herramientas
//    para descargar el PDF, cambiar colores y hacer zoom.

import React, { useState, useRef } from 'react'

// Sub-componentes del editor:
import SidebarHeader from './SidebarHeader'
import SectionNav from './SectionNav'
import AtsScoreMeter from './AtsScoreMeter'
import CanvasToolbar from './CanvasToolbar'
import ResumeCanvas from '../preview/ResumeCanvas'

// Componentes de cada sección del formulario:
import PersonalInfoSection from './sections/PersonalInfoSection'
import ExperienceSection from './sections/ExperienceSection'
import EducationSection from './sections/EducationSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import LanguagesSection from './sections/LanguagesSection'
import CertificationsSection from './sections/CertificationsSection'
import CustomSection from './sections/CustomSection'

export default function EditorView() {
  // `useRef`: Es como una "etiqueta o puntero directo" hacia el elemento HTML de la hoja.
  // Lo necesitamos para que la biblioteca jsPDF/html2canvas sepa exactamente qué parte
  // de la pantalla debe capturar y convertir a archivo PDF.
  const printRef = useRef(null)

  // 'activeSection': Guarda qué pestaña de navegación rápida está seleccionada
  const [activeSection, setActiveSection] = useState('personal')

  // 'openSections': Controla qué tarjetas/acordeones de formulario están abiertos o plegados
  const [openSections, setOpenSections] = useState({
    personal: true,
    experience: true,
    education: true,
    skills: true,
    projects: false,
    languages: false,
    certifications: false,
    custom: false
  })

  // Función para abrir o cerrar un acordeón al hacer clic en su cabecera
  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey] // Invierte el valor (de abierto a cerrado o viceversa)
    }))
  }

  return (
    <div className="editor-layout">
      {/* =================================================================== */}
      {/* PANEL IZQUIERDO: FORMULARIOS DE ENTRADA                            */}
      {/* =================================================================== */}
      <aside className="editor-sidebar">
        {/* Cabecera del panel: Título del CV actual y selector rápido de plantillas */}
        <SidebarHeader />

        {/* Barra de pestañas horizontales para saltar rápidamente a cualquier sección */}
        <SectionNav
          activeSection={activeSection}
          onSelectSection={(id) => {
            setActiveSection(id)
            setOpenSections(prev => ({ ...prev, [id]: true }))
          }}
        />

        {/* Lista desplegable con todas las secciones de información */}
        <div className="editor-form-scroll">
          {/* Medidor en tiempo real de puntuación ATS (optimización para reclutadores) */}
          <AtsScoreMeter />

          {/* Cada una de estas secciones recibe "props" (parámetros):
              - isOpen: si la tarjeta está desplegada
              - onToggle: qué función ejecutar cuando el usuario hace clic en el título */}
          <PersonalInfoSection
            isOpen={openSections.personal}
            onToggle={() => toggleSection('personal')}
          />

          <ExperienceSection
            isOpen={openSections.experience}
            onToggle={() => toggleSection('experience')}
          />

          <EducationSection
            isOpen={openSections.education}
            onToggle={() => toggleSection('education')}
          />

          <SkillsSection
            isOpen={openSections.skills}
            onToggle={() => toggleSection('skills')}
          />

          <ProjectsSection
            isOpen={openSections.projects}
            onToggle={() => toggleSection('projects')}
          />

          <LanguagesSection
            isOpen={openSections.languages}
            onToggle={() => toggleSection('languages')}
          />

          <CertificationsSection
            isOpen={openSections.certifications}
            onToggle={() => toggleSection('certifications')}
          />

          <CustomSection
            isOpen={openSections.custom}
            onToggle={() => toggleSection('custom')}
          />
        </div>
      </aside>

      {/* =================================================================== */}
      {/* PANEL DERECHO: VISTA PREVIA EN VIVO Y HERRAMIENTAS                 */}
      {/* =================================================================== */}
      <main className="editor-preview-container">
        {/* Barra flotante superior: Zoom, Colores, Fuente y Botón de Descargar PDF */}
        <CanvasToolbar printRef={printRef} />

        {/* El contenedor con scroll donde flota la hoja de papel A4 */}
        <div className="canvas-viewport">
          <ResumeCanvas printRef={printRef} />
        </div>
      </main>
    </div>
  )
}

