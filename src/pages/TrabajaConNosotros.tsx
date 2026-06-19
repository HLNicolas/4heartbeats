import React, { useState } from "react";
import { Wrench, Cookie, Sparkles, Brush, Check } from "lucide-react";

interface JobCategory {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const categories: JobCategory[] = [
  {
    id: "limpieza",
    label: "Limpieza",
    Icon: Wrench
  },
  {
    id: "reposteria",
    label: "Repostería",
    Icon: Cookie
  },
  {
    id: "decoracion",
    label: "Decoración",
    Icon: Sparkles
  },
  {
    id: "artesania",
    label: "Artesanía",
    Icon: Brush
  }
];

export const TrabajaConNosotros: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Header Section */}
      <section className="container-page pt-16 md:pt-24">
        <span className="eyebrow">Postulación</span>
        <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl text-primary">
          Sumate a nuestro equipo.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          Buscamos mujeres comprometidas. Te capacitamos. Te pagamos por servicio. Trabajamos cerca tuyo.
        </p>
      </section>

      {/* Form Container */}
      <section className="container-page mt-10 pb-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-7 shadow-card md:p-10">
          {submitted ? (
            /* Success screen */
            <div className="py-12 text-center">
              <h2 className="text-3xl text-primary font-medium">¡Postulación recibida!</h2>
              <p className="mt-3 text-muted-foreground">
                Te escribimos por WhatsApp en los próximos días con los siguientes pasos.
              </p>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nombre completo */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-foreground">
                  Nombre completo
                </label>
                <input
                  id="nombre"
                  type="text"
                  required
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                  WhatsApp
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                />
              </div>

              {/* Ciudad y zona */}
              <div>
                <label htmlFor="ciudad" className="block text-sm font-medium text-foreground">
                  Ciudad y zona donde vives
                </label>
                <input
                  id="ciudad"
                  type="text"
                  required
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                />
              </div>

              {/* ¿En qué te gustaría trabajar? */}
              <div>
                <label className="block text-sm font-medium text-foreground">
                  ¿En qué te gustaría trabajar?
                </label>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {categories.map(({ id, label, Icon }) => {
                    const isSelected = selectedCategories.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleCategory(id)}
                        className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? "border-terracotta bg-terracotta/5 text-foreground"
                            : "border-border hover:border-terracotta/50 text-foreground"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            isSelected ? "text-terracotta" : "text-muted-foreground"
                          }`}
                        />
                        <span className="flex-1">{label}</span>
                        {isSelected && <Check className="h-4 w-4 text-terracotta" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Experiencia (opcional) */}
              <div>
                <label className="block text-sm font-medium text-foreground">
                  ¿Tienes experiencia? (opcional)
                </label>
                <textarea
                  rows={3}
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  placeholder="Cuéntanos brevemente"
                />
              </div>

              {/* Submit button */}
              <button type="submit" className="btn-primary w-full">
                Postular ahora
              </button>
              
              <p className="text-xs text-muted-foreground text-center">
                No necesitas foto ni hoja de vida formal para postular.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
