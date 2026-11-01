import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroVisual from '../components/HeroVisual'
import { IconFile, IconHeart, IconStore, IconPin } from '../components/Icons'

const layanan = [
  { nama: 'Surat Pengantar', deskripsi: 'Pengantar RT/RW untuk berbagai urusan administrasi.', Ikon: IconFile },
  { nama: 'SKTM', deskripsi: 'Surat keterangan tidak mampu untuk bantuan dan keringanan biaya.', Ikon: IconHeart },
  { nama: 'Surat Usaha', deskripsi: 'Keterangan usaha untuk perizinan atau pengajuan pembiayaan.', Ikon: IconStore },
  { nama: 'Surat Domisili', deskripsi: 'Bukti tempat tinggal untuk sekolah, kerja, atau perbankan.', Ikon: IconPin },
]

const langkah = [
  { judul: 'Ajukan', deskripsi: 'Isi form dan unggah berkas dari rumah, lalu dapat nomor tiket.' },
  { judul: 'Verifikasi', deskripsi: 'RT/RW memeriksa pengajuan sebelum diteruskan ke kelurahan.' },
  { judul: 'Diproses', deskripsi: 'Petugas memproses berkas dan lurah menandatangani secara digital.' },
  { judul: 'Selesai', deskripsi: 'Surat siap diambil atau diunduh, lengkap dengan QR keaslian.' },
]

const statistik = [
  { nilai: '1.248', label: 'Pengajuan' },
  { nilai: '2,4 Hari', label: 'Rata-rata proses' },
  { nilai: '92%', label: 'Tepat waktu' },
]

export default function Landing() {
  const [kode, setKode] = useState('')
  const navigate = useNavigate()

  const lacak = (e) => {
    e.preventDefault()
    const nomor = kode.trim().toUpperCase()
    if (nomor) navigate(`/tiket/${nomor}`)
  }

  return (
    <main className="mx-auto max-w-6xl px-6">
      <section className="grid items-center gap-10 py-12 md:grid-cols-[1.1fr_1fr] md:py-16">
        <div>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
            Urus Surat dari Rumah,
            <br className="hidden sm:block" /> Lacak seperti Paket
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            Ajukan surat, lacak statusnya, dan lihat kinerja layanan secara terbuka.
          </p>
          <form onSubmit={lacak} className="mt-8 flex max-w-xl gap-3">
            <label htmlFor="nomor-tiket" className="sr-only">Nomor tiket</label>
            <input
              id="nomor-tiket"
              value={kode}
              onChange={(e) => setKode(e.target.value)}
              placeholder="Masukkan nomor tiket, mis. SK-2026-0142"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-mute"
            />
            <button
              type="submit"
              className="rounded-xl bg-brand px-6 py-3 font-bold text-white hover:brightness-110"
            >
              Lacak
            </button>
          </form>
        </div>
        <HeroVisual />
      </section>

      <section id="layanan" className="scroll-mt-24 border-t border-line py-12">
        <h2 className="font-display text-2xl font-bold text-ink">Daftar Layanan</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {layanan.map(({ nama, deskripsi, Ikon }) => (
            <li key={nama} className="rounded-2xl border border-line bg-white p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet/10 text-violet">
                <Ikon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{nama}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{deskripsi}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="cara-kerja" className="scroll-mt-24 border-t border-line py-12">
        <h2 className="font-display text-2xl font-bold text-ink">Cara Kerja</h2>
        <ol className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {langkah.map((l, i) => (
            <li key={l.judul}>
              <div className="flex items-center">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-violet bg-white font-display font-bold text-violet">
                  {i + 1}
                </span>
                {i < langkah.length - 1 && (
                  <span aria-hidden="true" className="ml-3 hidden h-0.5 flex-1 rounded-full bg-line lg:block" />
                )}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{l.judul}</h3>
              <p className="mt-1 max-w-[16rem] text-sm leading-relaxed text-ink-soft">{l.deskripsi}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="statistik" className="scroll-mt-24 border-t border-line pb-20 pt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-2xl font-bold text-ink">Statistik</h2>
          <p className="text-sm text-mute">Data contoh untuk tampilan awal</p>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          {statistik.map((s) => (
            <div key={s.label} className="flex flex-col-reverse rounded-2xl bg-ink px-6 py-5 text-white">
              <dt className="mt-1 text-sm text-white/75">{s.label}</dt>
              <dd className="font-display text-4xl font-bold">{s.nilai}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  )
}
