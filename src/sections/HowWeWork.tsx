import { useCallback, useRef } from 'react'
import gsap from 'gsap'
import { processSteps } from '../data/content'
import { useMotionScene } from '../hooks/useMotionScene'
import styles from './HowWeWork.module.css'

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  const setupScene = useCallback((motion: typeof gsap) => {
    const stage = stageRef.current
    const layers = layersRef.current
    const heading = headingRef.current
    if (!stage || !layers || !heading) return

    const steps = motion.utils.toArray<HTMLElement>('[data-process-step]', layers)
    const items = steps.map(step => motion.utils.toArray<HTMLElement>('[data-process-item]', step))
    const numbers = motion.utils.toArray<HTMLElement>('[data-process-number]', layers)
    const titles = motion.utils.toArray<HTMLElement>('h3', layers)
    const descriptions = motion.utils.toArray<HTMLElement>('[data-process-description]', layers)
    if (steps.length !== 3) return

    const rootStyles = getComputedStyle(document.documentElement)
    const initialGreen = rootStyles.getPropertyValue('--color-surface-green').trim()
    const finalGreen = rootStyles.getPropertyValue('--color-surface-green-strong').trim()
    const isMobile = window.matchMedia('(max-width: 700px)').matches
    const finalScale = isMobile ? 1 : 0.72
    const finalNumberSize = isMobile ? 14 : 'var(--text-large)'
    const finalNumberMargin = isMobile ? 'var(--space-3)' : 'var(--space-5)'
    const finalTitleSize = isMobile ? 24 : 'var(--text-h2)'
    const finalDescriptionSize = isMobile ? 15 : 16 / finalScale
    const singleStepOffset = () => -window.innerHeight * 0.05
    const finalOffset = () => Math.min(225, window.innerHeight * 0.27)
    const mobileFinalOffsets = () => {
      const heights = steps.map(step => step.offsetHeight)
      const contentHeight = heights.reduce((total, height) => total + height, 0)
      const availableGap = (layers.clientHeight - contentHeight) / (steps.length - 1)
      const gap = Math.max(0, Math.min(16, availableGap))
      const stackHeight = contentHeight + gap * (steps.length - 1)
      let cursor = -stackHeight / 2

      return heights.map(height => {
        const center = cursor + height / 2
        cursor += height + gap
        return center
      })
    }
    const finalY = (index: number) => {
      if (isMobile) return mobileFinalOffsets()[index]
      if (index === 0) return -finalOffset()
      if (index === 2) return finalOffset()
      return 0
    }

    motion.set(stage, { backgroundColor: initialGreen })
    motion.set(heading, { autoAlpha: 0, y: 12 })
    motion.set(steps, { autoAlpha: 0, scale: 1, y: singleStepOffset, transformOrigin: '50% 50%' })
    motion.set(items.flat(), { autoAlpha: 0, y: 18 })

    const entranceTimeline = motion.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top 62%',
        end: 'top 12%',
        scrub: 0.7,
      },
    })

    entranceTimeline
      .to(heading, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0)
      .set(steps[0], { autoAlpha: 1 }, 0.08)
      .to(items[0], { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.12, ease: 'power2.out' }, 0.1)

    const timeline = motion.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: () => `+=${window.innerHeight * 6.2}`,
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    timeline
      .to(items[0], { autoAlpha: 0, y: -14, duration: 0.3, stagger: 0.035, ease: 'power1.inOut' }, 1.04)
      .set(steps[0], { autoAlpha: 0 }, 1.42)
      .set(steps[1], { autoAlpha: 1 }, 1.3)
      .to(items[1], { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.12, ease: 'power2.out' }, 1.34)
      .to(items[1], { autoAlpha: 0, y: -14, duration: 0.3, stagger: 0.035, ease: 'power1.inOut' }, 2.24)
      .set(steps[1], { autoAlpha: 0 }, 2.62)
      .set(steps[2], { autoAlpha: 1 }, 2.5)
      .to(items[2], { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.12, ease: 'power2.out' }, 2.54)
      .to(items[2], { autoAlpha: 0, y: -14, duration: 0.3, stagger: 0.035, ease: 'power1.inOut' }, 3.44)
      .set(steps[2], { autoAlpha: 0 }, 3.82)
      .to(stage, { backgroundColor: finalGreen, duration: 0.62, ease: 'none' }, 3.64)
      .set(items.flat(), { autoAlpha: 1, y: 0 }, 4.02)
      .set(numbers, { fontSize: finalNumberSize, marginBottom: finalNumberMargin }, 4.02)
      .set(titles, { fontSize: finalTitleSize }, 4.02)
      .set(descriptions, { fontSize: finalDescriptionSize }, 4.02)
      .set(steps, {
        autoAlpha: 0,
        scale: finalScale,
        y: index => finalY(index) + 30,
      }, 4.02)
      .to(steps[0], { autoAlpha: 1, y: () => finalY(0), duration: 0.52, ease: 'power2.out' }, 4.08)
      .to(steps[1], { autoAlpha: 1, y: () => finalY(1), duration: 0.52, ease: 'power2.out' }, 4.22)
      .to(steps[2], { autoAlpha: 1, y: () => finalY(2), duration: 0.52, ease: 'power2.out' }, 4.36)
      .to({}, { duration: 0.6 })

    return () => {
      entranceTimeline.scrollTrigger?.kill()
      entranceTimeline.kill()
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }, [])

  useMotionScene(
    sectionRef,
    setupScene,
    '(min-width: 1025px) and (prefers-reduced-motion: no-preference), (max-width: 700px) and (prefers-reduced-motion: no-preference)',
  )

  return <section id="how-we-work" ref={sectionRef} className={`section ${styles.outer}`} aria-labelledby="process-heading">
    <div ref={stageRef} className={styles.stage}>
      <h2 ref={headingRef} id="process-heading" className={`eyebrow ${styles.heading}`}>How we work</h2>
      <div ref={layersRef} className={styles.layers}>{processSteps.map(step => <article key={step.number} className={styles.layer} data-process-step>
        <div className={styles.content}>
          <p className={styles.number} style={{ color: step.accentColor }} data-process-item data-process-number>{step.number}</p>
          <h3 data-process-item>{step.title}</h3>
          <p data-process-item data-process-description>{step.description}</p>
        </div>
      </article>)}</div>
    </div>
  </section>
}
