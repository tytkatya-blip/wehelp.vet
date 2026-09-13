import { useRef, useState } from 'react'
import styles from './LegalNotice.module.css'
export function LegalNotice({ label }: { label: 'Privacy Policy' | 'Terms & Conditions' }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  // TODO: Replace this explicit placeholder with approved legal copy and stable URLs.
  return <><button ref={trigger} type="button" className={styles.link} onClick={() => { dialog.current?.showModal(); setOpen(true) }}>{label}</button>
    <dialog ref={dialog} className={styles.dialog} aria-label={label} onClose={() => { setOpen(false); trigger.current?.focus() }}>
      {open && <><h2>{label}</h2><p>TODO: This document has not been supplied. Approved legal content is required before the contact form can accept submissions.</p><button type="button" className="button" onClick={() => dialog.current?.close()}>Close</button></>}
    </dialog></>
}
