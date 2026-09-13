import { useRef, useState, type FormEvent } from 'react'
import { LegalNotice } from '../components/LegalNotice'
import styles from './Contact.module.css'
type Field = 'firstName' | 'lastName' | 'email' | 'message'
type Errors = Partial<Record<Field, string>>
const fields: { name: Field; label: string; autoComplete?: string; placeholder?: string }[] = [
  { name: 'firstName', label: 'First name', autoComplete: 'given-name' },
  { name: 'lastName', label: 'Last name', autoComplete: 'family-name' },
  { name: 'email', label: 'Work email', autoComplete: 'email' },
  { name: 'message', label: 'Your challenge', placeholder: 'Tell us what is currently difficult or what you would like to create.' },
]
export function Contact() {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next: Errors = {}
    fields.forEach(field => {
      const value = String(data.get(field.name) ?? '').trim()
      if (!value) next[field.name] = `Please enter ${field.name === 'message' ? 'a short description of your challenge' : `your ${field.label.toLowerCase()}`}.`
      else if (field.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) next.email = 'Enter a valid email address, such as name@clinic.com.'
    })
    setErrors(next)
    const firstError = fields.find(field => next[field.name])
    if (firstError) {
      setStatus('Please correct the highlighted fields. Nothing has been sent.')
      ;(formRef.current?.elements.namedItem(firstError.name) as HTMLElement | null)?.focus()
      return
    }
    // TODO: Select a form provider, implement server-side validation and approved legal consent.
    // No network request, data persistence, fake confirmation or form reset in this stage.
    setStatus('Your details are ready, but this form is not connected yet. Nothing has been sent. Please email wehelp@vet.vc to discuss your project.')
  }
  return <section id="contact" className={styles.contact} aria-labelledby="contact-heading"><div className={`container ${styles.grid}`}>
    <div className={styles.copy} data-reveal-group><h2 id="contact-heading" data-reveal>Your challenge.<br />Our next step.</h2><p className={styles.intro} data-reveal>Tell us what you would like to launch, improve or simplify. You don’t need to prepare a technical brief.</p><div className={styles.followUp}><h3 data-reveal>What happens after you get in touch?</h3><p data-reveal>You will hear directly from the studio founder. We’ll discuss your project in English or arrange translation support in advance. Then we’ll recommend the most practical first step and agree on the scope and cost before any work begins.</p></div></div>
    <form ref={formRef} className={styles.form} noValidate onSubmit={submit} data-reveal-group>
      <div className={styles.fields}>{fields.map(field => <div key={field.name} className={field.name === 'email' || field.name === 'message' ? styles.full : undefined} data-reveal>
        <label htmlFor={field.name}>{field.label}</label>
        {field.name === 'message' ? <textarea id={field.name} name={field.name} rows={5} required maxLength={5000} placeholder={field.placeholder} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} onChange={() => setStatus('')} />
          : <input id={field.name} name={field.name} type={field.name === 'email' ? 'email' : 'text'} autoComplete={field.autoComplete} required maxLength={field.name === 'email' ? 254 : 100} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} onChange={() => setStatus('')} />}
        {errors[field.name] && <p id={`${field.name}-error`} className={styles.error}>{errors[field.name]}</p>}
      </div>)}</div>
      <button type="submit" className="button" data-reveal>Discuss your project</button>
      <div className={styles.legal} data-reveal>By clicking, you agree to our <LegalNotice label="Terms & Conditions" /> and <LegalNotice label="Privacy Policy" />.</div>
      <p role="status" aria-live="polite" className={styles.status}>{status}</p>
    </form>
  </div></section>
}
