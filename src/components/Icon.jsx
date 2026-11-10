// One stroke icon set (24px grid, 1.75 stroke) used instead of text glyphs.
const paths = {
  'arrow-up-right': <><path d="M7 17 17 7"/><path d="M8.5 7H17v8.5"/></>,
  'arrow-right': <><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></>,
  'arrow-left': <><path d="M19.5 12h-15"/><path d="m10.5 6-6 6 6 6"/></>,
  'arrow-down': <><path d="M12 4.5v15"/><path d="m6 13.5 6 6 6-6"/></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5"/>,
  plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
  menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
  close: <><path d="M6 6l12 12"/><path d="M18 6 6 18"/></>,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  star: <path d="m12 3.8 2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z"/>,
}

export default function Icon({ name, size = 18, className = '', label }) {
  return <svg className={'ac-icon ' + className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden={label ? undefined : 'true'} role={label ? 'img' : undefined} aria-label={label} focusable="false">{paths[name]}</svg>
}
