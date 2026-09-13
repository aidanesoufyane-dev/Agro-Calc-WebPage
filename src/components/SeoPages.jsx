import React from 'react'
import { Link } from 'react-router-dom'
import { T } from './LandingPage'
import { ArticleLinks } from './BlogPages'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.soufyanedev.agrocalcpro'

function SeoHero({ labelEn, labelFr, titleEn, titleFr, subtitleEn, subtitleFr, fieldNote }) {
  return (
    <section className="seo-hero">
      <div className="seo-hero-glow"></div>
      <div className="container seo-hero-content">
        {fieldNote && <Link to="/blog" className="ac-note-back"><span aria-hidden="true">←</span><T en="All Field Notes" fr="Toutes les notes du terrain"/></Link>}
        <span className="section-label light">
          <span className="en">{fieldNote ? "THE FIELD NOTES" : labelEn}</span><span className="fr">{fieldNote ? "LES NOTES DU TERRAIN" : labelFr}</span>{fieldNote && <span className="ac-note-number"> / {fieldNote}</span>}
        </span>
        <h1 className="seo-title">
          <span className="en">{titleEn}</span>
          <span className="fr">{titleFr}</span>
        </h1>
        <p className="seo-subtitle">
          <span className="en">{subtitleEn}</span>
          <span className="fr">{subtitleFr}</span>
        </p>
        {!fieldNote && <a className="btn btn-primary seo-cta" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
          <span className="en">Get the Android App</span>
          <span className="fr">Telecharger sur Android</span>
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
          <span className="en">{titleEn}</span>
          <span className="fr">{titleFr}</span>
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
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export function FertilizerCalculatorPage() {
  return (
    <main className="seo-page ac-notes ac-tool-page">
      <SeoHero
        labelEn="Fertilizer Calculator"
        labelFr="Calculateur d'engrais"
        titleEn="Fertilizer Calculator for NPK Fertigation"
        titleFr="Calculateur d'engrais NPK pour la fertigation"
        subtitleEn="Build balanced nutrient solutions, estimate EC, and export a professional PDF in minutes."
        subtitleFr="Creez des solutions equilibrees, estimez l'EC et exportez un PDF pro en quelques minutes."
      />

      <SeoSection titleEn="What it does" titleFr="Ce que vous obtenez">
        <BulletGrid
          items={[
            {
              title: 'NPK balance in meq/L',
              text: 'Automatic ionic balance with NH4, NO3, H2PO4, K, Ca, Mg, SO4 and more.',
            },
            {
              title: 'Tank distribution',
              text: 'Split fertilizers across A/B/C tanks to avoid precipitation and clogs.',
            },
            {
              title: 'EC and dose checks',
              text: 'Estimate electrical conductivity and validate practical ranges.',
            },
          ]}
        />
      </SeoSection>

      <SeoSection titleEn="Ideal for" titleFr="Concu pour">
        <BulletGrid
          items={[
            {
              title: 'Greenhouses',
              text: 'Hydroponics, substrate culture, and drip fertigation setups.',
            },
            {
              title: 'Farm advisors',
              text: 'Agronomists who need a reliable NPK calculator on the field.',
            },
            {
              title: 'Technicians',
              text: 'Irrigation teams managing daily fertilizer mixing.',
            },
          ]}
        />
      </SeoSection>

      <SeoSection titleEn="Download AgroCalc Pro" titleFr="Telecharger AgroCalc Pro">
        <div className="seo-cta-box">
          <div>
            <p className="seo-cta-title">
              <span className="en">Free on Android. Works offline.</span>
              <span className="fr">Gratuit sur Android. Fonctionne hors ligne.</span>
            </p>
            <p className="seo-cta-note">
              <span className="en">Generate PDF reports and share with your team.</span>
              <span className="fr">Generez des rapports PDF et partagez-les.</span>
            </p>
          </div>
          <a className="btn btn-primary" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
            <span className="en">Download on Google Play</span>
            <span className="fr">Google Play</span>
          </a>
        </div>
      </SeoSection>
    </main>
  )
}

export function IrrigationCalculatorPage() {
  return (
    <main className="seo-page ac-notes ac-tool-page">
      <SeoHero
        labelEn="Irrigation Calculator"
        labelFr="Calculateur d'irrigation"
        titleEn="Irrigation Calculator for Fertigation Systems"
        titleFr="Calculateur d'irrigation pour systemes de fertigation"
        subtitleEn="Plan volumes, dosage, and EC targets to deliver consistent nutrition."
        subtitleFr="Planifiez volumes, dosage et EC pour une nutrition stable."
      />

      <SeoSection titleEn="Precision irrigation, simplified" titleFr="Irrigation precise, simplifiee">
        <BulletGrid
          items={[
            {
              title: 'Volume planning',
              text: 'Convert hectare doses into tank volumes and solution targets.',
            },
            {
              title: 'EC interpretation',
              text: 'Quick range guidance for low, optimal, and high EC.',
            },
            {
              title: 'Mixing safety',
              text: 'Avoid incompatible salts with automatic tank split rules.',
            },
          ]}
        />
      </SeoSection>

      <SeoSection titleEn="Workflow" titleFr="Flux de travail">
        <div className="seo-steps">
          <div className="seo-step">1. <span className="en">Select fertilizers</span><span className="fr">Choisir les engrais</span></div>
          <div className="seo-step">2. <span className="en">Enter target dose</span><span className="fr">Entrer la dose</span></div>
          <div className="seo-step">3. <span className="en">Get EC + balance</span><span className="fr">Obtenir EC + equilibre</span></div>
          <div className="seo-step">4. <span className="en">Export PDF</span><span className="fr">Exporter PDF</span></div>
        </div>
      </SeoSection>

      <SeoSection titleEn="Download AgroCalc Pro" titleFr="Telecharger AgroCalc Pro">
        <div className="seo-cta-box">
          <div>
            <p className="seo-cta-title">
              <span className="en">Your irrigation calculator on Android.</span>
              <span className="fr">Votre calculateur d'irrigation sur Android.</span>
            </p>
            <p className="seo-cta-note">
              <span className="en">Use it offline in the greenhouse.</span>
              <span className="fr">Utilisez-le hors ligne sous serre.</span>
            </p>
          </div>
          <a className="btn btn-primary" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
            <span className="en">Download on Google Play</span>
            <span className="fr">Google Play</span>
          </a>
        </div>
      </SeoSection>
    </main>
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
              title: 'Stage-based targets',
              text: 'Set nutrient ranges per growth phase and export records.',
            },
            {
              title: 'Consistent dosing',
              text: 'Keep A/B/C tanks balanced to stabilize crop response.',
            },
            {
              title: 'Shareable reports',
              text: 'Create PDF reports for technicians and growers.',
            },
          ]}
        />
      </SeoSection>

      <SeoSection titleEn="Why AgroCalc Pro" titleFr="Pourquoi AgroCalc Pro">
        <BulletGrid
          items={[
            {
              title: 'Offline by design',
              text: 'No signal required for daily calculations.',
            },
            {
              title: 'Field-ready',
              text: 'Fast inputs, clear outputs, and reliable math.',
            },
            {
              title: 'Professional results',
              text: 'Clean PDF summaries ready for audits.',
            },
          ]}
        />
      </SeoSection>

      <SeoSection titleEn="Download AgroCalc Pro" titleFr="Telecharger AgroCalc Pro">
        <div className="seo-cta-box">
          <div>
            <p className="seo-cta-title">
              <span className="en">Plan today. Produce better tomorrow.</span>
              <span className="fr">Planifiez aujourd'hui. Produisez mieux demain.</span>
            </p>
            <p className="seo-cta-note">
              <span className="en">Free Android app for agronomists and growers.</span>
              <span className="fr">Appli Android gratuite pour agronomes et producteurs.</span>
            </p>
          </div>
          <a className="btn btn-primary" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
            <span className="en">Download on Google Play</span>
            <span className="fr">Google Play</span>
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
        subtitleFr="Une methode simple pour des solutions NPK equilibrees."
      />

      <SeoSection titleEn="Step-by-step" titleFr="Etapes principales">
        <div className="seo-article">
          <p>
            <span className="en">Start with your target crop dose, water EC, and tank volume. Choose compatible fertilizers and enter quantities in kg. AgroCalc Pro converts them into ionic concentrations (meq/L), checks cation/anion balance, and estimates EC.</span>
            <span className="fr">Commencez par la dose cible, l'EC de l'eau et le volume des bacs. Choisissez des engrais compatibles et saisissez les kg. AgroCalc Pro convertit en concentrations ioniques (meq/L), verifie l'equilibre cations/anions et estime l'EC.</span>
          </p>
          <p>
            <span className="en">Then split fertilizers into A/B/C tanks to avoid precipitation, generate a PDF, and share it with your team.</span>
            <span className="fr">Ensuite, separez les engrais dans les bacs A/B/C pour eviter les precipitations, generez un PDF et partagez-le.</span>
          </p>
        </div>
      </SeoSection>

      <ArticleLinks/>

      <SeoSection titleEn="Try it now" titleFr="Essayez maintenant">
        <div className="seo-cta-box">
          <div>
            <p className="seo-cta-title">
              <span className="en">Free Android app for fertigation calculations.</span>
              <span className="fr">Appli Android gratuite pour vos calculs.</span>
            </p>
            <p className="seo-cta-note">
              <span className="en">Fast, offline, and built for agronomy.</span>
              <span className="fr">Rapide, hors ligne et concu pour l'agronomie.</span>
            </p>
          </div>
          <a className="btn btn-primary" href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
            <span className="en">Download on Google Play</span>
            <span className="fr">Google Play</span>
          </a>
        </div>
      </SeoSection>
    </main>
  )
}

function GuideFaqs({ items }) {
  return (
    <SeoSection titleEn="Frequently asked questions" titleFr="Questions fréquentes">
      <div className="seo-faqs">
        {items.map((item, idx) => (
          <div key={idx} className="seo-faq-item">
            <h3>
              <span className="en">{item.qEn}</span>
              <span className="fr">{item.qFr}</span>
            </h3>
            <p>
              <span className="en">{item.aEn}</span>
              <span className="fr">{item.aFr}</span>
            </p>
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
            <span className="en">{textEn}</span>
            <span className="fr">{textFr}</span>
          </p>
          <p className="seo-cta-note">
            <span className="en">Use AgroCalcPro to validate your formulation before you mix it.</span>
            <span className="fr">Utilisez AgroCalcPro pour valider la formulation avant le mélange.</span>
          </p>
        </div>
        <Link className="btn btn-primary" to={to}>
          <span className="en">{buttonEn}</span>
          <span className="fr">{buttonFr}</span>
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
            <span className="en">Electrical conductivity is not a fertilizer label. It is a quick proxy for the total soluble salts in your solution. In greenhouse crops, that means EC helps you judge whether the mix is too weak, balanced, or too concentrated for the root zone.</span>
            <span className="fr">La conductivité électrique n'est pas une étiquette d'engrais. C'est un indicateur rapide des sels solubles totaux dans votre solution. En serre, l'EC vous dit si le mélange est trop faible, équilibré ou trop concentré pour la zone racinaire.</span>
          </p>
          <p>
            <span className="en">A strong fertigation program watches EC together with crop stage, climate, substrate moisture, and drainage. Two solutions with the same EC can behave differently if one is dominated by nitrogen and the other by potassium and calcium.</span>
            <span className="fr">Un bon programme de fertigation suit l'EC avec le stade cultural, le climat, l'humidité du substrat et le drainage. Deux solutions avec la même EC peuvent réagir différemment si l'une est riche en azote et l'autre en potassium et calcium.</span>
          </p>
        </div>
      </SeoSection>

      <SeoSection titleEn="Practical target ranges" titleFr="Plages cibles pratiques">
        <div className="seo-article">
          <p>
            <span className="en">For most greenhouse systems, a useful starting point is 1.5 to 2.5 mS/cm, then adjust by crop and weather. Young plants usually need lower EC, while fruiting stages tolerate stronger solutions if water quality and drainage are stable.</span>
            <span className="fr">Pour la plupart des serres, un bon point de départ est 1,5 à 2,5 mS/cm, puis on ajuste selon la culture et la météo. Les jeunes plants demandent souvent une EC plus faible, tandis que les stades de fructification tolèrent des solutions plus fortes si l'eau et le drainage restent stables.</span>
          </p>
          <ul className="seo-bullets">
            <li><span className="en">Low EC can mean underfeeding or excess dilution.</span><span className="fr">Une EC faible peut signaler un sous-approvisionnement ou une dilution excessive.</span></li>
            <li><span className="en">High EC can indicate salt accumulation or an overly strong mix.</span><span className="fr">Une EC élevée peut montrer une accumulation de sels ou un mélange trop concentré.</span></li>
            <li><span className="en">Drainage EC is often more important than tank EC for diagnosing root-zone stress.</span><span className="fr">L'EC du drainage est souvent plus utile que celle de la cuve pour diagnostiquer le stress racinaire.</span></li>
          </ul>
        </div>
      </SeoSection>

      <SeoSection titleEn="How to troubleshoot EC" titleFr="Comment dépanner l'EC">
        <div className="seo-article">
          <p>
            <span className="en">If EC rises unexpectedly, check water source changes, injector drift, clogged filters, and seasonal evaporation. If EC falls, inspect stock concentrations, dosing errors, and whether the crop has simply entered a faster uptake phase.</span>
            <span className="fr">Si l'EC monte soudainement, vérifiez les changements de l'eau source, la dérive d'injection, les filtres bouchés et l'évaporation saisonnière. Si l'EC baisse, contrôlez les concentrations des bacs, les erreurs de dosage et le stade de consommation de la culture.</span>
          </p>
          <p>
            <span className="en">AgroCalcPro helps by showing ionic balance, estimated EC, and fertilizer concentration in one place. That makes it easier to separate a chemistry problem from a dosing problem.</span>
            <span className="fr">AgroCalcPro aide en affichant l'équilibre ionique, l'EC estimée et la concentration des engrais au même endroit. On distingue plus facilement un problème chimique d'un problème de dosage.</span>
          </p>
        </div>
      </SeoSection>

      <GuideFaqs
        items={[
          {
            qEn: 'What EC is safe for greenhouse crops?',
            qFr: 'Quelle EC est sûre pour les cultures sous serre ?',
            aEn: 'It depends on the crop and growth stage, but 1.5 to 2.5 mS/cm is a common working range for many fertigation systems.',
            aFr: "Cela dépend de la culture et du stade, mais 1,5 à 2,5 mS/cm reste une plage de travail courante.",
          },
          {
            qEn: 'Should I look at tank EC or drainage EC?',
            qFr: "Faut-il regarder l'EC du bac ou du drainage ?",
            aEn: 'Use both, but drainage EC is often more useful for seeing what the roots are really experiencing.',
            aFr: "Les deux comptent, mais l'EC du drainage est souvent plus utile pour voir ce que vivent réellement les racines.",
          },
        ]}
      />

      <ArticleLinks/>

      <ArticleCallout
        titleEn="Try AgroCalcPro for EC checks"
        titleFr="Essayez AgroCalcPro pour l'EC"
        textEn="Professional EC and ionic balance checks in one mobile app."
        textFr="Contrôle EC et équilibre ionique dans une seule application mobile."
        to="/irrigation-calculator"
        buttonEn="Open Irrigation Calculator"
        buttonFr="Ouvrir le calculateur"
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
            <span className="en">In concentrated stock solutions, calcium can react with phosphates and sulfates to form insoluble deposits. That is why a proper fertilizer calculator does not stop at doses; it also needs tank compatibility logic.</span>
            <span className="fr">Dans les solutions mères concentrées, le calcium peut réagir avec les phosphates et les sulfates et former des dépôts insolubles. C'est pourquoi un bon calculateur d'engrais ne s'arrête pas aux doses ; il doit aussi gérer la compatibilité des bacs.</span>
          </p>
          <p>
            <span className="en">A/B/C separation is a practical way to keep the injector stable. Tank A usually carries calcium, Tank B holds the main fertilizer mix, and Tank C can be reserved for acid or pH correction.</span>
            <span className="fr">La séparation A/B/C garde l'injection stable. Le Bac A contient souvent le calcium, le Bac B la solution principale, et le Bac C l'acide ou la correction du pH.</span>
          </p>
        </div>
      </SeoSection>

      <SeoSection titleEn="A simple mixing workflow" titleFr="Un flux de mélange simple">
        <div className="seo-article">
          <ol className="seo-ordered">
            <li><span className="en">List the fertilizers and identify the ions that must not meet in the same tank.</span><span className="fr">Lister les engrais et repérer les ions qui ne doivent pas se rencontrer dans le même bac.</span></li>
            <li><span className="en">Assign calcium products to Tank A and phosphorus/sulfate products to Tank B.</span><span className="fr">Affecter les produits calciques au Bac A et les produits phosphatés/sulfatés au Bac B.</span></li>
            <li><span className="en">Use Tank C only when you need acidification or pH correction.</span><span className="fr">Utiliser le Bac C seulement pour l'acidification ou la correction du pH.</span></li>
            <li><span className="en">Check the final concentrations so both stock tanks empty at the same pace.</span><span className="fr">Vérifier les concentrations finales pour que les bacs se vident au même rythme.</span></li>
          </ol>
        </div>
      </SeoSection>

      <SeoSection titleEn="Common mistakes" titleFr="Erreurs fréquentes">
        <div className="seo-article">
          <ul className="seo-bullets">
            <li><span className="en">Putting calcium nitrate with phosphoric acid in the same concentrate.</span><span className="fr">Mettre le nitrate de calcium avec l'acide phosphorique dans le même concentré.</span></li>
            <li><span className="en">Forgetting that temperature and concentration both affect precipitation risk.</span><span className="fr">Oublier que la température et la concentration influencent le risque de précipitation.</span></li>
            <li><span className="en">Assuming a recipe that works in one water source will work everywhere.</span><span className="fr">Supposer qu'une recette valable sur une eau fonctionnera partout.</span></li>
          </ul>
        </div>
      </SeoSection>

      <GuideFaqs
        items={[
          {
            qEn: 'Why split fertilizers into A/B/C tanks?',
            qFr: 'Pourquoi séparer les engrais en bacs A/B/C ?',
            aEn: 'To avoid precipitation, protect injectors, and keep stock solutions stable during storage.',
            aFr: 'Pour éviter les précipitations, protéger les injecteurs et garder des solutions stables au stockage.',
          },
          {
            qEn: 'Can I put acid in Tank A?',
            qFr: "Puis-je mettre l'acide dans le Bac A ?",
            aEn: 'Usually no; acid is commonly isolated in Tank C so it does not interfere with calcium or phosphorus.',
            aFr: "En général non ; l'acide est plutôt isolé dans le Bac C pour éviter les interactions avec calcium ou phosphore.",
          },
        ]}
      />

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
            <span className="en">Tomatoes respond strongly to changes in EC and potassium supply. In early vegetative growth, the goal is to build leaf area without overloading the root zone. During flowering and fruiting, the plant typically needs a stronger and more potassium-focused solution.</span>
            <span className="fr">La tomate réagit fortement aux variations d'EC et d'apport en potassium. En croissance végétative, l'objectif est de construire la surface foliaire sans surcharger la zone racinaire. En floraison et fructification, la plante demande souvent une solution plus forte et plus riche en potassium.</span>
          </p>
          <p>
            <span className="en">A practical tomato program is not only about the total NPK numbers. It is also about the form of nitrogen, the balance of calcium and magnesium, and the way the tank recipe behaves in the injector.</span>
            <span className="fr">Un programme tomate pratique ne se limite pas aux chiffres NPK. Il faut aussi regarder la forme de l'azote, l'équilibre calcium/magnésium et le comportement de la recette dans l'injecteur.</span>
          </p>
        </div>
      </SeoSection>

      <SeoSection titleEn="What to watch during fruiting" titleFr="À surveiller pendant la fructification">
        <div className="seo-article">
          <ul className="seo-bullets">
            <li><span className="en">Keep EC stable so fruit set is not disturbed by sudden salt spikes.</span><span className="fr">Maintenir l'EC stable pour éviter que la nouaison soit perturbée par des pics de sels.</span></li>
            <li><span className="en">Use enough calcium to support fruit quality and reduce blossom-end rot risk.</span><span className="fr">Prévoir assez de calcium pour soutenir la qualité des fruits et réduire le risque de nécrose apicale.</span></li>
            <li><span className="en">Avoid excessive ammonium in fruiting stages, because tomatoes generally prefer a nitrate-dominant supply.</span><span className="fr">Éviter un excès d'ammonium en fructification, car la tomate préfère généralement une nutrition dominante en nitrate.</span></li>
          </ul>
        </div>
      </SeoSection>

      <SeoSection titleEn="How AgroCalcPro helps" titleFr="Comment AgroCalcPro aide">
        <div className="seo-article">
          <p>
            <span className="en">AgroCalcPro shows the ionic balance, tank distribution, and PDF report in one workflow. That makes it much easier to compare a tomato recipe across stages, especially when adjusting potassium, calcium, and EC together.</span>
            <span className="fr">AgroCalcPro affiche l'équilibre ionique, la distribution des bacs et le rapport PDF dans un seul flux. On compare plus facilement une recette tomate entre les stades, surtout lors des ajustements simultanés de potassium, calcium et EC.</span>
          </p>
        </div>
      </SeoSection>

      <GuideFaqs
        items={[
          {
            qEn: 'What EC do tomatoes usually need?',
            qFr: 'Quelle EC faut-il pour la tomate ?',
            aEn: 'It varies by cultivar and climate, but many greenhouse programs work around 2.0 to 3.5 mS/cm.',
            aFr: 'Cela dépend du cultivar et du climat, mais beaucoup de programmes travaillent autour de 2,0 à 3,5 mS/cm.',
          },
          {
            qEn: 'Why does tomato fertigation need more potassium later?',
            qFr: 'Pourquoi plus de potassium plus tard ?',
            aEn: 'Potassium supports fruit sizing, coloration, and overall fruit quality during the reproductive stages.',
            aFr: 'Le potassium soutient le grossissement, la coloration et la qualité générale des fruits pendant les stades reproductifs.',
          },
        ]}
      />

      <ArticleLinks/>

      <ArticleCallout
        titleEn="Build your tomato recipe in AgroCalcPro"
        titleFr="Construisez votre recette tomate dans AgroCalcPro"
        textEn="Calculate targets, compare stages, and export the report."
        textFr="Calculez les cibles, comparez les stades et exportez le rapport."
        to="/crop-planning"
        buttonEn="Open Crop Planning"
        buttonFr="Ouvrir la planification"
      />
    </main>
  )
}
