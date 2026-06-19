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
  getWorkersNeeded
} from "../utils/pricing";

export const Admin: React.FC = () => {
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Simulador state
  const [simEvent, setSimEvent] = useState("Cumpleaños");
  const [simGuests, setSimGuests] = useState("30");
  const [simHours, setSimHours] = useState("4");
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

    const workers = getWorkersNeeded(guestsNum);
    const eventMultiplier = EVENT_MULTIPLIERS[simEvent] || 1.10;

    // Costo primer colaborador
    const firstWorkerCost = BASE_HOURLY_RATE * hoursNum * eventMultiplier;
    // Costo adicionales
    const additionalWorkersCost = BASE_HOURLY_RATE * hoursNum * (workers - 1);
    // Costo base total
    const totalBaseCost = firstWorkerCost + additionalWorkersCost;

    // Divisor para que comisiones sean del precio final
    const divisor = 1 - (COMMISSION_MAINTENANCE + COMMISSION_INTERMEDIARY);
    const minPrice = totalBaseCost / divisor;
    const maxPrice = minPrice * (1 + NEGOTIABLE_MARGIN);

    // Desglose de comisiones sobre el precio final (mínimo)
    const maintenanceFee = minPrice * COMMISSION_MAINTENANCE;
    const profitFee = minPrice * COMMISSION_INTERMEDIARY;

    setSimResult({
      workers,
      eventMultiplier,
      firstWorkerCost,
      additionalWorkersCost,
      totalBaseCost,
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
            <dd className="mt-1 text-xs text-muted-foreground">Profit neto para 4 Heartbeats</dd>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Proporción de Personal</dt>
            <dd className="mt-2 text-3xl font-bold text-primary font-display">1 / {GUESTS_PER_WORKER}</dd>
            <dd className="mt-1 text-xs text-muted-foreground">Una colaboradora por cada 7 invitados</dd>
          </div>
        </section>

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
                      <span className="text-muted-foreground">Primer colaborador (x{simResult.eventMultiplier.toFixed(2)}):</span>
                      <span className="font-semibold text-foreground">S/ {simResult.firstWorkerCost}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-muted-foreground">Colaboradores adicionales ({simResult.workers - 1}):</span>
                      <span className="font-semibold text-foreground">S/ {simResult.additionalWorkersCost}</span>
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
