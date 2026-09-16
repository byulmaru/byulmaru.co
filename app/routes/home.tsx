import { useEffect } from 'react';
import { Link } from 'react-router';

import { JourneyScenes } from '~/components/JourneyScenes';
import { PostCarousel } from '~/components/PostCarousel';
import { team } from '~/components/team';

export function meta() {
  return [{ title: 'Byulmaru' }];
}

const scenes = [
  {
    id: 'discovery',
    title: '무슨 이야기가 올라왔을까?',
    body: '짧은 근황부터 작업 중인 그림까지, 타임라인에서 사람들의 소식을 둘러보세요. 관심이 가는 사람은 팔로우하고 다음 소식도 받아볼 수 있습니다.',
    image: 'timeline',
    width: 406,
    height: 600,
    alt: '모래와 감자의 낙서와 일상 게시물이 있는 코스모 타임라인',
  },
  {
    id: 'expression',
    title: '오늘은\n어떤 이야기를 남길까요?',
    body: '방금 그린 그림이나 요즘 빠진 작품 이야기, 짧은 근황을 올려 보세요. 글과 이미지를 함께 올리고, 게시물의 공개 범위도 고를 수 있습니다.',
    image: 'composer',
    width: 520,
    height: 401,
    alt: '낙서 이야기를 작성하고 공개 범위를 선택하는 코스모 글쓰기 화면',
  },
  {
    id: 'connection',
    title: '이 이야기에\n어떤 말을 보탤까요?',
    body: '공감한 부분이나 궁금한 점을 답글로 남겨 보세요. 다른 사람에게도 소개하고 싶다면, 게시물을 인용해 내 생각을 덧붙일 수 있습니다.',
    image: 'thread',
    width: 400,
    height: 600,
    alt: '같은 낙서 이미지 아래 답글과 이모지 반응이 연결된 게시물',
  },
];
export default function Home() {
  useEffect(() => {
    const query = window.matchMedia?.(
      '(min-width: 1280px) and (min-height: 40rem) and (prefers-reduced-motion: no-preference)',
    );
    const origin = document.getElementById('origin');
    const heroContent = document.querySelector<HTMLElement>('.hero-columns');
    const originContent = [...(origin?.children ?? [])] as HTMLElement[];
    let settling = false;
    let lastWheel = 0;
    let distance = 0;
    let settleStarted = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;
    const cancel = () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      settling = false;
      distance = 0;
    };
    const finish = () => {
      if (Date.now() - lastWheel < 180 && Date.now() - settleStarted < 1800) {
        timer = setTimeout(finish, 180);
      }
      else {
        settling = false;
        distance = 0;
      }
    };
    const update = () => {
      const fits =
        originContent.every((item) => item.scrollHeight + 128 <= window.innerHeight) &&
        (heroContent?.scrollHeight ?? 0) + 262 <= window.innerHeight + 2;
      document.documentElement.classList.toggle(
        'home-intro-snap',
        Boolean(query?.matches && fits && origin && origin.getBoundingClientRect().top >= -2),
      );
      if (!query?.matches || !fits) {
        cancel();
      }
    };
    const wheel = (event: WheelEvent) => {
      if (
        !document.documentElement.classList.contains('home-intro-snap') ||
        !origin ||
        event.ctrlKey ||
        event.metaKey ||
        Math.abs(event.deltaX) >= Math.abs(event.deltaY) ||
        (event.target instanceof Element &&
          event.target.closest('input, textarea, select, [contenteditable="true"]'))
      ) {
        return;
      }
      const now = Date.now();
      if (now - lastWheel > 180) {
        distance = 0;
      }
      lastWheel = now;
      if (settling) {
        event.preventDefault();
        return;
      }
      const originTop = origin.getBoundingClientRect().top;
      const down = event.deltaY > 0;
      if ((down && originTop <= 2) || (!down && window.scrollY <= 2)) {
        return;
      }
      event.preventDefault();
      const delta =
        event.deltaY *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (Math.sign(distance) !== Math.sign(delta)) {
        distance = 0;
      }
      distance += delta;
      if (Math.abs(distance) < 32) {
        return;
      }
      settling = true;
      settleStarted = now;
      const start = window.scrollY;
      const target = down ? start + originTop : 0;
      const animate = () => {
        const progress = Math.min(1, (Date.now() - settleStarted) / 1100);
        const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
        window.scrollTo({ top: start + (target - start) * eased, behavior: 'instant' });
        if (progress < 1) {
          frame = requestAnimationFrame(animate);
        }
        else {
          finish();
        }
      };
      frame = requestAnimationFrame(animate);
    };
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
    [...originContent, ...(heroContent ? [heroContent] : [])].forEach((item) =>
      observer?.observe(item),
    );
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('keydown', cancel);
    window.addEventListener('pointerdown', cancel);
    window.addEventListener('touchstart', cancel, { passive: true });
    window.addEventListener('resize', cancel);
    query?.addEventListener('change', update);
    return () => {
      document.documentElement.classList.remove('home-intro-snap');
      observer?.disconnect();
      cancel();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('keydown', cancel);
      window.removeEventListener('pointerdown', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('resize', cancel);
      query?.removeEventListener('change', update);
    };
  }, []);
  return (
    <div className="editorial home-page">
      <div className="home-introduction">
        <section className="site-container home-hero">
          <div className="hero-columns">
            <div className="copy">
              <h1>
                좋아하는 마음이
                <br />
                새로운 만남으로
              </h1>
              <p>
                마음에 드는 작품을 발견하고, 만든 사람에게 감상을 전하는 일.
                <br className="desktop-break" /> 별마루는 그 만남이 이어지는 SNS, 코스모를 만듭니다.
              </p>
              <Link className="site-button" to="/our-work">
                Kosmo 알아보기
              </Link>
            </div>
            <PostCarousel />
          </div>
          <a className="scroll-cue" href="#origin">
            아래로 스크롤하세요 ↓
          </a>
        </section>
        <section id="origin" className="site-container origin section-rule">
          <div className="copy">
            <h2>
              우리도 쓰고 싶어서,
              <br />
              직접 만듭니다.
            </h2>
            <p>
              좋아하는 작품을 나누고 사람들과 이야기하면서,
              <br className="desktop-break" /> 조금 더 편했으면 하는 순간들이 있었습니다.
              <br className="desktop-break" /> 코스모는 그 아쉬움에서 시작합니다.
            </p>
            <blockquote>
              “있었으면 했던 공간을,
              <br />
              함께 쓸 수 있는 공간으로.”
            </blockquote>
          </div>
          <div className="origin-reasons">
            <img className="background-art" src="/figma/origin-art.png" alt="" />
            {[
              ['써 보니 아쉬웠던 것', '창작하고 감상을 나누며 느낀 불편에서 시작합니다.'],
              ['운영하며 알게 된 것', '커뮤니티를 직접 운영하며 쌓은 경험을 담습니다.'],
              ['계속 고쳐 나갈 것', '직접 쓰면서 발견한 불편을 하나씩 다듬어 갑니다.'],
            ].map(([title, body], i) => (
              <div className="origin-reason" key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="site-container journey-intro copy">
        <h2>
          보고, 올리고,
          <br />
          말을 건네는 곳.
        </h2>
        <p>
          타임라인에서 새로운 이야기를 만나고, 글과 이미지로 내 이야기를 남깁니다.
          <br className="desktop-break" /> 마음에 드는 게시물에는 반응을 남기거나 답글로 대화를
          시작해 보세요.
        </p>
      </section>
      <JourneyScenes>
        {scenes.map((scene) => (
          <section className={`site-container feature-scene ${scene.id}`} key={scene.id}>
            <div className="scene-copy copy">
              <h2>{scene.title}</h2>
              <p>{scene.body}</p>
              <img
                className="background-art"
                src={`/figma/${scene.id}-art.png`}
                alt=""
                loading={scene.id === 'discovery' ? 'eager' : 'lazy'}
              />
            </div>
            <img
              className={`product-mockup ${scene.image}`}
              src={`/figma/${scene.image}.png`}
              alt={scene.alt}
              width={scene.width}
              height={scene.height}
              loading={scene.id === 'discovery' ? 'eager' : 'lazy'}
            />
          </section>
        ))}
      </JourneyScenes>
      <section className="site-container home-team">
        <div className="copy">
          <h2>
            우리도 매일 쓰고 싶은
            <br />
            코스모를 만듭니다.
          </h2>
          <p>
            근황을 올리고, 좋아하는 것을 이야기하고, 반가운 글에 답글을 남깁니다. 그렇게 코스모를
            쓰는 일상이 더 나은 코스모를 만드는 시작이 됩니다.
          </p>
          <Link className="text-link" to="/about-us">
            팀에 대해 더 알아보기 →
          </Link>
        </div>
        <div className="team-rows">
          {team.map((member, i) => (
            <div className="team-row" key={member.id}>
              <img src={member.avatar} alt="" loading="lazy" />
              <div>
                <h3>{member.name}</h3>
                <p className="profile-role">{member.role}</p>
                <p>{member.short}</p>
              </div>
              <span className="team-number">0{i + 1}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="site-container closing home-closing">
        <div className="copy">
          <h2>
            코스모가
            <br />
            궁금해졌나요?
          </h2>
          <p>
            어떤 공간을 만들고 있는지, 무엇을 준비하고 있는지
            <br className="desktop-break" /> 조금 더 자세히 소개합니다.
          </p>
          <Link className="site-button" to="/our-work">
            코스모 더 알아보기 →
          </Link>
        </div>
        <img src="/figma/cta-art.png" alt="" loading="lazy" />
      </section>
    </div>
  );
}
