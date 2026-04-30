'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/socios', label: 'Consultar Plan' },
  ]

  return (
    <nav className="bg-black border-b border-gold sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/CBT_texto.png"
            alt="Charly Boxing Team"
            width={160}
            height={40}
            priority
            className="h-12 w-auto object-contain mix-blend-screen"
          />
          <span className="hidden sm:block text-xs text-gold font-semibold tracking-wider uppercase">
            Charly Boxing Team
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                  pathname === l.href
                    ? 'bg-gold text-black'
                    : 'text-silver hover:text-gold'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gold"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-zinc-900 border-t border-gold/30 px-4 py-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm font-semibold transition-colors ${
                pathname === l.href ? 'text-gold' : 'text-silver hover:text-gold'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
