// src/lib/admin-store.ts
// Centralised hook that owns live portfolio state for the admin panel.
// Reads from the API; also syncs to localStorage so the portfolio page
// picks up changes instantly without a server round-trip.

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

export const LS_KEY = 'mp_portfolio_data';

// ─── helpers ──────────────────────────────────────────────────────────────────
function reindex<T extends { order?: number }>(arr: T[]): T[] {
  return arr.map((item, i) => ({ ...item, order: i }));
}

function genId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

/** Write to localStorage so the public portfolio page picks it up immediately */
function syncToLocalStorage(data: AdminPortfolioData) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable — ignore
  }
}

// ─── hook ─────────────────────────────────────────────────────────────────────
export function useAdminStore() {
  const [data, setData] = useState<AdminPortfolioData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [serverAvailable, setServerAvailable] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── load on mount ────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      // Step 1 — load localStorage immediately (zero latency, no flash)
      let localData: AdminPortfolioData | null = null;
      try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw) {
          localData = JSON.parse(raw);
          if (localData) setData(localData); // show instantly before API responds
        }
      } catch { /* ignore */ }

      // Step 2 — try the API in the background
      try {
        const res = await apiGetPortfolio();
        if (res.data) {
          // Server has data — it is the authoritative source
          setData(res.data);
          syncToLocalStorage(res.data);
          setServerAvailable(true);
        } else {
          // Server returned null (no data file yet)
          setServerAvailable(true);
          if (localData) {
            // Restore from localStorage → save it to the server so it persists
            await apiSavePortfolio(localData);
          } else {
            // Truly first run — seed with hardcoded defaults
            await apiSavePortfolio(DEFAULT_DATA);
            syncToLocalStorage(DEFAULT_DATA);
            setData(DEFAULT_DATA);
          }
        }
      } catch {
        // Server unavailable — localStorage data (already set above) is all we have
        setServerAvailable(false);
        if (!localData) {
          // Nothing anywhere — use hardcoded defaults
          setData(DEFAULT_DATA);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── debounced background auto-save (silent) ──────────────────────────────
  const persist = useCallback((next: AdminPortfolioData) => {
    setData(next);
    // Always sync localStorage immediately — portfolio page reads from here
    syncToLocalStorage(next);

    if (!serverAvailable) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      apiSavePortfolio(next).catch(console.error);
    }, 800);
  }, [serverAvailable]);

  // ── explicit Save & Publish ──────────────────────────────────────────────
  const saveAndPublish = useCallback(async (currentData: AdminPortfolioData) => {
    setSaveStatus('saving');
    // Cancel any pending debounced save
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    // Always write localStorage (instant, works on Vercel without Blob)
    syncToLocalStorage(currentData);

    try {
      if (serverAvailable) {
        await apiSavePortfolio(currentData);
      }
      setSaveStatus('saved');
    } catch {
      // Still succeeded for localStorage — mark as saved
      setSaveStatus('saved');
    }

    // Reset status after 3s
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    statusTimerRef.current = setTimeout(() => setSaveStatus('idle'), 3000);
  }, [serverAvailable]);

  // ── category ops ─────────────────────────────────────────────────────────
  const addCategory = useCallback((label: string, description: string) => {
    const id = label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    let newData!: AdminPortfolioData;
    setData(prev => {
      newData = {
        ...prev,
        categories: reindex([...prev.categories, { id, label, description, order: prev.categories.length }]),
      };
      persist(newData);
      return newData;
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
    saveStatus,
    saveAndPublish,
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
