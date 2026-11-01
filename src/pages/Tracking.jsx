import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { tickets } from '../data/tickets'
import { IconCheck, IconSearchOff } from '../components/Icons'

function CariTiket({ awal }) {
  const [kode, setKode] = useState(awal)
  const navigate = useNavigate()

  const cari = (e) => {
    e.preventDefault()
    const nomor = kode.trim().toUpperCase()
    if (nomor) navigate(`/tiket/${nomor}`)
  }

  return (
    <form onSubmit={cari}>
      <label htmlFor="cari-tiket" className="font-display text-lg font-bold text-ink">
        Input nomor tiket
      </label>
      <div className="mt-3 flex gap-3">
        <input
          id="cari-tiket"
          value={kode}
          onChange={(e) => setKode(e.target.value)}
          autoComplete="off"
          className="min-w-0 flex-1 rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-mute"
        />
        <button type="submit" className="rounded-xl bg-brand px-6 py-3 font-bold text-white hover:brightness-110">
          Lacak
        </button>
      </div>
    </form>
  )
}

function Titik({ state }) {
  if (state === 'selesai') {
    return (
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
        <IconCheck className="h-5 w-5" />
      </span>
    )
  }
  if (state === 'aktif') {
    return (
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-[3px] border-violet bg-white motion-safe:animate-ring">
        <span className="h-3 w-3 rounded-full bg-violet" />
      </span>
    )
  }
  return <span className="h-9 w-9 shrink-0 rounded-full border-2 border-line bg-white" />
}

function Timeline({ steps }) {
  const aktif = steps.findIndex((s) => !s.selesai)
  const keadaan = (s, i) => (s.selesai ? 'selesai' : i === aktif ? 'aktif' : 'menunggu')
  const warnaLabel = (state) => (state === 'menunggu' ? 'text-mute' : 'text-ink')

  return (
    <>
      <ol className="hidden md:flex">
        {steps.map((s, i) => {
          const state = keadaan(s, i)
          const kiri = i > 0 && steps[i - 1].selesai
          const kanan = s.selesai
          return (
            <li key={s.label} className="flex-1 text-center" aria-current={state === 'aktif' ? 'step' : undefined}>
              <div className="flex items-center">
                <span className={`h-1 flex-1 ${i === 0 ? 'bg-transparent' : kiri ? 'bg-violet' : 'bg-line'}`} />
                <Titik state={state} />
                <span
                  className={`h-1 flex-1 ${
                    i === steps.length - 1 ? 'bg-transparent' : kanan ? 'bg-violet' : 'bg-line'
                  }`}
                />
              </div>
              <p className={`mt-3 px-1 text-sm font-semibold ${warnaLabel(state)}`}>{s.label}</p>
              {s.waktu && <p className="mt-0.5 text-xs text-mute">{s.waktu}</p>}
            </li>
          )
        })}
      </ol>

      <ol className="md:hidden">
        {steps.map((s, i) => {
          const state = keadaan(s, i)
          return (
            <li key={s.label} className="flex gap-4" aria-current={state === 'aktif' ? 'step' : undefined}>
              <div className="flex flex-col items-center">
                <Titik state={state} />
                {i < steps.length - 1 && (
                  <span className={`my-1 min-h-6 w-1 flex-1 rounded-full ${s.selesai ? 'bg-violet' : 'bg-line'}`} />
                )}
              </div>
              <div className="pb-5 pt-1.5">
                <p className={`text-sm font-semibold ${warnaLabel(state)}`}>{s.label}</p>
                {s.waktu && <p className="text-xs text-mute">{s.waktu}</p>}
              </div>
            </li>
          )
        })}
      </ol>
    </>
  )
}

export default function Tracking() {
  const { id } = useParams()
  const t = tickets[id]

  const bagian = 'border-t border-line p-6 md:p-8'

  if (!t) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-line bg-white">
          <section className="p-6 md:p-8">
            <CariTiket key={id} awal={id} />
          </section>
          <section className={`${bagian} text-center`}>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pink/10 text-magenta">
              <IconSearchOff className="h-7 w-7" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold text-ink">Tiket tidak ditemukan</h1>
            <p className="mx-auto mt-2 max-w-md text-ink-soft">
              Nomor {id} tidak ada di data kami. Periksa lagi nomornya, atau coba nomor contoh.
            </p>
            <Link
              to="/tiket/SK-2026-0142"
              className="mt-5 inline-block rounded-xl border-2 border-ink px-5 py-2 text-sm font-bold text-ink hover:bg-ink hover:text-white"
            >
              Coba SK-2026-0142
            </Link>
          </section>
        </div>
      </main>
    )
  }

  const persen = Math.min(100, Math.round((t.hariBerjalan / t.slaHari) * 100))
  const sisa = Math.max(0, t.slaHari - t.hariBerjalan)

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="rounded-3xl border border-line bg-white">
        <section className="p-6 md:p-8">
          <CariTiket key={id} awal={id} />
        </section>

        <section className={bagian}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-display text-2xl font-bold text-ink">Tiket {id}</h1>
              <p className="mt-1 text-ink-soft">{t.jenis} - diajukan {t.tanggal}</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-900">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              {t.status}
            </span>
          </div>
          <h2 className="mb-6 mt-8 font-display text-lg font-bold text-ink">Status</h2>
          <Timeline steps={t.steps} />
        </section>

        <section className={bagian}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-lg text-ink">
              Sisa waktu: <strong className="font-bold">{sisa} dari {t.slaHari} hari</strong>
            </p>
            <p className="text-lg text-ink-soft">Target SLA {t.slaHari} Hari</p>
          </div>
          <div
            role="progressbar"
            aria-label="Waktu SLA yang sudah terpakai"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={persen}
            className="mt-4 h-3 overflow-hidden rounded-full bg-violet/10"
          >
            <div className="h-full rounded-full bg-brand" style={{ width: `${persen}%` }} />
          </div>
          <p className="mt-2 text-right text-sm font-semibold text-ink-soft">{persen}%</p>
        </section>

        <section className={`${bagian} grid gap-8 md:grid-cols-2`}>
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Catatan Petugas</h2>
            <div className="mt-3 rounded-xl border border-line bg-canvas p-5">
              <p className="text-sm text-mute">{t.catatan.tanggal} · {t.catatan.oleh}</p>
              <p className="mt-2 leading-relaxed text-ink">{t.catatan.isi}</p>
            </div>
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Detail Pengajuan</h2>
            <dl className="mt-3">
              {[
                ['Jenis Surat', t.jenis],
                ['Pemohon', t.pemohon],
                ['Kelurahan', t.kelurahan],
                ['Berkas', `${t.berkas} File`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-line py-3 last:border-b-0">
                  <dt className="font-semibold text-ink">{k}</dt>
                  <dd className="text-right text-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>
    </main>
  )
}
