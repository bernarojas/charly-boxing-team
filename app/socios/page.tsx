'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import { validarRut, formatearRut, normalizarRut } from '@/lib/rutUtils'

interface ClienteData {
  rut: string
  nombre: string
  telefono: string
  email: string
  activo: boolean
}

interface MembresiaData {
  plan: string
  fecha_inicio: string
  fecha_fin: string | null
  precio: number
  asistencias_usadas: number | null
  asistencias_restantes: number | null
  notas: string
  dias_restantes: number | null
}

interface ApiResponse {
  cliente: ClienteData
  membresia: MembresiaData | null
  error?: string
}

function formatFecha(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' })
}

function EstadoBadge({ dias }: { dias: number | null }) {
  if (dias === null) {
    return (
      <span className="inline-flex items-center gap-1 bg-blue-900/40 text-blue-300 border border-blue-700/50 text-xs font-bold px-3 py-1 rounded-full">
        ∞ Sin vencimiento
      </span>
    )
  }
  if (dias <= 0) {
    return (
      <span className="inline-flex items-center gap-1 bg-red-900/40 text-red-400 border border-red-700/50 text-xs font-bold px-3 py-1 rounded-full">
        ● Vencida
      </span>
    )
  }
  if (dias <= 7) {
    return (
      <span className="inline-flex items-center gap-1 bg-yellow-900/40 text-yellow-400 border border-yellow-700/50 text-xs font-bold px-3 py-1 rounded-full">
        ⚠ Por vencer ({dias} día{dias !== 1 ? 's' : ''})
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 bg-green-900/40 text-green-400 border border-green-700/50 text-xs font-bold px-3 py-1 rounded-full">
      ✓ Vigente ({dias} días)
    </span>
  )
}

function barColor(dias: number | null): string {
  if (dias === null) return 'border-blue-500 shadow-blue-500/20'
  if (dias <= 0) return 'border-red-boxing shadow-red-boxing/20'
  if (dias <= 7) return 'border-yellow-500 shadow-yellow-500/20'
  return 'border-green-500 shadow-green-500/20'
}

export default function SociosPage() {
  const [rut, setRut] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [rutError, setRutError] = useState<string | null>(null)

  function handleRutChange(val: string) {
    const raw = val.replace(/[^0-9kK]/g, '')
    if (raw.length <= 9) {
      const norm = normalizarRut(raw)
      const formatted = norm.length > 1
        ? formatearRut(norm)
        : norm
      setRut(formatted)
    }
    setRutError(null)
    setResult(null)
    setError(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const rutNorm = normalizarRut(rut)

    if (!validarRut(rutNorm)) {
      setRutError('RUT inválido. Verifica el dígito verificador.')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(`/api/socio/${encodeURIComponent(rutNorm)}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Error al consultar')
      } else {
        setResult(data)
      }
    } catch {
      setError('Error de conexión. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <Image
          src="/imagen20.png"
          alt="Guantes de box"
          width={450}
          height={450}
          className="mx-auto mb-2 drop-shadow-lg mix-blend-screen"
        />
        <h1 className="text-3xl font-black text-white">Consultar Plan</h1>
        <p className="text-silver text-sm">
          Ingresa tu RUT para ver el estado de tu membresía
        </p>
      </div>

      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 border border-gold/20 rounded-2xl p-6 space-y-4 shadow-xl"
      >
        <div className="space-y-2">
          <label htmlFor="rut" className="block text-sm font-semibold text-gold">
            RUT del socio
          </label>
          <input
            id="rut"
            type="text"
            inputMode="text"
            placeholder="12.345.678-9"
            value={rut}
            onChange={(e) => handleRutChange(e.target.value)}
            className={`w-full bg-black border rounded-lg px-4 py-3 text-white text-lg tracking-widest placeholder:text-zinc-600 focus:ring-2 transition-all ${
              rutError
                ? 'border-red-boxing focus:ring-red-boxing/30'
                : 'border-gold/30 focus:border-gold focus:ring-gold/20'
            }`}
          />
          {rutError && (
            <p className="text-red-400 text-xs flex items-center gap-1">
              <span>⚠</span> {rutError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !rut}
          className="w-full bg-red-boxing hover:bg-red-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors text-base"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Consultando...
            </span>
          ) : (
            'Consultar'
          )}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="bg-red-900/30 border border-red-boxing/50 rounded-xl p-4 text-red-300 text-sm flex items-start gap-3">
          <span className="text-xl shrink-0">⚠️</span>
          <div>
            <p className="font-bold">No encontrado</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className={`bg-zinc-900 border-2 rounded-2xl overflow-hidden shadow-2xl ${barColor(result.membresia?.dias_restantes ?? null)}`}>
          {/* Member header */}
          <div className="bg-black px-6 py-5 border-b border-gold/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-gold text-xs font-semibold uppercase tracking-wider">Socio</p>
                <h2 className="text-2xl font-black text-white mt-1">{result.cliente.nombre}</h2>
                <p className="text-silver text-sm mt-1">{formatearRut(result.cliente.rut)}</p>
              </div>
            </div>
          </div>

          {/* Membership */}
          <div className="px-6 py-5">
            {result.membresia ? (
              <div className="space-y-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="shrink-0">
                    <EstadoBadge dias={result.membresia.dias_restantes} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <InfoCard label="Inicio" value={formatFecha(result.membresia.fecha_inicio)} />
                  <InfoCard
                    label="Vencimiento"
                    value={result.membresia.fecha_fin ? formatFecha(result.membresia.fecha_fin) : 'Sin vencimiento'}
                  />
                  {result.membresia.dias_restantes !== null && (
                    <InfoCard
                      label="Días restantes"
                      value={
                        result.membresia.dias_restantes <= 0
                          ? 'Plan vencido'
                          : `${result.membresia.dias_restantes} día${result.membresia.dias_restantes !== 1 ? 's' : ''}`
                      }
                      highlight
                    />
                  )}
                  {result.membresia.asistencias_usadas !== null && (
                    <InfoCard
                      label="Asistencias"
                      value={`${result.membresia.asistencias_usadas} usadas / ${result.membresia.asistencias_restantes ?? '∞'} restantes`}
                    />
                  )}
                </div>

                {result.membresia.notas && (
                  <div className="bg-black/40 border border-gold/10 rounded-lg px-4 py-3">
                    <p className="text-xs text-silver/70 uppercase tracking-wider font-semibold mb-1">Notas</p>
                    <p className="text-silver text-sm">{result.membresia.notas}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="text-5xl">😔</div>
                <p className="text-white font-bold text-lg">Sin membresía activa</p>
                <p className="text-silver text-sm">
                  Este socio no tiene un plan vigente actualmente.
                </p>
                <p className="text-silver text-sm">
                  Contáctanos en{' '}
                  <a href="https://www.facebook.com/cbtiquique" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                    Facebook
                  </a>{' '}
                  o{' '}
                  <a href="https://www.instagram.com/cbt_boxing/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                    Instagram
                  </a>{' '}
                  para renovar tu plan.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function InfoCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-black/40 border border-white/5 rounded-lg px-4 py-3">
      <p className="text-xs text-silver/60 uppercase tracking-wider font-semibold">{label}</p>
      <p className={`font-bold mt-1 text-sm ${highlight ? 'text-gold text-base' : 'text-white'}`}>{value}</p>
    </div>
  )
}
