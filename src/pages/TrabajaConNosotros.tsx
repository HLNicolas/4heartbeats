import React, { useState } from "react";
import { Wrench, Cookie, Sparkles, Brush, Check, Heart, BookOpen, Coins, Clock } from "lucide-react";
import { WHATSAPP_PHONE_NUMBER } from "../utils/pricing";

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

interface Benefit {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const benefits: Benefit[] = [
  {
    title: "Trabajo seguro y digno",
    description: "Te ofrecemos un espacio de respeto, apoyo mutuo y condiciones que valoran tu labor.",
    Icon: Heart
  },
  {
    title: "Capacitación gratuita",
    description: "Aprende nuevas técnicas de servicio, repostería, decoración y atención al cliente sin costo.",
    Icon: BookOpen
  },
  {
    title: "Pago justo y a tiempo",
    description: "Tu esfuerzo vale. Recibes pagos puntuales y transparentes por cada servicio realizado.",
    Icon: Coins
  },
  {
    title: "Flexibilidad y cercanía",
    description: "Adaptamos los servicios a tu disponibilidad de tiempo y priorizamos zonas cercanas a tu hogar.",
    Icon: Clock
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

      {/* Content & Form Container */}
      <section className="container-page mt-10 pb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Why work with us description */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl text-primary font-medium font-display">¿Por qué trabajar con nosotros?</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                En 4 Heartbeats no solo ofrecemos oportunidades de trabajo, construimos una comunidad donde crecemos juntas. Creemos en tu potencial y te brindamos las herramientas para salir adelante.
              </p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {benefits.map((benefit, idx) => {
                const IconComponent = benefit.Icon;
                return (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{benefit.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Transparency details */}
             <div className="rounded-2xl bg-sand/30 border border-sand/65 p-6 space-y-3">
              <h4 className="text-sm font-semibold text-primary uppercase tracking-wider font-sans">
                Sobre tu remuneración y condiciones
              </h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-terracotta font-bold">•</span>
                  <span>Pagos directos a tu cuenta o billetera digital al finalizar cada servicio.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terracotta font-bold">•</span>
                  <span>Capacitación 100% gratuita; nunca te cobraremos por entrenarte o certificarte.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terracotta font-bold">•</span>
                  <span>Flexibilidad completa: tú decides qué servicios tomar según tus horarios familiares.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terracotta font-bold">•</span>
                  <span>Conocimientos base: realizaremos una validación sencilla durante la entrevista para verificar que cuentes con conocimientos mínimos en las áreas que selecciones.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
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
                <p className="mt-2 text-[11px] text-muted-foreground leading-normal">
                  * Nota: Durante el proceso de entrevista, realizaremos una breve validación práctica para verificar que cuentes con conocimientos mínimos en las áreas que selecciones.
                </p>
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
                <p className="mt-2 text-xs text-muted-foreground leading-normal">
                  * Si elegiste <strong>Repostería</strong> o <strong>Decoración</strong> y tienes fotos de tus trabajos previos, no te preocupes; podrás enviárnoslas directamente cuando te contactemos por WhatsApp.
                </p>
              </div>

              {/* Submit button */}
              <div className="space-y-4 pt-2">
                <button type="submit" className="btn-primary w-full cursor-pointer">
                  Postular ahora
                </button>
                
                {/* Divider and WhatsApp Fast Apply */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative bg-card px-3 text-[11px] uppercase text-muted-foreground font-semibold">
                    O también puedes
                  </div>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
                    "Hola, me interesa postularme para trabajar con ustedes. Me gustaría recibir más información sobre el proceso."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full justify-center !min-h-12 border border-terracotta/35 text-terracotta hover:bg-terracotta/5 flex items-center gap-2 cursor-pointer"
                >
                  Postular directo por WhatsApp
                </a>
              </div>
              
              <p className="text-[11px] text-muted-foreground text-center">
                No necesitas foto ni hoja de vida formal para postular.
              </p>
            </form>
          )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
