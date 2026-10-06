import {
  Database,
  Palette,
  Gauge,
  Code2,
  type LucideIcon,
} from 'lucide-react'

export interface Tech {
  name: string
  description: string
  version: string
  icon: string
  accent: string
  category: 'core' | 'state' | 'ui' | 'backend'
}

export const TECH_STACK: Tech[] = [
  {
    name: 'React',
    description: 'UI Library',
    version: '19',
    icon: '/tech/react.svg',
    accent: '#61DAFB',
    category: 'core',
  },
  {
    name: 'TypeScript',
    description: 'Type Safety',
    version: '6',
    icon: '/tech/typescript.svg',
    accent: '#3178C6',
    category: 'core',
  },
  {
    name: 'Vite',
    description: 'Build Tool',
    version: '8',
    icon: '/tech/vite.svg',
    accent: '#646CFF',
    category: 'core',
  },
  {
    name: 'React Router',
    description: 'Routing',
    version: '8',
    icon: '/tech/react-router.svg',
    accent: '#F44250',
    category: 'core',
  },
  {
    name: 'TanStack Query',
    description: 'Server State',
    version: '5',
    icon: '/tech/tanstack.svg',
    accent: '#FF4154',
    category: 'state',
  },
  {
    name: 'Zustand',
    description: 'Client State',
    version: '5',
    icon: '/tech/zustand.svg',
    accent: '#433E38',
    category: 'state',
  },
  {
    name: 'Tailwind CSS',
    description: 'Styling',
    version: '4',
    icon: '/tech/tailwindcss.svg',
    accent: '#06B6D4',
    category: 'ui',
  },
  {
    name: 'TradingView',
    description: 'Charting',
    version: '5',
    icon: '/tech/tradingview.svg',
    accent: '#2962FF',
    category: 'ui',
  },
  {
    name: 'Lucide',
    description: 'Icon Set',
    version: '1',
    icon: '/tech/lucide.svg',
    accent: '#F56565',
    category: 'ui',
  },
  {
    name: 'Sonner',
    description: 'Toasts',
    version: '2',
    icon: '/tech/sonner.png',
    accent: '#0A0A0A',
    category: 'ui',
  },
  {
    name: 'Axios',
    description: 'HTTP Client',
    version: '1',
    icon: '/tech/axios.svg',
    accent: '#5A29E4',
    category: 'backend',
  },
  {
    name: 'Zod',
    description: 'Validation',
    version: '4',
    icon: '/tech/zod.svg',
    accent: '#3068B7',
    category: 'backend',
  },
  {
    name: 'Supabase',
    description: 'Backend & Auth',
    version: '2',
    icon: '/tech/supabase.svg',
    accent: '#3ECF8E',
    category: 'backend',
  },
  {
    name: 'React Hook Form',
    description: 'Form State',
    version: '7',
    icon: '/tech/react-hook-form.svg',
    accent: '#EC5990',
    category: 'backend',
  },
]

export const TECH_GROUPS = [
  {
    key: 'core',
    label: 'Core',
    description: 'Application foundation',
  },
  {
    key: 'state',
    label: 'State & Data',
    description: 'Data fetching and state',
  },
  {
    key: 'ui',
    label: 'UI & Experience',
    description: 'Interface and visualization',
  },
  {
    key: 'backend',
    label: 'Backend',
    description: 'Data, forms and validation',
  },
] as const

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  eyebrow: string
  size: 'large' | 'small'
  color: {
    text: string
    bg: string
    border: string
    glow: string
  }
}

export const FEATURES: Feature[] = [
  {
    icon: Gauge,
    eyebrow: 'Performance',
    title: 'Built for data-heavy interfaces',
    description:
      'Virtualized rendering keeps large cryptocurrency datasets responsive by limiting DOM work to the content users can actually see.',
    size: 'large',
    color: {
      text: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/30',
      glow: 'rgba(255, 193, 7, 0.12)',
    },
  },
  {
    icon: Database,
    eyebrow: 'Data',
    title: 'Efficient data flow',
    description:
      'TanStack Query handles caching, pagination and background refetching to keep market information useful without unnecessary requests.',
    size: 'small',
    color: {
      text: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/30',
      glow: 'rgba(34, 197, 94, 0.12)',
    },
  },
  {
    icon: Code2,
    eyebrow: 'Architecture',
    title: 'Type-safe by design',
    description:
      'TypeScript and Zod create safer boundaries between external data, application state, forms and UI components.',
    size: 'small',
    color: {
      text: 'text-[#7C3AED]',
      bg: 'bg-[#7C3AED]/10',
      border: 'border-[#7C3AED]/30',
      glow: 'rgba(124, 58, 237, 0.12)',
    },
  },
  {
    icon: Palette,
    eyebrow: 'Experience',
    title: 'A focused interface',
    description:
      'Responsive layouts, dark and light themes, RTL support, accessible interactions and subtle motion keep the interface focused.',
    size: 'large',
    color: {
      text: 'text-[#F7931A]',
      bg: 'bg-[#F7931A]/10',
      border: 'border-[#F7931A]/30',
      glow: 'rgba(247, 147, 26, 0.12)',
    },
  },
]

export const ENGINEERING_POINTS = [
  {
    label: 'Rendering',
    value: 'Virtualized',
    description: 'Large market datasets',
  },
  {
    label: 'Fetching',
    value: 'Cached',
    description: 'Background refetching',
  },
  {
    label: 'Validation',
    value: 'Schema-safe',
    description: 'Runtime validation',
  },
  {
    label: 'Structure',
    value: 'Feature-based',
    description: 'Scalable organization',
  },
]

export const ABOUT_STATS = [
  {
    label: 'Pages',
    value: '10+',
    color: 'text-primary',
  },
  {
    label: 'Components',
    value: '70+',
    color: 'text-[#7C3AED]',
  },
  {
    label: 'Coins tracked',
    value: '5,000+',
    color: 'text-success',
  },
  {
    label: 'TypeScript',
    value: 'First-class',
    color: 'text-[#3178C6]',
  },
]

export const DEVELOPMENT_STEPS = [
  {
    number: '01',
    title: 'Explore',
    description:
      'Investigate the problem, APIs and possible implementation approaches.',
  },
  {
    number: '02',
    title: 'Build',
    description:
      'Use AI to accelerate repetitive work, exploration and first-pass implementation.',
  },
  {
    number: '03',
    title: 'Validate',
    description:
      'Review generated code, test assumptions and verify behavior against the actual requirements.',
  },
  {
    number: '04',
    title: 'Refine',
    description:
      'Improve architecture, performance, UX and maintainability through manual iteration.',
  },
]

export interface Challenge {
  number: string
  problem: string
  solution: string
  description: string
  accent: string
  glow: string
}

export interface Challenge {
  number: string
  problem: string
  solution: string
  description: string
  accent: string
  glow: string
}

export const CHALLENGES: Challenge[] = [
  {
    number: '01',
    problem: 'Rate limits',
    solution: 'Two-layer caching',
    description:
      'CoinGecko caps free requests at 30/min. A Vercel edge route caches responses server-side and hides the API key, while TanStack Query handles per-user caching on the client. Together they keep requests well under the limit.',
    accent: '#FFC107',
    glow: 'rgba(255, 193, 7, 0.10)',
  },
  {
    number: '02',
    problem: 'No WebSocket',
    solution: 'Flash on change',
    description:
      'Public WebSocket providers are unreliable in some regions. Instead of faking real-time, prices refresh on a schedule with a subtle flash when values change.',
    accent: '#22C55E',
    glow: 'rgba(34, 197, 94, 0.10)',
  },
  {
    number: '03',
    problem: '5,000 rows',
    solution: 'Virtualization',
    description:
      'Rendering thousands of coins would freeze the DOM. TanStack Virtual renders only the rows in view, keeping scroll smooth at any depth.',
    accent: '#7C3AED',
    glow: 'rgba(124, 58, 237, 0.10)',
  },
]