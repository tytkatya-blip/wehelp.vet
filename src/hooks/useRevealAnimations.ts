import { useLayoutEffect } from 'react'
import type { RefObject } from 'react'

// Content is visible by default. Only this mounted, scoped enhancement hides pending targets.
export function useRevealAnimations(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window)) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const targets = new Set<HTMLElement>()
    const shown = new Set<HTMLElement>()
    let observer: IntersectionObserver | undefined
    const add = (element: HTMLElement | null, delay = 0, kind = 'content') => {
      if (!element) return
      targets.add(element)
      element.dataset.revealKind = kind
      element.style.setProperty('--reveal-delay', `${delay}ms`)
    }
    root.querySelectorAll<HTMLElement>('.section-intro').forEach(intro => {
      add(intro.querySelector('h2'), 0, 'heading')
      add(intro.querySelector('.eyebrow'))
      add(intro.querySelector('.intro-body'), 100)
    })
    root.querySelectorAll<HTMLElement>('.help-cards, .service-list, .editorial-rows, .process-cards, .faq-list').forEach(group => {
      Array.from(group.children).forEach((element, index) => add(element as HTMLElement, Math.min(index * 100, 400)))
    })
    add(root.querySelector('.hero h1'), 100, 'heading')
    add(root.querySelector('.hero-copy p'), 200)
    add(root.querySelector('.hero-copy .button'), 300)
    add(root.querySelector('.hero-image'), 0, 'hero-image')
    add(root.querySelector('.case-media'), 100)
    add(root.querySelector('.other-task'), 200)
    add(root.querySelector('.faq-image'), 100)
    add(root.querySelector('.contact-language'), 200)
    add(root.querySelector('.form-panel'), 100)

    const reveal = (element: HTMLElement) => {
      shown.add(element)
      element.dataset.reveal = 'visible'
      observer?.unobserve(element)
    }
    const start = () => {
      observer?.disconnect()
      if (media.matches) {
        delete root.dataset.motion
        targets.forEach(reveal)
        return
      }
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) reveal(entry.target as HTMLElement)
        })
      }, { threshold: 0.5 })
      targets.forEach(element => {
        const bounds = element.getBoundingClientRect()
        if (shown.has(element) || bounds.bottom <= 0) {
          reveal(element)
        } else {
          element.dataset.reveal = 'pending'
          observer?.observe(element)
        }
      })
      root.dataset.motion = 'ready'
    }
    const onFocus = (event: FocusEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLElement>('[data-reveal]')
      if (element && targets.has(element)) {
        element.style.setProperty('--reveal-delay', '0ms')
        reveal(element)
      }
    }
    start()
    media.addEventListener('change', start)
    root.addEventListener('focusin', onFocus)
    return () => {
      observer?.disconnect()
      media.removeEventListener('change', start)
      root.removeEventListener('focusin', onFocus)
      delete root.dataset.motion
      targets.forEach(element => {
        delete element.dataset.reveal
        delete element.dataset.revealKind
        element.style.removeProperty('--reveal-delay')
      })
    }
  }, [rootRef])
}
