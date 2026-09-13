import { useCallback, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cases } from '../data/content'
import type { CaseStudy } from '../types/content'
import { useMotionScene } from '../hooks/useMotionScene'
import styles from './Experience.module.css'

function Comparison({ item }: { item: CaseStudy }) {
  if (!item.before || !item.after) return null

  return <div className={styles.comparison}>
    <div className={styles.before}>
      <p className={styles.label}>Before</p>
      <ul>{item.before.map(line => <li key={line}>{line}</li>)}</ul>
    </div>
    <img className={styles.arrow} src="/media/arrow.svg" alt="" width="39" height="17" />
    <div>
      <p className={styles.label}>After</p>
      <ul>{item.after.map(line => <li key={line}>{line}</li>)}</ul>
    </div>
  </div>
}

function StaticCase({ item }: { item: CaseStudy }) {
  return <article className={styles.staticCase} data-reveal-group data-reveal>
    <div className={`${styles.staticVisual} ${styles[item.surface]}`}>
      <img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
    </div>
    <div className={styles.staticCopy}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <Comparison item={item} />
      {item.result && <p className={styles.result}>{item.result}</p>}
    </div>
  </article>
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const setupScene = useCallback((motion: typeof gsap) => {
    const stage = stageRef.current
    const track = trackRef.current
    if (!stage || !track) return

    const firstBodies = motion.utils.toArray<HTMLElement>('[data-first-body]', stage)
    const slides = motion.utils.toArray<HTMLElement>('[data-case-slide]', track)
    const firstCase = stage.querySelector<HTMLElement>('[data-first-case]')
    const firstImage = stage.querySelector<HTMLElement>('[data-first-image]')
    const slideOffset = (index: number) => slides[index].offsetLeft - slides[0].offsetLeft

    motion.set(firstBodies.slice(1), { autoAlpha: 0, y: 24 })
    motion.set(firstBodies[0], { autoAlpha: 1, y: 0 })
    motion.set(slides, { x: 0 })
    motion.set(slides[2], { x: () => slideOffset(1) - slideOffset(2) })
    motion.set(slides.slice(1), { autoAlpha: 0 })
    motion.set(slides[0], { autoAlpha: 1 })
    if (firstCase) motion.set(firstCase, { autoAlpha: 0, y: 32 })
    if (firstImage) motion.set(firstImage, { autoAlpha: 0, y: 32 })

    let latestProgress = 0

    const entranceTimeline = motion.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top 82%',
        once: true,
      },
    })

    if (firstCase) entranceTimeline.to(firstCase, { autoAlpha: 1, y: 24, duration: 0.82, ease: 'power3.out' }, 0)
    if (firstImage) entranceTimeline.to(firstImage, { autoAlpha: 1, y: 0, duration: 0.82, ease: 'power3.out' }, 0.12)

    const firstBodyTimeline = motion.timeline({ paused: true })
      .to(firstBodies[0], { autoAlpha: 0, y: -24, duration: 0.18, ease: 'power1.in' }, 0)
      .fromTo(firstBodies[1], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power2.out' }, 0.2)

    if (firstCase) firstBodyTimeline.to(firstCase, { y: 0, duration: 0.46, ease: 'power2.out' }, 0)

    const firstTransition = motion.timeline({ paused: true })
      .to(slides[0], { x: () => -slideOffset(1), duration: 0.85, ease: 'power1.in', force3D: true }, 0)
      .to(slides[0], { autoAlpha: 0, duration: 0.24, ease: 'none' }, 0.61)
      .to(slides[1], { x: () => -slideOffset(1), duration: 0.95, ease: 'power1.out', force3D: true }, 0.28)
      .to(slides[1], { autoAlpha: 1, duration: 0.75, ease: 'none' }, 0.4)

    const secondTransition = motion.timeline({ paused: true })
      .to(slides[1], { x: () => -slideOffset(2), duration: 0.85, ease: 'power1.in', force3D: true }, 0)
      .to(slides[1], { autoAlpha: 0, duration: 0.24, ease: 'none' }, 0.61)
      .to(slides[2], { x: () => -slideOffset(2), duration: 0.95, ease: 'power1.out', force3D: true }, 0.28)
      .to(slides[2], { autoAlpha: 1, duration: 0.75, ease: 'none' }, 0.4)

    firstTransition.eventCallback('onComplete', () => {
      if (latestProgress >= 0.65) secondTransition.play()
    })

    secondTransition.eventCallback('onReverseComplete', () => {
      if (latestProgress < 0.34) firstTransition.reverse()
    })

    const pinTrigger = ScrollTrigger.create({
      trigger: stage,
      start: 'top top',
      end: () => `+=${window.innerHeight * 6.2}`,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefresh: () => {
        firstTransition.invalidate()
        secondTransition.invalidate()
      },
      onUpdate: ({ progress }) => {
        latestProgress = progress

        if (progress >= 0.1) firstBodyTimeline.play()
        else firstBodyTimeline.reverse()

        if (progress >= 0.65) {
          firstTransition.play()
          if (firstTransition.progress() >= 0.999) secondTransition.play()
        } else {
          secondTransition.reverse()

          if (progress >= 0.34) firstTransition.play()
          else if (secondTransition.progress() === 0) firstTransition.reverse()
        }
      },
    })

    return () => {
      pinTrigger.kill()
      entranceTimeline.scrollTrigger?.kill()
      entranceTimeline.kill()
      firstBodyTimeline.kill()
      firstTransition.kill()
      secondTransition.kill()
    }
  }, [])

  useMotionScene(sectionRef, setupScene)

  return <section id="cases" className={`section ${styles.outer}`} ref={sectionRef} aria-labelledby="cases-heading">
    <div ref={stageRef} className={styles.motionScene}>
      <div className={styles.stickyContent}>
        <div className={`container section-heading ${styles.intro}`} data-reveal-group>
          <p className="eyebrow" data-reveal>Experience in the veterinary field</p>
          <h2 id="cases-heading" data-reveal>Here’s How We Help{' '}
            <span className={styles.abbreviation}>
              <abbr tabIndex={0} aria-describedby="iavc-tooltip">IAVC</abbr>
              <span id="iavc-tooltip" role="tooltip" className={styles.tooltip}>International Academy of Veterinary Chiropractic</span>
            </span>
          </h2>
        </div>

        <div className={styles.carouselViewport} role="region" aria-label="IAVC case studies">
          <div ref={trackRef} className={styles.track}>
            {cases.map((item, index) => <article className={styles.caseSlide} data-case-slide key={item.id} aria-label={`Case study ${index + 1} of ${cases.length}`}>
              {index === 0 ? <div className={styles.caseCopy} data-first-case>
                <h3>{item.title}</h3>
                <div className={styles.firstBodyStack}>
                  <div className={`${styles.firstBody} ${styles.firstBodyInitial}`} data-first-body>
                    <p className={styles.description}>{item.description}</p>
                  </div>
                  <div className={styles.firstBody} data-first-body>
                    <Comparison item={item} />
                    {item.result && <p className={styles.result}>{item.result}</p>}
                  </div>
                </div>
              </div> : <div className={styles.caseCopy}>
                <h3>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </div>}

              <div className={`${styles.imageFrame} ${styles[item.surface]}`} data-first-image={index === 0 ? '' : undefined}>
                <img src={item.image} alt={item.alt} width={item.width} height={item.height} loading={index === 0 ? 'eager' : 'lazy'} />
              </div>
            </article>)}
          </div>
        </div>
      </div>
    </div>

    <div className={styles.staticList}>
      {cases.map(item => <StaticCase item={item} key={item.id} />)}
    </div>
  </section>
}
