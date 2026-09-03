export const TEMPLATES = [
  {
    id: 'modern-aura',
    name: 'Aura Modern',
    category: 'modern',
    description: 'Diseño contemporáneo y equilibrado con líneas de acento vibrantes y estructura visual limpia.',
    badge: 'Popular',
    atsScore: 98,
    tags: ['Recomendado', 'Visual', 'Balanceado'],
    recommendedFont: 'Plus Jakarta Sans',
    recommendedColor: '#6366f1'
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    category: 'minimal',
    description: 'Enfocado en la legibilidad pura, diseñado con máxima compatibilidad para sistemas ATS corporativos.',
    badge: 'ATS 100%',
    atsScore: 100,
    tags: ['ATS Friendly', 'Minimalista', 'Directo'],
    recommendedFont: 'Inter',
    recommendedColor: '#0f172a'
  },
  {
    id: 'executive',
    name: 'Executive Slate',
    category: 'executive',
    description: 'Elegancia institucional con cabecera oscura premium, tipografía serif y balance ejecutivo.',
    badge: 'Senior',
    atsScore: 95,
    tags: ['Directivos', 'Consultoría', 'Elegante'],
    recommendedFont: 'Playfair Display',
    recommendedColor: '#334155'
  },
  {
    id: 'tech-cyber',
    name: 'Tech & Code',
    category: 'technical',
    description: 'Optimizado para ingenieros de software, DevOps y profesionales de datos con soporte para tags y enlaces.',
    badge: 'Developers',
    atsScore: 96,
    tags: ['Tech Stack', 'Ingeniería', 'DevOps'],
    recommendedFont: 'Fira Code',
    recommendedColor: '#06b6d4'
  },
  {
    id: 'split-sidebar',
    name: 'Split Modern',
    category: 'creative',
    description: 'Diseño a dos columnas con barra lateral oscura de alto contraste para habilidades y datos de contacto.',
    badge: 'Creativo',
    atsScore: 92,
    tags: ['Diseño', 'Portfolio', 'Dos Columnas'],
    recommendedFont: 'Outfit',
    recommendedColor: '#8b5cf6'
  }
]

// Categorías organizadas de colores profesionales para los CVs
export const COLOR_CATEGORIES = [
  {
    id: 'executive',
    name: 'Ejecutivos & Sobrios',
    colors: [
      { name: 'Slate Executive', value: '#334155' },
      { name: 'Midnight Navy', value: '#1e3a8a' },
      { name: 'Charcoal Dark', value: '#1e293b' },
      { name: 'Pitch Black', value: '#0f172a' },
      { name: 'Steel Gray', value: '#475569' },
      { name: 'Espresso Coffee', value: '#451a03' },
      { name: 'Taupe Stone', value: '#57534e' }
    ]
  },
  {
    id: 'modern',
    name: 'Modernos & Tech',
    colors: [
      { name: 'Indigo Aura', value: '#6366f1' },
      { name: 'Royal Blue', value: '#2563eb' },
      { name: 'Electric Sky', value: '#0284c7' },
      { name: 'Cyber Cyan', value: '#06b6d4' },
      { name: 'Deep Teal', value: '#0d9488' },
      { name: 'Cosmic Violet', value: '#8b5cf6' },
      { name: 'Vivid Purple', value: '#7c3aed' }
    ]
  },
  {
    id: 'nature',
    name: 'Naturaleza & Equilibrio',
    colors: [
      { name: 'Emerald Forest', value: '#10b981' },
      { name: 'Deep Forest', value: '#047857' },
      { name: 'Pine Green', value: '#15803d' },
      { name: 'Mint Fresh', value: '#059669' },
      { name: 'Olive Modern', value: '#65a30d' },
      { name: 'Sage Green', value: '#4d7c0f' },
      { name: 'Jade Teal', value: '#0f766e' }
    ]
  },
  {
    id: 'warm',
    name: 'Cálidos & Creativos',
    colors: [
      { name: 'Crimson Rose', value: '#f43f5e' },
      { name: 'Ruby Red', value: '#e11d48' },
      { name: 'Wine / Borgoña', value: '#881337' },
      { name: 'Terracotta', value: '#ea580c' },
      { name: 'Sunset Orange', value: '#f97316' },
      { name: 'Amber Gold', value: '#f59e0b' },
      { name: 'Rich Bronze', value: '#b45309' },
      { name: 'Plum Berry', value: '#a21caf' },
      { name: 'Fuchsia Modern', value: '#c026d3' }
    ]
  }
]

// Lista plana de todos los colores disponibles (compatible con componentes existentes)
export const COLOR_PALETTES = COLOR_CATEGORIES.flatMap(cat => cat.colors)

// Colores destacados para acceso rápido en la barra de herramientas
export const QUICK_COLORS = [
  { name: 'Indigo Aura', value: '#6366f1' },
  { name: 'Midnight Navy', value: '#1e3a8a' },
  { name: 'Emerald Forest', value: '#10b981' },
  { name: 'Cyber Cyan', value: '#06b6d4' },
  { name: 'Cosmic Violet', value: '#8b5cf6' },
  { name: 'Ruby Red', value: '#e11d48' },
  { name: 'Amber Gold', value: '#f59e0b' },
  { name: 'Slate Executive', value: '#334155' }
]

export const FONT_OPTIONS = [
  { id: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans (Modern)' },
  { id: 'Inter', label: 'Inter (Clean / ATS)' },
  { id: 'Outfit', label: 'Outfit (Geometric)' },
  { id: 'Playfair Display', label: 'Playfair Display (Executive)' },
  { id: 'Fira Code', label: 'Fira Code (Technical)' }
]

export const DENSITY_OPTIONS = [
  { id: 'compact', label: 'Compacto' },
  { id: 'normal', label: 'Normal' },
  { id: 'spacious', label: 'Espacioso' }
]
