// =============================================================================
// CONTROL DE COLOR PERSONALIZADO Y PALETAS EXTENDIDAS (ColorPickerControl.jsx)
// =============================================================================
// Este componente permite al usuario:
// 1. Elegir entre colores rápidos directamente desde la barra.
// 2. Abrir un menú flotante con más de 25 colores profesionales organizados por categorías.
// 3. Escribir o pegar libremente cualquier código de color HEX (ej: #2563EB, #FF5722).
// 4. Usar la herramienta de cuentagotas y rueda de color nativa del navegador (<input type="color">).

import React, { useState, useEffect, useRef } from 'react'
import { Palette, ChevronDown, Check, Copy, Pipette, X, Sparkles } from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import { COLOR_CATEGORIES, COLOR_PALETTES, QUICK_COLORS, TEMPLATES } from '../../data/templateDefinitions'

export default function ColorPickerControl() {
  const { activeResume, updateActiveResume, addToast } = useResume()
  
  // Estado para abrir/cerrar el panel flotante
  const [isOpen, setIsOpen] = useState(false)
  
  // Estado local para el valor del texto del input HEX
  const currentColor = activeResume.accentColor || '#6366f1'
  const [hexInput, setHexInput] = useState(currentColor)
  
  // Categoría activa dentro del menú flotante ('all', 'executive', 'modern', 'nature', 'warm')
  const [activeCategory, setActiveCategory] = useState('all')
  
  // Estado para la confirmación de copiado
  const [copied, setCopied] = useState(false)

  // Referencias para manejar clic fuera del popover y el input nativo de color
  const popoverRef = useRef(null)
  const nativeColorInputRef = useRef(null)

  // Sincronizar el input de texto si el color del CV cambia externamente
  useEffect(() => {
    setHexInput(currentColor)
  }, [currentColor])

  // Cerrar el menú flotante al hacer clic fuera de él o presionar Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // Función para validar y aplicar un color
  const applyColor = (hexValue, showToast = true) => {
    let cleanHex = hexValue.trim()
    if (!cleanHex.startsWith('#')) {
      cleanHex = '#' + cleanHex
    }

    // Validar si es un formato HEX válido (#RGB o #RRGGBB)
    const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(cleanHex)
    if (isValidHex) {
      updateActiveResume({ accentColor: cleanHex })
      setHexInput(cleanHex)
      if (showToast) {
        addToast(`Color actualizado: ${cleanHex.toUpperCase()}`, 'info')
      }
    }
  }

  // Manejador del cambio en el campo de texto HEX
  const handleHexInputChange = (e) => {
    const val = e.target.value
    setHexInput(val)

    // Si tiene la longitud adecuada y es válido, aplicarlo en vivo
    let formatted = val.trim()
    if (!formatted.startsWith('#')) formatted = '#' + formatted
    if (/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(formatted)) {
      updateActiveResume({ accentColor: formatted })
    }
  }

  // Manejador cuando el usuario suelta el foco del input o presiona Enter
  const handleHexBlur = () => {
    let formatted = hexInput.trim()
    if (!formatted.startsWith('#')) formatted = '#' + formatted
    if (/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(formatted)) {
      applyColor(formatted, false)
    } else {
      // Si no es válido, revertir al color actual
      setHexInput(currentColor)
    }
  }

  // Copiar código HEX al portapapeles
  const handleCopyHex = async () => {
    try {
      await navigator.clipboard.writeText(currentColor.toUpperCase())
      setCopied(true)
      addToast(`Código ${currentColor.toUpperCase()} copiado al portapapeles`, 'success')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  // Obtener los colores filtrados según la categoría seleccionada
  const displayedColors = activeCategory === 'all'
    ? COLOR_PALETTES
    : (COLOR_CATEGORIES.find(c => c.id === activeCategory)?.colors || COLOR_PALETTES)

  // Encontrar el color recomendado de la plantilla actual
  const currentTemplate = TEMPLATES.find(t => t.id === activeResume.templateId)
  const recommendedColor = currentTemplate?.recommendedColor

  return (
    <div className="color-picker-wrapper" ref={popoverRef}>
      {/* 1. Botones de acceso rápido a los colores favoritos */}
      <div className="color-picker-quick-bar">
        {QUICK_COLORS.map(p => {
          const isActive = currentColor.toLowerCase() === p.value.toLowerCase()
          return (
            <button
              key={p.value}
              type="button"
              className={`color-dot ${isActive ? 'active' : ''}`}
              style={{ backgroundColor: p.value }}
              onClick={() => applyColor(p.value)}
              title={`${p.name} (${p.value})`}
            />
          )
        })}

        {/* 2. Botón disparador del selector extendido y código HEX */}
        <button
          type="button"
          className={`btn-color-expand-trigger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          title="Ver más colores y personalizar código HEX"
        >
          <span
            className="color-trigger-preview"
            style={{ backgroundColor: currentColor }}
          />
          <span className="color-trigger-hex">{currentColor.toUpperCase()}</span>
          <ChevronDown size={13} className={`color-trigger-chevron ${isOpen ? 'rotated' : ''}`} />
        </button>
      </div>

      {/* 3. Panel Flotante (Popover) Desplegable */}
      {isOpen && (
        <div className="color-picker-popover animate-fade-in">
          {/* Cabecera del panel */}
          <div className="color-popover-header">
            <div className="color-popover-title-row">
              <Palette size={16} style={{ color: 'var(--accent-primary)' }} />
              <span className="color-popover-title">Color de Acento del CV</span>
            </div>
            <button
              type="button"
              className="btn-icon btn-icon-xs"
              onClick={() => setIsOpen(false)}
              title="Cerrar"
            >
              <X size={14} />
            </button>
          </div>

          {/* Sección de Entrada de Código de Color Personalizado */}
          <div className="color-custom-section">
            <label className="color-custom-label">Código de Color Personalizado</label>
            <div className="color-custom-row">
              {/* Selector visual nativo / Cuentagotas */}
              <div className="native-color-picker-box" title="Abrir selector visual o cuentagotas">
                <input
                  ref={nativeColorInputRef}
                  type="color"
                  value={currentColor.startsWith('#') && currentColor.length === 7 ? currentColor : '#6366f1'}
                  onChange={(e) => applyColor(e.target.value, false)}
                  className="native-color-input"
                />
                <div
                  className="native-color-preview"
                  style={{ backgroundColor: currentColor }}
                  onClick={() => nativeColorInputRef.current?.click()}
                >
                  <Pipette size={14} className="pipette-icon" />
                </div>
              </div>

              {/* Input para escribir el código HEX */}
              <div className="hex-input-container">
                <span className="hex-prefix">#</span>
                <input
                  type="text"
                  className="hex-text-input"
                  value={hexInput.replace(/^#/, '')}
                  onChange={handleHexInputChange}
                  onBlur={handleHexBlur}
                  onKeyDown={(e) => e.key === 'Enter' && handleHexBlur()}
                  placeholder="6366F1"
                  maxLength={7}
                  spellCheck={false}
                />
              </div>

              {/* Botón para copiar el código HEX */}
              <button
                type="button"
                className="btn-copy-hex"
                onClick={handleCopyHex}
                title="Copiar código al portapapeles"
              >
                {copied ? <Check size={14} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={14} />}
                <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          {/* Botón de restablecer al color recomendado de la plantilla */}
          {recommendedColor && recommendedColor.toLowerCase() !== currentColor.toLowerCase() && (
            <div className="color-recommended-bar">
              <button
                type="button"
                className="btn-reset-recommended"
                onClick={() => applyColor(recommendedColor)}
              >
                <Sparkles size={13} style={{ color: recommendedColor }} />
                <span>Usar color sugerido de la plantilla ({recommendedColor.toUpperCase()})</span>
              </button>
            </div>
          )}

          {/* Categorías de paletas predefinidas */}
          <div className="color-category-tabs">
            <button
              type="button"
              className={`color-tab-chip ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              Todos ({COLOR_PALETTES.length})
            </button>
            {COLOR_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`color-tab-chip ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Cuadrícula de colores predefinidos */}
          <div className="color-grid-container">
            <div className="color-swatches-grid">
              {displayedColors.map(colorItem => {
                const isSelected = currentColor.toLowerCase() === colorItem.value.toLowerCase()
                return (
                  <button
                    key={colorItem.value}
                    type="button"
                    className={`color-swatch-item ${isSelected ? 'selected' : ''}`}
                    style={{ backgroundColor: colorItem.value }}
                    onClick={() => applyColor(colorItem.value)}
                    title={`${colorItem.name} • ${colorItem.value.toUpperCase()}`}
                  >
                    {isSelected && <Check size={14} className="swatch-check-icon" />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
