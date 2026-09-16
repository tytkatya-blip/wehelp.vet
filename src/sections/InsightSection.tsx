import { copy, insights } from '../data/content'
import { Container, SectionHeading } from '../components/Primitives'
export default function InsightSection() {
  return <section className="insight-section" aria-labelledby="insight-title"><Container>
    <SectionHeading id="insight-title" text={copy.insightBody} centered>We notice more<br /> than what is in the brief</SectionHeading>
    <div className="editorial-rows">{insights.map(([title,text]) => <article className="split-grid editorial-row" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
  </Container></section>
}
