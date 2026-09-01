import { useId } from 'react'

/*
  Patron geometrico sutil reutilizable (hero de la landing, CTA final,
  panel de AuthAside). Se posiciona absoluto y hereda el color via
  `currentColor`, asi que su color y opacidad se controlan con una clase
  de texto en el padre o en si mismo, p. ej. text-cream-100/[0.06].
*/
export default function GeometricPattern({ className = '' }) {
  const patternId = `geo-${useId().replace(/:/g, '')}`

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern
          id={patternId}
          width="56"
          height="56"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          <path d="M28 14v28M14 28h28" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}
