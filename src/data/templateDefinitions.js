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

export const COLOR_PALETTES = [
  { name: 'Indigo Aura', value: '#6366f1' },
  { name: 'Emerald Forest', value: '#10b981' },
  { name: 'Cyber Cyan', value: '#06b6d4' },
  { name: 'Cosmic Violet', value: '#8b5cf6' },
  { name: 'Crimson Rose', value: '#f43f5e' },
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
