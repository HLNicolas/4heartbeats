import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X, Instagram, Facebook, ShieldCheck } from "lucide-react";

const navLinks = [
  { to: "/servicios", label: "Servicios" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/impacto", label: "Impacto" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
  { to: "/trabaja-con-nosotros", label: "Trabaja con nosotros" }
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <img
            src={`${import.meta.env.BASE_URL}assets/logo.jpg`}
            alt="Logo Manos Aliadas"
            className="h-9 w-9 shrink-0 object-contain"
          />
          <span className="truncate font-display text-lg text-primary">
            Manos Aliadas
          </span>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-terracotta"
                    : "text-foreground/80 hover:text-terracotta"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cotizar"
            className="btn-primary hidden sm:inline-flex !min-h-10 !text-sm !px-5"
          >
            Cotizar ahora
          </Link>
          <button
            type="button"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setIsOpen((prev) => !prev)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border lg:hidden text-foreground hover:bg-sand/30 transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-page flex flex-col py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-base font-medium transition-colors ${
                    isActive ? "text-terracotta" : "text-foreground/90"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/cotizar"
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-3 self-start !min-h-10 !text-sm !px-5"
            >
              Cotizar ahora
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}assets/logo.jpg`}
              alt="Logo Manos Aliadas"
              className="h-9 w-9 shrink-0 object-contain"
            />
            <span className="font-display text-xl">Manos Aliadas</span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/75 leading-relaxed">
            Agencia de servicios operativos y creativos para eventos. Cada contrato es trabajo digno para mujeres capacitadas.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-primary-foreground !text-primary-foreground tracking-wider uppercase opacity-70">
            Servicios
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/servicios" className="hover:text-terracotta transition-colors">
                Limpieza de eventos
              </Link>
            </li>
            <li>
              <Link to="/servicios" className="hover:text-terracotta transition-colors">
                Montaje y apoyo
              </Link>
            </li>
            <li>
              <Link to="/servicios" className="hover:text-terracotta transition-colors">
                Candy bar
              </Link>
            </li>
            <li>
              <Link to="/servicios" className="hover:text-terracotta transition-colors">
                Decoración
              </Link>
            </li>
            <li>
              <Link to="/servicios" className="hover:text-terracotta transition-colors">
                Artesanías
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-primary-foreground !text-primary-foreground tracking-wider uppercase opacity-70">
            Empresa
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/nosotros" className="hover:text-terracotta transition-colors">
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/impacto" className="hover:text-terracotta transition-colors">
                Modelo de impacto
              </Link>
            </li>
            <li>
              <Link to="/trabaja-con-nosotros" className="hover:text-terracotta transition-colors">
                Trabaja con nosotros
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-terracotta transition-colors">
                Preguntas frecuentes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-primary-foreground !text-primary-foreground tracking-wider uppercase opacity-70">
            Contacto
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              WhatsApp:{" "}
              <a href="https://wa.me/0000000000" className="hover:text-terracotta transition-colors">
                +00 000 000 000
              </a>
            </li>
            <li>hola@manosaliadas.co</li>
            <li>Lun a Sáb · 8:00 — 19:00</li>
            <li>Cobertura: ciudad principal y área metropolitana</li>
          </ul>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-terracotta" />
            Emprendimiento social verificado
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Manos Aliadas. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-terracotta transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-terracotta transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-terracotta transition-colors">
              Tratamiento de datos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
