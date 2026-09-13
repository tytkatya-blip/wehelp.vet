import { services } from '../data/content'
import styles from './WhatWeDo.module.css'
export function WhatWeDo() {
  return <section id="what-we-do" className={`container section ${styles.section}`} aria-labelledby="services-heading" data-reveal-group>
    <img className={styles.symbol} src="/media/logo-symbol.svg" alt="" width="62" height="48" loading="lazy" data-reveal />
    <div className="section-heading" data-reveal><p className="eyebrow">What we do</p><h2 id="services-heading">We help grow businesses<br /> through digital solutions.</h2></div>
    <div className={styles.grid} data-reveal-group>{services.map(service => <article className={styles.card} key={service.title} data-reveal>
      <img src={service.icon} alt="" width="48" height="48" loading="lazy" /><h3>{service.title}</h3><p>{service.description}</p>
    </article>)}</div>
    <p className={styles.other} data-reveal-group data-reveal>Is there another problem? <a href="#contact">Let’s work through it together</a></p>
  </section>
}
