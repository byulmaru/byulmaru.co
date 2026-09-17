import { LayoutGroup, motion, useInView, useReducedMotion, useSpring } from 'motion/react';
import type { ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

import { team } from './team';

const profiles = [
  { name: '모래', handle: '@morae', icon: 'emoji-book', post: 'work-post' },
  { name: '모래의 게임계', handle: '@morae_game', icon: 'emoji-game', post: 'work-game-post' },
  { name: '모래의 일상계', handle: '@morae_daily', icon: 'emoji-quote', post: 'work-daily-post' },
];
const ease = [0.22, 1, 0.36, 1] as const;

export function OperatingNotes() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="operating-notes"
      aria-label="팀이 직접 경험한 SNS"
      initial={reduced ? false : 'tilted'}
      whileInView="settled"
      viewport={{ once: true, amount: 0.45 }}
    >
      <img className="notes-art" src="/figma/work-nature.png" alt="" loading="lazy" />
      {[
        [
          '운영하며',
          '플래닛을 만들고 운영하며 사용자들이 머무르고 관계를 맺는 모습을 가까이에서 경험했습니다.',
        ],
        [
          '직접 쓰면서',
          '코스모에서는 사람들이 취향을 나누는 방식을 서비스에 맞추기보다, 서비스가 그 방식에 더 잘 맞았으면 좋겠어요.',
        ],
        ['관계를 생각하며', '하지만 어떤 취향은 모두에게 드러내기 부담스러울 수 있습니다.'],
      ].map(([label, text], i) => (
        <motion.blockquote
          key={label}
          variants={{
            tilted: { x: [-10, 8, -6][i], y: [8, -6, 10][i], rotate: [-5, 4, -3][i] },
            settled: { x: 0, y: 0, rotate: 0 },
          }}
          transition={{
            duration: reduced ? 0 : [1.25, 1.55, 1.4][i],
            delay: reduced ? 0 : [0.1, 0.18, 0.28][i],
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <span>{label}</span>
          <p>{text}</p>
          <cite>{team[i].name}</cite>
        </motion.blockquote>
      ))}
    </motion.div>
  );
}

export function ProfileSwitcherDemo() {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.55 });
  const id = useId();
  useEffect(() => {
    const update = () => setHidden(document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  useEffect(() => {
    if (!visible || paused || reduced || hidden || selected === profiles.length - 1) {
      return;
    }
    const timer = setTimeout(() => setSelected((value) => value + 1), 2800);
    return () => clearTimeout(timer);
  }, [visible, paused, reduced, hidden, selected]);
  const current = profiles[selected];
  return (
    <div ref={ref} className="work-switch-demo" role="region" aria-label="멀티 프로필 시연">
      <LayoutGroup id={id}>
        <div className="switch-demo-feed">
          <div className="demo-toolbar">
            <span>타임라인</span>
            <span>
              {current.name} {current.handle}
            </span>
          </div>
          <motion.img
            key={current.post}
            src={`/figma/${current.post}.png`}
            alt={`선택한 프로필 ${current.name}의 게시물`}
            initial={reduced ? false : { y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: reduced ? 0 : 0.6 }}
          />
          <div className="switch-context" aria-hidden="true">
            {profiles
              .filter((_, i) => i !== selected)
              .map((profile, i) => (
                <motion.img
                  layout={!reduced}
                  key={profile.post}
                  src={`/figma/${profile.post}.png`}
                  alt=""
                  initial={reduced ? false : { x: i ? -24 : 24, y: 20, rotate: i ? -3 : 3 }}
                  whileInView={{ x: 0, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduced ? 0 : 0.8, ease }}
                />
              ))}
          </div>
        </div>
        <motion.div
          className="switch-demo-menu"
          onFocusCapture={() => setPaused(true)}
          initial={reduced ? false : { y: 28, rotate: 3 }}
          whileInView={{ y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          {profiles.map((profile, i) => (
            <button
              key={profile.handle}
              type="button"
              aria-pressed={selected === i}
              onClick={() => {
                setPaused(true);
                setSelected(i);
              }}
            >
              {selected === i && (
                <motion.span
                  className="demo-selection"
                  layoutId="selection"
                  transition={{ duration: reduced ? 0 : 0.45, ease }}
                />
              )}
              <img src={`/figma/${profile.icon}.png`} alt="" />
              <span>
                {profile.name}
                <small>{profile.handle}</small>
              </span>
              <span aria-hidden="true">{selected === i ? '✓' : ''}</span>
            </button>
          ))}
          <span className="demo-account-note">한 계정 안의 세 프로필</span>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}

export function ComposerDemo() {
  const [kind, setKind] = useState(0);
  const reduced = useReducedMotion();
  return (
    <div className="composer-demo" role="region" aria-label="글쓰기 시연">
      <div className="work-demo-controls" aria-label="작성물 유형">
        {['짧은 근황', '낙서 첨부', '작품 소개'].map((label, i) => (
          <button type="button" key={label} aria-pressed={kind === i} onClick={() => setKind(i)}>
            {label}
          </button>
        ))}
      </div>
      <div className="composer-demo-card">
        <img src="/figma/composer.png" width="520" height="401" alt="코스모 원본 글쓰기 화면" />
        {kind === 2 && (
          <p className="composer-sample-copy">
            {
              '써둔 글은 여기에 모아둘게요.\n짧은 이야기도 종종 추가합니다.\n\n좋아하는 이야기를 쓰고 가끔 낙서합니다.\n업로드는 느긋하게.'
            }
          </p>
        )}
        {kind === 1 && (
          <motion.svg
            className="composer-doodle"
            viewBox="74 230 302 168"
            role="img"
            aria-label="파란 캐릭터와 토끼 낙서"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.35 }}
          >
            <image href="/figma/timeline.png" width="406" height="600" />
          </motion.svg>
        )}
      </div>
      <small className="work-demo-hint">시연 화면 · 실제로 게시되지 않아요</small>
    </div>
  );
}

// Reuse the restrained pointer/spring tilt already used by About avatars.
export function OfficialProfilePreview({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 160, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 24 });
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };
  return (
    <div
      className="official-profile-motion"
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== 'mouse') {
          return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        if (!rect.width || !rect.height) {
          return;
        }
        rotateX.set(
          Math.max(-2.5, Math.min(2.5, (0.5 - (event.clientY - rect.top) / rect.height) * 5)),
        );
        rotateY.set(
          Math.max(-2.5, Math.min(2.5, ((event.clientX - rect.left) / rect.width - 0.5) * 5)),
        );
      }}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <motion.a
        className="official-profile-preview"
        href="https://kos.moe/@kosmo"
        aria-label="코스모 공식 계정 방문하기"
        style={{
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformPerspective: 1000,
        }}
        onBlur={reset}
      >
        {children}
        <img className="official-profile-logo" src="/figma/kosmo-mark.svg" alt="" loading="lazy" />
      </motion.a>
    </div>
  );
}
