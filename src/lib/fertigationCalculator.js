const round = value => Number.isFinite(value) ? Number(value.toFixed(2)) : 0

export const fertilizerFields = [
  { key: 'mkp', en: 'MKP', fr: 'MKP', es: 'MKP', group: 'potassium' },
  { key: 'nk', en: 'Potassium nitrate', fr: 'Nitrate de potassium', es: 'Nitrato de potasio', group: 'potassium' },
  { key: 'sp', en: 'Potassium sulfate', fr: 'Sulfate de potassium', es: 'Sulfato de potasio', group: 'potassium' },
  { key: 'clk', en: 'Potassium chloride', fr: 'Chlorure de potassium', es: 'Cloruro de potasio', group: 'potassium' },
  { key: 'nca', en: 'Calcium nitrate', fr: 'Nitrate de calcium', es: 'Nitrato de calcio', group: 'nitrogen' },
  { key: 'ammon', en: 'Ammonium nitrate', fr: 'Ammonitrate', es: 'Nitrato de amonio', group: 'nitrogen' },
  { key: 'uree', en: 'Urea', fr: 'Urée', es: 'Urea', group: 'nitrogen' },
  { key: 'sulamo', en: 'Ammonium sulfate', fr: 'Sulfate d’ammonium', es: 'Sulfato de amonio', group: 'nitrogen' },
  { key: 'an', en: 'Nitric acid', fr: 'Acide nitrique', es: 'Ácido nítrico', group: 'phosphate' },
  { key: 'aph', en: 'Phosphoric acid', fr: 'Acide phosphorique', es: 'Ácido fosfórico', group: 'phosphate' },
  { key: 'map', en: 'MAP', fr: 'MAP', es: 'MAP', group: 'phosphate' },
  { key: 'asul', en: 'Sulfuric acid', fr: 'Acide sulfurique', es: 'Ácido sulfúrico', group: 'phosphate' },
  { key: 'nmgo', en: 'Magnesium nitrate', fr: 'Nitrate de magnésium', es: 'Nitrato de magnesio', group: 'magnesium' },
  { key: 'smgo', en: 'Magnesium sulfate', fr: 'Sulfate de magnésium', es: 'Sulfato de magnesio', group: 'magnesium' },
]

// Nutrient content (% by mass) and equivalent weight (g) behind calculateFertigation, for display.
export const fertilizerComposition = {
  mkp: { p2o5: 52, k2o: 34, eq: 136, tank: 'B' }, nk: { n: 13, k2o: 46, eq: 101, tank: 'A/B' },
  sp: { k2o: 50, eq: 87, tank: 'B' }, clk: { k2o: 60, eq: 75, tank: 'B' },
  nca: { n: 15.5, cao: 26.5, eq: 82, tank: 'A' }, ammon: { n: 33.5, eq: 80, tank: 'A/B' },
  uree: { n: 46, eq: 58, tank: 'A/B' }, sulamo: { n: 21, eq: 66, tank: 'B' },
  an: { n: 14, eq: 63, tank: 'C' }, aph: { p2o5: 54, eq: 98, tank: 'B' },
  map: { n: 12, p2o5: 61, eq: 115, tank: 'B' }, asul: { eq: 47, tank: 'B' },
  nmgo: { n: 11, mgo: 16, eq: 128, tank: 'A/B' }, smgo: { mgo: 16, eq: 123.2, tank: 'B' },
}

export const emptyCalculatorInputs = Object.fromEntries([
  ...fertilizerFields.map(({ key }) => [key, '']),
  ['waterEc', ''], ['area', ''], ['irrigationVolume', ''], ['stockVolume', ''], ['tankVolume', '1000'], ['tankVolumeA', ''], ['tankVolumeB', ''], ['tankVolumeC', ''],
])

export function parseCalculatorInputs(values) {
  return Object.fromEntries(Object.entries(values).map(([key, value]) => {
    const parsed = Number.parseFloat(String(value).replace(',', '.'))
    return [key, Number.isFinite(parsed) && parsed >= 0 ? parsed : 0]
  }))
}

export function calculateFertigation(raw) {
  const v = parseCalculatorInputs(raw)
  const { mkp, nk, sp, nca, an, aph, ammon, map, uree, asul, nmgo, sulamo, clk, smgo } = v
  const sf = v.irrigationVolume
  const area = v.area
  const stockVolume = v.stockVolume
  const rawEquivalents = {
    nk: nk / sf / 101 * 1000, sp: sp / sf / 87 * 1000, nca: nca / sf / 82 * 1000,
    an: an / sf / 63 * 1000, aph: aph / sf / 98 * 1000, ammon: ammon / sf / 80 * 1000,
    map: map / sf / 115 * 1000, clk: clk / sf / 75 * 1000, smgo: smgo / sf / 123.2 * 1000,
    sulamo: sulamo / sf / 66 * 1000, uree: uree / sf / 58 * 1000, nmgo: nmgo / sf / 128 * 1000,
    mkp: mkp / sf / 136 * 1000, asul: asul / sf / 47 * 1000,
  }
  const e = Object.fromEntries(Object.entries(rawEquivalents).map(([key, value]) => [key, Number.isFinite(value) ? value : 0]))
  const totalForSolution = nk + sp + nca + an + aph + ammon + map + clk + smgo + sulamo + nmgo + mkp + asul
  const n = ammon * .335 + map * .12 + nk * .13 + nca * .155 + an * .14 + sulamo * .21 + uree * .46 + nmgo * .11
  const p = map * .61 + aph * .54 + mkp * .52
  const k2o = nk * .46 + sp * .5 + clk * .60 + mkp * .34
  const cao = nca * .265
  const mgo = smgo * .16 + nmgo * .16
  const safeRatio = (value, denominator) => denominator > 0 ? value / denominator : 0
  const perArea = value => area > 0 ? value / area : 0
  const nitrateN = ammon * .1675 + nk * .13 + nca * .155 + an * .14 + nmgo * .11
  const ammoniumN = map * .12 + ammon * .1675 + sulamo * .21 + uree * .46
  const distribution = distributeTanks(v)

  return {
    inputs: v,
    ions: {
      no3: round(e.nk + e.nca + e.an + e.ammon + e.nmgo),
      nh4: round(e.ammon + e.map + e.sulamo),
      h2po4: round(e.aph + e.map + e.mkp),
      k: round(e.nk + e.sp + e.clk + e.mkp),
      so4: round(e.sp + e.smgo + e.sulamo + e.asul),
      ca: round(e.nca), h: round(e.an + e.aph + e.asul), cl: round(e.clk), mg: round(e.smgo + e.nmgo),
    },
    solution: {
      fertilizerPerLiter: round(sf > 0 ? totalForSolution / sf : 0),
      estimatedEc: round(v.waterEc + (sf > 0 ? totalForSolution / sf / .85 : 0)),
      stockConcentration: round(stockVolume > 0 ? totalForSolution / stockVolume * 1000 : 0),
      totalKg: round(totalForSolution + uree),
    },
    nutrients: [
      { key: 'N', total: round(n), ratio: n > 0 ? 1 : 0, perHa: round(perArea(n)) },
      { key: 'P₂O₅', total: round(p), ratio: round(safeRatio(p, n)), perHa: round(perArea(p)) },
      { key: 'K₂O', total: round(k2o), ratio: round(safeRatio(k2o, n)), perHa: round(perArea(k2o)) },
      { key: 'CaO', total: round(cao), ratio: round(safeRatio(cao, n)), perHa: round(perArea(cao)) },
      { key: 'MgO', total: round(mgo), ratio: round(safeRatio(mgo, n)), perHa: round(perArea(mgo)) },
    ],
    nitrogen: { nitrate: round(safeRatio(nitrateN, n) * 100), ammonium: round(safeRatio(ammoniumN, n) * 100) },
    distribution,
  }
}

// Stock tanks are 1000 L each, as in the app, unless a shared tankVolume or per-tank volumes are given.
// The stock-solution volume (stockVolume) only feeds the stock concentration, never the tanks.
export function tankVolumes(v) {
  const separate = v.tankVolumeA > 0 || v.tankVolumeB > 0 || v.tankVolumeC > 0
  const shared = v.tankVolume > 0 ? v.tankVolume : 1000
  return separate
    ? { separate, A: v.tankVolumeA || 0, B: v.tankVolumeB || 0, C: v.tankVolumeC || 0 }
    : { separate, A: shared, B: shared, C: shared }
}

// Balancing targets equal concentration (g/L) in tanks A and B. With equal volumes this is the
// app's equal-mass rule: moving x makes (A + x) / VA = (B - x) / VB, so x = (B·VA - A·VB) / (VA + VB).
function distributeTanks(v) {
  const volumes = tankVolumes(v)
  const { A: va, B: vb } = volumes.separate ? volumes : { A: 1, B: 1 }
  const tankA = [{ key: 'nca', kg: v.nca, moved: false }]
  const movable = ['nk', 'ammon', 'uree', 'nmgo']
  const fixedB = ['sp', 'map', 'clk', 'smgo', 'sulamo', 'mkp', 'aph', 'asul']
  const remaining = Object.fromEntries(movable.map(key => [key, v[key]]))
  const total = items => items.reduce((sum, item) => sum + item.kg, 0)
  const totalB = () => movable.reduce((sum, key) => sum + remaining[key], 0) + fixedB.reduce((sum, key) => sum + v[key], 0)
  const gramsPerLiter = (kg, liters) => liters > 0 ? kg / liters * 1000 : 0
  let warning = ''
  if (totalB() === 0) warning = 'empty-b'
  else if (!(va > 0 && vb > 0)) warning = 'no-volume'
  else if (total(tankA) * vb > totalB() * va) warning = 'a-heavier'
  else movable.forEach(key => {
    const needed = (totalB() * va - total(tankA) * vb) / (va + vb)
    if (needed > .001 && remaining[key] > .001) {
      const kg = Math.min(needed, remaining[key])
      remaining[key] -= kg
      tankA.push({ key, kg, moved: true })
    }
  })
  const clean = items => items.filter(item => item.kg > .0001).map(item => ({ ...item, kg: round(item.kg) }))
  const a = clean(tankA)
  const b = clean([...movable.map(key => ({ key, kg: remaining[key], moved: false })), ...fixedB.map(key => ({ key, kg: v[key], moved: false }))])
  const c = clean([{ key: 'an', kg: v.an, moved: false }])
  const totalA = round(total(a)), totalBFinal = round(total(b)), totalC = round(total(c))
  const tank = (id, items, kg) => ({ id, items, total: kg, volume: volumes[id], concentration: round(gramsPerLiter(kg, volumes[id])) })
  const tanks = [tank('A', a, totalA), tank('B', b, totalBFinal), tank('C', c, totalC)]
  // Shared volume: compare masses (app behaviour). Separate volumes: compare concentrations.
  const [left, right] = volumes.separate ? [tanks[0].concentration, tanks[1].concentration] : [totalA, totalBFinal]
  const difference = round(Math.abs(left - right))
  const differencePercent = right > 0 ? round(difference / right * 100) : 0
  if (!warning && differencePercent > 5) warning = 'outside-tolerance'
  // Equal concentrations only empty together when each injector draws in proportion to its tank volume.
  const smallest = Math.min(...tanks.filter(t => t.total > 0 && t.volume > 0).map(t => t.volume))
  const injection = Object.fromEntries(tanks.map(t => [t.id, t.total > 0 && Number.isFinite(smallest) ? round(t.volume / smallest) : 0]))
  return { tanks, separateVolumes: volumes.separate, difference, differenceUnit: volumes.separate ? 'g/L' : 'kg', differencePercent, injection, balanced: !warning, warning }
}

