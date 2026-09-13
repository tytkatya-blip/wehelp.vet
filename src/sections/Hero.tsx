import { useCallback, useRef } from 'react'
import gsap from 'gsap'
import { HeroMedia } from '../components/HeroMedia'
import { useMotionScene } from '../hooks/useMotionScene'
import styles from './Hero.module.css'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

  const setupScene = useCallback((motion: typeof gsap) => {
    const section = sectionRef.current
    const media = mediaRef.current
    if (!section || !media) return

    const rootStyles = getComputedStyle(document.documentElement)
    const targetInset = () => parseFloat(rootStyles.getPropertyValue('--page-gutter')) / 2
    const targetRadius = () => parseFloat(rootStyles.getPropertyValue('--radius-media'))

    motion.set(media, { clipPath: 'inset(0px 0px 0px 0px round 0px)' })

    const timeline = motion.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * 0.52}`,
        scrub: 0.65,
        invalidateOnRefresh: true,
      },
    }).to(media, {
      clipPath: () => `inset(0px ${targetInset()}px 0px ${targetInset()}px round ${targetRadius()}px)`,
      duration: 1,
      ease: 'none',
    })

    return () => timeline.kill()
  }, [])

  useMotionScene(sectionRef, setupScene)
  // TODO: Supply a compressed local video and playback controls before enabling videoSrc.
  return <section id="home" ref={sectionRef} className={styles.hero} aria-labelledby="hero-heading">
    <HeroMedia mediaRef={mediaRef} poster="/media/image-hero.webp" />
    <div className={styles.content}>
      <h1 id="hero-heading" data-hero-reveal>A digital partner for<br className={styles.break} /> veterinarians and their teams.</h1>
      <div className={styles.support}><p data-hero-reveal>We simplify work processes, build websites, and help launch educational platforms</p><a href="#contact" className="button button-light" data-hero-reveal>Let’s discuss your problem</a></div>
    </div>
  </section>
}
