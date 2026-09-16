import { heroContacts } from '../data/content'
import { Container } from './Primitives'
export default function Footer() {
  return <footer className="footer">
    <Container className="footer-inner">
      <div className="footer-brand"><a className="brand" href="#home"><img className="brand-symbol" src="/media/logo-symbol-footer.svg?v=bb5f13ce80" width="40" height="40" alt="" /><span>WeHelp.Vet</span></a><p>Digital partner for veterinary teams.</p></div>
      <ul className="footer-contacts" aria-label="Contacts">
        {heroContacts.filter(contact => contact.id === 'email').map(({ id, label, href }) => <li key={id}>
          {href ? <a href={href}>{label}</a> : <span>{label}</span>}
        </li>)}
      </ul>
      <div className="footer-meta">
        <p className="footer-copyright">© {new Date().getFullYear()} WeHelp.vet. All rights reserved</p>
        <div className="footer-legal"><span>Privacy Policy</span><span aria-hidden="true">|</span><span>Terms &amp; Conditions</span></div>
      </div>
    </Container>
  </footer>
}
