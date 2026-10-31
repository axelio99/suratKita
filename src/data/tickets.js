export const tickets = {
  'SK-2026-0142': {
    jenis: 'Surat keterangan tidak mampu',
    tanggal: '28 Okt 2026',
    status: 'Diproses kelurahan',
    slaHari: 3,
    hariBerjalan: 2,
    catatan: 'Berkas lengkap, menunggu tanda tangan lurah.',
    steps: [
      { label: 'Diajukan', waktu: '28 Okt, 09.12', oleh: 'Warga', selesai: true },
      { label: 'Verifikasi RT/RW', waktu: '28 Okt, 14.30', oleh: 'Ketua RT 03', selesai: true },
      { label: 'Diproses kelurahan', waktu: '29 Okt', oleh: 'Petugas kelurahan', selesai: false },
      { label: 'Ditandatangani lurah', selesai: false },
      { label: 'Siap diambil / diunduh', selesai: false },
    ],
  },
}