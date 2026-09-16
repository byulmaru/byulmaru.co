import { useState } from 'react';
import { Link } from 'react-router';

import { team } from '~/components/team';
import { useAboutSnap } from '~/components/useAboutSnap';

export function meta() {
  return [{ title: 'About us' }];
}
function Profile({ member }: { member: (typeof team)[number] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className={`profile section-rule ${member.id} ${expanded ? 'expanded' : ''}`}>
      <div className="profile-introduction">
        <div className="profile-identity">
          <img src={member.avatar} alt="" loading="lazy" />
          <div>
            <h2>{member.name}</h2>
            <p className="profile-role">{member.role}</p>
          </div>
          <p className="profile-taste">{member.taste}</p>
          <p className="profile-tags mobile-copy">{member.compactTags}</p>
        </div>
        <div className="profile-copy copy">
          <span className="accent" />
          <h3>{member.title}</h3>
          <p className="compact-copy">{member.compact}</p>
          <div className="full-intro" id={`${member.id}-intro`}>
            {member.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="profile-tags desktop-copy">{member.tags}</p>
        </div>
      </div>
      <div className="interview">
        <h3>Q. {member.question}</h3>
        <p className="interview-excerpt">{member.excerpt}</p>
        <div className="interview-answer" id={`${member.id}-answer`}>
          {member.answer.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`${member.id}-answer ${member.id}-intro`}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '인터뷰 접기' : '인터뷰 더 읽기'}
          <span aria-hidden="true">{expanded ? '−' : '+'}</span>
        </button>
      </div>
    </article>
  );
}
export default function AboutUs() {
  const snapRoot = useAboutSnap();
  return (
    <div ref={snapRoot} className="editorial about-page">
      <section className="site-container about-hero">
        <div className="copy">
          <h1>
            당사자의 시선으로,
            <br />
            오래 머물 수 있는 공간을
            <br />
            만듭니다.
          </h1>
          <p>
            별마루는 동인 창작 문화를 직접 향유해 온 세 사람이 모인 작은 팀입니다. 각자 다른 취향과
            경험에서 출발해, 좋아하는 것을 편안하게 이어갈 수 있는 공간을 함께 만들고 있습니다.
          </p>
        </div>
        <img src="/figma/about-painter.png" alt="" />
      </section>
      <section className="site-container profiles" aria-label="팀원 소개">
        {team.map((member) => (
          <Profile key={member.id} member={member} />
        ))}
      </section>
      <section className="site-container closing about-closing">
        <div className="copy">
          <h2>
            각자 다른 취향에서,
            <br />
            같은 방향을 바라봅니다.
          </h2>
          <p>세 사람이 함께 만드는 Kosmo의 다음 이야기를 만나보세요.</p>
          <div className="button-row">
            <Link className="site-button" to="/our-work">
              Kosmo 알아보기
            </Link>
            <a className="text-link" href="https://kos.moe/@kosmo">
              개발 소식 받기 →
            </a>
          </div>
        </div>
        <img src="/figma/about-navigate.png" alt="" loading="lazy" />
      </section>
    </div>
  );
}
