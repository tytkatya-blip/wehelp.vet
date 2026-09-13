import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useRevealAnimations() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const heroItems = gsap.utils.toArray<HTMLElement>('[data-hero-reveal]')

        if (heroItems.length) {
          gsap.fromTo(heroItems,
            { autoAlpha: 0, '--hero-reveal-y': '28px' },
            {
              autoAlpha: 1,
              '--hero-reveal-y': '0px',
              duration: 0.9,
              stagger: 0.18,
              delay: 0.18,
              ease: 'power3.out',
              clearProps: 'opacity,visibility,--hero-reveal-y',
            },
          )
        }

        const groups = gsap.utils.toArray<HTMLElement>('[data-reveal-group]')

        groups.forEach(group => {
          const descendants = gsap.utils.toArray<HTMLElement>('[data-reveal]', group)
          const candidates = group.matches('[data-reveal]') ? [group, ...descendants] : descendants
          const items = candidates.filter(item => item.closest('[data-reveal-group]') === group)
          if (!items.length) return

          gsap.fromTo(items,
            { autoAlpha: 0, y: 32 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.82,
              stagger: 0.12,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
              scrollTrigger: {
                trigger: group,
                start: group.hasAttribute('data-reveal-page-end') ? 'top 98%' : 'top 86%',
                once: true,
              },
            },
          )
        })
      })

      return () => context.revert()
    })

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    const refreshAfterFonts = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refreshAfterFonts)

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      media.revert()
    }
  }, [])
}
