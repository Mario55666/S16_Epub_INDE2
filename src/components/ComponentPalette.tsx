import { useState } from 'react';
import { getComponentsByCategory, type ComponentCategory } from '@/data/components';
import { 
  Type, Mail, CheckSquare, CircleDot, List, Text, MousePointerClick,
  Video, Headphones, FolderKanban, Rows3, Info, SquareStack, 
  Images, BarChart3, PanelTop, ArrowDownFromLine,
  ChevronDown, GripVertical
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Type: <Type className="w-4 h-4" />,
  Mail: <Mail className="w-4 h-4" />,
  CheckSquare: <CheckSquare className="w-4 h-4" />,
  CircleDot: <CircleDot className="w-4 h-4" />,
  List: <List className="w-4 h-4" />,
  Text: <Text className="w-4 h-4" />,
  MousePointerClick: <MousePointerClick className="w-4 h-4" />,
  Video: <Video className="w-4 h-4" />,
  Headphones: <Headphones className="w-4 h-4" />,
  FolderKanban: <FolderKanban className="w-4 h-4" />,
  Rows3: <Rows3 className="w-4 h-4" />,
  Info: <Info className="w-4 h-4" />,
  SquareStack: <SquareStack className="w-4 h-4" />,
  Images: <Images className="w-4 h-4" />,
  BarChart3: <BarChart3 className="w-4 h-4" />,
  PanelTop: <PanelTop className="w-4 h-4" />,
  ArrowDownFromLine: <ArrowDownFromLine className="w-4 h-4" />,
};

interface ComponentPaletteProps {
  categories: { id: ComponentCategory; label: string }[];
  onDragStart: (componentId: string) => void;
}

export function ComponentPalette({ categories, onDragStart }: ComponentPaletteProps) {
  const [expandedCategories, setExpandedCategories] = useState<ComponentCategory[]>(
    categories.map(c => c.id)
  );

  const toggleCategory = (catId: ComponentCategory) => {
    setExpandedCategories(prev =>
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  return (
    <div className="p-3">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
        Componentes Interactivos
      </h3>
      <p className="text-[10px] text-muted-foreground mb-4 px-1 leading-relaxed">
        Arrastra los componentes a la mesa de trabajo
      </p>

      {categories.map(cat => {
        const catComponents = getComponentsByCategory(cat.id);
        const isExpanded = expandedCategories.includes(cat.id);

        return (
          <div key={cat.id} className="mb-2">
            <button
              onClick={() => toggleCategory(cat.id)}
              className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{cat.label}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${isExpanded ? '' : '-rotate-90'}`}
              />
            </button>

            {isExpanded && (
              <div className="space-y-1 mt-1">
                {catComponents.map(comp => (
                  <div
                    key={comp.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('componentId', comp.id);
                      e.dataTransfer.effectAllowed = 'copy';
                      onDragStart(comp.id);
                    }}
                    className="component-pill"
                    title={comp.description}
                  >
                    <GripVertical className="w-3 h-3 text-muted-foreground/50 flex-shrink-0" />
                    {iconMap[comp.icon] || <span className="w-4 h-4" />}
                    <span className="truncate">{comp.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
