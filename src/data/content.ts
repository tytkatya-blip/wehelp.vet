import type { Service, CaseStudy, CaseScreen, ProcessStep, TeamMember, FAQItem } from '../types/content'

export const navigation = [
  { label: 'What we do', href: '#what-we-do' },
  { label: 'Cases', href: '#cases' },
  { label: 'Team', href: '#team' },
]
export const services: Service[] = [
  { title: 'Websites and Web Services', icon: '/media/web-icon.svg', description: 'We plan the design, build websites with a CMS, and set up forms and registration. We help you present your services clearly and make it easier for customers to contact you.' },
  { title: 'Processes & Communications', icon: '/media/email-icon.svg', description: 'We set up email campaigns, integrate services, and create tools that reduce the manual work involved in handling requests, emails, and data.' },
  { title: 'Educational Platforms', icon: '/media/edu-icon.svg', description: 'We select and customize an LMS for your courses. We produce videos and course materials, upload lessons, and set up participant registration.' },
]
export const cases: CaseStudy[] = [
  { id: 'email-campaign', title: 'From choosing a service to a fully functional email campaign', description: 'We were asked to select a platform. We researched the options, set up the account, imported the contacts, and launched the campaign.', image: '/media/case-image-01.webp', alt: 'IAVC online course application form', width: 717, height: 663, surface: 'blue', before: ['Print the PDF.', 'Fill it out by hand.', 'Send a photo.'], after: ['Link from the email.', 'Fill out the form.', 'Submit the request.'], result: 'Course applications are now coming in through the online form.' },
  { id: 'case-02', title: 'Website and Infrastructure', description: 'A new website with a CMS, migration of content and data. Domains and accounts are managed by the academy.', image: '/media/case-image-02.webp', alt: 'IAVC website shown at desktop and mobile sizes', width: 790, height: 460, surface: 'green' },
  { id: 'case-03', title: 'Educational Platform', description: 'Selection of an LMS, preparation of videos and PDFs, lessons and questions developed in collaboration with instructors.', image: '/media/case-image-03.webp', alt: 'IAVC course listings for the horse and dog model and equine essentials', width: 790, height: 460, surface: 'greenStrong' },
]
export const caseScreens: CaseScreen[] = [
  { id: 'email', cases: [cases[0]] },
  { id: 'website-and-education', cases: [cases[1], cases[2]] },
]
export const processSteps: ProcessStep[] = [
  { number: '01', title: 'We understand the challenge.', description: 'We assess the current situation and identify what’s holding the team back. We propose the first step and agree on the deliverables, scope, and cost.', backgroundColor: 'var(--color-background)', accentColor: 'var(--color-accent-dark)' },
  { number: '02', title: 'We take care of the implementation.', description: 'We select the right tools, design, and develop the solution. We drive the work forward ourselves, demonstrate progress, and coordinate key decisions.', backgroundColor: 'var(--color-background)', accentColor: 'var(--color-accent-dark)' },
  { number: '03', title: 'We stay by your side.', description: 'We test the solution together with your team, hand over all access and explain how everything works. Ongoing support can be arranged separately.', backgroundColor: 'var(--color-background)', accentColor: 'var(--color-accent-dark)' },
]
export const team: TeamMember[] = [
  { role: 'Founder & Project Lead', image: '/media/team-01.webp', description: 'Your main point of contact. He understands the challenge, recommends the right approach and guides the project from start to finish.' },
  { role: 'Developer', image: '/media/team-02.webp', description: 'Builds digital services, connects systems and makes sure everything works reliably.' },
  { role: 'Designer', image: '/media/team-03.webp', description: 'Makes complex things clear and easy to use — from the overall structure to the smallest interface details.' },
]
export const faqs: FAQItem[] = [
  { id: 'project', question: 'What kind of project can we start with?', answer: 'We can begin with your website enquiry flow, the launch of a new course or a single time-consuming manual process. We work with both independent veterinary professionals and larger teams. What matters most is the challenge and the value the solution can bring.' },
  // TODO: Obtain approved answers to the four collapsed questions in the concept.
  { id: 'software', question: 'Will we need to replace the software we already use?', answer: 'TODO: Answer awaiting approved content.', todo: true },
  { id: 'budget', question: 'How are the budget and timeline determined?', answer: 'TODO: Answer awaiting approved content.', todo: true },
  { id: 'ai', question: 'Do you use AI?', answer: 'TODO: Answer awaiting approved content.', todo: true },
  { id: 'language', question: 'What language will we communicate in?', answer: 'TODO: Answer awaiting approved content.', todo: true },
]
