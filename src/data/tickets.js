export const tickets = {
  'SK-2026-0142': {
    jenis: 'SKTM',
    tanggal: '28 Oktober 2026',
    status: 'Diproses Kelurahan',
    slaHari: 3,
    hariBerjalan: 2,
    pemohon: 'Siti Rahmawati',
    kelurahan: 'Kelurahan Sukamaju',
    berkas: 2,
    catatan: {
      tanggal: '29 Okt',
      oleh: 'Petugas Kelurahan',
      isi: 'Berkas lengkap, menunggu tanda tangan lurah.',
    },
    steps: [
      { label: 'Diajukan', waktu: '28 Okt, 09.12', oleh: 'Warga', selesai: true },
      { label: 'Verifikasi RT/RW', waktu: '28 Okt, 14.30', oleh: 'Ketua RT 03', selesai: true },
      { label: 'Diproses Kelurahan', waktu: '29 Okt', oleh: 'Petugas Kelurahan', selesai: false },
      { label: 'Ditandatangani Lurah', selesai: false },
      { label: 'Siap diambil/diunduh', selesai: false },
    ],
  },
}
