import { Link, useLocation, useParams } from 'react-router-dom'
import { blogPosts, blogPath } from '../content/blog'
import { T, Arrow, StoreButton } from './LandingPage'

export function ArticleLinks() {
  const { pathname } = useLocation()
  const current = blogPosts.find(post => blogPath(post) === pathname)
  const related = current ? current.related.map(slug => blogPosts.find(post => post.slug === slug)).filter(Boolean) : []
  return <section className="seo-section"><div className="container"><h2 className="seo-section-title"><T en="Related guides" fr="Guides associés"/></h2><div><div className="seo-grid">{related.map(post => <Link className="seo-card seo-link-card" to={blogPath(post)} key={post.slug}><h3><T en={post.title} fr={post.titleFr}/></h3><p><T en={post.description} fr={post.descriptionFr}/></p></Link>)}</div><Link to="/blog" className="ac-text-link"><T en="Browse all Field Notes" fr="Toutes les notes du terrain"/><Arrow/></Link></div></div></section>
}
export function BlogPage() {
  return <main className="ac-landing ac-blog"><div className="ac-wrap"><header className="ac-blog-heading"><div className="ac-eyebrow"><T en="THE FIELD NOTES / BLOG" fr="LES NOTES DU TERRAIN / BLOG"/></div><h1><T en={<>Know your inputs.<br/><em>Grow your understanding.</em></>} fr={<>Comprendre les apports.<br/><em>Mieux cultiver.</em></>}/></h1><p className="ac-intro"><T en="Practical reading for your next formulation. Explore nutrient calculations, water quality, tank management, and the everyday work of fertigation." fr="Des lectures pratiques pour votre prochaine formulation : calculs nutritifs, qualité de l’eau, gestion des bacs et travail quotidien en fertigation."/></p></header><div className="ac-blog-grid">{blogPosts.map((post,i) => <article key={post.slug} className="ac-blog-card"><div className="ac-eyebrow">{String(i+1).padStart(2,'0')} / <T en="FIELD NOTE" fr="NOTE DU TERRAIN"/></div><h2><Link to={blogPath(post)}><T en={post.title} fr={post.titleFr}/></Link></h2><p><T en={post.description} fr={post.descriptionFr}/></p><Link className="ac-text-link" to={blogPath(post)}><T en="Read the guide" fr="Lire le guide"/><Arrow/></Link></article>)}</div><div className="ac-blog-bottom"><div><h2><T en="Bring the numbers to the field." fr="Du calcul au terrain."/></h2><Link className="ac-text-link" to="/supported-fertilizers"><T en="Explore supported fertilizers" fr="Découvrir les engrais pris en charge"/><Arrow/></Link></div><StoreButton/></div></div></main>
}
export function NewArticlePage({ slug }) {
  const params = useParams()
  const post = blogPosts.find(item => item.slug === (slug || params.slug))
  if (!post?.sections) return null
  return <main className="seo-page ac-notes"><header className="seo-hero"><div className="container"><Link to="/blog" className="ac-note-back"><span aria-hidden="true">←</span><T en="All Field Notes" fr="Toutes les notes du terrain"/></Link><div className="section-label"><T en="THE FIELD NOTES" fr="LES NOTES DU TERRAIN"/></div><h1 className="seo-title"><T en={post.title} fr={post.titleFr}/></h1><p className="seo-subtitle"><T en={post.description} fr={post.descriptionFr}/></p><div className="ac-note-meta"><span>AgroCalc Pro</span><span>/</span><T en="Practical growing guides" fr="Guides pratiques de culture"/></div></div></header>
    {post.sections.map(section => <section className="seo-section" key={section.title}><div className="container"><h2 className="seo-section-title"><T en={section.title} fr={section.titleFr}/></h2><div className="seo-article">{section.en.map((p,i) => <p key={i}><T en={p} fr={section.fr[i]}/></p>)}{section.source !== undefined && <p className="ac-source"><a href={post.sources[section.source].url}>{post.sources[section.source].title} ↗</a></p>}</div></div></section>)}
    <ArticleLinks/><section className="seo-section"><div className="container"><h2 className="seo-section-title"><T en="Put it into practice" fr="Passez à la pratique"/></h2><div className="seo-cta-box"><p className="seo-cta-title"><T en="Check your formulation with AgroCalc Pro." fr="Vérifiez votre formulation avec AgroCalc Pro."/></p><StoreButton/></div></div></section>
  </main>
}
