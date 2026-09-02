// =============================================================================
// ALMACÉN GLOBAL DE DATOS DEL CURRÍCULUM (ResumeContext.jsx)
// =============================================================================
// ¿Cómo funciona esto en React?
// Normalmente, en programación web, cuando un usuario escribe en un formulario
// y queremos que el texto aparezca al mismo tiempo en una hoja de vista previa,
// necesitamos un "cerebro central" que guarde esa información y la comparta en tiempo real.
//
// React usa:
// 1. `useState` (Estado / Memoria): Es una variable especial que, cada vez que cambia,
//    hace que la pantalla se vuelva a pintar automáticamente con los nuevos datos.
// 2. `createContext` (Contexto Global): Es como una "nube" o "mochila" compartida.
//    Cualquier botón o vista puede leer o modificar los datos sin pasar cables entre componentes.
// 3. `useEffect` (Efectos secundarios): Código que se ejecuta cuando algo cambia (por ejemplo,
//    guardar en el disco/LocalStorage cada vez que el usuario escribe una letra).

import React, { createContext, useContext, useState, useEffect } from 'react'
import { defaultResumeData, sampleProfiles } from '../data/initialData'
import { getResumesFromApi, saveResumeToApi, deleteResumeFromApi } from '../Services/resumeApi'

// 1. Creamos la caja del Contexto
const ResumeContext = createContext()

// 2. Componente Proveedor: Es el que almacena y gestiona todos los datos
export function ResumeProvider({ children }) {
  // ---------------------------------------------------------------------------
  // ESTADOS (Memoria de la Aplicación)
  // ---------------------------------------------------------------------------

  // 'resumes': Lista de todos los currículums guardados por el usuario.
  // Intentamos leerlos de la memoria del navegador (localStorage) para que no se pierdan al recargar.
  const [resumes, setResumes] = useState(() => {
    try {
      const saved = localStorage.getItem('auracv_resumes')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      console.error('Error cargando los CVs guardados:', e)
    }
    // Si es la primera vez que entra, cargamos un CV con datos de ejemplo predeterminados
    return [defaultResumeData]
  })

  // 'activeResumeId': El identificador (ID) del currículum que el usuario está editando ahora mismo
  const [activeResumeId, setActiveResumeId] = useState(() => {
    const savedId = localStorage.getItem('auracv_active_id')
    return savedId || (resumes[0] ? resumes[0].id : 'cv-default-1')
  })

  // 'activeTab': La pantalla activa ('editor' = editor, 'templates' = elegir diseño, 'dashboard' = lista de CVs)
  const [activeTab, setActiveTab] = useState('editor')

  // 'zoomScale': Nivel de aumento visual de la hoja A4 (0.85 = 85% del tamaño real)
  const [zoomScale, setZoomScale] = useState(0.85)

  // 'toasts': Lista de notificaciones flotantes (mensajes verdes/azules que aparecen y desaparecen)
  const [toasts, setToasts] = useState([])

  // ---------------------------------------------------------------------------
  // EFECTOS (Sincronización con Backend C# y LocalStorage)
  // ---------------------------------------------------------------------------

  // 1. Cargar currículums desde el backend en C# al iniciar la aplicación
  useEffect(() => {
    async function loadFromBackend() {
      const serverResumes = await getResumesFromApi()
      if (serverResumes && Array.isArray(serverResumes) && serverResumes.length > 0) {
        setResumes(serverResumes)
        setActiveResumeId(serverResumes[0].id)
      }
    }
    loadFromBackend()
  }, [])

  // 2. Guardado automático en LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('auracv_resumes', JSON.stringify(resumes))
    } catch (e) {
      console.error('Error guardando en localStorage:', e)
    }
  }, [resumes])

  // 3. Guarda en memoria cuál fue el último CV que estuviste editando
  useEffect(() => {
    localStorage.setItem('auracv_active_id', activeResumeId)
  }, [activeResumeId])

  // Obtenemos el objeto del CV actual que está siendo editado
  const activeResume = resumes.find(r => r.id === activeResumeId) || resumes[0] || defaultResumeData

  // 4. Cada vez que el CV activo cambia, lo guardamos en segundo plano en el Backend C#
  useEffect(() => {
    if (activeResume) {
      saveResumeToApi(activeResume)
    }
  }, [activeResume])

  // ---------------------------------------------------------------------------
  // FUNCIONES AUXILIARES Y ACCIONES
  // ---------------------------------------------------------------------------

  // Muestra una notificación temporal en la esquina de la pantalla
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type }])
    // Se elimina automáticamente después de 3.2 segundos
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3200)
  }

  // Actualiza cualquier campo del CV activo (ej: nombre, foto, experiencia)
  const updateActiveResume = (updater) => {
    setResumes(prev =>
      prev.map(r => {
        if (r.id === activeResume.id) {
          const updated = typeof updater === 'function' ? updater(r) : { ...r, ...updater }
          return {
            ...updated,
            lastModified: new Date().toISOString() // Marcamos la fecha/hora del cambio
          }
        }
        return r
      })
    )
  }

  // Crear un nuevo currículum desde cero
  const createNewResume = (templateId = 'modern-aura') => {
    const newId = 'cv-' + Date.now()
    const newResume = {
      ...defaultResumeData,
      id: newId,
      title: 'Nuevo Currículum',
      templateId: templateId,
      lastModified: new Date().toISOString(),
      personalInfo: {
        ...defaultResumeData.personalInfo,
        fullName: 'Tu Nombre y Apellidos',
        headline: 'Tu Puesto o Especialidad',
        summary: 'Escribe un resumen atractivo de tu trayectoria profesional, objetivos y logros destacados.'
      }
    }
    setResumes(prev => [newResume, ...prev])
    setActiveResumeId(newId)
    setActiveTab('editor')
    addToast('¡Nuevo currículum creado con éxito!', 'success')
  }

  // Duplicar un currículum existente
  const duplicateResume = (id) => {
    const target = resumes.find(r => r.id === id)
    if (!target) return
    const duplicated = {
      ...JSON.parse(JSON.stringify(target)),
      id: 'cv-' + Date.now(),
      title: `${target.title} (Copia)`,
      lastModified: new Date().toISOString()
    }
    setResumes(prev => [duplicated, ...prev])
    addToast('Currículum duplicado', 'info')
  }

  // Eliminar un currículum
  const deleteResume = (id) => {
    if (resumes.length <= 1) {
      addToast('No puedes eliminar el único currículum disponible', 'info')
      return
    }
    // Borramos también en el backend C#
    deleteResumeFromApi(id)

    setResumes(prev => prev.filter(r => r.id !== id))
    if (activeResumeId === id) {
      const remaining = resumes.filter(r => r.id !== id)
      setActiveResumeId(remaining[0].id)
    }
    addToast('Currículum eliminado', 'info')
  }

  // Cargar un perfil de ejemplo prediseñado (Desarrollador, Diseñadora, Product Manager, etc.)
  const loadSample = (profileKey) => {
    const profile = sampleProfiles[profileKey]
    if (!profile) return
    const newId = 'cv-' + Date.now()
    const cloned = {
      ...JSON.parse(JSON.stringify(profile)),
      id: newId,
      lastModified: new Date().toISOString()
    }
    setResumes(prev => [cloned, ...prev])
    setActiveResumeId(newId)
    setActiveTab('editor')
    addToast(`Perfil de ejemplo cargado (${profile.personalInfo.fullName})`, 'success')
  }

  // Descargar los datos del CV en formato archivo JSON (copia de seguridad)
  const exportResumeJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(activeResume, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `${activeResume.title.replace(/\s+/g, '_')}_AuraCV.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
    addToast('Datos exportados en formato JSON', 'success')
  }

  // Cargar/Importar un CV desde un archivo JSON previo
  const importResumeJSON = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result)
        if (!parsed.personalInfo) {
          throw new Error('Formato de CV no válido')
        }
        const newId = 'cv-' + Date.now()
        const imported = {
          ...parsed,
          id: newId,
          title: parsed.title ? `${parsed.title} (Importado)` : 'CV Importado',
          lastModified: new Date().toISOString()
        }
        setResumes(prev => [imported, ...prev])
        setActiveResumeId(newId)
        setActiveTab('editor')
        addToast('Currículum importado correctamente', 'success')
      } catch (err) {
        addToast('Error al importar el archivo JSON', 'info')
      }
    }
    reader.readAsText(file)
  }

  // Asistente simulado para mejorar viñetas y logros con palabras de alto impacto (IA)
  const enhanceBulletPoint = (text) => {
    if (!text || text.trim().length === 0) return '• Lideré el desarrollo y despliegue continuo optimizando métricas operativas en un 35%.'
    const powerVerbs = ['Lideré y optimicé', 'Diseñé e implementé con éxito', 'Aceleré el rendimiento de', 'Orquesté la integración de']
    const impactWords = ['reduciendo la latencia en un 40%', 'incrementando la retención un 28%', 'optimizando la escalabilidad del sistema']
    const clean = text.replace(/^•\s*/, '').trim()
    const randomVerb = powerVerbs[Math.floor(Math.random() * powerVerbs.length)]
    const randomImpact = impactWords[Math.floor(Math.random() * impactWords.length)]
    return `• ${randomVerb} ${clean.toLowerCase()}, ${randomImpact}.`
  }

  // ---------------------------------------------------------------------------
  // RENDERIZADO DEL CONTEXTO
  // Ponemos todas las variables y funciones a disposición de los componentes hijos
  // ---------------------------------------------------------------------------
  return (
    <ResumeContext.Provider
      value={{
        resumes,
        activeResume,
        activeResumeId,
        setActiveResumeId,
        activeTab,
        setActiveTab,
        zoomScale,
        setZoomScale,
        toasts,
        addToast,
        updateActiveResume,
        createNewResume,
        duplicateResume,
        deleteResume,
        loadSample,
        exportResumeJSON,
        importResumeJSON,
        enhanceBulletPoint
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

// Hook personalizado: Permite a cualquier componente usar 'const { activeResume } = useResume()'
// de forma súper sencilla y limpia.
export const useResume = () => {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error('useResume debe usarse dentro de un ResumeProvider')
  }
  return context
}

