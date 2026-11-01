import { IconCheck } from './Icons'

const tahap = ['selesai', 'selesai', 'aktif', 'menunggu', 'menunggu']

export default function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="bg-hero-art relative h-72 overflow-hidden rounded-3xl md:h-[22rem]"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path d="M-30 110C100 20 210 230 350 140S540 40 640 150" stroke="#fff" strokeOpacity="0.22" strokeWidth="2" />
        <path d="M-30 170C110 80 220 290 360 200S550 100 640 210" stroke="#27c4ff" strokeOpacity="0.45" strokeWidth="2" />
        <path d="M-30 230C120 140 230 350 370 260S560 160 640 270" stroke="#fff" strokeOpacity="0.16" strokeWidth="2" />
        <path d="M-30 290C130 200 240 410 380 320S570 220 640 330" stroke="#ff4f9a" strokeOpacity="0.5" strokeWidth="2" />
        <path d="M-30 50C90 -30 200 160 340 80S530 -20 640 90" stroke="#fff" strokeOpacity="0.12" strokeWidth="2" />
      </svg>

      <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white p-5 sm:inset-x-8 sm:bottom-8">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="font-display text-base font-bold text-ink">Tiket SK-2026-0142</p>
            <p className="text-xs text-mute">SKTM - diajukan 28 Oktober 2026</p>
          </div>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
            Diproses Kelurahan
          </span>
        </div>

        <div className="mt-5 flex items-center">
          {tahap.map((s, i) => (
            <div key={i} className="flex flex-1 items-center last:flex-none">
              {s === 'selesai' && (
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <IconCheck className="h-3.5 w-3.5" />
                </span>
              )}
              {s === 'aktif' && (
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-[3px] border-violet bg-white">
                  <span className="h-2 w-2 rounded-full bg-violet" />
                </span>
              )}
              {s === 'menunggu' && (
                <span className="h-6 w-6 shrink-0 rounded-full border-2 border-line bg-white" />
              )}
              {i < tahap.length - 1 && (
                <span className={`h-1 flex-1 rounded-full ${s === 'selesai' ? 'bg-violet' : 'bg-line'}`} />
              )}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-soft">Sisa waktu: 1 dari 3 hari</p>
      </div>
    </div>
  )
}
