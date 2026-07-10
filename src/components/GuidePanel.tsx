import { useState } from 'react';
import {
  BookOpen, Layers, MousePointer, Code, FileText,
  Monitor, Smartphone, Tablet, AlertTriangle, CheckCircle,
  ChevronRight, Box, Settings, FolderOpen, ExternalLink
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
      <div className="border-b border-white/5">
        <button
          onClick={() => toggle(id)}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors"
        >
          <span className="text-primary/80">{icon}</span>
          <span className="text-xs font-semibold text-left flex-1">{title}</span>
          <ChevronRight className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </button>
        {isOpen && (
          <div className="px-4 pb-4 text-[11px] text-muted-foreground leading-relaxed space-y-3">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold">Guia EPUB3 Interactivo</h2>
            <p className="text-[10px] text-muted-foreground">Que es, como funciona y como insertarlo en InDesign</p>
          </div>
        </div>
      </div>

      {/* Seccion 1: Introduccion */}
      <Section id="intro" icon={<BookOpen className="w-4 h-4" />} title="1. Que es EPUB3">
        <p>
          <strong className="text-foreground">EPUB3</strong> (Electronic Publication 3.0) es el estandar de la W3C para publicaciones digitales. 
          Es basicamente un <strong>contenedor web</strong> que empaqueta archivos HTML5, CSS3 y JavaScript, funcionando como un sitio web 
          que se lee dentro de un lector de ebooks.
        </p>
        <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-blue-300 font-medium mb-1 text-[10px]">Estructura interna de un .epub:</p>
          <pre className="font-mono text-[9px] text-blue-200/80 leading-relaxed">
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
      <Section id="indesign" icon={<MousePointer className="w-4 h-4" />} title="2. Como funciona en Adobe InDesign">
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
            <div key={i} className="flex gap-2.5 items-start p-2 rounded-lg bg-white/[0.03]">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p>{s.text}</p>
            </div>
          ))}
        </div>

        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-2 items-start">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-amber-200/80">
            <strong>Limitacion importante:</strong> InDesign NO soporta JavaScript en su exportacion EPUB. 
            Los botones de InDesign solo hacen acciones basicas (ir a pagina, mostrar/ocultar). 
            Para JavaScript avanzado (validaciones, almacenamiento, animaciones), debes editar el HTML despues de exportar.
          </p>
        </div>
      </Section>

      {/* Seccion 3: Panel Botones y Formularios */}
      <Section id="panel" icon={<Settings className="w-4 h-4" />} title="3. Panel Botones y Formularios">
        <p>
          Este es el panel magico de InDesign para crear interactividad basica. Se abre con:
        </p>
        <div className="p-2 rounded bg-white/5 border border-white/10 font-mono text-[10px]">
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
            <div key={i} className="p-2 rounded bg-white/[0.03] border border-white/5">
              <p className="text-foreground font-medium text-[10px]">{name}</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">{desc}</p>
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
              <MousePointer className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-foreground text-[10px]">{event}</p>
                <p className="text-[9px] text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Seccion 4: Mesa de Trabajo */}
      <Section id="mesa" icon={<Layers className="w-4 h-4" />} title="4. Como usar esta mesa de trabajo">
        <p>
          Esta herramienta te permite <strong>planificar visualmente</strong> donde ira cada elemento interactivo 
          antes de maquetarlo en InDesign.
        </p>
        <div className="space-y-2">
          <div className="flex gap-2.5 items-start p-2 rounded-lg bg-white/[0.03]">
            <Box className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground font-medium text-[10px]">1. Arrastra componentes</p>
              <p className="text-[10px]">Desde el panel izquierdo, arrastra los elementos interactivos a la mesa central.</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start p-2 rounded-lg bg-white/[0.03]">
            <MousePointer className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground font-medium text-[10px]">2. Organiza el layout</p>
              <p className="text-[10px]">Mueve los elementos para simular como quedarian en la pagina de InDesign.</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start p-2 rounded-lg bg-white/[0.03]">
            <Code className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground font-medium text-[10px]">3. Haz clic para ver el codigo</p>
              <p className="text-[10px]">Selecciona un elemento y el panel derecho muestra los pasos de InDesign y las formulas HTML/CSS/JS.</p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start p-2 rounded-lg bg-white/[0.03]">
            <FileText className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground font-medium text-[10px]">4. Exporta el codigo</p>
              <p className="text-[10px]">El boton Exportar genera los archivos .xhtml, .css y .js listos para insertar en tu EPUB.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Seccion 5: Dimensiones y formatos */}
      <Section id="dims" icon={<Monitor className="w-4 h-4" />} title="5. Dimensiones de la mesa de trabajo">
        <p>
          La mesa de trabajo simula una pagina de tu publicacion. Puedes cambiar el formato:
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: <Monitor className="w-4 h-4" />, name: 'A4 Vertical', dims: '595 x 842 px', desc: 'Formato estandar de documento' },
            { icon: <Monitor className="w-4 h-4 rotate-90" />, name: 'A4 Horizontal', dims: '842 x 595 px', desc: 'Presentaciones y catalogos' },
            { icon: <Tablet className="w-4 h-4" />, name: 'iPad Vertical', dims: '768 x 1024 px', desc: 'Tablets y ebooks digitales' },
            { icon: <Tablet className="w-4 h-4 rotate-90" />, name: 'iPad Horizontal', dims: '1024 x 768 px', desc: 'Paisaje para tablets' },
            { icon: <Smartphone className="w-4 h-4" />, name: 'Carta Vertical', dims: '612 x 792 px', desc: 'Formato US Letter' },
          ].map((item, i) => (
            <div key={i} className="p-2 rounded bg-white/[0.03] border border-white/5 text-center">
              <div className="text-primary/80 flex justify-center mb-1">{item.icon}</div>
              <p className="text-foreground text-[9px] font-medium">{item.name}</p>
              <p className="text-primary text-[9px] font-mono">{item.dims}</p>
              <p className="text-[8px] text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-2">
          <strong className="text-foreground">Nota:</strong> En EPUB3 el contenido es <strong>responsive</strong>, 
          pero estas dimensiones te dan una referencia para posicionar elementos en InDesign antes de exportar.
        </p>
      </Section>

      {/* Seccion 6: Lectores compatibles */}
      <Section id="compat" icon={<CheckCircle className="w-4 h-4" />} title="6. Lectores EPUB3 compatibles">
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
            <div key={i} className="flex items-center gap-2 p-2 rounded bg-white/[0.03]">
              <span className={`text-[10px] font-bold ${reader.color} flex-shrink-0 w-20`}>{reader.compat}</span>
              <div>
                <p className="text-foreground text-[10px] font-medium">{reader.name}</p>
                <p className="text-[9px] text-muted-foreground">{reader.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 flex gap-2 items-start">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <p className="text-emerald-200/80">
            <strong>Recomendacion:</strong> Usa Thorium Reader (gratuito, Windows/Mac/Linux) para probar tus EPUB3 interactivos.
          </p>
        </div>
      </Section>

      {/* Seccion 7: Exportar desde InDesign */}
      <Section id="export" icon={<FolderOpen className="w-4 h-4" />} title="7. Como exportar EPUB desde InDesign">
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
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                {i + 1}
              </span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <ExternalLink className="w-3 h-3" />
          <span>Recursos utiles:</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {['w3.org/publishing/epub3', 'sigil-ebook.com', 'thorium.edrlab.org'].map(url => (
            <a
              key={url}
              href={`https://${url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] px-2 py-1 rounded bg-white/5 border border-white/10 
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
