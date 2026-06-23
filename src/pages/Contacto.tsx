import React, { useState } from "react";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";

interface ContactInfo {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

const contactDetails: ContactInfo[] = [
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: "+00 000 000 000"
  },
  {
    Icon: Mail,
    label: "Correo",
    value: "hola@manosaliadas.co"
  },
  {
    Icon: Phone,
    label: "Teléfono",
    value: "+00 000 000 000"
  },
  {
    Icon: Clock,
    label: "Horario",
    value: "Lunes a sábado · 8:00 — 19:00"
  }
];

export const Contacto: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  return (
    <div>
      {/* Header Section */}
      <section className="container-page pt-16 md:pt-24">
        <span className="eyebrow">Contacto</span>
        <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl text-primary">
          Hablemos de tu evento.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Respondemos en menos de 24 horas hábiles. Escríbenos por el canal que prefieras.
        </p>
      </section>

      {/* Content Grid */}
      <section className="container-page mt-12 grid gap-10 pb-20 md:grid-cols-2">
        {/* Left Side: Info & Allied Box */}
        <div>
          <div className="space-y-4">
            {contactDetails.map((item) => {
              const IconComponent = item.Icon;
              return (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-terracotta/10 text-terracotta">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                      {item.label}
                    </p>
                    <p className="mt-1 font-medium text-foreground truncate">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl bg-sand p-6">
            <h3 className="text-xl text-primary font-display font-medium">
              ¿Eres negocio aliado?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Agendamos una reunión comercial de 20 minutos para entender tu operación y armar un acuerdo de servicio.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-card p-7 shadow-soft md:p-10"
          >
            {submitted ? (
              <div className="py-10 text-center">
                <p className="font-display text-2xl text-terracotta font-semibold">
                  ¡Mensaje enviado!
                </p>
                <p className="mt-3 text-muted-foreground">
                  Te respondemos en menos de 24 horas hábiles.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl text-primary">Envíanos un mensaje</h2>
                
                {/* Nombre Input */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-foreground">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  />
                </div>

                {/* Teléfono Input */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                    WhatsApp o teléfono
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Correo (opcional)
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-foreground">
                    ¿En qué podemos ayudarte?
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={4}
                    className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                    placeholder="Cuéntanos brevemente sobre tu evento o consulta"
                  />
                </div>

                <button type="submit" className="btn-primary w-full mt-2">
                  Enviar mensaje
                </button>
                
                <p className="text-xs text-muted-foreground mt-4">
                  Al enviar aceptas nuestra política de tratamiento de datos.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};
