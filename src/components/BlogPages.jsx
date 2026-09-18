import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { blogPosts, blogPath } from '../content/blog'
import { T, Arrow, StoreButton } from './LandingPage'

const categories = ['All', ...new Set(blogPosts.map(post => post.category))]
const colors = {'Formulation':'#528014','Crop nutrition':'#2E7D32','Tank management':'#0D47A1','Water & EC':'#00695C','Field workflow':'#704d37'}
const categoryFr = {'All':'Tous','Formulation':'Formulation','Crop nutrition':'Nutrition des cultures','Tank management':'Gestion des bacs','Water & EC':'Eau et EC','Field workflow':'Travail au champ'}
const readTime = post => post.sections?.length >= 5 ? 8 : post.sections?.length >= 3 ? 5 : 3

export function ArticleLinks() {
  const { pathname } = useLocation()
  const current = blogPosts.find(post => blogPath(post) === pathname)
  const related = current ? current.related.map(slug => blogPosts.find(post => post.slug === slug)).filter(Boolean) : []
  return <section className="ac-post-related"><div className="ac-post-width"><h2><T en="Related articles" fr="Articles associés"/></h2><div className="ac-related-grid">{related.map(post => <Link className="ac-related-card" to={blogPath(post)} key={post.slug}><span>{post.category}</span><h3><T en={post.title} fr={post.titleFr}/></h3><Arrow/></Link>)}</div><Link to="/blog" className="ac-text-link"><T en="Browse all guides" fr="Tous les guides"/><Arrow/></Link> <Link to="/fertilizer-calculator" className="ac-text-link"><T en="Explore the NPK fertilizer calculator" fr="Découvrir le calculateur d’engrais NPK"/><Arrow/></Link></div></section>
}

export function BlogPage() {
  const [category, setCategory] = useState('All')
  const [visible, setVisible] = useState(9)
  const filtered = category === 'All' ? blogPosts : blogPosts.filter(post => post.category === category)
  const select = next => { setCategory(next); setVisible(9) }
  return <main className="ac-landing ac-blog"><header className="ac-blog-hero"><div className="ac-wrap"><div className="ac-eyebrow"><T en="THE FIELD NOTES" fr="LES NOTES DU TERRAIN"/></div><h1><T en={<>Fertigation <em>Knowledge Base</em></>} fr={<>Base de connaissances <em>en fertigation</em></>}/></h1><p><T en="Practical guides for agronomists and growers using AgroCalc Pro." fr="Des guides pratiques pour les agronomes et les producteurs utilisant AgroCalc Pro."/></p><div className="ac-blog-filters" role="group" aria-label="Filter articles by category">{categories.map(item => <button key={item} type="button" className={category===item?'is-active':''} aria-pressed={category===item} onClick={() => select(item)}><T en={item} fr={categoryFr[item] || item}/></button>)}</div></div></header><div className="ac-wrap ac-blog-list"><div className="ac-blog-count"><T en={String(filtered.length)+' guides'} fr={String(filtered.length)+' guides'}/></div><div className="ac-blog-grid">{filtered.map((post,i) => <article key={post.slug} className="ac-blog-card" style={{'--card-color':colors[post.category] || '#2E7D32'}} hidden={i>=visible}><span className="ac-category"><T en={post.category} fr={categoryFr[post.category] || post.category}/></span><h2><Link to={blogPath(post)}><T en={post.title} fr={post.titleFr}/></Link></h2><p><T en={post.description} fr={post.descriptionFr}/></p><Link className="ac-card-link" to={blogPath(post)}><T en="Read more" fr="Lire la suite"/><Arrow/></Link></article>)}</div>{filtered.length>visible && <button className="ac-load-more" type="button" onClick={() => setVisible(v => v+9)}><T en="Load more guides" fr="Afficher plus de guides"/><Arrow/></button>}<div className="ac-blog-bottom"><div><h2><T en="Bring the numbers to the field." fr="Du calcul au terrain."/></h2><Link className="ac-text-link" to="/supported-fertilizers"><T en="Explore supported fertilizers" fr="Découvrir les engrais pris en charge"/><Arrow/></Link></div><StoreButton/></div></div></main>
}

export function NewArticlePage({ slug }) {
  const params = useParams()
  const post = blogPosts.find(item => item.slug === (slug || params.slug))
  if (!post?.sections) return null
  return <main className="ac-post"><header className="ac-post-hero"><div className="ac-post-width"><nav className="ac-post-breadcrumb" aria-label="Breadcrumb"><Link to="/"><T en="Home" fr="Accueil"/></Link><span>›</span><Link to="/blog">Blog</Link><span>›</span><span><T en={post.category} fr={categoryFr[post.category] || post.category}/></span></nav><span className="ac-post-category"><T en={post.category} fr={categoryFr[post.category] || post.category}/></span><h1><T en={post.title} fr={post.titleFr}/></h1><p><T en={post.description} fr={post.descriptionFr}/></p><div className="ac-post-meta">AgroCalc Pro <span>·</span> <T en={'~'+readTime(post)+' min read'} fr={'~'+readTime(post)+' min de lecture'}/></div></div></header><div className="ac-post-body ac-post-width">{post.sections.map(section => <section key={section.title}><h2><T en={section.title} fr={section.titleFr}/></h2>{section.en.map((paragraph,i) => <p key={i}><T en={paragraph} fr={section.fr[i]}/></p>)}{section.source !== undefined && post.sources?.[section.source] && <a className="ac-inline-source" href={post.sources[section.source].url} target="_blank" rel="noopener noreferrer">{post.sources[section.source].title} ↗</a>}</section>)}<div className="ac-post-cta"><div><span aria-hidden="true">✦</span><div><strong><T en="Calculate this in AgroCalc Pro" fr="Calculez avec AgroCalc Pro"/></strong><small><T en="Free Android app · works offline" fr="Application Android gratuite · fonctionne hors ligne"/></small></div></div><StoreButton/></div>{post.sources?.length>0 && <section className="ac-post-sources"><h2><T en="Sources" fr="Sources"/></h2><ul>{post.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a></li>)}</ul></section>}</div><ArticleLinks/><div className="ac-post-mobile-cta"><StoreButton/></div></main>
}
