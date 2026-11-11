import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Tracking from './pages/Tracking'
import PanelPetugas from './pages/PanelPetugas'

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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollKeAtas />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tiket/:id" element={<Tracking />} />
        <Route path="/petugas" element={<PanelPetugas />} />
      </Routes>
    </BrowserRouter>
  )
}
