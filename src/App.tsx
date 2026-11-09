import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import OrbisPage from './pages/OrbisPage'
import NaomiPage from './pages/NaomiPage'
import CatalogoPage from './pages/CatalogoPage'
import GaleriaPage from './pages/GaleriaPage'
import TiendasPage from './pages/TiendasPage'
import ContactoPage from './pages/ContactoPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="orbis-ii" element={<OrbisPage />} />
        <Route path="novias-naomi" element={<NaomiPage />} />
        <Route path="catalogo" element={<CatalogoPage />} />
        <Route path="galeria" element={<GaleriaPage />} />
        <Route path="nuestras-tiendas" element={<TiendasPage />} />
        <Route path="contacto" element={<ContactoPage />} />
      </Route>
    </Routes>
  )
}

export default App
