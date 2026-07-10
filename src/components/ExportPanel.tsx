import { useState } from 'react';
import { type InteractiveComponent } from '@/data/components';
import type { DroppedItem } from '@/App';
import { Button } from '@/components/ui/button';
import { X, Download, FileCode, Code, Braces, Package } from 'lucide-react';

interface ExportPanelProps {
  droppedItems: DroppedItem[];
  components: InteractiveComponent[];
  onClose: () => void;
}

export function ExportPanel({ droppedItems, components, onClose }: ExportPanelProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');

  const usedComponents = droppedItems
    .map(item => components.find(c => c.id === item.componentId))
    .filter(Boolean) as InteractiveComponent[];

  const uniqueComponents = [...new Map(usedComponents.map(c => [c.id, c])).values()];

  const generateHTML = () => {
    return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" 
      xmlns:epub="http://www.idpf.org/2007/ops"
      lang="es" xml:lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>EPUB3 Interactivo</title>
  <link rel="stylesheet" href="../css/estilos.css"/>
</head>
<body>
  <section epub:type="chapter">
    <h1>Capitulo Interactivo</h1>
    
${uniqueComponents.map((c, i) => `    <!-- ${c.name} (${c.categoryLabel}) -->
    <div class="component-${c.id}">
${c.htmlFormula.split('\n').map(l => '      ' + l).join('\n')}
    </div>
${i < uniqueComponents.length - 1 ? '\n' : ''}`).join('')}
  </section>
  
  <script src="../js/interactivo.js"><\/script>
</body>
</html>`;
  };

  const generateCSS = () => {
    return `/* ============================================
   ESTILOS EPUB3 INTERACTIVO
   Generado desde Planificador EPUB3
   ============================================ */

${uniqueComponents.map(c => `/* ----- ${c.name} ----- */
${c.cssFormula}`).join('\n\n')}

/* ============================================
   UTILIDADES Y ANIMACIONES
   ============================================ */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes progreso {
  0% { width: 0%; }
  100% { width: 100%; }
}

/* Responsive para dispositivos moviles */
@media screen and (max-width: 480px) {
  body { font-size: 16px; padding: 1rem; }
}

/* Reducir animaciones para accesibilidad */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`;
  };

  const generateJS = () => {
    return `// ============================================
// JAVASCRIPT EPUB3 INTERACTIVO
// Generado desde Planificador EPUB3
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('EPUB3 Interactivo cargado');
  
${uniqueComponents.map(c => `  // ----- ${c.name} -----
${c.jsFormula.split('\n').map(l => '  ' + l).join('\n')}`).join('\n\n')}
});

// ============================================
// UTILIDADES COMUNES
// ============================================

// Guardar datos en localStorage
function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch(e) {
    console.warn('localStorage no disponible');
  }
}

// Leer datos de localStorage
function leer(clave, porDefecto) {
  try {
    const valor = localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : porDefecto;
  } catch(e) {
    return porDefecto;
  }
}

// Debounce para eventos frecuentes
function debounce(fn, ms) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), ms);
  };
}`;
  };

  const getContent = () => {
    switch (activeTab) {
      case 'html': return generateHTML();
      case 'css': return generateCSS();
      case 'js': return generateJS();
    }
  };

  const downloadFile = () => {
    const content = getContent();
    const filenames = { html: 'capitulo.xhtml', css: 'estilos.css', js: 'interactivo.js' };
    const mimeTypes = { html: 'application/xhtml+xml', css: 'text/css', js: 'text/javascript' };

    const blob = new Blob([content], { type: mimeTypes[activeTab] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filenames[activeTab];
    a.click();
    URL.revokeObjectURL(url);
  };

  if (droppedItems.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
        <div className="relative bg-card border border-border rounded-xl p-6 max-w-sm w-full">
          <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
          <Package className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <h3 className="text-center font-semibold">Sin componentes</h3>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Agrega componentes a la mesa de trabajo para poder exportar el codigo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="font-semibold text-sm">Exportar Codigo EPUB3</h3>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {droppedItems.length} componentes en la mesa de trabajo
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={downloadFile} className="text-xs gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Descargar .{activeTab}
            </Button>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border px-4">
          {([
            { key: 'html' as const, label: 'XHTML', icon: <FileCode className="w-3.5 h-3.5" /> },
            { key: 'css' as const, label: 'CSS', icon: <Code className="w-3.5 h-3.5" /> },
            { key: 'js' as const, label: 'JavaScript', icon: <Braces className="w-3.5 h-3.5" /> },
          ]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Component list */}
        <div className="px-4 py-2 border-b border-border bg-white/[0.02]">
          <div className="flex flex-wrap gap-1.5">
            {uniqueComponents.map(c => (
              <span
                key={c.id}
                className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>

        {/* Code content */}
        <div className="flex-1 overflow-auto p-4">
          <pre className="code-block text-[11px] leading-relaxed whitespace-pre-wrap">
            {getContent()}
          </pre>
        </div>
      </div>
    </div>
  );
}
