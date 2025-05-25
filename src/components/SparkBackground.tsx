import React, { useMemo } from 'react';

interface SparkBackgroundProps {
  count?: number;
  color?: string;
}

const SparkBackground: React.FC<SparkBackgroundProps> = ({ count = 100, color = 'rgba(255, 255, 255, 0.8)' }) => {
  const sparks = useMemo(() => {
    return Array.from({ length: count }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`, // Random size between 1px and 4px
      animationDelay: `${Math.random() * 2}s`, // Random delay for twinkling effect
      opacity: Math.random() * 0.5 + 0.5 // Random initial opacity
    }));
  }, [count]);

  const sparkKeyframes = `@keyframes twinkle {
    0%, 100% { opacity: var(--initial-opacity); }
    50% { opacity: 0; }
  }`;

  return (
    <>
      <style>{sparkKeyframes}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparks.map(spark => (
          <div
            key={spark.id}
            className="absolute rounded-full bg-white"
            style={{
              left: spark.left,
              top: spark.top,
              width: spark.size,
              height: spark.size,
              backgroundColor: color,
              opacity: spark.opacity,
              animation: `twinkle 2s infinite ease-in-out`,
              animationDelay: spark.animationDelay,
              '--initial-opacity': spark.opacity // Pass opacity as CSS variable
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
};

export default SparkBackground; 