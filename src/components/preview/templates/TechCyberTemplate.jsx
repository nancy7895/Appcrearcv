import React from 'react'

export default function TechCyberTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages, customSections, accentColor } = data

  const renderBulletPoints = (text) => {
    if (!text) return null
    return text.split('\n').filter(Boolean).map((line, idx) => (
      <li key={idx} style={{ marginBottom: '3px' }}>{line.replace(/^•\s*/, '')}</li>
    ))
  }

  return (
    <div className="tpl-tech-cyber">
      {/* Tech Dark Block Header */}
      <header className="tech-header" style={{ borderLeftColor: accentColor }}>
        <div>
          <h1 className="tech-name">{personalInfo.fullName || 'dev_user'}</h1>
          <p className="tech-headline" style={{ color: accentColor }}>// {personalInfo.headline || 'FullStack Engineer'}</p>
        </div>
        <div className="tech-contacts">
          {personalInfo.email && <span>email: {personalInfo.email}</span>}
          {personalInfo.github && <span>github: {personalInfo.github}</span>}
          {personalInfo.website && <span>web: {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.location && <span>loc: {personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="tpl-section">
          <h2 className="tech-section-title">about_me</h2>
          <p style={{ color: '#334155', fontSize: '8.8pt', lineHeight: '1.5' }}>{personalInfo.summary}</p>
        </section>
      )}

      {/* Skills Matrix */}
      {skills && skills.length > 0 && (
        <section className="tpl-section">
          <h2 className="tech-section-title">tech_stack & skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {skills.map(sk => (
              <span key={sk.id} className="tech-tag" style={{ borderLeft: `2px solid ${accentColor}` }}>
                {sk.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="tpl-section">
          <h2 className="tech-section-title">experience_log</h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '9.5pt' }}>
                  {exp.role} <span style={{ color: accentColor }}>@</span> {exp.company}
                </span>
                <span style={{ fontSize: '8pt', color: '#64748b', fontFamily: 'Fira Code, monospace' }}>
                  [{exp.startDate} :: {exp.current ? 'NOW' : exp.endDate}]
                </span>
              </div>
              <ul style={{ paddingLeft: '1rem', marginTop: '4px', color: '#334155', fontSize: '8.8pt' }}>
                {renderBulletPoints(exp.description)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="tpl-section">
          <h2 className="tech-section-title">featured_projects</h2>
          {projects.map(prj => (
            <div key={prj.id} style={{ marginBottom: '0.75rem', padding: '6px 8px', background: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{prj.name}</strong>
                {prj.link && <span style={{ fontSize: '7.5pt', color: accentColor, fontFamily: 'Fira Code, monospace' }}>{prj.link}</span>}
              </div>
              {prj.techStack && <div style={{ fontSize: '7.8pt', color: '#64748b', fontWeight: '600', margin: '2px 0' }}>stack: {prj.techStack}</div>}
              {prj.description && <p style={{ fontSize: '8.5pt', color: '#334155' }}>{prj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Education & Certs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {education && education.length > 0 && (
          <section className="tpl-section">
            <h2 className="tech-section-title">education</h2>
            {education.map(edu => (
              <div key={edu.id} style={{ fontSize: '8.5pt', marginBottom: '4px' }}>
                <strong>{edu.degree}</strong>
                <div style={{ color: '#64748b' }}>{edu.institution} ({edu.startDate}-{edu.endDate})</div>
              </div>
            ))}
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section className="tpl-section">
            <h2 className="tech-section-title">certifications</h2>
            {certifications.map(c => (
              <div key={c.id} style={{ fontSize: '8.5pt', marginBottom: '4px' }}>
                <strong>{c.name}</strong>
                <div style={{ color: '#64748b' }}>{c.issuer}</div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Custom Sections */}
      {customSections && customSections.map(cs => (
        <section key={cs.id} className="tpl-section">
          <h2 className="tech-section-title">{cs.title.toLowerCase().replace(/\s+/g, '_')}</h2>
          <p style={{ color: '#334155', fontSize: '8.8pt', lineHeight: '1.5' }}>{cs.content}</p>
        </section>
      ))}
    </div>
  )
}
