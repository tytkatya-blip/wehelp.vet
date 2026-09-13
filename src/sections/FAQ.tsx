import { useState } from 'react'
import { faqs } from '../data/content'
import styles from './FAQ.module.css'
export function FAQ() {
  const [expanded, setExpanded] = useState<string | null>(null)
  return <section id="faq" className="container section" aria-labelledby="faq-heading">
    <div className="section-heading" data-reveal-group><p className="eyebrow" data-reveal>Before we begin</p><h2 id="faq-heading" data-reveal>Getting started is easier<br /> than it seems.</h2><p className={styles.intro} data-reveal>Come to us with a clear idea — or simply with something that has been making your work more difficult.</p></div>
    <div className={styles.list} data-reveal-group>{faqs.map(item => <div key={item.id} className={styles.item} data-reveal>
      <h3><button id={`question-${item.id}`} aria-expanded={expanded === item.id} aria-controls={`answer-${item.id}`} onClick={() => setExpanded(expanded === item.id ? null : item.id)}>{item.question}<img className={styles.chevron} src="/media/chevron.svg" alt="" aria-hidden="true" /></button></h3>
      <div id={`answer-${item.id}`} role="region" aria-labelledby={`question-${item.id}`} aria-hidden={expanded !== item.id} className={`${styles.answer} ${expanded === item.id ? styles.answerOpen : ''}`}>
        <div className={styles.answerInner}><p className={item.todo ? 'todo' : undefined}>{item.answer}</p></div>
      </div>
    </div>)}</div>
  </section>
}
