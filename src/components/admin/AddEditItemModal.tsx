// src/components/admin/AddEditItemModal.tsx
import { useState, FormEvent, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image as ImageIcon, Youtube, Film } from 'lucide-react';
import { PortfolioItem, CategoryDef } from '@/lib/portfolio-data';
import { apiUploadImage } from '@/lib/api';

type MediaTab = 'image' | 'video' | 'reel';

interface Props {
  open: boolean;
  item: PortfolioItem | null; // null = add mode
  defaultTab?: MediaTab;
  defaultCategory?: string;
  categories: CategoryDef[];
  onClose: () => void;
  onSaveImage: (item: Omit<PortfolioItem, 'id' | 'order'>) => void;
  onSaveVideo: (item: Omit<PortfolioItem, 'id' | 'order'>) => void;
  onSaveReel: (item: Omit<PortfolioItem, 'id' | 'order'>) => void;
  onEditImage?: (id: string, updates: Partial<PortfolioItem>) => void;
  onEditVideo?: (id: string, updates: Partial<PortfolioItem>) => void;
  onEditReel?: (id: string, updates: Partial<PortfolioItem>) => void;
}

export default function AddEditItemModal({
  open, item, defaultTab, defaultCategory, categories,
  onClose, onSaveImage, onSaveVideo, onSaveReel,
  onEditImage, onEditVideo, onEditReel,
}: Props) {
  const isEdit = item !== null;

  const resolveTab = (): MediaTab => {
    if (item) {
      if (item.mediaType === 'image') return 'image';
      if (item.mediaType === 'youtube') return 'video';
      return 'reel';
    }
    return defaultTab ?? 'image';
  };

  const [tab, setTab] = useState<MediaTab>(resolveTab());
  const [category, setCategory] = useState(defaultCategory ?? categories[0]?.id ?? '');
  const [title, setTitle] = useState('');
  const [youtubeId, setYoutubeId] = useState('');
  const [client, setClient] = useState('');
  const [year, setYear] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = resolveTab();
    setTab(t);
    setCategory(item?.category ?? defaultCategory ?? categories[0]?.id ?? '');
    setTitle(item?.title ?? '');
    setYoutubeId(item?.youtubeId ?? '');
    setClient(item?.client ?? '');
    setYear(item?.year ?? '');
    setImageFile(null);
    setImagePreview(item?.imagePath ?? '');
    setUploadError('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, item]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    const url = URL.createObjectURL(f);
    setImagePreview(url);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploadError('');

    if (tab === 'image') {
      let finalPath = item?.imagePath ?? '';

      if (imageFile) {
        setUploading(true);
        try {
          const res = await apiUploadImage(imageFile, category);
          if (!res.success || !res.path) {
            setUploadError(res.message ?? 'Upload failed');
            setUploading(false);
            return;
          }
          finalPath = res.path;
        } catch {
          // Fallback: if server not available, show error
          setUploadError('Server unavailable — please start the API server.');
          setUploading(false);
          return;
        }
        setUploading(false);
      }

      if (!finalPath) { setUploadError('Please select an image'); return; }

      if (isEdit && item && onEditImage) {
        onEditImage(item.id, { title: title || undefined, category, imagePath: finalPath, client: client || undefined, year: year || undefined });
      } else {
        onSaveImage({ category, mediaType: 'image', imagePath: finalPath, title: title || undefined, client: client || undefined, year: year || undefined });
      }
      onClose();
    }

    if (tab === 'video') {
      if (!youtubeId.trim()) return;
      const id = extractYoutubeId(youtubeId.trim());
      if (isEdit && item && onEditVideo) {
        onEditVideo(item.id, { title: title || undefined, category, youtubeId: id, client: client || undefined, year: year || undefined });
      } else {
        onSaveVideo({ category, mediaType: 'youtube', youtubeId: id, title: title || undefined, client: client || undefined, year: year || undefined });
      }
      onClose();
    }

    if (tab === 'reel') {
      if (!youtubeId.trim()) return;
      const id = extractYoutubeId(youtubeId.trim());
      if (isEdit && item && onEditReel) {
        onEditReel(item.id, { title: title || undefined, category, youtubeId: id, client: client || undefined, year: year || undefined });
      } else {
        onSaveReel({ category, mediaType: 'youtube-short', youtubeId: id, title: title || undefined, client: client || undefined, year: year || undefined });
      }
      onClose();
    }
  };

  const tabs: { id: MediaTab; label: string; icon: React.ReactNode }[] = [
    { id: 'image', label: 'Image', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'video', label: 'Video', icon: <Youtube className="h-4 w-4" /> },
    { id: 'reel', label: 'Reel', icon: <Film className="h-4 w-4" /> },
  ];

  const thumbUrl = youtubeId
    ? `https://img.youtube.com/vi/${extractYoutubeId(youtubeId)}/hqdefault.jpg`
    : '';

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
            className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90dvh] overflow-y-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 sticky top-0 bg-zinc-900 z-10">
              <h2 className="font-bold text-white text-lg">
                {isEdit ? 'Edit Item' : 'Add Media'}
              </h2>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Media type tabs (only in add mode) */}
              {!isEdit && (
                <div className="flex bg-zinc-800 rounded-lg p-1 gap-1">
                  {tabs.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTab(t.id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-medium transition-colors
                        ${tab === t.id ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                      {t.icon} {t.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white
                    focus:outline-none focus:border-yellow-500 transition-colors"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Title (optional)
                </label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Descriptive title…"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600
                    focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 transition-colors"
                />
              </div>

              {/* Media-specific inputs */}
              {tab === 'image' && (
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                    Image File {!isEdit && <span className="text-red-400">*</span>}
                  </label>
                  <div
                    className="relative border-2 border-dashed border-zinc-700 rounded-xl overflow-hidden cursor-pointer hover:border-yellow-500/60 transition-colors"
                    onClick={() => fileRef.current?.click()}
                    style={{ minHeight: imagePreview ? 'auto' : 140 }}
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="preview" className="w-full max-h-56 object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 py-10 text-zinc-500">
                        <Upload className="h-8 w-8" />
                        <span className="text-sm">Click to upload image</span>
                        <span className="text-xs">JPG, PNG, WEBP — max 50 MB</span>
                      </div>
                    )}
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="mt-2 text-xs text-yellow-500 hover:text-yellow-400"
                    >
                      Change image
                    </button>
                  )}
                </div>
              )}

              {(tab === 'video' || tab === 'reel') && (
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                    YouTube {tab === 'reel' ? 'Short' : 'Video'} ID or URL <span className="text-red-400">*</span>
                  </label>
                  <input
                    value={youtubeId}
                    onChange={e => setYoutubeId(e.target.value)}
                    required
                    placeholder={tab === 'reel' ? 'e.g. WkpXNQzYXIw' : 'e.g. p1eZu4qwauQ'}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600
                      focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 transition-colors"
                  />
                  {/* Thumbnail preview */}
                  {youtubeId && thumbUrl && (
                    <div className="mt-3 rounded-lg overflow-hidden border border-zinc-700">
                      <img
                        src={thumbUrl}
                        alt="YouTube thumbnail"
                        className="w-full object-cover max-h-36"
                        onError={e => (e.currentTarget.style.display = 'none')}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Client + Year (optional) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                    Client (optional)
                  </label>
                  <input
                    value={client}
                    onChange={e => setClient(e.target.value)}
                    placeholder="Client name"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600
                      focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                    Year (optional)
                  </label>
                  <input
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    placeholder="2024"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600
                      focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 transition-colors"
                  />
                </div>
              </div>

              {/* Upload error */}
              {uploadError && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {uploadError}
                </p>
              )}

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
                  disabled={uploading}
                  className="flex-1 py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {uploading && <span className="h-4 w-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />}
                  {uploading ? 'Uploading…' : isEdit ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function extractYoutubeId(input: string): string {
  // handles full URLs like https://www.youtube.com/watch?v=ABC or https://youtu.be/ABC
  const match = input.match(/(?:v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : input;
}
