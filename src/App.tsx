import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { WhatWeDo } from './sections/WhatWeDo'
import { Experience } from './sections/Experience'
import { HowWeWork } from './sections/HowWeWork'
import { Team } from './sections/Team'
import { Mission } from './sections/Mission'
import { FAQ } from './sections/FAQ'
import { Contact } from './sections/Contact'
import { useRevealAnimations } from './hooks/useRevealAnimations'

export default function App() {
  useRevealAnimations()

  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Hero /><WhatWeDo /><Experience /><HowWeWork /><Team /><Mission /><FAQ /><Contact /></main><Footer /></>
}
