import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { copy } from '../data/content'
import { Container, SectionHeading } from '../components/Primitives'
type Draft = { name: string; surname: string; email: string; message: string }
export default function ContactSection() {
  const [draft, setDraft] = useState<Draft | null>(null)
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)
  const preview = useRef<HTMLDivElement>(null)
  const name = useRef<HTMLInputElement>(null)
  useEffect(() => { if (draft) preview.current?.focus() }, [draft])
  const prepare = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    for (const control of Array.from(form.elements)) {
      if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement) {
        control.value = control.value.trim()
      }
    }
    if (!form.reportValidity()) return
    const data = new FormData(form)
    setDraft({ name: String(data.get('name')), surname: String(data.get('surname')), email: String(data.get('email')), message: String(data.get('message')) })
    setCopied(false); setFailed(false)
  }
  const copyDraft = async () => {
    if (!draft) return
    try { await navigator.clipboard.writeText(`${[draft.name, draft.surname].filter(Boolean).join(' ')}\n${draft.email}\n\n${draft.message}`); setCopied(true); setFailed(false) }
    catch { setFailed(true) }
  }
  return <section className="contact-section surface-muted" id="contact" aria-labelledby="contact-title"><Container className="contact-grid">
    <div className="contact-copy"><SectionHeading id="contact-title" text={copy.contactBody}>Tell us how things<br /> work for you</SectionHeading><p className="contact-language">We communicate in English.<br />Translation can be arranged if needed.</p></div>
    <div className="form-panel">
      <form onSubmit={prepare} hidden={!!draft}>
        <div className="form-name-row">
          <div><label htmlFor="name">Your name</label><input ref={name} id="name" name="name" autoComplete="given-name" required maxLength={120} /></div>
          <div><label htmlFor="surname">Surname</label><input id="surname" name="surname" autoComplete="family-name" maxLength={120} /></div>
        </div>
        <label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="name@practice.de" />
        <label htmlFor="message">What would you like to improve?</label><textarea id="message" name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Tell us what is currently difficult or what you would like to create." />
        <button className="button button--dark" type="submit">Send message</button>
        <p className="form-note">By clicking, you agree to our <span className="form-legal-link">Terms &amp; Conditions</span> and <span className="form-legal-link">Privacy Policy</span>.</p>
      </form>
      {draft && <div className="draft" ref={preview} tabIndex={-1}><p className="eyebrow">Message preview</p><h3>Your draft is ready</h3><p>No data has been sent anywhere. You can copy the text or return to editing.</p><div className="draft-text"><strong>{[draft.name, draft.surname].filter(Boolean).join(' ')}</strong><span>{draft.email}</span><p>{draft.message}</p></div><button className="button button--dark" onClick={copyDraft}>{copied ? 'Copied' : 'Copy text'}</button><button className="edit-draft" onClick={() => { setDraft(null); requestAnimationFrame(() => name.current?.focus()) }}>Back to form</button><p role="status">{failed ? 'Could not copy automatically. Select and copy the text above.' : copied ? 'Your message has been copied.' : ''}</p></div>}
    </div>
  </Container></section>
}
