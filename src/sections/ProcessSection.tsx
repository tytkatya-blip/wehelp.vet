import { copy, steps } from '../data/content'
import { Container, SectionHeading } from '../components/Primitives'
export default function ProcessSection() {
  return <section className="process-section surface-dark" id="team" aria-labelledby="process-title"><Container>
    <SectionHeading id="process-title" text={copy.processBody} centered>From the first conversation<br /> to launch — one team</SectionHeading>
    <ol className="three-grid process-cards">{steps.map(([title,text],i) => <li className="process-card" key={title}><span className="step-number" aria-hidden="true">0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
  </Container></section>
}
