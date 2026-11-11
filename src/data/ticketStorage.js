import { tickets as tiketContoh } from './tickets'

const KUNCI_TIKET = 'suratkita:tickets:v1'

function bacaTiketTersimpan() {
  try {
    const data = JSON.parse(window.localStorage.getItem(KUNCI_TIKET) || '{}')
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {}
  } catch {
    return {}
  }
}

export function buatNomorTiket() {
  const tiketTersimpan = bacaTiketTersimpan()
  let nomor

  do {
    const tahun = new Date().getFullYear()
    const angka = String(Math.floor(1000 + Math.random() * 9000))
    nomor = `SK-${tahun}-${angka}`
  } while (tiketContoh[nomor] || tiketTersimpan[nomor])

  return nomor
}

export function simpanTiket(tiket) {
  const tiketTersimpan = bacaTiketTersimpan()
  tiketTersimpan[tiket.id] = tiket
  window.localStorage.setItem(KUNCI_TIKET, JSON.stringify(tiketTersimpan))
}

export function cariTiket(nomor) {
  const id = nomor.trim().toUpperCase()
  return tiketContoh[id] || bacaTiketTersimpan()[id] || null
}
