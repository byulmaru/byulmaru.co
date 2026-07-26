import logoWhiteKorean from '~/assets/logo-white-korean.svg';

export function TemporaryHome() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] px-5 py-6 text-[var(--color-text-primary)] sm:px-8 sm:py-8 lg:px-16 lg:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[1152px] flex-col border-t border-[var(--color-border-decorative)] sm:min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-6rem)]">
        <header className="py-6 sm:py-8">
          <img className="h-auto w-[7.75rem]" src={logoWhiteKorean} alt="별마루" />
        </header>

        <main className="flex flex-1 items-center py-16 sm:py-20">
          <div className="flex max-w-[48rem] flex-col items-start">
            <h1 className="text-balance font-['SUIT_Variable','SUIT',sans-serif] text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] font-[770] tracking-[-0.045em]">
              별마루는 지금 새 단장을 준비하고 있어요.
            </h1>

            <p className="mt-8 max-w-[42rem] font-['Pretendard_Variable','Pretendard',sans-serif] text-[clamp(1.0625rem,2vw,1.25rem)] leading-[1.7] tracking-[-0.008em] text-[var(--color-text-secondary)]">
              더 정확한 팀과 프로젝트 이야기를 담아 곧 돌아오겠습니다.
            </p>

            <a
              className="mt-12 inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--color-action)] px-6 py-3 font-['Pretendard_Variable','Pretendard',sans-serif] text-sm font-semibold tracking-[0.04em] text-[var(--color-on-signal)] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]"
              href="mailto:hello@byulmaru.co"
            >
              문의하기 →
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
