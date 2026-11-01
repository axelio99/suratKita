import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IconFile } from './Icons'

const tautan = 'whitespace-nowrap rounded-md py-1 text-sm font-medium text-ink-soft hover:text-violet'

export default function Navbar() {
  const { pathname } = useLocation()
  const diBeranda = pathname === '/'
  const [info, setInfo] = useState('')
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const segera = (pesan) => {
    setInfo(pesan)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setInfo(''), 3200)
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
        <nav
          aria-label="Navigasi utama"
          className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-1 px-6 py-3"
        >
          <Link to="/" className="flex items-center gap-3 font-display text-lg font-bold text-ink">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white">
              <IconFile className="h-5 w-5" />
            </span>
            SuratKita
          </Link>

          <div
            className={`order-3 flex w-full gap-6 overflow-x-auto md:order-none md:w-auto md:overflow-visible ${
              diBeranda ? 'md:flex-1 md:justify-center' : 'md:ml-auto'
            }`}
          >
            <Link to="/#layanan" className={tautan}>Layanan</Link>
            <Link to="/#cara-kerja" className={tautan}>Cara Kerja</Link>
            {diBeranda && <Link to="/#statistik" className={tautan}>Statistik</Link>}
            <button
              type="button"
              onClick={() => segera('Dashboard publik masih dalam pengembangan.')}
              className={tautan}
            >
              Dashboard
            </button>
          </div>

          {diBeranda && (
            <button
              type="button"
              onClick={() => segera('Form pengajuan surat masih dalam pengembangan.')}
              className="ml-auto rounded-lg border-2 border-ink px-4 py-2 text-sm font-bold text-ink hover:bg-ink hover:text-white md:ml-0"
            >
              Ajukan Surat
            </button>
          )}
        </nav>
      </header>

      {info && (
        <div
          role="status"
          className="fixed right-4 top-20 z-40 max-w-xs rounded-xl bg-ink px-4 py-3 text-sm font-medium text-white"
        >
          {info}
        </div>
      )}
    </>
  )
}
