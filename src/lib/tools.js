const round = (value, digits = 2) => Number.isFinite(value) ? Number(value.toFixed(digits)) : 0
export const toNumber = value => {
  const parsed = Number.parseFloat(String(value ?? '').replace(',', '.'))
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}

// Label grades express phosphorus and potassium as oxides; these factors give the elemental share.
export const P2O5_TO_P = 0.4364
export const K2O_TO_K = 0.8301

// Concentration delivered to the plant, in mg/L (ppm), for a fertilizer grade N-P2O5-K2O.
// grams are dissolved into liters of solution; a 1:ratio injector dilutes that solution ratio times.
export function ppmFromDose({ grams, liters, n, p2o5, k2o, ratio = 1 }) {
  const g = toNumber(grams), l = toNumber(liters), r = toNumber(ratio) || 1
  const product = l > 0 ? g * 1000 / l / r : 0
  return {
    product: round(product, 1),
    n: round(product * toNumber(n) / 100, 1),
    p: round(product * toNumber(p2o5) / 100 * P2O5_TO_P, 1),
    k: round(product * toNumber(k2o) / 100 * K2O_TO_K, 1),
    p2o5: round(product * toNumber(p2o5) / 100, 1),
    k2o: round(product * toNumber(k2o) / 100, 1),
  }
}

// Grams of fertilizer to dissolve in liters so the delivered solution reaches targetPpm of one nutrient.
export function doseForTarget({ targetPpm, nutrient = 'n', liters, n, p2o5, k2o, ratio = 1 }) {
  const share = { n: toNumber(n) / 100, p: toNumber(p2o5) / 100 * P2O5_TO_P, k: toNumber(k2o) / 100 * K2O_TO_K }[nutrient]
  const l = toNumber(liters), r = toNumber(ratio) || 1
  const grams = share > 0 ? toNumber(targetPpm) * l * r / share / 1000 : 0
  return { grams: round(grams, 1), ...ppmFromDose({ grams, liters: l, n, p2o5, k2o, ratio: r }) }
}

export const EC_SCALES = [500, 640, 700]
const EC_UNITS = { mScm: 1, uScm: 0.001, dSm: 1, cf: 0.1 }

// Returns EC in mS/cm for any supported unit.
export const ecToMs = (value, unit = 'mScm') => toNumber(value) * (EC_UNITS[unit] ?? 1)
export function convertEc(value, unit = 'mScm') {
  const ms = ecToMs(value, unit)
  return { mScm: round(ms, 3), uScm: round(ms * 1000, 0), cf: round(ms * 10, 1), ppm: Object.fromEntries(EC_SCALES.map(scale => [scale, round(ms * scale, 0)])) }
}
export const ppmToEc = (ppm, scale = 500) => round(toNumber(ppm) / (toNumber(scale) || 500), 3)

// Drip irrigation: spacing in meters, emitter flow in L/h, duration in minutes, area in hectares.
export function dripIrrigation({ flow, emitterSpacing, lateralSpacing, minutes, area, targetMm }) {
  const q = toNumber(flow), es = toNumber(emitterSpacing), ls = toNumber(lateralSpacing)
  const hours = toNumber(minutes) / 60, ha = toNumber(area), depth = toNumber(targetMm)
  const cell = es * ls
  const emittersPerHa = cell > 0 ? 10000 / cell : 0
  const rate = cell > 0 ? q / cell : 0 // L/h per m² equals mm/h
  const volumePerHa = rate * hours * 10 // 1 mm over 1 ha = 10 m³
  return {
    emittersPerHa: round(emittersPerHa, 0),
    rate: round(rate, 2),
    depth: round(rate * hours, 2),
    volumePerHa: round(volumePerHa, 2),
    volumeTotal: round(volumePerHa * ha, 2),
    systemFlow: round(emittersPerHa * ha * q / 1000, 2),
    minutesForTarget: rate > 0 && depth > 0 ? round(depth / rate * 60, 0) : 0,
  }
}
