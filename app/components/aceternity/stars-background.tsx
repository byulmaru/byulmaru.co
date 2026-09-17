// Source: https://ui.aceternity.com/registry/stars-background.json
// Aceternity UI; see SOURCE.md for provenance and local integration changes.
'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface StarProps {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
  phase: number;
  color: string;
}

interface StarBackgroundProps {
  paused?: boolean;
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}

export const StarsBackground: React.FC<StarBackgroundProps> = ({
  paused = false,
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className,
}) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateStars = useCallback(
    (width: number, height: number): StarProps[] => {
      const area = width * height;
      const numStars = Math.floor(area * starDensity);
      return Array.from({ length: numStars }, () => {
        const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
        const tint = Math.random();
        return {
          color: tint < 0.7 ? '255, 255, 255' : tint < 0.85 ? '180, 235, 255' : '255, 200, 225',
          phase: Math.random() * Math.PI * 2,
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.55 + 0.65,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: shouldTwinkle
            ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
        };
      });
    },
    [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed],
  );

  useEffect(() => {
    const updateStars = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return;
        }

        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        setStars(generateStars(width, height));
      }
    };

    updateStars();

    const resizeObserver = new ResizeObserver(updateStars);
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    starDensity,
    allStarsTwinkle,
    twinkleProbability,
    minTwinkleSpeed,
    maxTwinkleSpeed,
    generateStars,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        const sparkle =
          !paused && star.twinkleSpeed !== null
            ? Math.pow(
                Math.max(0, Math.sin((Date.now() * 0.001) / star.twinkleSpeed + star.phase)),
                32,
              )
            : 0;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * (1 + sparkle * 0.7), 0, Math.PI * 2);
        const opacity = star.opacity + (1 - star.opacity) * sparkle;
        ctx.shadowColor = `rgb(${star.color})`;
        ctx.shadowBlur = sparkle * 7;
        ctx.fillStyle = `rgba(${star.color}, ${opacity})`;
        ctx.fill();
      });

      if (!paused) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stars, paused]);

  return <canvas ref={canvasRef} className={`h-full w-full absolute inset-0 ${className ?? ''}`} />;
};
