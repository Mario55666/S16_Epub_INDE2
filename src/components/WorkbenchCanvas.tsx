import { useState, useRef, useCallback } from 'react';
import { components } from '@/data/components';
import type { DroppedItem } from '@/App';
import type { Layer } from '@/components/LayersPanel';
import { X, MousePointer } from 'lucide-react';

interface WorkbenchCanvasProps {
  droppedItems: DroppedItem[];
  selectedItemId: string | null;
  onDrop: (componentId: string, x: number, y: number) => void;
  onSelectItem: (itemId: string | null) => void;
  onDeleteItem: (itemId: string) => void;
  onDragItem: (itemId: string, x: number, y: number) => void;
  orientation: 'portrait' | 'landscape';
  dimensions: { w: number; h: number };
  layers: Layer[];
}

const SCALE = 0.55; // Escala para que quepa en pantalla

export function WorkbenchCanvas({
  droppedItems,
  selectedItemId,
  onDrop,
  onSelectItem,
  onDeleteItem,
  onDragItem,
  orientation,
  dimensions,
  layers,
}: WorkbenchCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const scaledW = Math.round(dimensions.w * SCALE);
  const scaledH = Math.round(dimensions.h * SCALE);
  const marginPx = Math.round(dimensions.w * 0.08 * SCALE);

  const pageXToCanvas = (px: number) => Math.round(px * SCALE);
  const canvasToPageX = (cx: number) => Math.round(cx / SCALE);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const componentId = e.dataTransfer.getData('componentId');
      if (!componentId || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const canvasX = e.clientX - rect.left;
      const canvasY = e.clientY - rect.top;

      // Convertir coordenadas del canvas escalado a coordenadas reales
      const realX = canvasToPageX(canvasX);
      const realY = canvasToPageX(canvasY);
      onDrop(componentId, realX, realY);
    },
    [onDrop]
  );

  const handleItemMouseDown = useCallback(
    (e: React.MouseEvent, itemId: string) => {
      e.stopPropagation();
      e.preventDefault();
      onSelectItem(itemId);
      setDraggingItemId(itemId);
      const item = droppedItems.find(i => i.id === itemId);
      if (item) {
        setDragOffset({
          x: e.clientX,
          y: e.clientY,
        });
      }
    },
    [droppedItems, onSelectItem]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!draggingItemId || !canvasRef.current) return;

      const dx = e.clientX - dragOffset.x;
      const dy = e.clientY - dragOffset.y;

      const dpr = SCALE;
      const realDx = Math.round(dx / dpr);
      const realDy = Math.round(dy / dpr);

      setDragOffset({ x: e.clientX, y: e.clientY });

      const item = droppedItems.find(i => i.id === draggingItemId);
      if (item) {
        const newX = Math.max(0, Math.min(item.x + realDx, dimensions.w - 20));
        const newY = Math.max(0, Math.min(item.y + realDy, dimensions.h - 20));
        onDragItem(draggingItemId, newX, newY);
      }
    },
    [draggingItemId, dragOffset, droppedItems, onDragItem, dimensions]
  );

  const handleMouseUp = useCallback(() => {
    setDraggingItemId(null);
  }, []);

  const handleCanvasClick = useCallback(() => {
    if (!draggingItemId) {
      onSelectItem(null);
    }
  }, [draggingItemId, onSelectItem]);

  return (
    <div className="flex justify-center items-start min-h-full py-2">
      <div
        className="relative"
        style={{ width: scaledW + 40, height: scaledH + 40 }}
      >
        {/* Ruler - Top */}
        <div
          className="absolute top-0 left-10 right-0 h-6 flex items-end overflow-hidden"
          style={{ width: scaledW }}
        >
          {Array.from({ length: Math.ceil(dimensions.w / 100) + 1 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 border-l border-muted-foreground/30 text-[7px] text-muted-foreground/50 pl-0.5"
              style={{ width: pageXToCanvas(100), height: 12 }}
            >
              {i * 100}
            </div>
          ))}
        </div>

        {/* Ruler - Left */}
        <div
          className="absolute top-6 left-0 bottom-0 w-8 flex flex-col overflow-hidden"
          style={{ height: scaledH }}
        >
          {Array.from({ length: Math.ceil(dimensions.h / 100) + 1 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 border-t border-muted-foreground/30 text-[7px] text-muted-foreground/50 pt-0.5 text-right pr-0.5"
              style={{ height: pageXToCanvas(100) }}
            >
              {i * 100}
            </div>
          ))}
        </div>

        {/* Canvas Page */}
        <div
          ref={canvasRef}
          className={`absolute top-6 left-8 rounded-sm border-2 transition-colors ${
            isDragOver
              ? 'border-primary bg-primary/5'
              : 'border-border/60 bg-card/80'
          }`}
          style={{
            width: scaledW,
            height: scaledH,
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleCanvasClick}
        >
          {/* Grid interior */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
              backgroundSize: `${pageXToCanvas(50)}px ${pageXToCanvas(50)}px`,
            }}
          />

          {/* Margin guides */}
          <div
            className="absolute border border-dashed border-amber-500/30 rounded-sm pointer-events-none"
            style={{
              top: marginPx,
              left: marginPx,
              right: marginPx,
              bottom: marginPx,
            }}
          />
          <div className="absolute top-1 left-1.5 text-[7px] text-amber-500/40 pointer-events-none font-mono">
            margen {Math.round(dimensions.w * 0.08)}px
          </div>

          {/* Center fold guide (for spreads) */}
          {orientation === 'portrait' && (
            <div
              className="absolute top-0 bottom-0 border-l border-dashed border-blue-500/20 pointer-events-none"
              style={{ left: scaledW / 2 }}
            />
          )}

          {/* Dimension label */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-muted-foreground/50 font-mono whitespace-nowrap">
            {dimensions.w} x {dimensions.h} px
          </div>
          <div className="absolute bottom-1 right-1.5 text-[7px] text-muted-foreground/30 pointer-events-none">
            {orientation === 'portrait' ? 'Vertical' : 'Horizontal'}
          </div>

          {/* Empty state */}
          {droppedItems.length === 0 && !isDragOver && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <MousePointer className="w-8 h-8 text-muted-foreground/15 mx-auto mb-2" />
                <p className="text-[10px] text-muted-foreground/30 font-medium">
                  Arrastra componentes aqui
                </p>
                <p className="text-[8px] text-muted-foreground/20 mt-1">
                  {dimensions.w} x {dimensions.h} px
                </p>
              </div>
            </div>
          )}

          {/* Drop indicator */}
          {isDragOver && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-2 border-dashed border-primary/50 rounded-lg px-6 py-3 bg-primary/10">
                <p className="text-[11px] text-primary font-medium">Suelta aqui</p>
              </div>
            </div>
          )}

          {/* Dropped items */}
          {droppedItems.map(item => {
            const comp = components.find(c => c.id === item.componentId);
            if (!comp) return null;
            const isSelected = item.id === selectedItemId;
            const sx = pageXToCanvas(item.x);
            const sy = pageXToCanvas(item.y);
            const itemLayer = layers.find(l => l.id === item.layerId);
            const layerColor = itemLayer?.color || '#3B82F6';

            return (
              <div
                key={item.id}
                className={`absolute px-2 py-1.5 rounded border text-[9px] cursor-move select-none transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/20 shadow-md shadow-primary/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                }`}
                style={{
                  left: sx,
                  top: sy,
                  minWidth: Math.max(70, pageXToCanvas(comp.previewWidth) * 0.5),
                  zIndex: isSelected ? 10 : 1,
                  borderLeft: `3px solid ${layerColor}`,
                }}
                onMouseDown={e => handleItemMouseDown(e, item.id)}
              >
                <div className="flex items-center gap-1 pointer-events-none">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: layerColor }}
                  />
                  <span className="font-medium truncate">{comp.name}</span>
                </div>
                <div className="text-[7px] text-muted-foreground/60 mt-0.5 truncate pointer-events-none">
                  {comp.categoryLabel} {itemLayer && `· ${itemLayer.name}`}
                </div>

                {/* Position label on hover/selected */}
                {isSelected && (
                  <div className="text-[7px] text-primary/70 font-mono mt-0.5 pointer-events-none">
                    x:{item.x} y:{item.y} px
                  </div>
                )}

                {/* Delete button */}
                {isSelected && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onDeleteItem(item.id);
                    }}
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
