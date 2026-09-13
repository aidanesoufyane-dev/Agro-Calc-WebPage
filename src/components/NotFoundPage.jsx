import { Helmet } from 'react-helmet-async'

export default function NotFoundPage({ showPage }) {
  return (
    <div className="not-found-page">
      <Helmet>
        <title>404 Page Not Found | AgroCalcPro</title>
        <meta name="description" content="The requested page could not be found on AgroCalcPro." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="not-found-hero">
        <div className="container not-found-content">
          <span className="section-label light">
            <span className="en">404 Error</span><span className="fr">Erreur 404</span>
          </span>
          <h1 className="not-found-title">
            <span className="en">Page not found</span>
            <span className="fr">Page introuvable</span>
          </h1>
          <p className="not-found-text">
            <span className="en">The page you are looking for does not exist or has been moved.</span>
            <span className="fr">La page demandee n'existe pas ou a ete deplacee.</span>
          </p>
          <div className="not-found-actions">
            <button className="btn btn-primary" onClick={() => showPage('landing')}>
              <span className="en">Go to Home</span>
              <span className="fr">Retour accueil</span>
            </button>
            <button className="btn btn-secondary" onClick={() => showPage('privacy')}>
              <span className="en">Privacy Policy</span>
              <span className="fr">Confidentialite</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
