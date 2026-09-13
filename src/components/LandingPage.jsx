import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Redesign.css'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)
const useBrowserLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const STORE = 'https://play.google.com/store/apps/details?id=com.soufyanedev.agrocalcpro'
export function T({ en, fr }) { return <><span className="en">{en}</span><span className="fr">{fr}</span></> }
export function Arrow() { return <span aria-hidden="true">↗</span> }
export function StoreButton() { return <a className="ac-button" href={STORE} target="_blank" rel="noreferrer"><svg width="20" height="22" viewBox="0 0 20 22" fill="currentColor" aria-hidden="true"><path d="M1 1v20l17-10L1 1Z" /></svg><T en="Get AgroCalc Pro" fr="Télécharger AgroCalc Pro"/><Arrow/></a> }
const steps = [
  { label: ['YOUR INPUTS', 'VOS DONNÉES'], title: ['Start with your field.', 'Commencez par votre terrain.'], text: ['Enter your fertilizer quantities, tank volume, field area, and water EC. Keep the details of your formulation in one place.', 'Saisissez les quantités d’engrais, le volume des bacs, la surface et l’EC de l’eau. Retrouvez toute votre formulation au même endroit.'], detail: ['Fertilizers · Volume · Surface area', 'Engrais · Volume · Surface'], screen: 'calculator' },
  { label: ['YOUR ANALYSIS', 'VOTRE ANALYSE'], title: ['See the whole balance.', 'Visualisez chaque équilibre.'], text: ['Turn your inputs into a clear picture of ionic balance, electrical conductivity, and nutrient units per hectare. Review the numbers before you mix.', 'Visualisez la balance ionique, la conductivité électrique et les unités fertilisantes par hectare. Vérifiez vos résultats avant le mélange.'], detail: ['Ionic balance · EC · NPK', 'Balance ionique · EC · NPK'], screen: 'ionic' },
  { label: ['YOUR NEXT STEP', 'LA SUITE'], title: ['Take it to the field.', 'Passez au terrain.'], text: ['Review your A/B/C tank distribution, then export a complete PDF report. Give your team the same clear formulation to work from.', 'Vérifiez la répartition dans les bacs A/B/C, puis exportez un rapport PDF complet. Partagez une formulation claire avec votre équipe.'], detail: ['Tank distribution · PDF export', 'Répartition des bacs · Export PDF'], screen: 'pdf' },
]
function Phone() { return <div className="ac-phone" aria-hidden="true"><div className="ac-phone-float"><div className="ac-phone-back"/><div className="ac-phone-side ac-side-left"/><div className="ac-phone-side ac-side-right"/><div className="ac-phone-cap ac-cap-top"/><div className="ac-phone-cap ac-cap-bottom"/><div className="ac-phone-front"><div className="ac-screen">{['home', ...steps.map(s => s.screen)].map((s, i) => <img className={`ac-screen-layer ac-screen-${i}`} key={s} src={`/screens/${s}.jpeg`} alt="" fetchPriority={i === 0 ? 'high' : 'auto'} />)}</div><div className="ac-camera"/></div></div></div> }
function Story() {
  const root = useRef(null)
  useBrowserLayoutEffect(() => {
    const mm = gsap.matchMedia()
    // Float the phone's inner shell so the scroll timeline owns its outer transform.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const shell = root.current.querySelector('.ac-phone-float')
      const idle = gsap.to(shell, { y: -10, duration: 1.7, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true })
      let atTop
      let settle
      const syncIdle = () => {
        const next = window.scrollY < 8
        if (next === atTop) return
        atTop = next
        settle?.kill()
        if (next) idle.restart()
        else {
          idle.pause()
          settle = gsap.to(shell, { y: 0, duration: .3, ease: 'power2.out' })
        }
      }
      syncIdle()
      window.addEventListener('scroll', syncIdle, { passive: true })
      return () => {
        window.removeEventListener('scroll', syncIdle)
        idle.kill()
        settle?.kill()
      }
    }, root)
    mm.add('(min-width: 901px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', () => {
      const el = root.current
      const phone = el.querySelector('.ac-phone')
      const copy = el.querySelectorAll('.ac-story-copy')
      const screens = el.querySelectorAll('.ac-screen-layer')
      const cta = el.querySelector('.ac-story-cta')
      gsap.set(cta, { autoAlpha: 0 })
      const travel = () => Math.min(el.clientWidth * .255, 320)
      gsap.set(phone, { x: travel(), rotationY: -19, rotationX: 6, rotationZ: 7 })
      gsap.set(copy, { x: -travel(), autoAlpha: 0 })
      gsap.set(copy[0], { autoAlpha: 1 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: el.querySelector('.ac-scene'), start: 'top 80px', end: () => `+=${window.innerHeight * 4.4}`, scrub: .7, pin: true, invalidateOnRefresh: true, onRefresh: () => { gsap.set(copy[0], { x: -travel() }) } } })
      steps.forEach((_, i) => {
        const at = .4 + i * 1.4
        const side = i % 2 === 0 ? -1 : 1
        tl.to(copy[i], { autoAlpha: 0, y: -20, duration: .25 }, at)
          .to(phone, { x: () => side * travel(), rotationY: side * -16, rotationX: i % 2 ? 5 : -3, rotationZ: side * 4, duration: .95, ease: 'power2.inOut' }, at)
          .set(copy[i + 1], { x: () => -side * travel(), y: 24 }, at)
          .to(copy[i + 1], { autoAlpha: 1, y: 0, duration: .4 }, at + .65)
          .to(screens[i], { opacity: 0, duration: .35 }, at + .3)
          .to(screens[i + 1], { opacity: 1, duration: .35 }, at + .3)
          .to(el.querySelector('.ac-progress-fill'), { scaleX: (i + 1) / 4, duration: .95 }, at)
      })
      // One final landing: the same phone moves into a centered download moment.
      const finish = 4.6
      tl.to(copy[3], { autoAlpha: 0, y: -20, duration: .3 }, finish)
        .to(phone, {
          x: 0, y: () => el.querySelector('.ac-scene').clientHeight * .02,
          scale: () => Math.min(.68, (el.querySelector('.ac-scene').clientHeight - 300) / phone.offsetHeight),
          rotationX: 0, rotationY: 0, rotationZ: 0,
          duration: 1.2, ease: 'power2.inOut',
        }, finish)
        .to(screens[3], { opacity: 0, duration: .35 }, finish + .35)
        .to(screens[0], { opacity: 1, duration: .35 }, finish + .35)
        .to(cta, { autoAlpha: 1, duration: .45 }, finish + .7)
        .to(el.querySelector('.ac-progress-fill'), { scaleX: 1, duration: 1.2 }, finish)
        .to(el.querySelector('.ac-scene-bottom'), { autoAlpha: 0, duration: .3 }, finish)
        .to({}, { duration: .65 })
      return () => tl.scrollTrigger?.kill()
    }, root)
    return () => mm.revert()
  }, [])
  return <div className="ac-journey" ref={root}>
    <div id="how-it-works" className="ac-story-anchor"/>
    <section className="ac-scene" aria-label="AgroCalc Pro product walkthrough">
      <div className="ac-orbit ac-orbit-one" aria-hidden="true"/><div className="ac-orbit ac-orbit-two" aria-hidden="true"/>
      <div className="ac-scene-inner">
        <div className="ac-story-copy ac-hero-copy">
          <div className="ac-eyebrow"><span className="ac-dot"/><T en="PRECISION, IN YOUR POCKET" fr="LA PRÉCISION, EN POCHE"/></div>
          <h1><T en={<>Better balance.<br/>Better <em>growing.</em></>} fr={<>Mieux équilibrer.<br/>Mieux <em>cultiver.</em></>}/></h1>
          <p className="ac-intro"><T en="From fertilizer quantities to a field-ready plan. Make sense of your crop nutrition with AgroCalc Pro, your pocket fertigation calculator." fr="Des quantités d’engrais à un plan pour le terrain. Maîtrisez la nutrition de vos cultures avec AgroCalc Pro, votre calculateur de fertigation de poche."/></p>
          <div className="ac-actions"><StoreButton/><a className="ac-text-link" href="#how-it-works"><T en="See how it works" fr="Voir le fonctionnement"/><span aria-hidden="true">↓</span></a></div>
          <p className="ac-micro"><T en="Free for Android. No account. Works offline." fr="Gratuit sur Android. Sans compte. Hors ligne."/></p>
          <div className="ac-hero-facts"><div><strong>NPK</strong><span><T en="Made clear" fr="En toute clarté"/></span></div><div><strong>A / B / C</strong><span><T en="Tanks, balanced" fr="Bacs équilibrés"/></span></div><div><strong>100%</strong><span><T en="Offline calculations" fr="Calculs hors ligne"/></span></div></div>
        </div>
        <div className="ac-phone-stage"><div className="ac-phone-halo"/><Phone/></div>
        {steps.map((s, i) => <article className="ac-story-copy ac-step-copy" key={s.screen}><div className="ac-eyebrow"><span className="ac-step-index">0{i + 1} / 03</span><T en={s.label[0]} fr={s.label[1]}/></div><h2><T en={s.title[0]} fr={s.title[1]}/></h2><p className="ac-intro"><T en={s.text[0]} fr={s.text[1]}/></p><div className="ac-step-detail"><span aria-hidden="true">✓</span><T en={s.detail[0]} fr={s.detail[1]}/></div><img className="ac-mobile-screen" src={`/screens/${s.screen}.jpeg`} alt={`AgroCalc Pro ${s.screen} screen`} loading="lazy"/></article>)}
        <div className="ac-story-cta">
          <div className="ac-story-cta-heading"><div className="ac-eyebrow"><T en="FROM THE DEMO TO YOUR FIELD" fr="DE LA DÉMO À VOTRE TERRAIN"/></div><h2><T en={<>Your next step.<br/><em>In your pocket.</em></>} fr={<>La prochaine étape.<br/><em>Dans votre poche.</em></>}/></h2></div>
          <img className="ac-cta-static-phone" src="/screens/home.jpeg" alt="AgroCalc Pro home screen" loading="lazy"/>
          <div className="ac-story-cta-actions"><StoreButton/><p className="ac-micro"><T en="Free for Android · Works offline · No account" fr="Gratuit sur Android · Hors ligne · Sans compte"/></p></div>
        </div>
      </div>
      <div className="ac-scene-bottom"><span><T en="DESIGNED FOR THE WAY YOU GROW" fr="PENSÉ POUR VOTRE TERRAIN"/></span><div className="ac-scroll-hint"><T en="Scroll to explore" fr="Défilez pour découvrir"/><span aria-hidden="true">↓</span></div><span className="ac-preview-label"><T en="THE REAL APP. IN YOUR HANDS." fr="LA VRAIE APP. ENTRE VOS MAINS."/></span></div><div className="ac-progress"><div className="ac-progress-fill"/></div>
    </section>
  </div>
}
const features = [
  ['01', 'Understand your solution.', 'Comprenez votre solution.', 'Read ionic balance and EC together, with nutrient quantities per hectare. All the numbers that matter, in one analysis.', 'Consultez la balance ionique, l’EC et les quantités par hectare. Tous les chiffres utiles dans une seule analyse.', 'NPK / EC'],
  ['02', 'Give every input its place.', 'Chaque engrais à sa place.', 'Organize fertilizers into A, B, and C tanks with compatibility-aware distribution and concentration balancing.', 'Répartissez vos engrais dans les bacs A, B et C en tenant compte des compatibilités et de l’équilibre des concentrations.', 'A / B / C'],
  ['03', 'Keep everyone on the same page.', 'Un rapport pour toute l’équipe.', 'Export the full formulation as a PDF. Share your analysis with a colleague, a grower, or your field team.', 'Exportez la formulation complète en PDF. Partagez votre analyse avec un collègue, un producteur ou votre équipe.', 'PDF ↗'],
]
export default function LandingPage() {
  return <main className="ac-landing" id="landing-page"><Story/>
    <section className="ac-benefits ac-wrap" id="features"><div className="ac-section-heading"><div><div className="ac-eyebrow"><T en="LESS SPREADSHEET. MORE FIELD." fr="MOINS DE TABLEURS. PLUS DE TERRAIN."/></div><h2><T en={<>Complex calculations.<br/><em>Clear decisions.</em></>} fr={<>Des calculs complexes.<br/><em>Des décisions claires.</em></>}/></h2></div><p><T en="Built for agronomists and growers who need practical answers, wherever the day takes them." fr="Pensé pour les agronomes et producteurs qui ont besoin de réponses pratiques, où qu’ils soient."/></p></div><div className="ac-feature-grid">{features.map(f => <article className="ac-feature" key={f[0]}><div className="ac-feature-top"><span>{f[0]}</span><span>{f[5]}</span></div><h3><T en={f[1]} fr={f[2]}/></h3><p><T en={f[3]} fr={f[4]}/></p></article>)}</div></section>
    <section className="ac-fertilizers-teaser ac-wrap" id="supported-fertilizers"><div className="ac-fertilizers-number" aria-hidden="true">14<span>N / P / K</span></div><div><div className="ac-eyebrow"><T en="SUPPORTED FERTILIZERS" fr="ENGRAIS PRIS EN CHARGE"/></div><h2><T en="14 Fertilizers. Complete Coverage." fr="14 engrais. Une couverture complète."/></h2><p><T en="Check the full list of supported inputs and their standard tank assignments." fr="Consultez la liste des intrants pris en charge et leur répartition standard dans les bacs."/></p><Link className="ac-text-link" to="/supported-fertilizers"><T en="Explore all 14 fertilizers" fr="Découvrir les 14 engrais"/><Arrow/></Link></div></section>
    <section className="ac-field" id="about"><div className="ac-wrap ac-field-grid"><div className="ac-field-art" aria-hidden="true"><div className="ac-field-sun"/><div className="ac-field-lines"/><span>ROOTED IN PRECISION</span><div className="ac-field-stamp">N<br/><span>P · K</span></div></div><div className="ac-field-copy"><div className="ac-eyebrow"><T en="AT HOME IN THE FIELD" fr="À L’AISE SUR LE TERRAIN"/></div><h2><T en={<>Good work doesn’t<br/>wait for <em>Wi-Fi.</em></>} fr={<>Le terrain n’attend<br/>pas le <em>Wi-Fi.</em></>}/></h2><p><T en="In the greenhouse. Beside the tanks. Out in the field. Your calculations run on your phone, so your workflow keeps moving even when your connection doesn’t." fr="Sous serre, près des bacs ou au champ. Les calculs s’effectuent sur votre téléphone : votre travail avance, même sans connexion."/></p><div className="ac-field-notes"><span><T en="No internet needed" fr="Sans connexion"/></span><span><T en="No account to create" fr="Sans compte"/></span><span><T en="Your data stays yours" fr="Vos données restent à vous"/></span></div></div></div></section>
    <section className="ac-gallery ac-wrap" id="screenshots"><div className="ac-section-heading"><div><div className="ac-eyebrow"><T en="A CLOSER LOOK" fr="DE PLUS PRÈS"/></div><h2><T en={<>Every detail.<br/><em>One place.</em></>} fr={<>Chaque détail.<br/><em>Au même endroit.</em></>}/></h2></div><p><T en="Explore the actual AgroCalc Pro screens, from your first input to the finished report." fr="Découvrez les vrais écrans d’AgroCalc Pro, de la première saisie au rapport final."/></p></div><div className="ac-gallery-grid">{[['calculator', '01 / Formulation'], ['ionic', '02 / Analyse'], ['bacs', '03 / A · B · C'], ['pdf', '04 / PDF']].map(([screen, label]) => <figure key={screen}><div className="ac-gallery-image"><img src={`/screens/${screen}.jpeg`} alt={`AgroCalc Pro — ${label}`} loading="lazy" width="540" height="1160"/></div><figcaption>{label}</figcaption></figure>)}</div></section>
    <section className="ac-resources ac-wrap" id="guides"><div className="ac-eyebrow"><T en="THE FIELD NOTES" fr="LES NOTES DU TERRAIN"/></div><h2><T en="A little knowledge. Better decisions." fr="Mieux comprendre. Mieux décider."/></h2><Link to="/blog" className="ac-text-link ac-blog-all"><T en="Explore all Field Notes" fr="Toutes les notes du terrain"/><Arrow/></Link><div className="ac-resource-list">{[['/blog/how-to-calculate-fertilizer', '01', 'From fertilizer to formulation', 'Des engrais à la formulation'], ['/blog/ec-in-greenhouse-crops', '02', 'Making sense of electrical conductivity', 'Comprendre la conductivité électrique'], ['/blog/how-to-mix-a-b-c-tanks', '03', 'Understanding A/B/C tank mixing', 'Comprendre le mélange des bacs A/B/C']].map(([url, n, en, fr]) => <Link to={url} key={url}><span>{n}</span><h3><T en={en} fr={fr}/></h3><Arrow/></Link>)}</div></section>
    <section className="ac-faq ac-wrap" id="faq"><div><div className="ac-eyebrow"><T en="GOOD TO KNOW" fr="BON À SAVOIR"/></div><h2><T en={<>A few field<br/><em>questions.</em></>} fr={<>Quelques<br/><em>questions.</em></>}/></h2></div><div>{[
      ['Is AgroCalc Pro free?', 'AgroCalc Pro is available free on Android. Follow the Google Play link to download the app.', 'AgroCalc Pro est-il gratuit ?', 'AgroCalc Pro est disponible gratuitement sur Android. Suivez le lien Google Play pour télécharger l’application.'],
      ['Can I use it without internet?', 'Yes. The app performs its calculations locally on your phone. You can calculate in the field without an internet connection or an account.', 'Puis-je l’utiliser sans internet ?', 'Oui. Les calculs sont effectués localement sur votre téléphone, sans connexion internet et sans compte.'],
      ['Can I share my results?', 'Yes. Export a complete PDF report of your formulation and analysis, then share it using your phone’s sharing options.', 'Puis-je partager mes résultats ?', 'Oui. Exportez un rapport PDF complet de votre formulation et de votre analyse, puis partagez-le depuis votre téléphone.'],
      ['Is it available for iPhone?', 'AgroCalc Pro is currently available for Android. Use the Google Play button to view its store listing and device compatibility.', 'Est-il disponible sur iPhone ?', 'AgroCalc Pro est actuellement disponible sur Android. Consultez sa fiche Google Play pour la compatibilité des appareils.'],
    ].map(([q, a, qf, af]) => <details key={q}><summary><T en={q} fr={qf}/><span aria-hidden="true">+</span></summary><p><T en={a} fr={af}/></p></details>)}</div></section>
    <section className="ac-download" id="download"><div className="ac-wrap"><div className="ac-eyebrow"><span className="ac-dot"/><T en="YOUR NEXT GROWING SEASON STARTS HERE" fr="VOTRE PROCHAINE SAISON COMMENCE ICI"/></div><h2><T en={<>Put precision<br/>in your <em>pocket.</em></>} fr={<>La précision<br/>dans votre <em>poche.</em></>}/></h2><StoreButton/><p><T en="Free for Android · Works offline · No account required" fr="Gratuit sur Android · Hors ligne · Sans compte"/></p><div className="ac-download-mark" aria-hidden="true">↗</div></div></section>
  </main>
}

