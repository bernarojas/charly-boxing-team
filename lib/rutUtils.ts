export function normalizarRut(rut: string): string {
  return rut.replace(/\./g, '').replace(/-/g, '').toUpperCase().trim()
}

export function validarRut(rut: string): boolean {
  const rutNorm = normalizarRut(rut)
  if (rutNorm.length < 8) return false
  const cuerpo = rutNorm.slice(0, -1)
  const dv = rutNorm.slice(-1)
  if (!/^\d+$/.test(cuerpo)) return false

  let suma = 0
  let multiplicador = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador
    multiplicador = multiplicador < 7 ? multiplicador + 1 : 2
  }

  const resultado = 11 - (suma % 11)
  let dvEsperado: string
  if (resultado === 11) dvEsperado = '0'
  else if (resultado === 10) dvEsperado = 'K'
  else dvEsperado = String(resultado)

  return dv === dvEsperado
}

export function formatearRut(rut: string): string {
  const rutNorm = normalizarRut(rut)
  if (rutNorm.length < 2) return rut
  const cuerpo = rutNorm.slice(0, -1)
  const dv = rutNorm.slice(-1)
  const cuerpoNum = parseInt(cuerpo)
  if (isNaN(cuerpoNum)) return rut
  return `${cuerpoNum.toLocaleString('es-CL')}-${dv}`
}
