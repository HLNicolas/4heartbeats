import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Users, Award, Heart } from "lucide-react";

interface VerificationStep {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

const steps: VerificationStep[] = [
  {
    Icon: ShieldCheck,
    title: "Confianza Respaldada",
    desc: "Validamos de forma atenta la documentación y referencias personales de cada mamá."
  },
  {
    Icon: Users,
    title: "Vínculo Humano",
    desc: "Nos reunimos en persona para conocer su historia, sus fortalezas y sus metas familiares."
  },
  {
    Icon: Award,
    title: "Capacitación y Cuidado",
    desc: "Entrenamos de forma gratuita en técnicas de servicio, repostería, higiene y calidez."
  },
  {
    Icon: Heart,
    title: "Identificación y Cariño",
    desc: "Llegamos a tu evento debidamente uniformadas y listas para apoyarte con una sonrisa."
  }
];

export const Nosotros: React.FC = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="container-page pt-16 md:pt-24">
        <span className="eyebrow">Nosotros</span>
        <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl text-primary">
          Cuidado con propósito. Un equipo hecho familia.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Somos una iniciativa social que cree en la dedicación de las madres. Las capacitamos y certificamos profesionalmente en servicios para el hogar y repostería, impulsando su autonomía económica mientras cuidan de tu festejo.
        </p>
      </section>

      {/* Intro Grid */}
      <section className="container-page mt-16 grid gap-12 md:grid-cols-2 md:items-center">
        <img
          src={`${import.meta.env.BASE_URL}assets/portrait-maria-aN47n46m.jpg`}
          alt="Integrante del equipo"
          width="800"
          height="1000"
          className="aspect-[4/5] w-full rounded-3xl object-cover shadow-card"
        />
        
        <div>
          <h2 className="text-3xl sm:text-4xl text-primary">Nuestra Razón de Ser</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Nacimos al conectar dos realidades: familias que desean celebrar con tranquilidad y disfrutar de su tiempo, y madres talentosas y dedicadas que buscan un ingreso justo en un horario que les permita cuidar de sus propios hijos. En 4 Heartbeats unimos estas necesidades con afecto y profesionalismo.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Cada vez que nos abres las puertas de tu celebración, estás respaldando horas de empleo digno, capacitación continua y un futuro más seguro para los hogares de nuestras colaboradoras.
          </p>
        </div>
      </section>

      {/* Verification Steps Section */}
      <section className="container-page mt-24">
        <h2 className="text-3xl sm:text-4xl text-primary">Cuidamos la Confianza en tu Hogar</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Sabemos que tu hogar es sagrado. Por eso, nos aseguramos de brindarte máxima tranquilidad con un proceso de acompañamiento muy riguroso:
        </p>
        
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const IconComponent = step.Icon;
            return (
              <div key={step.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <IconComponent className="h-6 w-6 text-terracotta" />
                <h3 className="mt-4 text-lg !text-foreground font-display font-medium">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recruitment CTA Section */}
      <section className="container-page my-24 rounded-3xl bg-sand p-10 md:p-14">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl text-primary">¿Eres una mujer que quiere postular?</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Buscamos personas comprometidas en limpieza, repostería, decoración y artesanía. Te capacitamos.
            </p>
          </div>
          <div className="md:text-right">
            <Link to="/trabaja-con-nosotros" className="btn-primary">
              Postular ahora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
