// src/components/admin/SortableMediaGrid.tsx
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
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2, Play } from 'lucide-react';
import { PortfolioItem, getThumbnail } from '@/lib/portfolio-data';
import { useState } from 'react';

// ── card ───────────────────────────────────────────────────────────────────────
function MediaCard({
  item,
  onEdit,
  onDelete,
}: {
  item: PortfolioItem;
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
  } = useSortable({ id: item.id });

  const [thumbSrc, setThumbSrc] = useState(getThumbnail(item));
  const isVideo = item.mediaType === 'youtube' || item.mediaType === 'youtube-short' || item.mediaType === 'instagram-reel';
  const isReel = item.mediaType === 'youtube-short' || item.mediaType === 'instagram-reel';

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : 1,
    zIndex: isDragging ? 999 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden
        ${isReel ? 'aspect-[9/16]' : 'aspect-[4/3]'}`}
    >
      {/* Thumbnail */}
      <img
        src={thumbSrc}
        alt={item.title ?? ''}
        className="w-full h-full object-cover"
        onError={() => setThumbSrc('/assets/hero-poster.jpg')}
      />

      {/* Video overlay icon */}
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-9 h-9 rounded-full bg-black/60 flex items-center justify-center">
            <Play className="h-4 w-4 text-white ml-0.5" />
          </div>
        </div>
      )}

      {/* Hover overlay with controls */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col">
        {/* Drag handle — top bar */}
        <div
          className="flex items-center justify-center py-2 cursor-grab active:cursor-grabbing touch-none"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5 text-zinc-400" />
        </div>

        {/* Action buttons at bottom */}
        <div className="mt-auto p-2 flex gap-2">
          <button
            onClick={e => { e.stopPropagation(); onEdit(); }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg py-1.5 text-xs font-medium transition-colors"
          >
            <Pencil className="h-3 w-3" /> Edit
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete(); }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-red-600/80 hover:bg-red-500 text-white rounded-lg py-1.5 text-xs font-medium transition-colors"
          >
            <Trash2 className="h-3 w-3" /> Delete
          </button>
        </div>
      </div>

      {/* Title chip */}
      {item.title && (
        <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-gradient-to-t from-black/90 to-transparent group-hover:opacity-0 transition-opacity">
          <p className="text-white text-xs leading-tight line-clamp-2">{item.title}</p>
        </div>
      )}
    </div>
  );
}

// ── grid ──────────────────────────────────────────────────────────────────────
interface Props {
  items: PortfolioItem[];
  onReorder: (ordered: PortfolioItem[]) => void;
  onEdit: (item: PortfolioItem) => void;
  onDelete: (item: PortfolioItem) => void;
}

export default function SortableMediaGrid({ items, onReorder, onEdit, onDelete }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex(i => i.id === active.id);
    const newIndex = items.findIndex(i => i.id === over.id);
    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-zinc-600 gap-3">
        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">
          <Play className="h-6 w-6" />
        </div>
        <p className="text-sm">No items yet — add some above</p>
      </div>
    );
  }

  const hasReels = items.some(i => i.mediaType === 'youtube-short' || i.mediaType === 'instagram-reel');

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(i => i.id)} strategy={rectSortingStrategy}>
        <div className={`grid gap-3 ${hasReels ? 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
          {items.map(item => (
            <MediaCard
              key={item.id}
              item={item}
              onEdit={() => onEdit(item)}
              onDelete={() => onDelete(item)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
