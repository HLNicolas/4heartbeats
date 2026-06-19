import React from "react";
import { Link } from "react-router-dom";
import { Wrench, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

interface ServiceOperativo {
  name: string;
  desc: string;
  time: string;
  who: string;
}

interface ServiceCreativo {
  name: string;
  desc: string;
  img: string;
}

const operativos: ServiceOperativo[] = [
  {
    name: "Preparación y Montaje",
    desc: "Dejamos tu casa o local impecable y te ayudamos a armar las mesas, mantelería y detalles decorativos antes de que lleguen tus invitados.",
    time: "2-4h",
    who: "Cumpleaños, reuniones y fiestas íntimas"
  },
  {
    name: "Limpieza profunda final",
    desc: "Disfruta de la fiesta hasta el último minuto. Al terminar, nosotros nos encargamos de recoger todo, lavar los platos e impecabilizar tu hogar.",
    time: "3-6h",
    who: "Anfitriones que quieren descansar al terminar"
  },
  {
    name: "Soporte y Atención durante el festejo",
    desc: "Equipo cálido para servir la comida, repartir bebidas a tus invitados, reponer pasabocas y mantener todo ordenado en tiempo real.",
    time: "Por horas o paquete",
    who: "Bautizos, bodas en jardín y celebraciones"
  }
];

const creativos: ServiceCreativo[] = [
  {
    name: "Candy bar y repostería casera",
    desc: "Mesas de dulces temáticas y personalizadas con tartas, galletas y repostería artesanal de recetas tradicionales.",
    img: import.meta.env.BASE_URL + "assets/service-candy-CCU3OixR.jpg"
  },
  {
    name: "Decoración integral personalizada",
    desc: "Diseño, ambientación y montaje de rincones especiales y fondos para fotos según la temática de tu celebración.",
    img: import.meta.env.BASE_URL + "assets/service-decor-nzMl6I_T.jpg"
  },
  {
    name: "Artesanías y recordatorios",
    desc: "Centros de mesa, recuerdos de bautizo/comunión y pequeños detalles tejidos o hechos a mano con cariño.",
    img: import.meta.env.BASE_URL + "assets/service-cleaning-l_c3EHGw.jpg"
  }
];

export const Servicios: React.FC = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="container-page pb-12 pt-16 md:pt-24">
        <span className="eyebrow">Servicios</span>
        <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl text-primary">
          Apoyo logístico y detalles creativos. <span className="italic text-terracotta">Todo para tu fiesta.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Nos encargamos de las tareas pesadas de la organización para que puedas ser un invitado más y disfrutar de tus seres queridos.
        </p>
      </section>

      {/* Operativos Section */}
      <section className="border-y border-border bg-primary/[0.03]">
        <div className="container-page py-20">
          <div className="flex items-center gap-3">
            <Wrench className="h-5 w-5 text-primary" />
            <span className="eyebrow !text-primary">Servicios de Soporte</span>
          </div>
          <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl text-primary">Para tu tranquilidad en casa</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Madres de total confianza, uniformadas, meticulosas y amables. Elige el apoyo que necesitas por hora o por paquete.
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
          <span className="eyebrow">Creativos</span>
        </div>
        <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl text-primary">Para que se vea memorable</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Detalles hechos a mano y repostería casera elaborada con esmero por nuestras emprendedoras.
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
                      <td className="py-3 text-right font-medium text-foreground">$ — cotizar</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-foreground font-medium">Combo Despreocúpate</td>
                      <td className="py-3 text-muted-foreground">Hasta 80 invitados (montaje + decoración)</td>
                      <td className="py-3 text-right font-medium text-foreground">$ — cotizar</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-foreground font-medium">Combo Dulce Detalle</td>
                      <td className="py-3 text-muted-foreground">Personalizado (+ recordatorios a mano)</td>
                      <td className="py-3 text-right font-medium text-foreground">$ — cotizar</td>
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
    </div>
  );
};
