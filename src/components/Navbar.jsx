import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-5xl items-center gap-6 p-4">
        <Link to="/" className="text-lg font-semibold">SuratKita</Link>
        <Link to="/" className="text-sm text-gray-600">Beranda</Link>
        <span className="text-sm text-gray-600">Layanan</span>
        <span className="text-sm text-gray-600">Statistik</span>
        <span className="flex-1" />
        <button className="rounded-md border px-3 py-1 text-sm">Masuk</button>
      </nav>
    </header>
  )
}