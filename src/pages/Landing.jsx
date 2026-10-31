import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const layanan = ['Surat pengantar', 'SKTM', 'Surat usaha', 'Surat domisili']
const langkah = ['Ajukan', 'Verifikasi', 'Proses', 'Ambil / unduh']

export default function Landing() {
  const [kode, setKode] = useState('')
  const navigate = useNavigate()

  const lacak = (e) => {
    e.preventDefault()
    if (kode.trim()) navigate(`/tiket/${kode.trim().toUpperCase()}`)
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <section className="py-12">
        <h1 className="max-w-xl text-4xl font-semibold leading-tight">
          Urus surat kelurahan dari rumah, pantau tiap tahapnya
        </h1>
        <p className="mt-3 text-gray-600">
          Ajukan surat, lacak statusnya, dan lihat kinerja layanan secara terbuka.
        </p>
        <form onSubmit={lacak} className="mt-6 flex max-w-md gap-2">
          <input
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            placeholder="Contoh: SK-2026-0142"
            className="flex-1 rounded-md border px-3 py-2"
          />
          <button className="rounded-md bg-blue-600 px-4 py-2 text-white">Lacak</button>
        </form>
      </section>

      <section className="py-8">
        <h2 className="mb-4 text-xl font-medium">Jenis layanan</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {layanan.map((l) => (
            <div key={l} className="rounded-xl border p-4">{l}</div>
          ))}
        </div>
      </section>

      <section className="py-8">
        <h2 className="mb-4 text-xl font-medium">Cara kerja</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {langkah.map((l, i) => (
            <div key={l} className="rounded-xl border p-4">{i + 1}. {l}</div>
          ))}
        </div>
      </section>
    </main>
  )
}