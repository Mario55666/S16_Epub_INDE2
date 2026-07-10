import { useState, useEffect, useRef, useCallback } from 'react';
import './mini-previews-effects.css';

/* =========================================================
   UTILIDAD: Generador de alturas para waveform
   ========================================================= */
function useWaveformBars(playing: boolean, count: number, speed = 150) {
  const [heights, setHeights] = useState<number[]>(() => Array(count).fill(20));
  useEffect(() => {
    if (!playing) { setHeights(Array(count).fill(20)); return; }
    const iv = setInterval(() => {
      setHeights(Array.from({ length: count }, () => Math.random() * 80 + 20));
    }, speed);
    return () => clearInterval(iv);
  }, [playing, count, speed]);
  return heights;
}

/* =========================================================
   1. CAMPO DE TEXTO — Underline animado + glow
   ========================================================= */
export function MiniTextInput() {
  const [val, setVal] = useState('');
  const [focused, setFocused] = useState(false);
  return (
    <div className={`mp-text-input-wrapper ${focused ? 'focused' : ''}`} onClick={e => e.stopPropagation()}>
      <label className={`mp-input-label text-[8px] block mb-0.5 transition-all duration-200 ${focused ? 'text-blue-400' : 'text-muted-foreground'}`}>
        Nombre
      </label>
      <div className="relative">
        <input
          type="text"
          value={val}
          onChange={e => setVal(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Escribe aqui..."
          className="mp-input-field w-full px-1.5 py-0.5 text-[9px] rounded text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
        />
        <div className="mp-input-underline" />
      </div>
      {val && (
        <span className="text-[7px] text-blue-400/60 mt-0.5 block animate-in fade-in">
          {val.length} caracteres
        </span>
      )}
    </div>
  );
}

/* =========================================================
   2. EMAIL — Validacion con iconos + shake
   ========================================================= */
export function MiniEmail() {
  const [val, setVal] = useState('');
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (!val) { setStatus('idle'); return; }
    setStatus(re.test(val) ? 'valid' : 'invalid');
  }, [val]);

  return (
    <div className={`mp-email-wrapper ${status} space-y-1`} onClick={e => e.stopPropagation()}>
      <label className="text-[8px] text-muted-foreground">Email</label>
      <div className="relative">
        <input
          type="email"
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="correo@ejemplo.com"
          className="mp-email-input w-full px-1.5 py-0.5 text-[9px] rounded border bg-white/10 text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-300 pr-5"
        />
        {/* Icono check */}
        <span className={`mp-email-icon check absolute right-1 top-1/2 -translate-y-1/2 text-emerald-400 text-[10px]`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        {/* Icono xmark */}
        <span className={`mp-email-icon xmark absolute right-1 top-1/2 -translate-y-1/2 text-red-400 text-[10px]`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      </div>
      {status === 'valid' && (
        <span className="text-[7px] text-emerald-400 flex items-center gap-0.5 animate-in fade-in">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
          Correo valido
        </span>
      )}
      {status === 'invalid' && (
        <span className="text-[7px] text-red-400 flex items-center gap-0.5 animate-in fade-in">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Formato invalido
        </span>
      )}
    </div>
  );
}

/* =========================================================
   3. CHECKBOX — SVG stroke animation + bounce
   ========================================================= */
export function MiniCheckbox() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
      <div
        className={`mp-checkbox-box ${checked ? 'checked' : ''}`}
        onClick={() => setChecked(!checked)}
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setChecked(!checked); } }}
      >
        <svg className="mp-check-svg" width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: 24, strokeDashoffset: checked ? 0 : 24, transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>
      </div>
      <span className="text-[9px] select-none cursor-pointer" onClick={() => setChecked(!checked)}>
        Aceptar terminos
      </span>
    </div>
  );
}

/* =========================================================
   4. RADIO BUTTON — Pulso + glow
   ========================================================= */
export function MiniRadioButton() {
  const [sel, setSel] = useState(0);
  const opts = ['Basico', 'Intermedio', 'Avanzado'];
  return (
    <div className="space-y-0.5" onClick={e => e.stopPropagation()}>
      <span className="text-[8px] text-muted-foreground block mb-0.5">Nivel:</span>
      {opts.map((o, i) => (
        <label key={i} className="flex items-center gap-1 cursor-pointer group" onClick={() => setSel(i)}>
          <div className={`mp-radio-circle ${sel === i ? 'selected' : ''}`}>
            <div className="mp-radio-dot" />
          </div>
          <span className={`text-[8px] transition-colors duration-200 ${sel === i ? 'text-blue-400' : 'text-muted-foreground group-hover:text-foreground'}`}>
            {o}
          </span>
        </label>
      ))}
    </div>
  );
}

/* =========================================================
   5. DROPDOWN — Slide down + hover highlight
   ========================================================= */
export function MiniDropdown() {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState('');
  const opts = ['Lima', 'Arequipa', 'Cusco', 'Trujillo'];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref} onClick={e => e.stopPropagation()}>
      <button
        onClick={() => setOpen(!open)}
        className={`mp-dropdown-trigger w-full px-1.5 py-0.5 text-[9px] rounded border bg-white/10 text-left flex items-center justify-between transition-all ${open ? 'open border-blue-500/50' : 'border-white/20 hover:border-white/30'}`}
      >
        <span className={val ? 'text-foreground' : 'text-muted-foreground/50'}>{val || 'Seleccionar...'}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="mp-dropdown-menu absolute top-full left-0 right-0 mt-0.5 bg-[#1e293b] border border-white/10 rounded shadow-xl z-50 max-h-20 overflow-y-auto">
          {opts.map((o, i) => (
            <div
              key={o}
              onClick={() => { setVal(o); setOpen(false); }}
              className="mp-dropdown-item px-2 py-0.5 text-[8px] cursor-pointer relative text-muted-foreground hover:text-foreground"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <span className="relative z-10">{o}</span>
            </div>
          ))}
        </div>
      )}
      {val && (
        <span className="text-[7px] text-blue-400/70 mt-0.5 block animate-in fade-in">
          Seleccionado: <strong>{val}</strong>
        </span>
      )}
    </div>
  );
}

/* =========================================================
   6. AREA DE TEXTO — Barra de progreso del limite
   ========================================================= */
export function MiniTextarea() {
  const [val, setVal] = useState('');
  const max = 500;
  const pct = Math.min(100, (val.length / max) * 100);
  const getCounterClass = () => {
    if (val.length >= max) return 'danger';
    if (val.length >= max * 0.85) return 'warning';
    return '';
  };
  const getProgressColor = () => {
    if (val.length >= max) return '#ef4444';
    if (val.length >= max * 0.85) return '#f59e0b';
    if (val.length >= max * 0.5) return '#3b82f6';
    return '#06b6d4';
  };
  return (
    <div className="mp-textarea-wrapper space-y-0.5" onClick={e => e.stopPropagation()}>
      <div className="relative">
        <textarea
          value={val}
          onChange={e => setVal(e.target.value.slice(0, max))}
          placeholder="Escribe tu comentario..."
          rows={2}
          maxLength={max}
          className="w-full px-1.5 py-0.5 text-[9px] rounded border border-white/20 bg-white/10 text-foreground placeholder:text-muted-foreground/40 resize-none focus:border-blue-500/50 focus:outline-none transition-all relative z-10"
        />
        <div
          className="mp-textarea-progress"
          style={{ width: `${pct}%`, background: getProgressColor() }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className={`mp-textarea-counter text-[7px] ${getCounterClass()}`}>
          {val.length} / {max}
        </span>
        <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${pct}%`, background: getProgressColor() }}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   7. BOTON ENVIAR — Ripple + gradiente + confetti
   ========================================================= */
export function MiniSubmitButton() {
  const [clicked, setClicked] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // Ripple effect
    const btn = btnRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'mp-ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
    setClicked(true);
    setTimeout(() => setClicked(false), 1200);
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={`mp-submit-btn relative px-3 py-1 text-[9px] font-medium rounded text-white overflow-hidden ${clicked ? 'success' : ''}`}
    >
      {clicked && (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="mp-confetti-piece"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: '50%',
                background: ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][i],
                animationDelay: `${Math.random() * 0.2}s`,
              }}
            />
          ))}
          <span className="relative z-10 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            Enviado!
          </span>
        </>
      )}
      {!clicked && (
        <span className="relative z-10">Enviar</span>
      )}
    </button>
  );
}

/* =========================================================
   8. VIDEO HTML5 — Waveform realista + glow
   ========================================================= */
export function MiniVideo() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const bars = useWaveformBars(playing, 16, 120);

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setProgress(p => p >= 100 ? 0 : p + 1.5), 100);
    return () => clearInterval(iv);
  }, [playing]);

  return (
    <div className="space-y-1" onClick={e => e.stopPropagation()}>
      <div className={`mp-video-container ${playing ? 'playing' : ''} relative bg-black/50 rounded border border-white/10 aspect-video flex items-center justify-center overflow-hidden`}>
        {/* Waveform background */}
        {playing && (
          <div className="absolute inset-0 flex items-center justify-center gap-[2px] px-4 z-0">
            {bars.map((h, i) => (
              <div
                key={i}
                className="mp-video-waveform-bar w-[2px] rounded-full"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(to top, rgba(59,130,246,0.6), rgba(6,182,212,0.4))`,
                  transitionDelay: `${i * 10}ms`,
                }}
              />
            ))}
          </div>
        )}
        {/* Play button */}
        <button
          onClick={() => setPlaying(!playing)}
          className="mp-video-play-btn relative z-10 w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center backdrop-blur-sm border border-white/10"
        >
          {playing ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          )}
        </button>
        {/* Time display */}
        {playing && (
          <span className="absolute bottom-0.5 left-1.5 text-[6px] text-white/50 font-mono z-10">
            {Math.floor((progress / 100) * 120)}s / 2:00
          </span>
        )}
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   9. AUDIO PLAYER — Visualizador de frecuencias
   ========================================================= */
export function MiniAudio() {
  const [playing, setPlaying] = useState(false);
  const bars = useWaveformBars(playing, 20, 100);

  return (
    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white/[0.03] border border-white/10" onClick={e => e.stopPropagation()}>
      <button
        onClick={() => setPlaying(!playing)}
        className={`mp-audio-play-btn w-6 h-6 rounded-full flex items-center justify-center border transition-all ${playing ? 'playing' : 'border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400'}`}
      >
        {playing ? (
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
        ) : (
          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        )}
      </button>
      <div className="flex-1 flex items-end gap-[2px] h-4">
        {bars.map((h, i) => (
          <div
            key={i}
            className="mp-audio-bar flex-1"
            style={{ height: `${h}%`, opacity: 0.5 + (h / 200) }}
          />
        ))}
      </div>
      {playing && (
        <span className="text-[6px] text-blue-400/60 font-mono animate-pulse">♪</span>
      )}
    </div>
  );
}

/* =========================================================
   10. TABS — Indicador deslizante + fade
   ========================================================= */
export function MiniTabs() {
  const [active, setActive] = useState(0);
  const tabs = ['Info', 'Datos', 'Galeria'];
  const contents = [
    'Informacion general del capitulo interactivo.',
    'Estadisticas y datos sobre el simbolismo de espacio.',
    'Galeria de imagenes y recursos visuales.'
  ];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const tab = tabRefs.current[active];
    if (tab) {
      setIndicatorStyle({ left: tab.offsetLeft, width: tab.offsetWidth });
    }
  }, [active]);

  return (
    <div onClick={e => e.stopPropagation()}>
      <div className="mp-tabs-list relative border-b border-white/10 pb-0">
        {tabs.map((t, i) => (
          <button
            key={i}
            ref={el => { tabRefs.current[i] = el; }}
            onClick={() => setActive(i)}
            className={`mp-tab-btn px-2 py-0.5 text-[8px] rounded-t transition-all ${active === i ? 'active' : 'text-muted-foreground'}`}
          >
            {t}
          </button>
        ))}
        <div
          className="mp-tab-indicator"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />
      </div>
      <div className="mp-tab-panel p-1.5 text-[8px] text-muted-foreground min-h-[28px] bg-white/[0.02] rounded-b">
        {contents[active]}
      </div>
    </div>
  );
}

/* =========================================================
   11. ACORDEON — Smooth height + rotacion icono
   ========================================================= */
export function MiniAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const items = [
    { q: 'Que es EPUB3?', a: 'Formato de publicacion digital basado en HTML5, CSS3 y JavaScript. Es un contenedor web que funciona como un sitio web dentro de un lector de ebooks.' },
    { q: 'Soporta interactividad?', a: 'Si, en lectores compatibles como Thorium Reader, Apple Books y Readium. Permite formularios, animaciones, video y audio.' },
  ];

  return (
    <div className="space-y-0.5" onClick={e => e.stopPropagation()}>
      {items.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i} className="mp-accordion-item border border-white/5 rounded overflow-hidden">
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className={`mp-accordion-trigger w-full flex items-center justify-between px-1.5 py-0.5 text-[8px] ${isOpen ? 'open bg-blue-500/5' : ''}`}
            >
              <span className="truncate font-medium">{item.q}</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`mp-accordion-icon flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <div
              ref={el => { contentRefs.current[i] = el; }}
              className={`mp-accordion-content ${isOpen ? 'open' : ''}`}
              style={{
                maxHeight: isOpen ? (contentRefs.current[i]?.scrollHeight || 60) + 'px' : '0px',
                padding: isOpen ? '4px 6px' : '0px 6px',
              }}
            >
              <p className="text-[7px] text-muted-foreground leading-relaxed">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   12. MODAL — Backdrop blur + slide up
   ========================================================= */
export function MiniModal() {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={e => e.stopPropagation()}>
      <button
        onClick={() => setOpen(true)}
        className="px-2 py-0.5 text-[9px] rounded bg-white/10 border border-white/20 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all text-foreground"
      >
        Abrir modal
      </button>
      {open && (
        <div className="mp-modal-overlay fixed inset-0 z-[100] flex items-center justify-center" onClick={() => setOpen(false)}>
          <div className="mp-modal-backdrop absolute inset-0 bg-black/60" />
          <div
            className="mp-modal-content relative bg-[#1e293b] border border-white/10 rounded-lg p-4 max-w-[220px] shadow-2xl w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/10 hover:bg-red-500/80 hover:text-white flex items-center justify-center transition-all text-muted-foreground text-[10px]"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              </div>
              <h4 className="text-[10px] font-semibold">Modal Interactivo</h4>
            </div>
            <p className="text-[8px] text-muted-foreground leading-relaxed">
              Este modal se abrio con JavaScript real. Incluye backdrop blur, animacion de entrada y puede cerrarse con Escape o clic fuera.
            </p>
            <div className="flex gap-1.5 mt-2">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-0.5 text-[8px] rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all border border-blue-500/30"
              >
                Aceptar
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-0.5 text-[8px] rounded bg-white/5 text-muted-foreground hover:bg-white/10 transition-all border border-white/10"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   13. CARRUSEL — Transiciones + swipe indicator
   ========================================================= */
export function MiniCarousel() {
  const [idx, setIdx] = useState(0);
  const slides = [
    { gradient: 'from-blue-600 to-cyan-500', label: 'Slide 1', icon: '📘' },
    { gradient: 'from-purple-600 to-pink-500', label: 'Slide 2', icon: '📕' },
    { gradient: 'from-emerald-600 to-teal-500', label: 'Slide 3', icon: '📗' },
  ];

  return (
    <div className="space-y-1" onClick={e => e.stopPropagation()}>
      <div className="relative h-12 rounded-lg overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`mp-carousel-slide absolute inset-0 bg-gradient-to-r ${s.gradient} flex items-center justify-center transition-all duration-500`}
            style={{
              opacity: idx === i ? 1 : 0,
              transform: idx === i ? 'scale(1)' : 'scale(1.05)',
            }}
          >
            <span className="text-[10px] font-bold text-white drop-shadow-lg flex items-center gap-1">
              {s.icon} {s.label}
            </span>
          </div>
        ))}
        <button
          onClick={() => setIdx(i => (i - 1 + slides.length) % slides.length)}
          className="mp-carousel-nav-btn absolute left-0.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button
          onClick={() => setIdx(i => (i + 1) % slides.length)}
          className="mp-carousel-nav-btn absolute right-0.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
      <div className="flex justify-center gap-1">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`mp-carousel-dot h-1 rounded-full transition-all duration-300 ${idx === i ? 'active w-3.5' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   14. BARRA DE PROGRESO — Shimmer + celebracion
   ========================================================= */
export function MiniProgressBar() {
  const [prog, setProg] = useState(35);
  const [celebrating, setCelebrating] = useState(false);
  const isComplete = prog >= 100;

  const handleAdd = () => {
    const newProg = Math.min(100, prog + 15);
    setProg(newProg);
    if (newProg >= 100 && prog < 100) {
      setCelebrating(true);
      setTimeout(() => setCelebrating(false), 2000);
    }
  };

  return (
    <div className="space-y-1" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between">
        <span className="text-[8px] text-muted-foreground">Progreso</span>
        <span className={`text-[8px] font-mono font-semibold transition-colors ${isComplete ? 'text-emerald-400' : 'text-blue-400'}`}>
          {prog}%
        </span>
      </div>
      <div className="mp-progress-track h-2">
        <div className={`mp-progress-fill ${isComplete ? 'complete' : ''}`} style={{ width: `${prog}%` }} />
      </div>
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleAdd}
          className="mp-progress-btn px-2 py-0.5 rounded text-[8px] text-blue-400"
        >
          +15%
        </button>
        {isComplete && (
          <span className="text-[7px] text-emerald-400 flex items-center gap-0.5 animate-in fade-in">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            Completado!
          </span>
        )}
      </div>
      {celebrating && (
        <div className="relative h-4 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-[8px]"
              style={{
                left: `${Math.random() * 100}%`,
                animation: `mp-confetti 1s ease-out forwards`,
                animationDelay: `${Math.random() * 0.3}s`,
                color: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'][i % 5],
              }}
            >
              {['★', '●', '■', '▲', '♦'][i % 5]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   15. TOOLTIP — Float up + glow
   ========================================================= */
export function MiniTooltip() {
  const [show, setShow] = useState(false);
  return (
    <div className="flex justify-center" onClick={e => e.stopPropagation()}>
      <div
        className="relative"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      >
        <span className="mp-tooltip-trigger text-[9px] text-blue-400 border-b border-dashed border-blue-400/50 cursor-help">
          Pasa el mouse aqui
        </span>
        {show && (
          <div className="mp-tooltip-box absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 bg-[#1e293b]/95 border border-white/10 rounded-lg shadow-xl shadow-blue-500/5 text-[8px] text-foreground whitespace-nowrap z-50 backdrop-blur-sm">
            <span className="flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Soy un tooltip con animacion!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   16. TARJETA HOVER — 3D tilt + shimmer
   ========================================================= */
export function MiniHoverCard() {
  return (
    <div className="mp-hover-card cursor-pointer group" onClick={e => e.stopPropagation()}>
      <div className="mp-hover-card-image h-10 w-full rounded-t-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <div className="p-1.5 bg-white/[0.03] rounded-b-lg border border-t-0 border-white/5">
        <p className="text-[8px] font-medium">Tarjeta interactiva</p>
        <p className="text-[7px] text-muted-foreground">Pasa el mouse para ver el efecto 3D</p>
      </div>
      <div className="mp-hover-card-overlay rounded-lg">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" className="mb-1">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
        <p className="text-[8px] font-semibold text-white">Dimension Mistica</p>
        <p className="text-[7px] text-white/60">Lo sobrenatural y magico</p>
      </div>
    </div>
  );
}

/* =========================================================
   17. SCROLL REVEAL — Stagger + blur fade
   ========================================================= */
export function MiniScrollReveal() {
  const [visible, setVisible] = useState(false);
  const items = [
    { text: 'Contenido que se revela progresivamente con animacion.', color: 'from-blue-500/10 to-cyan-500/5', border: 'border-blue-500/20' },
    { text: 'Ideal para experiencias de lectura dinamicas en EPUB3.', color: 'from-purple-500/10 to-pink-500/5', border: 'border-purple-500/20' },
    { text: 'Usa IntersectionObserver para detectar el viewport.', color: 'from-emerald-500/10 to-teal-500/5', border: 'border-emerald-500/20' },
  ];

  return (
    <div className="space-y-1" onClick={e => e.stopPropagation()}>
      <button
        onClick={() => setVisible(!visible)}
        className="mp-reveal-btn px-2 py-0.5 rounded text-[8px] text-blue-400"
      >
        {visible ? (
          <span className="flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
            Ocultar
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            Revelar
          </span>
        )}
      </button>
      {items.map((item, i) => (
        <div
          key={i}
          className={`mp-reveal-item p-1.5 rounded bg-gradient-to-r ${item.color} border ${item.border} ${visible ? 'visible' : ''}`}
        >
          <p className="text-[8px] text-foreground/80">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
