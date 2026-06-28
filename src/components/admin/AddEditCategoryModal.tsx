// src/components/admin/AddEditCategoryModal.tsx
import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CategoryDef } from '@/lib/portfolio-data';

interface Props {
  open: boolean;
  category: CategoryDef | null; // null = add mode
  onClose: () => void;
  onSave: (label: string, description: string) => void;
}

export default function AddEditCategoryModal({ open, category, onClose, onSave }: Props) {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (open) {
      setLabel(category?.label ?? '');
      setDescription(category?.description ?? '');
    }
  }, [open, category]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;
    onSave(label.trim(), description.trim());
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md shadow-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <h2 className="font-bold text-white text-lg">
                {category ? 'Edit Category' : 'Add Category'}
              </h2>
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Category Name <span className="text-red-400">*</span>
                </label>
                <input
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                  required
                  placeholder="e.g. Fashion"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600
                    focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 transition-colors"
                />
              </div>

              {/* About / Description */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                  About (shown on portfolio page)
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe this category…"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600
                    focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 transition-colors resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-lg border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm transition-colors"
                >
                  {category ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
