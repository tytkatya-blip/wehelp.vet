import { useRef } from 'react'
import { useRevealAnimations } from './hooks/useRevealAnimations'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import HelpEntrySection from './sections/HelpEntrySection'
import ServicesSection from './sections/ServicesSection'
import CaseStudySection from './sections/CaseStudySection'
import InsightSection from './sections/InsightSection'
import ProcessSection from './sections/ProcessSection'
import FAQSection from './sections/FAQSection'
import ContactSection from './sections/ContactSection'
export default function App() {
  const main = useRef<HTMLElement>(null)
  useRevealAnimations(main)
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main" ref={main}><Hero /><HelpEntrySection /><ServicesSection /><CaseStudySection /><InsightSection /><ProcessSection /><FAQSection /><ContactSection /></main><Footer /></>
}
