import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { spaceDimensions, narrativeArc } from '@/data/projectContext';
import { Wand2, Copy, Check, Download, FileText } from 'lucide-react';

export function PromptGenerator() {
  const [userPrompt, setUserPrompt] = useState('');
  const [generatedMarkdown, setGeneratedMarkdown] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedDims, setSelectedDims] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);

  const generateMarkdown = () => {
    const dims = spaceDimensions.filter(d => selectedDims.includes(d.id));
    const stages = narrativeArc.filter(s => selectedStages.includes(s.id));

    let md = `# Mapa Mental: Organizacion de Elementos Interactivos EPUB3\n\n`;
    md += `## Contexto del Proyecto\n\n`;
    md += userPrompt ? `${userPrompt}\n\n` : `_[Describe aqui tu contexto tematico, espacial y temporal]_\n\n`;

    md += `---\n\n`;
    md += `## Dimensiones del Simbolismo de Espacio Seleccionadas\n\n`;
    dims.forEach(d => {
      md += `### ${d.name}\n`;
      md += `- **Nivel:** ${d.level}\n`;
      md += `- **Descripcion:** ${d.description}\n`;
      md += `- **Conexion emocional:** ${d.emotionalConnection}\n`;
      md += `- **Recursos visuales:** ${d.visualResources.join(', ')}\n`;
      md += `- **Color asociado:** ${d.color}\n\n`;
    });

    md += `---\n\n`;
    md += `## Arco Narrativo y Elementos Interactivos\n\n`;
    stages.forEach((s, i) => {
      md += `### ${i + 1}. ${s.name}\n\n`;
      md += `**Descripcion:** ${s.description}\n\n`;
      md += `**Enfoque visual:** ${s.visualApproach}\n\n`;
      md += `**Elementos interactivos recomendados:**\n\n`;
      s.interactiveElements.forEach(el => {
        md += `- [ ] ${el}\n`;
      });
      md += `\n**Notas de implementacion:**\n`;
      md += `- _[Especificar posicion en la mesa de trabajo]_\n`;
      md += `- _[Definir comportamiento del evento]_\n`;
      md += `- _[Indicar si usa JavaScript, CSS o ambos]_\n\n`;
      md += `---\n\n`;
    });

    md += `## Checklist de Implementacion\n\n`;
    md += `- [ ] Disenar maqueta base en InDesign\n`;
    md += `- [ ] Definir dimensiones de la pagina (px)\n`;
    md += `- [ ] Insertar elementos interactivos con Botones y Formularios\n`;
    md += `- [ ] Exportar como EPUB (Interactivo)\n`;
    md += `- [ ] Abrir EPUB en editor de codigo (Sigil/VS Code)\n`;
    md += `- [ ] Insertar HTML de cada elemento interactivo\n`;
    md += `- [ ] Agregar CSS para estilos y animaciones\n`;
    md += `- [ ] Implementar JavaScript para logica avanzada\n`;
    md += `- [ ] Declarar archivos en content.opf (manifest)\n`;
    md += `- [ ] Validar con epubcheck\n`;
    md += `- [ ] Probar en Thorium Reader\n`;

    setGeneratedMarkdown(md);
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([generatedMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mapa-mental-epub3.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <Wand2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold">Generador de Prompt</h2>
            <p className="text-[10px] text-muted-foreground">Mapa mental en Markdown para organizar elementos interactivos</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Context input */}
        <div>
          <label className="text-[10px] font-semibold text-muted-foreground mb-1.5 block">
            Contexto de tu proyecto
          </label>
          <Textarea
            value={userPrompt}
            onChange={e => setUserPrompt(e.target.value)}
            className="text-xs min-h-[70px]"
            placeholder="Describe tu proyecto: tema, contexto tematico, espacial, temporal, publico objetivo..."
          />
        </div>

        {/* Select dimensions */}
        <div>
          <label className="text-[10px] font-semibold text-muted-foreground mb-1.5 block">
            Dimensiones del Simbolismo de Espacio
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {spaceDimensions.map(dim => (
              <button
                key={dim.id}
                onClick={() => {
                  setSelectedDims(prev =>
                    prev.includes(dim.id)
                      ? prev.filter(d => d !== dim.id)
                      : [...prev, dim.id]
                  );
                }}
                className={`flex items-center gap-1.5 p-1.5 rounded text-[9px] text-left transition-all border ${
                  selectedDims.includes(dim.id)
                    ? 'border-white/30 bg-white/10 text-foreground'
                    : 'border-white/5 bg-white/[0.02] text-muted-foreground'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: dim.color }}
                />
                <span className="truncate">{dim.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Select narrative stages */}
        <div>
          <label className="text-[10px] font-semibold text-muted-foreground mb-1.5 block">
            Etapas del Arco Narrativo
          </label>
          <div className="space-y-1">
            {narrativeArc.map(stage => (
              <button
                key={stage.id}
                onClick={() => {
                  setSelectedStages(prev =>
                    prev.includes(stage.id)
                      ? prev.filter(s => s !== stage.id)
                      : [...prev, stage.id]
                  );
                }}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-[10px] transition-all border ${
                  selectedStages.includes(stage.id)
                    ? 'border-white/20 bg-white/10 text-foreground'
                    : 'border-transparent hover:border-white/10 hover:bg-white/5 text-muted-foreground'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[8px] font-bold flex-shrink-0">
                  {narrativeArc.findIndex(s => s.id === stage.id) + 1}
                </span>
                <span className="truncate">{stage.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <Button
          onClick={generateMarkdown}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-xs gap-1.5"
          disabled={selectedStages.length === 0 && selectedDims.length === 0}
        >
          <Wand2 className="w-3.5 h-3.5" />
          Generar Mapa Mental Markdown
        </Button>

        {/* Result */}
        {generatedMarkdown && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                <FileText className="w-3 h-3" />
                Resultado
              </label>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyMarkdown}
                  className="h-6 px-2 text-[9px] gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copiado' : 'Copiar'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={downloadMarkdown}
                  className="h-6 px-2 text-[9px] gap-1"
                >
                  <Download className="w-3 h-3" />
                  .md
                </Button>
              </div>
            </div>
            <div className="rounded-lg border border-emerald-500/20 bg-black/40 p-3">
              <pre className="text-[9px] text-emerald-100/80 font-mono whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                {generatedMarkdown}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
