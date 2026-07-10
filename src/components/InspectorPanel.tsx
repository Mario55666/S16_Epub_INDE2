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
        <span className="w-6 text-right text-muted-foreground/40 select-none flex-shrink-0 mr-2">
          {i + 1}
        </span>
        <span className="whitespace-pre">{line}</span>
      </div>
    ));
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
          <Palette className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold">{component.name}</h3>
          <Badge variant="outline" className="mt-1 text-[10px] border-primary/30 text-primary">
            {component.categoryLabel}
          </Badge>
          <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
            {component.description}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="indesign" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-8">
          <TabsTrigger value="indesign" className="text-[10px] gap-1">
            <BookOpen className="w-3 h-3" />
            InDesign
          </TabsTrigger>
          <TabsTrigger value="html" className="text-[10px] gap-1">
            <FileCode className="w-3 h-3" />
            HTML
          </TabsTrigger>
          <TabsTrigger value="css" className="text-[10px] gap-1">
            <Code className="w-3 h-3" />
            CSS
          </TabsTrigger>
          <TabsTrigger value="js" className="text-[10px] gap-1">
            <Braces className="w-3 h-3" />
            JS
          </TabsTrigger>
        </TabsList>

        {/* InDesign Guide */}
        <TabsContent value="indesign" className="mt-3 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-primary" />
            <h4 className="text-xs font-semibold">Pasos en Adobe InDesign</h4>
          </div>

          <div className="space-y-1.5">
            {component.indesignSteps.map((step, i) => (
              <div key={i} className="step-item">
                <span className="step-number">{i + 1}</span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* Important note */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-semibold text-amber-400 mb-0.5">
                Exportacion necesaria
              </p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Para que los elementos interactivos funcionen, exporta como{' '}
                <strong className="text-foreground">EPUB (Interactivo)</strong>, NO como 
                maquetacion fija. Los formularios y botones requieren la opcion 
                &quot;Botones y formularios&quot; activada en el panel de exportacion.
              </p>
            </div>
          </div>

          {/* Compatibility note */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-semibold text-blue-400 mb-0.5">
                Compatibilidad
              </p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Los formularios de InDesign funcionan en la mayoria de lectores EPUB3. 
                Para JavaScript avanzado, se recomienda editar el HTML directamente 
                despues de exportar (usando Sigil o editor de codigo).
              </p>
            </div>
          </div>
        </TabsContent>

        {/* HTML Formula */}
        <TabsContent value="html" className="mt-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-primary" />
              Formula HTML
            </h4>
            <button
              onClick={() => copyToClipboard(component.htmlFormula, 'html')}
              className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 
                       text-muted-foreground hover:text-foreground transition-colors"
            >
              {copiedSection === 'html' ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          <div className="code-block">{formatCode(component.htmlFormula)}</div>

          <div className="mt-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Donde insertar:</strong> Dentro del{' '}
              <code className="text-primary">&lt;body&gt;</code> de tu archivo XHTML en la carpeta{' '}
              <code className="text-primary">OEBPS/xhtml/</code>. Asegurate de declarar el 
              archivo en el <code className="text-primary">manifest</code> del content.opf.
            </p>
          </div>
        </TabsContent>

        {/* CSS Formula */}
        <TabsContent value="css" className="mt-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-primary" />
              Formula CSS
            </h4>
            <button
              onClick={() => copyToClipboard(component.cssFormula, 'css')}
              className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 
                       text-muted-foreground hover:text-foreground transition-colors"
            >
              {copiedSection === 'css' ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          <div className="code-block">{formatCode(component.cssFormula)}</div>

          <div className="mt-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Archivo:</strong> Guarda en{' '}
              <code className="text-primary">OEBPS/css/estilos.css</code> y enlazalo en el 
              HTML con <code className="text-primary">&lt;link rel=&quot;stylesheet&quot; href=&quot;../css/estilos.css&quot;/&gt;</code>.
              No olvides declararlo en el manifest del content.opf.
            </p>
          </div>
        </TabsContent>

        {/* JS Formula */}
        <TabsContent value="js" className="mt-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold flex items-center gap-1.5">
              <Braces className="w-3.5 h-3.5 text-primary" />
              Formula JavaScript
            </h4>
            <button
              onClick={() => copyToClipboard(component.jsFormula, 'js')}
              className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 
                       text-muted-foreground hover:text-foreground transition-colors"
            >
              {copiedSection === 'js' ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          <div className="code-block">{formatCode(component.jsFormula)}</div>

          <div className="mt-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
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
      <div className="mt-2 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
        <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Flujo de Insercion en EPUB3
        </h4>
        <div className="flex items-center gap-1 text-[9px]">
          <div className="flex-1 text-center p-1.5 rounded bg-blue-500/10 border border-blue-500/20">
            <div className="text-blue-400 font-semibold">InDesign</div>
            <div className="text-muted-foreground mt-0.5">Exportar EPUB</div>
          </div>
          <span className="text-muted-foreground">→</span>
          <div className="flex-1 text-center p-1.5 rounded bg-purple-500/10 border border-purple-500/20">
            <div className="text-purple-400 font-semibold">Sigil/Editor</div>
            <div className="text-muted-foreground mt-0.5">Insertar HTML/CSS/JS</div>
          </div>
          <span className="text-muted-foreground">→</span>
          <div className="flex-1 text-center p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            <div className="text-emerald-400 font-semibold">content.opf</div>
            <div className="text-muted-foreground mt-0.5">Declarar en manifest</div>
          </div>
          <span className="text-muted-foreground">→</span>
          <div className="flex-1 text-center p-1.5 rounded bg-orange-500/10 border border-orange-500/20">
            <div className="text-orange-400 font-semibold">epubcheck</div>
            <div className="text-muted-foreground mt-0.5">Validar</div>
          </div>
        </div>
      </div>
    </div>
  );
}
