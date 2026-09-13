import { LegalNotice } from './LegalNotice'
import styles from './Footer.module.css'
export function Footer() {
  return <footer className={`container ${styles.footer}`} data-reveal-group data-reveal-page-end>
    <div data-reveal><a className={styles.brand} href="#home"><img src="/media/logo-symbol.svg" alt="" width="62" height="48" loading="lazy" /><span>WeHelp.vet</span></a><p>© 2026 WeHelp.vet. All rights reserved</p></div>
    <div className={styles.links} data-reveal><a className={styles.email} href="mailto:wehelp@vet.vc">wehelp@vet.vc</a><div className={styles.legal}><LegalNotice label="Privacy Policy" /><span aria-hidden="true"> | </span><LegalNotice label="Terms & Conditions" /></div></div>
  </footer>
}
