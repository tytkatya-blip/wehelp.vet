import { services } from '../data/content'
import { Container, SectionHeading } from '../components/Primitives'
const icons = ['/media/web-icon.svg', '/media/email-icon.svg', '/media/processes-icon.svg', '/media/edu-icon.svg']
export default function ServicesSection() {
  return <section className="services-section surface-dark" id="services" aria-labelledby="services-title"><Container className="split-grid">
    <div className="services-intro">
      <SectionHeading id="services-title">What we can take<br /> care of</SectionHeading>
      <p className="other-task">Something else?<br /><a href="#contact">Let’s figure it out together.</a></p>
    </div>
    <div className="service-list">{services.map(({title,text},i) => <article className="service-row" key={title}>
      <img src={icons[i]} alt="" width="32" height="32" loading="lazy" /><div><h3>{title}</h3><p>{text}</p></div>
    </article>)}</div>
  </Container></section>
}
