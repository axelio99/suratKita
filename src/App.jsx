import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Tracking from './pages/Tracking'
import AjukanSurat from './pages/AjukanSurat'

function ScrollKeAtas() {
  const location = useLocation()

  useEffect(() => {
    const pelan = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = pelan ? 'smooth' : 'auto'
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  return null
}

function IsiAplikasi() {
  const location = useLocation()

  return (
    <>
      <ScrollKeAtas />
      <Navbar />
      <div key={location.pathname} className="page-enter">
        <Routes location={location}>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Landing />} />
        <Route path="/ajukan-surat" element={<AjukanSurat />} />
        <Route path="/tiket/:id" element={<Tracking />} />
        </Routes>
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <IsiAplikasi />
    </BrowserRouter>
  )
}
