import React, { useEffect, useState } from 'react';

const DeferredCursorSparkles: React.FC = () => {
  const [Sparkles, setSparkles] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const canUseSparkles =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canUseSparkles) return;

    let cancelled = false;
    let timeoutId: number | undefined;
    let idleId: number | undefined;

    const loadSparkles = () => {
      import('./CursorSparkles').then((module) => {
        if (!cancelled) {
          setSparkles(() => module.default);
        }
      });
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(loadSparkles, { timeout: 2000 });
    } else {
      timeoutId = window.setTimeout(loadSparkles, 1200);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return Sparkles ? <Sparkles /> : null;
};

export default DeferredCursorSparkles;
