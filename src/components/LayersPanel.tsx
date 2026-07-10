import { useState } from 'react';
import { Eye, EyeOff, Plus, Trash2, ChevronUp, ChevronDown, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  color: string;
  itemIds: string[]; // IDs de los items en esta capa
}

interface LayersPanelProps {
  layers: Layer[];
  activeLayerId: string;
  onLayerChange: (layers: Layer[]) => void;
  onActiveLayerChange: (id: string) => void;
}

const layerColors = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#06B6D4', '#F97316', '#84CC16', '#6366F1',
];

export function LayersPanel({
  layers,
  activeLayerId,
  onLayerChange,
  onActiveLayerChange,
}: LayersPanelProps) {
  const [newLayerName, setNewLayerName] = useState('');
  const [showNewLayer, setShowNewLayer] = useState(false);

  const addLayer = () => {
    if (!newLayerName.trim()) return;
    const color = layerColors[layers.length % layerColors.length];
    const newLayer: Layer = {
      id: `layer-${Date.now()}`,
      name: newLayerName,
      visible: true,
      color,
      itemIds: [],
    };
    onLayerChange([...layers, newLayer]);
    onActiveLayerChange(newLayer.id);
    setNewLayerName('');
    setShowNewLayer(false);
  };

  const toggleVisibility = (layerId: string) => {
    onLayerChange(
      layers.map(l => (l.id === layerId ? { ...l, visible: !l.visible } : l))
    );
  };

  const deleteLayer = (layerId: string) => {
    if (layers.length <= 1) return; // No eliminar la ultima capa
    const newLayers = layers.filter(l => l.id !== layerId);
    onLayerChange(newLayers);
    if (activeLayerId === layerId) {
      onActiveLayerChange(newLayers[0]?.id || '');
    }
  };

  const moveLayer = (layerId: string, direction: 'up' | 'down') => {
    const idx = layers.findIndex(l => l.id === layerId);
    if (idx === -1) return;
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === layers.length - 1) return;

    const newLayers = [...layers];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    [newLayers[idx], newLayers[swapIdx]] = [newLayers[swapIdx], newLayers[idx]];
    onLayerChange(newLayers);
  };

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          Capas
        </h3>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowNewLayer(!showNewLayer)}
          className="h-6 w-6 p-0"
        >
          <Plus className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* New layer input */}
      {showNewLayer && (
        <div className="flex gap-1.5">
          <Input
            value={newLayerName}
            onChange={e => setNewLayerName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addLayer()}
            placeholder="Nombre de capa..."
            className="h-6 text-[10px]"
            autoFocus
          />
          <Button size="sm" onClick={addLayer} className="h-6 px-2 text-[10px]">
            Crear
          </Button>
        </div>
      )}

      {/* Layer list */}
      <div className="space-y-1">
        {[...layers].reverse().map(layer => {
          const isActive = layer.id === activeLayerId;
          return (
            <div
              key={layer.id}
              onClick={() => onActiveLayerChange(layer.id)}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[10px] cursor-pointer transition-all border ${
                isActive
                  ? 'border-white/20 bg-white/10'
                  : 'border-transparent hover:border-white/10 hover:bg-white/5'
              }`}
            >
              {/* Visibility toggle */}
              <button
                onClick={e => {
                  e.stopPropagation();
                  toggleVisibility(layer.id);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {layer.visible ? (
                  <Eye className="w-3 h-3" />
                ) : (
                  <EyeOff className="w-3 h-3 text-muted-foreground/40" />
                )}
              </button>

              {/* Color indicator */}
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-white/20"
                style={{ backgroundColor: layer.color }}
              />

              {/* Name */}
              <span className={`flex-1 truncate ${isActive ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                {layer.name}
              </span>

              {/* Item count */}
              <span className="text-[8px] text-muted-foreground/50">
                {layer.itemIds.length}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    moveLayer(layer.id, 'up');
                  }}
                  className="p-0.5 hover:bg-white/10 rounded"
                >
                  <ChevronUp className="w-2.5 h-2.5" />
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    moveLayer(layer.id, 'down');
                  }}
                  className="p-0.5 hover:bg-white/10 rounded"
                >
                  <ChevronDown className="w-2.5 h-2.5" />
                </button>
                {layers.length > 1 && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      deleteLayer(layer.id);
                    }}
                    className="p-0.5 hover:bg-red-500/20 rounded text-red-400"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[8px] text-muted-foreground/50 leading-relaxed">
        Los objetos se colocan en la capa activa. Las capas ocultas no muestran sus objetos en la mesa.
      </p>
    </div>
  );
}
