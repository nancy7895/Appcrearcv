// =============================================================================
// BARRA DE HERRAMIENTAS DE LA VISTA PREVIA (CanvasToolbar.jsx)
// =============================================================================
// Este componente flota sobre el lienzo del currículum y le da al usuario control sobre:
// 1. Zoom (acercar, alejar, restablecer).
// 2. Paleta de colores de acento en tiempo real.
// 3. Tipografía (fuente del texto).
// 4. Densidad de espaciado (compacto, normal, amplio).
// 5. Botones de acción: Descargar PDF A4, Imprimir, Exportar/Importar copia en JSON.

import React, { useState } from 'react'
import { ZoomIn, ZoomOut, Maximize2, Download, Printer, FileJson, Upload, Palette, Type, Layout } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import { COLOR_PALETTES, FONT_OPTIONS, DENSITY_OPTIONS } from '../../data/templateDefinitions'

export default function CanvasToolbar({ printRef }) {
  // Extraemos funciones y variables del almacén central (ResumeContext)
  const { activeResume, updateActiveResume, zoomScale, setZoomScale, addToast, exportResumeJSON, importResumeJSON } = useResume()
  
  // 'isExporting': Estado que se pone en true mientras se genera el PDF para deshabilitar el botón y evitar clics duplicados
  const [isExporting, setIsExporting] = useState(false)

  // Aumentar zoom un 10%
  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.1, 1.4))
  }

  // Reducir zoom un 10%
  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.1, 0.45))
  }

  // Restablecer zoom al 85% estándar
  const handleZoomReset = () => {
    setZoomScale(0.85)
  }

  // Cambiar el color de acento del CV
  const handleColorChange = (color) => {
    updateActiveResume({ accentColor: color })
    addToast('Color de acento actualizado', 'info')
  }

  // Cambiar la fuente tipográfica
  const handleFontChange = (e) => {
    updateActiveResume({ fontFamily: e.target.value })
  }

  // Cambiar la densidad de espaciado
  const handleDensityChange = (e) => {
    updateActiveResume({ density: e.target.value })
  }

  // Abrir la ventana nativa de impresión del navegador
  const handlePrint = () => {
    window.print()
  }

  // ---------------------------------------------------------------------------
  // GENERACIÓN Y DESCARGA DE PDF
  // ---------------------------------------------------------------------------
  // ¿Cómo funciona la exportación a PDF?
  // 1. Toma el elemento del DOM apuntado por `printRef.current` (la hoja A4).
  // 2. `html2canvas` dibuja ese elemento en un lienzo gráfico virtual con alta resolución (escala 2.5x).
  // 3. `jspdf` crea un documento PDF en formato estándar A4 (210mm x 297mm) e inserta la imagen generada.
  // 4. Se descarga automáticamente con el nombre de la persona: "Nombre_AuraCV.pdf".
  const handleDownloadPDF = async () => {
    if (!printRef.current) return
    setIsExporting(true)
    addToast('Generando documento PDF A4 de alta fidelidad...', 'info')

    try {
      // Importamos las librerías dinámicamente cuando el usuario hace clic
      const html2canvasModule = await import('html2canvas')
      const html2canvas = html2canvasModule.default || html2canvasModule
      const { jsPDF } = await import('jspdf')

      const element = printRef.current
      const canvas = await html2canvas(element, {
        scale: 2.5, // 2.5x para asegurar nitidez ultra clara en texto
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })

      const imgData = canvas.toDataURL('image/jpeg', 0.98)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const pdfWidth = 210 // Ancho estándar A4 en milímetros
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, Math.min(pdfHeight, 297))

      const filename = `${(activeResume.personalInfo.fullName || 'Curriculum').replace(/\s+/g, '_')}_AuraCV.pdf`
      pdf.save(filename)
      addToast('¡PDF descargado con éxito!', 'success')
    } catch (err) {
      console.error('Error generando PDF:', err)
      addToast('Abriendo ventana de impresión para guardar PDF...', 'info')
      window.print()
    } finally {
      setIsExporting(false)
    }
  }

  // Leer archivo JSON subido por el usuario para restaurar un CV
  const handleFileInput = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      importResumeJSON(file)
    }
  }

  return (
    <div className="canvas-toolbar">
      {/* 1. Controles de Zoom */}
      <div className="toolbar-group">
        <button className="btn-icon" onClick={handleZoomOut} title="Alejar (-)">
          <ZoomOut size={16} />
        </button>
        <span style={{ fontSize: '0.78rem', fontWeight: '700', minWidth: '38px', textAlign: 'center' }}>
          {Math.round(zoomScale * 100)}%
        </span>
        <button className="btn-icon" onClick={handleZoomIn} title="Acercar (+)">
          <ZoomIn size={16} />
        </button>
        <button className="btn-icon" onClick={handleZoomReset} title="Ajustar tamaño">
          <Maximize2 size={15} />
        </button>
      </div>

      <div className="toolbar-divider" />

      {/* 2. Selector de Color de Acento */}
      <div className="toolbar-group">
        <div className="color-picker-dots">
          {COLOR_PALETTES.map(p => (
            <button
              key={p.value}
              className={`color-dot ${activeResume.accentColor === p.value ? 'active' : ''}`}
              style={{ backgroundColor: p.value }}
              onClick={() => handleColorChange(p.value)}
              title={p.name}
            />
          ))}
        </div>
      </div>

      <div className="toolbar-divider" />

      {/* 3. Selector de Fuente */}
      <div className="toolbar-group">
        <Type size={15} style={{ color: 'var(--text-muted)' }} />
        <select
          className="form-select"
          style={{ padding: '4px 8px', fontSize: '0.78rem', width: 'auto' }}
          value={activeResume.fontFamily || 'Plus Jakarta Sans'}
          onChange={handleFontChange}
        >
          {FONT_OPTIONS.map(f => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>
      </div>

      {/* 4. Selector de Densidad / Espaciado */}
      <div className="toolbar-group">
        <Layout size={15} style={{ color: 'var(--text-muted)' }} />
        <select
          className="form-select"
          style={{ padding: '4px 8px', fontSize: '0.78rem', width: 'auto' }}
          value={activeResume.density || 'normal'}
          onChange={handleDensityChange}
        >
          {DENSITY_OPTIONS.map(d => (
            <option key={d.id} value={d.id}>{d.label}</option>
          ))}
        </select>
      </div>

      <div className="toolbar-divider" />

      {/* 5. Botones de Acción y Descarga */}
      <div className="toolbar-group">
        {/* Botón principal: Descargar PDF */}
        <button
          className="btn btn-primary btn-sm"
          onClick={handleDownloadPDF}
          disabled={isExporting}
          title="Descargar PDF A4"
        >
          <Download size={15} />
          <span>{isExporting ? 'Generando...' : 'Descargar PDF'}</span>
        </button>

        {/* Botón secundario: Imprimir directamente */}
        <button className="btn-icon" onClick={handlePrint} title="Imprimir documento">
          <Printer size={16} />
        </button>

        {/* Exportar JSON */}
        <button className="btn-icon" onClick={exportResumeJSON} title="Exportar JSON">
          <FileJson size={16} />
        </button>

        {/* Importar JSON */}
        <label className="btn-icon" style={{ cursor: 'pointer', margin: 0 }} title="Importar JSON">
          <Upload size={16} />
          <input type="file" accept=".json" onChange={handleFileInput} style={{ display: 'none' }} />
        </label>
      </div>
    </div>
  )
}

