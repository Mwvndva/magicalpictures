import React, { useEffect, useRef } from 'react';

interface Sparkle {
  x: number; y: number; size: number;
  color: string; alpha: number; born: number;
}

const CursorSparkles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparkles = useRef<Sparkle[]>([]);
  const animFrame = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        sparkles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          size: Math.random() * 4 + 2,
          color: `hsl(${Math.random() * 360},100%,70%)`,
          alpha: 1,
          born: Date.now(),
        });
      }
      if (sparkles.current.length > 80) sparkles.current.splice(0, sparkles.current.length - 80);
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      sparkles.current = sparkles.current.filter(s => now - s.born < 700);
      for (const s of sparkles.current) {
        s.alpha = 1 - (now - s.born) / 700;
        s.y -= 0.5;
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      animFrame.current = requestAnimationFrame(loop);
    };

    // Only enable on non-touch devices
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (!isTouchDevice) {
      window.addEventListener('mousemove', onMove);
      animFrame.current = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }} />;
};

export default CursorSparkles;