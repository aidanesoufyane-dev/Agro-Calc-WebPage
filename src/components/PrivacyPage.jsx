export default function PrivacyPage({ showPage }) {
  return (
    <main id="privacy-page">
      
      
      <section className="privacy-hero">
        <div className="container">
          <h1 className="privacy-title">
            <span className="en">Privacy Policy</span><span className="fr">Confidentialité</span>
          </h1>
          <p className="privacy-subtitle">
            <span className="en">Last updated: January 2025</span><span className="fr">Mise à jour : Janvier 2025</span>
          </p>
          <button type="button" className="privacy-back" onClick={() => showPage('landing')}>
            <span className="en">← Back to App</span><span className="fr">← Retour à l'application</span>
          </button>
          
        </div>
      </section>

      <div className="container">
        <div className="privacy-content en">
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
          <div className="contact-card">📧 sefyan.aidan.m@gmail.com</div>
        </div>

        <div className="privacy-content fr">
          <h2>1. Introduction</h2>
          <p>AgroCalc Pro ("nous", "l'application") s'engage à protéger votre confidentialité. Cette politique explique comment nous traitons vos données lors de l'utilisation de l'application mobile.</p>

          <h2>2. Données Non Collectées</h2>
          <p>AgroCalc Pro NE RECUEILLE AUCUNE des données suivantes :</p>
          <ul>
            <li>Informations d'identification personnelle</li>
            <li>Données de localisation</li>
            <li>Informations de contact</li>
            <li>Analytiques d'usage ou télémétrie</li>
            <li>Données en direction de serveurs externes</li>
          </ul>

          <h2>3. Fonctionnement Hors Ligne</h2>
          <p>À 100% hébergée sur votre appareil, aucune connexion internet n'est nécessaire. AgroCalc Pro effectue tous les calculs NPK de manière locale sans compte ou abonnement requis.</p>

          <h2>4. Rapports PDF</h2>
          <p>Vos bulletins et rapports PDF d'analyses sont générés dans la mémoire locale de votre appareil uniquement. Libref partage les fichiers natifs ou vers la messagerie de votre choix (WhatsApp, Gmail, etc). Nous n'avons aucun accès à ces copies ou exports.</p>

          <h2>5. Services Tiers</h2>
          <p>Aucun SDK de surveillance (Facebook/Google Ads). Les seuls packages Flutter sont stricts aux utilitaires PDF (pdf, printing, share_plus) qui ne diffusent rien de façon externe.</p>

          <h2>6. Confidentialité des Enfants</h2>
          <p>Destinée aux cadres agronomiques et exploitants agricoles, nous visons un public de professionnels. Nous ne recueillions aucune donnée auprès du grand public y compris des moins de 13 ans.</p>

          <h2>7. Modifications du Règlement</h2>
          <p>Ce règlement n'est appelé à n'être retouché qu'à des fins légales sans jamais affaiblir votre autonomie offline vis-à-vis de l'application ou inclure un SDK tracker surprise. Utiliser AgroCalc vaudrait compréhension de ladite politique.</p>

          <h2>8. Contact</h2>
          <p>En cas de question ou plainte, formulez-la formellement à :</p>
          <div className="contact-card">📧 sefyan.aidan.m@gmail.com</div>
        </div>
      </div>
    </main>
  )
}
