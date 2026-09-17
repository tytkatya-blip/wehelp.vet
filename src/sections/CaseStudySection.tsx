import { useEffect, useRef, useState } from 'react'
import { copy, outcomes } from '../data/content'
import { Container, SectionHeading } from '../components/Primitives'
const images = ['/media/case-iavc-01.webp', '/media/case-iavc-02.webp', '/media/case-iavc-03.webp']
export default function CaseStudySection() {
  const [active, setActive] = useState(0)
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])
  const requested = useRef(0)
  const requestId = useRef(0)
  useEffect(() => () => { requestId.current += 1 }, [])
  const changeImage = async (direction: number) => {
    const next = (requested.current + direction + images.length) % images.length
    requested.current = next
    const id = ++requestId.current
    const image = imageRefs.current[next]
    if (!image) return
    try { await image.decode() }
    catch { return }
    if (id === requestId.current) setActive(next)
  }
  return <section className="case-section surface-muted" id="experience" aria-labelledby="case-title"><Container>
    <div className="split-grid case-grid">
      <SectionHeading id="case-title" eyebrow="Our work / IAVC" text={copy.caseBody}>Website, platform<br /> and email.<br /> All in one project</SectionHeading>
      <div className="case-media">
      <div className="case-gallery case-gallery--desktop" role="region" aria-label="IAVC project images" aria-roledescription="carousel">
        <div className="case-images">{images.map((src, index) => <img
          key={src}
          ref={element => { imageRefs.current[index] = element }}
          className={`case-image ${active === index ? 'is-active' : ''}`}
          src={src}
          alt={active === index ? 'Website created for the IAVC veterinary academy' : ''}
          aria-hidden={active !== index}
          width="1196" height="800" loading="lazy"
        />)}</div>
        <button className="gallery-arrow gallery-arrow--previous" aria-label="Previous project image" onClick={() => { void changeImage(-1) }}><img className="chevron-icon" src="/media/chevron.svg" width="11" height="5" alt="" /></button>
        <button className="gallery-arrow gallery-arrow--next" aria-label="Next project image" onClick={() => { void changeImage(1) }}><img className="chevron-icon" src="/media/chevron.svg" width="11" height="5" alt="" /></button>
        <span className="sr-only" aria-live="polite">{active + 1} / {images.length}</span>
      </div>
      <div className="case-gallery--mobile" role="region" aria-label="IAVC project images — swipe to browse" aria-roledescription="carousel" tabIndex={0}>
        {images.map((src, index) => <img
          key={src}
          src={src}
          alt={`IAVC veterinary academy project — image ${index + 1} of ${images.length}`}
          width="1196" height="800" loading="lazy"
        />)}
      </div>
      <a className="case-website-link" href="https://i-a-v-c.com/" target="_blank" rel="noopener noreferrer">Visit website <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <div className="editorial-rows">{outcomes.map(([title,text]) => <article className="split-grid editorial-row" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
  </Container></section>
}
