import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
type SceneSetup = (motion: typeof gsap) => void | (() => void)
const desktopMotionQuery = '(min-width: 1025px) and (prefers-reduced-motion: no-preference)'

/** Pass a stable setup function when the animation stage is approved.
 * Nothing is pinned or hidden in stage one. MatchMedia reverts only this scene.
 */
export function useMotionScene(
  scope: RefObject<HTMLElement | null>,
  setup?: SceneSetup,
  query = desktopMotionQuery,
) {
  useLayoutEffect(() => {
    if (!scope.current || !setup) return
    const media = gsap.matchMedia()
    media.add(query, () => setup(gsap), scope)
    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      window.cancelAnimationFrame(refreshFrame)
      media.revert()
    }
  }, [scope, setup, query])
}
