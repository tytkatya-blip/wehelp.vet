import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button, Container } from './Primitives'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
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
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => { setMobile(media.matches); if (!media.matches) setOpen(false) }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
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
  return <header ref={header} className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-menu-open' : ''}`} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false)
  }}>
    <Container className="header-inner">
      <a className="brand" href="#home" onClick={() => setOpen(false)} aria-label="WeHelp.vet — home"><img className="brand-symbol" src="/media/logo-symbol-header.svg?v=385b2a9871" width="40" height="40" alt="" /><span>WeHelp.Vet</span></a>
      <div ref={cta} className={`header-cta ${scrolled ? 'is-visible' : ''}`} inert={!scrolled} aria-hidden={!scrolled}>
        <Button>Let's discuss</Button>
      </div>
      <button className="menu-toggle" ref={menu} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>
        <span className="burger-lines" aria-hidden="true"><span /><span /><span /></span>
      </button>
      <nav id="navigation" className={`navigation ${open ? 'is-open' : ''}`} aria-label="Main navigation" inert={mobile && !open} aria-hidden={mobile && !open ? true : undefined}>
        <div className="navigation-panel"><div className="navigation-content">
        <a href="#services" onClick={() => setOpen(false)}>Services</a>
        <a href="#experience" onClick={() => setOpen(false)}>Experience</a>
        <a href="#team" onClick={() => setOpen(false)}>Team</a>
        <a className="button navigation-cta" href="#contact" onClick={() => setOpen(false)}>Let's discuss</a>
        </div></div>
      </nav>
    </Container>
  </header>
}
