import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'
import { normalizarRut, validarRut } from '@/lib/rutUtils'

export async function GET(
  _req: NextRequest,
  { params }: { params: { rut: string } }
) {
  const rutRaw = params.rut
  const rut = normalizarRut(rutRaw)

  if (!validarRut(rut)) {
    return NextResponse.json({ error: 'RUT inválido' }, { status: 400 })
  }

  try {
    const clienteDoc = await db.collection('clientes').doc(rut).get()
    if (!clienteDoc.exists) {
      return NextResponse.json({ error: 'Socio no encontrado' }, { status: 404 })
    }
    const cliente = clienteDoc.data()!

    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)

    const snap = await db
      .collection('membresias')
      .where('cliente_rut', '==', rut)
      .where('activa', '==', true)
      .get()

    const membresias = snap.docs.map((d) => d.data())

    const vigentes = membresias.filter((m) => {
      if (!m.fecha_fin) return true
      return new Date(m.fecha_fin) >= hoy
    })

    vigentes.sort((a, b) => {
      if (!a.fecha_fin) return -1
      if (!b.fecha_fin) return 1
      return new Date(b.fecha_fin).getTime() - new Date(a.fecha_fin).getTime()
    })

    const membresia = vigentes[0] ?? null

    let dias_restantes: number | null = null
    if (membresia?.fecha_fin) {
      const fin = new Date(membresia.fecha_fin)
      fin.setHours(0, 0, 0, 0)
      dias_restantes = Math.ceil((fin.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
    }

    return NextResponse.json({
      cliente: {
        rut: cliente.rut,
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        email: cliente.email,
        activo: cliente.activo,
      },
      membresia: membresia
        ? {
            plan: membresia.plan,
            fecha_inicio: membresia.fecha_inicio,
            fecha_fin: membresia.fecha_fin,
            precio: membresia.precio,
            asistencias_usadas: membresia.asistencias_usadas,
            asistencias_restantes: membresia.asistencias_restantes,
            notas: membresia.notas,
            dias_restantes,
          }
        : null,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
