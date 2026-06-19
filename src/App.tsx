import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Servicios } from "./pages/Servicios";
import { Catalogo } from "./pages/Catalogo";
import { Impacto } from "./pages/Impacto";
import { Nosotros } from "./pages/Nosotros";
import { Contacto } from "./pages/Contacto";
import { Cotizar } from "./pages/Cotizar";
import { TrabajaConNosotros } from "./pages/TrabajaConNosotros";

// Scroll Restoration Helper Component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="impacto" element={<Impacto />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="cotizar" element={<Cotizar />} />
          <Route path="trabaja-con-nosotros" element={<TrabajaConNosotros />} />
          {/* Catch-all fallback redirect to home */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
