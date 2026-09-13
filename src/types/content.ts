export type Surface = 'green' | 'blue' | 'greenStrong'
export interface Service { title: string; description: string; icon: string }
export interface CaseStudy {
  id: string; title: string; description: string; image: string; alt: string;
  width: number; height: number; surface: Surface; todo?: boolean;
  before?: string[]; after?: string[]; result?: string;
}
export interface CaseScreen { id: string; cases: CaseStudy[] }
export interface ProcessStep { number: string; title: string; description: string; backgroundColor: `var(--${string})`; accentColor?: `var(--${string})` }
export interface TeamMember { role: string; description: string; image: string }
export interface FAQItem { id: string; question: string; answer: string; todo?: boolean }
