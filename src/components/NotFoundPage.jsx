import { Link } from 'react-router-dom'
import { T } from './LandingPage'

export default function NotFoundPage() {
  return <main className="not-found-page">
    <section className="not-found-hero">
      <div className="container not-found-content">
        <span className="section-label light"><T en="404 Error" fr="Erreur 404"/></span>
        <h1 className="not-found-title"><T en="Page not found" fr="Page introuvable"/></h1>
        <p className="not-found-text"><T en="The page you are looking for does not exist or has been moved." fr="La page demandée n’existe pas ou a été déplacée."/></p>
        <div className="not-found-actions">
          <Link className="btn btn-primary" to="/"><T en="Go to Home" fr="Retour à l’accueil"/></Link>
          <Link className="btn btn-secondary" to="/fertilizer-calculator"><T en="Fertilizer Calculator" fr="Calculateur d’engrais"/></Link>
          <Link className="btn btn-secondary" to="/blog"><T en="Browse Guides" fr="Consulter les guides"/></Link>
        </div>
      </div>
    </section>
  </main>
}
