import React, { useEffect, useState, useRef } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  animationDuration: number;
  animationDelay: number;
}

const CursorSparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const sparkleId = useRef(0);
  const maxSparkles = 50; // Limit the number of sparkles

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newSparkle: Sparkle = {
        id: sparkleId.current++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 5 + 2, // Random size between 2px and 7px
        color: `hsl(${Math.random() * 360}, 100%, 80%)`, // Random bright color
        animationDuration: Math.random() * 0.5 + 0.5, // Animation duration between 0.5s and 1s
        animationDelay: Math.random() * 0.1, // Small random delay
      };

      setSparkles(prevSparkles => {
        const updatedSparkles = [...prevSparkles, newSparkle];
        // Remove oldest sparkles if exceeding limit
        if (updatedSparkles.length > maxSparkles) {
          return updatedSparkles.slice(updatedSparkles.length - maxSparkles);
        }
        return updatedSparkles;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Define sparkle keyframes using a style tag
  const sparkleKeyframes = `@keyframes sparkle-anim {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
  }`;

  return (
    <>
      <style>{sparkleKeyframes}</style>
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          style={{
            position: 'fixed',
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            borderRadius: '50%',
            pointerEvents: 'none', // Ensure sparkles don't interfere with interactions
            zIndex: 9999, // Ensure sparkles are on top
            animation: `sparkle-anim ${sparkle.animationDuration}s ease-out forwards`,
            animationDelay: `${sparkle.animationDelay}s`,
          }}
        />
      ))}
    </>
  );
};

export default CursorSparkles; 