import { narrativeArc, spaceDimensions } from '@/data/projectContext';
import { ChevronRight, Eye, MousePointer, Palette, Sparkles } from 'lucide-react';

export function NarrativeArc() {
  const getDimColor = (dimId: string) => {
    const dim = spaceDimensions.find(d => d.id === dimId);
    return dim?.color || '#3B82F6';
  };

  const getDimName = (dimId: string) => {
    const dim = spaceDimensions.find(d => d.id === dimId);
    return dim?.name || dimId;
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold">Arco Narrativo</h2>
            <p className="text-[10px] text-muted-foreground">Basado en el Simbolismo de Espacio</p>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
          Organiza tus elementos interactivos siguiendo un recorrido emocional 
          que guia al lector desde la receptividad hasta la trascendencia.
        </p>
      </div>

      <div className="p-4 space-y-2">
        {/* Timeline */}
        <div className="relative pl-6">
          {/* Timeline line */}
          <div
            className="absolute left-[11px] top-2 bottom-2 w-0.5"
            style={{
              background: 'linear-gradient(to bottom, #84CC16, #F97316, #EF4444, #10B981, #DC2626, #3B82F6, #EC4899, #F59E0B)',
            }}
          />

          {narrativeArc.map((stage, i) => {
            const dimColor = getDimColor(stage.dimension);
            const isLast = i === narrativeArc.length - 1;

            return (
              <div key={stage.id} className="relative mb-3">
                {/* Node */}
                <div
                  className="absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10"
                  style={{
                    backgroundColor: dimColor + '30',
                    borderColor: dimColor,
                  }}
                >
                  <span className="text-[7px] font-bold" style={{ color: dimColor }}>
                    {i + 1}
                  </span>
                </div>

                {/* Card */}
                <div
                  className="p-3 rounded-lg border bg-card/30 transition-all hover:bg-card/60"
                  style={{ borderColor: dimColor + '40' }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[8px] px-1.5 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: dimColor + '20',
                        color: dimColor,
                      }}
                    >
                      {getDimName(stage.dimension)}
                    </span>
                  </div>

                  <h3 className="text-[11px] font-semibold text-foreground mb-1">
                    {stage.name}
                  </h3>

                  <p className="text-[9px] text-muted-foreground leading-relaxed mb-2">
                    {stage.description}
                  </p>

                  {/* Visual approach */}
                  <div className="flex items-start gap-1.5 mb-2">
                    <Palette className="w-3 h-3 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                    <p className="text-[8px] text-muted-foreground/70">
                      {stage.visualApproach}
                    </p>
                  </div>

                  {/* Interactive elements */}
                  <div className="space-y-1">
                    <p className="text-[8px] text-muted-foreground/50 flex items-center gap-1">
                      <MousePointer className="w-2.5 h-2.5" />
                      Elementos interactivos:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {stage.interactiveElements.map((el, j) => (
                        <span
                          key={j}
                          className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground"
                        >
                          {el}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow (except last) */}
                {!isLast && (
                  <div className="flex justify-center py-1">
                    <ChevronRight className="w-3 h-3 text-muted-foreground/20 rotate-90" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 p-3 rounded-lg bg-white/[0.03] border border-white/5">
          <h4 className="text-[10px] font-semibold mb-2 flex items-center gap-1.5">
            <Eye className="w-3 h-3" />
            Como usar el arco narrativo
          </h4>
          <ol className="space-y-1.5 text-[9px] text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary font-bold">1.</span>
              Lee cada etapa de arriba hacia abajo como un recorrido.
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">2.</span>
              Arrastra los componentes interactivos a la mesa segun la etapa.
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">3.</span>
              Usa el color de cada dimension para organizar visualmente.
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">4.</span>
              El lector vivira el arco al navegar tu EPUB de inicio a fin.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
