import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button, Container } from './Primitives'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menu = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  const cta = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const element = header.current
    const button = cta.current
    if (!element || !button) return
    const measure = () => element.style.setProperty('--header-cta-width', `${button.offsetWidth}px`)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(button)
    return () => { observer.disconnect(); element.style.removeProperty('--header-cta-width') }
  }, [])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menu.current?.focus() }
    }
    const onOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onOutside)
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onOutside) }
  }, [open])
  return <header ref={header} className={`header ${scrolled ? 'is-scrolled' : ''}`} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false)
  }}>
    <Container className="header-inner">
      <a className="brand" href="#home" onClick={() => setOpen(false)} aria-label="WeHelp.vet — home">WeHelp.Vet</a>
      <div ref={cta} className={`header-cta ${scrolled ? 'is-visible' : ''}`} inert={!scrolled} aria-hidden={!scrolled}>
        <Button>Let's discuss</Button>
      </div>
      <button className="menu-toggle" ref={menu} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
      <nav id="navigation" className={`navigation ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        <a href="#services" onClick={() => setOpen(false)}>Services</a>
        <a href="#experience" onClick={() => setOpen(false)}>Experience</a>
        <a href="#team" onClick={() => setOpen(false)}>Team</a>
      </nav>
    </Container>
  </header>
}
