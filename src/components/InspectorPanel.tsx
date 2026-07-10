import { useState } from 'react';
import { type InteractiveComponent } from '@/data/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen, Code, FileCode, Braces, Palette,
  Layers, AlertTriangle, CheckCircle2
} from 'lucide-react';

interface InspectorPanelProps {
  component: InteractiveComponent;
}

export function InspectorPanel({ component }: InspectorPanelProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const formatCode = (code: string) => {
    return code.split('\n').map((line, i) => (
      <div key={i} className="flex">
        <span className="w-8 text-right text-muted-foreground/40 select-none flex-shrink-0 mr-2 text-xs">
          {i + 1}
        </span>
        <span className="whitespace-pre">{line}</span>
      </div>
    ));
  };

  return (
    <div className="p-5 space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
          <Palette className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold">{component.name}</h3>
          <Badge variant="outline" className="mt-1 text-xs border-primary/30 text-primary">
            {component.categoryLabel}
          </Badge>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {component.description}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="indesign" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-10">
          <TabsTrigger value="indesign" className="text-xs gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            InDesign
          </TabsTrigger>
          <TabsTrigger value="html" className="text-xs gap-1">
            <FileCode className="w-3.5 h-3.5" />
            HTML
          </TabsTrigger>
          <TabsTrigger value="css" className="text-xs gap-1">
            <Code className="w-3.5 h-3.5" />
            CSS
          </TabsTrigger>
          <TabsTrigger value="js" className="text-xs gap-1">
            <Braces className="w-3.5 h-3.5" />
            JS
          </TabsTrigger>
        </TabsList>

        {/* InDesign Guide */}
        <TabsContent value="indesign" className="mt-4 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-5 h-5 text-primary" />
            <h4 className="text-sm font-semibold">Pasos en Adobe InDesign</h4>
          </div>

          <div className="space-y-2">
            {component.indesignSteps.map((step, i) => (
              <div key={i} className="step-item">
                <span className="step-number">{i + 1}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* Important note */}
          <div className="flex items-start gap-2 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-400 mb-1">
                Exportacion necesaria
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Para que los elementos interactivos funcionen, exporta como{' '}
                <strong className="text-foreground">EPUB (Interactivo)</strong>, NO como
                maquetacion fija. Los formularios y botones requieren la opcion
                &quot;Botones y formularios&quot; activada en el panel de exportacion.
              </p>
            </div>
          </div>

          {/* Compatibility note */}
          <div className="flex items-start gap-2 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-blue-400 mb-1">
                Compatibilidad
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Los formularios de InDesign funcionan en la mayoria de lectores EPUB3.
                Para JavaScript avanzado, se recomienda editar el HTML directamente
                despues de exportar (usando Sigil o editor de codigo).
              </p>
            </div>
          </div>
        </TabsContent>

        {/* HTML Formula */}
        <TabsContent value="html" className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-primary" />
              Formula HTML
            </h4>
            <button
              onClick={() => copyToClipboard(component.htmlFormula, 'html')}
              className="text-xs px-3 py-1.5 rounded bg-secondary hover:bg-secondary/80
                       text-muted-foreground hover:text-foreground transition-colors"
            >
              {copiedSection === 'html' ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          <div className="code-block">{formatCode(component.htmlFormula)}</div>

          <div className="mt-4 p-4 rounded-lg bg-secondary border border-border">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Donde insertar:</strong> Dentro del{' '}
              <code className="text-primary">&lt;body&gt;</code> de tu archivo XHTML en la carpeta{' '}
              <code className="text-primary">OEBPS/xhtml/</code>. Asegurate de declarar el
              archivo en el <code className="text-primary">manifest</code> del content.opf.
            </p>
          </div>
        </TabsContent>

        {/* CSS Formula */}
        <TabsContent value="css" className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold flex items-center gap-1.5">
              <Code className="w-4 h-4 text-primary" />
              Formula CSS
            </h4>
            <button
              onClick={() => copyToClipboard(component.cssFormula, 'css')}
              className="text-xs px-3 py-1.5 rounded bg-secondary hover:bg-secondary/80
                       text-muted-foreground hover:text-foreground transition-colors"
            >
              {copiedSection === 'css' ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          <div className="code-block">{formatCode(component.cssFormula)}</div>

          <div className="mt-4 p-4 rounded-lg bg-secondary border border-border">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Archivo:</strong> Guarda en{' '}
              <code className="text-primary">OEBPS/css/estilos.css</code> y enlazalo en el
              HTML con <code className="text-primary">&lt;link rel=&quot;stylesheet&quot; href=&quot;../css/estilos.css&quot;/&gt;</code>.
              No olvides declararlo en el manifest del content.opf.
            </p>
          </div>
        </TabsContent>

        {/* JS Formula */}
        <TabsContent value="js" className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold flex items-center gap-1.5">
              <Braces className="w-4 h-4 text-primary" />
              Formula JavaScript
            </h4>
            <button
              onClick={() => copyToClipboard(component.jsFormula, 'js')}
              className="text-xs px-3 py-1.5 rounded bg-secondary hover:bg-secondary/80
                       text-muted-foreground hover:text-foreground transition-colors"
            >
              {copiedSection === 'js' ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          <div className="code-block">{formatCode(component.jsFormula)}</div>

          <div className="mt-4 p-4 rounded-lg bg-secondary border border-border">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Archivo:</strong> Guarda en{' '}
              <code className="text-primary">OEBPS/js/interactivo.js</code> y enlazalo con{' '}
              <code className="text-primary">&lt;script src=&quot;../js/interactivo.js&quot;&gt;&lt;/script&gt;</code>.
              Declara <code className="text-primary">properties=&quot;scripted&quot;</code> en el manifest
              del archivo XHTML que use este script.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Insertion workflow diagram */}
      <div className="mt-4 p-4 rounded-lg border border-border bg-secondary">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Flujo de Insercion en EPUB3
        </h4>
        <div className="flex items-center gap-1 text-xs">
          <div className="flex-1 text-center p-2 rounded bg-blue-500/10 border border-blue-500/20">
            <div className="text-blue-400 font-semibold">InDesign</div>
            <div className="text-muted-foreground mt-1">Exportar EPUB</div>
          </div>
          <span className="text-muted-foreground">→</span>
          <div className="flex-1 text-center p-2 rounded bg-purple-500/10 border border-purple-500/20">
            <div className="text-purple-400 font-semibold">Sigil/Editor</div>
            <div className="text-muted-foreground mt-1">Insertar HTML/CSS/JS</div>
          </div>
          <span className="text-muted-foreground">→</span>
          <div className="flex-1 text-center p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
            <div className="text-emerald-400 font-semibold">content.opf</div>
            <div className="text-muted-foreground mt-1">Declarar en manifest</div>
          </div>
          <span className="text-muted-foreground">→</span>
          <div className="flex-1 text-center p-2 rounded bg-orange-500/10 border border-orange-500/20">
            <div className="text-orange-400 font-semibold">epubcheck</div>
            <div className="text-muted-foreground mt-1">Validar</div>
          </div>
        </div>
      </div>
    </div>
  );
}
