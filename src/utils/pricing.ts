// Configuración de constantes para el cálculo de cotizaciones
export const WHATSAPP_PHONE_NUMBER = "0000000000"; // Cambiar por el número de WhatsApp real (con código de país, sin el signo +)
export const ADMIN_PASSWORD = "secreto"; // Clave de acceso para el panel administrativo secreto

export const BASE_HOURLY_RATE = 25; // Tarifa base por hora de servicio (en la moneda de tu preferencia, ej: USD o local)

export const COMMISSION_MAINTENANCE = 0.05; // 5% Comisión de mantenimiento
export const COMMISSION_INTERMEDIARY = 0.15; // 15% Comisión de intermediación
export const NEGOTIABLE_MARGIN = 0.15; // Rango negociable (15% adicional para el valor máximo)
export const GUESTS_PER_WORKER = 7; // Cada 7 personas se requiere 1 trabajadora

// Multiplicadores según tipo de evento
export const EVENT_MULTIPLIERS: Record<string, number> = {
  "Boda íntima": 1.30,
  "Bautizo / Comunión": 1.15,
  "Cumpleaños": 1.00,
  "Baby Shower": 1.10,
  "Fiesta / Cena en casa": 1.20,
  "Otro": 1.15
};

// Obtiene el número de trabajadoras necesarias según los invitados
export const getWorkersNeeded = (guests: number | string): number => {
  const count = typeof guests === "string" ? parseInt(guests, 10) || 0 : guests;
  return Math.max(1, Math.ceil(count / GUESTS_PER_WORKER));
};

interface PricingRange {
  min: number;
  max: number;
  workers: number;
}

/**
 * Calcula el rango de cotización estimado para un evento.
 * Formula:
 * - Trabajadoras = Math.ceil(Invitados / 7)
 * - Base = (TarifaBase * Horas * Trabajadoras) * MultiplicadorEvento
 * - Minimo = Base * (1 + ComisionMantenimiento + ComisionIntermediacion)
 * - Maximo = Minimo * (1 + MargenNegociable)
 */
export const calculateEstimateRange = (
  eventType: string,
  guestCount: number | string,
  hours: number
): PricingRange => {
  const eventMultiplier = EVENT_MULTIPLIERS[eventType] || 1.10;
  const workers = getWorkersNeeded(guestCount);
  
  // Costo del primer trabajador (con el multiplicador de dificultad del evento)
  const firstWorkerCost = BASE_HOURLY_RATE * hours * eventMultiplier;
  
  // Costo de trabajadores adicionales (tarifa base directa por horas)
  const additionalWorkersCost = BASE_HOURLY_RATE * hours * (workers - 1);
  
  // Cotización base acumulada ("toda la cotizacion anterior")
  const totalBaseCost = firstWorkerCost + additionalWorkersCost;
  
  // Los porcentajes de mantenimiento (5%) e intermediación (15%) son del precio final
  // Precio_Final = totalBaseCost / (1 - 0.05 - 0.15) = totalBaseCost / 0.80
  const totalCommissionDivisor = 1 - (COMMISSION_MAINTENANCE + COMMISSION_INTERMEDIARY);
  const minPrice = totalBaseCost / totalCommissionDivisor;
  
  // Rango negociable (15% adicional para el valor máximo)
  const maxPrice = minPrice * (1 + NEGOTIABLE_MARGIN);
  
  return {
    min: Math.round(minPrice),
    max: Math.round(maxPrice),
    workers
  };
};
