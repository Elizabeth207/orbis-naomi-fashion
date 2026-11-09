import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const OrbisPage = lazy(() => import("./pages/OrbisPage"));
const NaomiPage = lazy(() => import("./pages/NaomiPage"));
const CatalogoPage = lazy(() => import("./pages/CatalogoPage"));
const GaleriaPage = lazy(() => import("./pages/GaleriaPage"));
const TiendasPage = lazy(() => import("./pages/TiendasPage"));
const ContactoPage = lazy(() => import("./pages/ContactoPage"));

function RouteFallback() {
  return (
    <div
      className="min-h-[50vh] w-full bg-paper"
      role="status"
      aria-live="polite"
      aria-label="Cargando página"
    />
  );
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
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
    </Suspense>
  );
}

export default App;
