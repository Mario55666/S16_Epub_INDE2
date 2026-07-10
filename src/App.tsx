import { useState, useCallback } from 'react';
import { components, categories } from '@/data/components';
import { defaultProjectContext, type ProjectContext } from '@/data/projectContext';
import { ComponentPalette } from '@/components/ComponentPalette';
import { WorkbenchCanvas } from '@/components/WorkbenchCanvas';
import { InspectorPanel } from '@/components/InspectorPanel';
import { ExportPanel } from '@/components/ExportPanel';
import { GuidePanel } from '@/components/GuidePanel';
import { DimensionPanel } from '@/components/DimensionPanel';
import { ProjectContextPanel } from '@/components/ProjectContextPanel';
import { LayersPanel, type Layer } from '@/components/LayersPanel';
import { PromptGenerator } from '@/components/PromptGenerator';
import { NarrativeArc } from '@/components/NarrativeArc';
import { MindMapInterpreter, type SuggestedElement } from '@/components/MindMapInterpreter';
import { ReportPanel } from '@/components/ReportPanel';
import {
  Palette, Download, RotateCcw, BookOpen, Ruler,
  User, Layers as LayersIcon, Wand2, Sparkles, FileText, GraduationCap, Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface DroppedItem {
  id: string;
  componentId: string;
  x: number;
  y: number;
  label: string;
  layerId: string;
}

const defaultLayer: Layer = {
  id: 'layer-base',
  name: 'Capa base',
  visible: true,
  color: '#3B82F6',
  itemIds: [],
};

export default function App() {
  // Project context
  const [projectContext, setProjectContext] = useState<ProjectContext>(defaultProjectContext);

  // Canvas items
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Layers
  const [layers, setLayers] = useState<Layer[]>([defaultLayer]);
  const [activeLayerId, setActiveLayerId] = useState('layer-base');

  // Panels
  const [activePanel, setActivePanel] = useState<string | null>('guide');
  const [showExport, setShowExport] = useState(false);
  const [showReport, setShowReport] = useState(false);

  // Canvas config
  const [canvasOrientation, setCanvasOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [canvasPreset, setCanvasPreset] = useState<'a4' | 'letter' | 'ipad' | 'custom'>('a4');

  const selectedComponent = selectedItemId
    ? components.find(c => c.id === droppedItems.find(i => i.id === selectedItemId)?.componentId)
    : null;

  const presets = {
    a4: { portrait: { w: 595, h: 842 }, landscape: { w: 842, h: 595 } },
    letter: { portrait: { w: 612, h: 792 }, landscape: { w: 792, h: 612 } },
    ipad: { portrait: { w: 768, h: 1024 }, landscape: { w: 1024, h: 768 } },
    custom: { portrait: { w: 600, h: 900 }, landscape: { w: 900, h: 600 } },
  };
  const currentDim = presets[canvasPreset][canvasOrientation];

  // Only show items from visible layers
  const visibleLayerIds = layers.filter(l => l.visible).map(l => l.id);
  const visibleItems = droppedItems.filter(i => visibleLayerIds.includes(i.layerId));

  const handleDrop = useCallback((componentId: string, x: number, y: number) => {
    const comp = components.find(c => c.id === componentId);
    if (!comp) return;
    const newItem: DroppedItem = {
      id: `${componentId}-${Date.now()}`,
      componentId,
      x,
      y,
      label: comp.name,
      layerId: activeLayerId,
    };
    setDroppedItems(prev => [...prev, newItem]);
    setLayers(prev => prev.map(l =>
      l.id === activeLayerId ? { ...l, itemIds: [...l.itemIds, newItem.id] } : l
    ));
    setSelectedItemId(newItem.id);
  }, [activeLayerId]);

  const handleSelectItem = useCallback((itemId: string | null) => {
    setSelectedItemId(itemId);
  }, []);

  const handleDeleteItem = useCallback((itemId: string) => {
    const item = droppedItems.find(i => i.id === itemId);
    setDroppedItems(prev => prev.filter(i => i.id !== itemId));
    if (item) {
      setLayers(prev => prev.map(l => ({
        ...l,
        itemIds: l.itemIds.filter(id => id !== itemId),
      })));
    }
    if (selectedItemId === itemId) setSelectedItemId(null);
  }, [droppedItems, selectedItemId]);

  const handleClearAll = useCallback(() => {
    setDroppedItems([]);
    setSelectedItemId(null);
    setLayers(prev => prev.map(l => ({ ...l, itemIds: [] })));
  }, []);

  const handleDragItem = useCallback((itemId: string, x: number, y: number) => {
    setDroppedItems(prev => prev.map(i => (i.id === itemId ? { ...i, x, y } : i)));
  }, []);

  // Apply suggested elements from mind map interpreter
  const handleSuggestedElements = useCallback((suggestions: SuggestedElement[]) => {
    suggestions.forEach(s => {
      const comp = components.find(c => c.id === s.componentId);
      if (!comp) return;
      const newItem: DroppedItem = {
        id: `${s.componentId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        componentId: s.componentId,
        x: s.position.x,
        y: s.position.y,
        label: s.componentName,
        layerId: activeLayerId,
      };
      setDroppedItems(prev => [...prev, newItem]);
      setLayers(prev => prev.map(l =>
        l.id === activeLayerId ? { ...l, itemIds: [...l.itemIds, newItem.id] } : l
      ));
    });
  }, [activeLayerId]);

  // Toggle panels
  const togglePanel = (panel: string) => {
    setActivePanel(prev => prev === panel ? null : panel);
  };

  // Layer panel is separate toggle
  const [showLayers, setShowLayers] = useState(false);

  const navButtons = [
    { key: 'guide', icon: <BookOpen className="w-3.5 h-3.5" />, label: 'Guia' },
    { key: 'context', icon: <User className="w-3.5 h-3.5" />, label: 'Ficha' },
    { key: 'dims', icon: <Ruler className="w-3.5 h-3.5" />, label: 'Medidas' },
    { key: 'mindmap', icon: <Brain className="w-3.5 h-3.5" />, label: 'Mapa Mental' },
    { key: 'prompt', icon: <Wand2 className="w-3.5 h-3.5" />, label: 'Prompt' },
    { key: 'arc', icon: <Sparkles className="w-3.5 h-3.5" />, label: 'Arco' },
  ];

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* ===== HEADER ===== */}
      <header className="h-14 border-b border-border flex items-center justify-between px-3 bg-card/50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-orange-500 flex items-center justify-center">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">Planificador EPUB3 — Simbolismo de Espacio</h1>
            <p className="text-[10px] text-muted-foreground leading-tight flex items-center gap-1">
              <GraduationCap className="w-3 h-3" />
              IDC · Curso: Infografia · Docente: Mg. Mario Quiroz Martinez
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {navButtons.map(btn => (
            <Button
              key={btn.key}
              size="sm"
              variant={activePanel === btn.key ? 'default' : 'ghost'}
              onClick={() => togglePanel(btn.key)}
              className="text-[10px] gap-1 h-7 px-2"
            >
              {btn.icon}
              {btn.label}
            </Button>
          ))}

          <div className="w-px h-5 bg-border mx-1" />

          <Button
            size="sm"
            variant={showLayers ? 'default' : 'ghost'}
            onClick={() => setShowLayers(!showLayers)}
            className="text-[10px] gap-1 h-7 px-2"
          >
            <LayersIcon className="w-3.5 h-3.5" />
            Capas
          </Button>

          <div className="w-px h-5 bg-border mx-1" />

          <Button
            size="sm"
            variant="ghost"
            onClick={handleClearAll}
            className="text-[10px] gap-1 h-7 px-2"
            title="Limpiar mesa"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowExport(true)}
            className="text-[10px] gap-1 h-7 px-2"
            title="Exportar codigo"
          >
            <Download className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="sm"
            variant="default"
            onClick={() => setShowReport(true)}
            className="text-[10px] gap-1 h-7 px-2 bg-primary"
            title="Generar informe"
          >
            <FileText className="w-3.5 h-3.5" />
            Informe
          </Button>
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANELS */}
        <aside className="border-r border-border bg-card/30 flex-shrink-0 overflow-hidden flex flex-col" style={{ width: 260 }}>
          <div className="flex-1 overflow-y-auto">
            <ComponentPalette categories={categories} onDragStart={() => {}} />
          </div>
          {showLayers && (
            <div className="border-t border-border max-h-48 overflow-y-auto flex-shrink-0">
              <LayersPanel
                layers={layers}
                activeLayerId={activeLayerId}
                onLayerChange={setLayers}
                onActiveLayerChange={setActiveLayerId}
              />
            </div>
          )}
        </aside>

        {/* CENTER — WORKBENCH */}
        <main className="flex-1 relative overflow-hidden flex flex-col">
          {/* Canvas toolbar */}
          <div className="h-8 border-b border-border/50 bg-card/20 flex items-center px-3 gap-2 flex-shrink-0">
            <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">Mesa</span>
            <div className="h-3 w-px bg-border" />
            <select
              value={canvasPreset}
              onChange={e => setCanvasPreset(e.target.value as typeof canvasPreset)}
              className="text-[9px] bg-transparent border border-border rounded px-1 py-0.5 text-muted-foreground"
            >
              <option value="a4">A4 (595×842 px)</option>
              <option value="letter">Carta (612×792 px)</option>
              <option value="ipad">iPad (768×1024 px)</option>
              <option value="custom">Custom (600×900 px)</option>
            </select>
            <div className="flex gap-0.5">
              <button
                onClick={() => setCanvasOrientation('portrait')}
                className={`text-[9px] px-1.5 py-0.5 rounded border ${
                  canvasOrientation === 'portrait' ? 'bg-primary/20 border-primary text-primary' : 'border-border text-muted-foreground'
                }`}
              >
                V
              </button>
              <button
                onClick={() => setCanvasOrientation('landscape')}
                className={`text-[9px] px-1.5 py-0.5 rounded border ${
                  canvasOrientation === 'landscape' ? 'bg-primary/20 border-primary text-primary' : 'border-border text-muted-foreground'
                }`}
              >
                H
              </button>
            </div>
            <div className="h-3 w-px bg-border" />
            <span className="text-[9px] text-primary font-mono">{currentDim.w} × {currentDim.h} px</span>
            {layers.find(l => l.id === activeLayerId) && (
              <>
                <div className="h-3 w-px bg-border ml-auto" />
                <div className="flex items-center gap-1">
                  <LayersIcon className="w-3 h-3 text-muted-foreground" />
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: layers.find(l => l.id === activeLayerId)?.color }} />
                  <span className="text-[9px] text-muted-foreground">{layers.find(l => l.id === activeLayerId)?.name}</span>
                </div>
              </>
            )}
            <span className="text-[9px] text-muted-foreground ml-auto">
              {visibleItems.length} objetos · {layers.filter(l => l.visible).length}/{layers.length} capas visibles
            </span>
          </div>

          <div className="flex-1 overflow-auto p-3">
            <WorkbenchCanvas
              droppedItems={visibleItems}
              selectedItemId={selectedItemId}
              onDrop={handleDrop}
              onSelectItem={handleSelectItem}
              onDeleteItem={handleDeleteItem}
              onDragItem={handleDragItem}
              orientation={canvasOrientation}
              dimensions={currentDim}
              layers={layers}
            />
          </div>
        </main>

        {/* RIGHT PANEL */}
        <aside className="w-[440px] border-l border-border bg-card/30 flex-shrink-0 overflow-y-auto">
          {activePanel === 'guide' ? (
            <GuidePanel />
          ) : activePanel === 'context' ? (
            <ProjectContextPanel context={projectContext} onChange={setProjectContext} />
          ) : activePanel === 'dims' ? (
            <DimensionPanel preset={canvasPreset} orientation={canvasOrientation} dimensions={currentDim} />
          ) : activePanel === 'mindmap' ? (
            <MindMapInterpreter onSuggestElements={handleSuggestedElements} />
          ) : activePanel === 'prompt' ? (
            <PromptGenerator />
          ) : activePanel === 'arc' ? (
            <NarrativeArc />
          ) : selectedComponent ? (
            <InspectorPanel component={selectedComponent} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <Palette className="w-10 h-10 text-muted-foreground/20 mb-3" />
              <p className="text-sm text-muted-foreground font-medium">Inspector de Componentes</p>
              <p className="text-xs text-muted-foreground mt-2 max-w-[240px]">
                Selecciona un componente en la mesa, o abre un panel de la barra superior.
              </p>
              <div className="flex flex-col gap-2 mt-4">
                <Button size="sm" variant="outline" onClick={() => togglePanel('guide')} className="text-xs gap-1">
                  <BookOpen className="w-3 h-3" /> Guia EPUB3
                </Button>
                <Button size="sm" variant="outline" onClick={() => togglePanel('context')} className="text-xs gap-1">
                  <User className="w-3 h-3" /> Ficha de Contexto
                </Button>
                <Button size="sm" variant="outline" onClick={() => togglePanel('mindmap')} className="text-xs gap-1">
                  <Brain className="w-3 h-3" /> Mapa Mental
                </Button>
                <Button size="sm" variant="outline" onClick={() => togglePanel('arc')} className="text-xs gap-1">
                  <Sparkles className="w-3 h-3" /> Arco Narrativo
                </Button>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="h-7 border-t border-border bg-card/40 flex items-center justify-between px-4 flex-shrink-0 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <GraduationCap className="w-3 h-3" />
            Curso: Infografia
          </span>
          <span className="text-border">|</span>
          <span>Docente: Mg. Mario Quiroz Martinez</span>
          <span className="text-border">|</span>
          <span>IDC — Instituto de Diseno y Comunicacion</span>
        </div>
        <div className="flex items-center gap-3">
          {projectContext.nombres && projectContext.apellidos && (
            <span className="text-foreground/60">
              Estudiante: {projectContext.nombres} {projectContext.apellidos}
            </span>
          )}
          <span className="text-border">|</span>
          <span>
            {visibleItems.length} objetos · {layers.length} capas
            {currentDim.w > 0 && ` · ${currentDim.w}×${currentDim.h}px`}
          </span>
        </div>
      </footer>

      {/* Export Modal */}
      {showExport && (
        <ExportPanel
          droppedItems={droppedItems}
          components={components}
          onClose={() => setShowExport(false)}
        />
      )}

      {/* Report Modal */}
      {showReport && (
        <ReportPanel
          projectContext={projectContext}
          droppedItems={droppedItems}
          layers={layers}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
}
