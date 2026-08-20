import React from 'react'
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react'

export default function SplitSidebarTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages, customSections, accentColor } = data

  const renderBulletPoints = (text) => {
    if (!text) return null
    return text.split('\n').filter(Boolean).map((line, idx) => (
      <li key={idx} style={{ marginBottom: '3px' }}>{line.replace(/^•\s*/, '')}</li>
    ))
  }

  return (
    <div className="tpl-split-sidebar">
      {/* Dark Sidebar (Left Column) */}
      <aside className="split-sidebar-left" style={{ borderRight: `3px solid ${accentColor}` }}>
        {personalInfo.avatar && (
          <div className="split-avatar-box">
            <img src={personalInfo.avatar} alt={personalInfo.fullName} className="split-avatar" style={{ borderColor: accentColor }} />
          </div>
        )}

        <div>
          <h2 className="split-sidebar-title" style={{ color: accentColor }}>Contacto</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '8pt', color: '#cbd5e1' }}>
            {personalInfo.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', wordBreak: 'break-all' }}>
                <Mail size={12} style={{ color: accentColor, flexShrink: 0 }} /> {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={12} style={{ color: accentColor, flexShrink: 0 }} /> {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={12} style={{ color: accentColor, flexShrink: 0 }} /> {personalInfo.location}
              </div>
            )}
            {personalInfo.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', wordBreak: 'break-all' }}>
                <Globe size={12} style={{ color: accentColor, flexShrink: 0 }} /> {personalInfo.website.replace(/^https?:\/\//, '')}
              </div>
            )}
            {personalInfo.linkedin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', wordBreak: 'break-all' }}>
                <Linkedin size={12} style={{ color: accentColor, flexShrink: 0 }} /> {personalInfo.linkedin}
              </div>
            )}
          </div>
        </div>

        {/* Skills on Sidebar */}
        {skills && skills.length > 0 && (
          <div>
            <h2 className="split-sidebar-title" style={{ color: accentColor }}>Habilidades</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.map(sk => (
                <span key={sk.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 7px', borderRadius: '3px', fontSize: '7.5pt', color: '#f8fafc' }}>
                  {sk.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages on Sidebar */}
        {languages && languages.length > 0 && (
          <div>
            <h2 className="split-sidebar-title" style={{ color: accentColor }}>Idiomas</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '8pt' }}>
              {languages.map(l => (
                <div key={l.id} style={{ color: '#cbd5e1' }}>
                  <strong style={{ color: '#ffffff' }}>{l.language}</strong>: {l.level}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications on Sidebar */}
        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="split-sidebar-title" style={{ color: accentColor }}>Certificaciones</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '7.5pt' }}>
              {certifications.map(c => (
                <div key={c.id} style={{ color: '#cbd5e1' }}>
                  <div style={{ fontWeight: '700', color: '#fff' }}>{c.name}</div>
                  <div style={{ color: '#94a3b8' }}>{c.issuer} ({c.date})</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content (Right Column) */}
      <main className="split-main-right">
        <div>
          <h1 className="split-name">{personalInfo.fullName || 'Tu Nombre'}</h1>
          <p className="split-headline" style={{ color: accentColor }}>{personalInfo.headline || 'Tu Puesto Profesional'}</p>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="tpl-section">
            <h2 className="split-main-title">Perfil</h2>
            <p style={{ color: '#334155', fontSize: '9pt', lineHeight: '1.5' }}>{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="tpl-section">
            <h2 className="split-main-title">Experiencia</h2>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '9.5pt' }}>
                    {exp.role} · {exp.company}
                  </span>
                  <span style={{ fontSize: '8pt', color: '#64748b' }}>
                    {exp.startDate} – {exp.current ? 'Presente' : exp.endDate}
                  </span>
                </div>
                <ul style={{ paddingLeft: '1.1rem', marginTop: '4px', color: '#334155', fontSize: '8.8pt' }}>
                  {renderBulletPoints(exp.description)}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="tpl-section">
            <h2 className="split-main-title">Educación</h2>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ color: '#0f172a', fontSize: '9pt' }}>{edu.degree}</strong>
                  <span style={{ fontSize: '8pt', color: '#64748b' }}>{edu.startDate} – {edu.endDate}</span>
                </div>
                <div style={{ color: '#475569', fontSize: '8.5pt' }}>{edu.institution}</div>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="tpl-section">
            <h2 className="split-main-title">Proyectos</h2>
            {projects.map(prj => (
              <div key={prj.id} style={{ marginBottom: '6px' }}>
                <strong>{prj.name}</strong> {prj.role && <span style={{ color: '#64748b' }}>({prj.role})</span>}
                {prj.description && <p style={{ fontSize: '8.5pt', color: '#334155', marginTop: '2px' }}>{prj.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.map(cs => (
          <section key={cs.id} className="tpl-section">
            <h2 className="split-main-title">{cs.title}</h2>
            <p style={{ color: '#334155', fontSize: '9pt', lineHeight: '1.5' }}>{cs.content}</p>
          </section>
        ))}
      </main>
    </div>
  )
}
