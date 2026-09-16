import { Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

const homePosts = [
  {
    src: 'hero-post',
    alt: '별마루: AI가 내 일자리는 언제 뺏어주는 거야. 일단 이 버그부터 좀 가져가',
  },
  { src: 'hero-art-post', alt: '직접 그린 파란 캐릭터와 토끼 낙서를 올린 게시물' },
  { src: 'hero-quote-post', alt: '좋아하는 이야기를 나누는 코스모 게시물' },
];
const workPosts = [
  {
    src: 'work-post',
    alt: '모래: 어제 올린 글 뒷부분 조금 고쳤어요. 새벽에는 몰랐는데 아침에 보니까 너무 급했음',
  },
  {
    src: 'work-game-post',
    alt: '모래의 게임계: 친구 스샷 찍어주다가 내 접속 시간 끝남. 오늘도 즐거웠다',
  },
  { src: 'work-daily-post', alt: '모래의 일상계에서 나누는 일상 게시물' },
];

export function PostCarousel({ product = false }: { product?: boolean }) {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playRequested, setPlayRequested] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);
  const posts = product ? workPosts : homePosts;
  const playing = !paused && (!reduced || playRequested);
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query?.matches ?? false);
    const visibility = () => setHidden(document.hidden);
    update();
    visibility();
    query?.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      query?.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);
  useEffect(() => {
    if (!playing || hidden) {
      return;
    }
    const timer = window.setTimeout(() => setStep((value) => value + 1), step === 0 ? 2000 : 4000);
    return () => window.clearTimeout(timer);
  }, [playing, hidden, step]);
  return (
    <div className="post-carousel" role="region" aria-label="코스모 게시물 미리보기">
      <div className={`post-window ${product ? 'product-post-window' : ''}`}>
        {Array.from({ length: 5 }, (_, i) => step + i - 2).map((position) => {
          const post = posts[((position % posts.length) + posts.length) % posts.length];
          const offset = position - step;
          const ratios = product ? [0.31, 0.31, 0.31] : [0.31, 0.7, 0.434];
          const ratioAt = (value: number) => ratios[((value % 3) + 3) % 3];
          let distance = 0;
          for (let n = 0; n < Math.abs(offset); n++) {
            const from = step + n * Math.sign(offset);
            distance += (ratioAt(from) + ratioAt(from + Math.sign(offset))) / 2;
          }
          return (
            <div
              key={position}
              className={`carousel-post ${offset === 0 ? 'is-current' : ''}`}
              aria-hidden={offset !== 0}
              style={{
                transform: `translateY(calc(-50% + ${Math.sign(offset)} * (${distance} * (100cqw - 2 * var(--post-padding)) + ${Math.abs(offset)} * (2 * var(--post-padding) + 24px))))`,
              }}
            >
              <div className="post-image">
                <img src={`/figma/${post.src}.png`} alt={post.alt} />
                {!product && post.src !== 'hero-post' && (
                  <img
                    className="post-avatar"
                    src={`/figma/${post.src === 'hero-art-post' ? 'emoji-book' : 'emoji-game'}.png`}
                    alt=""
                  />
                )}
                {!product && post.src === 'hero-quote-post' && (
                  <img className="post-quote-avatar" src="/figma/emoji-quote.png" alt="" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="carousel-controls carousel-controls-single">
        <button
          type="button"
          aria-label={playing ? '자동 전환 일시정지' : '자동 전환 재생'}
          onClick={() => {
            setPaused(playing);
            if (!playing) {
              setPlayRequested(true);
            }
          }}
        >
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
