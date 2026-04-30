import dynamic from 'next/dynamic'
import Image from 'next/image';
import Link from 'next/link'

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 md:h-96 rounded-xl border border-gold/40 bg-zinc-900 flex items-center justify-center">
      <span className="text-gold animate-pulse">Cargando mapa...</span>
    </div>
  ),
})

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-16">

      {/* HERO */}
      <section className="flex flex-col items-center text-center gap-6">
        <Image
          //src="/imagen9.png"
          //src="/imagen10.png"
          src="/imagen11.png"
          //src="/CBT_dorado.png"
          //src="/CBT_dorado.png"
          //src="/imagen5.png"
          alt="Charly Boxing Team"
          width={500}
          height={500}
          priority
          className="w-full max-w-sm md:max-w-lg object-contain drop-shadow-2xl mix-blend-screen"
        />
        <div className="space-y-2">
          <p className="text-silver text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Gimnasio de boxeo en Iquique, Chile. Entrenamiento de alto nivel
          </p>
        </div>
        <Link
          href="/socios"
          className="inline-flex items-center gap-2 bg-red-boxing hover:bg-red-dark text-white font-bold px-7 py-3 rounded-lg transition-colors shadow-lg text-base"
        >
          🥊 Consultar mi Plan
        </Link>
      </section>

      {/* UBICACIÓN */}
      <section className="space-y-4">
        <SectionTitle icon="📍" text="Dónde Encontrarnos" />
        <p className="text-silver text-sm">
          Los Lilenes 1877, Iquique, Tarapacá — Chile
        </p>
        <MapComponent />
      </section>

      {/* REDES SOCIALES */}
      <section className="space-y-6">
        <SectionTitle icon="🥊" text="Síguenos" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SocialCard
            href="https://www.facebook.com/cbtiquique"
            platform="Facebook"
            handle="@cbtiquique"
            colorClass="bg-[#1877F2]"
            icon={<FacebookIcon />}
          />
          <SocialCard
            href="https://www.instagram.com/cbt_boxing/"
            platform="Instagram"
            handle="@cbt_boxing"
            colorClass="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]"
            icon={<InstagramIcon />}
          />
        </div>
      </section>

      {/* HORARIOS */}
      <section className="space-y-4">
        <SectionTitle icon="🕐" text="Horarios de Entrenamiento" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            { dia: 'Lunes - Viernes', hora: '19:30 - 21:00' },
            { dia: 'Sábado', hora: '10:30 - 12:00' },
            { dia: 'Domingo', hora: 'Cerrado' },
          ].map((h) => (
            <div
              key={h.dia}
              className="flex justify-between items-center bg-zinc-900 border border-gold/20 rounded-lg px-4 py-3"
            >
              <span className="text-silver font-medium">{h.dia}</span>
              <span className={`font-bold ${h.hora === 'Cerrado' ? 'text-red-boxing' : 'text-gold'}`}>
                {h.hora}
              </span>
            </div>
          ))}
        </div>
        <p className="text-zinc-500 text-xs">* Horarios referenciales, confirma por redes sociales.</p>
      </section>

    </div>
  )
}

function SectionTitle({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <h2 className="text-xl font-black text-gold tracking-wide uppercase">{text}</h2>
      <div className="flex-1 h-px bg-gold/20" />
    </div>
  )
}

function SocialCard({
  href,
  platform,
  handle,
  colorClass,
  icon,
}: {
  href: string
  platform: string
  handle: string
  colorClass: string
  icon: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${colorClass} rounded-xl p-5 flex items-center gap-4 hover:opacity-90 transition-opacity shadow-lg`}
    >
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-black text-white text-lg">{platform}</p>
        <p className="text-white/80 text-sm">{handle}</p>
      </div>
      <div className="ml-auto text-white/60">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </div>
    </a>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}
