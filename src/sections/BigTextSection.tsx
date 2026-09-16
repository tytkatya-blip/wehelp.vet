import { Fragment, useLayoutEffect, useRef } from 'react'
import { Container } from '../components/Primitives'

const text = 'We help grow businesses through digital solutions. Your team shouldn’t spend the day doing work your digital system could handle'
const words = text.split(' ')

export default function BigTextSection() {
  const heading = useRef<HTMLHeadingElement>(null)
  useLayoutEffect(() => {
    const element = heading.current
    if (!element) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const spans = Array.from(element.querySelectorAll<HTMLElement>('.big-text-word'))
    let frame = 0
    const update = () => {
      frame = 0
      if (media.matches) {
        delete element.dataset.wordMotion
        spans.forEach(span => span.style.removeProperty('--word-opacity'))
        return
      }
      const bounds = element.getBoundingClientRect()
      const height = window.innerHeight
      const progress = Math.max(0, Math.min(1, (height * .85 - bounds.top) / (bounds.height + height * .45)))
      spans.forEach((span, index) => {
        const fill = Math.max(0, Math.min(1, progress * spans.length - index))
        span.style.setProperty('--word-opacity', String(.16 + .84 * fill))
      })
      element.dataset.wordMotion = 'ready'
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    media.addEventListener('change', schedule)
    document.fonts.ready.then(schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      media.removeEventListener('change', schedule)
      delete element.dataset.wordMotion
      spans.forEach(span => span.style.removeProperty('--word-opacity'))
    }
  }, [])
  return <section className="big-text-section" id="big-text" aria-labelledby="big-text-title">
    <Container>
      <h2 id="big-text-title" className="big-text-heading" ref={heading} aria-label={text}>
        {words.map((word, index) => <Fragment key={index}><span className="big-text-word" aria-hidden="true">{word}</span>{index < words.length - 1 ? ' ' : ''}</Fragment>)}
      </h2>
    </Container>
  </section>
}
