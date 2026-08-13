import { useState, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Plus, GripVertical, X, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const SUGGESTIONS = ['garlic', 'cheese', 'lime', 'ginger', 'coconut milk', 'basil'];

function SortableChip({ item, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      className={`inline-flex items-center gap-1 rounded-full border border-sage-200/80 bg-white pl-1 pr-1 shadow-sm dark:border-sage-800 dark:bg-stone-900 ${
        isDragging ? 'z-10 opacity-90 ring-2 ring-sage-300 dark:ring-sage-600' : ''
      }`}
    >
      <button
        type="button"
        className="touch-none rounded-full p-1 text-stone-400 hover:bg-cream-100 hover:text-stone-600 dark:hover:bg-stone-800 dark:hover:text-stone-300"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      <span className="max-w-[140px] truncate px-1 text-sm font-medium text-stone-700 dark:text-stone-200">
        {item.value}
      </span>
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="rounded-full p-1 text-stone-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
        aria-label={`Remove ${item.value}`}
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

/**
 * Chips + comma input; drag-and-drop reorder; AI-style suggestion chips.
 */
export function IngredientInput({ items, onItemsChange }) {
  const [draft, setDraft] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addFromDraft = useCallback(() => {
    const parts = draft
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length === 0) return;
    const next = [
      ...items,
      ...parts.map((value) => ({ id: crypto.randomUUID(), value })),
    ];
    onItemsChange(next);
    setDraft('');
  }, [draft, items, onItemsChange]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFromDraft();
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    onItemsChange(arrayMove(items, oldIndex, newIndex));
  };

  const remove = (id) => {
    onItemsChange(items.filter((i) => i.id !== id));
  };

  const addSuggestion = (label) => {
    if (items.some((i) => i.value.toLowerCase() === label.toLowerCase())) {
      toast.message('Already in your list');
      return;
    }
    onItemsChange([...items, { id: crypto.randomUUID(), value: label }]);
    toast.success(`Added ${label}`);
  };

  const micClick = () => {
    toast.message('Voice input is coming soon — type or tap suggestions for now.');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="relative flex-1">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. chicken, rice, tomato"
            className="h-12 w-full rounded-2xl border border-cream-300 bg-white px-4 pr-24 text-stone-800 shadow-soft outline-none transition-shadow placeholder:text-stone-400 focus:border-sage-300 focus:ring-2 focus:ring-sage-200 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-sage-600 dark:focus:ring-sage-900"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
            <button
              type="button"
              onClick={micClick}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-stone-400 transition-colors hover:bg-cream-100 hover:text-sage-600 dark:hover:bg-stone-800 dark:hover:text-sage-400"
              aria-label="Voice input (soon)"
            >
              <Mic className="h-4 w-4" />
            </button>
          </div>
        </div>
        <motion.button
          type="button"
          onClick={addFromDraft}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-sage-500 px-6 font-semibold text-white shadow-soft transition-colors hover:bg-sage-600 dark:bg-sage-600 dark:hover:bg-sage-500"
        >
          <Plus className="h-5 w-5" />
          Add Ingredient
        </motion.button>
      </div>

      {items.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
            <div className="flex min-h-[44px] flex-wrap gap-2 rounded-2xl border border-dashed border-cream-300 bg-cream-50/50 p-3 dark:border-stone-700 dark:bg-stone-900/40">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <SortableChip key={item.id} item={item} onRemove={remove} />
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        </DndContext>
      )}

      <div>
        <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
          <Sparkles className="h-3.5 w-3.5 text-sage-500" />
          Suggestions
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addSuggestion(s)}
              className="rounded-full border border-cream-200 bg-white px-3 py-1.5 text-sm text-stone-600 shadow-sm transition-all hover:border-sage-300 hover:bg-sage-50 hover:text-sage-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-sage-700 dark:hover:bg-sage-950/50"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
