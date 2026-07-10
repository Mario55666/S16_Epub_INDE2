import { useState } from 'react';
import {
  BookOpen, Layers, MousePointer, Code, FileText,
  Monitor, Smartphone, Tablet, AlertTriangle, CheckCircle,
  ChevronRight, Box, Settings, FolderOpen, ExternalLink,
  Star, Sparkles, Cpu, BookMarked
} from 'lucide-react';

export function GuidePanel() {
  const [openSection, setOpenSection] = useState<string | null>('intro');

  const toggle = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const Section = ({ id, icon, title, children }: {
    id: string; icon: React.ReactNode; title: string; children: React.ReactNode;
  }) => {
    const isOpen = openSection === id;
    return (
      <div className="border-b border-border">
        <button
          onClick={() => toggle(id)}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
        >
          <span className="text-primary/80">{icon}</span>
          <span className="text-sm font-semibold text-left flex-1">{title}</span>
          <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </button>
        {isOpen && (
          <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed space-y-3">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold">Guia EPUB3 Interactivo</h2>
            <p className="text-xs text-muted-foreground">Que es, como funciona y como insertarlo en InDesign</p>
          </div>
        </div>
      </div>

      {/* Seccion 1: Introduccion */}
      <Section id="intro" icon={<BookOpen className="w-5 h-5" />} title="1. Que es EPUB3">
        <p>
          <strong className="text-foreground">EPUB3</strong> (Electronic Publication 3.0) es el estandar de la W3C para publicaciones digitales. 
          Es basicamente un <strong>contenedor web</strong> que empaqueta archivos HTML5, CSS3 y JavaScript, funcionando como un sitio web 
          que se lee dentro de un lector de ebooks.
        </p>
        <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-blue-300 font-medium mb-1 text-xs">Estructura interna de un .epub:</p>
          <pre className="font-mono text-xs text-blue-200/80 leading-relaxed">
{`mi-ebook.epub/  (archivo ZIP renombrado)
├── mimetype              ← "application/epub+zip"
├── META-INF/
│   └── container.xml     ← Apunta al content.opf
└── OEBPS/                ← Aqui va todo el contenido
    ├── content.opf       ← Manifiesto (lista de archivos)
    ├── nav.xhtml         ← Tabla de contenidos
    ├── css/
    │   └── estilos.css   ← Estilos CSS3
    ├── js/
    │   └── interactivo.js ← JavaScript
    ├── xhtml/
    │   └── capitulo.xhtml ← Paginas del libro
    └── images/`}</pre>
        </div>
        <p>
          La diferencia clave con un PDF es que el PDF es una <strong>foto estatica de pagina</strong>, 
          mientras que EPUB3 es <strong>codigo vivo</strong>: se adapta a la pantalla, permite animaciones, 
          formularios, video, audio y almacenamiento de datos.
        </p>
      </Section>

      {/* Seccion 2: Como funciona en InDesign */}
      <Section id="indesign" icon={<MousePointer className="w-5 h-5" />} title="2. Como funciona en Adobe InDesign">
        <p>
          InDesign no crea EPUB3 con JavaScript directamente. El flujo de trabajo es:
        </p>
        <div className="space-y-2">
          {[
            { step: 'Paso 1', text: 'Disenas la maqueta estatica en InDesign con herramientas normales (marcos de texto, imagenes, colores).' },
            { step: 'Paso 2', text: 'Para elementos interactivos basicos (botones, campos de texto, checkboxes): usas el panel Botones y Formularios.' },
            { step: 'Paso 3', text: 'Exportas como EPUB (Interactivo) desde Archivo > Exportar > EPUB (Interactivo).' },
            { step: 'Paso 4', text: 'El EPUB generado tiene HTML basico. Abres ese HTML en un editor de codigo (Sigil, VS Code).' },
            { step: 'Paso 5', text: 'Insertas el codigo HTML, CSS y JavaScript de esta herramienta en los archivos correspondientes del EPUB.' },
            { step: 'Paso 6', text: 'Declaras los nuevos archivos (CSS, JS) en el content.opf para que el lector los reconozca.' },
          ].map((s, i) => (
            <div key={i} className="flex gap-2.5 items-start p-2 rounded-lg bg-secondary">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p>{s.text}</p>
            </div>
          ))}
        </div>

        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-2 items-start">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-amber-200/80">
            <strong>Limitacion importante:</strong> InDesign NO soporta JavaScript en su exportacion EPUB. 
            Los botones de InDesign solo hacen acciones basicas (ir a pagina, mostrar/ocultar). 
            Para JavaScript avanzado (validaciones, almacenamiento, animaciones), debes editar el HTML despues de exportar.
          </p>
        </div>
      </Section>

      {/* Seccion 3: Panel Botones y Formularios */}
      <Section id="panel" icon={<Settings className="w-5 h-5" />} title="3. Panel Botones y Formularios">
        <p>
          Este es el panel magico de InDesign para crear interactividad basica. Se abre con:
        </p>
        <div className="p-2 rounded bg-secondary border border-border font-mono text-xs">
          Ventana &gt; Interactivo &gt; Botones y formularios
        </div>
        <p className="font-medium text-foreground mt-2">Tipos de elementos que puedes crear:</p>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            ['Boton', 'Clickeable con 3 estados (Normal, Rollover, Clic)'],
            ['Campo de texto', 'Entrada de texto del usuario'],
            ['Casilla de verificacion', 'Checkbox para opciones Si/No'],
            ['Boton de opcion', 'Radio button (seleccion unica)'],
            ['Lista desplegable', 'Dropdown menu con opciones'],
            ['Campo de firma', 'Area para firmar con mouse/tactil'],
          ].map(([name, desc], i) => (
            <div key={i} className="p-2 rounded bg-secondary border border-border">
              <p className="text-foreground font-medium text-xs">{name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-2">
          Cada elemento tiene <strong>eventos</strong> (cuando se activan) y <strong>acciones</strong> (que hacen):
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            ['Al soltar o tocar', 'Cuando el usuario suelta el clic'],
            ['Al pasar el cursor', 'Cuando el mouse entra al elemento'],
            ['Al alejar el cursor', 'Cuando el mouse sale del elemento'],
            ['Al hacer clic', 'Al momento de hacer clic (antes de soltar)'],
            ['Al recibir el foco', 'Cuando el elemento se selecciona por teclado'],
          ].map(([event, desc], i) => (
            <div key={i} className="flex gap-2 items-start p-1.5">
              <MousePointer className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-foreground text-xs">{event}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Seccion 4: Mesa de Trabajo */}
      <Section id="mesa" icon={<Layers className="w-5 h-5" />} title="4. Como usar esta mesa de trabajo">
        <p>
          Esta herramienta te permite <strong>planificar visualmente</strong> donde ira cada elemento interactivo 
          antes de maquetarlo en InDesign.
        </p>
        <div className="space-y-2">
          <div className="flex gap-2.5 items-start p-2 rounded-lg bg-secondary">
            <Box className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground font-medium text-xs">1. Arrastra componentes</p>
              <p className="text-xs">Desde el panel izquierdo, arrastra los elementos interactivos a la mesa central.</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start p-2 rounded-lg bg-secondary">
            <MousePointer className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground font-medium text-xs">2. Organiza el layout</p>
              <p className="text-xs">Mueve los elementos para simular como quedarian en la pagina de InDesign.</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start p-2 rounded-lg bg-secondary">
            <Code className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground font-medium text-xs">3. Haz clic para ver el codigo</p>
              <p className="text-xs">Selecciona un elemento y el panel derecho muestra los pasos de InDesign y las formulas HTML/CSS/JS.</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start p-2 rounded-lg bg-secondary">
            <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground font-medium text-xs">4. Exporta el codigo</p>
              <p className="text-xs">El boton Exportar genera los archivos .xhtml, .css y .js listos para insertar en tu EPUB.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Seccion 5: Dimensiones y formatos */}
      <Section id="dims" icon={<Monitor className="w-5 h-5" />} title="5. Dimensiones de la mesa de trabajo">
        <p>
          La mesa de trabajo simula una pagina de tu publicacion. Puedes cambiar el formato:
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: <Monitor className="w-5 h-5" />, name: 'A4 Vertical', dims: '595 x 842 px', desc: 'Formato estandar de documento' },
            { icon: <Monitor className="w-5 h-5 rotate-90" />, name: 'A4 Horizontal', dims: '842 x 595 px', desc: 'Presentaciones y catalogos' },
            { icon: <Tablet className="w-5 h-5" />, name: 'iPad Vertical', dims: '768 x 1024 px', desc: 'Tablets y ebooks digitales' },
            { icon: <Tablet className="w-5 h-5 rotate-90" />, name: 'iPad Horizontal', dims: '1024 x 768 px', desc: 'Paisaje para tablets' },
            { icon: <Smartphone className="w-5 h-5" />, name: 'Carta Vertical', dims: '612 x 792 px', desc: 'Formato US Letter' },
          ].map((item, i) => (
            <div key={i} className="p-2 rounded bg-secondary border border-border text-center">
              <div className="text-primary/80 flex justify-center mb-1">{item.icon}</div>
              <p className="text-foreground text-xs font-medium">{item.name}</p>
              <p className="text-primary text-xs font-mono">{item.dims}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-2">
          <strong className="text-foreground">Nota:</strong> En EPUB3 el contenido es <strong>responsive</strong>, 
          pero estas dimensiones te dan una referencia para posicionar elementos en InDesign antes de exportar.
        </p>
      </Section>

      {/* Seccion 6: Lectores compatibles */}
      <Section id="compat" icon={<CheckCircle className="w-5 h-5" />} title="6. Lectores EPUB3 compatibles">
        <p>NO todos los lectores de ebooks soportan JavaScript y CSS avanzado:</p>
        <div className="space-y-1.5">
          {[
            { name: 'Thorium Reader', compat: 'Completo', color: 'text-emerald-400', desc: 'El mejor. Soporta JS, CSS3, audio, video. Gratuito.' },
            { name: 'Apple Books', compat: 'Alto', color: 'text-emerald-400', desc: 'Buen soporte JS/CSS. Solo macOS/iOS.' },
            { name: 'Readium', compat: 'Alto', color: 'text-emerald-400', desc: 'Lector web de referencia W3C. Open source.' },
            { name: 'Google Play Books', compat: 'Medio', color: 'text-amber-400', desc: 'Soporta basics. JS limitado.' },
            { name: 'Kindle', compat: 'Bajo', color: 'text-red-400', desc: 'NO usa EPUB nativo. Requiere conversion.' },
            { name: 'Adobe Digital Editions', compat: 'Bajo', color: 'text-red-400', desc: 'EPUB basico. Sin JS ni CSS3 avanzado.' },
          ].map((reader, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded bg-secondary">
              <span className={`text-xs font-bold ${reader.color} flex-shrink-0 w-20`}>{reader.compat}</span>
              <div>
                <p className="text-foreground text-xs font-medium">{reader.name}</p>
                <p className="text-xs text-muted-foreground">{reader.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 flex gap-2 items-start">
          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <p className="text-emerald-200/80">
            <strong>Recomendacion:</strong> Usa Thorium Reader (gratuito, Windows/Mac/Linux) para probar tus EPUB3 interactivos.
          </p>
        </div>
      </Section>

      {/* Seccion 7: Exportar desde InDesign */}
      <Section id="export" icon={<FolderOpen className="w-5 h-5" />} title="7. Como exportar EPUB desde InDesign">
        <div className="space-y-2">
          {[
            'Archivo > Exportar (Ctrl+Shift+E)',
            'Selecciona formato: EPUB (Interactivo)',
            'General: Version EPUB 3.0, Cubierta: imagen de portada',
            'Contenido de texto: Orden: Basado en el documento (siguiendo paginas)',
            'Formulario: Activar "Exportar formularios" y "Orden de tabulacion"',
            'Ver opciones de visualizacion: Tamano fuente 100%, Diseno unico',
            'Hacer clic en Exportar y esperar la generacion',
          ].map((step, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                {i + 1}
              </span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Seccion 8: Componentes EPUB3 vs PDF */}
      <Section id="epub-vs-pdf" icon={<Star className="w-5 h-5" />} title="8. EPUB3 vs PDF — Como se comportan">
        <p>
          Si tomamos la lista de componentes para la mesa de trabajo de InDesign orientada a EPUB, 
          asi es como se comportan y los elementos adicionales que debes considerar:
        </p>

        {/* Formularios */}
        <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <h4 className="text-blue-300 font-medium mb-1 text-xs flex items-center gap-1.5">
            <FileText className="w-5 h-5" />
            1. Formularios — Soportado mediante codigo o herramientas externas
          </h4>
          <p>
            A diferencia del PDF, los campos de formulario nativos de InDesign (casillas de verificacion, 
            campos de texto) <strong className="text-foreground">no se exportan correctamente a EPUB</strong> desde el panel de Botones y Formularios. 
            Sin embargo, EPUB 3 si soporta formularios a traves de <strong>etiquetas HTML5</strong>.
          </p>
          <p className="mt-1.5">
            <strong className="text-foreground">Soluciones:</strong>
          </p>
          <ul className="space-y-1 mt-1">
            <li className="flex items-start gap-2">
              <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              Usar <strong>Kotobee Author</strong> para incrustar cuestionarios (quizzes) sin programar
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              Incrustar un <strong>widget HTML5</strong> directamente en InDesign
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              Programar formularios con HTML5 (input, textarea, select) despues de exportar
            </li>
          </ul>
        </div>

        {/* Multimedia */}
        <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <h4 className="text-emerald-300 font-medium mb-1 text-xs flex items-center gap-1.5">
            <Monitor className="w-5 h-5" />
            2. Multimedia — Totalmente compatible y ampliado
          </h4>
          <p>
            EPUB 3 soporta de forma nativa audio y video mediante las etiquetas HTML5 
            <code>&lt;audio&gt;</code> y <code>&lt;video&gt;</code>. Puedes crear botones en InDesign 
            para reproducir, pausar o detener estos medios.
          </p>
          <p className="mt-1.5">
            <strong className="text-foreground">Ventaja clave:</strong> En EPUB el multimedia es nativo, 
            no requiere plugins externos como en PDF. Los lectores modernos reproducen MP4 y MP3 directamente.
          </p>
        </div>

        {/* Navegacion */}
        <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <h4 className="text-purple-300 font-medium mb-1 text-xs flex items-center gap-1.5">
            <MousePointer className="w-5 h-5" />
            3. Navegacion — Totalmente compatible
          </h4>
          <p>
            Es el esqueleto del documento. EPUB 3 utiliza el <strong>EPUB Navigation Document</strong> 
            (basado en <code>&lt;nav&gt;</code> de HTML5) que reemplaza los antiguos indices y garantiza 
            que el libro sea accesible. Soporta hipervinculos, saltos de pagina y tablas de contenido dinamicas.
          </p>
        </div>

        {/* Contenido UI */}
        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <h4 className="text-amber-300 font-medium mb-1 text-xs flex items-center gap-1.5">
            <Box className="w-5 h-5" />
            4. Contenido UI — Totalmente compatible (aqui EPUB brilla sobre PDF)
          </h4>
          <p>
            En la exportacion a EPUB de maquetacion fija (Fixed-Layout), <strong className="text-foreground">SI puedes utilizar Objetos Multiestado (MSO)</strong>. 
            Esto te permite construir interfaces de usuario ricas:
          </p>
          <ul className="space-y-1 mt-1.5">
            <li className="flex items-start gap-2">
              <ChevronRight className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <strong>Carruseles de imagenes</strong> o galerias deslizantes
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <strong>Ventanas emergentes (pop-ups)</strong> complejas de texto y graficos
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <strong>Botones interactivos</strong> que cambian el estado de otros objetos
            </li>
          </ul>
        </div>

        {/* Animacion */}
        <div className="p-2.5 rounded-lg bg-pink-500/10 border border-pink-500/20">
          <h4 className="text-pink-300 font-medium mb-1 text-xs flex items-center gap-1.5">
            <Sparkles className="w-5 h-5" />
            5. Animacion — Totalmente compatible
          </h4>
          <p>
            A diferencia del PDF, la animacion <strong className="text-foreground">funciona perfectamente</strong> en EPUB de maquetacion fija. 
            Puedes usar el panel de Animacion y el panel de Temporizacion (Timing) de InDesign. 
            Al exportar, InDesign traduce estas animaciones y rutas de movimiento (motion paths) 
            a <strong>codigo CSS3 y JavaScript</strong> que se reproduce nativamente en el lector.
          </p>
        </div>
      </Section>

      {/* Seccion 9: Componentes exclusivos de EPUB3 */}
      <Section id="epub-exclusive" icon={<Cpu className="w-5 h-5" />} title="9. Componentes exclusivos de EPUB3">
        <p>
          Si estas diseñando para EPUB 3, tu mesa de trabajo puede incorporar componentes avanzados 
          que <strong className="text-foreground">no existen en el mundo del PDF</strong>:
        </p>

        {/* Media Overlays */}
        <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
          <h4 className="text-cyan-300 font-medium mb-1 text-xs flex items-center gap-1.5">
            <BookMarked className="w-5 h-5" />
            Media Overlays — Lectura en Voz Alta Sincronizada
          </h4>
          <p>
            Es una de las caracteristicas estrella del EPUB 3. Permite sincronizar un archivo de audio 
            pregrabado (narracion) con el texto del documento. A medida que el audio avanza, 
            el texto correspondiente se va resaltando en la pantalla.
          </p>
          <p className="mt-1.5">
            <strong className="text-foreground">Ideal para:</strong> libros infantiles, 
            aprendizaje de idiomas, y <strong>accesibilidad</strong> para personas con discapacidad visual.
          </p>
          <div className="code-block mt-2">
            <pre>{`<smil xmlns="http://www.w3.org/ns/SMIL">
  <body>
    <par>
      <text src="capitulo.xhtml#parrafo1"/>
      <audio src="audio/narracion.mp3" clipBegin="0s" clipEnd="5.2s"/>
    </par>
  </body>
</smil>`}</pre>
          </div>
        </div>

        {/* Widgets HTML5 / JavaScript */}
        <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <h4 className="text-indigo-300 font-medium mb-1 text-xs flex items-center gap-1.5">
            <Code className="w-5 h-5" />
            Widgets de HTML5 / JavaScript
          </h4>
          <p>
            Puedes incrustar paquetes de codigo web (HTML/JS/CSS) directamente en la pagina de InDesign. 
            Esto te permite agregar funcionalidades avanzadas en el flujo de lectura:
          </p>
          <ul className="space-y-1 mt-1.5">
            <li className="flex items-start gap-2">
              <ChevronRight className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <strong>Minijuegos</strong> educativos interactivos
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <strong>Calculadoras</strong> y herramientas de conversion
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <strong>Mapas interactivos</strong> con puntos de interes
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <strong>Simulaciones</strong> cientificas o tecnicas
            </li>
          </ul>
        </div>

        {/* MathML y SVG */}
        <div className="p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/20">
          <h4 className="text-teal-300 font-medium mb-1 text-xs flex items-center gap-1.5">
            <Code className="w-5 h-5" />
            MathML y SVG
          </h4>
          <p>
            EPUB 3 soporta nativamente <strong>MathML</strong> para renderizar formulas matematicas 
            de alta calidad, y permite la incrustacion directa de <strong>graficos vectoriales interactivos (SVG)</strong>.
          </p>
          <p className="mt-1.5">
            <strong className="text-foreground">MathML</strong> es el estandar W3C para matematicas web, 
            alternativa superior a las imagenes de formulas. <strong>SVG</strong> permite graficos escalables 
            con interactividad (hover, animaciones, eventos de clic).
          </p>
        </div>

        {/* Resumen */}
        <div className="p-2.5 rounded-lg bg-secondary border border-border">
          <h4 className="text-foreground font-medium mb-2 text-xs flex items-center gap-1.5">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            En resumen
          </h4>
          <p>
            Para EPUB 3, los <strong>"Objetos Multiestado"</strong> y la <strong>"Animacion"</strong> deben ser 
            tus herramientas principales para el diseño de la UI, complementadas con <strong>"Multimedia"</strong> y 
            <strong>"Navegacion"</strong>. Los formularios requieren HTML5 o herramientas externas como Kotobee.
          </p>
          <p className="mt-1.5">
            Los componentes exclusivos de EPUB3 (<strong>Media Overlays, Widgets HTML5, MathML, SVG</strong>) 
            son ventajas competitivas que no existen en PDF y elevan la experiencia del lector a otro nivel.
          </p>
        </div>
      </Section>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ExternalLink className="w-5 h-5" />
          <span>Recursos utiles:</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {['w3.org/publishing/epub3', 'sigil-ebook.com', 'thorium.edrlab.org'].map(url => (
            <a
              key={url}
              href={`https://${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-2 py-1 rounded bg-secondary border border-border 
                       text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              {url}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
