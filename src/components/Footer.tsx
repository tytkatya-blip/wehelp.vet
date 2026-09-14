import { LegalNotice } from './LegalNotice'
import styles from './Footer.module.css'
export function Footer() {
  return <footer className={`container ${styles.footer}`} data-reveal-group data-reveal-page-end>
    <a className={styles.brand} href="#home" data-reveal><img src="/media/logo-symbol.svg" alt="" width="62" height="48" loading="lazy" /><span>WeHelp.vet</span></a>
    <a className={styles.email} href="mailto:wehelp@vet.vc" data-reveal>wehelp@vet.vc</a>
    <div className={styles.legal} data-reveal><LegalNotice label="Privacy Policy" /><span aria-hidden="true"> | </span><LegalNotice label="Terms & Conditions" /></div>
    <p className={styles.copyright} data-reveal>© 2026 WeHelp.vet. All rights reserved</p>
  </footer>
}
