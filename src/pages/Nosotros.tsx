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
    title: "Verificación de antecedentes",
    desc: "Validación documental y referencias."
  },
  {
    Icon: Users,
    title: "Entrevista personal",
    desc: "Conocemos su historia, fortalezas y disponibilidad."
  },
  {
    Icon: Award,
    title: "Capacitación interna",
    desc: "Protocolos de servicio, higiene y atención al cliente."
  },
  {
    Icon: Heart,
    title: "Uniforme e ID visible",
    desc: "Cada persona llega identificada y supervisada."
  }
];

export const Nosotros: React.FC = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="container-page pt-16 md:pt-24">
        <span className="eyebrow">Nosotros</span>
        <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl text-primary">
          Una agencia profesional. Un equipo con propósito.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          No somos una fundación. Somos una empresa de servicios que decidió construir su equipo principal con mujeres en situación vulnerable, capacitarlas y proyectarlas hacia la autonomía económica.
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
          <h2 className="text-3xl sm:text-4xl text-primary">Por qué existimos</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Identificamos dos realidades: pequeños negocios que necesitan personal confiable on-demand para sus eventos, y mujeres con experiencia y talento que no encuentran espacios de trabajo digno y flexible. 4 Heartbeats conecta esas dos necesidades con estándares de agencia profesional.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Cada servicio que se contrata se traduce en horas pagadas, capacitación continua y proyección comercial para los microemprendimientos de nuestras integrantes.
          </p>
        </div>
      </section>

      {/* Verification Steps Section */}
      <section className="container-page mt-24">
        <h2 className="text-3xl sm:text-4xl text-primary">Nuestro proceso de verificación</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          La confianza no se declara, se construye. Esto es lo que hacemos antes de enviar a una persona a tu evento:
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
