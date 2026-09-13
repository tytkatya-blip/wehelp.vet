import { team } from '../data/content'
import styles from './Team.module.css'
export function Team() {
  return <section id="team" className="container section" aria-labelledby="team-heading" data-reveal-group>
    <p className="eyebrow" data-reveal>The WeHelp.vet team</p>
    <div className={styles.intro} data-reveal><h2 id="team-heading">Personally involved.<br />Working together.</h2><p>You work directly with the people leading your project. We bring together design, development and project coordination to turn an idea into a working solution.</p></div>
    <div className={styles.grid} data-reveal-group>{team.map(member => <article key={member.role} className={styles.member} data-reveal>
      <img src={member.image} alt={`WeHelp.vet ${member.role}`} width="600" height="600" loading="lazy" /><h3>{member.role}</h3><p>{member.description}</p>
    </article>)}</div>
  </section>
}
