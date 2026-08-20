import React from 'react'

export default function ExecutiveTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages, customSections, accentColor } = data

  const renderBulletPoints = (text) => {
    if (!text) return null
    return text.split('\n').filter(Boolean).map((line, idx) => (
      <li key={idx} style={{ marginBottom: '4px' }}>{line.replace(/^•\s*/, '')}</li>
    ))
  }

  return (
    <div className="tpl-executive">
      {/* Executive Dark Header */}
      <header className="exec-top-bar" style={{ borderBottom: `4px solid ${accentColor}` }}>
        <h1 className="exec-name">{personalInfo.fullName || 'Tu Nombre'}</h1>
        <p className="exec-headline">{personalInfo.headline || 'Puesto Ejecutivo / Directivo'}</p>
        <div className="exec-contacts">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      <div className="exec-body">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="tpl-section">
            <h2 className="exec-section-title" style={{ borderBottomColor: accentColor }}>Perfil Ejecutivo</h2>
            <p style={{ color: '#334155', fontSize: '9pt', lineHeight: '1.55' }}>{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="tpl-section">
            <h2 className="exec-section-title" style={{ borderBottomColor: accentColor }}>Trayectoria Profesional</h2>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <strong style={{ fontSize: '10pt', color: '#0f172a' }}>{exp.role}</strong>
                    <span style={{ color: '#475569', fontWeight: '600' }}> — {exp.company}</span>
                    {exp.location && <span style={{ color: '#64748b', fontSize: '8.5pt' }}> ({exp.location})</span>}
                  </div>
                  <span style={{ fontSize: '8.5pt', color: '#64748b', fontWeight: '600' }}>
                    {exp.startDate} – {exp.current ? 'Presente' : exp.endDate}
                  </span>
                </div>
                <ul style={{ paddingLeft: '1.2rem', marginTop: '4px', color: '#334155', fontSize: '9pt' }}>
                  {renderBulletPoints(exp.description)}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Education & Certifications */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {education && education.length > 0 && (
            <section className="tpl-section">
              <h2 className="exec-section-title" style={{ borderBottomColor: accentColor }}>Educación</h2>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '6px' }}>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '9pt' }}>{edu.degree}</div>
                  <div style={{ color: '#475569', fontSize: '8.5pt' }}>{edu.institution} ({edu.startDate} - {edu.endDate})</div>
                  {edu.honors && <div style={{ color: '#64748b', fontSize: '8pt' }}>{edu.honors}</div>}
                </div>
              ))}
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section className="tpl-section">
              <h2 className="exec-section-title" style={{ borderBottomColor: accentColor }}>Certificaciones</h2>
              {certifications.map(c => (
                <div key={c.id} style={{ marginBottom: '6px', fontSize: '8.5pt' }}>
                  <strong style={{ color: '#0f172a' }}>{c.name}</strong>
                  <div style={{ color: '#64748b' }}>{c.issuer} · {c.date}</div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="tpl-section">
            <h2 className="exec-section-title" style={{ borderBottomColor: accentColor }}>Competencias Clave</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map(sk => (
                <span key={sk.id} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '3px 8px', borderRadius: '4px', fontSize: '8pt', fontWeight: '600', color: '#1e293b' }}>
                  {sk.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <section className="tpl-section">
            <h2 className="exec-section-title" style={{ borderBottomColor: accentColor }}>Idiomas</h2>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '8.5pt' }}>
              {languages.map(l => (
                <div key={l.id}>
                  <strong>{l.language}</strong>: {l.level}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.map(cs => (
          <section key={cs.id} className="tpl-section">
            <h2 className="exec-section-title" style={{ borderBottomColor: accentColor }}>{cs.title}</h2>
            <p style={{ color: '#334155', fontSize: '9pt', lineHeight: '1.55' }}>{cs.content}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
