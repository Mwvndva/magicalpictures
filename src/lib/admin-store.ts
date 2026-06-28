// src/lib/admin-store.ts
// Centralised hook that owns live portfolio state for the admin panel.
// Reads from the Express API; falls back to static defaults on error.

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  PortfolioItem,
  CategoryDef,
  DEFAULT_PORTFOLIO_CATEGORIES,
  DEFAULT_PORTFOLIO_VIDEOS,
  DEFAULT_PORTFOLIO_IMAGES,
  DEFAULT_PORTFOLIO_REELS,
} from './portfolio-data';
import { apiGetPortfolio, apiSavePortfolio, apiDeleteFile } from './api';

export interface AdminPortfolioData {
  categories: CategoryDef[];
  videos: PortfolioItem[];
  images: PortfolioItem[];
  reels: PortfolioItem[];
}

const DEFAULT_DATA: AdminPortfolioData = {
  categories: DEFAULT_PORTFOLIO_CATEGORIES,
  videos: DEFAULT_PORTFOLIO_VIDEOS,
  images: DEFAULT_PORTFOLIO_IMAGES,
  reels: DEFAULT_PORTFOLIO_REELS,
};

// ─── helpers ──────────────────────────────────────────────────────────────────
function reindex<T extends { order?: number }>(arr: T[]): T[] {
  return arr.map((item, i) => ({ ...item, order: i }));
}

function genId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

// ─── hook ─────────────────────────────────────────────────────────────────────
export function useAdminStore() {
  const [data, setData] = useState<AdminPortfolioData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [serverAvailable, setServerAvailable] = useState(true);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── load on mount ────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetPortfolio();
        if (res.data) {
          // Merge: ensure all default categories still exist (new defaults get appended)
          const saved: AdminPortfolioData = res.data;
          setData(saved);
          setServerAvailable(true);
        } else {
          // First run — seed the server with defaults
          await apiSavePortfolio(DEFAULT_DATA);
          setServerAvailable(true);
        }
      } catch {
        setServerAvailable(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── debounced auto-save ──────────────────────────────────────────────────
  const persist = useCallback((next: AdminPortfolioData) => {
    setData(next);
    if (!serverAvailable) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      apiSavePortfolio(next).catch(console.error);
    }, 600);
  }, [serverAvailable]);

  // ── category ops ─────────────────────────────────────────────────────────
  const addCategory = useCallback((label: string, description: string) => {
    const id = label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setData(prev => {
      const next: AdminPortfolioData = {
        ...prev,
        categories: reindex([...prev.categories, { id, label, description, order: prev.categories.length }]),
      };
      persist(next);
      return next;
    });
    return id;
  }, [persist]);

  const editCategory = useCallback((id: string, label: string, description: string) => {
    setData(prev => {
      const next: AdminPortfolioData = {
        ...prev,
        categories: prev.categories.map(c => c.id === id ? { ...c, label, description } : c),
      };
      persist(next);
      return next;
    });
  }, [persist]);

  const deleteCategory = useCallback((id: string) => {
    setData(prev => {
      const next: AdminPortfolioData = {
        ...prev,
        categories: reindex(prev.categories.filter(c => c.id !== id)),
        videos: prev.videos.filter(v => v.category !== id),
        images: prev.images.filter(i => i.category !== id),
        reels: prev.reels.filter(r => r.category !== id),
      };
      persist(next);
      return next;
    });
  }, [persist]);

  const reorderCategories = useCallback((ordered: CategoryDef[]) => {
    setData(prev => {
      const next: AdminPortfolioData = { ...prev, categories: reindex(ordered) };
      persist(next);
      return next;
    });
  }, [persist]);

  // ── image ops ────────────────────────────────────────────────────────────
  const addImage = useCallback((item: Omit<PortfolioItem, 'id' | 'order'>) => {
    const newItem: PortfolioItem = { ...item, id: genId('img'), mediaType: 'image', order: 0 };
    setData(prev => {
      const catImages = prev.images.filter(i => i.category === item.category);
      newItem.order = catImages.length;
      const next: AdminPortfolioData = { ...prev, images: [...prev.images, newItem] };
      persist(next);
      return next;
    });
  }, [persist]);

  const editImage = useCallback((id: string, updates: Partial<PortfolioItem>) => {
    setData(prev => {
      const next: AdminPortfolioData = {
        ...prev,
        images: prev.images.map(i => i.id === id ? { ...i, ...updates } : i),
      };
      persist(next);
      return next;
    });
  }, [persist]);

  const deleteImage = useCallback(async (id: string) => {
    setData(prev => {
      const target = prev.images.find(i => i.id === id);
      if (target?.imagePath) {
        apiDeleteFile(target.imagePath).catch(console.error);
      }
      const next: AdminPortfolioData = { ...prev, images: prev.images.filter(i => i.id !== id) };
      persist(next);
      return next;
    });
  }, [persist]);

  const reorderImages = useCallback((categoryId: string, ordered: PortfolioItem[]) => {
    setData(prev => {
      const others = prev.images.filter(i => i.category !== categoryId);
      const next: AdminPortfolioData = { ...prev, images: [...others, ...reindex(ordered)] };
      persist(next);
      return next;
    });
  }, [persist]);

  // ── video ops ────────────────────────────────────────────────────────────
  const addVideo = useCallback((item: Omit<PortfolioItem, 'id' | 'order'>) => {
    const newItem: PortfolioItem = { ...item, id: genId('vid'), mediaType: 'youtube', order: 0 };
    setData(prev => {
      const catVids = prev.videos.filter(v => v.category === item.category);
      newItem.order = catVids.length;
      const next: AdminPortfolioData = { ...prev, videos: [...prev.videos, newItem] };
      persist(next);
      return next;
    });
  }, [persist]);

  const editVideo = useCallback((id: string, updates: Partial<PortfolioItem>) => {
    setData(prev => {
      const next: AdminPortfolioData = {
        ...prev,
        videos: prev.videos.map(v => v.id === id ? { ...v, ...updates } : v),
      };
      persist(next);
      return next;
    });
  }, [persist]);

  const deleteVideo = useCallback((id: string) => {
    setData(prev => {
      const next: AdminPortfolioData = { ...prev, videos: prev.videos.filter(v => v.id !== id) };
      persist(next);
      return next;
    });
  }, [persist]);

  const reorderVideos = useCallback((categoryId: string, ordered: PortfolioItem[]) => {
    setData(prev => {
      const others = prev.videos.filter(v => v.category !== categoryId);
      const next: AdminPortfolioData = { ...prev, videos: [...others, ...reindex(ordered)] };
      persist(next);
      return next;
    });
  }, [persist]);

  // ── reel ops ─────────────────────────────────────────────────────────────
  const addReel = useCallback((item: Omit<PortfolioItem, 'id' | 'order'>) => {
    const newItem: PortfolioItem = { ...item, id: genId('reel'), order: 0 };
    setData(prev => {
      const catReels = prev.reels.filter(r => r.category === item.category);
      newItem.order = catReels.length;
      const next: AdminPortfolioData = { ...prev, reels: [...prev.reels, newItem] };
      persist(next);
      return next;
    });
  }, [persist]);

  const editReel = useCallback((id: string, updates: Partial<PortfolioItem>) => {
    setData(prev => {
      const next: AdminPortfolioData = {
        ...prev,
        reels: prev.reels.map(r => r.id === id ? { ...r, ...updates } : r),
      };
      persist(next);
      return next;
    });
  }, [persist]);

  const deleteReel = useCallback((id: string) => {
    setData(prev => {
      const next: AdminPortfolioData = { ...prev, reels: prev.reels.filter(r => r.id !== id) };
      persist(next);
      return next;
    });
  }, [persist]);

  const reorderReels = useCallback((categoryId: string, ordered: PortfolioItem[]) => {
    setData(prev => {
      const others = prev.reels.filter(r => r.category !== categoryId);
      const next: AdminPortfolioData = { ...prev, reels: [...others, ...reindex(ordered)] };
      persist(next);
      return next;
    });
  }, [persist]);

  return {
    data,
    loading,
    serverAvailable,
    // categories
    addCategory,
    editCategory,
    deleteCategory,
    reorderCategories,
    // images
    addImage,
    editImage,
    deleteImage,
    reorderImages,
    // videos
    addVideo,
    editVideo,
    deleteVideo,
    reorderVideos,
    // reels
    addReel,
    editReel,
    deleteReel,
    reorderReels,
  };
}
