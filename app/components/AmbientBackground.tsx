import { lazy, Suspense, useEffect, useState, useSyncExternalStore } from 'react';

import { ShootingStars } from './aceternity/shooting-stars';
import { StarsBackground } from './aceternity/stars-background';

const Silk = lazy(() => import('./react-bits/Silk'));
const subscribeHydration = () => () => {};

export function AmbientBackground() {
  const ready = useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false,
  );
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPaused(document.hidden || motion.matches);
    update();
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    return () => {
      document.removeEventListener('visibilitychange', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  return (
    <>
      <div className="ambient-background" aria-hidden="true" data-paused={paused}>
        {ready && (
          <Suspense fallback={null}>
            <div className="ambient-silk-layer">
              <Silk
                speed={7}
                scale={0.858}
                noiseIntensity={1.4}
                rotation={-Math.PI / 4 + 0.12}
                color="#63D8FF"
                paused={paused}
              />
            </div>
            <div className="ambient-silk-layer ambient-silk-overlay">
              <Silk
                speed={-5}
                scale={1.001}
                noiseIntensity={1.1}
                rotation={-Math.PI / 4 - 0.12}
                color="#F47DAA"
                paused={paused}
              />
            </div>
          </Suspense>
        )}
      </div>
      {ready && (
        <div className="ambient-stars" aria-hidden="true">
          <StarsBackground
            starDensity={0.000065}
            allStarsTwinkle={false}
            twinkleProbability={0.35}
            minTwinkleSpeed={1.5}
            maxTwinkleSpeed={3}
            paused={paused}
          />
          {!paused && (
            <ShootingStars
              minDelay={8000}
              maxDelay={14000}
              minSpeed={8}
              maxSpeed={14}
              starColor="#F7F3ED"
              trailColor="#63D8FF"
            />
          )}
        </div>
      )}
    </>
  );
}
