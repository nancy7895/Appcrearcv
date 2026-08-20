import React from 'react'
import { CheckCircle2, Info, AlertCircle } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'

export default function Toast() {
  const { toasts } = useResume()

  if (!toasts || toasts.length === 0) return null

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast-item ${t.type}`}>
          <div className="toast-icon">
            {t.type === 'success' ? <CheckCircle2 size={18} /> : <Info size={18} />}
          </div>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  )
}
