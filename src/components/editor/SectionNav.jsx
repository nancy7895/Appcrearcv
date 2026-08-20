import React from 'react'
import { User, Briefcase, GraduationCap, Wrench, FolderGit2, Languages, PlusCircle, Award } from 'lucide-react'

export default function SectionNav({ activeSection, onSelectSection }) {
  const sections = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'experience', label: 'Experiencia', icon: Briefcase },
    { id: 'education', label: 'Educación', icon: GraduationCap },
    { id: 'skills', label: 'Habilidades', icon: Wrench },
    { id: 'projects', label: 'Proyectos', icon: FolderGit2 },
    { id: 'languages', label: 'Idiomas', icon: Languages },
    { id: 'certifications', label: 'Certificaciones', icon: Award }
  ]

  const handleClick = (id) => {
    onSelectSection(id)
    const element = document.getElementById(`section-${id}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="section-nav-wrapper">
      {sections.map(s => {
        const Icon = s.icon
        return (
          <button
            key={s.id}
            className={`section-pill ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => handleClick(s.id)}
          >
            <Icon size={13} />
            <span>{s.label}</span>
          </button>
        )
      })}
    </div>
  )
}
