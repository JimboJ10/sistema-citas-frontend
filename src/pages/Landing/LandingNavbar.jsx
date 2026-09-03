import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SECTIONS = [
  { href: '#por-que', label: 'Por que VitalCare' },
  { href: '#caracteristicas', label: 'Caracteristicas' },
  { href: '#confianza', label: 'Confianza' },
]

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('landing-hero')
    if (!hero) {
      setScrolled(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: '-72px 0px 0px 0px' },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const linkClass = `rounded-md px-3 py-1.5 text-sm transition-colors duration-300 ${
    scrolled
      ? 'text-muted hover:text-ink'
      : 'text-cream-100/75 hover:text-cream-50'
  }`

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled
          ? 'border-hairline bg-cream-100/80 shadow-sm'
          : 'border-transparent bg-brand-700'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link
          to="/"
          className={`font-heading text-lg font-medium tracking-tight transition-colors duration-300 ${
            scrolled ? 'text-brand-700' : 'text-cream-50'
          }`}
        >
          VitalCare
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden items-center gap-1 md:flex">
            <Link to="/doctores" className={linkClass}>
              Doctores
            </Link>
            {SECTIONS.map((section) => (
              <a key={section.href} href={section.href} className={linkClass}>
                {section.label}
              </a>
            ))}
          </div>

          <Link
            to="/login"
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              scrolled
                ? 'bg-brand-500 text-cream-50 shadow-sm hover:bg-brand-600'
                : 'border border-cream-100/30 text-cream-50 hover:bg-cream-100/10'
            }`}
          >
            Iniciar sesion
          </Link>
        </div>
      </nav>
    </header>
  )
}