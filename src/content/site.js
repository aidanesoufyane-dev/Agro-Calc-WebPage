export const SITE_URL = 'https://agrocalcpro.soufyanedev.com'
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.soufyanedev.agrocalcpro'
// Base routes fully translated into Spanish (served under /es). Articles follow in a second pass.
export const ES_ROUTES = ['/', '/fertilizer-calculator', '/fertilizer-ppm-calculator', '/ec-ppm-converter', '/irrigation-calculator', '/blog', '/supported-fertilizers', '/feedback', '/privacy']

export const corePages = {
  '/': {
    title:'Free NPK Fertigation Calculator App | AgroCalc Pro', description:'Free fertigation calculator for drip irrigation and hydroponics: NPK nutrient solution, ionic balance in meq/L, EC, units per hectare and A/B/C stock tanks.',
    titleFr:'Calculateur de fertigation NPK gratuit | AgroCalc Pro', descriptionFr:'Calculateur de fertigation gratuit pour le goutte-à-goutte et l’hydroponie : solution nutritive NPK, équilibre ionique en meq/L, EC, unités par hectare et bacs A/B/C.',
    titleEs:'Calculadora de fertirriego NPK gratis | AgroCalc Pro', descriptionEs:'Calculadora de fertirrigación gratuita para riego por goteo e hidroponía: solución nutritiva NPK, equilibrio iónico en meq/L, CE, unidades por hectárea y tanques A/B/C.',
  },
  '/fertilizer-calculator': {
    title:'NPK Fertilizer Calculator – Free Fertigation Calculator Online', description:'Free online NPK fertilizer calculator for fertigation and hydroponics. Get ionic balance in meq/L, estimated EC, N-P₂O₅-K₂O per hectare and A/B/C tank split.',
    titleFr:'Calculateur NPK d’engrais – Calcul de fertigation gratuit en ligne', descriptionFr:'Calculateur d’engrais NPK gratuit pour la fertigation et l’hydroponie : balance ionique en meq/L, EC estimée, N-P₂O₅-K₂O par hectare et répartition A/B/C.',
    titleEs:'Calculadora NPK de fertilizantes – Fertirrigación gratis en línea', descriptionEs:'Calculadora de fertilizantes NPK gratuita para fertirrigación e hidroponía: equilibrio iónico en meq/L, CE estimada, N-P₂O₅-K₂O por hectárea y reparto en tanques A/B/C.',
  },
  '/fertilizer-ppm-calculator': {
    title:'Fertilizer PPM Calculator: NPK ppm from Grams & Injector Ratio', description:'Convert grams of any NPK fertilizer (e.g. 20-20-20) into ppm of N, P and K, or find how much fertilizer you need for a target ppm, with injector ratio support.',
    titleFr:'Calculateur ppm d’engrais : NPK en ppm, grammes et injecteur', descriptionFr:'Convertissez les grammes d’un engrais NPK (ex. 20-20-20) en ppm de N, P et K, ou calculez la dose pour une cible en ppm, avec ratio d’injection.',
    titleEs:'Calculadora de ppm de fertilizante: NPK en ppm, gramos e inyector', descriptionEs:'Convierta los gramos de cualquier fertilizante NPK (p. ej. 20-20-20) en ppm de N, P y K, o calcule la dosis para un objetivo en ppm, con relación de inyección.',
  },
  '/ec-ppm-converter': {
    title:'EC to PPM Converter (500, 640 & 700 Scales) | AgroCalc Pro', description:'Convert EC in mS/cm, µS/cm, dS/m or CF to ppm (TDS) on the 500, 640 and 700 scales, and convert ppm back to EC for nutrient solutions.',
    titleFr:'Convertisseur EC en ppm (échelles 500, 640, 700) | AgroCalc Pro', descriptionFr:'Convertissez l’EC en mS/cm, µS/cm, dS/m ou CF en ppm (TDS) selon les échelles 500, 640 et 700, et repassez des ppm à l’EC.',
    titleEs:'Conversor de CE a ppm (escalas 500, 640 y 700) | AgroCalc Pro', descriptionEs:'Convierta la CE en mS/cm, µS/cm, dS/m o CF a ppm (TDS) en las escalas 500, 640 y 700, y pase de ppm a CE para soluciones nutritivas.',
  },
  '/irrigation-calculator': {
    title:'Drip Irrigation Calculator: Volume, mm/h & Run Time | AgroCalc Pro', description:'Calculate drip irrigation emitters per hectare, application rate in mm/h, water volume per irrigation in m³ and the run time needed for a target depth.',
    titleFr:'Calculateur d’irrigation goutte-à-goutte : volume, mm/h et durée', descriptionFr:'Calculez les goutteurs par hectare, la pluviométrie en mm/h, le volume d’eau par irrigation en m³ et la durée nécessaire pour une dose cible.',
    titleEs:'Calculadora de riego por goteo: volumen, mm/h y tiempo de riego', descriptionEs:'Calcule los goteros por hectárea, la pluviometría en mm/h, el volumen de agua por riego en m³ y el tiempo necesario para una lámina objetivo.',
  },
  '/blog': {
    title:'Field Notes: Fertigation & NPK Guides | AgroCalc Pro', description:'Practical guides to fertilizer calculations, water quality, EC, tank mixing, crop nutrition, and fertigation reports.',
    titleFr:'Notes du terrain : guides de fertigation et NPK | AgroCalc Pro', descriptionFr:'Guides pratiques sur le calcul des engrais, la qualité de l’eau, l’EC, le mélange des bacs, la nutrition des cultures et les rapports de fertigation.',
    titleEs:'Guías de fertirrigación y NPK | AgroCalc Pro', descriptionEs:'Guías prácticas sobre el cálculo de fertilizantes, la calidad del agua, la CE, la preparación de tanques, la nutrición de cultivos y los informes de fertirrigación.',
  },
  '/supported-fertilizers': {
    title:'14 Supported Fertilizers | AgroCalc Pro', description:'Explore the 14 fertilizers supported by AgroCalc Pro and their standard A/B/C tank assignments.',
    titleFr:'14 engrais pris en charge | AgroCalc Pro', descriptionFr:'Découvrez les 14 engrais pris en charge par AgroCalc Pro et leur répartition standard dans les bacs A/B/C.',
    titleEs:'14 fertilizantes compatibles | AgroCalc Pro', descriptionEs:'Los 14 fertilizantes compatibles con AgroCalc Pro y su reparto estándar en los tanques A/B/C.',
  },
  '/crop-planning': {
    title:'Crop Nutrition Planning for Fertigation | AgroCalc Pro', description:'Review nutrient formulations, compare crop needs and export a fertigation report with AgroCalc Pro.',
    titleFr:'Planification de la nutrition des cultures | AgroCalc Pro', descriptionFr:'Vérifiez vos formulations, comparez les besoins des cultures et exportez un rapport de fertigation avec AgroCalc Pro.',
  },
  '/feedback': {
    title:'Send Feedback | AgroCalc Pro', description:'Share your feedback, report a problem or suggest improvements for the AgroCalc Pro Android app and web NPK calculator.',
    titleFr:'Envoyer un avis | AgroCalc Pro', descriptionFr:'Partagez votre avis, signalez un problème ou proposez des améliorations pour l’application Android et le calculateur NPK Web AgroCalc Pro.',
    titleEs:'Enviar comentarios | AgroCalc Pro', descriptionEs:'Comparta su opinión, informe de un problema o proponga mejoras para la app Android AgroCalc Pro y la calculadora NPK en línea.',
  },
  '/privacy': {
    title:'Privacy Policy | AgroCalc Pro', description:'Read how the AgroCalc Pro Android app handles information and offline calculations.',
    titleFr:'Politique de confidentialité | AgroCalc Pro', descriptionFr:'Découvrez comment l’application Android AgroCalc Pro traite les informations et effectue ses calculs hors ligne.',
    titleEs:'Política de privacidad | AgroCalc Pro', descriptionEs:'Cómo trata la información la app Android AgroCalc Pro y sus cálculos sin conexión.',
  },
}

// Free browser tools, linked from the home page, footer and articles.
export const webTools = [
  { path:'/fertilizer-calculator', en:'NPK fertigation calculator', fr:'Calculateur de fertigation NPK', textEn:'Ionic balance, EC and A/B/C tanks from fertilizer masses.', textFr:'Balance ionique, EC et bacs A/B/C à partir des masses d’engrais.', es:'Calculadora de fertirrigación NPK', textEs:'Equilibrio iónico, CE y tanques A/B/C a partir de las masas de fertilizante.' },
  { path:'/fertilizer-ppm-calculator', en:'Fertilizer ppm calculator', fr:'Calculateur ppm d’engrais', textEn:'ppm of N, P and K from grams of any NPK grade.', textFr:'ppm de N, P et K à partir des grammes de tout engrais NPK.', es:'Calculadora de ppm de fertilizante', textEs:'ppm de N, P y K a partir de los gramos de cualquier fertilizante NPK.' },
  { path:'/ec-ppm-converter', en:'EC to ppm converter', fr:'Convertisseur EC en ppm', textEn:'mS/cm, µS/cm, CF and ppm on the 500, 640 and 700 scales.', textFr:'mS/cm, µS/cm, CF et ppm selon les échelles 500, 640 et 700.', es:'Conversor de CE a ppm', textEs:'mS/cm, µS/cm, CF y ppm en las escalas 500, 640 y 700.' },
  { path:'/irrigation-calculator', en:'Drip irrigation calculator', fr:'Calculateur d’irrigation goutte-à-goutte', textEn:'Emitters per hectare, mm/h, m³ and run time.', textFr:'Goutteurs par hectare, mm/h, m³ et durée d’arrosage.', es:'Calculadora de riego por goteo', textEs:'Goteros por hectárea, mm/h, m³ y tiempo de riego.' },
]
