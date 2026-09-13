import styles from './Mission.module.css'
export function Mission() {
  return <section className={`section ${styles.mission}`} aria-labelledby="mission-heading">
    <img className={styles.photo} src="/media/image-bg.webp" alt="Veterinary team caring for a dog" width="2022" height="1161" loading="lazy" />
    <div className={styles.shade} />
    <div className={styles.content} data-reveal-group><img src="/media/logo-symbol-2.svg" alt="" width="62" height="48" loading="lazy" data-reveal /><h2 id="mission-heading" data-reveal>More time for<br /> veterinary care.</h2><p data-reveal>Our goal is to become a long-term digital partner for veterinary teams across Europe. We start by understanding how you work and identifying what can be made simpler, faster and more effective.</p></div>
  </section>
}
