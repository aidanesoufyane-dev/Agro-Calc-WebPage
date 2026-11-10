import { useState } from 'react'
import { Link, T, useLang } from '../lib/i18n'
import { faqs } from '../content/faqs'
import { webTools } from '../content/site'
import { ppmFromDose, doseForTarget, convertEc, ppmToEc, dripIrrigation, EC_SCALES } from '../lib/tools'
import { Arrow } from './LandingPage'
import Icon from './Icon'

const decimal = /^\d*[.,]?\d*$/
const fmt = (value, lang) => Number(value).toLocaleString({ fr: 'fr-FR', es: 'es-ES' }[lang] || 'en-US', { maximumFractionDigits: 3 })

function useForm(initial) {
  const [values, setValues] = useState(initial)
  const change = event => {
    const { name, value, tagName } = event.target
    if (tagName === 'SELECT' || value === '' || decimal.test(value)) setValues(current => ({ ...current, [name]: value }))
  }
  return [values, change, setValues]
}

function Field({ name, value, onChange, suffix, children, hint }) {
  return <label className="ac-calc-field">
    <span>{children}</span>
    <span className="ac-calc-input"><input name={name} value={value} onChange={onChange} inputMode="decimal" type="text" placeholder="0"/>{suffix && <small>{suffix}</small>}</span>
    {hint && <em className="ac-tool-hint">{hint}</em>}
  </label>
}

function ToolHero({ title, intro }) {
  return <header className="ac-calc-hero"><div className="ac-wrap">
    
    <h1>{title}</h1>
    <p>{intro}</p>
  </div></header>
}

function Results({ title, rows }) {
  const lang = useLang()
  return <aside className="ac-calc-side ac-tool-results" aria-live="polite">
    
    <h2>{title}</h2>
    <dl>{rows.map(([label, value, unit], i) => <div key={i} className={i === 0 ? 'is-main' : undefined}><dt>{label}</dt><dd>{fmt(value, lang)}{unit && <small> {unit}</small>}</dd></div>)}</dl>
  </aside>
}

export function FaqSection({ route }) {
  return <section className="ac-tool-faq"><div className="ac-wrap">
    <h2><T en="Frequently asked questions" fr="Questions fréquentes" es="Preguntas frecuentes"/></h2>
    <div>{faqs[route].map(item => <details key={item.q}><summary><T en={item.q} fr={item.qFr} es={item.qEs}/><Icon name="plus"/></summary><p><T en={item.a} fr={item.aFr} es={item.aEs}/></p></details>)}</div>
  </div></section>
}

export function RelatedTools({ current }) {
  return <section className="ac-tool-related"><div className="ac-wrap">
    <h2><T en="More free fertigation tools" fr="Autres outils de fertigation gratuits" es="Más herramientas de fertirrigación gratuitas"/></h2>
    <div className="ac-related-grid">{webTools.filter(tool => tool.path !== current).map(tool => <Link className="ac-related-card" to={tool.path} key={tool.path}><span><T en="Tool" fr="Outil" es="Herramienta"/></span><h3><T en={tool.en} fr={tool.fr} es={tool.es}/></h3><Arrow/></Link>)}</div>
    <Link className="ac-text-link" to="/blog"><T en="Read the fertigation guides" fr="Lire les guides de fertigation" es="Leer las guías de fertirrigación"/><Arrow/></Link>
  </div></section>
}

function Explainer({ title, children }) {
  return <section className="ac-calc-seo"><div className="ac-wrap"><h2>{title}</h2><div>{children}</div></div></section>
}

export function FertilizerPpmPage() {
  const [mode, setMode] = useState('ppm')
  const [v, change] = useForm({ n: '20', p2o5: '20', k2o: '20', grams: '100', liters: '100', ratio: '1', targetPpm: '150', nutrient: 'n' })
  const result = mode === 'ppm' ? ppmFromDose(v) : doseForTarget(v)
  const stock = Number(String(v.ratio).replace(',', '.')) > 1
  const volumeLabel = stock ? <T en="Stock tank volume" fr="Volume du bac de solution mère" es="Volumen del tanque de solución madre"/> : <T en="Water volume" fr="Volume d’eau" es="Volumen de agua"/>
  return <main className="ac-calculator-page ac-tool-page-v2">
    <ToolHero title={<T en="Fertilizer ppm calculator" fr="Calculateur ppm d’engrais" es="Calculadora de ppm de fertilizante"/>} intro={<T en="Convert grams of any NPK fertilizer into ppm of nitrogen, phosphorus and potassium, or find the dose that hits a target ppm. Works for direct dissolving and for injectors such as 1:100." fr="Convertissez les grammes de n’importe quel engrais NPK en ppm d’azote, de phosphore et de potassium, ou trouvez la dose pour une cible en ppm. Fonctionne en dissolution directe ou avec un injecteur, par exemple 1:100." es="Convierta los gramos de cualquier fertilizante NPK en ppm de nitrógeno, fósforo y potasio, o encuentre la dosis para un objetivo en ppm. Sirve para disolución directa y para inyectores como 1:100."/>}/>
    <div className="ac-wrap ac-calc-layout">
      <form className="ac-calc-form" onSubmit={e => e.preventDefault()}>
        <fieldset className="ac-calc-group">
          <legend><T en="What do you want to calculate?" fr="Que voulez-vous calculer ?" es="¿Qué quiere calcular?"/></legend>
          <div className="ac-tool-modes">
            <label><input type="radio" name="mode" checked={mode === 'ppm'} onChange={() => setMode('ppm')}/><T en="ppm from grams" fr="ppm à partir des grammes" es="ppm a partir de gramos"/></label>
            <label><input type="radio" name="mode" checked={mode === 'dose'} onChange={() => setMode('dose')}/><T en="Grams for a target ppm" fr="Grammes pour une cible en ppm" es="Gramos para un objetivo en ppm"/></label>
          </div>
        </fieldset>
        <fieldset className="ac-calc-group">
          <legend><T en="Fertilizer grade (label N-P₂O₅-K₂O)" fr="Formule de l’engrais (étiquette N-P₂O₅-K₂O)" es="Riqueza del fertilizante (etiqueta N-P₂O₅-K₂O)"/></legend>
          <div className="ac-calc-fields">
            <Field name="n" value={v.n} onChange={change} suffix="%">N</Field>
            <Field name="p2o5" value={v.p2o5} onChange={change} suffix="%">P₂O₅</Field>
            <Field name="k2o" value={v.k2o} onChange={change} suffix="%">K₂O</Field>
          </div>
        </fieldset>
        <fieldset className="ac-calc-group">
          <legend><T en="Dose and dilution" fr="Dose et dilution" es="Dosis y dilución"/></legend>
          <div className="ac-calc-fields">
            {mode === 'ppm'
              ? <Field name="grams" value={v.grams} onChange={change} suffix="g"><T en="Fertilizer amount" fr="Quantité d’engrais" es="Cantidad de fertilizante"/></Field>
              : <>
                <Field name="targetPpm" value={v.targetPpm} onChange={change} suffix="ppm"><T en="Target concentration" fr="Concentration cible" es="Concentración objetivo"/></Field>
                <label className="ac-calc-field"><span><T en="Target nutrient" fr="Élément ciblé" es="Nutriente objetivo"/></span><span className="ac-calc-input"><select name="nutrient" value={v.nutrient} onChange={change} className="ac-tool-select"><option value="n">N</option><option value="p">P</option><option value="k">K</option></select></span></label>
              </>}
            <Field name="liters" value={v.liters} onChange={change} suffix="L">{volumeLabel}</Field>
            <Field name="ratio" value={v.ratio} onChange={change} suffix="1:x" hint={<T en="1 = dissolved directly in the water delivered" fr="1 = dissous directement dans l’eau distribuée" es="1 = disuelto directamente en el agua aplicada"/>}><T en="Injector ratio" fr="Ratio d’injection" es="Relación de inyección"/></Field>
          </div>
        </fieldset>
      </form>
      <Results title={mode === 'ppm' ? <T en="Delivered concentration" fr="Concentration distribuée" es="Concentración aplicada"/> : <T en="Fertilizer to dissolve" fr="Engrais à dissoudre" es="Fertilizante a disolver"/>} rows={[
        ...(mode === 'dose' ? [[<T en="Fertilizer" fr="Engrais" es="Fertilizante"/>, result.grams, 'g']] : []),
        [<T en="Nitrogen (N)" fr="Azote (N)" es="Nitrógeno (N)"/>, result.n, 'ppm'],
        [<T en="Phosphorus (P)" fr="Phosphore (P)" es="Fósforo (P)"/>, result.p, 'ppm'],
        [<T en="Potassium (K)" fr="Potassium (K)" es="Potasio (K)"/>, result.k, 'ppm'],
        ['P₂O₅', result.p2o5, 'ppm'], ['K₂O', result.k2o, 'ppm'],
        [<T en="Product in delivered water" fr="Produit dans l’eau distribuée" es="Producto en el agua aplicada"/>, result.product, 'mg/L'],
      ]}/>
    </div>
    <Explainer title={<T en="How to calculate fertilizer ppm" fr="Comment calculer les ppm d’un engrais" es="Cómo calcular las ppm de un fertilizante"/>}>
      <p><T en="ppm (mg/L) of a nutrient = grams of fertilizer × 1,000 ÷ liters ÷ injector ratio × nutrient percentage ÷ 100. Labels state phosphorus as P₂O₅ and potassium as K₂O, so the calculator also converts them to elemental P (× 0.4364) and K (× 0.8301)." fr="ppm (mg/L) d’un élément = grammes d’engrais × 1 000 ÷ litres ÷ ratio d’injection × pourcentage de l’élément ÷ 100. Les étiquettes indiquent le phosphore en P₂O₅ et le potassium en K₂O : le calculateur les convertit aussi en P (× 0,4364) et K (× 0,8301) élémentaires." es="ppm (mg/L) de un nutriente = gramos de fertilizante × 1000 ÷ litros ÷ relación de inyección × porcentaje del nutriente ÷ 100. Las etiquetas expresan el fósforo como P₂O₅ y el potasio como K₂O, así que la calculadora también los convierte en P (× 0,4364) y K (× 0,8301) elementales."/></p>
      <p><T en="Example: 100 g of 20-20-20 in 100 L gives 1,000 mg/L of product, so 200 ppm N, 200 ppm P₂O₅ (87.3 ppm P) and 200 ppm K₂O (166 ppm K). With a 1:100 injector, the same 100 g in a 100 L stock tank delivers one hundredth of that: 2 ppm N." fr="Exemple : 100 g de 20-20-20 dans 100 L donnent 1 000 mg/L de produit, soit 200 ppm de N, 200 ppm de P₂O₅ (87,3 ppm de P) et 200 ppm de K₂O (166 ppm de K). Avec un injecteur 1:100, les mêmes 100 g dans un bac de 100 L délivrent cent fois moins : 2 ppm de N." es="Ejemplo: 100 g de 20-20-20 en 100 L dan 1000 mg/L de producto, es decir, 200 ppm de N, 200 ppm de P₂O₅ (87,3 ppm de P) y 200 ppm de K₂O (166 ppm de K). Con un inyector 1:100, los mismos 100 g en un tanque de 100 L aplican la centésima parte: 2 ppm de N."/></p>
      <p><T en="Mixing several products? The " fr="Vous mélangez plusieurs produits ? Le " es="¿Mezcla varios productos? La "/><Link to="/fertilizer-calculator"><T en="NPK fertigation calculator" fr="calculateur de fertigation NPK" es="Calculadora de fertirrigación NPK"/></Link><T en=" combines up to 14 fertilizers and checks ionic balance, EC and A/B/C tank compatibility." fr=" combine jusqu’à 14 engrais et vérifie la balance ionique, l’EC et la compatibilité des bacs A/B/C." es=" combina hasta 14 fertilizantes y comprueba el equilibrio iónico, la CE y la compatibilidad de los tanques A/B/C."/></p>
    </Explainer>
    <FaqSection route="/fertilizer-ppm-calculator"/>
    <RelatedTools current="/fertilizer-ppm-calculator"/>
  </main>
}

const ecUnits = [['mScm', 'mS/cm'], ['uScm', 'µS/cm'], ['dSm', 'dS/m'], ['cf', 'CF']]

export function EcPpmPage() {
  const [v, change] = useForm({ ec: '1.5', unit: 'mScm', ppm: '1000', scale: '500' })
  const ec = convertEc(v.ec, v.unit)
  return <main className="ac-calculator-page ac-tool-page-v2">
    <ToolHero title={<T en="EC to ppm converter" fr="Convertisseur EC en ppm" es="Conversor de CE a ppm"/>} intro={<T en="Convert electrical conductivity between mS/cm, µS/cm, dS/m and CF, and read the equivalent ppm (TDS) on the 500, 640 and 700 scales used by different meters." fr="Convertissez la conductivité électrique entre mS/cm, µS/cm, dS/m et CF, et lisez l’équivalent en ppm (TDS) selon les échelles 500, 640 et 700 des différents appareils." es="Convierta la conductividad eléctrica entre mS/cm, µS/cm, dS/m y CF, y lea las ppm equivalentes (TDS) en las escalas 500, 640 y 700 que usan los distintos medidores."/>}/>
    <div className="ac-wrap ac-calc-layout">
      <form className="ac-calc-form" onSubmit={e => e.preventDefault()}>
        <fieldset className="ac-calc-group">
          <legend><T en="EC reading" fr="Mesure d’EC" es="Lectura de CE"/></legend>
          <div className="ac-calc-fields">
            <Field name="ec" value={v.ec} onChange={change}><T en="Conductivity" fr="Conductivité" es="Conductividad"/></Field>
            <label className="ac-calc-field"><span><T en="Unit" fr="Unité" es="Unidad"/></span><span className="ac-calc-input"><select name="unit" value={v.unit} onChange={change} className="ac-tool-select">{ecUnits.map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></span></label>
          </div>
        </fieldset>
        <fieldset className="ac-calc-group">
          <legend><T en="ppm back to EC" fr="Des ppm vers l’EC" es="De ppm a CE"/></legend>
          <div className="ac-calc-fields">
            <Field name="ppm" value={v.ppm} onChange={change} suffix="ppm"><T en="TDS reading" fr="Mesure TDS" es="Lectura TDS"/></Field>
            <label className="ac-calc-field"><span><T en="Meter scale" fr="Échelle de l’appareil" es="Escala del medidor"/></span><span className="ac-calc-input"><select name="scale" value={v.scale} onChange={change} className="ac-tool-select">{EC_SCALES.map(scale => <option key={scale} value={scale}>{scale}</option>)}</select></span></label>
          </div>
          <p className="ac-tool-inline-result"><T en="Equivalent EC" fr="EC équivalente" es="CE equivalente"/>: <strong>{ppmToEc(v.ppm, v.scale)} mS/cm</strong></p>
        </fieldset>
      </form>
      <Results title={<T en="Your EC in every unit" fr="Votre EC dans toutes les unités" es="Su CE en todas las unidades"/>} rows={[
        ['EC', ec.mScm, 'mS/cm'], ['EC', ec.uScm, 'µS/cm'], ['CF', ec.cf, ''],
        ...EC_SCALES.map(scale => [<T en={`ppm (${scale} scale)`} fr={`ppm (échelle ${scale})`} es={`ppm (escala ${scale})`}/>, ec.ppm[scale], 'ppm']),
      ]}/>
    </div>
    <Explainer title={<T en="How EC converts to ppm" fr="Comment l’EC se convertit en ppm" es="Cómo se convierte la CE en ppm"/>}>
      <p><T en="A TDS meter measures conductivity and multiplies it by a fixed factor to display ppm. The 500 scale assumes a sodium chloride solution, the 700 scale is based on potassium chloride (442 natural water), and 640 is a common general factor. That is why one nutrient solution can read 750, 960 or 1,050 ppm at 1.5 mS/cm." fr="Un appareil TDS mesure la conductivité et la multiplie par un facteur fixe pour afficher des ppm. L’échelle 500 suppose une solution de chlorure de sodium, l’échelle 700 repose sur le chlorure de potassium (eau naturelle 442) et 640 est un facteur général courant. Une même solution peut donc afficher 750, 960 ou 1 050 ppm à 1,5 mS/cm." es="Un medidor TDS mide la conductividad y la multiplica por un factor fijo para mostrar ppm. La escala 500 supone una solución de cloruro de sodio, la escala 700 se basa en el cloruro de potasio (agua natural 442) y 640 es un factor general habitual. Por eso una misma solución puede marcar 750, 960 o 1050 ppm a 1,5 mS/cm."/></p>
      <p><T en="Because ppm depends on the meter, share recipes in mS/cm. To estimate the EC a fertilizer recipe will produce, use the " fr="Les ppm dépendant de l’appareil, partagez vos recettes en mS/cm. Pour estimer l’EC produite par une recette, utilisez le " es="Como las ppm dependen del medidor, comparta sus recetas en mS/cm. Para estimar la CE que dará una receta de fertilizantes, use la "/><Link to="/fertilizer-calculator"><T en="NPK fertigation calculator" fr="calculateur de fertigation NPK" es="Calculadora de fertirrigación NPK"/></Link><T en=", and read our " fr=", et lisez notre " es=", y lea nuestra "/><Link to="/blog/ec-in-greenhouse-crops"><T en="guide to EC in greenhouse crops" fr="guide de l’EC en serre" es="guía de la CE en invernadero"/></Link>.</p>
    </Explainer>
    <FaqSection route="/ec-ppm-converter"/>
    <RelatedTools current="/ec-ppm-converter"/>
  </main>
}

export function IrrigationCalculatorPage() {
  const [v, change] = useForm({ flow: '1.6', emitterSpacing: '0.3', lateralSpacing: '1.5', minutes: '60', area: '1', targetMm: '4' })
  const r = dripIrrigation(v)
  return <main className="ac-calculator-page ac-tool-page-v2">
    <ToolHero title={<T en="Drip irrigation calculator" fr="Calculateur d’irrigation goutte-à-goutte" es="Calculadora de riego por goteo"/>} intro={<T en="Calculate emitters per hectare, the application rate in mm/h, the water volume delivered per irrigation and the run time needed to apply a target depth." fr="Calculez le nombre de goutteurs par hectare, la pluviométrie en mm/h, le volume d’eau apporté par irrigation et la durée nécessaire pour une dose cible." es="Calcule los goteros por hectárea, la pluviometría en mm/h, el volumen de agua aplicado en cada riego y el tiempo necesario para aplicar una lámina objetivo."/>}/>
    <div className="ac-wrap ac-calc-layout">
      <form className="ac-calc-form" onSubmit={e => e.preventDefault()}>
        <fieldset className="ac-calc-group">
          <legend><T en="Drip layout" fr="Installation goutte-à-goutte" es="Instalación de goteo"/></legend>
          <div className="ac-calc-fields">
            <Field name="flow" value={v.flow} onChange={change} suffix="L/h"><T en="Emitter flow" fr="Débit du goutteur" es="Caudal del gotero"/></Field>
            <Field name="emitterSpacing" value={v.emitterSpacing} onChange={change} suffix="m"><T en="Emitter spacing" fr="Espacement des goutteurs" es="Separación entre goteros"/></Field>
            <Field name="lateralSpacing" value={v.lateralSpacing} onChange={change} suffix="m"><T en="Lateral (row) spacing" fr="Espacement des rampes" es="Separación entre laterales"/></Field>
          </div>
        </fieldset>
        <fieldset className="ac-calc-group">
          <legend><T en="Irrigation" fr="Irrigation" es="Riego"/></legend>
          <div className="ac-calc-fields">
            <Field name="minutes" value={v.minutes} onChange={change} suffix="min"><T en="Run time" fr="Durée" es="Tiempo de riego"/></Field>
            <Field name="area" value={v.area} onChange={change} suffix="ha"><T en="Irrigated area" fr="Surface irriguée" es="Superficie regada"/></Field>
            <Field name="targetMm" value={v.targetMm} onChange={change} suffix="mm"><T en="Target depth (optional)" fr="Dose cible (facultatif)" es="Lámina objetivo (opcional)"/></Field>
          </div>
        </fieldset>
      </form>
      <Results title={<T en="Your irrigation" fr="Votre irrigation" es="Su riego"/>} rows={[
        [<T en="Water per irrigation" fr="Eau par irrigation" es="Agua por riego"/>, r.volumeTotal, 'm³'],
        [<T en="Application rate" fr="Pluviométrie" es="Pluviometría"/>, r.rate, 'mm/h'],
        [<T en="Depth applied" fr="Dose apportée" es="Lámina aplicada"/>, r.depth, 'mm'],
        [<T en="Volume per hectare" fr="Volume par hectare" es="Volumen por hectárea"/>, r.volumePerHa, 'm³/ha'],
        [<T en="Emitters per hectare" fr="Goutteurs par hectare" es="Goteros por hectárea"/>, r.emittersPerHa, ''],
        [<T en="System flow" fr="Débit du réseau" es="Caudal del sistema"/>, r.systemFlow, 'm³/h'],
        [<T en="Run time for target" fr="Durée pour la dose cible" es="Tiempo para la lámina objetivo"/>, r.minutesForTarget, 'min'],
      ]}/>
    </div>
    <Explainer title={<T en="How the drip irrigation calculation works" fr="Comment fonctionne le calcul goutte-à-goutte" es="Cómo funciona el cálculo del riego por goteo"/>}>
      <p><T en="Each emitter wets a cell of emitter spacing × lateral spacing. Dividing the emitter flow by that area gives the application rate: 1 L/h on 1 m² is 1 mm/h. Emitters per hectare are 10,000 m² ÷ cell area, and every millimeter over a hectare is 10 m³ of water." fr="Chaque goutteur arrose une cellule égale à l’espacement des goutteurs × l’espacement des rampes. Le débit divisé par cette surface donne la pluviométrie : 1 L/h sur 1 m² vaut 1 mm/h. Le nombre de goutteurs par hectare est 10 000 m² ÷ surface de la cellule, et chaque millimètre sur un hectare représente 10 m³ d’eau." es="Cada gotero moja una celda de separación entre goteros × separación entre laterales. Al dividir el caudal entre esa superficie se obtiene la pluviometría: 1 L/h sobre 1 m² equivale a 1 mm/h. Los goteros por hectárea son 10 000 m² ÷ superficie de la celda, y cada milímetro sobre una hectárea son 10 m³ de agua."/></p>
      <p><T en="Example: 1.6 L/h drippers every 0.3 m on laterals 1.5 m apart give 22,222 emitters/ha and 3.56 mm/h. One hour applies 3.56 mm, or 35.6 m³ per hectare. Once you know the water volume, enter it as the irrigation volume in the " fr="Exemple : des goutteurs de 1,6 L/h tous les 0,3 m sur des rampes espacées de 1,5 m donnent 22 222 goutteurs/ha et 3,56 mm/h. Une heure apporte 3,56 mm, soit 35,6 m³ par hectare. Avec ce volume, renseignez le volume d’irrigation dans le " es="Ejemplo: goteros de 1,6 L/h cada 0,3 m en laterales separados 1,5 m dan 22 222 goteros/ha y 3,56 mm/h. Una hora aplica 3,56 mm, o 35,6 m³ por hectárea. Con ese volumen de agua, introdúzcalo como volumen de riego en la "/><Link to="/fertilizer-calculator"><T en="NPK fertigation calculator" fr="calculateur de fertigation NPK" es="Calculadora de fertirrigación NPK"/></Link><T en=" to see what your fertilizers deliver." fr=" pour voir ce qu’apportent vos engrais." es=" para ver lo que aportan sus fertilizantes."/></p>
      <p><T en="Planning a season? Read the guide to " fr="Vous planifiez une saison ? Lisez le guide sur la " es="¿Planifica una campaña? Lea la guía sobre la "/><Link to="/blog/fertigation-scheduling-drip-irrigation"><T en="fertigation scheduling with drip irrigation" fr="programmation de la fertigation en goutte-à-goutte" es="programación de la fertirrigación con riego por goteo"/></Link>.</p>
    </Explainer>
    <FaqSection route="/irrigation-calculator"/>
    <RelatedTools current="/irrigation-calculator"/>
  </main>
}
