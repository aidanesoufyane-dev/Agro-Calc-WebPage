import React from 'react'
import { Link, T } from '../lib/i18n'
import Icon from './Icon'
import { ArticleLinks } from './BlogPages'

import { PLAY_STORE_URL } from '../content/site'
import { faqs } from '../content/faqs'

function SeoHero({ labelEn, labelFr, titleEn, titleFr, subtitleEn, subtitleFr, fieldNote }) {
  return (
    <section className="seo-hero">
      <div className="seo-hero-glow"></div>
      <div className="container seo-hero-content">
        {fieldNote && <Link to="/blog" className="ac-note-back"><Icon name="arrow-left"/><T en="All Field Notes" fr="Toutes les notes du terrain"/></Link>}
        <h1 className="seo-title">
          <T en={<>{titleEn}</>} fr={<>{titleFr}</>}/>
        </h1>
        <p className="seo-subtitle">
          <T en={<>{subtitleEn}</>} fr={<>{subtitleFr}</>}/>
        </p>
        {!fieldNote && <a className="btn btn-primary seo-cta" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
          <T en={<>Get the Android App</>} fr={<>Télécharger sur Android</>}/>
        </a>}
        {fieldNote && <div className="ac-note-meta"><span>AgroCalc Pro</span><span aria-hidden="true">/</span><T en="Practical growing guides" fr="Guides pratiques de culture"/></div>}
      </div>
    </section>
  )
}

function SeoSection({ titleEn, titleFr, children }) {
  return (
    <section className="seo-section">
      <div className="container">
        <h2 className="seo-section-title">
          <T en={<>{titleEn}</>} fr={<>{titleFr}</>}/>
        </h2>
        {children}
      </div>
    </section>
  )
}

function BulletGrid({ items }) {
  return (
    <div className="seo-grid">
      {items.map((item, idx) => (
        <div key={idx} className="seo-card">
          <h3><T en={item.title} fr={item.titleFr}/></h3>
          <p><T en={item.text} fr={item.textFr}/></p>
        </div>
      ))}
    </div>
  )
}

export function CropPlanningPage() {
  return (
    <main className="seo-page ac-notes ac-tool-page">
      <SeoHero
        labelEn="Crop Planning"
        labelFr="Planification culturale"
        titleEn="Crop Planning Tools for Fertigation"
        titleFr="Outils de planification culturale pour la fertigation"
        subtitleEn="Align nutrient targets with crop stages and track your plan all season."
        subtitleFr="Alignez les objectifs nutritifs aux stades de culture toute la saison."
      />

      <SeoSection titleEn="Plan with confidence" titleFr="Planifiez avec confiance">
        <BulletGrid
          items={[
            {
              title: 'Stage-based targets', titleFr: 'Objectifs par stade', textFr: 'Définissez des plages nutritives par phase de croissance et exportez vos relevés.',
              text: 'Set nutrient ranges per growth phase and export records.',
            },
            {
              title: 'Consistent dosing', titleFr: 'Dosage régulier', textFr: 'Gardez les bacs A/B/C équilibrés pour stabiliser la réponse de la culture.',
              text: 'Keep A/B/C tanks balanced to stabilize crop response.',
            },
            {
              title: 'Shareable reports', titleFr: 'Rapports partageables', textFr: 'Créez des rapports PDF pour les techniciens et les producteurs.',
              text: 'Create PDF reports for technicians and growers.',
            },
          ]}
        />
      </SeoSection>

      <SeoSection titleEn="Why AgroCalc Pro" titleFr="Pourquoi AgroCalc Pro">
        <BulletGrid
          items={[
            {
              title: 'Offline by design', titleFr: 'Hors ligne par conception', textFr: 'Aucun réseau nécessaire pour les calculs quotidiens.',
              text: 'No signal required for daily calculations.',
            },
            {
              title: 'Field-ready', titleFr: 'Prêt pour le terrain', textFr: 'Saisie rapide, résultats clairs et calculs fiables.',
              text: 'Fast inputs, clear outputs, and reliable math.',
            },
            {
              title: 'Professional results', titleFr: 'Résultats professionnels', textFr: 'Des synthèses PDF claires, prêtes pour les audits.',
              text: 'Clean PDF summaries ready for audits.',
            },
          ]}
        />
      </SeoSection>

      <SeoSection titleEn="Download AgroCalc Pro" titleFr="Télécharger AgroCalc Pro">
        <div className="seo-cta-box">
          <div>
            <p className="seo-cta-title">
              <T en={<>Plan today. Produce better tomorrow.</>} fr={<>Planifiez aujourd'hui. Produisez mieux demain.</>}/>
            </p>
            <p className="seo-cta-note">
              <T en={<>Free Android app for agronomists and growers.</>} fr={<>Appli Android gratuite pour agronomes et producteurs.</>}/>
            </p>
          </div>
          <a className="btn btn-primary" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
            <T en={<>Download on Google Play</>} fr={<>Google Play</>}/>
          </a>
        </div>
      </SeoSection>
    </main>
  )
}

export function FertilizerBlogPage() {
  return (
    <main className="seo-page ac-notes">
      <SeoHero
        fieldNote="01"
        labelEn="AgroCalc Blog"
        labelFr="Blog AgroCalc"
        titleEn="How to Calculate Fertilizer for Fertigation"
        titleFr="Comment calculer les engrais pour la fertigation"
        subtitleEn="A practical, step-by-step method for balanced NPK solutions."
        subtitleFr="Une méthode simple pour des solutions NPK équilibrées."
      />

      <SeoSection titleEn="Step-by-step" titleFr="Étapes principales">
        <div className="seo-article">
          <p>
            <T en={<>Start with your target crop dose, water EC, and tank volume. Choose compatible fertilizers and enter quantities in kg. AgroCalc Pro converts them into ionic concentrations (meq/L), checks cation/anion balance, and estimates EC.</>} fr={<>Commencez par la dose cible, l'EC de l'eau et le volume des bacs. Choisissez des engrais compatibles et saisissez les kg. AgroCalc Pro convertit en concentrations ioniques (meq/L), vérifie l'équilibre cations/anions et estime l'EC.</>}/>
          </p>
          <p>
            <T en={<>Then split fertilizers into A/B/C tanks to avoid precipitation, generate a PDF, and share it with your team.</>} fr={<>Ensuite, séparez les engrais dans les bacs A/B/C pour éviter les précipitations, générez un PDF et partagez-le.</>}/>
          </p>
        </div>
      </SeoSection>

      <SeoSection titleEn="A worked example: potassium nitrate in 100 m³" titleFr="Exemple chiffré : nitrate de potassium dans 100 m³">
        <div className="seo-article">
          <p><T en="Suppose you inject 10 kg of potassium nitrate (13-0-46) into 100 m³ of irrigation water. First find the product concentration: 10 kg ÷ 100 m³ = 0.1 kg/m³, which is 100 g/m³ or 100 mg/L." fr="Supposons que vous injectiez 10 kg de nitrate de potassium (13-0-46) dans 100 m³ d’eau d’irrigation. Calculez d’abord la concentration du produit : 10 kg ÷ 100 m³ = 0,1 kg/m³, soit 100 g/m³ ou 100 mg/L."/></p>
          <ol className="seo-ordered">
            <li><T en="Nitrogen: 100 mg/L × 13% = 13 ppm N." fr="Azote : 100 mg/L × 13 % = 13 ppm de N."/></li>
            <li><T en="Potassium: 100 mg/L × 46% K₂O = 46 ppm K₂O, and 46 × 0.8301 = 38.2 ppm elemental K." fr="Potassium : 100 mg/L × 46 % de K₂O = 46 ppm de K₂O, et 46 × 0,8301 = 38,2 ppm de K élémentaire."/></li>
            <li><T en="Ionic balance: 100 mg/L ÷ 101 g per equivalent ≈ 0.99 meq/L of K⁺ and the same 0.99 meq/L of NO₃⁻, so this salt adds equally to cations and anions." fr="Balance ionique : 100 mg/L ÷ 101 g par équivalent ≈ 0,99 meq/L de K⁺ et autant de NO₃⁻ ; ce sel ajoute donc autant de cations que d’anions."/></li>
            <li><T en="Per hectare: if the 100 m³ irrigate 2 ha, the dose is 10 kg × 13% ÷ 2 = 0.65 kg N/ha and 10 kg × 46% ÷ 2 = 2.3 kg K₂O/ha." fr="Par hectare : si les 100 m³ irriguent 2 ha, la dose est de 10 kg × 13 % ÷ 2 = 0,65 kg N/ha et 10 kg × 46 % ÷ 2 = 2,3 kg K₂O/ha."/></li>
          </ol>
          <p><T en="Repeating this for every product by hand is slow and error-prone. Enter all your fertilizers in the free " fr="Refaire ce calcul pour chaque produit à la main est long et source d’erreurs. Saisissez tous vos engrais dans le "/><Link to="/fertilizer-calculator"><T en="NPK fertigation calculator" fr="calculateur de fertigation NPK gratuit"/></Link><T en=" to get the full ionic balance, estimated EC and A/B/C tank split at once, or use the " fr=" pour obtenir d’un coup la balance ionique, l’EC estimée et la répartition A/B/C, ou utilisez le "/><Link to="/fertilizer-ppm-calculator"><T en="fertilizer ppm calculator" fr="calculateur ppm d’engrais"/></Link><T en=" for a single NPK grade." fr=" pour un seul engrais NPK."/></p>
        </div>
      </SeoSection>

      <ArticleLinks/>

      <SeoSection titleEn="Try it now" titleFr="Essayez maintenant">
        <div className="seo-cta-box">
          <div>
            <p className="seo-cta-title">
              <T en={<>Free Android app for fertigation calculations.</>} fr={<>Appli Android gratuite pour vos calculs.</>}/>
            </p>
            <p className="seo-cta-note">
              <T en={<>Fast, offline, and built for agronomy.</>} fr={<>Rapide, hors ligne et conçu pour l'agronomie.</>}/>
            </p>
          </div>
          <a className="btn btn-primary" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
            <T en={<>Download on Google Play</>} fr={<>Google Play</>}/>
          </a>
        </div>
      </SeoSection>
    </main>
  )
}

function GuideFaqs({ route }) {
  return (
    <SeoSection titleEn="Frequently asked questions" titleFr="Questions fréquentes">
      <div className="seo-faqs">
        {faqs[route].map(item => (
          <div key={item.q} className="seo-faq-item">
            <h3><T en={item.q} fr={item.qFr}/></h3>
            <p><T en={item.a} fr={item.aFr}/></p>
          </div>
        ))}
      </div>
    </SeoSection>
  )
}



function ArticleCallout({ titleEn, titleFr, textEn, textFr, to, buttonEn, buttonFr }) {
  return (
    <SeoSection titleEn={titleEn} titleFr={titleFr}>
      <div className="seo-cta-box">
        <div>
          <p className="seo-cta-title">
            <T en={<>{textEn}</>} fr={<>{textFr}</>}/>
          </p>
          <p className="seo-cta-note">
            <T en={<>Use AgroCalcPro to validate your formulation before you mix it.</>} fr={<>Utilisez AgroCalcPro pour valider la formulation avant le mélange.</>}/>
          </p>
        </div>
        <Link className="btn btn-primary" to={to}>
          <T en={<>{buttonEn}</>} fr={<>{buttonFr}</>}/>
        </Link>
      </div>
    </SeoSection>
  )
}

export function GreenhouseEcGuidePage() {
  return (
    <main className="seo-page ac-notes">
      <SeoHero
        fieldNote="02"
        labelEn="AgroCalc Blog"
        labelFr="Blog AgroCalc"
        titleEn="EC in Greenhouse Crops: Practical Guide"
        titleFr="EC en culture sous serre : guide pratique"
        subtitleEn="Learn how to interpret electrical conductivity and keep fertigation within crop-safe ranges."
        subtitleFr="Apprenez à interpréter l'EC et gardez la fertigation dans des plages sûres."
      />

      <SeoSection titleEn="What EC actually tells you" titleFr="Ce que l'EC indique réellement">
        <div className="seo-article">
          <p>
            <T en={<>Electrical conductivity is not a fertilizer label. It is a quick proxy for the total soluble salts in your solution. In greenhouse crops, that means EC helps you judge whether the mix is too weak, balanced, or too concentrated for the root zone.</>} fr={<>La conductivité électrique n'est pas une étiquette d'engrais. C'est un indicateur rapide des sels solubles totaux dans votre solution. En serre, l'EC vous dit si le mélange est trop faible, équilibré ou trop concentré pour la zone racinaire.</>}/>
          </p>
          <p>
            <T en={<>A strong fertigation program watches EC together with crop stage, climate, substrate moisture, and drainage. Two solutions with the same EC can behave differently if one is dominated by nitrogen and the other by potassium and calcium.</>} fr={<>Un bon programme de fertigation suit l'EC avec le stade cultural, le climat, l'humidité du substrat et le drainage. Deux solutions avec la même EC peuvent réagir différemment si l'une est riche en azote et l'autre en potassium et calcium.</>}/>
          </p>
        </div>
      </SeoSection>

      <SeoSection titleEn="Practical target ranges" titleFr="Plages cibles pratiques">
        <div className="seo-article">
          <p>
            <T en={<>For most greenhouse systems, a useful starting point is 1.5 to 2.5 mS/cm, then adjust by crop and weather. Young plants usually need lower EC, while fruiting stages tolerate stronger solutions if water quality and drainage are stable.</>} fr={<>Pour la plupart des serres, un bon point de départ est 1,5 à 2,5 mS/cm, puis on ajuste selon la culture et la météo. Les jeunes plants demandent souvent une EC plus faible, tandis que les stades de fructification tolèrent des solutions plus fortes si l'eau et le drainage restent stables.</>}/>
          </p>
          <ul className="seo-bullets">
            <li><T en={<>Low EC can mean underfeeding or excess dilution.</>} fr={<>Une EC faible peut signaler un sous-approvisionnement ou une dilution excessive.</>}/></li>
            <li><T en={<>High EC can indicate salt accumulation or an overly strong mix.</>} fr={<>Une EC élevée peut montrer une accumulation de sels ou un mélange trop concentré.</>}/></li>
            <li><T en={<>Drainage EC is often more important than tank EC for diagnosing root-zone stress.</>} fr={<>L'EC du drainage est souvent plus utile que celle de la cuve pour diagnostiquer le stress racinaire.</>}/></li>
          </ul>
        </div>
      </SeoSection>

      <SeoSection titleEn="How to troubleshoot EC" titleFr="Comment dépanner l'EC">
        <div className="seo-article">
          <p>
            <T en={<>If EC rises unexpectedly, check water source changes, injector drift, clogged filters, and seasonal evaporation. If EC falls, inspect stock concentrations, dosing errors, and whether the crop has simply entered a faster uptake phase.</>} fr={<>Si l'EC monte soudainement, vérifiez les changements de l'eau source, la dérive d'injection, les filtres bouchés et l'évaporation saisonnière. Si l'EC baisse, contrôlez les concentrations des bacs, les erreurs de dosage et le stade de consommation de la culture.</>}/>
          </p>
          <p>
            <T en={<>AgroCalcPro helps by showing ionic balance, estimated EC, and fertilizer concentration in one place. That makes it easier to separate a chemistry problem from a dosing problem.</>} fr={<>AgroCalcPro aide en affichant l'équilibre ionique, l'EC estimée et la concentration des engrais au même endroit. On distingue plus facilement un problème chimique d'un problème de dosage.</>}/>
          </p>
        </div>
      </SeoSection>

      <GuideFaqs route="/blog/ec-in-greenhouse-crops"/>

      <ArticleLinks/>

      <ArticleCallout
        titleEn="Try AgroCalcPro for EC checks"
        titleFr="Essayez AgroCalcPro pour l'EC"
        textEn="Professional EC and ionic balance checks in one mobile app."
        textFr="Contrôle EC et équilibre ionique dans une seule application mobile."
        to="/ec-ppm-converter"
        buttonEn="Open the EC to ppm converter"
        buttonFr="Ouvrir le convertisseur EC/ppm"
      />
    </main>
  )
}

export function TankMixingGuidePage() {
  return (
    <main className="seo-page ac-notes">
      <SeoHero
        fieldNote="03"
        labelEn="AgroCalc Blog"
        labelFr="Blog AgroCalc"
        titleEn="How to Mix A/B/C Tanks Safely"
        titleFr="Comment mélanger les bacs A/B/C en sécurité"
        subtitleEn="Prevent calcium precipitation and keep incompatible salts separated from the start."
        subtitleFr="Évitez les précipitations de calcium et séparez les sels incompatibles dès le départ."
      />

      <SeoSection titleEn="Why the split matters" titleFr="Pourquoi cette séparation compte">
        <div className="seo-article">
          <p>
            <T en={<>In concentrated stock solutions, calcium can react with phosphates and sulfates to form insoluble deposits. That is why a proper fertilizer calculator does not stop at doses; it also needs tank compatibility logic.</>} fr={<>Dans les solutions mères concentrées, le calcium peut réagir avec les phosphates et les sulfates et former des dépôts insolubles. C'est pourquoi un bon calculateur d'engrais ne s'arrête pas aux doses ; il doit aussi gérer la compatibilité des bacs.</>}/>
          </p>
          <p>
            <T en={<>A/B/C separation is a practical way to keep the injector stable. Tank A usually carries calcium, Tank B holds the main fertilizer mix, and Tank C can be reserved for acid or pH correction.</>} fr={<>La séparation A/B/C garde l'injection stable. Le Bac A contient souvent le calcium, le Bac B la solution principale, et le Bac C l'acide ou la correction du pH.</>}/>
          </p>
        </div>
      </SeoSection>

      <SeoSection titleEn="A simple mixing workflow" titleFr="Un flux de mélange simple">
        <div className="seo-article">
          <ol className="seo-ordered">
            <li><T en={<>List the fertilizers and identify the ions that must not meet in the same tank.</>} fr={<>Lister les engrais et repérer les ions qui ne doivent pas se rencontrer dans le même bac.</>}/></li>
            <li><T en={<>Assign calcium products to Tank A and phosphorus/sulfate products to Tank B.</>} fr={<>Affecter les produits calciques au Bac A et les produits phosphatés/sulfatés au Bac B.</>}/></li>
            <li><T en={<>Use Tank C only when you need acidification or pH correction.</>} fr={<>Utiliser le Bac C seulement pour l'acidification ou la correction du pH.</>}/></li>
            <li><T en={<>Check the final concentrations so both stock tanks empty at the same pace.</>} fr={<>Vérifier les concentrations finales pour que les bacs se vident au même rythme.</>}/></li>
          </ol>
        </div>
      </SeoSection>

      <SeoSection titleEn="Common mistakes" titleFr="Erreurs fréquentes">
        <div className="seo-article">
          <ul className="seo-bullets">
            <li><T en={<>Putting calcium nitrate with phosphoric acid in the same concentrate.</>} fr={<>Mettre le nitrate de calcium avec l'acide phosphorique dans le même concentré.</>}/></li>
            <li><T en={<>Forgetting that temperature and concentration both affect precipitation risk.</>} fr={<>Oublier que la température et la concentration influencent le risque de précipitation.</>}/></li>
            <li><T en={<>Assuming a recipe that works in one water source will work everywhere.</>} fr={<>Supposer qu'une recette valable sur une eau fonctionnera partout.</>}/></li>
          </ul>
        </div>
      </SeoSection>

      <GuideFaqs route="/blog/how-to-mix-a-b-c-tanks"/>

      <ArticleLinks/>

      <ArticleCallout
        titleEn="Validate tank compatibility"
        titleFr="Validez la compatibilité des bacs"
        textEn="Use AgroCalcPro before you mix stock solutions."
        textFr="Utilisez AgroCalcPro avant le mélange des solutions mères."
        to="/fertilizer-calculator"
        buttonEn="Open Fertilizer Calculator"
        buttonFr="Ouvrir le calculateur"
      />
    </main>
  )
}

export function TomatoFertigationGuidePage() {
  return (
    <main className="seo-page ac-notes">
      <SeoHero
        fieldNote="04"
        labelEn="AgroCalc Blog"
        labelFr="Blog AgroCalc"
        titleEn="Tomato Fertigation Guide with NPK Targets"
        titleFr="Guide de fertigation tomate avec cibles NPK"
        subtitleEn="Use crop-stage targets, EC control, and tank compatibility to feed tomatoes correctly."
        subtitleFr="Utilisez les cibles par stade, le contrôle EC et la compatibilité des bacs pour la tomate."
      />

      <SeoSection titleEn="Tomato nutrition by growth stage" titleFr="Nutrition tomate par stade">
        <div className="seo-article">
          <p>
            <T en={<>Tomatoes respond strongly to changes in EC and potassium supply. In early vegetative growth, the goal is to build leaf area without overloading the root zone. During flowering and fruiting, the plant typically needs a stronger and more potassium-focused solution.</>} fr={<>La tomate réagit fortement aux variations d'EC et d'apport en potassium. En croissance végétative, l'objectif est de construire la surface foliaire sans surcharger la zone racinaire. En floraison et fructification, la plante demande souvent une solution plus forte et plus riche en potassium.</>}/>
          </p>
          <p>
            <T en={<>A practical tomato program is not only about the total NPK numbers. It is also about the form of nitrogen, the balance of calcium and magnesium, and the way the tank recipe behaves in the injector.</>} fr={<>Un programme tomate pratique ne se limite pas aux chiffres NPK. Il faut aussi regarder la forme de l'azote, l'équilibre calcium/magnésium et le comportement de la recette dans l'injecteur.</>}/>
          </p>
        </div>
      </SeoSection>

      <SeoSection titleEn="What to watch during fruiting" titleFr="À surveiller pendant la fructification">
        <div className="seo-article">
          <ul className="seo-bullets">
            <li><T en={<>Keep EC stable so fruit set is not disturbed by sudden salt spikes.</>} fr={<>Maintenir l'EC stable pour éviter que la nouaison soit perturbée par des pics de sels.</>}/></li>
            <li><T en={<>Use enough calcium to support fruit quality and reduce blossom-end rot risk.</>} fr={<>Prévoir assez de calcium pour soutenir la qualité des fruits et réduire le risque de nécrose apicale.</>}/></li>
            <li><T en={<>Avoid excessive ammonium in fruiting stages, because tomatoes generally prefer a nitrate-dominant supply.</>} fr={<>Éviter un excès d'ammonium en fructification, car la tomate préfère généralement une nutrition dominante en nitrate.</>}/></li>
          </ul>
        </div>
      </SeoSection>

      <SeoSection titleEn="How AgroCalcPro helps" titleFr="Comment AgroCalcPro aide">
        <div className="seo-article">
          <p>
            <T en={<>AgroCalcPro shows the ionic balance, tank distribution, and PDF report in one workflow. That makes it much easier to compare a tomato recipe across stages, especially when adjusting potassium, calcium, and EC together.</>} fr={<>AgroCalcPro affiche l'équilibre ionique, la distribution des bacs et le rapport PDF dans un seul flux. On compare plus facilement une recette tomate entre les stades, surtout lors des ajustements simultanés de potassium, calcium et EC.</>}/>
          </p>
        </div>
      </SeoSection>

      <GuideFaqs route="/blog/tomato-fertigation-guide"/>

      <ArticleLinks/>

      <ArticleCallout
        titleEn="Build your tomato recipe in AgroCalcPro"
        titleFr="Construisez votre recette tomate dans AgroCalcPro"
        textEn="Calculate targets, compare stages, and export the report."
        textFr="Calculez les cibles, comparez les stades et exportez le rapport."
        to="/fertilizer-calculator"
        buttonEn="Open the NPK calculator"
        buttonFr="Ouvrir le calculateur NPK"
      />
    </main>
  )
}
