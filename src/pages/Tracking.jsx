import { useParams, Link } from 'react-router-dom'
import { tickets } from '../data/tickets'

export default function Tracking() {
  const { id } = useParams()
  const t = tickets[id]

  if (!t) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p>Tiket {id} tidak ditemukan. Periksa lagi nomornya.</p>
        <Link to="/" className="text-blue-600">Kembali ke beranda</Link>
      </main>
    )
  }

  const aktif = t.steps.findIndex((s) => !s.selesai)
  const persen = Math.min(100, Math.round((t.hariBerjalan / t.slaHari) * 100))

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Tiket {id}</h1>
          <p className="text-gray-600">{t.jenis} · diajukan {t.tanggal}</p>
        </div>
        <span className="rounded-md bg-amber-100 px-3 py-1 text-sm text-amber-800">{t.status}</span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <section className="rounded-xl border p-5 md:col-span-2">
          <h2 className="mb-4 font-medium">Riwayat status</h2>
          <ol className="space-y-4">
            {t.steps.map((s, i) => (
              <li key={s.label} className="flex gap-3">
                <span
                  className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                    s.selesai ? 'bg-green-600' : i === aktif ? 'bg-blue-600' : 'border border-gray-400'
                  }`}
                />
                <div>
                  <p className={s.selesai || i === aktif ? 'font-medium' : 'text-gray-500'}>{s.label}</p>
                  {s.waktu && <p className="text-sm text-gray-500">{s.waktu} · {s.oleh}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl border p-4">
            <h2 className="mb-2 font-medium">Target waktu (SLA)</h2>
            <div className="h-2 rounded bg-gray-100">
              <div className="h-2 rounded bg-blue-600" style={{ width: `${persen}%` }} />
            </div>
            <p className="mt-1 text-sm text-gray-600">Hari ke-{t.hariBerjalan} dari {t.slaHari} hari</p>
          </div>
          <div className="rounded-xl border p-4">
            <h2 className="mb-2 font-medium">Catatan petugas</h2>
            <p className="text-sm text-gray-600">{t.catatan}</p>
          </div>
        </aside>
      </div>
    </main>
  )
}