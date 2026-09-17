import AnimatedContent from './react-bits/AnimatedContent';
import ScrollReveal from './react-bits/ScrollReveal';

export function OriginQuote() {
  return <ScrollReveal phrases={['“있었으면 했던 공간을,', '함께 쓸 수 있는 공간으로.”']} />;
}

export function JourneyPreview() {
  return (
    <div
      className="journey-preview"
      role="group"
      aria-label="보고, 올리고, 답글로 이어지는 코스모 이야기"
    >
      <div className="journey-preview-card preview-read">
        <AnimatedContent distance={100} reverse duration={1.15}>
          <div className="preview-post post-image">
            <img
              src="/figma/hero-art-post.png"
              width="600"
              height="420"
              alt="직접 그린 파란 캐릭터와 토끼 낙서 게시물"
              loading="lazy"
            />
            <img className="post-avatar" src="/figma/emoji-book.png" alt="" />
          </div>
        </AnimatedContent>
      </div>
      <div className="journey-preview-card preview-write">
        <AnimatedContent distance={72} duration={0.95} delay={0.12}>
          <img
            src="/figma/composer.png"
            width="520"
            height="401"
            alt="낙서 이야기를 적는 글쓰기 미리보기"
            loading="lazy"
          />
        </AnimatedContent>
      </div>
      <div className="journey-preview-card preview-reply">
        <AnimatedContent distance={130} duration={1.35} delay={0.2}>
          <div className="preview-post post-image">
            <img
              src="/figma/hero-quote-post.png"
              width="600"
              height="260"
              alt="다른 사람의 이야기를 인용하며 말을 보태는 게시물"
              loading="lazy"
            />
            <img className="post-avatar" src="/figma/emoji-game.png" alt="" />
            <img className="post-quote-avatar" src="/figma/emoji-quote.png" alt="" />
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
}
