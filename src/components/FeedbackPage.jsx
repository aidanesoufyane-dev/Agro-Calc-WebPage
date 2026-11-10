import { useState } from 'react'
import { T, useLang, pick } from '../lib/i18n'
import Icon from './Icon'

const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim(),
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim(),
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim(),
}

const topics = [
  { value: 'Suggestion', en: 'Suggestion / improvement', fr: 'Suggestion / amélioration', es: 'Sugerencia / mejora' },
  { value: 'Bug report', en: 'Something is not working', fr: 'Quelque chose ne fonctionne pas', es: 'Algo no funciona' },
  { value: 'Feature request', en: 'New feature request', fr: 'Nouvelle fonctionnalité', es: 'Nueva función' },
  { value: 'Calculation question', en: 'Question about a calculation', fr: 'Question sur un calcul', es: 'Pregunta sobre un cálculo' },
  { value: 'Other', en: 'Other', fr: 'Autre', es: 'Otro' },
]
const products = [
  { value: 'Android app', en: 'Android app', fr: 'Application Android', es: 'App Android' },
  { value: 'Web NPK calculator', en: 'Web NPK calculator', fr: 'Calculateur NPK Web', es: 'Calculadora NPK web' },
  { value: 'Website / blog', en: 'Website / blog', fr: 'Site / blog', es: 'Sitio web / blog' },
]
const empty = { name: '', email: '', topic: topics[0].value, product: products[0].value, rating: '', message: '', website: '' }

export default function FeedbackPage() {
  const lang = useLang()
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle')
  const change = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }))

  const submit = async event => {
    event.preventDefault()
    if (form.website) { setStatus('sent'); return }
    if (form.message.trim().length < 10) { setStatus('short'); return }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setStatus('email'); return }
    if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) { setStatus('config'); return }
    setStatus('sending')
    try {
      const { send } = await import('@emailjs/browser')
      await send(EMAILJS.serviceId, EMAILJS.templateId, {
        name: form.name.trim() || 'Anonymous',
        email: form.email.trim() || 'Not provided',
        reply_to: form.email.trim(),
        topic: form.topic,
        product: form.product,
        rating: form.rating ? `${form.rating} / 5` : 'Not rated',
        message: form.message.trim(),
        language: lang,
        page: window.location.href,
        sent_at: new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' }),
      }, { publicKey: EMAILJS.publicKey })
      setForm(empty)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return <main className="ac-calculator-page ac-feedback-page">
    <header className="ac-calc-hero">
      <div className="ac-wrap">
        
        <h1><T en="Help us improve AgroCalc Pro" fr="Aidez-nous à améliorer AgroCalc Pro" es="Ayúdenos a mejorar AgroCalc Pro"/></h1>
        <p><T en="Tell us what works, what is missing and what should be better. Every message is read and helps decide what we build next." fr="Dites-nous ce qui fonctionne, ce qui manque et ce qui doit être amélioré. Chaque message est lu et aide à choisir les prochaines évolutions." es="Díganos qué funciona, qué falta y qué debería mejorar. Leemos todos los mensajes y nos ayudan a decidir las próximas funciones."/></p>
      </div>
    </header>

    <div className="ac-wrap ac-calc-layout">
      {status === 'sent' ? <section className="ac-calc-form ac-feedback-done" role="status">
        <span className="ac-feedback-check"><Icon name="check" size={28}/></span>
        <h2><T en="Thank you for your feedback" fr="Merci pour votre retour" es="Gracias por sus comentarios"/></h2>
        <p><T en="Your message has been sent. If you left your email, we may contact you with questions or updates." fr="Votre message a été envoyé. Si vous avez laissé votre e-mail, nous pourrons vous recontacter." es="Su mensaje se ha enviado. Si dejó su correo, puede que le escribamos con preguntas o novedades."/></p>
        <button type="button" className="ac-calc-text-button" onClick={() => setStatus('idle')}><T en="Send another message" fr="Envoyer un autre message" es="Enviar otro mensaje"/></button>
      </section> : <form className="ac-calc-form" onSubmit={submit} noValidate>
        <div className="ac-calc-form-head"><div><h2><T en="Share your feedback" fr="Partagez votre avis" es="Comparta su opinión"/></h2></div></div>
        <p className="ac-calc-help"><T en="Name and email are optional. Leave your email if you would like a reply." fr="Le nom et l’e-mail sont facultatifs. Laissez votre e-mail si vous souhaitez une réponse." es="El nombre y el correo son opcionales. Deje su correo si desea una respuesta."/></p>

        <fieldset className="ac-calc-group">
          <legend><T en="About you" fr="À propos de vous" es="Sobre usted"/></legend>
          <div className="ac-calc-fields">
            <label className="ac-calc-field"><span><T en="Name" fr="Nom" es="Nombre"/></span><input className="ac-feedback-input" name="name" value={form.name} onChange={change} autoComplete="name" maxLength={80}/></label>
            <label className="ac-calc-field"><span><T en="Email" fr="E-mail" es="Correo electrónico"/></span><input className="ac-feedback-input" name="email" type="email" value={form.email} onChange={change} autoComplete="email" maxLength={120}/></label>
          </div>
        </fieldset>

        <fieldset className="ac-calc-group">
          <legend><T en="Your feedback" fr="Votre avis" es="Su opinión"/></legend>
          <div className="ac-calc-fields">
            <label className="ac-calc-field"><span><T en="Topic" fr="Sujet" es="Tema"/></span><select className="ac-feedback-input" name="topic" value={form.topic} onChange={change}>{topics.map(item => <option key={item.value} value={item.value}>{pick(lang, item.en, item.fr, item.es)}</option>)}</select></label>
            <label className="ac-calc-field"><span><T en="Product" fr="Produit" es="Producto"/></span><select className="ac-feedback-input" name="product" value={form.product} onChange={change}>{products.map(item => <option key={item.value} value={item.value}>{pick(lang, item.en, item.fr, item.es)}</option>)}</select></label>
          </div>
          <div className="ac-feedback-rating" role="radiogroup" aria-label="Rating">
            <span><T en="How would you rate AgroCalc Pro?" fr="Quelle note donnez-vous à AgroCalc Pro ?" es="¿Qué nota le da a AgroCalc Pro?"/></span>
            <div>{[1, 2, 3, 4, 5].map(value => <label key={value} className={Number(form.rating) >= value ? 'is-on' : ''}>
              <input type="radio" name="rating" value={value} checked={form.rating === String(value)} onChange={change}/><Icon name="star" size={26}/><b className="ac-sr-only">{value} / 5</b>
            </label>)}</div>
          </div>
          <label className="ac-calc-field ac-feedback-message"><span><T en="Message" fr="Message" es="Mensaje"/><b aria-hidden="true"> *</b></span>
            <textarea className="ac-feedback-input" name="message" value={form.message} onChange={change} rows={7} maxLength={3000} aria-required="true"/>
            <small>{form.message.length} / 3000</small>
          </label>
          <label className="ac-feedback-trap" aria-hidden="true">Website<input name="website" value={form.website} onChange={change} tabIndex={-1} autoComplete="off"/></label>
        </fieldset>

        {status === 'short' && <p className="ac-calc-error" role="alert"><T en="Please write a message of at least 10 characters." fr="Veuillez écrire un message d’au moins 10 caractères." es="Escriba un mensaje de al menos 10 caracteres."/></p>}
        {status === 'email' && <p className="ac-calc-error" role="alert"><T en="Please enter a valid email address, or leave it empty." fr="Saisissez une adresse e-mail valide ou laissez le champ vide." es="Introduzca un correo válido o deje el campo vacío."/></p>}
        {status === 'config' && <p className="ac-calc-error" role="alert"><T en="Feedback is not configured yet. Please try again later." fr="Le formulaire n’est pas encore configuré. Réessayez plus tard." es="El formulario aún no está configurado. Inténtelo más tarde."/></p>}
        {status === 'error' && <p className="ac-calc-error" role="alert"><T en="Your message could not be sent. Please check your connection and try again." fr="Votre message n’a pas pu être envoyé. Vérifiez votre connexion et réessayez." es="No se pudo enviar su mensaje. Revise su conexión e inténtelo de nuevo."/></p>}
        <div className="ac-calc-actions">
          <button className="ac-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <T en="Sending…" fr="Envoi…" es="Enviando…"/> : <T en="Send feedback" fr="Envoyer" es="Enviar"/>}<Icon name="arrow-right"/></button>
        </div>
      </form>}

      <aside className="ac-calc-side">
        
        <h2><T en="Built with the people who use it." fr="Construit avec ceux qui l’utilisent." es="Hecha con quienes la usan."/></h2>
        <p><T en="The most useful feedback is specific. A few ideas:" fr="Les retours les plus utiles sont précis. Quelques idées :" es="Los comentarios más útiles son concretos. Algunas ideas:"/></p>
        <ol>
          <li><T en="Which screen or calculation were you using?" fr="Quel écran ou quel calcul utilisiez-vous ?" es="¿Qué pantalla o cálculo estaba usando?"/></li>
          <li><T en="What did you expect, and what happened instead?" fr="Qu’attendiez-vous, et que s’est-il passé ?" es="¿Qué esperaba y qué ocurrió?"/></li>
          <li><T en="Which fertilizer, crop or feature should we add next?" fr="Quel engrais, quelle culture ou fonction ajouter ensuite ?" es="¿Qué fertilizante, cultivo o función deberíamos añadir?"/></li>
        </ol>
      </aside>
    </div>
  </main>
}
