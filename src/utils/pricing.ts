// Configuración de constantes para el cálculo de cotizaciones
export const WHATSAPP_PHONE_NUMBER = "0000000000"; // Cambiar por el número de WhatsApp real (con código de país, sin el signo +)
export const ADMIN_PASSWORD = "secreto"; // Clave de acceso para el panel administrativo secreto

export const BASE_HOURLY_RATE = 25; // Tarifa base por hora de servicio (en la moneda de tu preferencia, ej: USD o local)

export const COMMISSION_MAINTENANCE = 0.05; // 5% Comisión de mantenimiento
export const COMMISSION_INTERMEDIARY = 0.15; // 15% Comisión de intermediación
export const NEGOTIABLE_MARGIN = 0.15; // Rango negociable (15% adicional para el valor máximo)
export const GUESTS_PER_WORKER = 15; // Cada 15 personas se requiere 1 colaboradora (más realista)

// Tarifas para servicios creativos y adicionales
export const RATE_CANDY_BAR_PER_GUEST = 15; // S/ 15 por invitado
export const RATE_DECORATION_BASE = 400; // S/ 400 tarifa base
export const RATE_SOUVENIRS_PER_GUEST = 8; // S/ 8 por invitado
export const CLEANING_KIT_COST = 40; // S/ 40 costo opcional de insumos de limpieza

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
  operationalMin: number;
  creativeMin: number;
}

/**
 * Calcula el rango de cotización estimado para un evento.
 */
export const calculateEstimateRange = (
  eventType: string,
  guestCount: number | string,
  hours: number,
  selectedServices: string[] = []
): PricingRange => {
  const eventMultiplier = EVENT_MULTIPLIERS[eventType] || 1.10;
  const guests = typeof guestCount === "string" ? parseInt(guestCount, 10) || 0 : guestCount;
  
  // Identificar qué tipos de servicios se seleccionaron
  const hasAtender = selectedServices.includes("Servir y atender invitados");
  const hasLimpieza = selectedServices.includes("Tener la casa limpia al terminar");
  const hasMontaje = selectedServices.includes("Montaje de mesas y sillas");
  const hasCleaningKit = selectedServices.includes("Kit de insumos de limpieza profesional (+ S/ 40)");
  
  // Es operativo si tiene servicios operativos O si no se pasó ningún servicio (para compatibilidad en otras pantallas)
  const hasOperational = hasAtender || hasLimpieza || hasMontaje || selectedServices.length === 0;

  const hasCandyBar = selectedServices.includes("Candy bar y repostería");
  const hasDecor = selectedServices.includes("Decoración temática");
  const hasSouvenirs = selectedServices.includes("Artesanías y recordatorios");

  let totalBaseCost = 0;
  let workers = 0;

  // Solo se calcula costo de personal si hay servicios operativos
  if (hasOperational) {
    workers = Math.max(1, Math.ceil(guests / GUESTS_PER_WORKER));
    const firstWorkerCost = BASE_HOURLY_RATE * hours * eventMultiplier;
    const additionalWorkersCost = BASE_HOURLY_RATE * hours * (workers - 1);
    totalBaseCost = firstWorkerCost + additionalWorkersCost;
  }

  // Costo de servicios creativos y adicionales (tarifas fijas / por invitado)
  let creativeCost = 0;
  if (hasCandyBar) {
    creativeCost += RATE_CANDY_BAR_PER_GUEST * guests;
  }
  if (hasDecor) {
    creativeCost += RATE_DECORATION_BASE;
  }
  if (hasSouvenirs) {
    creativeCost += RATE_SOUVENIRS_PER_GUEST * guests;
  }
  if (hasCleaningKit) {
    creativeCost += CLEANING_KIT_COST;
  }

  // Costo total acumulado
  const totalAccumulatedCost = totalBaseCost + creativeCost;
  
  // Los porcentajes de mantenimiento (5%) e intermediación (15%) son del precio final
  const totalCommissionDivisor = 1 - (COMMISSION_MAINTENANCE + COMMISSION_INTERMEDIARY);
  const minPrice = totalAccumulatedCost / totalCommissionDivisor;
  
  // Rango negociable (15% adicional para el valor máximo)
  const maxPrice = minPrice * (1 + NEGOTIABLE_MARGIN);
  
  return {
    min: Math.round(minPrice),
    max: Math.round(maxPrice),
    workers: hasOperational ? workers : 0,
    operationalMin: Math.round(totalBaseCost / totalCommissionDivisor),
    creativeMin: Math.round(creativeCost / totalCommissionDivisor)
  };
};
