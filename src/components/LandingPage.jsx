import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link, T, useLang, pick } from '../lib/i18n'
import Icon from './Icon'
import './Redesign.css'
import { PLAY_STORE_URL, webTools } from '../content/site'
import { faqs } from '../content/faqs'
import { blogPosts, blogPath } from '../content/blog'

export function Arrow() { return <Icon name="arrow-up-right"/> }

const playIcon = <svg width="18" height="20" viewBox="0 0 20 22" fill="currentColor" aria-hidden="true"><path d="M1 1v20l17-10L1 1Z"/></svg>

export function StoreButton({ light = false }) {
  const lang = useLang()
  const href = lang === 'en' ? PLAY_STORE_URL : PLAY_STORE_URL + '&hl=' + lang
  return <a className={'ac-button' + (light ? ' ac-button-light' : '')} href={href} target="_blank" rel="noreferrer">{playIcon}<T en="Get it on Google Play" fr="Disponible sur Google Play" es="Disponible en Google Play"/></a>
}


const useBrowserLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
// GSAP only drives the home-page story, so it loads on demand instead of in every page's bundle.
// The pinned walkthrough only runs on large screens; phones get a CSS float and never download GSAP.
const STORY_MEDIA = '(min-width: 901px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)'
const loadGsap = () => Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => { gsap.registerPlugin(ScrollTrigger); return gsap })

const steps = [
  { screen: 'calc',
    title: ['Enter what you used.', 'Saisissez ce que vous utilisez.', 'Introduzca lo que utiliza.'],
    text: ['Type the kilograms of each fertilizer for one application. Only the irrigation volume is required: water EC, area and stock volume are optional and simply unlock more results.', 'Indiquez les kilogrammes de chaque engrais pour un apport. Seul le volume d’irrigation est obligatoire : l’EC de l’eau, la superficie et la solution mère sont facultatives et débloquent simplement plus de résultats.', 'Indique los kilogramos de cada fertilizante para un riego. Solo el volumen de riego es obligatorio: la CE del agua, la superficie y la solución madre son opcionales y simplemente añaden más resultados.'],
    detail: ['14 fertilizers, one required value', '14 engrais, une seule valeur obligatoire', '14 fertilizantes, un solo valor obligatorio'] },
  { screen: 'ionic',
    title: ['Read the whole balance.', 'Lisez tout l’équilibre.', 'Lea todo el equilibrio.'],
    text: ['Nine ions in meq/L, the estimated EC, N-P₂O₅-K₂O units per hectare and the nitrate / ammonium split. If a value looks unrealistic, the app tells you to check your inputs.', 'Neuf ions en meq/L, l’EC estimée, les unités N-P₂O₅-K₂O par hectare et la part nitrate / ammonium. Si une valeur paraît irréaliste, l’application vous invite à vérifier vos saisies.', 'Nueve iones en meq/L, la CE estimada, las unidades N-P₂O₅-K₂O por hectárea y la proporción nitrato / amonio. Si un valor parece irreal, la app le pide que revise los datos.'],
    detail: ['Ionic balance, EC and units per hectare', 'Équilibre ionique, EC et unités par hectare', 'Equilibrio iónico, CE y unidades por hectárea'] },
  { screen: 'norm',
    title: ['Compare with your crop.', 'Comparez à votre culture.', 'Compare con su cultivo.'],
    text: ['Pick a reference standard (tomato by stage, greenhouse pepper, rose, strawberry and more) and see each ion marked on target, low or high.', 'Choisissez une norme de référence (tomate par stade, poivron de serre, rosier, fraisier…) et voyez chaque ion marqué dans la cible, faible ou élevé.', 'Elija una norma de referencia (tomate por etapa, pimiento de invernadero, rosa, fresa…) y vea cada ion marcado como en objetivo, bajo o alto.'],
    detail: ['Crop standards with live status', 'Normes de culture avec statut en direct', 'Normas de cultivo con estado en tiempo real'] },
  { screen: 'tanks',
    title: ['Prepare the tanks.', 'Préparez les bacs.', 'Prepare los tanques.'],
    text: ['Calcium goes to tank A, sulfates and phosphates to tank B, nitric acid to tank C. Tanks A and B are balanced so they empty together, then everything exports as a PDF report.', 'Le calcium va dans le bac A, sulfates et phosphates dans le bac B, l’acide nitrique dans le bac C. Les bacs A et B sont équilibrés pour se vider ensemble, puis tout s’exporte en rapport PDF.', 'El calcio va al tanque A, los sulfatos y fosfatos al tanque B y el ácido nítrico al tanque C. Los tanques A y B se equilibran para vaciarse a la vez y todo se exporta en un informe PDF.'],
    detail: ['A/B/C tanks and PDF report', 'Bacs A/B/C et rapport PDF', 'Tanques A/B/C e informe PDF'] },
]
const N = steps.length

// Screens include the status-bar space; the bar itself is drawn on top (white over the green home header).
function Phone() {
  const lang = useLang()
  const screens = ['home', ...steps.map(st => st.screen)]
  return <div className="ac-phone" aria-hidden="true"><div className="ac-phone-float"><div className="ac-phone-back"/><div className="ac-phone-side ac-side-left"/><div className="ac-phone-side ac-side-right"/><div className="ac-phone-cap ac-cap-top"/><div className="ac-phone-cap ac-cap-bottom"/><div className="ac-phone-front"><div className="ac-screen">
    {screens.map((name, i) => <div className={`ac-screen-layer ac-screen-${i}`} key={name}>
      <img src={`/screens/${lang}/${name}.webp`} alt="" width="590" height="1279" fetchPriority={i === 0 ? 'high' : 'low'} decoding={i === 0 ? 'sync' : 'async'}/>
      <span className={'ac-status' + (name === 'home' ? ' is-light' : '')}>9:41</span>
    </div>)}
  </div><div className="ac-camera"/></div></div></div>
}

function Story() {
  const lang = useLang()
  const root = useRef(null)
  const trigger = useRef(null) // the pinned ScrollTrigger, used by the step dots
  useBrowserLayoutEffect(() => {
    let mm
    let cancelled = false
    let started = false
    const story = window.matchMedia(STORY_MEDIA)
    const start = () => {
      if (started || !story.matches) return
      started = true
      loadGsap().then(gsap => { if (!cancelled) mm = animate(gsap) })
    }
    start()
    story.addEventListener('change', start)
    return () => { cancelled = true; story.removeEventListener('change', start); mm?.revert() }
  }, [])
  function animate(gsap) {
    const mm = gsap.matchMedia()
    // Float the phone's inner shell so the scroll timeline owns its outer transform.
    mm.add(STORY_MEDIA, () => {
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
    mm.add(STORY_MEDIA, () => {
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
      let sync = () => {}
      const tl = gsap.timeline({ scrollTrigger: { onUpdate: st => sync(st), trigger: el.querySelector('.ac-scene'), start: 'top 68px', end: () => `+=${window.innerHeight * (.7 * N + .8)}`, scrub: .7, pin: true, invalidateOnRefresh: true, onRefresh: () => { gsap.set(copy[0], { x: -travel() }) } } })
      steps.forEach((_, i) => {
        const at = .4 + i * 1.4
        const side = i % 2 === 0 ? -1 : 1
        tl.to(copy[i], { autoAlpha: 0, y: -20, duration: .25 }, at)
          .to(phone, { x: () => side * travel(), rotationY: side * -16, rotationX: i % 2 ? 5 : -3, rotationZ: side * 4, duration: .95, ease: 'power2.inOut' }, at)
          .set(copy[i + 1], { x: () => -side * travel(), y: 24 }, at)
          .to(copy[i + 1], { autoAlpha: 1, y: 0, duration: .4 }, at + .65)
          .to(screens[i], { opacity: 0, duration: .35 }, at + .3)
          .to(screens[i + 1], { opacity: 1, duration: .35 }, at + .3)
          .to(el.querySelector('.ac-progress-fill'), { scaleX: (i + 1) / (N + 1), duration: .95 }, at)
      })
      // One final landing: the same phone moves into a centered download moment.
      const finish = .4 + N * 1.4
      tl.to(copy[N], { autoAlpha: 0, y: -20, duration: .3 }, finish)
        .to(phone, {
          x: 0, y: () => el.querySelector('.ac-scene').clientHeight * .02,
          scale: () => Math.min(.68, (el.querySelector('.ac-scene').clientHeight - 300) / phone.offsetHeight),
          rotationX: 0, rotationY: 0, rotationZ: 0,
          duration: 1.2, ease: 'power2.inOut',
        }, finish)
        .to(screens[N], { opacity: 0, duration: .35 }, finish + .35)
        .to(screens[0], { opacity: 1, duration: .35 }, finish + .35)
        .to(cta, { autoAlpha: 1, duration: .45 }, finish + .7)
        .to(el.querySelector('.ac-progress-fill'), { scaleX: 1, duration: 1.2 }, finish)
        .to(el.querySelector('.ac-scene-bottom'), { autoAlpha: 0, duration: .3 }, finish)
        .to({}, { duration: .65 })
      const total = tl.duration()
      // Timeline position where each moment is fully shown: hero, steps 1..N, then the final download moment
      const marks = [0, ...steps.map((_, i) => (.4 + i * 1.4 + 1) / total), 1]
      const dots = el.querySelectorAll('.ac-story-dots button')
      dots.forEach((dot, i) => { dot.dataset.progress = marks[i] })
      sync = st => {
        let current = 0
        marks.forEach((mark, i) => { if (st.progress >= mark - .04) current = i })
        dots.forEach((dot, i) => dot.setAttribute('aria-current', i === current ? 'step' : 'false'))
      }
      sync(tl.scrollTrigger)
      trigger.current = tl.scrollTrigger
      el.classList.add('is-animated')
      return () => { el.classList.remove('is-animated'); trigger.current = null; tl.scrollTrigger?.kill() }
    }, root)
    return mm
  }
  return <div className="ac-journey" ref={root}>
    <div id="how-it-works" className="ac-story-anchor"/>
    <section className="ac-scene" aria-label={pick(lang, 'AgroCalc Pro walkthrough', 'Présentation d’AgroCalc Pro', 'Presentación de AgroCalc Pro')}>
      <div className="ac-orbit ac-orbit-one" aria-hidden="true"/><div className="ac-orbit ac-orbit-two" aria-hidden="true"/>
      <div className="ac-scene-inner">
        <div className="ac-story-copy ac-hero-copy">
          <h1><span className="ac-h1-kicker"><T en="Free NPK fertigation calculator app" fr="Application gratuite de calcul de fertigation NPK" es="App gratuita de cálculo de fertirrigación NPK"/></span><T en="Calculate your fertigation: ionic balance, EC and A/B/C tanks." fr="Calculez votre fertigation : équilibre ionique, EC et bacs A/B/C." es="Calcule su fertirrigación: equilibrio iónico, CE y tanques A/B/C."/></h1>
          <p className="ac-intro"><T en="AgroCalc Pro is a nutrient solution calculator for drip irrigation, greenhouse and hydroponic crops. Enter your fertilizers in kg and get the ionic balance in meq/L, the EC, NPK units per hectare and a balanced A/B/C stock tank plan, online or offline on Android." fr="AgroCalc Pro est un calculateur de solution nutritive pour le goutte-à-goutte, les cultures sous serre et l’hydroponie. Saisissez vos engrais en kg et obtenez l’équilibre ionique en meq/L, l’EC, les unités NPK par hectare et un plan de bacs A/B/C équilibré, en ligne ou hors ligne sur Android." es="AgroCalc Pro es una calculadora de soluciones nutritivas para riego por goteo, cultivos de invernadero e hidroponía. Introduzca sus fertilizantes en kg y obtenga el equilibrio iónico en meq/L, la CE, las unidades NPK por hectárea y un plan de tanques A/B/C equilibrado, en línea o sin conexión en Android."/></p>
          <div className="ac-actions"><StoreButton/><Link className="ac-secondary" to="/fertilizer-calculator"><T en="Try the web calculator" fr="Essayer le calculateur en ligne" es="Probar la calculadora en línea"/></Link></div>
          <p className="ac-micro"><T en="Free, no account, works offline. In English, French, Spanish and Arabic." fr="Gratuit, sans compte, hors ligne. En français, anglais, espagnol et arabe." es="Gratis, sin cuenta y sin conexión. En español, inglés, francés y árabe."/></p>
        </div>
        <div className="ac-phone-stage"><div className="ac-phone-halo"/><Phone/></div>
        {steps.map((st, i) => <article className="ac-story-copy ac-step-copy" key={st.screen}>
          <span className="ac-step-number" aria-hidden="true">{i + 1}</span>
          <h2><T en={st.title[0]} fr={st.title[1]} es={st.title[2]}/></h2>
          <p className="ac-intro"><T en={st.text[0]} fr={st.text[1]} es={st.text[2]}/></p>
          <div className="ac-step-detail"><Icon name="check"/><T en={st.detail[0]} fr={st.detail[1]} es={st.detail[2]}/></div>
          <img className="ac-mobile-screen" src={`/screens/${lang}/${st.screen}.webp`} alt={pick(lang, `AgroCalc Pro screen: ${st.title[0]}`, `Écran AgroCalc Pro : ${st.title[1]}`, `Pantalla de AgroCalc Pro: ${st.title[2]}`)} loading="lazy" width="590" height="1279"/>
        </article>)}
        <div className="ac-story-cta">
          <img className="ac-cta-static-phone" src={`/screens/${lang}/home.webp`} alt={pick(lang, 'AgroCalc Pro home screen', 'Écran d’accueil d’AgroCalc Pro', 'Pantalla de inicio de AgroCalc Pro')} loading="lazy" width="590" height="1279"/>
          <div className="ac-story-cta-heading"><h2><T en={<><span className="ac-cta-line"><span>Your next </span><span>step.</span></span><span className="ac-cta-line"><span>In your </span><span>pocket.</span></span></>} fr={<><span className="ac-cta-line"><span>La prochaine </span><span>étape.</span></span><span className="ac-cta-line"><span>Dans votre </span><span>poche.</span></span></>} es={<><span className="ac-cta-line"><span>Su próximo </span><span>paso.</span></span><span className="ac-cta-line"><span>En su </span><span>bolsillo.</span></span></>}/></h2></div>
          <div className="ac-story-cta-actions"><StoreButton/><p className="ac-micro"><T en="Free for Android. Works offline. No account." fr="Gratuit sur Android. Hors ligne. Sans compte." es="Gratis para Android. Sin conexión. Sin cuenta."/></p></div>
        </div>
      </div>
      <div className="ac-scene-bottom">
        <div className="ac-scroll-hint"><T en="Scroll to explore" fr="Défilez pour découvrir" es="Desplácese para descubrir"/><Icon name="arrow-down"/></div>
        <nav className="ac-story-dots" aria-label={pick(lang, 'Walkthrough steps', 'Étapes de la présentation', 'Pasos de la presentación')}>
          {['Start', ...steps.map(st => st.title[0]), 'Download'].map((label, i) => <button type="button" key={label} aria-label={i === 0 ? pick(lang, 'Start', 'Début', 'Inicio') : i > N ? pick(lang, 'Download', 'Téléchargement', 'Descarga') : pick(lang, ...steps[i - 1].title)} onClick={event => {
            const st = trigger.current
            if (!st) return
            window.scrollTo({ top: st.start + (st.end - st.start) * Number(event.currentTarget.dataset.progress || 0) + 2, behavior: 'smooth' })
          }}/>)}
        </nav>
        <a className="ac-story-skip" href="#features"><T en="Skip to features" fr="Passer aux fonctionnalités" es="Ir a las funciones"/></a>
      </div><div className="ac-progress"><div className="ac-progress-fill"/></div>
    </section>
  </div>
}

// Search content: what the calculator does, in the words growers type into Google.
const features = [
  { en: 'NPK fertilizer calculator', fr: 'Calculateur d’engrais NPK', es: 'Calculadora de fertilizantes NPK', textEs: 'Introduzca los kilogramos de hasta 14 fertilizantes solubles. Solo el volumen de riego es obligatorio.',
    textEn: 'Enter the kilograms of up to 14 water-soluble fertilizers. Only the irrigation volume is required.',
    textFr: 'Saisissez les kilogrammes de 14 engrais solubles au plus. Seul le volume d’irrigation est obligatoire.' },
  { en: 'Ionic balance in meq/L', fr: 'Équilibre ionique en meq/L', es: 'Equilibrio iónico en meq/L', textEs: 'Cada ion de la solución nutritiva en meq/L, con el equilibrio aniones–cationes.',
    textEn: 'Every ion of the nutrient solution in meq/L, with the anion–cation balance.',
    textFr: 'Chaque ion de la solution nutritive en meq/L, avec l’équilibre anions–cations.' },
  { en: 'EC calculation', fr: 'Calcul de l’EC', es: 'Cálculo de la CE', textEs: 'Conductividad eléctrica estimada en mS/cm, a partir de sus fertilizantes y la CE del agua.',
    textEn: 'Estimated electrical conductivity in mS/cm, from your fertilizers and source-water EC.',
    textFr: 'Conductivité électrique estimée en mS/cm, à partir de vos engrais et de l’EC de l’eau.' },
  { en: 'Fertilizer units per hectare', fr: 'Unités fertilisantes par hectare', es: 'Unidades fertilizantes por hectárea', textEs: 'N, P₂O₅, K₂O, CaO y MgO por riego y por hectárea, con la relación NPK.',
    textEn: 'N, P₂O₅, K₂O, CaO and MgO per application and per hectare, with the NPK ratio.',
    textFr: 'N, P₂O₅, K₂O, CaO et MgO par apport et par hectare, avec le ratio NPK.' },
  { en: 'A/B/C stock tank distribution', fr: 'Répartition des bacs A/B/C', es: 'Reparto en tanques A/B/C', textEs: 'El calcio separado de sulfatos y fosfatos, con los tanques A y B equilibrados para vaciarse a la vez.',
    textEn: 'Calcium kept apart from sulfates and phosphates, with tanks A and B balanced to empty together.',
    textFr: 'Le calcium séparé des sulfates et phosphates, avec des bacs A et B équilibrés pour se vider ensemble.' },
  { en: 'Crop nutrient standards', fr: 'Normes nutritives des cultures', es: 'Normas nutritivas de los cultivos', textEs: 'Compare su solución con referencias para tomate, pimiento, pepino, fresa, rosa y más.',
    textEn: 'Compare your solution with references for tomato, pepper, cucumber, strawberry, rose and more.',
    textFr: 'Comparez votre solution aux références pour la tomate, le poivron, le concombre, le fraisier, le rosier…' },
]

const crops = [
  ['Greenhouse tomato', 'Tomate sous serre', 'Tomate de invernadero'], ['Pepper', 'Poivron', 'Pimiento'], ['Cucumber', 'Concombre', 'Pepino'], ['Strawberry', 'Fraisier', 'Fresa'],
  ['Blueberry', 'Myrtille', 'Arándano'], ['Raspberry', 'Framboisier', 'Frambuesa'], ['Rose and cut flowers', 'Rosier et fleurs coupées', 'Rosa y flor cortada'], ['Fruit trees', 'Arboriculture', 'Frutales'],
]
const systems = [
  ['Drip irrigation in open field', 'Goutte-à-goutte en plein champ', 'Riego por goteo en campo abierto'], ['Greenhouse soilless culture', 'Hors-sol sous serre', 'Cultivo sin suelo en invernadero'],
  ['Coco coir, rockwool and perlite', 'Fibre de coco, laine de roche et perlite', 'Fibra de coco, lana de roca y perlita'], ['Hydroponics', 'Hydroponie', 'Hidroponía'],
]

export default function LandingPage() {
  const lang = useLang()
  return <main className="ac-landing lp" id="landing-page">
    <Story/>

    <section className="lp-seo ac-wrap" id="features" aria-labelledby="lp-features-title">
      <div className="lp-section-intro">
        <h2 id="lp-features-title"><T en="A complete fertigation calculator for drip irrigation" fr="Un calculateur de fertigation complet pour le goutte-à-goutte" es="Una calculadora de fertirrigación completa para riego por goteo"/></h2>
        <p><T en="AgroCalc Pro is a free nutrient solution calculator for agronomists, technicians and growers. It turns the fertilizers you inject into the figures you need to check a fertigation program before it reaches the crop." fr="AgroCalc Pro est un calculateur de solution nutritive gratuit pour les agronomes, les techniciens et les producteurs. Il transforme les engrais que vous injectez en chiffres utiles pour vérifier un programme de fertigation avant qu’il n’atteigne la culture." es="AgroCalc Pro es una calculadora de soluciones nutritivas gratuita para agrónomos, técnicos y productores. Convierte los fertilizantes que inyecta en las cifras que necesita para revisar un programa de fertirrigación antes de que llegue al cultivo."/></p>
      </div>
      <div className="lp-features">{features.map(f => <article key={f.en}>
        <h3><T en={f.en} fr={f.fr} es={f.es}/></h3>
        <p><T en={f.textEn} fr={f.textFr} es={f.textEs}/></p>
      </article>)}</div>
    </section>

    <section className="lp-crops" id="crops" aria-labelledby="lp-crops-title">
      <div className="ac-wrap lp-crops-grid">
        <div className="lp-section-intro">
          <h2 id="lp-crops-title"><T en="For greenhouse, open-field and hydroponic crops" fr="Pour les cultures sous serre, en plein champ et hors sol" es="Para cultivos de invernadero, de campo abierto e hidropónicos"/></h2>
          <p><T en="The same calculation works wherever fertilizer is injected into irrigation water: vegetables under glass, berries in substrate, cut flowers and orchards on drip." fr="Le même calcul s’applique partout où l’engrais est injecté dans l’eau d’irrigation : légumes sous serre, petits fruits en substrat, fleurs coupées et vergers au goutte-à-goutte." es="El mismo cálculo sirve allí donde se inyecta fertilizante en el agua de riego: hortalizas de invernadero, frutos rojos en sustrato, flor cortada y frutales con riego por goteo."/></p>
        </div>
        <div className="lp-crop-lists">
          <div><h3><T en="Crops" fr="Cultures" es="Cultivos"/></h3><ul>{crops.map(c => <li key={c[0]}><T en={c[0]} fr={c[1]} es={c[2]}/></li>)}</ul></div>
          <div><h3><T en="Growing systems" fr="Systèmes de culture" es="Sistemas de cultivo"/></h3><ul>{systems.map(c => <li key={c[0]}><T en={c[0]} fr={c[1]} es={c[2]}/></li>)}</ul></div>
        </div>
      </div>
    </section>

    <section className="lp-tools ac-wrap" id="tools" aria-labelledby="lp-tools-title">
      <div className="lp-section-intro">
        <h2 id="lp-tools-title"><T en="Free online fertigation calculators" fr="Calculateurs de fertigation gratuits en ligne" es="Calculadoras de fertirrigación gratuitas en línea"/></h2>
        <p><T en="The same formulas as the app, in your browser, with nothing to install." fr="Les mêmes formules que l’application, dans votre navigateur, sans rien installer." es="Las mismas fórmulas que la app, en su navegador y sin instalar nada."/></p>
      </div>
      <div className="lp-link-list">{webTools.map(tool => <Link to={tool.path} key={tool.path}><strong><T en={tool.en} fr={tool.fr} es={tool.es}/></strong><span><T en={tool.textEn} fr={tool.textFr} es={tool.textEs}/></span><Icon name="arrow-right"/></Link>)}</div>
    </section>

    <section className="lp-guides ac-wrap" id="guides" aria-labelledby="lp-guides-title">
      <div className="lp-section-intro">
        <h2 id="lp-guides-title"><T en="Fertigation guides" fr="Guides de fertigation" es="Guías de fertirrigación"/></h2>
        <p><T en="Practical articles on fertilizer calculation, EC, stock tanks and crop nutrition." fr="Des articles pratiques sur le calcul des engrais, l’EC, les bacs mères et la nutrition des cultures." es="Artículos prácticos sobre cálculo de fertilizantes, CE, tanques de solución madre y nutrición de cultivos."/> <Link to="/blog" className="lp-inline-link"><T en="All guides" fr="Tous les guides" es="Todas las guías"/></Link></p>
      </div>
      <div className="lp-link-list">{blogPosts.slice(0, 3).map(post => <Link to={blogPath(post)} key={post.slug}><strong><T en={post.title} fr={post.titleFr} es={post.titleEs}/></strong><Icon name="arrow-right"/></Link>)}</div>
    </section>

    <section className="lp-faq ac-wrap" id="faq" aria-labelledby="lp-faq-title">
      <h2 id="lp-faq-title"><T en="Fertigation calculator questions" fr="Questions sur le calcul de fertigation" es="Preguntas sobre el cálculo de fertirrigación"/></h2>
      <div>{faqs['/'].map(item => <details key={item.q}><summary><T en={item.q} fr={item.qFr} es={item.qEs}/><Icon name="plus"/></summary><p><T en={item.a} fr={item.aFr} es={item.aEs}/></p></details>)}</div>
    </section>

    <section className="lp-download" id="download" aria-labelledby="lp-download-title">
      <div className="ac-wrap lp-download-grid">
        <div>
          <h2 id="lp-download-title"><T en="Download the free fertigation app" fr="Téléchargez l’application de fertigation gratuite" es="Descargue la app de fertirrigación gratuita"/></h2>
          <p><T en="AgroCalc Pro for Android. Your formulations stay on your phone." fr="AgroCalc Pro pour Android. Vos formulations restent sur votre téléphone." es="AgroCalc Pro para Android. Sus formulaciones se quedan en su teléfono."/></p>
          <StoreButton light/>
        </div>
        <img className="lp-download-report" src={`/screens/${lang}/report.webp`} alt={pick(lang, 'AgroCalc Pro fertigation PDF report', 'Rapport PDF de fertigation AgroCalc Pro', 'Informe PDF de fertirrigación de AgroCalc Pro')} width="900" height="1273" loading="lazy"/>
      </div>
    </section>
  </main>
}
