import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

interface FormData {
  tipo: string;
  servicios: string[];
  fecha: string;
  ciudad: string;
  invitados: string;
  nombre: string;
  contacto: string;
  canal: "WhatsApp" | "Correo";
}

const eventTypes = [
  "Boda íntima",
  "Bautizo / Comunión",
  "Cumpleaños",
  "Baby Shower",
  "Fiesta / Cena en casa",
  "Otro"
];

const serviceOptions = [
  "Servir y atender invitados",
  "Tener la casa limpia al terminar",
  "Montaje de mesas y sillas",
  "Candy bar y repostería",
  "Decoración temática",
  "Artesanías y recordatorios"
];

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, type = "text" }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
      />
    </div>
  );
};

export const Cotizar: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    tipo: "",
    servicios: [],
    fecha: "",
    ciudad: "",
    invitados: "",
    nombre: "",
    contacto: "",
    canal: "WhatsApp"
  });

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const isSelected = prev.servicios.includes(service);
      return {
        ...prev,
        servicios: isSelected
          ? prev.servicios.filter((s) => s !== service)
          : [...prev.servicios, service]
      };
    });
  };

  const handleNext = () => {
    if (step === 1 && !formData.tipo) return;
    if (step === 2 && formData.servicios.length === 0) return;
    if (step === 3 && (!formData.fecha || !formData.ciudad || !formData.invitados)) return;
    
    setStep((prev) => Math.min(4, prev + 1));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    if (!formData.nombre || !formData.contacto) return;
    setSubmitted(true);
  };

  const isStepValid = () => {
    if (step === 1) return !!formData.tipo;
    if (step === 2) return formData.servicios.length > 0;
    if (step === 3) return !!formData.fecha && !!formData.ciudad && !!formData.invitados;
    if (step === 4) return !!formData.nombre && !!formData.contacto;
    return true;
  };

  const whatsappMessage = `Hola, acabo de enviar una cotización para un/a ${formData.tipo} el ${formData.fecha}.`;

  return (
    <div>
      {/* Page Header */}
      <section className="container-page pt-16 md:pt-24">
        <span className="eyebrow">Cotización</span>
        <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl text-primary">
          Cuéntanos sobre tu festejo.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Cuatro pasos rápidos. Te responderemos en menos de 24h hábiles.
        </p>
      </section>

      {/* Form Card Container */}
      <section className="container-page mt-10 pb-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-7 shadow-card md:p-10">
          {submitted ? (
            /* Thank You Screen */
            <div className="py-12 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage/15 text-sage">
                <Check className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-3xl text-primary font-medium">¡Solicitud recibida!</h2>
              <p className="mt-3 text-muted-foreground text-sm">
                Te contactaremos por {formData.canal} en menos de 24 horas hábiles.
              </p>
              <a
                href={`https://wa.me/0000000000?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-7"
              >
                Continuar por WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ) : (
            /* Step-by-Step Wizard */
            <div>
              {/* Step indicator */}
              <ol className="mb-8 flex items-center gap-2">
                {[1, 2, 3, 4].map((s) => (
                  <li
                    key={s}
                    className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-terracotta" : "bg-border"}`}
                  />
                ))}
              </ol>

              {/* Step Content */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl text-primary">¡Hola! ¿Qué momento especial vamos a celebrar?</h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {eventTypes.map((type) => {
                      const isSelected = formData.tipo === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, tipo: type })}
                          className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                            isSelected
                              ? "border-terracotta bg-terracotta text-ivory"
                              : "border-border hover:border-terracotta/50 text-foreground"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl text-primary">¿En qué te gustaría que te apoyemos?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Selecciona uno o varios servicios de apoyo.
                  </p>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {serviceOptions.map((service) => {
                      const isSelected = formData.servicios.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors cursor-pointer ${
                            isSelected
                              ? "border-terracotta bg-terracotta/5 text-foreground"
                              : "border-border hover:border-terracotta/50 text-foreground"
                          }`}
                        >
                          <span>{service}</span>
                          <span
                            className={`grid h-5 w-5 place-items-center rounded-full border ${
                              isSelected ? "border-terracotta bg-terracotta text-ivory" : "border-border"
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-2xl text-primary">Detalles de la celebración</h2>
                  <FormField
                    label="Fecha del evento"
                    type="date"
                    value={formData.fecha}
                    onChange={(val) => setFormData({ ...formData, fecha: val })}
                  />
                  <FormField
                    label="Ciudad o zona del evento"
                    value={formData.ciudad}
                    onChange={(val) => setFormData({ ...formData, ciudad: val })}
                  />
                  <FormField
                    label="N° aproximado de invitados"
                    type="number"
                    value={formData.invitados}
                    onChange={(val) => setFormData({ ...formData, invitados: val })}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="text-2xl text-primary">¿Cómo coordinamos los detalles?</h2>
                  <FormField
                    label="Tu nombre"
                    value={formData.nombre}
                    onChange={(val) => setFormData({ ...formData, nombre: val })}
                  />
                  <FormField
                    label="Tu WhatsApp o correo"
                    value={formData.contacto}
                    onChange={(val) => setFormData({ ...formData, contacto: val })}
                  />
                  <div>
                    <label className="block text-sm font-medium text-foreground">Canal de contacto preferido</label>
                    <div className="mt-2 flex gap-2">
                      {(["WhatsApp", "Correo"] as const).map((channel) => {
                        const isSelected = formData.canal === channel;
                        return (
                          <button
                            key={channel}
                            type="button"
                            onClick={() => setFormData({ ...formData, canal: channel })}
                            className={`rounded-full border px-4 py-2 text-sm cursor-pointer transition-colors ${
                              isSelected ? "border-terracotta bg-terracotta text-ivory" : "border-border text-foreground"
                            }`}
                          >
                            {channel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Navigation */}
              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="text-sm font-medium text-muted-foreground disabled:opacity-30 cursor-pointer"
                >
                  ← Atrás
                </button>
                
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="btn-primary !min-h-11 !text-sm cursor-pointer"
                  >
                    Continuar <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isStepValid()}
                    className="btn-primary !min-h-11 !text-sm cursor-pointer"
                  >
                    Enviar solicitud
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
