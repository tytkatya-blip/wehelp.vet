import { useState } from 'react'
import { faq } from '../data/content'
import { Container, SectionHeading } from '../components/Primitives'
export default function FAQSection() {
  const [active, setActive] = useState<number | null>(0)
  return <section className="faq-section" id="questions" aria-labelledby="faq-title"><Container>
    <SectionHeading id="faq-title" centered>Before the first<br /> conversation</SectionHeading>
    <div className="faq-list">{faq.map(([question,answer],i) => <div className={`faq-item ${active === i ? 'is-expanded' : ''}`} key={question}>
      <h3><button id={`faq-button-${i}`} aria-expanded={active === i} aria-controls={`faq-answer-${i}`} onClick={() => setActive(active === i ? null : i)}>{question}<img className="chevron-icon" src="/media/chevron.svg" width="11" height="5" alt="" /></button></h3>
      <div id={`faq-answer-${i}`} className="faq-answer" role="region" aria-labelledby={`faq-button-${i}`} inert={active !== i} aria-hidden={active !== i}><div><p>{answer}</p></div></div>
    </div>)}</div>
    <img className="faq-image" src="/media/image-faq.webp" alt="" width="1430" height="708" loading="lazy" />
  </Container></section>
}
