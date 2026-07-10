import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { components } from '@/data/components';
import { spaceDimensions, narrativeArc } from '@/data/projectContext';
import type { ProjectContext } from '@/data/projectContext';
import type { DroppedItem } from '@/App';
import type { Layer } from '@/components/LayersPanel';
import { FileText, Printer, X, Square } from 'lucide-react';

interface ReportPanelProps {
  projectContext: ProjectContext;
  droppedItems: DroppedItem[];
  layers: Layer[];
  onClose: () => void;
}

export function ReportPanel({ projectContext, droppedItems, layers, onClose }: ReportPanelProps) {
  const [showPrintView, setShowPrintView] = useState(false);

  const selectedDims = spaceDimensions.filter(d =>
    projectContext.dimensionesSeleccionadas.includes(d.id)
  );

  const handlePrint = () => {
    setShowPrintView(true);
    setTimeout(() => {
      window.print();
      setShowPrintView(false);
    }, 300);
  };

  if (showPrintView) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white text-black overflow-auto p-12 print:p-8">
        <style>{`@media print { body { margin: 0; padding: 20px; font-family: Arial, sans-serif; } }`}</style>
        <ReportContent ctx={projectContext} items={droppedItems} layers={layers} dims={selectedDims} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl max-w-2xl w-full max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Informe del Proyecto EPUB3
            </h3>
            <p className="text-[10px] text-muted-foreground">
              Resumen completo de la planificacion interactiva
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handlePrint} className="text-xs gap-1.5">
              <Printer className="w-3.5 h-3.5" />
              Imprimir / PDF
            </Button>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-invert prose-sm max-w-none">
            <ReportContent ctx={projectContext} items={droppedItems} layers={layers} dims={selectedDims} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportContent({
  ctx, items, layers, dims,
}: {
  ctx: ProjectContext;
  items: DroppedItem[];
  layers: Layer[];
  dims: typeof spaceDimensions;
}) {
  const usedComponents = items
    .map(item => components.find(c => c.id === item.componentId))
    .filter(Boolean);
  const uniqueComponents = [...new Map(usedComponents.map(c => [c!.id, c!])).values()];

  return (
    <div className="space-y-8">
      {/* PORTADA */}
      <div className="text-center border-b-2 border-primary/30 pb-8">
        <h1 className="text-2xl font-bold mb-2">Informe de Planificacion EPUB3 Interactivo</h1>
        <p className="text-lg text-primary font-medium mb-4">{ctx.tituloProyecto || 'Sin titulo'}</p>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>Curso:</strong> Infografia</p>
          <p><strong>Docente:</strong> Mg. Mario Quiroz Martinez</p>
          <p><strong>Fecha:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* 1. DATOS DEL ESTUDIANTE */}
      <section>
        <h2 className="text-lg font-bold text-primary mb-3 border-b border-white/10 pb-1">
          1. Datos del Estudiante
        </h2>
        <table className="w-full text-xs">
          <tbody>
            <tr className="border-b border-white/5">
              <td className="py-1.5 text-muted-foreground w-32">Nombres</td>
              <td className="py-1.5 font-medium">{ctx.nombres || '-'}</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-1.5 text-muted-foreground">Apellidos</td>
              <td className="py-1.5 font-medium">{ctx.apellidos || '-'}</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-1.5 text-muted-foreground">Email</td>
              <td className="py-1.5">{ctx.email || '-'}</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-1.5 text-muted-foreground">Codigo</td>
              <td className="py-1.5">{ctx.codigo || '-'}</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-1.5 text-muted-foreground">Seccion</td>
              <td className="py-1.5">{ctx.seccion || '-'}</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-1.5 text-muted-foreground">Tipo de trabajo</td>
              <td className="py-1.5">
                {ctx.esTrabajoIndividual ? 'Trabajo Individual' : ctx.esTrabajoEnEquipo ? `Trabajo en Equipo (${ctx.numeroIntegrantes} integrantes)` : '-'}
              </td>
            </tr>
            {ctx.esTrabajoEnEquipo && ctx.nombresIntegrantes && (
              <tr className="border-b border-white/5">
                <td className="py-1.5 text-muted-foreground align-top">Integrantes</td>
                <td className="py-1.5 whitespace-pre-line">{ctx.nombresIntegrantes}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* 2. CONTEXTO DEL PROYECTO */}
      <section>
        <h2 className="text-lg font-bold text-primary mb-3 border-b border-white/10 pb-1">
          2. Contexto del Proyecto
        </h2>
        <div className="space-y-3 text-xs">
          <div>
            <p className="text-muted-foreground mb-0.5">Contexto Tematico</p>
            <p className="bg-white/5 p-2 rounded">{ctx.contextoTematico || 'No especificado'}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-0.5">Contexto Espacial</p>
            <p className="bg-white/5 p-2 rounded">{ctx.contextoEspacial || 'No especificado'}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-0.5">Contexto Temporal</p>
            <p className="bg-white/5 p-2 rounded">{ctx.contextoTemporal || 'No especificado'}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-0.5">Publico Objetivo</p>
            <p className="bg-white/5 p-2 rounded">{ctx.publicoObjetivo || 'No especificado'}</p>
          </div>
        </div>
      </section>

      {/* 3. DIMENSIONES DEL SIMBOLISMO DE ESPACIO */}
      <section>
        <h2 className="text-lg font-bold text-primary mb-3 border-b border-white/10 pb-1">
          3. Dimensiones del Simbolismo de Espacio
        </h2>
        {dims.length === 0 ? (
          <p className="text-xs text-muted-foreground">No se han seleccionado dimensiones.</p>
        ) : (
          <div className="space-y-2">
            {dims.map(dim => (
              <div key={dim.id} className="flex items-start gap-2 p-2 rounded bg-white/[0.03]">
                <span className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: dim.color }} />
                <div className="text-xs">
                  <p className="font-medium">{dim.name}</p>
                  <p className="text-muted-foreground">{dim.description}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    <strong>Recursos:</strong> {dim.visualResources.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. ARCO NARRATIVO */}
      <section>
        <h2 className="text-lg font-bold text-primary mb-3 border-b border-white/10 pb-1">
          4. Arco Narrativo
        </h2>
        <div className="space-y-2">
          {narrativeArc.map((stage, i) => (
            <div key={stage.id} className="flex gap-2 text-xs">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                {i + 1}
              </span>
              <div>
                <p className="font-medium">{stage.name}</p>
                <p className="text-muted-foreground">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ELEMENTOS INTERACTIVOS */}
      <section>
        <h2 className="text-lg font-bold text-primary mb-3 border-b border-white/10 pb-1">
          5. Elementos Interactivos Planificados
        </h2>
        {uniqueComponents.length === 0 ? (
          <p className="text-xs text-muted-foreground">No se han colocado componentes en la mesa de trabajo.</p>
        ) : (
          <div className="space-y-3">
            {uniqueComponents.map(comp => {
              const itemsOfComp = items.filter(item => item.componentId === comp.id);
              return (
                <div key={comp.id} className="p-3 rounded bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold">{comp.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 text-muted-foreground">
                      {comp.categoryLabel}
                    </span>
                    <span className="text-[9px] text-muted-foreground ml-auto">
                      {itemsOfComp.length} instancias
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-2">{comp.description}</p>
                  <div className="grid grid-cols-1 gap-1">
                    {itemsOfComp.map((item, idx) => {
                      const layer = layers.find(l => l.id === item.layerId);
                      return (
                        <div key={idx} className="text-[9px] text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer?.color || '#666' }} />
                          Posicion: ({item.x}px, {item.y}px) — Capa: {layer?.name || 'Base'}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. CAPAS */}
      <section>
        <h2 className="text-lg font-bold text-primary mb-3 border-b border-white/10 pb-1">
          6. Estructura de Capas
        </h2>
        <div className="space-y-1">
          {layers.map(layer => (
            <div key={layer.id} className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: layer.color }} />
              <span>{layer.name}</span>
              <span className="text-muted-foreground">— {layer.itemIds.length} objetos</span>
              <span className="text-[9px] ml-auto">{layer.visible ? 'Visible' : 'Oculta'}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CHECKLIST */}
      <section>
        <h2 className="text-lg font-bold text-primary mb-3 border-b border-white/10 pb-1">
          7. Checklist de Implementacion
        </h2>
        <div className="space-y-1 text-xs">
          {[
            'Disenar maqueta base en Adobe InDesign',
            'Definir dimensiones de la pagina (px)',
            'Insertar elementos interactivos con Botones y Formularios',
            'Exportar como EPUB (Interactivo)',
            'Abrir EPUB en editor de codigo (Sigil / VS Code)',
            'Insertar HTML de cada elemento interactivo',
            'Agregar CSS para estilos y animaciones',
            'Implementar JavaScript para logica avanzada',
            'Declarar archivos en content.opf (manifest)',
            'Validar con epubcheck',
            'Probar en Thorium Reader',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 py-0.5">
              <Square className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FORMULAS HTML */}
      {uniqueComponents.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-primary mb-3 border-b border-white/10 pb-1">
            8. Formulas HTML / CSS / JS
          </h2>
          <div className="space-y-4">
            {uniqueComponents.map(comp => (
              <div key={comp.id} className="space-y-2">
                <h3 className="text-sm font-semibold">{comp.name}</h3>
                <div className="bg-black/40 rounded p-2 text-[9px] font-mono overflow-x-auto">
                  <p className="text-muted-foreground mb-1">HTML:</p>
                  <pre className="text-emerald-300 whitespace-pre-wrap">{comp.htmlFormula}</pre>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <div className="text-center border-t border-white/10 pt-6 text-xs text-muted-foreground">
        <p className="font-medium">IDC — Instituto de Diseno y Comunicacion</p>
        <p>Curso: Infografia | Docente: Mg. Mario Quiroz Martinez</p>
        <p className="mt-1">Generado el {new Date().toLocaleDateString('es-ES')}</p>
      </div>
    </div>
  );
}
