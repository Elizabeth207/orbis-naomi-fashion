import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-paper border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna Marca */}
          <div>
            <h3 className="font-serif text-ink mb-4">Orbis II & Novias Naomi</h3>
            <p className="font-sans text-sm text-ink-soft">
              Dos tiendas, un mismo compromiso con la calidad y el buen vestir en Pichanaki.
            </p>
          </div>

          {/* Columna Tiendas */}
          <div>
            <h4 className="font-sans font-medium text-ink mb-4">Tiendas</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/orbis-ii" className="font-sans text-sm text-ink-soft hover:text-ink transition-colors">
                  Orbis II
                </Link>
              </li>
              <li>
                <Link to="/novias-naomi" className="font-sans text-sm text-ink-soft hover:text-ink transition-colors">
                  Novias Naomi
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="font-sans text-sm text-ink-soft hover:text-ink transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <a href="#" className="font-sans text-sm text-ink-soft hover:text-ink transition-colors">
                  Promociones
                </a>
              </li>
            </ul>
          </div>

          {/* Columna Ayuda */}
          <div>
            <h4 className="font-sans font-medium text-ink mb-4">Ayuda</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/nuestras-tiendas" className="font-sans text-sm text-ink-soft hover:text-ink transition-colors">
                  Nuestras tiendas
                </Link>
              </li>
              <li>
                <a href="#" className="font-sans text-sm text-ink-soft hover:text-ink transition-colors">
                  Ubicación
                </a>
              </li>
              <li>
                <Link to="/contacto" className="font-sans text-sm text-ink-soft hover:text-ink transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="font-sans text-sm text-ink-soft hover:text-ink transition-colors">
                  Galería
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna Síguenos */}
          <div>
            <h4 className="font-sans font-medium text-ink mb-4">Síguenos</h4>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/share/r/14ghv4iaTHX/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-line rounded-full flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-line rounded-full flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@tabitaparra?_r=1&_t=ZS-98EEH5mYNoC"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-line rounded-full flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v14.81a2.91 2.91 0 0 1-5.14 1.9 2.87 2.87 0 0 1-.52-2.24 2.91 2.91 0 0 1 5.66-.48h.06v-3.7a6.35 6.35 0 0 0-1-.08 6.36 6.36 0 0 0 0 12.72 6.36 6.36 0 0 0 6.36-6.36v-4a6.35 6.35 0 0 0-1.2-4.48z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-line mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="font-sans text-xs text-ink-soft">
              © 2026 Orbis II & Novias Naomi. Todos los derechos reservados.
            </p>
            <p className="font-sans text-xs text-ink-soft">
              Desarrollado por Elizabeth Huarcaya Contreras
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
