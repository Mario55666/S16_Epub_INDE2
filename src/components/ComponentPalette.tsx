import { useState } from 'react';
import { getComponentsByCategory, type ComponentCategory } from '@/data/components';
import {
  Type, Mail, CheckSquare, CircleDot, List, Text, MousePointerClick,
  Video, Headphones, FolderKanban, Rows3, Info, SquareStack,
  Images, BarChart3, PanelTop, ArrowDownFromLine,
  ChevronDown, GripVertical
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Type: <Type className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  CheckSquare: <CheckSquare className="w-5 h-5" />,
  CircleDot: <CircleDot className="w-5 h-5" />,
  List: <List className="w-5 h-5" />,
  Text: <Text className="w-5 h-5" />,
  MousePointerClick: <MousePointerClick className="w-5 h-5" />,
  Video: <Video className="w-5 h-5" />,
  Headphones: <Headphones className="w-5 h-5" />,
  FolderKanban: <FolderKanban className="w-5 h-5" />,
  Rows3: <Rows3 className="w-5 h-5" />,
  Info: <Info className="w-5 h-5" />,
  SquareStack: <SquareStack className="w-5 h-5" />,
  Images: <Images className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  PanelTop: <PanelTop className="w-5 h-5" />,
  ArrowDownFromLine: <ArrowDownFromLine className="w-5 h-5" />,
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
    <div className="px-4 pb-4">
      {categories.map(cat => {
        const catComponents = getComponentsByCategory(cat.id);
        const isExpanded = expandedCategories.includes(cat.id);

        return (
          <div key={cat.id} className="mb-3">
            <button
              onClick={() => toggleCategory(cat.id)}
              className="w-full flex items-center justify-between px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{cat.label}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isExpanded ? '' : '-rotate-90'}`}
              />
            </button>

            {isExpanded && (
              <div className="space-y-1.5 mt-1">
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
                    <GripVertical className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                    {iconMap[comp.icon] || <span className="w-5 h-5" />}
                    <span className="truncate text-sm">{comp.name}</span>
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
