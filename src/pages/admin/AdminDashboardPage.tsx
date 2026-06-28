// src/pages/admin/AdminDashboardPage.tsx
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, Plus, FolderPlus, Image as ImageIcon, Youtube, Film,
  Wifi, WifiOff, Menu, X, AlertTriangle, Loader2, CheckCircle2, Save,
} from 'lucide-react';
import { useAdminAuth } from '@/components/admin/AdminAuthContext';
import { useAdminStore } from '@/lib/admin-store';
import SortableCategoryList from '@/components/admin/SortableCategoryList';
import SortableMediaGrid from '@/components/admin/SortableMediaGrid';
import AddEditCategoryModal from '@/components/admin/AddEditCategoryModal';
import AddEditItemModal from '@/components/admin/AddEditItemModal';
import { CategoryDef, PortfolioItem } from '@/lib/portfolio-data';
import { Link } from 'react-router-dom';

type MediaTab = 'images' | 'videos' | 'reels';

export default function AdminDashboardPage() {
  const { logout } = useAdminAuth();

  // ── store ────────────────────────────────────────────────────────────────
  const {
    data, loading, serverAvailable,
    saveStatus, saveAndPublish,
    addCategory, editCategory, deleteCategory, reorderCategories,
    addImage, editImage, deleteImage, reorderImages,
    addVideo, editVideo, deleteVideo, reorderVideos,
    addReel, editReel, deleteReel, reorderReels,
  } = useAdminStore();

  // ── local UI state ───────────────────────────────────────────────────────
  const [activeCategoryId, setActiveCategoryId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<MediaTab>('images');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Category modal
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryDef | null>(null);

  // Item modal
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [defaultItemTab, setDefaultItemTab] = useState<'image' | 'video' | 'reel'>('image');

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'category' | 'item'; id: string; label: string } | null>(null);

  // ── derived values ───────────────────────────────────────────────────────
  const sortedCategories = useMemo(
    () => [...data.categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [data.categories]
  );

  // Default active category once loaded
  const resolvedCategoryId = activeCategoryId || sortedCategories[0]?.id || '';

  const activeCategory = data.categories.find(c => c.id === resolvedCategoryId);

  const catImages = useMemo(
    () => [...data.images.filter(i => i.category === resolvedCategoryId)]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [data.images, resolvedCategoryId]
  );

  const catVideos = useMemo(
    () => [...data.videos.filter(v => v.category === resolvedCategoryId)]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [data.videos, resolvedCategoryId]
  );

  const catReels = useMemo(
    () => [...data.reels.filter(r => r.category === resolvedCategoryId)]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [data.reels, resolvedCategoryId]
  );

  const tabCounts: Record<MediaTab, number> = {
    images: catImages.length,
    videos: catVideos.length,
    reels: catReels.length,
  };

  // ── handlers ─────────────────────────────────────────────────────────────
  const handleSelectCategory = (id: string) => {
    setActiveCategoryId(id);
    setSidebarOpen(false);
  };

  const handleEditCat = (cat: CategoryDef) => {
    setEditingCat(cat);
    setCatModalOpen(true);
  };

  const handleDeleteCatConfirm = (cat: CategoryDef) => {
    setDeleteTarget({ type: 'category', id: cat.id, label: cat.label });
  };

  const handleDeleteItemConfirm = (item: PortfolioItem) => {
    setDeleteTarget({ type: 'item', id: item.id, label: item.title ?? item.id });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'category') {
      deleteCategory(deleteTarget.id);
      if (resolvedCategoryId === deleteTarget.id) setActiveCategoryId('');
    } else {
      // figure out which collection this item belongs to
      const inImages = data.images.some(i => i.id === deleteTarget.id);
      const inVideos = data.videos.some(v => v.id === deleteTarget.id);
      if (inImages) deleteImage(deleteTarget.id);
      else if (inVideos) deleteVideo(deleteTarget.id);
      else deleteReel(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  const handleEditItem = (item: PortfolioItem) => {
    setEditingItem(item);
    setItemModalOpen(true);
  };

  const openAddItem = (tab: MediaTab) => {
    setEditingItem(null);
    setDefaultItemTab(tab === 'images' ? 'image' : tab === 'videos' ? 'video' : 'reel');
    setItemModalOpen(true);
  };

  const mediaTabs: { id: MediaTab; label: string; icon: React.ReactNode }[] = [
    { id: 'images', label: 'Images', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'videos', label: 'Videos', icon: <Youtube className="h-4 w-4" /> },
    { id: 'reels', label: 'Reels', icon: <Film className="h-4 w-4" /> },
  ];

  // ── loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-zinc-400">
          <Loader2 className="h-10 w-10 animate-spin text-yellow-500" />
          <p className="text-sm">Loading portfolio data…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <header className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-3 shrink-0 z-30">
        {/* Mobile sidebar toggle */}
        <button
          className="lg:hidden text-zinc-400 hover:text-white transition-colors"
          onClick={() => setSidebarOpen(v => !v)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Logo + title */}
        <img src="/assets/logo/logo.png" alt="" className="h-7 w-7 object-contain rounded-md shrink-0" />
        <span className="font-bold text-white text-sm hidden sm:block">Admin — Magical Pictures</span>

        {/* Right side controls */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">

          {/* Server badge */}
          <div className={`hidden sm:flex items-center gap-1.5 text-xs rounded-full px-2.5 py-1
            ${serverAvailable ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
            {serverAvailable ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {serverAvailable ? 'Connected' : 'Offline'}
          </div>

          {/* View site */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex text-xs text-zinc-400 hover:text-yellow-400 transition-colors underline underline-offset-2"
          >
            View site
          </a>

          {/* ── Save & Publish button ── */}
          <motion.button
            onClick={() => saveAndPublish(data)}
            disabled={saveStatus === 'saving'}
            whileTap={{ scale: 0.96 }}
            className={`flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 transition-all duration-200 ${
              saveStatus === 'saved'
                ? 'bg-emerald-500 text-white'
                : saveStatus === 'saving'
                ? 'bg-yellow-500/80 text-black cursor-not-allowed'
                : 'bg-yellow-500 hover:bg-yellow-400 text-black'
            }`}
          >
            {saveStatus === 'saving' && (
              <span className="h-3.5 w-3.5 border-2 border-black/40 border-t-black rounded-full animate-spin" />
            )}
            {saveStatus === 'saved' && <CheckCircle2 className="h-3.5 w-3.5" />}
            {saveStatus === 'idle' && <Save className="h-3.5 w-3.5" />}
            {saveStatus === 'saving' ? 'Saving…' : saveStatus === 'saved' ? 'Published!' : 'Save & Publish'}
          </motion.button>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg px-3 py-1.5 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* ── Sidebar backdrop (mobile) ────────────────────────────────────── */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="fixed inset-0 bg-black/60 z-20 lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* ── Sidebar ──────────────────────────────────────────────────────── */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 top-14 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col z-20
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          {/* Sidebar header */}
          <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Categories</span>
            <button
              onClick={() => { setEditingCat(null); setCatModalOpen(true); }}
              className="flex items-center gap-1 text-xs bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded-md px-2 py-1 transition-colors"
              title="Add category"
            >
              <FolderPlus className="h-3.5 w-3.5" /> New
            </button>
          </div>

          {/* Category list */}
          <div className="flex-1 overflow-y-auto px-2 py-2">
            <SortableCategoryList
              categories={sortedCategories}
              activeId={resolvedCategoryId}
              onSelect={handleSelectCategory}
              onReorder={reorderCategories}
              onEdit={handleEditCat}
              onDelete={handleDeleteCatConfirm}
            />
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto min-w-0">
          {/* Category header */}
          <div className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800 px-4 sm:px-6 py-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-bold text-white text-lg leading-tight">
                  {activeCategory?.label ?? 'Select a category'}
                </h1>
                {activeCategory?.description && (
                  <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{activeCategory.description}</p>
                )}
              </div>

              {/* Quick edit category */}
              {activeCategory && (
                <button
                  onClick={() => handleEditCat(activeCategory)}
                  className="shrink-0 flex items-center gap-1.5 text-xs border border-zinc-700 hover:border-yellow-500/50 hover:text-yellow-400 text-zinc-400 rounded-lg px-3 py-1.5 transition-colors"
                >
                  Edit about section
                </button>
              )}
            </div>

            {/* Media tabs */}
            <div className="flex gap-1 mt-3 bg-zinc-900 rounded-lg p-1 w-fit">
              {mediaTabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors
                    ${activeTab === t.id ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  {t.icon} {t.label}
                  <span className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold
                    ${activeTab === t.id ? 'bg-black/20 text-black' : 'bg-zinc-700 text-zinc-300'}`}>
                    {tabCounts[t.id]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="px-4 sm:px-6 py-5">
            {/* Add button */}
            {activeCategory && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => openAddItem(activeTab)}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm rounded-xl px-4 py-2 transition-colors shadow-lg shadow-yellow-500/10"
                >
                  <Plus className="h-4 w-4" />
                  Add {activeTab === 'images' ? 'Image' : activeTab === 'videos' ? 'Video' : 'Reel'}
                </button>
              </div>
            )}

            {/* Grids */}
            <AnimatePresence mode="wait">
              {activeTab === 'images' && (
                <motion.div key="images" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <SortableMediaGrid
                    items={catImages}
                    onReorder={items => reorderImages(resolvedCategoryId, items)}
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItemConfirm}
                  />
                </motion.div>
              )}
              {activeTab === 'videos' && (
                <motion.div key="videos" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <SortableMediaGrid
                    items={catVideos}
                    onReorder={items => reorderVideos(resolvedCategoryId, items)}
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItemConfirm}
                  />
                </motion.div>
              )}
              {activeTab === 'reels' && (
                <motion.div key="reels" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <SortableMediaGrid
                    items={catReels}
                    onReorder={items => reorderReels(resolvedCategoryId, items)}
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItemConfirm}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* ── Category modal ─────────────────────────────────────────────────── */}
      <AddEditCategoryModal
        open={catModalOpen}
        category={editingCat}
        onClose={() => { setCatModalOpen(false); setEditingCat(null); }}
        onSave={(label, description) => {
          if (editingCat) {
            editCategory(editingCat.id, label, description);
          } else {
            const id = addCategory(label, description);
            setActiveCategoryId(id);
          }
        }}
      />

      {/* ── Item modal ─────────────────────────────────────────────────────── */}
      <AddEditItemModal
        open={itemModalOpen}
        item={editingItem}
        defaultTab={defaultItemTab}
        defaultCategory={resolvedCategoryId}
        categories={sortedCategories}
        onClose={() => { setItemModalOpen(false); setEditingItem(null); }}
        onSaveImage={item => addImage(item)}
        onSaveVideo={item => addVideo(item)}
        onSaveReel={item => addReel(item)}
        onEditImage={(id, updates) => editImage(id, updates)}
        onEditVideo={(id, updates) => editVideo(id, updates)}
        onEditReel={(id, updates) => editReel(id, updates)}
      />

      {/* ── Delete confirmation ────────────────────────────────────────────── */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
              initial={{ y: 16, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 16, scale: 0.97 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Confirm Delete</h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    Delete <span className="text-white font-medium">"{deleteTarget.label}"</span>?
                    {deleteTarget.type === 'category' && (
                      <> This will also remove all media in this category.</>
                    )}
                    {' '}This cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2.5 rounded-lg border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
