import { Link, T } from '../lib/i18n'
import Icon from './Icon'
import { StoreButton, Arrow } from './LandingPage'

const fertilizers = [
  ['MKP', 'MKP', 'B', 'MKP'],
  ['Potassium nitrate', 'Nitrate de potassium', 'A/B', 'Nitrato de potasio'],
  ['Potassium sulfate', 'Sulfate de potassium', 'B', 'Sulfato de potasio'],
  ['Calcium nitrate', 'Nitrate de calcium', 'A', 'Nitrato de calcio'],
  ['Nitric acid', 'Acide nitrique', 'C', 'Ácido nítrico'],
  ['Phosphoric acid', 'Acide phosphorique', 'B', 'Ácido fosfórico'],
  ['Ammonium nitrate', 'Ammonitrate', 'A/B', 'Nitrato de amonio'],
  ['MAP', 'MAP', 'B', 'MAP'],
  ['Urea', 'Urée', 'A/B', 'Urea'],
  ['Sulfuric acid', 'Acide sulfurique', 'B', 'Ácido sulfúrico'],
  ['Magnesium nitrate (N MgO)', 'Nitrate de magnésium (N MgO)', 'A/B', 'Nitrato de magnesio (N MgO)'],
  ['Ammonium sulfate (SULFAT AMO21)', 'Sulfate d’ammonium (SULFAT AMO21)', 'B', 'Sulfato de amonio (SULFAT AMO21)'],
  ['Potassium chloride (CL,K)', 'Chlorure de potassium (CL,K)', 'B', 'Cloruro de potasio (CL,K)'],
  ['Magnesium sulfate (S MgO)', 'Sulfate de magnésium (S MgO)', 'B', 'Sulfato de magnesio (S MgO)'],
]

export default function SupportedFertilizersPage() {
  return <main className="ac-landing ac-fertilizers-page"><div className="ac-wrap">
    <Link className="ac-text-link" to="/"><Icon name="arrow-left"/><T en="Back to the app" fr="Retour à l’application" es="Volver a la app"/></Link>
    <header className="ac-fertilizers-heading"><h1><T en={<>14 Fertilizers.<br/><em>Complete Coverage.</em></>} fr={<>14 engrais.<br/><em>Une couverture complète.</em></>} es={<>14 fertilizantes.<br/><em>Cobertura completa.</em></>}/></h1><p className="ac-intro"><T en="Find your fertilizers in AgroCalc Pro. Explore the 14 supported inputs and their standard tank assignments before building your formulation." fr="Retrouvez vos engrais dans AgroCalc Pro. Découvrez les 14 intrants pris en charge et leur répartition standard dans les bacs avant de préparer votre formulation." es="Encuentre sus fertilizantes en AgroCalc Pro. Consulte los 14 productos compatibles y su reparto estándar en tanques antes de preparar su formulación."/></p></header>
    <div className="ac-fertilizer-table-wrap"><table className="ac-fertilizer-table"><caption><T en="The supported fertilizer list" fr="La liste des engrais pris en charge" es="La lista de fertilizantes compatibles"/></caption><thead><tr><th scope="col">#</th><th scope="col"><T en="Fertilizer" fr="Engrais" es="Fertilizante"/></th><th scope="col"><T en="Standard tank" fr="Bac standard" es="Tanque estándar"/></th></tr></thead><tbody>{fertilizers.map(([en, fr, tank, es], i) => <tr key={en}><td>{String(i + 1).padStart(2, '0')}</td><th scope="row"><T en={en} fr={fr} es={es}/></th><td><span className={`ac-tank-label ac-tank-${tank.replace('/', '')}`}>{tank}</span></td></tr>)}</tbody></table></div>
    <p className="ac-fertilizer-note"><T en="A/B marks inputs that can be assigned to either tank by the app’s distribution workflow. Review your formulation’s final distribution in AgroCalc Pro." fr="A/B indique les intrants que l’application peut répartir entre les deux bacs. Consultez la répartition finale de votre formulation dans AgroCalc Pro." es="A/B indica los productos que la app puede asignar a cualquiera de los dos tanques. Revise el reparto final de su formulación en AgroCalc Pro."/></p>
    <div className="ac-fertilizer-bottom"><div><h2><T en="Your inputs. One clear formulation." fr="Vos engrais. Une formulation claire." es="Sus fertilizantes. Una formulación clara."/></h2><Link className="ac-text-link" to="/blog/how-to-mix-a-b-c-tanks"><T en="Explore the tank mixing guide" fr="Consulter le guide des bacs" es="Ver la guía de mezcla en tanques"/><Arrow/></Link></div><StoreButton/></div>
  </div></main>
}
