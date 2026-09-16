import type { ReactNode } from 'react'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>
}
export function Button({ children = 'Discuss your project', className = '' }: { children?: ReactNode; className?: string }) {
  return <a className={`button ${className}`} href="#contact">{children}</a>
}
export function SectionHeading({ id, children, text, eyebrow, centered = false }: { id: string; children: ReactNode; text?: string; eyebrow?: string; centered?: boolean }) {
  return <div className={`section-intro ${centered ? 'section-intro--center' : ''}`}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2 id={id}>{children}</h2>
    {text && <p className="intro-body">{text}</p>}
  </div>
}
