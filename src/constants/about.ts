import {
  Database,
  Palette,
  Gauge,
  ShieldCheck,
  Cpu,
  type LucideIcon,
} from 'lucide-react'

export const ABOUT_STATS = [
  { label: 'Coins tracked', value: '5,000+', color: 'text-primary' },
  { label: 'Type-safe', value: '100%', color: 'text-[#3178C6]' },
  { label: 'AI-assisted', value: 'UI & Motion', color: 'text-[#7C3AED]' },
  { label: 'Edge Caching', value: 'API Layer', color: 'text-success' },
]

export interface Challenge {
  id: string
  title: string
  summary: string
  description: string
  solution: string
  icon: LucideIcon
  accent: string
  glow: string
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'financial-accuracy',
    title: 'Financial Accuracy',
    summary:
      'Ensuring precise decimal math, trade totals, and MAX functionality.',
    description:
      'Floating-point errors in JavaScript can cause critical bugs in financial applications. When a user clicks "MAX" or calculates a trade fee, slight precision errors can block the transaction or leave dust in the wallet.',
    solution:
      'Centralized all financial math into a strict utility layer using an EPSILON tolerance to compare numbers. Synced frontend calculations directly with database RPC responses to guarantee 100% accuracy.',
    icon: ShieldCheck,
    accent: '#22C55E',
    glow: 'rgba(34, 197, 94, 0.10)',
  },
  {
    id: 'data-lifecycle',
    title: 'Data Lifecycle',
    summary:
      'Preventing state race conditions and managing real-time sync efficiently.',
    description:
      'Managing asynchronous data flows and Supabase Realtime events can lead to race conditions. For example, if a user logs out while a wallet request is in flight, old data could leak back into the store.',
    solution:
      'Implemented safe lifecycle guards (cancelled flags, loadedUserId tracking) to prevent stale updates. Added a debounce mechanism for real-time events to prevent network request explosions during rapid transactions.',
    icon: Database,
    accent: '#FACC15',
    glow: 'rgba(250, 204, 21, 0.10)',
  },
  {
    id: 'scalable-performance',
    title: 'Scalable Performance',
    summary: 'Rendering thousands of data rows with virtualization.',
    description:
      'Rendering thousands of cryptocurrency rows at once causes DOM thrashing and freezes the browser. Furthermore, heavy charting libraries can severely impact bundle size.',
    solution:
      'Integrated TanStack Virtual to render only visible rows in the table. Used a lightweight, dependency-free charting solution (TradingView lightweight-charts) and optimized query caching with TanStack Query.',
    icon: Gauge,
    accent: '#7C3AED',
    glow: 'rgba(124, 58, 237, 0.10)',
  },
  {
    id: 'api-limits',
    title: 'API Rate Limits',
    summary: 'Implementing a two-layer caching strategy to respect API limits.',
    description:
      'CoinGecko restricts free-tier requests. Without smart caching, a data-heavy dashboard would quickly hit rate limits and fail to load market data.',
    solution:
      'Built a two-layer caching architecture: A Vercel Edge proxy handles server-side caching and hides the API key, while TanStack Query manages client-side caching and background refetching.',
    icon: Cpu,
    accent: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.10)',
  },
  {
    id: 'time-constraints',
    title: 'Time Constraints',
    summary: 'Rapidly prototyping UI and motion with AI assistance.',
    description:
      'Building a production-ready UI with complex glassmorphism, custom animations, and a cohesive dark/light theme from scratch requires significant time.',
    solution:
      'Leveraged AI to accelerate UI prototyping, generate initial component structures, and experiment with design tokens. This allowed focusing human effort on architectural decisions, performance, and complex trade logic.',
    icon: Palette,
    accent: '#F97316',
    glow: 'rgba(249, 115, 22, 0.10)',
  },
]

export const DEVELOPMENT_STEPS = [
  {
    number: '01',
    title: 'Architecture',
    description:
      'Designed a feature-based structure and selected the core stack (TanStack, Zustand, Supabase) for maximum scalability.',
  },
  {
    number: '02',
    title: 'Data Engine',
    description:
      'Connected real-time feeds, implemented two-layer API caching, and virtualized large datasets for smooth rendering.',
  },
  {
    number: '03',
    title: 'Financial Core',
    description:
      'Engineered precise trade logic, fixed floating-point issues, and secured the wallet lifecycle against race conditions.',
  },
  {
    number: '04',
    title: 'UI & Polish',
    description:
      'Crafted a responsive glassmorphism UI, added spring animations, and optimized the final developer experience.',
  },
]

export const TECH_GROUPS = [
  { key: 'core', label: 'Core', description: 'Application foundation' },
  {
    key: 'state',
    label: 'State & Data',
    description: 'Data fetching and state management',
  },
  {
    key: 'ui',
    label: 'UI & Experience',
    description: 'Interface and visualization',
  },
  {
    key: 'backend',
    label: 'Backend',
    description: 'Data, forms, and validation',
  },
  { key: 'ai', label: 'AI Assistant', description: 'Development accelerator' },
] as const

export const TECH_STACK = [
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
  {
    name: 'DeepSeek',
    description: 'AI Assistant',
    version: '',
    icon: '/tech/deepseek.svg',
    accent: '#4D6BFE',
    category: 'ai',
  },
] as const

