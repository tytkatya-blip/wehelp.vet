import { useEffect, useRef, useState } from 'react'
import { navigation } from '../data/content'
import styles from './Header.module.css'

export function Header() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let previousY = Math.max(window.scrollY, 0)
    let frame = 0

    const updateVisibility = () => {
      const currentY = Math.max(window.scrollY, 0)
      const distance = currentY - previousY
      const focusedElement = document.activeElement
      const hasKeyboardFocus = focusedElement instanceof HTMLElement
        && header.current?.contains(focusedElement)
        && focusedElement.matches(':focus-visible')

      if (open || hasKeyboardFocus || currentY <= 80) {
        setHidden(false)
        previousY = currentY
      } else if (Math.abs(distance) >= 6) {
        setHidden(distance > 0 && currentY > 160)
        previousY = currentY
      }

      frame = 0
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateVisibility)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 701px)')
    const resize = () => { if (desktop.matches) setOpen(false) }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', outside)
    desktop.addEventListener('change', resize)
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); desktop.removeEventListener('change', resize) }
  }, [open])
  return <header
    ref={header}
    className={`${styles.header} ${hidden ? styles.hidden : ''}`}
    onFocusCapture={() => setHidden(false)}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}
  >
    <a className={styles.brand} href="#home" aria-label="WeHelp.vet home">WeHelp.vet</a>
    <button ref={toggle} className={styles.toggle} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    <nav id="main-navigation" aria-label="Main navigation" className={`${styles.nav} ${open ? styles.open : ''}`}>
      <div className={styles.menu}>{navigation.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}</div>
      <a className={`button ${styles.cta}`} href="#contact" onClick={() => setOpen(false)}>Let’s discuss</a>
    </nav>
  </header>
}
