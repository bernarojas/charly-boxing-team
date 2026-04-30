import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'


export const metadata: Metadata = {
  title: 'Charly Boxing Team | Iquique',
  description: 'Gimnasio de boxeo en Iquique, Chile. Entrena con los mejores.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-background text-foreground antialiased min-h-screen overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-gold/20 mt-16 py-6 text-center text-silver text-xs">
          <p>
            © {new Date().getFullYear()} Charly Boxing Team — En memoria de{' '}
            <span className="text-gold font-semibold">Charles Villarroel Medina (1962–2016)</span>
          </p>
        </footer>
      </body>
    </html>
  )
}
