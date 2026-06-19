import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Wrench, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { calculateEstimateRange } from "../utils/pricing";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Con cuánta anticipación debo reservar mi cotización?",
    answer: "Recomendamos cotizar y reservar con al menos 7 a 15 días de anticipación para asegurar la disponibilidad de nuestras colaboradoras y planificar la logística de tu evento de la mejor manera."
  },
  {
    question: "¿Los insumos y materiales de limpieza están incluidos?",
    answer: "Nuestros servicios estándar no incluyen insumos ni herramientas de limpieza (como trapeadores, aspiradoras o detergentes). Sin embargo, al coordinar los detalles finales de tu cotización, podemos cotizar el kit completo de insumos si prefieres que nosotros los llevemos."
  },
  {
    question: "¿Cómo funciona el transporte de la repostería y decoración?",
    answer: "Nos encargamos de transportar y montar todo con el mayor cuidado en el lugar del evento. Este costo de transporte se calcula y detalla de manera transparente en la cotización final según la distancia."
  },
  {
    question: "¿Qué pasa si ocurre algún daño material accidental?",
    answer: "La tranquilidad de tu hogar es nuestra prioridad. Contamos con políticas claras de responsabilidad y supervisión constante. Ante cualquier imprevisto de daño material causado directamente por nuestro personal en el cumplimiento de su labor, responderemos por la reparación o reposición correspondiente."
  },
  {
    question: "¿Cómo se realizan los pagos?",
    answer: "Los pagos se realizan a través de transferencia bancaria o canales digitales autorizados. Se solicita un abono inicial para confirmar el servicio (especialmente en decoración y repostería) y el saldo restante se liquida antes o inmediatamente al finalizar el evento."
  }
];

interface ServiceOperativo {
  name: string;
  desc: string;
  time: string;
  who: string;
  assumedHours: number;
  assumedGuests: number;
  assumedEvent: string;
}

interface ServiceCreativo {
  name: string;
  desc: string;
  img: string;
}

const operativos: ServiceOperativo[] = [
  {
    name: "Bienvenida Impecable (Antes)",
    desc: "Dejamos tu hogar o salón impecable antes del evento. Te ayudamos a vestir las mesas, ordenar la mantelería y colocar cada detalle en su lugar.",
    time: "2-4h",
    who: "Cumpleaños, reuniones y fiestas íntimas",
    assumedHours: 3,
    assumedGuests: 30,
    assumedEvent: "Cumpleaños"
  },
  {
    name: "Despedida Relajada (Después)",
    desc: "Disfruta de tus invitados hasta el último minuto. Al terminar, lavamos la vajilla, recogemos todo y dejamos tu casa impecable para que descanses.",
    time: "3-6h",
    who: "Anfitriones que quieren descansar al terminar",
    assumedHours: 4,
    assumedGuests: 30,
    assumedEvent: "Cumpleaños"
  },
  {
    name: "Atención Cariñosa (Durante)",
    desc: "Un equipo cálido y atento para servir los platos, reponer pasabocas, servir bebidas y cuidar el orden de las mesas en tiempo real.",
    time: "Por horas o paquete",
    who: "Bautizos, bodas en jardín y celebraciones",
    assumedHours: 5,
    assumedGuests: 50,
    assumedEvent: "Bautizo / Comunión"
  }
];

const creativos: ServiceCreativo[] = [
  {
    name: "Repostería Casera & Candy Bar",
    desc: "Tortas caseras, galletas decoradas y mesas de dulces temáticas elaboradas artesanalmente con recetas tradicionales y mucho amor.",
    img: import.meta.env.BASE_URL + "assets/service-candy-CCU3OixR.jpg"
  },
  {
    name: "Rincones Mágicos & Decoración",
    desc: "Diseño y ambientación de rincones fotográficos hermosos y fondos temáticos adaptados a la ilusión de tu celebración.",
    img: import.meta.env.BASE_URL + "assets/service-decor-nzMl6I_T.jpg"
  },
  {
    name: "Detalles Hechos a Mano & Recuerdos",
    desc: "Centros de mesa, souvenirs y recordatorios tejidos o elaborados a mano con dedicación por nuestras mamás emprendedoras.",
    img: import.meta.env.BASE_URL + "assets/service-cleaning-l_c3EHGw.jpg"
  }
];

export const Servicios: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  return (
    <div>
      {/* Page Header */}
      <section className="container-page pb-12 pt-16 md:pt-24">
        <span className="eyebrow">Nuestra Ayuda</span>
        <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl text-primary">
          Amor en los detalles y <span className="italic text-terracotta">tranquilidad para celebrar.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Cuidamos de tu hogar y tus invitados con la calidez de una madre, permitiéndote ser el verdadero anfitrión de tu fiesta.
        </p>
      </section>

      {/* Operativos Section */}
      <section className="border-y border-border bg-primary/[0.03]">
        <div className="container-page py-20">
          <div className="flex items-center gap-3">
            <Wrench className="h-5 w-5 text-primary" />
            <span className="eyebrow !text-primary">Manos Aliadas</span>
          </div>
          <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl text-primary">Tu hogar en las mejores manos</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Mamás dedicadas, de plena confianza, uniformadas y amables. Elige el apoyo que desees por horas para tu total tranquilidad.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {operativos.map((service) => (
              <article
                key={service.name}
                className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft"
              >
                <h3 className="text-xl !text-foreground font-display font-medium">
                  {service.name}
                </h3>
                <p className="mt-3 text-muted-foreground flex-1 text-sm leading-relaxed">
                  {service.desc}
                </p>
                <dl className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <dt className="text-muted-foreground">Duración</dt>
                    <dd className="font-medium text-foreground">{service.time}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <dt className="text-muted-foreground">Valor Estimado</dt>
                    <dd className="font-semibold text-terracotta">
                      S/ {calculateEstimateRange(service.assumedEvent, service.assumedGuests, service.assumedHours).min} - S/ {calculateEstimateRange(service.assumedEvent, service.assumedGuests, service.assumedHours).max}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Ideal para</dt>
                    <dd className="font-medium text-right text-foreground">{service.who}</dd>
                  </div>
                </dl>
                <div className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-sage/10 px-3 py-1 text-xs text-sage font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Personal de total confianza
                </div>
                <Link to="/cotizar" className="btn-primary mt-6 !min-h-11 !text-sm">
                  Cotizar este servicio
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Creativos Section */}
      <section className="container-page py-20 lg:py-28">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-terracotta" />
          <span className="eyebrow">Magia Hecha a Mano</span>
        </div>
        <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl text-primary">Detalles que enamoran a tus invitados</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Tortas caseras horneadas con amor y rincones mágicos decorados por nuestras mamás creadoras.
        </p>

        <div className="mt-12 space-y-12">
          {creativos.map((service, index) => (
            <article
              key={service.name}
              className={`grid gap-8 md:grid-cols-2 md:items-center ${
                index % 2 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div>
                <img
                  src={service.img}
                  alt={service.name}
                  loading="lazy"
                  width="1200"
                  height="900"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
                />
              </div>
              <div>
                <h3 className="text-3xl !text-foreground font-display font-medium">
                  {service.name}
                </h3>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                  {service.desc}
                </p>
                
                <table className="mt-6 w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="py-2 font-semibold text-foreground">Paquete</th>
                      <th className="py-2 font-semibold text-foreground">Detalle de apoyo</th>
                      <th className="py-2 font-semibold text-right text-foreground">Desde</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    <tr>
                      <td className="py-3 text-foreground font-medium">Combo Anfitrión Feliz</td>
                      <td className="py-3 text-muted-foreground">Hasta 30 invitados (postres básicos)</td>
                      <td className="py-3 text-right font-medium text-foreground">
                        S/ {calculateEstimateRange("Cumpleaños", 30, 4).min} - S/ {calculateEstimateRange("Cumpleaños", 30, 4).max}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-foreground font-medium">Combo Despreocúpate</td>
                      <td className="py-3 text-muted-foreground">Hasta 80 invitados (montaje + decoración)</td>
                      <td className="py-3 text-right font-medium text-foreground">
                        S/ {calculateEstimateRange("Cumpleaños", 80, 5).min} - S/ {calculateEstimateRange("Cumpleaños", 80, 5).max}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-foreground font-medium">Combo Dulce Detalle</td>
                      <td className="py-3 text-muted-foreground">Personalizado (+ recordatorios a mano)</td>
                      <td className="py-3 text-right font-medium text-foreground">
                        S/ {calculateEstimateRange("Cumpleaños", 120, 6).min} - S/ {calculateEstimateRange("Cumpleaños", 120, 6).max}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <Link to="/cotizar" className="btn-primary mt-6 !min-h-11 !text-sm">
                  Pedir cotización <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border bg-sand/20 py-20">
        <div className="container-page mx-auto max-w-3xl">
          <div className="text-center">
            <span className="eyebrow">Preguntas Frecuentes</span>
            <h2 className="mt-3 text-3xl sm:text-4xl text-primary font-display">Dudas comunes de nuestros anfitriones</h2>
            <p className="mt-3 text-muted-foreground text-sm">
              Todo lo que necesitas saber antes de contratar el soporte perfecto para tu evento.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between gap-4 text-left font-medium text-foreground cursor-pointer focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-display font-medium">{faq.question}</span>
                    <span className={`text-xl text-terracotta transition-transform duration-300 font-sans ${isOpen ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
