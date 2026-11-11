import { Link, useLocation } from 'react-router-dom'
import { IconFile } from './Icons'

const tautan = 'whitespace-nowrap py-1 text-sm font-medium text-ink-soft hover:text-violet'

export default function Navbar() {
  const { pathname } = useLocation()
  const diBeranda = pathname === '/' || pathname === '/dashboard'
  const awalanAnchor = pathname === '/dashboard' ? '/dashboard' : '/'

  if (pathname.startsWith('/petugas')) return null

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <nav aria-label="Navigasi utama" className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-7 gap-y-2 px-5 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3 font-display text-lg font-bold text-ink">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-white"><IconFile className="h-5 w-5" /></span>
          SuratKita
        </Link>

        <div className={`order-3 flex w-full gap-5 overflow-x-auto md:order-none md:w-auto ${diBeranda ? 'md:ml-auto' : 'md:ml-auto'}`}>
          <Link to={`${awalanAnchor}#layanan`} className={tautan}>Layanan surat</Link>
          <Link to={`${awalanAnchor}#cara-kerja`} className={tautan}>Cara kerja</Link>
          {diBeranda && <Link to={`${awalanAnchor}#statistik`} className={tautan}>Statistik</Link>}
          <Link to="/dashboard" className={tautan} aria-current={pathname === '/dashboard' ? 'page' : undefined}>Dashboard</Link>
        </div>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <Link to="/ajukan-surat" className="inline-flex min-h-10 items-center rounded-lg border-2 border-ink px-3 py-2 text-sm font-bold text-ink hover:bg-ink hover:text-white sm:px-4">Ajukan Surat</Link>
        </div>
      </nav>
    </header>
  )
}
