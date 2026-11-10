import { T, useLang } from '../lib/i18n'
import Icon from './Icon'

export default function PrivacyPage({ showPage }) {
  const lang = useLang()
  return (
    <main id="privacy-page">
      
      
      <section className="privacy-hero">
        <div className="container">
          <h1 className="privacy-title">
            <T en={<>Privacy Policy</>} fr={<>Confidentialité</>} es={<>Política de privacidad</>}/>
          </h1>
          <p className="privacy-subtitle">
            <T en={<>Last updated: January 2025</>} fr={<>Mise à jour : Janvier 2025</>} es={<>Última actualización: enero de 2025</>}/>
          </p>
          <button type="button" className="privacy-back" onClick={() => showPage('landing')}>
            <Icon name="arrow-left"/><T en={<>Back to the app</>} fr={<>Retour à l'application</>} es={<>Volver a la app</>}/>
          </button>
          
        </div>
      </section>

      <div className="container">
        {lang === 'en' && <div className="privacy-content en">
          <h2>1. Introduction</h2>
          <p>AgroCalc Pro ("we", "our", or "the app") is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our mobile application.</p>

          <h2>2. Information We Do Not Collect</h2>
          <p>AgroCalc Pro does NOT collect:</p>
          <ul>
            <li>Personal identification information</li>
            <li>Location data</li>
            <li>Contact information</li>
            <li>Usage analytics or telemetry</li>
            <li>Any data that leaves your device</li>
          </ul>

          <h2>3. How the App Works</h2>
          <p>AgroCalc Pro operates entirely offline on your device. All calculations are performed locally. No data is transmitted to any server. No account or registration is required. No internet connection is needed to use the app.</p>

          <h2>4. PDF Reports</h2>
          <p>When you generate a PDF report, the file is created locally on your device. When you choose to share a report via WhatsApp, Email, or other apps, you are sharing it directly from your device using your phone's native share system. We do not receive or store any copy of your reports.</p>

          <h2>5. Third-Party Services</h2>
          <p>The app does not integrate with any third-party analytics, advertising, or tracking services. The app uses the following Flutter packages that operate locally: pdf, printing, path_provider, share_plus. None of these transmit data externally.</p>

          <h2>6. Children's Privacy</h2>
          <p>AgroCalc Pro is designed for professional use by agronomists and farmers. We do not knowingly collect any information from children under 13.</p>

          <h2>7. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify users of any significant changes by updating the date at the top of this page. Continued use of the app after changes constitutes acceptance of the new policy.</p>

          <h2>8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <div className="contact-card"><Icon name="mail"/><a href="mailto:sefyan.aidan.m@gmail.com">sefyan.aidan.m@gmail.com</a></div>
        </div>}

        {lang === 'es' && <div className="privacy-content es">
          <h2>1. Introducción</h2>
          <p>AgroCalc Pro («nosotros» o «la app») se compromete a proteger su privacidad. Esta política explica cómo tratamos la información cuando usa nuestra aplicación móvil.</p>

          <h2>2. Información que no recopilamos</h2>
          <p>AgroCalc Pro NO recopila:</p>
          <ul>
            <li>Datos de identificación personal</li>
            <li>Datos de ubicación</li>
            <li>Datos de contacto</li>
            <li>Estadísticas de uso ni telemetría</li>
            <li>Ningún dato que salga de su dispositivo</li>
          </ul>

          <h2>3. Cómo funciona la app</h2>
          <p>AgroCalc Pro funciona por completo sin conexión en su dispositivo. Todos los cálculos se hacen localmente. No se envía ningún dato a ningún servidor. No hace falta cuenta ni registro, ni conexión a internet para usar la app.</p>

          <h2>4. Informes PDF</h2>
          <p>Cuando genera un informe PDF, el archivo se crea en su dispositivo. Cuando decide compartirlo por WhatsApp, correo u otras apps, lo comparte directamente desde su dispositivo con el sistema para compartir de su teléfono. No recibimos ni guardamos ninguna copia de sus informes.</p>

          <h2>5. Servicios de terceros</h2>
          <p>La app no integra ningún servicio de terceros de analítica, publicidad o seguimiento. Usa los siguientes paquetes de Flutter, que funcionan localmente: pdf, printing, path_provider, share_plus. Ninguno de ellos envía datos al exterior.</p>

          <h2>6. Privacidad de los menores</h2>
          <p>AgroCalc Pro está pensada para el uso profesional de agrónomos y agricultores. No recopilamos a sabiendas información de menores de 13 años.</p>

          <h2>7. Cambios en esta política</h2>
          <p>Podemos actualizar esta política de privacidad. Avisaremos de cualquier cambio importante actualizando la fecha de la parte superior de esta página. Seguir usando la app después de los cambios supone aceptar la nueva política.</p>

          <h2>8. Contacto</h2>
          <p>Si tiene alguna pregunta sobre esta política de privacidad, escríbanos a:</p>
          <div className="contact-card"><Icon name="mail"/><a href="mailto:sefyan.aidan.m@gmail.com">sefyan.aidan.m@gmail.com</a></div>
        </div>}

        {lang === 'fr' && <div className="privacy-content fr">
          <h2>1. Introduction</h2>
          <p>AgroCalc Pro (« nous » ou « l’application ») s’engage à protéger votre vie privée. Cette politique explique comment nous traitons les informations lorsque vous utilisez notre application mobile.</p>

          <h2>2. Informations que nous ne collectons pas</h2>
          <p>AgroCalc Pro ne collecte PAS :</p>
          <ul>
            <li>d’informations d’identification personnelle ;</li>
            <li>de données de localisation ;</li>
            <li>de coordonnées ;</li>
            <li>de statistiques d’utilisation ni de télémétrie ;</li>
            <li>aucune donnée qui quitte votre appareil.</li>
          </ul>

          <h2>3. Fonctionnement de l’application</h2>
          <p>AgroCalc Pro fonctionne entièrement hors ligne sur votre appareil. Tous les calculs sont effectués localement. Aucune donnée n’est transmise à un serveur. Aucun compte ni inscription n’est nécessaire, et l’application s’utilise sans connexion internet.</p>

          <h2>4. Rapports PDF</h2>
          <p>Lorsque vous générez un rapport PDF, le fichier est créé sur votre appareil. Lorsque vous le partagez par WhatsApp, e-mail ou une autre application, vous le partagez directement depuis votre appareil grâce au système de partage de votre téléphone. Nous ne recevons ni ne conservons aucune copie de vos rapports.</p>

          <h2>5. Services tiers</h2>
          <p>L’application n’intègre aucun service tiers d’analyse, de publicité ou de suivi. Elle utilise les modules Flutter suivants, qui fonctionnent localement : pdf, printing, path_provider, share_plus. Aucun d’eux ne transmet de données à l’extérieur.</p>

          <h2>6. Protection des enfants</h2>
          <p>AgroCalc Pro est destinée à un usage professionnel par les agronomes et les agriculteurs. Nous ne collectons sciemment aucune information auprès d’enfants de moins de 13 ans.</p>

          <h2>7. Modifications de cette politique</h2>
          <p>Nous pouvons mettre à jour cette politique de confidentialité. Toute modification importante sera signalée par la mise à jour de la date en haut de cette page. Continuer à utiliser l’application après une modification vaut acceptation de la nouvelle politique.</p>

          <h2>8. Contact</h2>
          <p>Pour toute question sur cette politique de confidentialité, écrivez-nous à :</p>
          <div className="contact-card"><Icon name="mail"/><a href="mailto:sefyan.aidan.m@gmail.com">sefyan.aidan.m@gmail.com</a></div>
        </div>}
      </div>
    </main>
  )
}
