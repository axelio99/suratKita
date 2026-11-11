import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const dataAwal = [
  {
    id: 'SK-2026-0142',
    nama: 'Siti Rahmawati',
    jenis: 'Surat Keterangan Tidak Mampu',
    singkatan: 'SKTM',
    masuk: '11 Nov 2026',
    status: 'Menunggu verifikasi RT/RW',
    rt: 'Belum diverifikasi',
    rw: 'Belum diverifikasi',
    catatan: '',
    sla: 3,
    berjalan: 1,
  },
  {
    id: 'SK-2026-0141',
    nama: 'Bima Pratama',
    jenis: 'Surat Pengantar',
    singkatan: 'Pengantar',
    masuk: '10 Nov 2026',
    status: 'Diproses kelurahan',
    rt: 'Terverifikasi',
    rw: 'Terverifikasi',
    catatan: 'Berkas lengkap, sedang diperiksa petugas.',
    sla: 3,
    berjalan: 2,
  },
  {
    id: 'SK-2026-0139',
    nama: 'Dewi Anggraini',
    jenis: 'Surat Keterangan Domisili',
    singkatan: 'Domisili',
    masuk: '08 Nov 2026',
    status: 'Menunggu persetujuan lurah',
    rt: 'Terverifikasi',
    rw: 'Terverifikasi',
    catatan: 'Dokumen siap ditinjau lurah.',
    sla: 3,
    berjalan: 3,
  },
  {
    id: 'SK-2026-0137',
    nama: 'Rizky Maulana',
    jenis: 'Surat Keterangan Usaha',
    singkatan: 'Usaha',
    masuk: '07 Nov 2026',
    status: 'Surat terbit',
    rt: 'Terverifikasi',
    rw: 'Terverifikasi',
    catatan: 'Surat dapat diunduh oleh pemohon.',
    sla: 5,
    berjalan: 2,
    nomorSurat: '470/128/KEL/XI/2026',
  },
]

const menu = [
  { id: 'ringkasan', label: 'Ikhtisar' },
  { id: 'antrean', label: 'Antrean pengajuan' },
  { id: 'sla', label: 'Laporan SLA' },
  { id: 'surat', label: 'Data surat terbit' },
]

function Status({ children }) {
  const warna = children === 'Surat terbit'
    ? 'border-emerald-700 text-emerald-800'
    : children === 'Menunggu persetujuan lurah'
      ? 'border-violet-700 text-violet-800'
      : children === 'Diproses kelurahan'
        ? 'border-sky-700 text-sky-800'
        : 'border-amber-700 text-amber-900'

  return <span className={`inline-flex border-l-2 pl-2 text-xs font-semibold ${warna}`}>{children}</span>
}

function TombolMenu({ aktif, anak, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-semibold transition ${
        aktif ? 'border-l-2 border-[#d6a84f] bg-white/10 text-white' : 'border-l-2 border-transparent text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      <span>{anak.label}</span>
      {anak.jumlah !== undefined && <span className="text-xs tabular-nums text-white/60">{anak.jumlah}</span>}
    </button>
  )
}

export default function PanelPetugas() {
  const [pengajuan, setPengajuan] = useState(dataAwal)
  const [halaman, setHalaman] = useState('antrean')
  const [pilihan, setPilihan] = useState('Semua status')
  const [kataKunci, setKataKunci] = useState('')
  const [detailId, setDetailId] = useState(null)
  const [catatanBaru, setCatatanBaru] = useState('')
  const [statusBaru, setStatusBaru] = useState('')

  const antrean = pengajuan.filter((item) => item.status !== 'Surat terbit')
  const daftarTampil = useMemo(() => {
    const sumber = halaman === 'surat' ? pengajuan.filter((item) => item.status === 'Surat terbit') : antrean
    return sumber.filter((item) => {
      const cocokStatus = pilihan === 'Semua status' || item.status === pilihan
      const kata = kataKunci.trim().toLowerCase()
      const cocokKata = !kata || `${item.id} ${item.nama} ${item.jenis}`.toLowerCase().includes(kata)
      return cocokStatus && cocokKata
    })
  }, [antrean, halaman, kataKunci, pengajuan, pilihan])

  const detail = pengajuan.find((item) => item.id === detailId)

  const ubahPengajuan = (id, perubahan) => {
    setPengajuan((daftar) => daftar.map((item) => item.id === id ? { ...item, ...perubahan } : item))
  }

  const bukaDetail = (id) => {
    const item = pengajuan.find((data) => data.id === id)
    setDetailId(id)
    setCatatanBaru(item?.catatan || '')
    setStatusBaru(item?.status || 'Diproses kelurahan')
  }

  const simpanCatatan = () => {
    if (!detail) return
    ubahPengajuan(detail.id, { catatan: catatanBaru, status: statusBaru })
    setDetailId(null)
  }

  const halamanJudul = menu.find((item) => item.id === halaman)?.label || 'Ringkasan'

  return (
    <div className="min-h-screen bg-[#f4f7f5] text-[#18352e] lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="bg-[#173d34] px-4 py-5 text-white lg:min-h-screen lg:px-5">
        <Link to="/" className="flex items-center gap-3 px-2">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-[#d6a84f] text-sm font-extrabold text-[#173d34]">SK</span>
          <span>
            <span className="block font-bold">SuratKita</span>
            <span className="block text-xs text-white/60">Layanan kelurahan</span>
          </span>
        </Link>

        <div className="mt-8 border-t border-white/15 pt-5">
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-white/45">Menu petugas</p>
          <nav aria-label="Menu panel petugas" className="grid grid-cols-2 gap-1 lg:grid-cols-1">
            {menu.map((item) => (
              <TombolMenu key={item.id} anak={{ ...item, jumlah: item.id === 'antrean' ? antrean.length : undefined }} aktif={halaman === item.id} onClick={() => { setHalaman(item.id); setPilihan('Semua status') }} />
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-white/15 pt-4">
          <p className="px-3 text-xs text-white/60">Petugas kelurahan</p>
          <Link to="/" className="mt-2 inline-flex px-3 py-2 text-sm font-semibold text-white/80 hover:text-white">Keluar</Link>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="border-b border-[#e2e9e5] bg-white px-5 py-4 sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-[#687970]">SuratKita <span className="px-1 text-[#a4afa9]">/</span> Panel petugas <span className="px-1 text-[#a4afa9]">/</span> {halamanJudul}</p>
              <h1 className="mt-1 font-display text-2xl font-bold">{halamanJudul}</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="border-l border-[#d8e2dd] pl-3 text-sm font-semibold text-[#52645b]">Mode simulasi</span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl space-y-6 px-5 py-6 sm:px-8 sm:py-8">
          <p className="border-b border-[#dce4df] pb-4 text-sm text-[#687970]">Tinjau pengajuan masuk, periksa hasil verifikasi, lalu teruskan proses layanan.</p>

          {halaman === 'ringkasan' && (
            <>
              <section aria-label="Ringkasan pengajuan" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ['Antrean aktif', `${antrean.length}`, 'Perlu ditindaklanjuti'],
                  ['Menunggu verifikasi', `${pengajuan.filter((item) => item.status === 'Menunggu verifikasi RT/RW').length}`, 'Tahap RT/RW'],
                  ['Menunggu persetujuan', `${pengajuan.filter((item) => item.status === 'Menunggu persetujuan lurah').length}`, 'Tahap lurah'],
                  ['Surat terbit', `${pengajuan.filter((item) => item.status === 'Surat terbit').length}`, 'Periode berjalan'],
                ].map(([judul, angka, keterangan]) => (
                  <div key={judul} className="border-b-2 border-[#dce4df] bg-white px-4 py-3 first:border-t-2 sm:first:border-t-0">
                    <p className="text-sm font-semibold text-[#64756c]">{judul}</p>
                    <p className="mt-1 font-display text-2xl font-bold tabular-nums">{angka}</p>
                    <p className="mt-0.5 text-xs text-[#7a8982]">{keterangan}</p>
                  </div>
                ))}
              </section>

              <section className="border-y border-[#dce4df] bg-white">
                <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-4 sm:px-2">
                  <div><h2 className="font-display text-lg font-bold">Pengajuan terbaru</h2><p className="mt-0.5 text-sm text-[#718079]">Pilih pengajuan untuk memeriksa berkas dan memperbarui proses.</p></div>
                  <button type="button" onClick={() => setHalaman('antrean')} className="rounded-md border border-[#cbd8d2] px-3 py-2 text-sm font-semibold text-[#205a4b] hover:bg-[#eef5f1]">Buka antrean</button>
                </div>
                <TabelPengajuan daftar={antrean.slice(0, 4)} onOpen={bukaDetail} />
              </section>
            </>
          )}

          {(halaman === 'antrean' || halaman === 'surat') && (
            <section className="bg-white">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#dce4df] py-4">
                <div><h2 className="font-display text-lg font-bold">{halaman === 'surat' ? 'Surat yang sudah diterbitkan' : 'Daftar pengajuan'}</h2><p className="mt-1 text-sm text-[#718079]">{daftarTampil.length} pengajuan</p></div>
                <div className="w-full sm:w-auto">
                  <label className="mb-1 block text-xs font-semibold text-[#586a62]" htmlFor="cari-pengajuan">Cari berdasarkan nama atau nomor</label>
                  <input id="cari-pengajuan" value={kataKunci} onChange={(e) => setKataKunci(e.target.value)} placeholder="Contoh: SK-2026-0142" className="w-full rounded-sm border border-[#aab8b0] px-3 py-2 text-sm outline-none focus:border-[#205a4b] focus:ring-1 focus:ring-[#205a4b] sm:w-72" />
                </div>
              </div>
              {halaman === 'antrean' && (
                <div className="flex gap-5 overflow-x-auto border-b border-[#dce4df]" aria-label="Filter status pengajuan">
                  {[
                    ['Semua status', 'Semua'],
                    ['Menunggu verifikasi RT/RW', 'Verifikasi RT/RW'],
                    ['Diproses kelurahan', 'Diproses'],
                    ['Menunggu persetujuan lurah', 'Persetujuan lurah'],
                    ['Menunggu perbaikan', 'Perlu perbaikan'],
                  ].map(([value, label]) => {
                    const banyak = value === 'Semua status' ? antrean.length : antrean.filter((item) => item.status === value).length
                    return <button key={value} type="button" aria-pressed={pilihan === value} onClick={() => setPilihan(value)} className={`shrink-0 border-b-2 px-0.5 py-3 text-sm font-semibold ${pilihan === value ? 'border-[#205a4b] text-[#174c40]' : 'border-transparent text-[#65766d] hover:text-[#18352e]'}`}>{label} <span className="ml-1 text-xs tabular-nums text-[#829087]">{banyak}</span></button>
                  })}
                </div>
              )}
              <TabelPengajuan daftar={daftarTampil} onOpen={bukaDetail} tampilSurat={halaman === 'surat'} />
            </section>
          )}

          {halaman === 'sla' && (
            <>
              <section className="grid gap-3 sm:grid-cols-3">
                <KartuSla judul="Rata-rata penyelesaian" angka="2,4 hari" detail="Target layanan: 3 hari kerja" />
                <KartuSla judul="Selesai sesuai SLA" angka="92%" detail="Periode berjalan" />
                <KartuSla judul="Melewati target" angka={`${pengajuan.filter((item) => item.berjalan > item.sla && item.status !== 'Surat terbit').length}`} detail="Perlu ditindaklanjuti" />
              </section>
              <section className="border border-[#e0e8e3] bg-white">
                <div className="px-4 py-4 sm:px-5"><h2 className="font-display text-lg font-bold">Pemantauan waktu layanan</h2><p className="mt-0.5 text-sm text-[#718079]">Perbandingan waktu berjalan dengan target SLA setiap pengajuan.</p></div>
                <div className="divide-y divide-[#e6ece9]">
                  {pengajuan.map((item) => {
                    const persen = Math.min(100, Math.round((item.berjalan / item.sla) * 100))
                    return <div key={item.id} className="grid gap-2 px-4 py-4 sm:grid-cols-[180px_1fr_110px] sm:items-center sm:px-5"><div><p className="text-sm font-bold">{item.id}</p><p className="text-xs text-[#718079]">{item.nama}</p></div><div><div className="h-2 overflow-hidden bg-[#edf1ee]"><div className={`h-full ${persen >= 100 ? 'bg-[#d39a32]' : 'bg-[#31836e]'}`} style={{ width: `${persen}%` }} /></div><p className="mt-1 text-xs text-[#718079]">{item.berjalan} dari {item.sla} hari kerja</p></div><div className="sm:text-right"><Status>{item.status}</Status></div></div>
                  })}
                </div>
              </section>
            </>
          )}

          <p className="border-t border-[#e0e8e3] pt-4 text-xs text-[#819087]">SuratKita · Panel internal petugas · Data pada tampilan ini masih berupa contoh.</p>
        </main>
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#10251f]/40" onMouseDown={(e) => { if (e.target === e.currentTarget) setDetailId(null) }}>
          <section role="dialog" aria-modal="true" aria-labelledby="judul-detail" className="h-full w-full max-w-xl overflow-y-auto border-l border-[#dce4df] bg-white p-5 shadow-xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase text-[#708078]">Detail pengajuan · {detail.id}</p><h2 id="judul-detail" className="mt-1 font-display text-xl font-bold">{detail.nama}</h2><p className="mt-1 text-sm text-[#687970]">{detail.jenis} · masuk {detail.masuk}</p></div>
              <button type="button" onClick={() => setDetailId(null)} aria-label="Tutup detail" className="grid h-9 w-9 shrink-0 place-items-center border border-[#d7e0db] text-lg hover:bg-[#f4f7f5]">×</button>
            </div>
            <div className="mt-5"><Status>{detail.status}</Status></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ['Verifikasi RT', detail.rt, 'rt'],
                ['Verifikasi RW', detail.rw, 'rw'],
              ].map(([judul, nilai, kolom]) => <div key={judul} className="flex items-center justify-between gap-2 border border-[#e1e8e4] p-3"><div><p className="text-xs text-[#718079]">{judul}</p><p className="mt-1 text-sm font-semibold">{nilai}</p></div><button type="button" onClick={() => ubahPengajuan(detail.id, { [kolom]: 'Terverifikasi' })} className="rounded-md border border-[#cbd8d2] px-2.5 py-1.5 text-xs font-semibold text-[#205a4b] hover:bg-[#eef5f1]">Verifikasi</button></div>)}
            </div>
            <div className="mt-5 border border-[#e1e8e4] p-4">
              <h3 className="text-sm font-bold">Berkas pengajuan</h3>
              <p className="mt-1 text-sm text-[#687970]">Daftar file dan pratinjau berkas akan tersedia setelah terhubung dengan penyimpanan dokumen.</p>
              <p className="mt-3 text-xs font-semibold text-[#9a6a18]">Belum ada file contoh pada versi frontend ini.</p>
            </div>
            <Link to={`/tiket/${detail.id}`} className="mt-4 inline-flex text-sm font-semibold text-[#205a4b] underline decoration-[#9bb9aa] underline-offset-4">Lihat halaman pelacakan warga</Link>
            <label htmlFor="status-pengajuan" className="mt-5 block text-sm font-bold">Status pengajuan</label>
            <select id="status-pengajuan" value={statusBaru} onChange={(e) => setStatusBaru(e.target.value)} className="mt-2 w-full rounded-md border border-[#ccd8d2] bg-white px-3 py-2 text-sm outline-none focus:border-[#31836e]">
              <option>Menunggu verifikasi RT/RW</option>
              <option>Diproses kelurahan</option>
              <option>Menunggu persetujuan lurah</option>
              <option>Menunggu perbaikan</option>
              <option>Surat terbit</option>
            </select>
            <label htmlFor="catatan-petugas" className="mt-5 block text-sm font-bold">Catatan dan hasil pemeriksaan</label>
            <textarea id="catatan-petugas" value={catatanBaru} onChange={(e) => setCatatanBaru(e.target.value)} rows="3" placeholder="Tulis catatan untuk riwayat pengajuan" className="mt-2 w-full resize-y rounded-md border border-[#ccd8d2] px-3 py-2 text-sm outline-none focus:border-[#31836e]" />
            <div className="mt-4 flex flex-wrap justify-between gap-2 border-t border-[#e6ece9] pt-4">
              <button type="button" onClick={() => { ubahPengajuan(detail.id, { status: 'Menunggu perbaikan', catatan: catatanBaru }); setDetailId(null) }} className="rounded-md border border-[#d8b8a5] px-3 py-2 text-sm font-semibold text-[#874b2f] hover:bg-[#fff8f3]">Kembalikan untuk perbaikan</button>
              <div className="flex gap-2"><button type="button" onClick={() => setDetailId(null)} className="rounded-md border border-[#ccd8d2] px-3 py-2 text-sm font-semibold text-[#52645b]">Batal</button><button type="button" onClick={simpanCatatan} className="rounded-md bg-[#205a4b] px-3 py-2 text-sm font-bold text-white hover:bg-[#17483b]">Simpan catatan</button></div>
            </div>
            {detail.status === 'Menunggu persetujuan lurah' && <div className="mt-4 border border-violet-200 bg-violet-50 p-4"><p className="text-sm font-bold text-violet-950">Menunggu persetujuan lurah</p><p className="mt-1 text-sm text-violet-900">Tanda tangan digital perlu dihubungkan ke akun dan layanan tanda tangan lurah.</p></div>}
          </section>
        </div>
      )}
    </div>
  )
}

function TabelPengajuan({ daftar, onOpen, tampilSurat = false }) {
  if (daftar.length === 0) return <p className="border-t border-[#e6ece9] px-5 py-10 text-center text-sm text-[#718079]">Tidak ada pengajuan yang cocok.</p>

  return (
    <div className="overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#205a4b]" tabIndex="0" aria-label="Tabel pengajuan; geser ke samping untuk melihat kolom lainnya">
      <table className="w-full min-w-[820px] border-collapse text-left">
        <thead className="border-b border-[#bfcac3] bg-[#f7f9f8] text-sm text-[#52645b]">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">Nomor tiket</th>
            <th scope="col" className="px-4 py-3 font-semibold">Pemohon dan jenis surat</th>
            <th scope="col" className="px-4 py-3 font-semibold">Tanggal masuk</th>
            <th scope="col" className="px-4 py-3 font-semibold">Status</th>
            <th scope="col" className="px-4 py-3 font-semibold">SLA</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {daftar.map((item) => (
            <tr key={item.id} className="border-b border-[#e1e7e3] hover:bg-[#f7f9f8]">
              <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold tabular-nums">{item.id}</td>
              <td className="px-4 py-4">
                <p className="font-semibold">{item.nama}</p>
                <p className="mt-1 text-sm text-[#687970]">{item.jenis}</p>
                {tampilSurat && item.nomorSurat && <p className="mt-1 text-xs text-[#205a4b]">Nomor surat: {item.nomorSurat}</p>}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-[#586a62]">{item.masuk}</td>
              <td className="px-4 py-4"><Status>{item.status}</Status></td>
              <td className="whitespace-nowrap px-4 py-4 text-sm tabular-nums text-[#586a62]">{item.berjalan} dari {item.sla} hari</td>
              <td className="px-4 py-4 text-right">
                <button type="button" onClick={() => onOpen(item.id)} className="border-b border-[#205a4b] py-1 text-sm font-semibold text-[#205a4b] hover:border-b-2">Periksa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function KartuSla({ judul, angka, detail }) {
  return <div className="border-b-2 border-[#dce4df] bg-white px-4 py-3"><p className="text-sm font-semibold text-[#64756c]">{judul}</p><p className="mt-2 font-display text-2xl font-bold tabular-nums">{angka}</p><p className="mt-1 text-xs text-[#7a8982]">{detail}</p></div>
}
