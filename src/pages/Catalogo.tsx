import React, { useState } from "react";
import { Link } from "react-router-dom";

interface CatalogItem {
  title: string;
  categoryDisplay: string;
  categoryFilter: "Bodas" | "Bautizos" | "Cumpleaños" | "Corporativos";
  img: string;
}

const catalogItems: CatalogItem[] = [
  {
    title: "Boda en jardín – 60 invitados",
    categoryDisplay: "Bodas · Decoración + candy bar",
    categoryFilter: "Bodas",
    img: import.meta.env.BASE_URL + "assets/service-decor-nzMl6I_T.jpg"
  },
  {
    title: "Candy bar caramelo y crema",
    categoryDisplay: "Cumpleaños · Repostería artesanal",
    categoryFilter: "Cumpleaños",
    img: import.meta.env.BASE_URL + "assets/service-candy-CCU3OixR.jpg"
  },
  {
    title: "Lanzamiento corporativo",
    categoryDisplay: "Corporativos · Limpieza + montaje",
    categoryFilter: "Corporativos",
    img: import.meta.env.BASE_URL + "assets/service-cleaning-l_c3EHGw.jpg"
  },
  {
    title: "Bautizo de Mateo",
    categoryDisplay: "Bautizos · Artesanías + recordatorios",
    categoryFilter: "Bautizos",
    img: import.meta.env.BASE_URL + "assets/hero-event-5LMS3MNR.jpg"
  },
  {
    title: "Comunión Sofía",
    categoryDisplay: "Bautizos · Decoración integral",
    categoryFilter: "Bautizos",
    img: import.meta.env.BASE_URL + "assets/service-decor-nzMl6I_T.jpg"
  },
  {
    title: "Cena ejecutiva",
    categoryDisplay: "Corporativos · Apoyo logístico",
    categoryFilter: "Corporativos",
    img: import.meta.env.BASE_URL + "assets/service-cleaning-l_c3EHGw.jpg"
  },
  {
    title: "Cumpleaños temático",
    categoryDisplay: "Cumpleaños · Candy bar + decoración",
    categoryFilter: "Cumpleaños",
    img: import.meta.env.BASE_URL + "assets/service-candy-CCU3OixR.jpg"
  },
  {
    title: "Boda íntima – 30 invitados",
    categoryDisplay: "Bodas · Montaje completo",
    categoryFilter: "Bodas",
    img: import.meta.env.BASE_URL + "assets/hero-event-5LMS3MNR.jpg"
  }
];

const categories = ["Todos", "Bodas", "Bautizos", "Cumpleaños", "Corporativos"] as const;

type FilterType = typeof categories[number];

export const Catalogo: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Todos");

  const filteredItems = activeFilter === "Todos"
    ? catalogItems
    : catalogItems.filter(item => item.categoryFilter === activeFilter);

  return (
    <div>
      {/* Header Section */}
      <section className="container-page pt-16 md:pt-24">
        <span className="eyebrow">Lookbook</span>
        <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl text-primary">
          Trabajos que nos enorgullecen
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Cada proyecto es un equipo que se preparó, llegó, ejecutó y dejó todo impecable.
        </p>
        
        {/* Filter Buttons */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "border-terracotta bg-terracotta text-ivory"
                    : "border-border bg-card text-foreground/80 hover:border-terracotta/50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid Section */}
      <section className="container-page mt-12 pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="group overflow-hidden rounded-2xl bg-card shadow-soft"
            >
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  width="1200"
                  height="900"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {item.categoryDisplay}
                  </p>
                  <h3 className="mt-1 text-lg !text-foreground font-display font-medium">
                    {item.title}
                  </h3>
                </div>
                <div className="mt-4">
                  <Link
                    to="/cotizar"
                    className="text-sm font-semibold text-terracotta hover:underline inline-flex items-center gap-1"
                  >
                    Quiero algo así →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
