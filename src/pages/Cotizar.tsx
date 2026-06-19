import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { calculateEstimateRange, WHATSAPP_PHONE_NUMBER } from "../utils/pricing";

interface FormData {
  tipo: string;
  servicios: string[];
  fecha: string;
  ciudad: string;
  invitados: string;
  horas: string;
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
  min?: string;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, type = "text", min, placeholder }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
      />
    </div>
  );
};

const getMinDateStr = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().split("T")[0];
};

const isMinSevenDays = (dateStr: string) => {
  if (!dateStr) return false;
  const selected = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = selected.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays >= 7;
};

const SummaryDetails: React.FC<{ data: FormData; workers: number }> = ({ data, workers }) => {
  return (
    <div className="mt-4 border-t border-dashed border-border/80 pt-4 text-left space-y-2 text-xs text-muted-foreground">
      <div className="flex justify-between">
        <span>Evento:</span>
        <span className="font-semibold text-foreground">{data.tipo}</span>
      </div>
      <div className="flex justify-between">
        <span>Fecha:</span>
        <span className="font-semibold text-foreground">{data.fecha}</span>
      </div>
      <div className="flex justify-between">
        <span>Lugar:</span>
        <span className="font-semibold text-foreground">{data.ciudad}</span>
      </div>
      <div className="flex justify-between">
        <span>Invitados:</span>
        <span className="font-semibold text-foreground">{data.invitados} personas</span>
      </div>
      <div className="flex justify-between">
        <span>Duración:</span>
        <span className="font-semibold text-foreground">{data.horas} horas</span>
      </div>
      <div className="flex justify-between">
        <span>Personal:</span>
        <span className="font-semibold text-foreground">{workers} colaboradoras</span>
      </div>
      {data.servicios.length > 0 && (
        <div className="border-t border-border/40 pt-2">
          <span className="block mb-1 text-[10px] uppercase tracking-wider font-semibold">Servicios de interés:</span>
          <span className="block text-foreground leading-normal">{data.servicios.join(", ")}</span>
        </div>
      )}
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
    horas: "4", // Default value
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
    if (step === 3 && (!formData.fecha || !formData.ciudad || !formData.invitados || !formData.horas)) return;
    
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
    if (step === 3) {
      const numInvitados = parseInt(formData.invitados, 10) || 0;
      const numHoras = parseInt(formData.horas, 10) || 0;
      const isDateValid = isMinSevenDays(formData.fecha);
      return !!formData.fecha && !!formData.ciudad && numInvitados > 0 && numHoras > 0 && isDateValid;
    }
    if (step === 4) return !!formData.nombre && !!formData.contacto;
    return true;
  };

  const priceRange = calculateEstimateRange(
    formData.tipo,
    formData.invitados,
    parseInt(formData.horas, 10) || 4
  );

  const servicesText = formData.servicios.map((s) => `- ${s}`).join("\n");
  const whatsappMessage = `*Nueva Solicitud de Cotización* 🌸

*Detalles del cliente:*
- *Nombre:* ${formData.nombre}
- *Contacto:* ${formData.contacto} (Preferencia: ${formData.canal})

*Detalles del evento:*
- *Tipo:* ${formData.tipo}
- *Fecha:* ${formData.fecha}
- *Ciudad/Zona:* ${formData.ciudad}
- *Invitados:* ~${formData.invitados} personas
- *Duración:* ${formData.horas} horas
- *Personal:* ${priceRange.workers} colaboradoras (1 cada 7 personas)

*Servicios de interés:*
${servicesText}

*Cotización Estimada:*
S/ ${priceRange.min} - S/ ${priceRange.max}* (rango negociable)

_*Nota: Cotización sujeta a confirmación final._`;

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
            <div className="py-8 text-center space-y-6">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage/15 text-sage">
                <Check className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-3xl text-primary font-medium font-display">¡Solicitud recibida!</h2>
                <p className="mt-2 text-muted-foreground text-sm">
                  Hemos calculado un presupuesto estimado preliminar para tu evento.
                </p>
              </div>

              {/* Price Estimate Card */}
              <div className="mx-auto max-w-sm rounded-2xl bg-sand/40 border border-sand p-6 text-center shadow-soft">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  Presupuesto Estimado
                </span>
                <p className="mt-2 text-3xl font-bold text-primary font-display">
                  S/ {priceRange.min} — S/ {priceRange.max}
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground font-medium">
                  ({priceRange.workers} colaboradoras asignadas)
                </p>
                <p className="mt-3 text-[10px] text-muted-foreground leading-normal">
                  *Incluye 5% de mantenimiento y servicio.
                </p>

                {/* Detalles de la reserva */}
                <SummaryDetails data={formData} workers={priceRange.workers} />
              </div>

              <p className="text-sm text-muted-foreground">
                Te contactaremos por {formData.canal} en menos de 24 horas hábiles para coordinar los detalles. Haz clic a continuación para enviarnos el resumen de tu cotización directamente por WhatsApp.
              </p>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mx-auto inline-flex items-center gap-2"
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
                    label="Fecha del evento (mínimo 7 días de anticipación)"
                    type="date"
                    min={getMinDateStr()}
                    value={formData.fecha}
                    onChange={(val) => setFormData({ ...formData, fecha: val })}
                  />
                  <FormField
                    label="Ciudad o zona del evento"
                    value={formData.ciudad}
                    onChange={(val) => setFormData({ ...formData, ciudad: val })}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="N° de invitados"
                      type="number"
                      min="1"
                      value={formData.invitados}
                      onChange={(val) => setFormData({ ...formData, invitados: val })}
                    />
                    <FormField
                      label="Duración (horas)"
                      type="number"
                      min="1"
                      value={formData.horas}
                      onChange={(val) => setFormData({ ...formData, horas: val })}
                    />
                  </div>
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

                  {/* Vista previa de la cotización antes de enviar */}
                  <div className="mt-6 rounded-2xl bg-sand/30 border border-sand p-5 text-center shadow-soft animate-fade-in">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                      Presupuesto Preliminar Estimado
                    </span>
                    <p className="mt-2 text-2xl font-bold text-primary font-display">
                      S/ {priceRange.min} — S/ {priceRange.max}
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground font-medium">
                      ({priceRange.workers} colaboradoras requeridas)
                    </p>
                    <p className="mt-2 text-[10px] text-muted-foreground leading-normal">
                      *Incluye 5% de mantenimiento y servicio.
                    </p>

                    {/* Resumen de la información ingresada */}
                    <SummaryDetails data={formData} workers={priceRange.workers} />
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
