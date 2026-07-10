import { Monitor, Tablet, FileText, Ruler, ArrowRight, Info } from 'lucide-react';

interface DimensionPanelProps {
  preset: string;
  orientation: 'portrait' | 'landscape';
  dimensions: { w: number; h: number };
}

const presets = {
  a4: {
    name: 'A4 (ISO 216)',
    portrait: { w: 595, h: 842, label: 'Vertical (Portrait)' },
    landscape: { w: 842, h: 595, label: 'Horizontal (Landscape)' },
    mm: { w: 210, h: 297 },
    desc: 'Formato estandar internacional para documentos. Usado en libros, revistas y documentos corporativos.',
  },
  letter: {
    name: 'Carta / Letter (US)',
    portrait: { w: 612, h: 792, label: 'Vertical (Portrait)' },
    landscape: { w: 792, h: 612, label: 'Horizontal (Landscape)' },
    mm: { w: 216, h: 279 },
    desc: 'Formato estandar en Estados Unidos. Usado en informes, manuales y publicaciones norteamericanas.',
  },
  ipad: {
    name: 'iPad (9.7 pulgadas)',
    portrait: { w: 768, h: 1024, label: 'Vertical (Portrait)' },
    landscape: { w: 1024, h: 768, label: 'Horizontal (Landscape)' },
    mm: { w: 148, h: 197 },
    desc: 'Dimensiones logicas del iPad estandar. Ideal para ebooks digitales y publicaciones interactivas.',
  },
  custom: {
    name: 'Personalizado',
    portrait: { w: 600, h: 900, label: 'Vertical (Portrait)' },
    landscape: { w: 900, h: 600, label: 'Horizontal (Landscape)' },
    mm: { w: 212, h: 318 },
    desc: 'Formato personalizado optimizado para EPUB3 interactivo. Buen equilibrio entre legibilidad y espacio.',
  },
};

const pxToPt = (px: number) => Math.round(px * 0.75);
const pxToMm = (px: number) => Math.round(px * 0.264583 * 10) / 10;
const pxToInch = (px: number) => Math.round(px / 72 * 100) / 100;

export function DimensionPanel({ preset, orientation, dimensions }: DimensionPanelProps) {
  const p = presets[preset as keyof typeof presets];
  const isPortrait = orientation === 'portrait';

  // Margenes recomendados
  const marginPx = Math.round(dimensions.w * 0.08);
  const marginSafe = Math.round(dimensions.w * 0.05);

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Ruler className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold">Dimensiones de la Mesa</h2>
            <p className="text-[10px] text-muted-foreground">
              Pixeles, puntos y millimetros para InDesign
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Preset actual */}
        <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <h3 className="text-xs font-bold text-primary mb-1">{p.name}</h3>
          <p className="text-[10px] text-muted-foreground mb-2">{p.desc}</p>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] px-2 py-0.5 rounded ${isPortrait ? 'bg-primary text-white' : 'bg-white/10 text-muted-foreground'}`}>
              Vertical
            </span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
            <span className={`text-[10px] px-2 py-0.5 rounded ${!isPortrait ? 'bg-primary text-white' : 'bg-white/10 text-muted-foreground'}`}>
              Horizontal
            </span>
          </div>
        </div>

        {/* Tabla de conversion */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Ruler className="w-3 h-3" />
            Conversion de unidades
          </h4>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left p-2 font-medium text-muted-foreground">Unidad</th>
                  <th className="text-right p-2 font-medium text-muted-foreground">Ancho</th>
                  <th className="text-right p-2 font-medium text-muted-foreground">Alto</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/5">
                  <td className="p-2 font-medium text-foreground">Pixeles (px)</td>
                  <td className="p-2 text-right font-mono text-primary">{dimensions.w}</td>
                  <td className="p-2 text-right font-mono text-primary">{dimensions.h}</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="p-2 font-medium text-foreground">Puntos (pt)</td>
                  <td className="p-2 text-right font-mono">{pxToPt(dimensions.w)} pt</td>
                  <td className="p-2 text-right font-mono">{pxToPt(dimensions.h)} pt</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="p-2 font-medium text-foreground">Milimetros (mm)</td>
                  <td className="p-2 text-right font-mono">{pxToMm(dimensions.w)} mm</td>
                  <td className="p-2 text-right font-mono">{pxToMm(dimensions.h)} mm</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="p-2 font-medium text-foreground">Pulgadas (in)</td>
                  <td className="p-2 text-right font-mono">{pxToInch(dimensions.w)}"</td>
                  <td className="p-2 text-right font-mono">{pxToInch(dimensions.h)}"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Representacion visual */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Representacion visual
          </h4>
          <div className="flex justify-center">
            <div
              className="relative border-2 border-primary/40 rounded bg-primary/5 flex items-center justify-center"
              style={{
                width: isPortrait ? 120 : 180,
                height: isPortrait ? 170 : 120,
              }}
            >
              {/* Margenes */}
              <div
                className="absolute border border-dashed border-amber-500/40 rounded-sm"
                style={{
                  top: 12,
                  left: 8,
                  right: 8,
                  bottom: 12,
                }}
              />
              <div className="text-center">
                <p className="text-[9px] font-mono text-primary">{dimensions.w} x {dimensions.h} px</p>
                <p className="text-[8px] text-muted-foreground mt-0.5">{isPortrait ? 'Vertical' : 'Horizontal'}</p>
              </div>
              {/* Labels */}
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] text-muted-foreground">
                Ancho: {dimensions.w}px
              </span>
              <span className="absolute top-1/2 -right-10 -translate-y-1/2 -rotate-90 text-[8px] text-muted-foreground">
                Alto: {dimensions.h}px
              </span>
            </div>
          </div>
        </div>

        {/* Margenes recomendados */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Monitor className="w-3 h-3" />
            Margenes recomendados
          </h4>
          <div className="space-y-1.5">
            <div className="flex justify-between p-2 rounded bg-white/[0.03] border border-white/5">
              <span className="text-[10px] text-foreground">Margen de seguridad (5%)</span>
              <span className="text-[10px] font-mono text-primary">{marginSafe} px</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-white/[0.03] border border-white/5">
              <span className="text-[10px] text-foreground">Margen estandar (8%)</span>
              <span className="text-[10px] font-mono text-primary">{marginPx} px</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-white/[0.03] border border-white/5">
              <span className="text-[10px] text-foreground">Area util (ancho)</span>
              <span className="text-[10px] font-mono text-emerald-400">{dimensions.w - marginPx * 2} px</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-white/[0.03] border border-white/5">
              <span className="text-[10px] text-foreground">Area util (alto)</span>
              <span className="text-[10px] font-mono text-emerald-400">{dimensions.h - marginPx * 2} px</span>
            </div>
          </div>
        </div>

        {/* Referencia para InDesign */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <FileText className="w-3 h-3" />
            Nueva pagina en InDesign
          </h4>
          <div className="space-y-1.5">
            <div className="flex gap-2.5 items-start p-2 rounded-lg bg-white/[0.03]">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px] font-bold flex-shrink-0">1</span>
              <p className="text-[10px]">Archivo &gt; Nuevo &gt; Documento (Ctrl+N)</p>
            </div>
            <div className="flex gap-2.5 items-start p-2 rounded-lg bg-white/[0.03]">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px] font-bold flex-shrink-0">2</span>
              <p className="text-[10px]">Tamano de pagina: {preset === 'a4' ? 'A4' : preset === 'letter' ? 'Carta' : 'Personalizado'}</p>
            </div>
            <div className="flex gap-2.5 items-start p-2 rounded-lg bg-white/[0.03]">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px] font-bold flex-shrink-0">3</span>
              <p className="text-[10px]">Orientacion: {isPortrait ? 'Vertical' : 'Horizontal'}</p>
            </div>
            <div className="flex gap-2.5 items-start p-2 rounded-lg bg-white/[0.03]">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px] font-bold flex-shrink-0">4</span>
              <p className="text-[10px]">Margenes: {pxToMm(marginPx)} mm en todos los lados</p>
            </div>
          </div>
        </div>

        {/* Presets comparativa */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <Tablet className="w-3 h-3" />
            Comparativa de formatos
          </h4>
          <div className="space-y-1.5">
            {Object.entries(presets).map(([key, pr]) => {
              const isActive = key === preset;
              const d = isPortrait ? pr.portrait : pr.landscape;
              return (
                <div
                  key={key}
                  className={`flex items-center gap-3 p-2 rounded-lg border ${
                    isActive
                      ? 'bg-primary/10 border-primary/30'
                      : 'bg-white/[0.02] border-white/5'
                  }`}
                >
                  <div
                    className={`border rounded flex-shrink-0 ${
                      isActive ? 'border-primary/40 bg-primary/5' : 'border-white/10 bg-white/5'
                    }`}
                    style={{
                      width: d.w > d.h ? 32 : 20,
                      height: d.w > d.h ? 20 : 32,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {pr.name}
                    </p>
                    <p className="text-[9px] text-muted-foreground">
                      {d.w} x {d.h} px
                    </p>
                  </div>
                  {isActive && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary text-white font-medium">
                      Activo
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Info */}
        <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 flex gap-2 items-start">
          <Info className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-blue-200/80 text-[10px] leading-relaxed">
            <strong>72 px = 1 pulgada</strong> en CSS (resolucion estandar web). 
            InDesign usa <strong>puntos (pt)</strong> donde 1 pt = 1/72 pulgada. 
            Por eso los pixeles y puntos son equivalentes en diseno digital.
          </p>
        </div>
      </div>
    </div>
  );
}
