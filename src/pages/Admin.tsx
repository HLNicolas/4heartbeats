import React, { useState, useEffect } from "react";
import { Lock, Calculator, Info } from "lucide-react";
import {
  ADMIN_PASSWORD,
  BASE_HOURLY_RATE,
  COMMISSION_MAINTENANCE,
  COMMISSION_INTERMEDIARY,
  NEGOTIABLE_MARGIN,
  GUESTS_PER_WORKER,
  EVENT_MULTIPLIERS,
  RATE_CANDY_BAR_PER_GUEST,
  RATE_DECORATION_BASE,
  RATE_SOUVENIRS_PER_GUEST,
  CLEANING_KIT_COST
} from "../utils/pricing";

export const Admin: React.FC = () => {
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Simulador state
  const [simEvent, setSimEvent] = useState("Cumpleaños");
  const [simGuests, setSimGuests] = useState("30");
  const [simHours, setSimHours] = useState("4");
  const [simServices, setSimServices] = useState<string[]>([
    "Servir y atender invitados",
    "Tener la casa limpia al terminar",
    "Montaje de mesas y sillas"
  ]);
  const [simDonation, setSimDonation] = useState(false);
  const [simResult, setSimResult] = useState<any>(null);

  // Check session storage on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_auth");
    if (authStatus === "true") {
      setIsAuthorized(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthorized(true);
      setLoginError(false);
      sessionStorage.setItem("admin_auth", "true");
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem("admin_auth");
    setPasswordInput("");
  };

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    const guestsNum = parseInt(simGuests, 10) || 0;
    const hoursNum = parseInt(simHours, 10) || 0;

    const hasAtender = simServices.includes("Servir y atender invitados");
    const hasLimpieza = simServices.includes("Tener la casa limpia al terminar");
    const hasMontaje = simServices.includes("Montaje de mesas y sillas");
    const hasCleaningKit = simServices.includes("Kit de insumos de limpieza profesional (+ S/ 40)");
    
    const hasOperational = hasAtender || hasLimpieza || hasMontaje || simServices.length === 0;

    const hasCandyBar = simServices.includes("Candy bar y repostería");
    const hasDecor = simServices.includes("Decoración temática");
    const hasSouvenirs = simServices.includes("Artesanías y recordatorios");

    const eventMultiplier = EVENT_MULTIPLIERS[simEvent] || 1.10;
    let workers = 0;
    let firstWorkerCost = 0;
    let additionalWorkersCost = 0;
    let totalBaseCost = 0;

    if (hasOperational) {
      workers = Math.max(1, Math.ceil(guestsNum / GUESTS_PER_WORKER));
      firstWorkerCost = BASE_HOURLY_RATE * hoursNum * eventMultiplier;
      additionalWorkersCost = BASE_HOURLY_RATE * hoursNum * (workers - 1);
      totalBaseCost = firstWorkerCost + additionalWorkersCost;
    }

    let creativeCost = 0;
    if (hasCandyBar) {
      creativeCost += RATE_CANDY_BAR_PER_GUEST * guestsNum;
    }
    if (hasDecor) {
      creativeCost += RATE_DECORATION_BASE;
    }
    if (hasSouvenirs) {
      creativeCost += RATE_SOUVENIRS_PER_GUEST * guestsNum;
    }
    if (hasCleaningKit) {
      creativeCost += CLEANING_KIT_COST;
    }

    const totalAccumulatedCost = totalBaseCost + creativeCost;

    // Divisor para que comisiones sean del precio final
    const divisor = 1 - (COMMISSION_MAINTENANCE + COMMISSION_INTERMEDIARY);
    let minPrice = totalAccumulatedCost / divisor;

    // Aplicar descuento por donación (10%)
    const discountFactor = simDonation ? 0.90 : 1.0;
    minPrice = minPrice * discountFactor;

    const maxPrice = minPrice * (1 + NEGOTIABLE_MARGIN);

    // Desglose de comisiones sobre el precio final (mínimo)
    const maintenanceFee = minPrice * COMMISSION_MAINTENANCE;
    const profitFee = minPrice * COMMISSION_INTERMEDIARY;

    setSimResult({
      workers,
      eventMultiplier,
      firstWorkerCost: Math.round(firstWorkerCost * discountFactor),
      additionalWorkersCost: Math.round(additionalWorkersCost * discountFactor),
      creativeCost: Math.round(creativeCost * discountFactor),
      totalBaseCost: Math.round(totalAccumulatedCost * discountFactor),
      maintenanceFee: Math.round(maintenanceFee),
      profitFee: Math.round(profitFee),
      minPrice: Math.round(minPrice),
      maxPrice: Math.round(maxPrice)
    });
  };

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-card text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-primary font-display">Panel de Control Secreto</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ingresa la clave de acceso para auditar la configuración y simular cotizaciones.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Contraseña administrativa"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-center text-foreground placeholder:text-muted-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              />
            </div>
            {loginError && (
              <p className="text-xs font-medium text-destructive">Clave de acceso incorrecta. Inténtalo de nuevo.</p>
            )}
            <button type="submit" className="btn-primary w-full cursor-pointer">
              Acceder al panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-10">
      <div className="container-page max-w-5xl space-y-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
          <div>
            <span className="eyebrow">Administración</span>
            <h1 className="text-3xl sm:text-4xl text-primary font-display font-medium">Panel Secreto de Costos</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Auditoría interna de fórmulas de cobro y simulación de márgenes.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted cursor-pointer transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Dashboard Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tarifa Base por Hora</dt>
            <dd className="mt-2 text-3xl font-bold text-primary font-display">S/ {BASE_HOURLY_RATE}</dd>
            <dd className="mt-1 text-xs text-muted-foreground">Pago por hora a colaboradoras</dd>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mantenimiento Plataforma</dt>
            <dd className="mt-2 text-3xl font-bold text-primary font-display">{(COMMISSION_MAINTENANCE * 100).toFixed(0)}%</dd>
            <dd className="mt-1 text-xs text-muted-foreground">Comisión sobre el precio final</dd>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ganancia Intermediación</dt>
            <dd className="mt-2 text-3xl font-bold text-primary font-display">{(COMMISSION_INTERMEDIARY * 100).toFixed(0)}%</dd>
            <dd className="mt-1 text-xs text-muted-foreground">Profit neto para Manos Aliadas</dd>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Proporción de Personal</dt>
            <dd className="mt-2 text-3xl font-bold text-primary font-display">1 / {GUESTS_PER_WORKER}</dd>
            <dd className="mt-1 text-xs text-muted-foreground">Una colaboradora por cada 15 invitados</dd>
          </div>
        </section>

        {/* Tarifas Creativas Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-primary font-display">Tarifas Creativas y Adicionales</h2>
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Candy Bar / Repostería</dt>
              <dd className="mt-2 text-3xl font-bold text-primary font-display">S/ {RATE_CANDY_BAR_PER_GUEST}</dd>
              <dd className="mt-1 text-xs text-muted-foreground">Tarifa por invitado</dd>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Decoración Temática</dt>
              <dd className="mt-2 text-3xl font-bold text-primary font-display">S/ {RATE_DECORATION_BASE}</dd>
              <dd className="mt-1 text-xs text-muted-foreground">Tarifa base por evento</dd>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recuerdos / Souvenirs</dt>
              <dd className="mt-2 text-3xl font-bold text-primary font-display">S/ {RATE_SOUVENIRS_PER_GUEST}</dd>
              <dd className="mt-1 text-xs text-muted-foreground">Tarifa por invitado</dd>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kit Insumos Limpieza</dt>
              <dd className="mt-2 text-3xl font-bold text-primary font-display">S/ {CLEANING_KIT_COST}</dd>
              <dd className="mt-1 text-xs text-muted-foreground">Tarifa fija opcional por evento</dd>
            </div>
          </section>
        </div>

        {/* Main Content Split */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Formulas & Explanations */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
              <h2 className="text-2xl text-primary font-display font-medium flex items-center gap-2">
                <Info className="h-5 w-5 text-terracotta" /> Fórmulas y Explicación
              </h2>
              
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="font-semibold text-foreground">1. Escalado no lineal de Personal:</h3>
                  <p className="mt-1">
                    Para evitar multiplicar la dificultad del evento por cada colaboradora, el multiplicador de evento se aplica <strong>solo al primer colaborador</strong> (quien realiza la coordinación y el setup clave). Las colaboradoras adicionales se incorporan a tarifa base limpia:
                  </p>
                  <code className="block mt-2 rounded-lg bg-muted p-2.5 text-xs text-foreground font-mono leading-normal">
                    Costo_Base = (TarifaBase * Horas * EventMultiplier) + (TarifaBase * Horas * (Trabajadoras - 1))
                  </code>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">2. Comisiones sobre el Precio Final:</h3>
                  <p className="mt-1">
                    Para que el mantenimiento (5%) y la intermediación (15%) sean porcentajes exactos del total cobrado al cliente, dividimos la base entre 0.80 en lugar de multiplicar por 1.20:
                  </p>
                  <code className="block mt-2 rounded-lg bg-muted p-2.5 text-xs text-foreground font-mono leading-normal">
                    Precio_Minimo = Costo_Base / (1 - 0.05 - 0.15) = Costo_Base / 0.80
                  </code>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">3. Margen Negociable:</h3>
                  <p className="mt-1">
                    El precio máximo final representa el precio mínimo adicionando el 15% del margen negociable:
                  </p>
                  <code className="block mt-2 rounded-lg bg-muted p-2.5 text-xs text-foreground font-mono leading-normal">
                    Precio_Maximo = Precio_Minimo * 1.15
                  </code>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-primary font-display">Multiplicadores por Evento</h3>
              <div className="mt-4 divide-y divide-border/60">
                {Object.entries(EVENT_MULTIPLIERS).map(([event, mult]) => (
                  <div key={event} className="flex justify-between py-2.5 text-sm">
                    <span className="text-muted-foreground">{event}</span>
                    <span className="font-semibold text-foreground">x{mult.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Simulator */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-6">
              <h2 className="text-2xl text-primary font-display font-medium flex items-center gap-2">
                <Calculator className="h-5 w-5 text-terracotta" /> Simulador de Cotización
              </h2>

              <form onSubmit={handleSimulate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground">Tipo de evento</label>
                  <select
                    value={simEvent}
                    onChange={(e) => setSimEvent(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  >
                    {Object.keys(EVENT_MULTIPLIERS).map((event) => (
                      <option key={event} value={event}>
                        {event}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground">N° de invitados</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={simGuests}
                      onChange={(e) => setSimGuests(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground">Duración (horas)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={simHours}
                      onChange={(e) => setSimHours(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Servicios simulados</label>
                  <div className="grid gap-2 text-xs sm:grid-cols-2">
                    {[
                      "Servir y atender invitados",
                      "Tener la casa limpia al terminar",
                      "Montaje de mesas y sillas",
                      "Candy bar y repostería",
                      "Decoración temática",
                      "Artesanías y recordatorios",
                      "Kit de insumos de limpieza profesional (+ S/ 40)"
                    ].map((service) => {
                      const isChecked = simServices.includes(service);
                      return (
                        <label key={service} className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSimServices([...simServices, service]);
                              } else {
                                setSimServices(simServices.filter((s) => s !== service));
                              }
                            }}
                            className="rounded border-gray-300 text-terracotta focus:ring-terracotta accent-terracotta"
                          />
                          <span>{service}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Checkbox para simulación de Donación */}
                <div>
                  <label className="flex items-center gap-2.5 rounded-lg border border-dashed border-terracotta/30 bg-terracotta/[0.02] px-3 py-2 text-xs text-foreground cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={simDonation}
                      onChange={(e) => setSimDonation(e.target.checked)}
                      className="rounded border-gray-300 text-terracotta focus:ring-terracotta accent-terracotta"
                    />
                    <span>🎁 Simular Donación Social (Aplicar 10% de descuento)</span>
                  </label>
                </div>

                <button type="submit" className="btn-primary w-full cursor-pointer">
                  Calcular Desglose
                </button>
              </form>

              {/* Simulation Result */}
              {simResult && (
                <div className="rounded-2xl bg-sand/15 border border-sand/40 p-5 space-y-4 animate-fade-in text-sm">
                  <h3 className="font-semibold text-primary uppercase tracking-wider text-xs">Desglose de Simulación</h3>
                  
                  <div className="divide-y divide-border/40 space-y-2">
                    <div className="flex justify-between pt-2">
                      <span className="text-muted-foreground">Colaboradoras estimadas:</span>
                      <span className="font-semibold text-foreground">{simResult.workers} mamás</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-muted-foreground font-semibold">Costos Operativos:</span>
                    </div>
                    <div className="flex justify-between pt-1 pl-4">
                      <span className="text-muted-foreground">Primer colaborador (x{simResult.eventMultiplier.toFixed(2)}):</span>
                      <span className="font-semibold text-foreground">S/ {simResult.firstWorkerCost}</span>
                    </div>
                    <div className="flex justify-between pt-1 pl-4">
                      <span className="text-muted-foreground">Colaboradores adicionales ({simResult.workers > 0 ? simResult.workers - 1 : 0}):</span>
                      <span className="font-semibold text-foreground">S/ {simResult.additionalWorkersCost}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-muted-foreground font-semibold">Costos Creativos / Insumos:</span>
                      <span className="font-semibold text-foreground">S/ {simResult.creativeCost}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-dashed">
                      <span className="text-muted-foreground font-medium">Cotización base acumulada:</span>
                      <span className="font-bold text-foreground">S/ {simResult.totalBaseCost}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-muted-foreground">Mantenimiento plataforma (5%):</span>
                      <span className="font-semibold text-foreground">S/ {simResult.maintenanceFee}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-muted-foreground">Ganancia intermediación (15%):</span>
                      <span className="font-semibold text-foreground">S/ {simResult.profitFee}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t-2 border-primary/20">
                      <span className="text-primary font-bold">Precio Mínimo Final (80% neto):</span>
                      <span className="font-bold text-primary text-base">S/ {simResult.minPrice}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-primary font-bold">Precio Máximo Final (+15%):</span>
                      <span className="font-bold text-primary text-base">S/ {simResult.maxPrice}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-muted-foreground">Margen de negociación:</span>
                      <span className="font-semibold text-terracotta">S/ {simResult.maxPrice - simResult.minPrice}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
