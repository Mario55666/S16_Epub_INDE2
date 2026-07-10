export type ComponentCategory = 'formularios' | 'multimedia' | 'navegacion' | 'contenido' | 'animacion';

export interface InteractiveComponent {
  id: string;
  name: string;
  icon: string;
  category: ComponentCategory;
  categoryLabel: string;
  description: string;
  indesignSteps: string[];
  htmlFormula: string;
  cssFormula: string;
  jsFormula: string;
  previewHeight: number;
  previewWidth: number;
}

export const categories: { id: ComponentCategory; label: string }[] = [
  { id: 'formularios', label: 'Formularios' },
  { id: 'multimedia', label: 'Multimedia' },
  { id: 'navegacion', label: 'Navegacion' },
  { id: 'contenido', label: 'Contenido UI' },
  { id: 'animacion', label: 'Animacion' },
];

export const components: InteractiveComponent[] = [
  {
    id: 'text-input',
    name: 'Campo de Texto',
    icon: 'Type',
    category: 'formularios',
    categoryLabel: 'Formularios',
    description: 'Campo de entrada de texto con validacion HTML5 para formularios EPUB3.',
    indesignSteps: [
      'Abre el panel: Ventana > Interactivo > Botones y formularios',
      'Selecciona la herramienta Marco de texto y dibuja un recuadro',
      'Con el marco seleccionado, haz clic en "Campo de texto" en el panel',
      'En el panel, asigna un Nombre descriptivo (ej: campo_nombre)',
      'Configura: Formato > Texto plano, Caracteres max: 50',
      'En Apariencia: activa Borde y color de relleno del campo',
      'Exporta como EPUB (Interactivo) - NO EPUB de maquetacion fija'
    ],
    htmlFormula: `<input type="text" 
       id="nombre" 
       name="nombre"
       placeholder="Escribe tu nombre" 
       required 
       maxlength="50" />`,
    cssFormula: `input[type="text"] {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  background: #fff;
  transition: border-color 0.3s, box-shadow 0.3s;
}
input[type="text"]:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
  outline: none;
}`,
    jsFormula: `// Validacion al enviar
document.getElementById('nombre').addEventListener('blur', function() {
  if (this.value.trim() === '') {
    this.style.borderColor = '#ef4444';
  } else {
    this.style.borderColor = '#22c55e';
  }
});`,
    previewWidth: 200,
    previewHeight: 45,
  },
  {
    id: 'email-input',
    name: 'Email',
    icon: 'Mail',
    category: 'formularios',
    categoryLabel: 'Formularios',
    description: 'Campo de correo electronico con validacion automatica de formato.',
    indesignSteps: [
      'Ventana > Interactivo > Botones y formularios',
      'Crea un marco de texto en la mesa de trabajo',
      'Clic en "Campo de texto" en el panel',
      'Nombre: campo_email',
      'IMPORTANTE: Formato > Correo electronico (valida @ y dominio)',
      'Mensaje de error personalizado en "Descripcion"',
      'Exporta como EPUB (Interactivo)'
    ],
    htmlFormula: `<input type="email" 
       id="email" 
       name="email"
       placeholder="correo@ejemplo.com" 
       required
       pattern="[^\\s@]+@[^\\s@]+\\.[^\\s@]+" />`,
    cssFormula: `input[type="email"] {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  background: #fff;
}
input[type="email"]:invalid {
  border-color: #ef4444;
}
input[type="email"]:valid {
  border-color: #22c55e;
}`,
    jsFormula: `// Validacion de email con regex
document.getElementById('email').addEventListener('input', function() {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (emailRegex.test(this.value)) {
    this.style.borderColor = '#22c55e';
  } else if (this.value.length > 0) {
    this.style.borderColor = '#f59e0b';
  }
});`,
    previewWidth: 220,
    previewHeight: 45,
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    icon: 'CheckSquare',
    category: 'formularios',
    categoryLabel: 'Formularios',
    description: 'Casilla de verificacion para opciones multiples.',
    indesignSteps: [
      'Ventana > Interactivo > Botones y formularios',
      'Crea un marco de texto pequeno (cuadrado)',
      'Clic en "Casilla de verificacion" en el panel',
      'Nombre: grupo_opciones (mismo nombre para grupo)',
      'Valor exportado: si / no',
      'Marcado predeterminado: desactivado',
      'Duplica para multiples opciones'
    ],
    htmlFormula: `<label class="checkbox-label">
  <input type="checkbox" 
         name="suscripcion" 
         value="newsletter" />
  <span>Suscribirme al newsletter</span>
</label>`,
    cssFormula: `.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 15px;
}
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #3b82f6;
  cursor: pointer;
}`,
    jsFormula: `// Leer estado del checkbox
document.querySelector('input[name="suscripcion"]')
  .addEventListener('change', function() {
    console.log('Suscrito:', this.checked);
    // Guardar en localStorage
    localStorage.setItem('suscripcion', this.checked);
  });`,
    previewWidth: 220,
    previewHeight: 35,
  },
  {
    id: 'radio-button',
    name: 'Radio Button',
    icon: 'CircleDot',
    category: 'formularios',
    categoryLabel: 'Formularios',
    description: 'Boton de opcion unica para seleccion exclusiva.',
    indesignSteps: [
      'Ventana > Interactivo > Botones y formularios',
      'Crea un marco circular pequeno (20x20 px)',
      'Clic en "Boton de opcion" en el panel',
      'Mismo nombre para todo el grupo (ej: nivel)',
      'Valor diferente para cada opcion (basico, intermedio, avanzado)',
      'Solo uno puede estar seleccionado por grupo'
    ],
    htmlFormula: `<fieldset>
  <legend>Nivel de experiencia:</legend>
  <label><input type="radio" name="nivel" 
         value="principiante" /> Principiante</label>
  <label><input type="radio" name="nivel" 
         value="intermedio" checked /> Intermedio</label>
  <label><input type="radio" name="nivel" 
         value="avanzado" /> Avanzado</label>
</fieldset>`,
    cssFormula: `fieldset {
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  padding: 16px;
}
legend {
  font-weight: 600;
  padding: 0 8px;
}
input[type="radio"] {
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
  margin-right: 6px;
}`,
    jsFormula: `// Obtener seleccion
document.querySelectorAll('input[name="nivel"]')
  .forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        console.log('Nivel:', this.value);
        // Guardar seleccion
        localStorage.setItem('nivel', this.value);
      }
    });
  });`,
    previewWidth: 240,
    previewHeight: 110,
  },
  {
    id: 'dropdown',
    name: 'Lista desplegable',
    icon: 'List',
    category: 'formularios',
    categoryLabel: 'Formularios',
    description: 'Menu desplegable con opciones seleccionables.',
    indesignSteps: [
      'Ventana > Interactivo > Botones y formularios',
      'Crea un marco de texto rectangular',
      'Clic en "Lista desplegable" en el panel',
      'Nombre: lista_ciudades',
      'En Elementos: agrega cada opcion (Lima, Arequipa, Cusco...)',
      'Valor por elemento: el mismo texto o abreviatura',
      'Permitir seleccion multiple: No (para seleccion unica)'
    ],
    htmlFormula: `<label for="ciudad">Ciudad:</label>
<select id="ciudad" name="ciudad" required>
  <option value="" disabled selected>
    Selecciona una ciudad
  </option>
  <option value="lima">Lima</option>
  <option value="arequipa">Arequipa</option>
  <option value="cusco">Cusco</option>
  <option value="trujillo">Trujillo</option>
</select>`,
    cssFormula: `select {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  background: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,...");
  background-repeat: no-repeat;
  background-position: right 12px center;
}
select:focus {
  border-color: #3b82f6;
  outline: none;
}`,
    jsFormula: `// Detectar cambio
document.getElementById('ciudad').addEventListener('change', function() {
  const ciudad = this.value;
  const ciudadTexto = this.options[this.selectedIndex].text;
  console.log('Seleccionado:', ciudadTexto);
  
  // Guardar preferencia
  localStorage.setItem('ciudad', ciudad);
});`,
    previewWidth: 220,
    previewHeight: 75,
  },
  {
    id: 'textarea',
    name: 'Area de Texto',
    icon: 'Text',
    category: 'formularios',
    categoryLabel: 'Formularios',
    description: 'Campo de texto multilinea para comentarios extensos.',
    indesignSteps: [
      'Ventana > Interactivo > Botones y formularios',
      'Crea un marco de texto grande (200x100 px minimo)',
      'Clic en "Campo de texto" en el panel',
      'Nombre: campo_comentario',
      'Marca "Multilinea" en las opciones',
      'Caracteres max: 500',
      'Barra de desplazamiento: Auto'
    ],
    htmlFormula: `<label for="comentario">Comentario:</label>
<textarea id="comentario" 
          name="comentario"
          rows="5" 
          cols="40"
          maxlength="500"
          placeholder="Escribe tu comentario aqui..."></textarea>
<small id="contador">0 / 500 caracteres</small>`,
    cssFormula: `textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
}
textarea:focus {
  border-color: #3b82f6;
  outline: none;
}
#contador {
  display: block;
  text-align: right;
  color: #6b7280;
  font-size: 12px;
  margin-top: 4px;
}`,
    jsFormula: `// Contador de caracteres
const textarea = document.getElementById('comentario');
const contador = document.getElementById('contador');

textarea.addEventListener('input', function() {
  const usados = this.value.length;
  contador.textContent = usados + ' / 500 caracteres';
  
  if (usados > 450) {
    contador.style.color = '#ef4444';
  } else {
    contador.style.color = '#6b7280';
  }
  
  // Autoguardado
  localStorage.setItem('comentario', this.value);
});`,
    previewWidth: 260,
    previewHeight: 145,
  },
  {
    id: 'submit-button',
    name: 'Boton Enviar',
    icon: 'MousePointerClick',
    category: 'formularios',
    categoryLabel: 'Formularios',
    description: 'Boton de accion para enviar formularios o ejecutar JavaScript.',
    indesignSteps: [
      'Ventana > Interactivo > Botones y formularios',
      'Crea un marco de texto para el boton',
      'Escribe "Enviar" dentro del marco',
      'Clic en "Boton" en el panel',
      'Nombre: btn_enviar',
      'Evento: Al soltar o tocar',
      'Accion: Enviar formulario > mailto:correo@ejemplo.com'
    ],
    htmlFormula: `<button type="submit" class="btn-enviar">
  Enviar formulario
</button>

<!-- O como accion JS: -->
<button type="button" 
        onclick="enviarFormulario()"
        class="btn-accion">
  Ejecutar accion
</button>`,
    cssFormula: `.btn-enviar, .btn-accion {
  padding: 12px 28px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(59,130,246,0.3);
}
.btn-enviar:hover, .btn-accion:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59,130,246,0.4);
}
.btn-enviar:active, .btn-accion:active {
  transform: translateY(0);
}`,
    jsFormula: `function enviarFormulario() {
  const datos = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value
  };
  
  // Enviar por mailto (sin servidor)
  const subject = 'Formulario EPUB3';
  const body = 'Nombre: ' + datos.nombre + 
               '\\nEmail: ' + datos.email;
  window.location.href = 'mailto:correo@ejemplo.com' + 
    '?subject=' + encodeURIComponent(subject) + 
    '&body=' + encodeURIComponent(body);
}`,
    previewWidth: 180,
    previewHeight: 48,
  },
  {
    id: 'video',
    name: 'Video HTML5',
    icon: 'Video',
    category: 'multimedia',
    categoryLabel: 'Multimedia',
    description: 'Reproductor de video embebido con controles nativos.',
    indesignSteps: [
      'Archivo > Colocar > Selecciona el archivo MP4',
      'Dibuja el marco donde ira el video',
      'Ventana > Interactivo > Botones y formularios',
      'Clic en "Video" en el panel',
      'Ajusta: Reproduccion automatica (Si/No)',
      'Controles: Mostrar controles de reproduccion',
      'Poster: imagen de portada antes de reproducir'
    ],
    htmlFormula: `<video controls 
       preload="metadata" 
       poster="images/poster.jpg"
       width="100%">
  <source src="media/video.mp4" type="video/mp4" />
  <source src="media/video.webm" type="video/webm" />
  <p>Tu lector no soporta video.
     <a href="media/video.mp4">Descargar</a>
  </p>
</video>`,
    cssFormula: `video {
  width: 100%;
  max-width: 640px;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}
/* Controles personalizados (si el lector lo permite) */
video::-webkit-media-controls {
  border-radius: 0 0 10px 10px;
}`,
    jsFormula: `// Control programatico del video
const video = document.querySelector('video');

// Reproducir al hacer clic en la pagina
document.addEventListener('click', function(e) {
  if (e.target.tagName !== 'VIDEO') return;
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

// Guardar progreso cada 5 segundos
video.addEventListener('timeupdate', function() {
  if (Math.floor(video.currentTime) % 5 === 0) {
    localStorage.setItem('video_progress', video.currentTime);
  }
});`,
    previewWidth: 280,
    previewHeight: 160,
  },
  {
    id: 'audio',
    name: 'Audio Player',
    icon: 'Headphones',
    category: 'multimedia',
    categoryLabel: 'Multimedia',
    description: 'Reproductor de audio con controles personalizados.',
    indesignSteps: [
      'Archivo > Colocar > Selecciona el archivo MP3',
      'Ventana > Interactivo > Botones y formularios',
      'Clic en "Audio" en el panel',
      'Ocultar icono de reproductor: Si (usar botones custom)',
      'Crea botones Play/Pausa con estados Normal/Rollover/Clic',
      'Asigna accion: Reproducir/Pausar al boton correspondiente',
      'Reproduccion automatica: No (accesibilidad)'
    ],
    htmlFormula: `<audio id="miAudio" preload="metadata">
  <source src="media/audio.mp3" type="audio/mpeg" />
  <source src="media/audio.ogg" type="audio/ogg" />
</audio>

<div class="audio-controls">
  <button onclick="document.getElementById('miAudio').play()">
    ▶ Play
  </button>
  <button onclick="document.getElementById('miAudio').pause()">
    ⏸ Pause
  </button>
  <input type="range" id="volumen" 
         min="0" max="1" step="0.1" value="0.8" />
</div>`,
    cssFormula: `.audio-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #1f2937;
  border-radius: 12px;
}
.audio-controls button {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.audio-controls input[type="range"] {
  width: 100px;
  accent-color: #3b82f6;
}`,
    jsFormula: `const audio = document.getElementById('miAudio');
const volumen = document.getElementById('volumen');

// Control de volumen
volumen.addEventListener('input', function() {
  audio.volume = this.value;
});

// Cargar volumen guardado
const volGuardado = localStorage.getItem('volumen');
if (volGuardado) {
  audio.volume = parseFloat(volGuardado);
  volumen.value = volGuardado;
}

// Guardar volumen
volumen.addEventListener('change', function() {
  localStorage.setItem('volumen', this.value);
});`,
    previewWidth: 260,
    previewHeight: 55,
  },
  {
    id: 'tabs',
    name: 'Tabs / Pestañas',
    icon: 'FolderKanban',
    category: 'navegacion',
    categoryLabel: 'Navegacion',
    description: 'Sistema de pestañas para organizar contenido en secciones.',
    indesignSteps: [
      'En InDesign: NO existe tabs nativo - se implementa con HTML',
      'Crea marcos de texto para cada "boton de pestaña"',
      'Ventana > Interactivo > Botones y formularios',
      'Convierte cada texto en Boton',
      'Asigna: Al soltar > Mostrar/Ocultar botones y formularios',
      'Crea marcos ocultos con el contenido de cada pestaña',
      'Al hacer clic en tab1: muestra contenido1, oculta contenido2,3...'
    ],
    htmlFormula: `<div class="tabs">
  <div class="tab-list">
    <button class="tab-btn active" 
            data-tab="1">Contenido</button>
    <button class="tab-btn" 
            data-tab="2">Ejercicios</button>
    <button class="tab-btn" 
            data-tab="3">Recursos</button>
  </div>
  <div class="tab-panel active" id="panel-1">
    <p>Contenido de la pestaña 1...</p>
  </div>
  <div class="tab-panel" id="panel-2" hidden>
    <p>Ejercicios practicos...</p>
  </div>
  <div class="tab-panel" id="panel-3" hidden>
    <p>Recursos adicionales...</p>
  </div>
</div>`,
    cssFormula: `.tab-list {
  display: flex;
  gap: 4px;
  border-bottom: 2px solid #e5e7eb;
}
.tab-btn {
  padding: 10px 20px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-size: 15px;
  color: #6b7280;
  transition: all 0.3s;
}
.tab-btn.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
  font-weight: 600;
}
.tab-btn:hover {
  color: #3b82f6;
}
.tab-panel {
  padding: 20px;
  display: none;
}
.tab-panel.active {
  display: block;
  animation: fadeIn 0.3s;
}`,
    jsFormula: `document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Desactivar todos
    document.querySelectorAll('.tab-btn, .tab-panel')
      .forEach(el => el.classList.remove('active'));
    // Activar seleccionado
    btn.classList.add('active');
    const panelId = 'panel-' + btn.dataset.tab;
    document.getElementById(panelId)
      .classList.add('active');
    
    // Guardar tab activa
    localStorage.setItem('tabActiva', btn.dataset.tab);
  });
});

// Restaurar tab
document.addEventListener('DOMContentLoaded', () => {
  const guardada = localStorage.getItem('tabActiva');
  if (guardada) {
    document.querySelector('[data-tab="' + guardada + '"]')
      ?.click();
  }
});`,
    previewWidth: 320,
    previewHeight: 130,
  },
  {
    id: 'accordion',
    name: 'Acordeon',
    icon: 'Rows3',
    category: 'navegacion',
    categoryLabel: 'Navegacion',
    description: 'Paneles colapsables para FAQs o contenido expandible.',
    indesignSteps: [
      'En InDesign: usa el par details/summary de HTML',
      'Crea marcos de texto para cada "pregunta" (cabecera)',
      'Ventana > Interactivo > Botones y formularios',
      'Convierte cada pregunta en Boton con estados',
      'Crea marcos ocultos con las "respuestas"',
      'Accion: Mostrar/Ocultar botones y formularios',
      'Al clic: muestra la respuesta, oculta las demas'
    ],
    htmlFormula: `<div class="accordion">
  <details class="accordion-item" open>
    <summary class="accordion-header">
      ¿Como insertar JavaScript en EPUB3?
    </summary>
    <div class="accordion-body">
      <p>Usa la etiqueta &lt;script&gt; en el HTML...</p>
    </div>
  </details>
  <details class="accordion-item">
    <summary class="accordion-header">
      ¿Que lectores soportan interactividad?
    </summary>
    <div class="accordion-body">
      <p>Thorium, Apple Books, Readium...</p>
    </div>
  </details>
</div>`,
    cssFormula: `.accordion-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
}
.accordion-header {
  padding: 14px 18px;
  background: #f9fafb;
  cursor: pointer;
  font-weight: 600;
  list-style: none;
  display: flex;
  justify-content: space-between;
}
.accordion-header::after {
  content: '+';
  font-size: 18px;
  color: #6b7280;
}
.accordion-item[open] .accordion-header::after {
  content: '−';
}
.accordion-body {
  padding: 14px 18px;
  background: white;
}
.accordion-item[open] .accordion-body {
  animation: slideDown 0.3s;
}`,
    jsFormula: `// Accordion con JS (control total)
document.querySelectorAll('.accordion-header').forEach(h => {
  h.addEventListener('click', () => {
    const item = h.parentElement;
    const isOpen = item.hasAttribute('open');
    
    // Cerrar todos (modo single)
    document.querySelectorAll('.accordion-item')
      .forEach(i => i.removeAttribute('open'));
    
    // Abrir el clickeado
    if (!isOpen) {
      item.setAttribute('open', '');
    }
  });
});`,
    previewWidth: 320,
    previewHeight: 120,
  },
  {
    id: 'tooltip',
    name: 'Tooltip / Info',
    icon: 'Info',
    category: 'contenido',
    categoryLabel: 'Contenido UI',
    description: 'Ventana emergente con informacion al pasar el mouse.',
    indesignSteps: [
      'En InDesign: usa el panel Botones para mostrar/ocultar',
      'Crea el elemento base (icono "i" o texto)',
      'Conviertelo en Boton',
      'Crea un marco oculto con el contenido del tooltip',
      'Evento: Al pasar el cursor > Mostrar marco tooltip',
      'Evento: Al alejar el cursor > Ocultar marco tooltip',
      'Estilo el marco tooltip: fondo oscuro, bordes redondeados'
    ],
    htmlFormula: `<div class="tooltip-wrapper">
  <span class="tooltip-trigger">ℹ️ Mas info</span>
  <div class="tooltip-content" role="tooltip">
    Este es un tooltip interactivo 
    con informacion adicional.
  </div>
</div>`,
    cssFormula: `.tooltip-wrapper {
  position: relative;
  display: inline-block;
}
.tooltip-trigger {
  cursor: help;
  border-bottom: 1px dashed #3b82f6;
  color: #3b82f6;
}
.tooltip-content {
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 14px;
  background: #1f2937;
  color: white;
  border-radius: 8px;
  font-size: 13px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  z-index: 100;
}
.tooltip-wrapper:hover .tooltip-content {
  opacity: 1;
  visibility: visible;
}`,
    jsFormula: `// Tooltip accesible con ARIA
document.querySelectorAll('.tooltip-trigger').forEach(t => {
  t.addEventListener('mouseenter', () => {
    const tip = t.nextElementSibling;
    tip.setAttribute('aria-hidden', 'false');
  });
  t.addEventListener('mouseleave', () => {
    const tip = t.nextElementSibling;
    tip.setAttribute('aria-hidden', 'true');
  });
});`,
    previewWidth: 120,
    previewHeight: 35,
  },
  {
    id: 'modal',
    name: 'Modal / Popup',
    icon: 'SquareStack',
    category: 'contenido',
    categoryLabel: 'Contenido UI',
    description: 'Ventana modal superpuesta para contenido destacado.',
    indesignSteps: [
      'Crea un boton "Abrir" y conviertelo en Boton',
      'Crea un marco que sera el fondo oscuro (backdrop)',
      'Crea otro marco para el contenido del modal',
      'Ambos marcos deben estar ocultos inicialmente',
      'Accion del boton: Mostrar backdrop + contenido modal',
      'Crea boton "Cerrar" (X) dentro del modal',
      'Accion de cerrar: Ocultar backdrop + contenido modal'
    ],
    htmlFormula: `<button onclick="abrirModal()" class="btn-modal">
  Abrir modal
</button>

<div id="modal" class="modal" hidden role="dialog" 
     aria-modal="true" aria-labelledby="modal-titulo">
  <div class="modal-backdrop" onclick="cerrarModal()"></div>
  <div class="modal-content">
    <button onclick="cerrarModal()" class="modal-close">
      ✕
    </button>
    <h2 id="modal-titulo">Titulo del Modal</h2>
    <p>Contenido del modal...</p>
  </div>
</div>`,
    cssFormula: `.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
}
.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
}
.modal-content {
  position: relative;
  margin: 10vh auto;
  max-width: 500px;
  padding: 28px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  animation: modalIn 0.3s;
}
.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}`,
    jsFormula: `function abrirModal() {
  document.getElementById('modal').hidden = false;
  document.body.style.overflow = 'hidden';
  // Foco al titulo para lectores de pantalla
  document.getElementById('modal-titulo').focus();
}
function cerrarModal() {
  document.getElementById('modal').hidden = true;
  document.body.style.overflow = '';
}
// Cerrar con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') cerrarModal();
});`,
    previewWidth: 140,
    previewHeight: 42,
  },
  {
    id: 'carousel',
    name: 'Carrusel',
    icon: 'Images',
    category: 'contenido',
    categoryLabel: 'Contenido UI',
    description: 'Galeria de imagenes deslizable con navegacion.',
    indesignSteps: [
      'En InDesign: NO existe carrusel nativo',
      'Solucion 1: Usa MSO (Estados de objeto multiestado)',
      'Ventana > Interactivo > Estados de objeto',
      'Crea estados con cada imagen del carrusel',
      'Crea botones "Anterior" y "Siguiente"',
      'Accion: Ir a estado siguiente / Ir a estado anterior',
      'Limitacion: MSO NO funciona en EPUB3 (solo Fixed Layout)'
    ],
    htmlFormula: `<div class="carousel">
  <div class="carousel-track" id="track">
    <div class="carousel-slide active">
      <img src="img/slide1.jpg" alt="Slide 1"/>
    </div>
    <div class="carousel-slide">
      <img src="img/slide2.jpg" alt="Slide 2"/>
    </div>
    <div class="carousel-slide">
      <img src="img/slide3.jpg" alt="Slide 3"/>
    </div>
  </div>
  <button class="carousel-prev" onclick="mover(-1)">‹</button>
  <button class="carousel-next" onclick="mover(1)">›</button>
</div>`,
    cssFormula: `.carousel {
  position: relative;
  max-width: 600px;
  overflow: hidden;
  border-radius: 12px;
}
.carousel-slide {
  display: none;
}
.carousel-slide.active {
  display: block;
  animation: fadeIn 0.5s;
}
.carousel-slide img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.carousel-prev, .carousel-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 12px 16px;
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 50%;
}
.carousel-prev { left: 12px; }
.carousel-next { right: 12px; }`,
    jsFormula: `let slideActual = 0;
const slides = document.querySelectorAll('.carousel-slide');

function mover(direccion) {
  slides[slideActual].classList.remove('active');
  slideActual = (slideActual + direccion + slides.length) 
                % slides.length;
  slides[slideActual].classList.add('active');
  // Guardar posicion
  localStorage.setItem('slideActual', slideActual);
}

// Auto-play cada 5 segundos
setInterval(() => mover(1), 5000);

// Restaurar al cargar
window.addEventListener('DOMContentLoaded', () => {
  const guardado = localStorage.getItem('slideActual');
  if (guardado) {
    slides[slideActual].classList.remove('active');
    slideActual = parseInt(guardado);
    slides[slideActual].classList.add('active');
  }
});`,
    previewWidth: 300,
    previewHeight: 180,
  },
  {
    id: 'progress-bar',
    name: 'Barra de Progreso',
    icon: 'BarChart3',
    category: 'animacion',
    categoryLabel: 'Animacion',
    description: 'Indicador visual de progreso con valor dinamico.',
    indesignSteps: [
      'Crea dos rectangulos superpuestos (fondo + relleno)',
      'El rectangulo de fondo: color gris claro',
      'El rectangulo de relleno: color primario',
      'Ambos con bordes redondeados',
      'Ventana > Interactivo > Animacion',
      'Animacion: "Escalar" en el eje X desde 0% al 100%',
      'Duracion: 2s, suavizado: Facilidad de entrada/salida'
    ],
    htmlFormula: `<div class="progress-wrapper">
  <label>Progreso: <span id="pct">0</span>%</label>
  <div class="progress-bar-bg">
    <div class="progress-bar-fill" id="barra"></div>
  </div>
  <button onclick="animarProgreso()">
    Iniciar
  </button>
</div>`,
    cssFormula: `.progress-bar-bg {
  width: 100%;
  height: 24px;
  background: #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  margin: 8px 0;
}
.progress-bar-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 12px;
  transition: width 0.5s ease;
}
.progress-bar-fill.animating {
  animation: progreso 3s ease-out forwards;
}
@keyframes progreso {
  0% { width: 0%; }
  100% { width: 100%; }
}`,
    jsFormula: `function animarProgreso() {
  const barra = document.getElementById('barra');
  const pct = document.getElementById('pct');
  
  let progreso = 0;
  const intervalo = setInterval(() => {
    progreso += 1;
    barra.style.width = progreso + '%';
    pct.textContent = progreso;
    
    if (progreso >= 100) {
      clearInterval(intervalo);
      localStorage.setItem('progreso', '100');
    }
  }, 30); // 3 segundos total
}

// Cargar progreso guardado
window.addEventListener('DOMContentLoaded', () => {
  const guardado = localStorage.getItem('progreso');
  if (guardado) {
    document.getElementById('barra').style.width = guardado + '%';
    document.getElementById('pct').textContent = guardado;
  }
});`,
    previewWidth: 260,
    previewHeight: 75,
  },
  {
    id: 'hover-card',
    name: 'Card con Hover',
    icon: 'PanelTop',
    category: 'animacion',
    categoryLabel: 'Animacion',
    description: 'Tarjeta interactiva con efectos al pasar el cursor.',
    indesignSteps: [
      'Crea un rectangulo como base de la tarjeta',
      'Ventana > Interactivo > Botones y formularios',
      'Conviertelo en Boton con 3 estados: Normal / Rollover / Clic',
      'Estado Normal: posicion original, color base',
      'Estado Rollover: desplazado -5px arriba, sombra aumentada',
      'Estado Clic: escala 0.98, color mas oscuro',
      'Limitacion: NO soporta transiciones suaves (cambio brusco)'
    ],
    htmlFormula: `<div class="card-interactive">
  <img src="img/cover.jpg" alt="Portada"/>
  <div class="card-body">
    <h3>Titulo de la tarjeta</h3>
    <p>Descripcion breve del contenido...</p>
    <button class="card-btn">Ver mas</button>
  </div>
</div>`,
    cssFormula: `.card-interactive {
  max-width: 280px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}
.card-interactive:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}
.card-interactive img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
.card-body {
  padding: 20px;
}
.card-btn {
  margin-top: 12px;
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}`,
    jsFormula: `// Efecto 3D al mover el mouse
document.querySelectorAll('.card-interactive').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = 
      \`perspective(1000px) rotateX(\${rotateX}deg) 
       rotateY(\${rotateY}deg) translateY(-8px)\`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});`,
    previewWidth: 200,
    previewHeight: 240,
  },
  {
    id: 'scroll-reveal',
    name: 'Scroll Reveal',
    icon: 'ArrowDownFromLine',
    category: 'animacion',
    categoryLabel: 'Animacion',
    description: 'Elementos que aparecen al hacer scroll.',
    indesignSteps: [
      'En InDesign: usa el panel Animacion',
      'Selecciona el elemento a animar',
      'Animacion: "Desvanecer" o "Aparecer"',
      'Evento: Al cargar la pagina (On Page Load)',
      'Retraso: 0.2s para efecto secuencial',
      'NOTA: Las animaciones de scroll NO funcionan en EPUB',
      'En EPUB3: usa IntersectionObserver con JS'
    ],
    htmlFormula: `<div class="reveal-section">
  <h2 class="reveal" data-reveal="fade-up">
    Titulo que aparece
  </h2>
  <p class="reveal" data-reveal="fade-left" 
     data-delay="200">
    Parrafo que aparece con retraso...
  </p>
  <img class="reveal" data-reveal="scale" 
       data-delay="400" src="img/foto.jpg"/>
</div>`,
    cssFormula: `.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s, transform 0.6s;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal[data-reveal="fade-left"] {
  transform: translateX(-30px);
}
.reveal[data-reveal="fade-left"].visible {
  transform: translateX(0);
}
.reveal[data-reveal="scale"] {
  transform: scale(0.8);
}
.reveal[data-reveal="scale"].visible {
  transform: scale(1);
}`,
    jsFormula: `// IntersectionObserver para scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});`,
    previewWidth: 260,
    previewHeight: 120,
  },
];

export const getComponentsByCategory = (cat: ComponentCategory) =>
  components.filter(c => c.category === cat);
