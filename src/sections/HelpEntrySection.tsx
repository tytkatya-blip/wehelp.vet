import { copy, help } from '../data/content'
import { Container, SectionHeading } from '../components/Primitives'
const titleLines = [['It’s difficult for clients', 'to get in touch'], ['The team is doing', 'too much manually'], ['You have an idea.', 'You need someone to build it']]
export default function HelpEntrySection() {
  return <section className="help-section surface-muted" aria-labelledby="help-title"><Container>
    <SectionHeading id="help-title" text={copy.helpBody} centered>{copy.helpTitle}</SectionHeading>
    <div className="three-grid help-cards">{help.map(([title, text], i) => <article className="light-card" key={title}><h3>{titleLines[i][0]}<br />{titleLines[i][1]}</h3><p>{text}</p></article>)}</div>
  </Container></section>
}
