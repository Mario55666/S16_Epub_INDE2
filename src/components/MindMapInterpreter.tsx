import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { narrativeArc } from '@/data/projectContext';
import { Brain, Upload, Lightbulb, MapPin, MousePointer, Wand2, Trash2 } from 'lucide-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export interface SuggestedElement {
  componentId: string;
  componentName: string;
  reason: string;
  narrativeStage: string;
  position: { x: number; y: number };
}

interface MindMapInterpreterProps {
  onSuggestElements: (elements: SuggestedElement[]) => void;
}

export function MindMapInterpreter({ onSuggestElements }: MindMapInterpreterProps) {
  const [markdownInput, setMarkdownInput] = useState('');
  const [interpreted, setInterpreted] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestedElement[]>([]);
  const [parsedSections, setParsedSections] = useState<string[]>([]);

  const exampleMindMap = `# Simbolismo del Espacio - Infografia Interactiva

## Introduccion
- Presentacion del tema
- Objetivos de aprendizaje
- Bienvenida al lector

## Dimensiones del Espacio
### Lo Mistico
- Representacion de lo sobrenatural
- Elementos magicos y fantasticos
- Video explicativo

### La Exaltacion
- Momentos de euforia
- Expresiones de elevacion
- Audio ambiental

### El Idealismo
- Visiones utopicas
- Perfeccion conceptual
- Galeria de imagenes

### La Intelectualidad
- Estructuras de conocimiento
- Datos y estadisticas
- Formulario de evaluacion

### Lo Emocional-Espiritual
- Limite transformador
- Reflexion personal
- Campo de texto para journal

## Actividades Interactivas
- Quiz de comprension
- Encuesta de percepcion
- Evaluacion final

## Conclusion
- Resumen de aprendizajes
- Recursos adicionales
- Mensaje de cierre`;

  const interpretMindMap = () => {
    const text = markdownInput.toLowerCase();
    const lines = markdownInput.split('\n');
    const foundSections: string[] = [];
    const foundSuggestions: SuggestedElement[] = [];

    // Parsear secciones principales
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ') || trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
        foundSections.push(trimmed.replace(/^#+\s*/, ''));
      }
    });

    // Mapear secciones a componentes interactivos
    const keywordMap: { keywords: string[]; componentId: string; componentName: string; reason: string; stage: string }[] = [
      {
        keywords: ['presentacion', 'bienvenida', 'intro', 'inicio', 'portada'],
        componentId: 'scroll-reveal',
        componentName: 'Scroll Reveal',
        reason: 'Animacion de entrada para captar atencion',
        stage: 'Introduccion: Receptividad',
      },
      {
        keywords: ['video', 'multimedia', 'reproducir', 'clip'],
        componentId: 'video',
        componentName: 'Video HTML5',
        reason: 'Contenido audiovisual para explicar conceptos',
        stage: 'Descubrimiento: Sensibilidad',
      },
      {
        keywords: ['audio', 'musica', 'sonido', 'ambiental'],
        componentId: 'audio',
        componentName: 'Audio Player',
        reason: 'Experiencia sonora inmersiva',
        stage: 'Descubrimiento: Sensibilidad',
      },
      {
        keywords: ['galeria', 'imagenes', 'fotos', 'visual'],
        componentId: 'carousel',
        componentName: 'Carrusel',
        reason: 'Presentacion visual de multiples recursos',
        stage: 'Conexion: Afectividad',
      },
      {
        keywords: ['formulario', 'evaluacion', 'datos', 'estadistica'],
        componentId: 'text-input',
        componentName: 'Campo de Texto',
        reason: 'Recoleccion de informacion del usuario',
        stage: 'Reflexion: Intelectualidad',
      },
      {
        keywords: ['quiz', 'pregunta', 'comprension', 'test'],
        componentId: 'radio-button',
        componentName: 'Radio Button',
        reason: 'Evaluacion de opciones multiples',
        stage: 'Reflexion: Intelectualidad',
      },
      {
        keywords: ['encuesta', 'votacion', 'seleccion', 'opinion'],
        componentId: 'dropdown',
        componentName: 'Lista desplegable',
        reason: 'Recoleccion de preferencias',
        stage: 'Eleccion: Voluntad',
      },
      {
        keywords: ['journal', 'reflexion', 'texto', 'comentario', 'diario'],
        componentId: 'textarea',
        componentName: 'Area de Texto',
        reason: 'Espacio para expresion personal',
        stage: 'Transformacion: Limite emocional-espiritual',
      },
      {
        keywords: ['informacion', 'tabs', 'secciones', 'contenido'],
        componentId: 'tabs',
        componentName: 'Tabs / Pestanas',
        reason: 'Organizacion de contenido por categorias',
        stage: 'Reflexion: Intelectualidad',
      },
      {
        keywords: ['faq', 'pregunta frecuente', 'acordeon', 'expandible'],
        componentId: 'accordion',
        componentName: 'Acordeon',
        reason: 'Contenido colapsable para FAQs',
        stage: 'Conexion: Afectividad',
      },
      {
        keywords: ['progreso', 'avance', 'barra', 'indicador'],
        componentId: 'progress-bar',
        componentName: 'Barra de Progreso',
        reason: 'Visualizacion de avance del lector',
        stage: 'Aspiracion: Idealismo',
      },
      {
        keywords: ['tooltip', 'info', 'ayuda', 'mas informacion'],
        componentId: 'tooltip',
        componentName: 'Tooltip / Info',
        reason: 'Informacion complementaria al pasar el mouse',
        stage: 'Descubrimiento: Sensibilidad',
      },
      {
        keywords: ['modal', 'popup', 'emergente', 'revelacion'],
        componentId: 'modal',
        componentName: 'Modal / Popup',
        reason: 'Ventana emergente para contenido destacado',
        stage: 'Transformacion: Limite emocional-espiritual',
      },
      {
        keywords: ['checkbox', 'casilla', 'verificacion', 'confirmar'],
        componentId: 'checkbox',
        componentName: 'Checkbox',
        reason: 'Seleccion de opciones multiples',
        stage: 'Eleccion: Voluntad',
      },
      {
        keywords: ['enviar', 'boton', 'accion', 'continuar', 'siguiente'],
        componentId: 'submit-button',
        componentName: 'Boton Enviar',
        reason: 'Accion de envio o navegacion',
        stage: 'Trascendencia: Exaltacion + Mistico',
      },
    ];

    // Encontrar coincidencias
    let yPos = 100;
    keywordMap.forEach(mapping => {
      const hasMatch = mapping.keywords.some(kw => text.includes(kw));
      if (hasMatch) {
        // Buscar etapa narrativa
        const relatedStage = narrativeArc.find(s =>
          mapping.stage.toLowerCase().includes(s.dimension) ||
          text.includes(s.name.toLowerCase())
        );

        foundSuggestions.push({
          componentId: mapping.componentId,
          componentName: mapping.componentName,
          reason: mapping.reason,
          narrativeStage: relatedStage?.name || mapping.stage,
          position: {
            x: 100 + (foundSuggestions.length % 3) * 180,
            y: yPos + Math.floor(foundSuggestions.length / 3) * 120,
          },
        });
      }
    });

    // Si no se encontraron sugerencias, agregar algunas por defecto basadas en el simbolismo
    if (foundSuggestions.length === 0) {
      foundSuggestions.push(
        {
          componentId: 'scroll-reveal',
          componentName: 'Scroll Reveal',
          reason: 'Animacion de entrada recomendada para la portada',
          narrativeStage: 'Introduccion: Receptividad',
          position: { x: 100, y: 100 },
        },
        {
          componentId: 'tabs',
          componentName: 'Tabs / Pestanas',
          reason: 'Organizar las diferentes dimensiones del simbolismo',
          narrativeStage: 'Reflexion: Intelectualidad',
          position: { x: 300, y: 100 },
        },
        {
          componentId: 'textarea',
          componentName: 'Area de Texto',
          reason: 'Espacio para reflexion personal del lector',
          narrativeStage: 'Transformacion: Limite emocional-espiritual',
          position: { x: 100, y: 250 },
        }
      );
    }

    setParsedSections(foundSections);
    setSuggestions(foundSuggestions);
    setInterpreted(true);
  };

  const loadExample = () => {
    setMarkdownInput(exampleMindMap);
    setInterpreted(false);
    setSuggestions([]);
  };

  const clearInput = () => {
    setMarkdownInput('');
    setInterpreted(false);
    setSuggestions([]);
  };

  const applyToWorkbench = () => {
    onSuggestElements(suggestions);
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold">Interpretar Mapa Mental</h2>
            <p className="text-[10px] text-muted-foreground">Pega tu mapa mental en Markdown</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Input area */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
              <Upload className="w-3 h-3" />
              Mapa Mental (Markdown)
            </label>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={loadExample} className="h-5 px-1.5 text-[9px]">
                Ejemplo
              </Button>
              <Button size="sm" variant="ghost" onClick={clearInput} className="h-5 px-1.5 text-[9px]">
                <Trash2 className="w-2.5 h-2.5" />
              </Button>
            </div>
          </div>
          <Textarea
            value={markdownInput}
            onChange={e => { setMarkdownInput(e.target.value); setInterpreted(false); }}
            className="text-xs min-h-[180px] font-mono"
            placeholder={"# Titulo del Proyecto\n\n## Seccion 1\n- Contenido con video\n- Formulario de datos\n\n## Seccion 2\n- Galeria de imagenes\n- Quiz de evaluacion\n\nPega aqui tu mapa mental en formato Markdown..."}
            spellCheck={false}
          />
        </div>

        {/* Interpret button */}
        <Button
          onClick={interpretMindMap}
          disabled={!markdownInput.trim()}
          className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-xs gap-1.5"
        >
          <Wand2 className="w-3.5 h-3.5" />
          Interpretar Mapa Mental
        </Button>

        {/* Results */}
        {interpreted && (
          <div className="space-y-3">
            {/* Parsed sections */}
            {parsedSections.length > 0 && (
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                <p className="text-[10px] font-semibold text-muted-foreground mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Secciones detectadas ({parsedSections.length})
                </p>
                <div className="flex flex-wrap gap-1">
                  {parsedSections.map((s, i) => (
                    <span key={i} className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/5">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                Elementos interactivos sugeridos ({suggestions.length})
              </p>
              <div className="space-y-1.5">
                {suggestions.map((s, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <MousePointer className="w-3 h-3 text-primary flex-shrink-0" />
                      <span className="text-[10px] font-medium text-foreground">{s.componentName}</span>
                      <span className="text-[8px] text-muted-foreground ml-auto bg-white/5 px-1.5 py-0.5 rounded">
                        x:{s.position.x} y:{s.position.y} px
                      </span>
                    </div>
                    <p className="text-[9px] text-muted-foreground">{s.reason}</p>
                    <p className="text-[8px] text-primary/70 mt-0.5">{s.narrativeStage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply button */}
            <Button
              onClick={applyToWorkbench}
              variant="outline"
              className="w-full text-xs gap-1.5 border-primary/50 text-primary hover:bg-primary/10"
            >
              <MousePointer className="w-3.5 h-3.5" />
              Colocar elementos sugeridos en la mesa
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
