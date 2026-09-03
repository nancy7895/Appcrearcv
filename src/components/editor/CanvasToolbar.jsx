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
import { ZoomIn, ZoomOut, Maximize2, Download, Printer, FileJson, Upload, Type, Layout } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import { FONT_OPTIONS, DENSITY_OPTIONS } from '../../data/templateDefinitions'
import ColorPickerControl from './ColorPickerControl'

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

    let container = null
    try {
      // 1. Asegurar que las fuentes tipográficas estén 100% cargadas en el navegador
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready
      }

      // 2. Importar librerías dinámicamente
      const html2canvasModule = await import('html2canvas')
      const html2canvas = html2canvasModule.default || html2canvasModule
      const { jsPDF } = await import('jspdf')

      const originalElement = printRef.current

      // 3. Crear un contenedor aislado fuera de pantalla SIN transform: scale(...)
      // Esto elimina por completo el bug de texto encimado/desfasado provocado por el zoom CSS
      container = document.createElement('div')
      container.style.position = 'fixed'
      container.style.left = '-99999px'
      container.style.top = '0'
      container.style.width = '794px' // Ancho exacto A4 (210mm a 96 DPI)
      container.style.zIndex = '-9999'
      container.style.margin = '0'
      container.style.padding = '0'
      container.style.transform = 'none'
      container.style.backgroundColor = '#ffffff'

      const clone = originalElement.cloneNode(true)
      clone.style.transform = 'none'
      clone.style.margin = '0'
      clone.style.boxShadow = 'none'
      clone.style.width = '794px'
      clone.style.minHeight = '1123px' // Alto proporcional A4 (297mm)

      container.appendChild(clone)
      document.body.appendChild(container)

      // Pequeña pausa para asegurar el renderizado del DOM en el contenedor clonado
      await new Promise(resolve => setTimeout(resolve, 120))

      // 4. Capturar el elemento clonado a escala 3x (300 DPI - calidad imprenta profesional)
      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,
        windowWidth: 794,
        scrollX: 0,
        scrollY: 0
      })

      const imgData = canvas.toDataURL('image/jpeg', 0.98)
      
      // 5. Generar PDF A4 estándar
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const pdfPageWidth = 210 // mm
      const pdfPageHeight = 297 // mm
      const totalPdfHeight = (canvas.height * pdfPageWidth) / canvas.width

      // Si cabe en una hoja estándar (o margen mínimo)
      if (totalPdfHeight <= pdfPageHeight + 4) {
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfPageWidth, Math.min(totalPdfHeight, pdfPageHeight), undefined, 'FAST')
      } else {
        // Soporte multi-página: Si el contenido sobrepasa 1 hoja A4, divide limpiamente
        let heightLeft = totalPdfHeight
        let position = 0

        pdf.addImage(imgData, 'JPEG', 0, position, pdfPageWidth, totalPdfHeight, undefined, 'FAST')
        heightLeft -= pdfPageHeight

        while (heightLeft > 0) {
          position = -(totalPdfHeight - heightLeft)
          pdf.addPage()
          pdf.addImage(imgData, 'JPEG', 0, position, pdfPageWidth, totalPdfHeight, undefined, 'FAST')
          heightLeft -= pdfPageHeight
        }
      }

      const filename = `${(activeResume.personalInfo.fullName || 'Curriculum').replace(/\s+/g, '_')}_AuraCV.pdf`
      pdf.save(filename)
      addToast('¡PDF descargado con éxito y perfectamente alineado!', 'success')
    } catch (err) {
      console.error('Error generando PDF:', err)
      addToast('Abriendo ventana de impresión para guardar PDF...', 'info')
      window.print()
    } finally {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container)
      }
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

      {/* 2. Selector de Color de Acento Extendido y Personalizado (HEX) */}
      <div className="toolbar-group">
        <ColorPickerControl />
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

