// =============================================================================
// PLANTILLA: MODERN AURA (ModernAuraTemplate.jsx)
// =============================================================================
// ¿Cómo transforma React los datos en una plantilla visual?
// Este componente recibe un objeto llamado `data` (que contiene todo lo escrito por el usuario).
// Utiliza:
// 1. `destructuring` (desempaquetado): Extrae `personalInfo`, `experience`, `skills`, etc.
// 2. `Array.map()`: Recorre cada elemento de una lista (por ejemplo, cada trabajo en la experiencia)
//    y devuelve el bloque de HTML correspondiente para cada uno.
// 3. Renderizado condicional con `&&`: Si un dato no existe (por ejemplo, el usuario no puso LinkedIn),
//    React simplemente no dibuja ese icono, manteniendo el diseño limpio sin huecos raros.

import React from 'react'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'

// 'data' es una "prop" (propiedad/parámetro) que contiene la información completa del CV
export default function ModernAuraTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages, customSections, accentColor } = data

  // Función auxiliar: Convierte un texto con saltos de línea en una lista de viñetas <li>
  const renderBulletPoints = (text) => {
    if (!text) return null
    return text.split('\n').filter(Boolean).map((line, idx) => (
      <li key={idx}>{line.replace(/^•\s*/, '')}</li>
    ))
  }

  return (
    <div className="tpl-modern-aura">
      {/* ----------------------------------------------------------------- */}
      {/* 1. CABECERA: Nombre, Titular, Contactos y Foto                    */}
      {/* ----------------------------------------------------------------- */}
      <header className="modern-header" style={{ borderBottomColor: accentColor }}>
        <div className="modern-header-left">
          <h1 className="modern-name">{personalInfo.fullName || 'Tu Nombre'}</h1>
          <p className="modern-headline" style={{ color: accentColor }}>
            {personalInfo.headline || 'Tu Puesto Profesional'}
          </p>
          
          {/* Fila de contactos: Solo se muestran los que el usuario haya rellenado */}
          <div className="modern-contacts">
            {personalInfo.email && (
              <span className="modern-contact-item">
                <Mail size={12} style={{ color: accentColor }} /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="modern-contact-item">
                <Phone size={12} style={{ color: accentColor }} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="modern-contact-item">
                <MapPin size={12} style={{ color: accentColor }} /> {personalInfo.location}
              </span>
            )}
            {personalInfo.website && (
              <span className="modern-contact-item">
                <Globe size={12} style={{ color: accentColor }} /> {personalInfo.website.replace(/^https?:\/\//, '')}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="modern-contact-item">
                <Linkedin size={12} style={{ color: accentColor }} /> {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.github && (
              <span className="modern-contact-item">
                <Github size={12} style={{ color: accentColor }} /> {personalInfo.github}
              </span>
            )}
          </div>
        </div>

        {/* Foto de perfil (si existe) */}
        {personalInfo.avatar && (
          <img src={personalInfo.avatar} alt={personalInfo.fullName} className="modern-avatar" style={{ borderColor: accentColor }} />
        )}
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* 2. RESUMEN PROFESIONAL                                            */}
      {/* ----------------------------------------------------------------- */}
      {personalInfo.summary && (
        <section className="tpl-section">
          <h2 className="modern-section-title">Perfil Profesional</h2>
          <p style={{ color: '#334155', fontSize: '9pt', lineHeight: '1.5' }}>{personalInfo.summary}</p>
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 3. EXPERIENCIA LABORAL (Mapeo de Array)                           */}
      {/* ----------------------------------------------------------------- */}
      {experience && experience.length > 0 && (
        <section className="tpl-section">
          <h2 className="modern-section-title">Experiencia Laboral</h2>
          {/* Recorremos cada puesto de trabajo con .map(...) */}
          {experience.map(exp => (
            <div key={exp.id} className="modern-item">
              <div className="modern-item-header">
                <div>
                  <span className="modern-item-title">{exp.role}</span>
                  <span className="modern-item-subtitle"> · {exp.company}</span>
                  {exp.location && <span style={{ color: '#64748b', fontSize: '8.5pt' }}> ({exp.location})</span>}
                </div>
                <span className="modern-item-date">
                  {exp.startDate} – {exp.current ? 'Presente' : exp.endDate}
                </span>
              </div>
              <ul className="modern-bullets">
                {renderBulletPoints(exp.description)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 4. EDUCACIÓN Y FORMACIÓN                                          */}
      {/* ----------------------------------------------------------------- */}
      {education && education.length > 0 && (
        <section className="tpl-section">
          <h2 className="modern-section-title">Educación</h2>
          {education.map(edu => (
            <div key={edu.id} className="modern-item">
              <div className="modern-item-header">
                <div>
                  <span className="modern-item-title">{edu.degree}</span>
                  <span className="modern-item-subtitle"> · {edu.institution}</span>
                </div>
                <span className="modern-item-date">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              {edu.honors && <p style={{ fontSize: '8.5pt', color: '#64748b', marginTop: '2px' }}>{edu.honors}</p>}
            </div>
          ))}
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 5. HABILIDADES (Píldoras o Badges)                                 */}
      {/* ----------------------------------------------------------------- */}
      {skills && skills.length > 0 && (
        <section className="tpl-section">
          <h2 className="modern-section-title">Habilidades & Competencias</h2>
          <div className="modern-skills-grid">
            {skills.map(sk => (
              <span key={sk.id} className="modern-skill-pill">
                {sk.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 6. PROYECTOS DESTACADOS                                           */}
      {/* ----------------------------------------------------------------- */}
      {projects && projects.length > 0 && (
        <section className="tpl-section">
          <h2 className="modern-section-title">Proyectos Destacados</h2>
          {projects.map(prj => (
            <div key={prj.id} className="modern-item">
              <div className="modern-item-header">
                <div>
                  <span className="modern-item-title">{prj.name}</span>
                  {prj.role && <span className="modern-item-subtitle"> · {prj.role}</span>}
                </div>
                {prj.link && (
                  <span style={{ fontSize: '8pt', color: accentColor }}>{prj.link.replace(/^https?:\/\//, '')}</span>
                )}
              </div>
              {prj.techStack && (
                <p style={{ fontSize: '8pt', color: '#64748b', fontWeight: '600', marginBottom: '2px' }}>
                  Stack: {prj.techStack}
                </p>
              )}
              {prj.description && <p style={{ fontSize: '8.5pt', color: '#334155' }}>{prj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 7. CERTIFICACIONES E IDIOMAS (Columnas Paralelas)                */}
      {/* ----------------------------------------------------------------- */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {certifications && certifications.length > 0 && (
          <section className="tpl-section">
            <h2 className="modern-section-title">Certificaciones</h2>
            {certifications.map(c => (
              <div key={c.id} style={{ marginBottom: '4px', fontSize: '8.5pt' }}>
                <strong style={{ color: '#0f172a' }}>{c.name}</strong> – {c.issuer} ({c.date})
              </div>
            ))}
          </section>
        )}

        {languages && languages.length > 0 && (
          <section className="tpl-section">
            <h2 className="modern-section-title">Idiomas</h2>
            {languages.map(l => (
              <div key={l.id} style={{ marginBottom: '4px', fontSize: '8.5pt' }}>
                <strong style={{ color: '#0f172a' }}>{l.language}</strong>: {l.level}
              </div>
            ))}
          </section>
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 8. SECCIONES PERSONALIZADAS                                       */}
      {/* ----------------------------------------------------------------- */}
      {customSections && customSections.map(cs => (
        <section key={cs.id} className="tpl-section">
          <h2 className="modern-section-title">{cs.title}</h2>
          <p style={{ color: '#334155', fontSize: '9pt', lineHeight: '1.5' }}>{cs.content}</p>
        </section>
      ))}
    </div>
  )
}

