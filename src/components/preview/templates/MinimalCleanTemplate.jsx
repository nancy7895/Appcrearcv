import React from 'react'

export default function MinimalCleanTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages, customSections, accentColor } = data

  const renderBulletPoints = (text) => {
    if (!text) return null
    return text.split('\n').filter(Boolean).map((line, idx) => (
      <li key={idx} style={{ marginBottom: '3px' }}>{line.replace(/^•\s*/, '')}</li>
    ))
  }

  const contacts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website ? personalInfo.website.replace(/^https?:\/\//, '') : null,
    personalInfo.linkedin,
    personalInfo.github
  ].filter(Boolean)

  return (
    <div className="tpl-minimal-clean">
      {/* Header */}
      <header className="minimal-header">
        <h1 className="minimal-name">{personalInfo.fullName || 'Tu Nombre'}</h1>
        <p className="minimal-headline">{personalInfo.headline || 'Tu Puesto Profesional'}</p>
        <div className="minimal-contacts">
          {contacts.map((c, i) => (
            <span key={i}>
              {c} {i < contacts.length - 1 && ' | '}
            </span>
          ))}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="tpl-section">
          <h2 className="minimal-section-title" style={{ borderColor: accentColor }}>Perfil</h2>
          <p style={{ color: '#1e293b', fontSize: '9pt', lineHeight: '1.45' }}>{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="tpl-section">
          <h2 className="minimal-section-title" style={{ borderColor: accentColor }}>Experiencia Profesional</h2>
          {experience.map(exp => (
            <div key={exp.id} className="minimal-item">
              <div className="minimal-item-top">
                <span>{exp.role}</span>
                <span>{exp.startDate} – {exp.current ? 'Presente' : exp.endDate}</span>
              </div>
              <div className="minimal-item-sub">
                <span>{exp.company}</span>
                {exp.location && <span>{exp.location}</span>}
              </div>
              <ul style={{ paddingLeft: '1.2rem', marginTop: '4px', color: '#334155', fontSize: '8.8pt' }}>
                {renderBulletPoints(exp.description)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="tpl-section">
          <h2 className="minimal-section-title" style={{ borderColor: accentColor }}>Educación</h2>
          {education.map(edu => (
            <div key={edu.id} className="minimal-item">
              <div className="minimal-item-top">
                <span>{edu.degree}</span>
                <span>{edu.startDate} – {edu.endDate}</span>
              </div>
              <div className="minimal-item-sub">
                <span>{edu.institution}</span>
                {edu.location && <span>{edu.location}</span>}
              </div>
              {edu.honors && <p style={{ fontSize: '8.5pt', color: '#64748b' }}>{edu.honors}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="tpl-section">
          <h2 className="minimal-section-title" style={{ borderColor: accentColor }}>Habilidades</h2>
          <p style={{ fontSize: '9pt', color: '#1e293b', lineHeight: '1.5' }}>
            {skills.map(s => s.name).join(' • ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="tpl-section">
          <h2 className="minimal-section-title" style={{ borderColor: accentColor }}>Proyectos</h2>
          {projects.map(prj => (
            <div key={prj.id} className="minimal-item">
              <div className="minimal-item-top">
                <span><strong>{prj.name}</strong> {prj.role && `– ${prj.role}`}</span>
                {prj.link && <span style={{ fontSize: '8pt', color: '#475569' }}>{prj.link.replace(/^https?:\/\//, '')}</span>}
              </div>
              {prj.techStack && <p style={{ fontSize: '8pt', color: '#64748b' }}>Stack: {prj.techStack}</p>}
              {prj.description && <p style={{ fontSize: '8.5pt', color: '#334155' }}>{prj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Certifications & Languages */}
      {(certifications?.length > 0 || languages?.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {certifications?.length > 0 && (
            <section className="tpl-section">
              <h2 className="minimal-section-title" style={{ borderColor: accentColor }}>Certificaciones</h2>
              {certifications.map(c => (
                <div key={c.id} style={{ fontSize: '8.5pt', marginBottom: '3px' }}>
                  <strong>{c.name}</strong> ({c.issuer}, {c.date})
                </div>
              ))}
            </section>
          )}
          {languages?.length > 0 && (
            <section className="tpl-section">
              <h2 className="minimal-section-title" style={{ borderColor: accentColor }}>Idiomas</h2>
              {languages.map(l => (
                <div key={l.id} style={{ fontSize: '8.5pt', marginBottom: '3px' }}>
                  <strong>{l.language}</strong>: {l.level}
                </div>
              ))}
            </section>
          )}
        </div>
      )}

      {/* Custom Sections */}
      {customSections && customSections.map(cs => (
        <section key={cs.id} className="tpl-section">
          <h2 className="minimal-section-title" style={{ borderColor: accentColor }}>{cs.title}</h2>
          <p style={{ color: '#1e293b', fontSize: '9pt', lineHeight: '1.45' }}>{cs.content}</p>
        </section>
      ))}
    </div>
  )
}
