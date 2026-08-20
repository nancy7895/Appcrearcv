export const defaultResumeData = {
  id: 'cv-default-1',
  title: 'Mi Currículum Profesional',
  lastModified: new Date().toISOString(),
  templateId: 'modern-aura',
  accentColor: '#6366f1',
  fontFamily: 'Plus Jakarta Sans',
  density: 'normal',
  personalInfo: {
    fullName: 'Alex Vance',
    headline: 'Senior Full Stack & Cloud Architect',
    email: 'alex.vance@example.dev',
    phone: '+34 612 345 678',
    location: 'Madrid, España',
    website: 'https://alexvance.dev',
    linkedin: 'linkedin.com/in/alexvance-dev',
    github: 'github.com/alexvance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    summary: 'Ingeniero de software con más de 7 años de experiencia diseñando e implementando arquitecturas escalables en la nube, microservicios y aplicaciones web de alto rendimiento. Apasionado por la optimización de latencia, CI/CD automatizado y liderazgo de equipos técnicos ágiles.'
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Senior Staff Engineer',
      company: 'TechFlow Systems',
      location: 'Madrid / Remoto',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: '• Lideré la migración de la arquitectura monolítica a microservicios en Kubernetes, reduciendo los tiempos de despliegue en un 65%.\n• Diseñé APIs GraphQL y REST de alto rendimiento que procesan más de 40M de peticiones diarias con un SLA del 99.99%.\n• Mentoré a un equipo de 8 ingenieros de software, implementando pruebas automatizadas que aumentaron la cobertura del código al 92%.'
    },
    {
      id: 'exp-2',
      role: 'Full Stack Engineer',
      company: 'Innovate Labs',
      location: 'Barcelona, España',
      startDate: '2019-03',
      endDate: '2021-12',
      current: false,
      description: '• Desarrollé dashboards interactivos en tiempo real con React, TypeScript y TailwindCSS, mejorando el engagement de usuario en un 40%.\n• Optimicé consultas PostgreSQL y pipelines de caché Redis, reduciendo los tiempos de respuesta del servidor en 250ms.'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Grado en Ingeniería Informática',
      institution: 'Universidad Politécnica de Madrid',
      location: 'Madrid, España',
      startDate: '2014-09',
      endDate: '2018-06',
      honors: 'Matrícula de Honor en Proyecto Fin de Carrera'
    }
  ],
  skills: [
    { id: 'sk-1', name: 'React / Next.js', category: 'frontend', level: 'Experto' },
    { id: 'sk-2', name: 'TypeScript / Node.js', category: 'backend', level: 'Experto' },
    { id: 'sk-3', name: 'Python / FastApi', category: 'backend', level: 'Avanzado' },
    { id: 'sk-4', name: 'Docker / Kubernetes', category: 'devops', level: 'Avanzado' },
    { id: 'sk-5', name: 'AWS & Cloud Architecture', category: 'cloud', level: 'Avanzado' },
    { id: 'sk-6', name: 'PostgreSQL & Redis', category: 'database', level: 'Avanzado' },
    { id: 'sk-7', name: 'CI/CD Pipelines', category: 'devops', level: 'Avanzado' },
    { id: 'sk-8', name: 'System Design', category: 'architecture', level: 'Experto' }
  ],
  projects: [
    {
      id: 'prj-1',
      name: 'AuraCloud Engine',
      role: 'Creador & Arquitecto',
      link: 'https://auracloud.dev',
      techStack: 'Go, React, Redis, Docker',
      description: 'Plataforma de despliegue automatizado open-source con soporte de orquestación ligera y monitoreo en tiempo real.'
    },
    {
      id: 'prj-2',
      name: 'DataPulse Analytics',
      role: 'Lead Developer',
      link: 'https://github.com/alexvance/datapulse',
      techStack: 'TypeScript, Next.js, ClickHouse',
      description: 'Dashboard de análisis de métricas en tiempo real con capacidad para renderizar visualizaciones de millones de eventos.'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2023'
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      date: '2022'
    }
  ],
  languages: [
    { id: 'lang-1', language: 'Español', level: 'Nativo' },
    { id: 'lang-2', language: 'Inglés', level: 'C1 Profesional' }
  ],
  customSections: []
}

export const sampleProfiles = {
  softwareEngineer: defaultResumeData,
  productDesigner: {
    id: 'cv-designer-1',
    title: 'CV - Senior Product Designer',
    lastModified: new Date().toISOString(),
    templateId: 'split-sidebar',
    accentColor: '#8b5cf6',
    fontFamily: 'Outfit',
    density: 'normal',
    personalInfo: {
      fullName: 'Elena Rostova',
      headline: 'Lead Product & UX/UI Designer',
      email: 'elena.design@studio.io',
      phone: '+34 699 888 777',
      location: 'Valencia, España',
      website: 'https://elenarostova.design',
      linkedin: 'linkedin.com/in/elenarostova',
      github: '',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      summary: 'Diseñadora de producto digital con 6+ años de experiencia creando experiencias centradas en el usuario, sistemas de diseño escalables y productos SaaS B2B utilizados por más de 500,000 usuarios activos diarios.'
    },
    experience: [
      {
        id: 'exp-d1',
        role: 'Lead UX Designer',
        company: 'Veloce Digital SaaS',
        location: 'Valencia / Híbrido',
        startDate: '2021-05',
        endDate: '',
        current: true,
        description: '• Creé el Design System integral en Figma con más de 120 componentes accesibles (WCAG 2.1 AA).\n• Conduje más de 60 sesiones de research con usuarios reduciendo la tasa de churn del onboarding en un 32%.'
      }
    ],
    education: [
      {
        id: 'edu-d1',
        degree: 'Grado en Diseño y Creación Digital',
        institution: 'Universitat de València',
        location: 'Valencia',
        startDate: '2015-09',
        endDate: '2019-06',
        honors: 'Premio Extraordinario Fin de Grado'
      }
    ],
    skills: [
      { id: 'sk-d1', name: 'Figma & Design Systems', category: 'design', level: 'Experto' },
      { id: 'sk-d2', name: 'User Research & Testing', category: 'research', level: 'Experto' },
      { id: 'sk-d3', name: 'Prototipado Interactivo', category: 'design', level: 'Avanzado' },
      { id: 'sk-d4', name: 'HTML / CSS / Tailwind', category: 'code', level: 'Intermedio' }
    ],
    projects: [
      {
        id: 'prj-d1',
        name: 'FinFlow Mobile App',
        role: 'Lead Designer',
        link: 'https://behance.net/elenarostova',
        techStack: 'Figma, Principle, UserTesting',
        description: 'Rediseño completo de la experiencia bancaria móvil enfocado en accesibilidad e inclusión financiera.'
      }
    ],
    certifications: [
      { id: 'cd-1', name: 'NN/g UX Master Certified', issuer: 'Nielsen Norman Group', date: '2023' }
    ],
    languages: [
      { id: 'ld-1', language: 'Español', level: 'Nativo' },
      { id: 'ld-2', language: 'Inglés', level: 'C2 Bilingüe' },
      { id: 'ld-3', language: 'Francés', level: 'B2' }
    ],
    customSections: []
  }
}
