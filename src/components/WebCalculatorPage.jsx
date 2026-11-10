import { useRef, useState } from 'react'
import { Link, T } from '../lib/i18n'
import Icon from './Icon'
import { calculateFertigation, emptyCalculatorInputs, fertilizerComposition, fertilizerFields } from '../lib/fertigationCalculator'
import { FaqSection, RelatedTools } from './ToolPages'

const groups = [
  { key: 'potassium', en: 'Potassium fertilizers', fr: 'Engrais potassiques', es: 'Fertilizantes potásicos' },
  { key: 'nitrogen', en: 'Nitrogen & calcium', fr: 'Azote et calcium', es: 'Nitrógeno y calcio' },
  { key: 'phosphate', en: 'Acids & phosphate', fr: 'Acides et phosphate', es: 'Ácidos y fosfato' },
  { key: 'magnesium', en: 'Magnesium fertilizers', fr: 'Engrais magnésiens', es: 'Fertilizantes magnésicos' },
]

const demo = {
  mkp:'12', nk:'24', sp:'10', clk:'0', nca:'22', ammon:'5', uree:'0', sulamo:'4',
  an:'3', aph:'4', map:'6', asul:'0', nmgo:'3', smgo:'8',
  waterEc:'0.55', area:'2', irrigationVolume:'100', stockVolume:'1000', tankVolume:'1000', tankVolumeA:'', tankVolumeB:'', tankVolumeC:'',
}

// Built from the demo inputs with the same engine, so the published example always matches the tool.
const example = calculateFertigation(demo)
const ionLabels = { no3:'NO₃⁻', nh4:'NH₄⁺', h2po4:'H₂PO₄⁻', k:'K⁺', so4:'SO₄²⁻', ca:'Ca²⁺', h:'H⁺', cl:'Cl⁻', mg:'Mg²⁺' }
const fieldByKey = Object.fromEntries(fertilizerFields.map(field => [field.key, field]))

function NumberField({ name, value, onChange, children, suffix = 'kg', required = false, optional = false }) {
  return <label className="ac-calc-field">
    <span>{children}{optional && <em className="ac-calc-optional"><T en="optional" fr="facultatif" es="opcional"/></em>}</span>
    <span className="ac-calc-input"><input name={name} value={value} onChange={onChange} inputMode="decimal" type="text" pattern="[0-9]*[.,]?[0-9]*" placeholder="0" aria-required={required}/><small>{suffix}</small></span>
  </label>
}

function ResultTable({ title, headers, rows }) {
  return <section className="ac-result-card">
    <h3>{title}</h3>
    <div className="ac-result-scroll"><table><thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead>
      <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
    </table></div>
  </section>
}

const fmt = (value, digits = 2) => Number(value || 0).toFixed(digits)
const DASH = '—'

// Same rule as the app: a missing optional input shows a dash and says what it would add.
function MissingNote({ field, children }) {
  const focus = () => {
    const input = document.querySelector(`input[name="${field}"]`)
    input?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => input?.focus({ preventScroll: true }), 450)
  }
  return <p className="ac-calc-note"><span>{children}</span><button type="button" onClick={focus}><T en="Fill in" fr="Renseigner" es="Completar"/></button></p>
}
const tankOf = key => key === 'nca' ? 'A' : key === 'an' ? 'C' : 'B'
const cationKeys = ['nh4', 'k', 'ca', 'mg', 'h']
const anionKeys = ['no3', 'h2po4', 'so4', 'cl']

function TankVolumes({ distribution }) {
  const [a, b, c] = distribution.tanks
  if (!distribution.separateVolumes) return <T en={`For ${fmt(a.volume, 0)} L stock tanks`} fr={`Pour des bacs mères de ${fmt(a.volume, 0)} L`} es={`Para tanques de solución madre de ${fmt(a.volume, 0)} L`}/>
  return <T en={`Tank volumes: A ${fmt(a.volume, 0)} L · B ${fmt(b.volume, 0)} L · C ${fmt(c.volume, 0)} L`} fr={`Volumes des bacs : A ${fmt(a.volume, 0)} L · B ${fmt(b.volume, 0)} L · C ${fmt(c.volume, 0)} L`} es={`Volumen de los tanques: A ${fmt(a.volume, 0)} L · B ${fmt(b.volume, 0)} L · C ${fmt(c.volume, 0)} L`}/>
}

function InjectionNote({ distribution }) {
  if (!distribution.separateVolumes) return null
  const ratio = distribution.tanks.filter(tank => distribution.injection[tank.id] > 0).map(tank => `${tank.id} ${distribution.injection[tank.id]}`).join(' : ')
  return <span><T en={`Set injector draw rates to ${ratio} so every tank empties at the same time.`} fr={`Réglez les débits d’injection à ${ratio} pour que tous les bacs se vident en même temps.`} es={`Ajuste los caudales de inyección a ${ratio} para que todos los tanques se vacíen a la vez.`}/></span>
}

const differenceText = distribution => `${fmt(distribution.difference)} ${distribution.differenceUnit} (${fmt(distribution.differencePercent, 1)}%)`

function PrintReport({ result, generatedAt }) {
  const { inputs, ions, solution, nutrients, nitrogen, distribution } = result
  const used = fertilizerFields.filter(field => inputs[field.key] > 0)
  const area = inputs.area
  const cations = cationKeys.reduce((sum, key) => sum + ions[key], 0)
  const anions = anionKeys.reduce((sum, key) => sum + ions[key], 0)

  return <article className="ac-print-report" aria-hidden="true">
    <header className="pr-head">
      <div className="pr-brand"><img src="/logo-96.png" alt="" width="34" height="34"/><div><strong>AgroCalc <span>PRO</span></strong><small>agrocalcpro.soufyanedev.com</small></div></div>
      <div className="pr-meta"><span><T en="Formulation report" fr="Rapport de formulation" es="Informe de formulación"/></span><strong><T en={generatedAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} fr={generatedAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} es={generatedAt.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}/></strong></div>
    </header>

    <div className="pr-title">
      <h2><T en="Fertigation analysis" fr="Analyse de fertigation" es="Análisis de fertirrigación"/></h2>
      <dl className="pr-params">
        <div><dt><T en="Cultivated area" fr="Superficie" es="Superficie cultivada"/></dt><dd>{area > 0 ? <>{fmt(area)} <small>ha</small></> : DASH}</dd></div>
        <div><dt><T en="Irrigation volume" fr="Volume d’irrigation" es="Volumen de riego"/></dt><dd>{fmt(inputs.irrigationVolume)} <small>m³</small></dd></div>
        <div><dt><T en="Stock solution" fr="Solution mère" es="Solución madre"/></dt><dd>{inputs.stockVolume > 0 ? <>{fmt(inputs.stockVolume, 0)} <small>L</small></> : DASH}</dd></div>
        <div><dt><T en="Tanks A / B / C" fr="Bacs A / B / C" es="Tanques A / B / C"/></dt><dd>{distribution.tanks.map(tank => fmt(tank.volume, 0)).join(' / ')} <small>L</small></dd></div>
        <div><dt><T en="Source-water EC" fr="EC de l’eau" es="CE del agua"/></dt><dd>{inputs.waterEc > 0 ? <>{fmt(inputs.waterEc)} <small>mS/cm</small></> : DASH}</dd></div>
      </dl>
    </div>

    <section className="pr-kpis">
      <div className="is-main"><span>{inputs.waterEc > 0 ? <T en="Estimated EC" fr="EC estimée" es="CE estimada"/> : <T en="EC from fertilizers" fr="EC des engrais" es="CE de los fertilizantes"/>}</span><strong>{fmt(solution.estimatedEc)}</strong><small>mS/cm</small></div>
      <div><span><T en="Fertilizer / water" fr="Engrais / eau" es="Fertilizante / agua"/></span><strong>{fmt(solution.fertilizerPerLiter)}</strong><small>kg/m³</small></div>
      <div><span><T en="Stock concentration" fr="Concentration mère" es="Concentración madre"/></span><strong>{inputs.stockVolume > 0 ? fmt(solution.stockConcentration) : DASH}</strong><small>g/L</small></div>
      <div><span><T en="Total fertilizer" fr="Total engrais" es="Total de fertilizante"/></span><strong>{fmt(solution.totalKg)}</strong><small>kg</small></div>
    </section>

    <section className="pr-section">
      <h3><span>01</span><T en="Fertilizers applied" fr="Engrais appliqués" es="Fertilizantes aplicados"/></h3>
      {used.length ? <table className="pr-table">
        <thead><tr><th><T en="Fertilizer" fr="Engrais" es="Fertilizante"/></th><th><T en="Tank" fr="Bac" es="Tanque"/></th><th>kg</th><th>kg/ha</th><th><T en="Share" fr="Part" es="Proporción"/></th></tr></thead>
        <tbody>{used.map(field => <tr key={field.key}>
          <td><T en={field.en} fr={field.fr} es={field.es}/></td><td><span className={'pr-tag pr-tag-' + tankOf(field.key)}>{tankOf(field.key)}</span></td>
          <td>{fmt(inputs[field.key])}</td><td>{area > 0 ? fmt(inputs[field.key] / area) : DASH}</td><td>{fmt(solution.totalKg > 0 ? inputs[field.key] / solution.totalKg * 100 : 0, 1)}%</td>
        </tr>)}</tbody>
        <tfoot><tr><td><T en="Total" fr="Total" es="Total"/></td><td/><td>{fmt(solution.totalKg)}</td><td>{area > 0 ? fmt(solution.totalKg / area) : DASH}</td><td>100%</td></tr></tfoot>
      </table> : <p className="pr-empty"><T en="No fertilizer quantities were entered." fr="Aucune quantité d’engrais n’a été saisie." es="No se ha introducido ninguna cantidad de fertilizante."/></p>}
    </section>

    <div className="pr-columns">
      <section className="pr-section">
        <h3><span>02</span><T en="Ionic balance" fr="Balance ionique" es="Equilibrio iónico"/></h3>
        <table className="pr-table pr-ions">
          <thead><tr><th><T en="Cations" fr="Cations" es="Cationes"/></th><th>meq/L</th><th><T en="Anions" fr="Anions" es="Aniones"/></th><th>meq/L</th></tr></thead>
          <tbody>{cationKeys.map((cation, index) => { const anion = anionKeys[index]; return <tr key={cation}>
            <td>{ionLabels[cation]}</td><td>{fmt(ions[cation])}</td><td>{anion && ionLabels[anion]}</td><td>{anion && fmt(ions[anion])}</td>
          </tr> })}</tbody>
          <tfoot><tr><td>Σ</td><td>{fmt(cations)}</td><td>Σ</td><td>{fmt(anions)}</td></tr></tfoot>
        </table>
      </section>
      <section className="pr-section">
        <h3><span>03</span><T en="Fertilizer units" fr="Unités fertilisantes" es="Unidades fertilizantes"/></h3>
        <table className="pr-table">
          <thead><tr><th><T en="Element" fr="Élément" es="Elemento"/></th><th>kg</th><th><T en="Ratio / N" fr="Ratio / N" es="Relación / N"/></th><th>kg/ha</th></tr></thead>
          <tbody>{nutrients.map(item => <tr key={item.key}><td>{item.key}</td><td>{fmt(item.total)}</td><td>{fmt(item.ratio)}</td><td>{area > 0 ? fmt(item.perHa) : DASH}</td></tr>)}</tbody>
        </table>
        <div className="pr-nitrogen">
          <div className="pr-nitrogen-label"><span><T en="Nitrogen forms" fr="Formes d’azote" es="Formas de nitrógeno"/></span><span>NO₃–N {fmt(nitrogen.nitrate, 1)}% · NH₄–N {fmt(nitrogen.ammonium, 1)}%</span></div>
          <div className="pr-bar"><i style={{ width: Math.min(100, nitrogen.nitrate) + '%' }}/><b style={{ width: Math.min(100, nitrogen.ammonium) + '%' }}/></div>
        </div>
      </section>
    </div>

    <section className="pr-section">
      <h3><span>04</span><T en="A/B/C tank distribution" fr="Répartition des bacs A/B/C" es="Reparto en tanques A/B/C"/><small><TankVolumes distribution={distribution}/></small></h3>
      <div className="pr-tanks">{distribution.tanks.map(tank => <div className={'pr-tank pr-tank-' + tank.id} key={tank.id}>
        <header><span><T en="Tank" fr="Bac" es="Tanque"/> {tank.id}</span><strong>{fmt(tank.total)} kg</strong></header>
        {tank.items.length ? <ul>{tank.items.map(item => <li key={item.key}><span><T en={fieldByKey[item.key]?.en} fr={fieldByKey[item.key]?.fr} es={fieldByKey[item.key]?.es}/>{item.moved && <em><T en=" · balanced" fr=" · équilibré" es=" · equilibrado"/></em>}</span><b>{fmt(item.kg)}</b></li>)}</ul> : <p><T en="No fertilizer assigned" fr="Aucun engrais attribué" es="Ningún fertilizante asignado"/></p>}
        <footer>{fmt(tank.concentration)} g/L</footer>
      </div>)}</div>
      <p className={'pr-status ' + (distribution.balanced ? 'is-good' : 'is-warning')}>
        <strong>{distribution.balanced ? <T en="✓ A/B balance achieved" fr="✓ Équilibre A/B atteint" es="✓ Equilibrio A/B conseguido"/> : <T en="! Review the A/B balance" fr="! Vérifiez l’équilibre A/B" es="! Revise el equilibrio A/B"/>}</strong>
        <span><T en="Difference" fr="Écart" es="Diferencia"/>: {differenceText(distribution)}</span><InjectionNote distribution={distribution}/>
      </p>
    </section>

    <footer className="pr-foot">
      <p><T en="Verify the delivered solution with calibrated EC and pH meters and adapt targets to your crop, water analysis and local agronomic advice." fr="Vérifiez la solution distribuée avec des appareils EC et pH étalonnés, puis adaptez les objectifs à votre culture, à l’analyse de l’eau et aux conseils agronomiques locaux." es="Compruebe la solución aplicada con medidores de CE y pH calibrados y adapte los objetivos a su cultivo, al análisis del agua y al asesoramiento agronómico local."/></p>
      <span><T en="Generated with AgroCalc Pro" fr="Généré avec AgroCalc Pro" es="Generado con AgroCalc Pro"/></span>
    </footer>
  </article>
}

export default function WebCalculatorPage() {
  const [inputs, setInputs] = useState(emptyCalculatorInputs)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(false)
  const [separateTanks, setSeparateTanks] = useState(false)
  const resultsRef = useRef(null)

  const change = event => {
    const { name, value } = event.target
    if (value === '' || /^\d*[.,]?\d*$/.test(value)) setInputs(current => ({ ...current, [name]: value }))
  }
  const positive = value => Number(String(value).replace(',', '.')) > 0
  const calculate = event => {
    event.preventDefault()
    // Tank C only needs a volume when nitric acid is used.
    // Only the irrigation volume is required, as in the app. Tank volumes default to 1000 L;
    // when entered per tank, A and B (and C with nitric acid) need a value.
    const tanksOk = separateTanks ? positive(inputs.tankVolumeA) && positive(inputs.tankVolumeB) && (positive(inputs.tankVolumeC) || !positive(inputs.an)) : true
    if (!positive(inputs.irrigationVolume) || !tanksOk) {
      setError(true)
      return
    }
    setError(false)
    // Only the active volume mode reaches the engine, so stale values from the other mode are ignored.
    const engineInputs = separateTanks ? inputs : { ...inputs, tankVolume: positive(inputs.tankVolume) ? inputs.tankVolume : '1000', tankVolumeA: '', tankVolumeB: '', tankVolumeC: '' }
    setResult({ ...calculateFertigation(engineInputs), generatedAt: new Date() })
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
  const reset = () => { setInputs(emptyCalculatorInputs); setResult(null); setError(false); setSeparateTanks(false) }
  const loadDemo = () => { setInputs(demo); setResult(null); setError(false); setSeparateTanks(false) }
  const toggleSeparate = event => {
    const separate = !event.target.checked
    // Start the per-tank fields from the shared volume (and back), so switching never loses the number.
    setInputs(current => separate
      ? { ...current, tankVolumeA: current.tankVolumeA || current.tankVolume || '1000', tankVolumeB: current.tankVolumeB || current.tankVolume || '1000', tankVolumeC: current.tankVolumeC || current.tankVolume || '1000' }
      : { ...current, tankVolume: current.tankVolume || current.tankVolumeA || '1000' })
    setSeparateTanks(separate)
  }

  return <main className="ac-calculator-page">
    <header className="ac-calc-hero">
      <div className="ac-wrap">
        
        <h1><T en="NPK fertigation calculator" fr="Calculateur de fertigation NPK" es="Calculadora de fertirrigación NPK"/></h1>
        <p><T en="Calculate ionic balance, estimated EC, fertilizer units and A/B/C tank distribution directly in your browser." fr="Calculez la balance ionique, l’EC estimée, les unités fertilisantes et la répartition des bacs A/B/C dans votre navigateur." es="Calcule el equilibrio iónico, la CE estimada, las unidades fertilizantes y el reparto en tanques A/B/C directamente en su navegador."/></p>
        <div className="ac-calc-hero-facts"><span><strong>14</strong><T en=" fertilizers" fr=" engrais" es=" fertilizantes"/></span><span><strong>9</strong><T en=" ions" fr=" ions" es=" iones"/></span><span><strong>3</strong><T en=" tanks" fr=" bacs" es=" tanques"/></span></div>
      </div>
    </header>

    <div className="ac-wrap ac-calc-layout">
      <form className="ac-calc-form" onSubmit={calculate} noValidate>
        <div className="ac-calc-form-head">
          <div><h2><T en="Build your formulation" fr="Créez votre formule" es="Prepare su fórmula"/></h2></div>
          <button type="button" className="ac-calc-text-button" onClick={loadDemo}><T en="Load example" fr="Charger un exemple" es="Cargar un ejemplo"/></button>
        </div>
        <p className="ac-calc-help"><T en="Enter the kilograms used for one application and leave the others empty. Only the irrigation volume is required." fr="Saisissez les kilogrammes utilisés pour un apport et laissez les autres vides. Seul le volume d’irrigation est obligatoire." es="Introduzca los kilogramos usados en un riego y deje vacíos los demás. Solo el volumen de riego es obligatorio."/></p>

        {groups.map(group => <fieldset className="ac-calc-group" key={group.key}>
          <legend><T en={<>{group.en}</>} fr={<>{group.fr}</>} es={<>{group.es}</>}/></legend>
          <div className="ac-calc-fields">
            {fertilizerFields.filter(field => field.group === group.key).map(field =>
              <NumberField key={field.key} name={field.key} value={inputs[field.key]} onChange={change}><T en={<>{field.en}</>} fr={<>{field.fr}</>} es={<>{field.es}</>}/></NumberField>
            )}
          </div>
        </fieldset>)}

        <fieldset className="ac-calc-group ac-calc-system">
          <legend><T en="System parameters" fr="Paramètres du système" es="Parámetros del sistema"/></legend>
          <div className="ac-calc-fields">
            <NumberField name="irrigationVolume" value={inputs.irrigationVolume} onChange={change} suffix="m³" required><T en="Irrigation volume" fr="Volume d’irrigation" es="Volumen de riego"/></NumberField>
            <NumberField name="waterEc" value={inputs.waterEc} onChange={change} suffix="mS/cm" optional><T en="Source-water EC" fr="EC de l’eau source" es="CE del agua"/></NumberField>
            <NumberField name="area" value={inputs.area} onChange={change} suffix="ha" optional><T en="Cultivated area" fr="Superficie cultivée" es="Superficie cultivada"/></NumberField>
            <NumberField name="stockVolume" value={inputs.stockVolume} onChange={change} suffix="L" optional><T en="Stock-solution volume" fr="Volume de solution mère" es="Volumen de solución madre"/></NumberField>
          </div>
          <label className="ac-calc-toggle"><input type="checkbox" checked={!separateTanks} onChange={toggleSeparate}/><span><T en="Same volume for all three tanks" fr="Même volume pour les trois bacs" es="Mismo volumen para los tres tanques"/></span></label>
          {separateTanks ? <div className="ac-calc-fields">
            <NumberField name="tankVolumeA" value={inputs.tankVolumeA} onChange={change} suffix="L" required><T en="Tank A volume" fr="Volume du bac A" es="Volumen del tanque A"/></NumberField>
            <NumberField name="tankVolumeB" value={inputs.tankVolumeB} onChange={change} suffix="L" required><T en="Tank B volume" fr="Volume du bac B" es="Volumen del tanque B"/></NumberField>
            <NumberField name="tankVolumeC" value={inputs.tankVolumeC} onChange={change} suffix="L"><T en="Tank C volume (nitric acid)" fr="Volume du bac C (acide nitrique)" es="Volumen del tanque C (ácido nítrico)"/></NumberField>
          </div> : <div className="ac-calc-fields">
            <NumberField name="tankVolume" value={inputs.tankVolume} onChange={change} suffix="L"><T en="Volume of each tank" fr="Volume de chaque bac" es="Volumen de cada tanque"/></NumberField>
          </div>}
        </fieldset>

        {error && <p className="ac-calc-error" role="alert">{separateTanks ? <T en="Enter the irrigation volume and the volume of tanks A and B (and tank C when you use nitric acid)." fr="Saisissez le volume d’irrigation et le volume des bacs A et B (et du bac C si vous utilisez de l’acide nitrique)." es="Introduzca el volumen de riego y el volumen de los tanques A y B (y del tanque C si usa ácido nítrico)."/> : <T en="Enter the irrigation volume. It is the only required value." fr="Saisissez le volume d’irrigation. C’est la seule valeur obligatoire." es="Introduzca el volumen de riego. Es el único valor obligatorio."/>}</p>}
        <div className="ac-calc-actions">
          <button className="ac-button" type="submit"><T en="Calculate formulation" fr="Calculer la formule" es="Calcular la fórmula"/><Icon name="arrow-right"/></button>
          <button className="ac-calc-reset" type="button" onClick={reset}><T en="Reset" fr="Réinitialiser" es="Reiniciar"/></button>
        </div>
      </form>

      <aside className="ac-calc-side">
        
        <h2><T en="The Android engine, now on the web." fr="Le moteur Android, maintenant sur le Web." es="El motor de Android, ahora en la web."/></h2>
        <p><T en="This calculator uses the same conversion constants and tank-balancing sequence as AgroCalc Pro for Android." fr="Ce calculateur utilise les mêmes constantes de conversion et la même séquence d’équilibrage des bacs qu’AgroCalc Pro pour Android." es="Esta calculadora usa las mismas constantes de conversión y la misma secuencia de equilibrado de tanques que AgroCalc Pro para Android."/></p>
        <ol>
          <li><T en="Enter fertilizer quantities in kilograms." fr="Saisissez les quantités d’engrais en kilogrammes." es="Introduzca las cantidades de fertilizante en kilogramos."/></li>
          <li><T en="Add the irrigation volume. Water EC, area and stock volume are optional: each one adds results." fr="Ajoutez le volume d’irrigation. L’EC de l’eau, la superficie et la solution mère sont facultatives : chacune ajoute des résultats." es="Añada el volumen de riego. La CE del agua, la superficie y la solución madre son opcionales: cada una añade resultados."/></li>
          <li><T en="Review the analysis and save the report as PDF." fr="Vérifiez l’analyse et enregistrez le rapport en PDF." es="Revise el análisis y guarde el informe en PDF."/></li>
        </ol>
      </aside>
    </div>

    {result && <section className="ac-calc-results" ref={resultsRef}>
      <div className="ac-wrap">
        <div className="ac-calc-results-head">
          <div><h2><T en="Your fertigation analysis" fr="Votre analyse de fertigation" es="Su análisis de fertirrigación"/></h2></div>
          <button type="button" className="ac-button ac-calc-print" onClick={() => window.print()}><T en="Save / print PDF" fr="Enregistrer / imprimer PDF" es="Guardar / imprimir PDF"/><Icon name="arrow-up-right"/></button>
        </div>

        {result.solution.estimatedEc > 10 && <p className="ac-calc-warning" role="alert"><T en={`An EC of ${fmt(result.solution.estimatedEc, 1)} mS/cm is unusually high. Check the irrigation volume and the kilograms entered.`} fr={`Une EC de ${fmt(result.solution.estimatedEc, 1)} mS/cm est anormalement élevée. Vérifiez le volume d’irrigation et les kilogrammes saisis.`} es={`Una CE de ${fmt(result.solution.estimatedEc, 1)} mS/cm es anormalmente alta. Revise el volumen de riego y los kilogramos introducidos.`}/></p>}
        <div className="ac-calc-kpis">
          <article className="is-main"><span>{result.inputs.waterEc > 0 ? <T en="Estimated EC" fr="EC estimée" es="CE estimada"/> : <T en="EC from fertilizers" fr="EC des engrais" es="CE de los fertilizantes"/>}</span><strong>{fmt(result.solution.estimatedEc)}</strong><small>mS/cm</small></article>
          <article><span><T en="Fertilizer / water" fr="Engrais / eau" es="Fertilizante / agua"/></span><strong>{fmt(result.solution.fertilizerPerLiter)}</strong><small>kg/m³</small></article>
          <article><span><T en="Stock concentration" fr="Concentration mère" es="Concentración madre"/></span><strong>{result.inputs.stockVolume > 0 ? fmt(result.solution.stockConcentration) : DASH}</strong><small>g/L</small></article>
          <article><span><T en="Total fertilizer" fr="Total engrais" es="Total de fertilizante"/></span><strong>{fmt(result.solution.totalKg)}</strong><small>kg</small></article>
        </div>
        <div className="ac-calc-notes">
          {!(result.inputs.waterEc > 0) && <MissingNote field="waterEc"><T en="EC calculated without the water. Add the source-water EC to get the total EC of the solution." fr="EC calculée sans l’eau. Ajoutez l’EC de l’eau pour obtenir l’EC totale de la solution." es="CE calculada sin el agua. Añada la CE del agua para obtener la CE total de la solución."/></MissingNote>}
          {!(result.inputs.stockVolume > 0) && <MissingNote field="stockVolume"><T en="Add the stock-solution volume to get its concentration." fr="Ajoutez le volume de solution mère pour obtenir sa concentration." es="Añada el volumen de solución madre para obtener su concentración."/></MissingNote>}
          {!(result.inputs.area > 0) && <MissingNote field="area"><T en="Add the area to get the units per hectare." fr="Ajoutez la superficie pour obtenir les unités par hectare." es="Añada la superficie para obtener las unidades por hectárea."/></MissingNote>}
        </div>

        <div className="ac-results-grid">
          <ResultTable title={<T en="Ionic balance" fr="Balance ionique" es="Equilibrio iónico"/>} headers={['Ion', 'meq/L']} rows={Object.entries(result.ions).map(([key, value]) => [ionLabels[key], value.toFixed(2)])}/>
          <ResultTable title={<T en="Fertilizer units" fr="Unités fertilisantes" es="Unidades fertilizantes"/>} headers={['Element', 'kg', 'Ratio', 'kg/ha']} rows={result.nutrients.map(item => [item.key, item.total.toFixed(2), item.ratio.toFixed(2), result.inputs.area > 0 ? item.perHa.toFixed(2) : DASH])}/>
        </div>

        <div className="ac-nitrogen-strip"><div><span>NO₃–N</span><strong>{result.nitrogen.nitrate}%</strong></div><div><span>NH₄–N</span><strong>{result.nitrogen.ammonium}%</strong></div><p><T en="Nitrogen form distribution" fr="Répartition des formes d’azote" es="Reparto de las formas de nitrógeno"/></p></div>

        <section className="ac-tanks">
          <div className="ac-tanks-head"><div><h2><T en="A/B/C tank distribution" fr="Répartition des bacs A/B/C" es="Reparto en tanques A/B/C"/></h2></div><p><TankVolumes distribution={result.distribution}/></p></div>
          <div className="ac-tank-grid">{result.distribution.tanks.map(tank => <article className={'ac-tank ac-tank-' + tank.id} key={tank.id}>
            <header><span><T en="Tank" fr="Bac" es="Tanque"/> {tank.id}{result.distribution.separateVolumes && <small> · {fmt(tank.volume, 0)} L</small>}</span><strong>{tank.total.toFixed(2)} kg</strong></header>
            {tank.items.length ? <ul>{tank.items.map(item => <li key={item.key}><span><T en={<>{fieldByKey[item.key]?.en}</>} fr={<>{fieldByKey[item.key]?.fr}</>} es={<>{fieldByKey[item.key]?.es}</>}/>{item.moved && <small><T en=" balanced" fr=" équilibré" es=" equilibrado"/></small>}</span><b>{item.kg.toFixed(2)} kg</b></li>)}</ul> : <p><T en="No fertilizer assigned" fr="Aucun engrais attribué" es="Ningún fertilizante asignado"/></p>}
            <footer>{fmt(tank.concentration)} g/L</footer>
          </article>)}</div>
          <p className={'ac-balance-status ' + (result.distribution.balanced ? 'is-good' : 'is-warning')}>
            <strong>{result.distribution.balanced ? <T en="A/B balance achieved" fr="Équilibre A/B atteint" es="Equilibrio A/B conseguido"/> : <T en="Review the A/B balance" fr="Vérifiez l’équilibre A/B" es="Revise el equilibrio A/B"/>}</strong>
            <span><T en="Difference" fr="Écart" es="Diferencia"/>: {differenceText(result.distribution)}</span><InjectionNote distribution={result.distribution}/>
          </p>
        </section>

        <div className="ac-report-note"><p><T en="Verify the delivered solution with calibrated EC and pH meters and adapt targets to your crop, water analysis and local agronomic advice." fr="Vérifiez la solution distribuée avec des appareils EC et pH étalonnés, puis adaptez les objectifs à votre culture, à l’analyse de l’eau et aux conseils agronomiques locaux." es="Compruebe la solución aplicada con medidores de CE y pH calibrados y adapte los objetivos a su cultivo, al análisis del agua y al asesoramiento agronómico local."/></p></div>
      </div>
    </section>}
    {result && <PrintReport result={result} generatedAt={result.generatedAt}/>}

    <section className="ac-calc-seo">
      <div className="ac-wrap">
        <h2><T en="How the NPK fertigation calculator works" fr="Comment fonctionne le calculateur de fertigation NPK" es="Cómo funciona la calculadora de fertirrigación NPK"/></h2>
        <div>
          <p><T en="AgroCalc converts fertilizer masses into ionic concentrations in meq/L for nitrate, ammonium, phosphate, potassium, sulfate, calcium, hydrogen, chloride and magnesium. It also calculates N, P₂O₅, K₂O, CaO and MgO totals and doses per hectare." fr="AgroCalc convertit les masses d’engrais en concentrations ioniques en meq/L pour le nitrate, l’ammonium, le phosphate, le potassium, le sulfate, le calcium, l’hydrogène, le chlorure et le magnésium. Il calcule aussi les totaux N, P₂O₅, K₂O, CaO et MgO ainsi que les doses par hectare." es="AgroCalc convierte las masas de fertilizante en concentraciones iónicas en meq/L de nitrato, amonio, fosfato, potasio, sulfato, calcio, hidrógeno, cloruro y magnesio. También calcula los totales de N, P₂O₅, K₂O, CaO y MgO y las dosis por hectárea."/></p>
          <ol className="ac-calc-steps">
            <li><T en={<><strong>Ionic concentration.</strong> meq/L = kg of fertilizer ÷ m³ of irrigation water ÷ equivalent weight × 1,000.</>} fr={<><strong>Concentration ionique.</strong> meq/L = kg d’engrais ÷ m³ d’eau d’irrigation ÷ poids équivalent × 1 000.</>} es={<><strong>Concentración iónica.</strong> meq/L = kg de fertilizante ÷ m³ de agua de riego ÷ peso equivalente × 1000.</>}/></li>
            <li><T en={<><strong>Fertilizer units.</strong> Each product’s mass × its N, P₂O₅, K₂O, CaO and MgO content, then ÷ area for kg/ha and ÷ N for the ratio.</>} fr={<><strong>Unités fertilisantes.</strong> Masse de chaque produit × sa teneur en N, P₂O₅, K₂O, CaO et MgO, puis ÷ surface pour les kg/ha et ÷ N pour le ratio.</>} es={<><strong>Unidades fertilizantes.</strong> Masa de cada producto × su contenido en N, P₂O₅, K₂O, CaO y MgO; después ÷ superficie para los kg/ha y ÷ N para la relación.</>}/></li>
            <li><T en={<><strong>Estimated EC.</strong> Source-water EC + (kg of fertilizer per m³ ÷ 0.85), in mS/cm.</>} fr={<><strong>EC estimée.</strong> EC de l’eau source + (kg d’engrais par m³ ÷ 0,85), en mS/cm.</>} es={<><strong>CE estimada.</strong> CE del agua + (kg de fertilizante por m³ ÷ 0,85), en mS/cm.</>}/></li>
            <li><T en={<><strong>A/B/C tanks.</strong> Calcium nitrate goes to tank A, sulfates and phosphates to tank B, nitric acid to tank C; nitrates without calcium move to tank A until A and B weigh about the same.</>} fr={<><strong>Bacs A/B/C.</strong> Le nitrate de calcium va dans le bac A, sulfates et phosphates dans le bac B, l’acide nitrique dans le bac C ; les nitrates sans calcium passent dans le bac A jusqu’à équilibrer les masses de A et B.</>} es={<><strong>Tanques A/B/C.</strong> El nitrato de calcio va al tanque A, los sulfatos y fosfatos al tanque B y el ácido nítrico al tanque C; los nitratos sin calcio pasan al tanque A hasta que A y B pesan aproximadamente lo mismo.</>}/></li>
          </ol>
        </div>
      </div>
    </section>

    <section className="ac-calc-seo">
      <div className="ac-wrap">
        <h2><T en="Worked example" fr="Exemple chiffré" es="Ejemplo resuelto"/></h2>
        <div>
          <p><T en={`The “Load example” recipe uses ${fmt(example.solution.totalKg)} kg of fertilizer in ${fmt(example.inputs.irrigationVolume, 0)} m³ of water with an EC of ${fmt(example.inputs.waterEc)} mS/cm, for ${fmt(example.inputs.area, 0)} ha and ${fmt(example.distribution.tanks[0].volume, 0)} L stock tanks. It produces:`} fr={`La recette « Charger un exemple » utilise ${fmt(example.solution.totalKg)} kg d’engrais dans ${fmt(example.inputs.irrigationVolume, 0)} m³ d’eau à ${fmt(example.inputs.waterEc)} mS/cm, pour ${fmt(example.inputs.area, 0)} ha et des bacs de ${fmt(example.distribution.tanks[0].volume, 0)} L. Elle donne :`} es={`La receta «Cargar un ejemplo» usa ${fmt(example.solution.totalKg)} kg de fertilizante en ${fmt(example.inputs.irrigationVolume, 0)} m³ de agua con una CE de ${fmt(example.inputs.waterEc)} mS/cm, para ${fmt(example.inputs.area, 0)} ha y tanques de ${fmt(example.distribution.tanks[0].volume, 0)} L. Da como resultado:`}/></p>
          <ul className="ac-calc-example-list">
            <li><T en="Estimated EC" fr="EC estimée" es="CE estimada"/>: <strong>{fmt(example.solution.estimatedEc)} mS/cm</strong></li>
            <li><T en="Cations / anions" fr="Cations / anions" es="Cationes / aniones"/>: <strong>{fmt(cationKeys.reduce((sum, key) => sum + example.ions[key], 0))} / {fmt(anionKeys.reduce((sum, key) => sum + example.ions[key], 0))} meq/L</strong></li>
            <li>N – P₂O₅ – K₂O: <strong>{example.nutrients.slice(0, 3).map(item => fmt(item.perHa, 1)).join(' – ')} kg/ha</strong></li>
            <li><T en="Nitrogen forms" fr="Formes d’azote" es="Formas de nitrógeno"/>: <strong>{fmt(example.nitrogen.nitrate, 0)}% NO₃–N · {fmt(example.nitrogen.ammonium, 0)}% NH₄–N</strong></li>
            <li><T en="Tanks A / B / C" fr="Bacs A / B / C" es="Tanques A / B / C"/>: <strong>{example.distribution.tanks.map(tank => fmt(tank.total, 0)).join(' / ')} kg</strong></li>
          </ul>
          <p><T en="Press “Load example” above to see the full analysis, then replace the quantities with your own." fr="Cliquez sur « Charger un exemple » ci-dessus pour voir l’analyse complète, puis remplacez les quantités par les vôtres." es="Pulse «Cargar un ejemplo» arriba para ver el análisis completo y después sustituya las cantidades por las suyas."/></p>
        </div>
      </div>
    </section>

    <section className="ac-calc-seo">
      <div className="ac-wrap">
        <h2><T en="Fertilizer composition used" fr="Composition des engrais utilisée" es="Composición de fertilizantes utilizada"/></h2>
        <div className="ac-result-scroll"><table className="ac-composition-table">
          <caption><T en="Nutrient content (% by mass), equivalent weight and default tank of the 14 supported fertilizers." fr="Teneur en éléments (% en masse), poids équivalent et bac par défaut des 14 engrais pris en charge." es="Contenido de nutrientes (% en masa), peso equivalente y tanque por defecto de los 14 fertilizantes compatibles."/></caption>
          <thead><tr><th scope="col"><T en="Fertilizer" fr="Engrais" es="Fertilizante"/></th><th scope="col">N</th><th scope="col">P₂O₅</th><th scope="col">K₂O</th><th scope="col">CaO</th><th scope="col">MgO</th><th scope="col"><T en="Eq. weight (g)" fr="Poids éq. (g)" es="Peso eq. (g)"/></th><th scope="col"><T en="Tank" fr="Bac" es="Tanque"/></th></tr></thead>
          <tbody>{fertilizerFields.map(field => { const c = fertilizerComposition[field.key]; return <tr key={field.key}><th scope="row"><T en={field.en} fr={field.fr} es={field.es}/></th>{['n', 'p2o5', 'k2o', 'cao', 'mgo'].map(k => <td key={k}>{c[k] ?? '–'}</td>)}<td>{c.eq}</td><td>{c.tank}</td></tr> })}</tbody>
        </table></div>
      </div>
    </section>

    <section className="ac-calc-seo">
      <div className="ac-wrap">
        <h2><T en="Learn more" fr="Pour aller plus loin" es="Más información"/></h2>
        <div><p><T en="Need help reading the results? Use the " fr="Besoin d’aide pour lire les résultats ? Consultez le " es="¿Necesita ayuda para interpretar los resultados? Consulte la "/><Link to="/blog/how-to-calculate-fertilizer"><T en="fertilizer calculation guide" fr="guide de calcul des engrais" es="guía de cálculo de fertilizantes"/></Link>, <Link to="/blog/ionic-balance-fertigation-explained"><T en="ionic balance explainer" fr="guide de la balance ionique" es="guía del equilibrio iónico"/></Link>, <Link to="/blog/ec-in-greenhouse-crops"><T en="EC guide" fr="guide EC" es="guía de la CE"/></Link> <T en="or the " fr="ou le " es="o la "/><Link to="/blog/how-to-mix-a-b-c-tanks"><T en="A/B/C tank guide" fr="guide des bacs A/B/C" es="guía de los tanques A/B/C"/></Link>.</p></div>
      </div>
    </section>
    <FaqSection route="/fertilizer-calculator"/>
    <RelatedTools current="/fertilizer-calculator"/>
  </main>
}

