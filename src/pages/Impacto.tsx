import React from "react";
import { Link } from "react-router-dom";

interface ImpactStory {
  name: string;
  role: string;
  time: string;
  before: string;
  today: string;
  quote: string;
  project: string;
  img: string;
}

const stories: ImpactStory[] = [
  {
    name: "María",
    role: "Líder de candy bar",
    time: "2 años en el equipo",
    before: "Trabajaba por horas en cocinas informales, sin estabilidad ni proyección.",
    today: "Lidera el área de repostería artesanal y entrena a nuevas integrantes. Atendió 38 eventos este año.",
    quote: "Aprendí que mi repostería tenía valor. Hoy hago lo que amo y mantengo a mi familia.",
    project: "Boda íntima de 60 invitados — montó un candy bar que los novios usaron como punto central de la noche.",
    img: import.meta.env.BASE_URL + "assets/portrait-maria-aN47n46m.jpg"
  },
  {
    name: "Lucía",
    role: "Decoradora y artesana",
    time: "3 años en el equipo",
    before: "Vendía artesanías en plazas, ingresos irregulares.",
    today: "Diseña la línea de artesanías para bautizos y comuniones de la agencia. Sus piezas se venden con marca propia.",
    quote: "Cada centro de mesa lleva mi nombre. Eso antes no existía para mí.",
    project: "Comunión de 80 invitados — diseñó y entregó 80 recordatorios artesanales personalizados.",
    img: import.meta.env.BASE_URL + "assets/portrait-lucia-BjqWVyYB.jpg"
  }
];

export const Impacto: React.FC = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="container-page pt-16 md:pt-24">
        <span className="eyebrow">Historias de impacto</span>
        <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl text-primary">
          Profesionales que ejecutan cada evento.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          No son beneficiarias. Son las protagonistas de esta agencia. Estas son algunas de sus historias.
        </p>
      </section>

      {/* Stories Grid */}
      <section className="container-page mt-16 space-y-20 pb-12">
        {stories.map((story, index) => (
          <article
            key={story.name}
            className={`grid gap-10 md:grid-cols-12 md:items-center ${
              index % 2 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="md:col-span-5">
              <img
                src={story.img}
                alt={`Retrato de ${story.name}`}
                width="800"
                height="1000"
                loading="lazy"
                className="aspect-[4/5] w-full rounded-3xl object-cover shadow-card"
              />
            </div>
            
            <div className="md:col-span-7">
              <span className="eyebrow">{story.time}</span>
              <h2 className="mt-2 text-3xl sm:text-4xl text-primary">
                {story.name} ·{" "}
                <span className="text-foreground/70 font-display italic font-normal">
                  {story.role}
                </span>
              </h2>
              
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-foreground">Antes</dt>
                  <dd className="mt-1 text-muted-foreground">{story.before}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Hoy</dt>
                  <dd className="mt-1 text-muted-foreground">{story.today}</dd>
                </div>
              </dl>
              
              <blockquote className="mt-6 border-l-2 border-terracotta pl-5 text-lg italic text-foreground/90 font-display">
                "{story.quote}"
              </blockquote>
              
              <div className="mt-6 rounded-2xl bg-sand/60 p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Proyecto destacado
                </p>
                <p className="mt-2 text-foreground/90 text-sm">
                  {story.project}
                </p>
              </div>

              <Link
                to="/cotizar"
                className="btn-primary mt-7 !min-h-11 !text-sm w-full sm:w-auto"
              >
                Contrata un servicio con el equipo de {story.name}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
