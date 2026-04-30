'use client'

import { useState } from 'react'


const GYM_LAT = -20.235665385540166
const GYM_LON = -70.14035142361048

const EMBED_URL = `https://maps.google.com/maps?q=${GYM_LAT},${GYM_LON}&z=16&output=embed`
const MAPS_LINK = `https://www.google.com/maps?q=${GYM_LAT},${GYM_LON}`

export default function MapComponent() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden border border-gold/40">
      {!loaded && (
        <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center gap-3 z-10">
          <svg className="animate-spin w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gold text-sm font-semibold animate-pulse">Cargando mapa...</p>
        </div>
      )}

      <iframe
        src={EMBED_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación Charly Boxing Team"
        onLoad={() => setLoaded(true)}
      />

      <a
        href={MAPS_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 left-2 bg-black/80 text-gold text-xs px-3 py-1 rounded-full border border-gold/40 hover:bg-black transition-colors z-20"
      >
        📍 Abrir en Google Maps
      </a>
    </div>
  )
}
