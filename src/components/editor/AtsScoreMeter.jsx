// =============================================================================
// MEDIDOR DE CALIDAD Y PUNTUACIÓN ATS (AtsScoreMeter.jsx)
// =============================================================================
// ¿Qué es ATS (Applicant Tracking System)?
// Son los sistemas informáticos automáticos que usan las empresas para escanear y
// filtrar currículums antes de que lleguen a manos de una persona.
//
// Este componente evalúa en tiempo real qué tan completo está el CV y calcula
// una nota del 0 al 100%, dando consejos automáticos para mejorar la calidad.

import React from 'react'
import { ShieldCheck, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'

export default function AtsScoreMeter() {
  const { activeResume } = useResume()
  const { personalInfo, experience, education, skills, projects } = activeResume

  // Lista de comprobaciones automáticas con sus puntos asignados:
  const checks = [
    { label: 'Información de contacto completa (Email, Teléfono, Ubicación)', passed: !!(personalInfo?.email && personalInfo?.phone && personalInfo?.location), points: 20 },
    { label: 'Resumen profesional persuasivo (> 80 caracteres)', passed: !!(personalInfo?.summary && personalInfo.summary.length > 80), points: 20 },
    { label: 'Al menos una experiencia laboral detallada', passed: !!(experience && experience.length > 0 && experience[0].description?.length > 30), points: 25 },
    { label: '4 o más habilidades y tecnologías clave', passed: !!(skills && skills.length >= 4), points: 20 },
    { label: 'Formación académica registrada', passed: !!(education && education.length > 0), points: 15 }
  ]

  // Suma los puntos de todas las comprobaciones que hayan pasado
  const score = checks.reduce((acc, c) => (c.passed ? acc + c.points : acc), 0)

  // Asigna un color dinámico según la puntuación:
  // - Verde (>= 85%): Excelente
  // - Ámbar (>= 60%): Aceptable
  // - Rojo (< 60%): Incompleto
  let scoreClass = 'low'
  let progressColor = 'var(--accent-rose)'
  if (score >= 85) {
    scoreClass = 'high'
    progressColor = 'var(--accent-emerald)'
  } else if (score >= 60) {
    scoreClass = 'medium'
    progressColor = 'var(--accent-amber)'
  }

  // Filtramos cuáles comprobaciones faltan por cumplir para mostrarlas como sugerencias
  const missingChecks = checks.filter(c => !c.passed)

  return (
    <div className="ats-meter-card">
      {/* Cabecera de la tarjeta con el porcentaje actual */}
      <div className="ats-meter-header">
        <div className="ats-meter-title">
          <ShieldCheck size={17} style={{ color: progressColor }} />
          <span>Optimizador de Calidad ATS</span>
        </div>
        <span className={`ats-score-pill ${scoreClass}`}>
          {score}% ATS Score
        </span>
      </div>

      {/* Barra de progreso visual */}
      <div className="ats-progress-bar">
        <div
          className="ats-progress-fill"
          style={{
            width: `${score}%`,
            backgroundColor: progressColor
          }}
        />
      </div>

      {/* Lista de consejos o mensaje de éxito */}
      {missingChecks.length > 0 ? (
        <div className="ats-tips-list">
          <span style={{ fontWeight: '700', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} style={{ color: 'var(--accent-primary)' }} /> Recomendaciones para mejorar:
          </span>
          {missingChecks.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
              <AlertCircle size={12} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)', fontSize: '0.78rem', fontWeight: '600' }}>
          <CheckCircle2 size={14} /> ¡Tu currículum cumple con todos los estándares óptimos de lectura ATS!
        </div>
      )}
    </div>
  )
}

