import { PostCarousel } from '~/components/PostCarousel';

export function meta() {
  return [{ title: 'Our Work — 별마루' }];
}
export default function OurWork() {
  return (
    <div className="editorial work-page">
      <section className="site-container work-hero">
        <div className="copy">
          <h1>
            좋아하는 이야기가 여럿이어도,
            <br />
            계정까지 따로 만들
            <br />
            필요는 없도록.
          </h1>
          <p>
            장르마다, 활동마다 다른 프로필로 이야기해 보세요.
            <br className="desktop-break" /> 코스모는 하나의 계정에서 여러 프로필을 사용할 수 있는
            연합우주 SNS입니다.
          </p>
          <a className="site-button" href="https://kos.moe/@kosmo">
            코스모 소식 보기
          </a>
        </div>
        <PostCarousel product />
      </section>
      <section className="work-tinted">
        <div className="site-container work-bridge">
          <div className="copy">
            <span className="accent" />
            <h2>
              우리가 SNS를 쓰는 방식에,
              <br />
              조금 더 잘 맞도록.
            </h2>
            <p>
              플래닛을 운영하며, 기존 기능만으로는 채우기 어려운 순간들을 만났습니다. 코스모는
              작품을 나누는 일부터 사람들과 관계를 맺는 일까지, 우리가 실제로 쓰는 방식을 바탕으로
              다시 설계하고 있습니다.
            </p>
          </div>
          <img src="/figma/work-nature.png" alt="" loading="lazy" />
        </div>
      </section>
      <section className="site-container work-chapter">
        <div className="copy">
          <span className="accent" />
          <h2>
            작품 이야기는 이쪽에서,
            <br />
            일상 이야기는 저쪽에서.
          </h2>
          <p>
            글을 올리는 프로필, 게임 이야기를 나누는 프로필, 일상을 남기는 프로필. 계정을 새로
            만들지 않고, 한 계정 안에서 프로필을 바꾸어 사용해 보세요.
          </p>
          <p className="mockup-caption">
            개발 중인 화면으로, 정식 출시 시 일부 UI와 기능이 변경될 수 있습니다.
          </p>
        </div>
        <picture className="product-mockup switcher">
          <source media="(max-width: 767px)" srcSet="/figma/profile-switcher-mobile.png" />
          <img
            src="/figma/profile-switcher.png"
            alt="모래, 모래의 게임계, 모래의 일상계 게시물 위에 겹쳐 열린 프로필 선택창"
            loading="lazy"
          />
        </picture>
      </section>
      <section className="work-tinted">
        <div className="site-container work-chapter reverse">
          <div className="copy">
            <span className="accent blue" />
            <h2>
              이 글을 쓴 사람,
              <br />
              어떤 이야기를 더 했을까?
            </h2>
            <p>
              마음에 드는 게시물을 만났다면 프로필도 둘러보세요. 소개와 다른 게시물을 살펴보고, 다음
              이야기도 궁금하다면 팔로우해 보세요.
            </p>
          </div>
          <picture className="product-mockup work-profile">
            <source media="(max-width: 767px)" srcSet="/figma/work-profile-mobile.png" />
            <img
              src="/figma/work-profile.png"
              alt="소개와 게시물을 보고 팔로우할 수 있는 모래의 프로필"
              loading="lazy"
            />
          </picture>
        </div>
      </section>
      <section className="site-container work-chapter">
        <div className="copy">
          <span className="accent lime" />
          <h2>
            짧은 근황부터 완성한 작품까지,
            <br />
            이야기에 맞게 올려 보세요.
          </h2>
          <p>
            글만 가볍게 남기거나, 이미지와 함께 이야기를 전해 보세요. 공개 범위를 골라 누구에게
            보여줄지도 정할 수 있습니다.
          </p>
        </div>
        <img
          className="product-mockup composer"
          src="/figma/composer.png"
          alt="이야기를 작성하고 공개 범위를 설정하는 코스모 글쓰기"
          loading="lazy"
        />
      </section>
      <section className="work-tinted">
        <div className="site-container work-bridge federation">
          <div className="copy">
            <span className="accent" />
            <h2>
              새로운 공간에서도,
              <br />
              함께하던 사람들과.
            </h2>
            <p>
              코스모는 다른 서버와 연결되는 연합우주 SNS입니다. 서로 다른 서버에 있어도 팔로우하고,
              게시물과 답글로 이야기를 이어갈 수 있습니다.
            </p>
          </div>
          <img src="/figma/work-federation.png" alt="" loading="lazy" />
        </div>
      </section>
      <section id="kosmo-news" className="site-container kosmo-news">
        <div className="copy">
          <h2>
            코스모의 다음 이야기를,
            <br />
            함께해 주세요.
          </h2>
          <p>업데이트와 새로운 소식은 코스모 공식 계정에서 전합니다.</p>
          <a className="site-button" href="https://kos.moe/@kosmo">
            코스모 소식 보기
          </a>
        </div>
        <a
          className="official-profile-preview"
          href="https://kos.moe/@kosmo"
          aria-label="코스모 공식 계정 방문하기"
        >
          <img
            className="official-profile-capture"
            src="/figma/kosmo-official-profile.png"
            width="599"
            height="508"
            alt="코스모 공식 프로필 캡처 — @kosmo, 동인 창작 문화 향유자를 위한 SNS"
            loading="lazy"
          />
          <img
            className="official-profile-logo"
            src="/figma/kosmo-mark.svg"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        </a>
      </section>
    </div>
  );
}
