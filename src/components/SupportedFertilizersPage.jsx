import { Link } from 'react-router-dom'
import { T, StoreButton, Arrow } from './LandingPage'

const fertilizers = [
  ['MKP', 'MKP', 'B'],
  ['Potassium nitrate', 'Nitrate de potassium', 'A/B'],
  ['Potassium sulfate', 'Sulfate de potassium', 'B'],
  ['Calcium nitrate', 'Nitrate de calcium', 'A'],
  ['Nitric acid', 'Acide nitrique', 'C'],
  ['Phosphoric acid', 'Acide phosphorique', 'B'],
  ['Ammonium nitrate', 'Ammonitrate', 'A/B'],
  ['MAP', 'MAP', 'B'],
  ['Urea', 'Urée', 'A/B'],
  ['Sulfuric acid', 'Acide sulfurique', 'B'],
  ['Magnesium nitrate (N MgO)', 'Nitrate de magnésium (N MgO)', 'A/B'],
  ['Ammonium sulfate (SULFAT AMO21)', 'Sulfate d’ammonium (SULFAT AMO21)', 'B'],
  ['Potassium chloride (CL,K)', 'Chlorure de potassium (CL,K)', 'B'],
  ['Magnesium sulfate (S MgO)', 'Sulfate de magnésium (S MgO)', 'B'],
]

export default function SupportedFertilizersPage() {
  return <main className="ac-landing ac-fertilizers-page"><div className="ac-wrap">
    <Link className="ac-text-link" to="/"><span aria-hidden="true">←</span><T en="Back to the app" fr="Retour à l’application"/></Link>
    <header className="ac-fertilizers-heading"><div className="ac-eyebrow"><T en="SUPPORTED FERTILIZERS" fr="ENGRAIS PRIS EN CHARGE"/></div><h1><T en={<>14 Fertilizers.<br/><em>Complete Coverage.</em></>} fr={<>14 engrais.<br/><em>Une couverture complète.</em></>}/></h1><p className="ac-intro"><T en="Find your fertilizers in AgroCalc Pro. Explore the 14 supported inputs and their standard tank assignments before building your formulation." fr="Retrouvez vos engrais dans AgroCalc Pro. Découvrez les 14 intrants pris en charge et leur répartition standard dans les bacs avant de préparer votre formulation."/></p></header>
    <div className="ac-fertilizer-table-wrap"><table className="ac-fertilizer-table"><caption><T en="The supported fertilizer list" fr="La liste des engrais pris en charge"/></caption><thead><tr><th scope="col">#</th><th scope="col"><T en="Fertilizer" fr="Engrais"/></th><th scope="col"><T en="Standard tank" fr="Bac standard"/></th></tr></thead><tbody>{fertilizers.map(([en, fr, tank], i) => <tr key={en}><td>{String(i + 1).padStart(2, '0')}</td><th scope="row"><T en={en} fr={fr}/></th><td><span className={`ac-tank-label ac-tank-${tank.replace('/', '')}`}>{tank}</span></td></tr>)}</tbody></table></div>
    <p className="ac-fertilizer-note"><T en="A/B marks inputs that can be assigned to either tank by the app’s distribution workflow. Review your formulation’s final distribution in AgroCalc Pro." fr="A/B indique les intrants que l’application peut répartir entre les deux bacs. Consultez la répartition finale de votre formulation dans AgroCalc Pro."/></p>
    <div className="ac-fertilizer-bottom"><div><h2><T en="Your inputs. One clear formulation." fr="Vos engrais. Une formulation claire."/></h2><Link className="ac-text-link" to="/blog/how-to-mix-a-b-c-tanks"><T en="Explore the tank mixing guide" fr="Consulter le guide des bacs"/><Arrow/></Link></div><StoreButton/></div>
  </div></main>
}
