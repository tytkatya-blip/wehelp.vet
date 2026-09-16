import { copy } from '../data/content'
import { Button, Container } from '../components/Primitives'
export default function Hero() {
  return <section className="hero" id="home" aria-labelledby="hero-title">
    <Container className="hero-inner">
      <div className="hero-copy">
        <h1 id="hero-title">A digital partner<br className="desktop-break" /> for veterinary teams</h1>
        <p>{copy.heroBody}</p>
        <Button />
      </div>
      <img className="hero-image" src="/media/hero-image.webp" alt="" width="1404" height="1000" fetchPriority="high" />
    </Container>
  </section>
}
