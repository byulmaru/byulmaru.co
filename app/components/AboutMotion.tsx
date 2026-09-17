import { motion, useReducedMotion, useSpring } from 'motion/react';
import { useId, useState } from 'react';

import { team } from './team';

// React Bits TiltedCard's pointer/spring mapping, limited to 3 degrees.
// Source and license: react-bits/MOTION-SOURCES.md and react-bits/LICENSE.md.
export function AvatarTip({ member }: { member: (typeof team)[number] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reduced = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 160, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 24 });
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };
  return (
    <div
      className="avatar-tip"
      onPointerLeave={() => {
        setOpen(false);
        reset();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false);
          reset();
        }
      }}
    >
      <motion.button
        type="button"
        className="avatar-tip-trigger"
        aria-label={`${member.name} 한 줄 소개`}
        aria-describedby={open ? id : undefined}
        style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setOpen(false);
          reset();
        }}
        onClick={() => setOpen(true)}
        onPointerEnter={() => setOpen(true)}
        onPointerMove={(event) => {
          if (reduced || event.pointerType !== 'mouse') {
            return;
          }
          const rect = event.currentTarget.getBoundingClientRect();
          rotateX.set(
            Math.max(
              -3,
              Math.min(3, ((event.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -3),
            ),
          );
          rotateY.set(
            Math.max(
              -3,
              Math.min(3, ((event.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 3),
            ),
          );
        }}
      >
        <img src={member.avatar} alt="" loading="lazy" />
      </motion.button>
      {open && (
        <motion.span
          className="avatar-tooltip"
          id={id}
          role="tooltip"
          initial={reduced ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.18 }}
        >
          {member.taste}
        </motion.span>
      )}
    </div>
  );
}

export function ExperienceTimeline() {
  const reduced = useReducedMotion();
  return (
    <ol className="experience-timeline" aria-label="유키의 운영·활동 이력">
      {[
        ['2017.10–', '플래닛 운영'],
        ['2023.08–2025.10', '펜슬컴퍼니 · 프로덕트 엔지니어'],
        ['현재', '별마루 팀장'],
      ].map(([date, title], i) => (
        <motion.li
          key={date}
          initial={reduced ? false : { y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : i * 0.12 }}
        >
          <span>{date}</span>
          <span>{title}</span>
        </motion.li>
      ))}
    </ol>
  );
}

export function ConvergingPaths() {
  const reduced = useReducedMotion();
  const clipId = useId();
  return (
    <div className="about-convergence" aria-hidden="true">
      <img className="convergence-art" src="/figma/about-navigate.png" alt="" loading="lazy" />
      <svg viewBox="0 0 420 280" fill="none">
        <defs>
          {team.map((member, i) => (
            <clipPath key={member.id} id={`${clipId}-${i}`}>
              <circle cx={364} cy={i * 98 + 42} r={30} />
            </clipPath>
          ))}
        </defs>
        {['M340 42 C190 42 230 140 94 140', 'M340 140 H94', 'M340 238 C190 238 230 140 94 140'].map(
          (d, i) => (
            <motion.path
              key={d}
              d={d}
              stroke={['#63d8ff', '#f47daa', '#ddf95b'][i]}
              strokeWidth={1.5}
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.65 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{
                duration: reduced ? 0 : 1.5,
                delay: reduced ? 0 : i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ),
        )}
        <path d="M94 140 H55" stroke="#cdc6da" strokeWidth={1.5} />
        <image href="/figma/kosmo-mark.svg" x={5} y={114} width={52} height={52} />
        {team.map((member, i) => (
          <image
            key={member.id}
            href={member.avatar}
            x={334}
            y={i * 98 + 12}
            width={60}
            height={60}
            clipPath={`url(#${clipId}-${i})`}
          />
        ))}
      </svg>
    </div>
  );
}
