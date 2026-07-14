import type { CSSProperties, ReactElement } from 'react';
import { useEffect, useState } from 'react';

interface StarDescriptor {
  size: number;
  left: number;
  top: number;
  duration: string;
  delay: string;
  opacity: string;
}

type StarStyle = CSSProperties & {
  '--d': string;
  '--delay': string;
  '--op': string;
};

export function StarField(): ReactElement {
  const [stars, setStars] = useState<StarDescriptor[]>([]);

  useEffect(() => {
    // The prerender must stay deterministic and empty until client hydration creates randomness.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(
      Array.from({ length: 120 }, () => ({
        size: Math.random() * 2.2 + 0.5,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: `${(Math.random() * 4 + 2).toFixed(1)}s`,
        delay: `-${(Math.random() * 6).toFixed(1)}s`,
        opacity: (Math.random() * 0.5 + 0.3).toFixed(2),
      })),
    );
  }, []);

  return (
    <div className="stars" id="stars">
      {stars.map((star, index) => {
        const style: StarStyle = {
          width: star.size,
          height: star.size,
          left: `${star.left}%`,
          top: `${star.top}%`,
          '--d': star.duration,
          '--delay': star.delay,
          '--op': star.opacity,
        };

        return <div className="star" data-star style={style} key={index} />;
      })}
    </div>
  );
}
