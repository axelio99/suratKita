import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconCheck, IconFile } from '../components/Icons'
import { buatNomorTiket, simpanTiket } from '../data/ticketStorage'

const jenisSurat = [
  {
    nama: 'Surat Pengantar',
    ringkasan: 'Pengantar RT/RW untuk berbagai kebutuhan administrasi.',
    berkas: 'Kartu Keluarga dan KTP pemohon',
  },
  {
    nama: 'SKTM',
    ringkasan: 'Surat keterangan tidak mampu untuk bantuan atau keringanan biaya.',
    berkas: 'Kartu Keluarga dan KTP pemohon',
  },
  {
    nama: 'Surat Usaha',
    ringkasan: 'Keterangan usaha untuk keperluan administrasi dan perizinan.',
    berkas: 'KTP pemohon dan foto tempat usaha',
  },
  {
    nama: 'Surat Domisili',
    ringkasan: 'Keterangan tempat tinggal untuk sekolah, kerja, atau perbankan.',
    berkas: 'Kartu Keluarga dan bukti tempat tinggal',
  },
]

const langkah = ['Pilih jenis surat', 'Isi data', 'Tinjau pengajuan', 'Selesai']

function IkonPanah({ balik = false }) {
  return (
    <svg className={`h-4 w-4 ${balik ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function IndikatorLangkah({ aktif }) {
  return (
    <ol className="grid grid-cols-4">
      {langkah.map((judul, i) => {
        const selesai = i < aktif
        const sekarang = i === aktif
        return (
          <li key={judul} aria-current={sekarang ? 'step' : undefined} className="relative px-1 text-center">
            {i > 0 && <span className={`absolute left-0 right-1/2 top-4 h-0.5 ${selesai ? 'bg-violet' : 'bg-line'}`} />}
            {i < langkah.length - 1 && <span className={`absolute left-1/2 right-0 top-4 h-0.5 ${i < aktif ? 'bg-violet' : 'bg-line'}`} />}
            <span className={`relative mx-auto grid h-8 w-8 place-items-center rounded-full border-2 text-xs font-bold ${selesai ? 'border-violet bg-brand text-white' : sekarang ? 'border-violet bg-white text-violet' : 'border-line bg-white text-mute'}`}>
              {selesai ? <IconCheck className="h-4 w-4" /> : i + 1}
            </span>
            <span className={`mt-2 block text-[10px] font-semibold sm:text-xs ${sekarang || selesai ? 'text-ink' : 'text-mute'}`}>{judul}</span>
          </li>
        )
      })}
    </ol>
  )
}

function BarisTinjauan({ label, children }) {
  return (
    <div className="grid gap-1 border-b border-line py-3 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <dt className="text-sm font-semibold text-ink-soft">{label}</dt>
      <dd className="min-w-0 break-words text-sm text-ink">{children || <span className="text-mute">Belum diisi</span>}</dd>
    </div>
  )
}

export default function AjukanSurat() {
  const [step, setStep] = useState(0)
  const [jenis, setJenis] = useState('')
  const [data, setData] = useState({ nama: '', nik: '', telepon: '', alamat: '', keperluan: '' })
  const [berkas, setBerkas] = useState(null)
  const [nomorTiket, setNomorTiket] = useState('')
  const [pesanSimpan, setPesanSimpan] = useState('')
  const [setuju, setSetuju] = useState(false)
  const formRef = useRef(null)
  const terpilih = jenisSurat.find((item) => item.nama === jenis)

  const ubahData = (event) => setData((sebelumnya) => ({ ...sebelumnya, [event.target.name]: event.target.value }))

  const lanjutDariData = (event) => {
    event.preventDefault()
    if (!formRef.current?.reportValidity()) return
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const konfirmasi = (event) => {
    event.preventDefault()
    if (!setuju) return
    const kode = buatNomorTiket()
    const sekarang = new Date()
    const tanggal = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(sekarang)
    const waktu = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(sekarang)

    try {
      simpanTiket({
        id: kode,
        jenis,
        tanggal,
        status: 'Menunggu Verifikasi RT/RW',
        slaHari: 3,
        hariBerjalan: 0,
        pemohon: data.nama,
        kelurahan: 'Kelurahan Sukamaju',
        berkas: 1,
        catatan: {
          tanggal: `${sekarang.getDate()} ${new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(sekarang)}`,
          oleh: 'Sistem SuratKita',
          isi: 'Pengajuan berhasil dicatat di browser ini dan menunggu verifikasi RT/RW.',
        },
        steps: [
          { label: 'Diajukan', waktu: `${tanggal}, ${waktu}`, oleh: 'Warga', selesai: true },
          { label: 'Verifikasi RT/RW', selesai: false },
          { label: 'Diproses Kelurahan', selesai: false },
          { label: 'Ditandatangani Lurah', selesai: false },
          { label: 'Siap diambil/diunduh', selesai: false },
        ],
      })
    } catch {
      setPesanSimpan('Tiket tidak dapat disimpan di browser ini. Aktifkan penyimpanan situs, lalu coba lagi.')
      return
    }

    setPesanSimpan('')
    setNomorTiket(kode)
    setStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const tombol = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45'
  const labelInput = 'mb-1.5 block text-sm font-semibold text-ink'
  const input = 'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-mute/80'

  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-8 md:pt-12">
      <div className="mb-7">
        <Link to="/" className="text-sm font-semibold text-ink-soft hover:text-violet">Beranda</Link>
        <span className="mx-2 text-mute">/</span>
        <span className="text-sm text-mute">Ajukan Surat</span>
      </div>

      <header className="mb-8 max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-violet">Layanan surat kelurahan</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Ajukan Surat</h1>
        <p className="mt-3 leading-relaxed text-ink-soft">Lengkapi pengajuan dari rumah. Siapkan data dan berkas persyaratan sebelum memulai.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <section className="min-w-0 overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
          <div className="border-b border-line px-5 py-5 sm:px-8">
            <IndikatorLangkah aktif={step} />
          </div>

          {step === 0 && (
            <section className="p-5 sm:p-8">
              <p className="text-sm font-semibold text-violet">Langkah 1 dari 4</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink">Pilih jenis surat</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">Pilih layanan yang paling sesuai dengan kebutuhanmu.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {jenisSurat.map((item) => {
                  const aktif = jenis === item.nama
                  return (
                    <button
                      key={item.nama}
                      type="button"
                      aria-pressed={aktif}
                      onClick={() => setJenis(item.nama)}
                      className={`rounded-2xl border p-4 text-left transition hover:border-violet/60 hover:bg-canvas/70 ${aktif ? 'border-violet bg-violet/5 ring-2 ring-violet/15' : 'border-line bg-white'}`}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet/10 text-violet"><IconFile className="h-5 w-5" /></span>
                        {aktif && <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-white"><IconCheck className="h-4 w-4" /></span>}
                      </span>
                      <span className="mt-4 block font-display font-bold text-ink">{item.nama}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{item.ringkasan}</span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-7 flex justify-end border-t border-line pt-5">
                <button type="button" disabled={!jenis} onClick={() => setStep(1)} className={`${tombol} bg-brand text-white`}>
                  Lanjut isi data <IkonPanah />
                </button>
              </div>
            </section>
          )}

          {step === 1 && (
            <section className="p-5 sm:p-8">
              <p className="text-sm font-semibold text-violet">Langkah 2 dari 4</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink">Isi data pengajuan</h2>
              <p className="mt-2 text-sm text-ink-soft">Jenis surat: <strong className="text-ink">{jenis}</strong></p>
              <form ref={formRef} onSubmit={lanjutDariData} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label>
                    <span className={labelInput}>Nama lengkap</span>
                    <input className={input} name="nama" value={data.nama} onChange={ubahData} placeholder="Sesuai KTP" autoComplete="name" required />
                  </label>
                  <label>
                    <span className={labelInput}>NIK</span>
                    <input className={input} name="nik" value={data.nik} onChange={(e) => setData((prev) => ({ ...prev, nik: e.target.value.replace(/\D/g, '').slice(0, 16) }))} inputMode="numeric" placeholder="16 digit NIK" minLength={16} maxLength={16} pattern="[0-9]{16}" title="Masukkan 16 digit NIK" required />
                  </label>
                  <label>
                    <span className={labelInput}>Nomor WhatsApp</span>
                    <input className={input} name="telepon" value={data.telepon} onChange={ubahData} type="tel" autoComplete="tel" placeholder="08xxxxxxxxxx" required />
                  </label>
                  <label>
                    <span className={labelInput}>Alamat domisili</span>
                    <input className={input} name="alamat" value={data.alamat} onChange={ubahData} autoComplete="street-address" placeholder="Jalan, RT/RW, kelurahan" required />
                  </label>
                </div>
                <label className="block">
                  <span className={labelInput}>Keperluan surat</span>
                  <textarea className={`${input} min-h-24 resize-y`} name="keperluan" value={data.keperluan} onChange={ubahData} placeholder="Ceritakan secara singkat keperluan surat ini" required />
                </label>

                <div className="rounded-2xl bg-canvas p-4 sm:p-5">
                  <h3 className="font-display font-bold text-ink">Berkas persyaratan</h3>
                  <p className="mt-1 text-sm text-ink-soft">Persyaratan awal: {terpilih?.berkas}. Berkas demo dapat dipilih dalam format PDF, JPG, atau PNG.</p>
                  <label className="mt-4 flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-violet/40 bg-white px-4 py-6 text-center transition hover:border-violet">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet/10 text-violet"><IconFile className="h-5 w-5" /></span>
                    <span className="mt-3 text-sm font-bold text-ink">{berkas?.name || 'Pilih berkas persyaratan'}</span>
                    <span className="mt-1 text-xs text-mute">PDF, JPG, atau PNG · maks. 5 MB</span>
                    <input className="sr-only" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" required onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file && file.size > 5 * 1024 * 1024) {
                        e.target.value = ''
                        setBerkas(null)
                        window.alert('Ukuran berkas maksimal 5 MB.')
                        return
                      }
                      setBerkas(file || null)
                    }} />
                  </label>
                </div>

                <div className="flex flex-col-reverse justify-between gap-3 border-t border-line pt-5 sm:flex-row">
                  <button type="button" onClick={() => setStep(0)} className={`${tombol} border border-line text-ink-soft`}><IkonPanah balik /> Kembali</button>
                  <button type="submit" className={`${tombol} bg-brand text-white`}>Tinjau pengajuan <IkonPanah /></button>
                </div>
              </form>
              {pesanSimpan && <p role="alert" className="mt-4 text-sm font-semibold text-magenta">{pesanSimpan}</p>}
            </section>
          )}

          {step === 2 && (
            <section className="p-5 sm:p-8">
              <p className="text-sm font-semibold text-violet">Langkah 3 dari 4</p>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink">Tinjau pengajuan</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">Periksa kembali informasi dan nama berkas sebelum konfirmasi.</p>
              <div className="mt-6 rounded-2xl border border-line px-4 sm:px-5">
                <dl>
                  <BarisTinjauan label="Jenis surat">{jenis}</BarisTinjauan>
                  <BarisTinjauan label="Nama lengkap">{data.nama}</BarisTinjauan>
                  <BarisTinjauan label="NIK">{data.nik}</BarisTinjauan>
                  <BarisTinjauan label="WhatsApp">{data.telepon}</BarisTinjauan>
                  <BarisTinjauan label="Alamat">{data.alamat}</BarisTinjauan>
                  <BarisTinjauan label="Keperluan">{data.keperluan}</BarisTinjauan>
                  <BarisTinjauan label="Berkas">{berkas?.name}</BarisTinjauan>
                </dl>
              </div>
              <form onSubmit={konfirmasi} className="mt-5">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-canvas p-4 text-sm leading-relaxed text-ink-soft">
                  <input type="checkbox" checked={setuju} onChange={(e) => setSetuju(e.target.checked)} className="mt-1 h-4 w-4 accent-violet" />
                  <span>Saya sudah memeriksa data pengajuan ini dan memastikan isinya benar.</span>
                </label>
                <div className="mt-5 flex flex-col-reverse justify-between gap-3 border-t border-line pt-5 sm:flex-row">
                  <button type="button" onClick={() => setStep(1)} className={`${tombol} border border-line text-ink-soft`}><IkonPanah balik /> Ubah data</button>
                  <button type="submit" disabled={!setuju} className={`${tombol} bg-brand text-white`}>Konfirmasi pengajuan <IkonPanah /></button>
                </div>
              </form>
            </section>
          )}

          {step === 3 && (
            <section className="px-5 py-10 text-center sm:px-8 sm:py-14">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-lg shadow-violet/20"><IconCheck className="h-8 w-8" /></span>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-violet">Langkah 4 dari 4</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-ink">Pengajuan siap!</h2>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-soft">Simpan nomor tiket berikut untuk melihat status pengajuanmu.</p>
              <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-line bg-canvas p-5">
                <p className="text-sm font-semibold text-ink-soft">Nomor tiket demo</p>
                <p className="mt-1 font-display text-2xl font-bold tracking-wide text-violet">{nomorTiket}</p>
              </div>
              <p className="mx-auto mt-4 max-w-lg text-xs leading-relaxed text-mute">Tiket tersimpan di browser ini agar bisa dilacak dari perangkat yang sama. Data belum dikirim ke server kelurahan.</p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to={`/tiket/${nomorTiket}`} className={`${tombol} bg-brand text-white`}>Lacak status tiket <IkonPanah /></Link>
                <Link to="/" className={`${tombol} border border-line text-ink-soft`}>Kembali ke beranda</Link>
              </div>
            </section>
          )}
        </section>

        <aside className="h-fit rounded-2xl border border-line bg-white p-5">
          <h2 className="font-display font-bold text-ink">Sebelum mengajukan</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            <li className="flex gap-2"><IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-violet" />Pastikan data sesuai dokumen identitas.</li>
            <li className="flex gap-2"><IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-violet" />Siapkan berkas dalam format PDF atau gambar.</li>
            <li className="flex gap-2"><IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-violet" />Tinjau kembali isian sebelum konfirmasi.</li>
          </ul>
          <div className="mt-5 rounded-xl bg-canvas p-4">
            <p className="text-sm font-bold text-ink">Butuh bantuan?</p>
            <p className="mt-1 text-sm text-ink-soft">Hubungi petugas kelurahan untuk memastikan persyaratan surat.</p>
          </div>
        </aside>
      </div>
    </main>
  )
}
