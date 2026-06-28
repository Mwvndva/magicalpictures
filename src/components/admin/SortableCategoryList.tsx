// src/components/admin/SortableCategoryList.tsx
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2, FolderOpen } from 'lucide-react';
import { CategoryDef } from '@/lib/portfolio-data';

// ── individual row ─────────────────────────────────────────────────────────────
function CategoryRow({
  cat,
  isActive,
  onSelect,
  onEdit,
  onDelete,
}: {
  cat: CategoryDef;
  isActive: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: cat.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors
        ${isActive ? 'bg-yellow-500/15 border border-yellow-500/30' : 'hover:bg-zinc-800 border border-transparent'}`}
    >
      {/* Drag handle */}
      <button
        className="touch-none shrink-0 text-zinc-600 hover:text-zinc-300 cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
        tabIndex={-1}
        aria-label="Drag to reorder"
        title="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      {/* Label */}
      <button
        className="flex-1 text-left text-sm font-medium truncate"
        onClick={onSelect}
        style={{ color: isActive ? '#eab308' : '#d4d4d8' }}
      >
        {cat.label}
      </button>

      {/* Actions — show on hover */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          onClick={e => { e.stopPropagation(); onEdit(); }}
          className="p-1 rounded hover:text-yellow-400 text-zinc-500 transition-colors"
          title="Edit category"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={e => { e.stopPropagation(); onDelete(); }}
          className="p-1 rounded hover:text-red-400 text-zinc-500 transition-colors"
          title="Delete category"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── list ──────────────────────────────────────────────────────────────────────
interface Props {
  categories: CategoryDef[];
  activeId: string;
  onSelect: (id: string) => void;
  onReorder: (ordered: CategoryDef[]) => void;
  onEdit: (cat: CategoryDef) => void;
  onDelete: (cat: CategoryDef) => void;
}

export default function SortableCategoryList({
  categories, activeId, onSelect, onReorder, onEdit, onDelete,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = categories.findIndex(c => c.id === active.id);
    const newIndex = categories.findIndex(c => c.id === over.id);
    onReorder(arrayMove(categories, oldIndex, newIndex));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={categories.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-1">
          {categories.map(cat => (
            <CategoryRow
              key={cat.id}
              cat={cat}
              isActive={activeId === cat.id}
              onSelect={() => onSelect(cat.id)}
              onEdit={() => onEdit(cat)}
              onDelete={() => onDelete(cat)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
