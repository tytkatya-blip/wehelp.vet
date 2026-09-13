import { useSyncExternalStore, type Ref } from 'react'
import styles from './HeroMedia.module.css'
const subscribe = (callback: () => void) => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}
const getSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
interface HeroMediaProps { poster?: string; videoSrc?: string; mediaRef?: Ref<HTMLDivElement> }
export function HeroMedia({ poster, videoSrc, mediaRef }: HeroMediaProps) {
  const reducedMotion = useSyncExternalStore(subscribe, getSnapshot, () => true)
  return <div ref={mediaRef} className={styles.media}>
    {videoSrc && poster && !reducedMotion
      ? <video autoPlay muted loop playsInline poster={poster} aria-hidden="true"><source src={videoSrc} /></video>
      : poster ? <img src={poster} width="2022" height="1335" alt="" fetchPriority="high" />
      // TODO: Supply a local hero poster if the current asset is removed.
      : <div className={styles.placeholder}>Hero media — awaiting image</div>}
    <div className={styles.shade} />
  </div>
}
