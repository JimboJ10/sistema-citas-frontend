import LandingNavbar from './LandingNavbar.jsx'
import Hero from './Hero.jsx'
import ProblemaSolucion from './ProblemaSolucion.jsx'
import Features from './Features.jsx'
import Confianza from './Confianza.jsx'
import CtaFinal from './CtaFinal.jsx'

/*
  Landing publica en "/". No usa AppLayout (no lleva Navbar de app).
*/
export default function Landing() {
  return (
    <div className="min-h-screen bg-cream-100">
      <LandingNavbar />
      <Hero />
      <ProblemaSolucion />
      <Features />
      <Confianza />
      <CtaFinal />

      <footer className="border-t border-hairline bg-cream-100">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-10 lg:px-10">
          <span className="font-heading text-base font-medium text-brand-700">
            VitalCare
          </span>
          <p className="text-xs text-muted">
            Gestion de citas medicas &middot; proyecto personal &middot;{' '}
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
