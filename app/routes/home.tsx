import { Divider } from '~/components/Divider';

export function meta() {
  return [{ title: 'Byulmaru' }];
}

export default function Home() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-5 pt-0 pb-20 sm:px-8 lg:px-12 lg:pb-24">
      <section className="grid gap-12 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,699px)_301px] lg:items-center lg:gap-[4.1875rem] lg:px-[6.625rem] lg:py-[7.125rem]">
        <div className="flex flex-col items-start gap-8">
          <h1 className="max-w-[699px] font-['Noto_Sans_KR',sans-serif] text-[clamp(2.45rem,5vw,4.375rem)] leading-[1.08] font-bold tracking-[-0.045em] text-[#19192b] lg:leading-[1]">
            <span className="block lg:whitespace-nowrap">동인이 만드는,</span>
            <span className="block lg:whitespace-nowrap">동인을 위한 플랫폼</span>
          </h1>

          <p className="max-w-[24.75rem] font-['Noto_Sans_KR',sans-serif] text-[1.125rem] leading-[1.7] tracking-[-0.02em] text-black/60 sm:text-[1.5rem]">
            {'동인을 위한 안전한 공간을 추구합니다. '}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="invisible mx-auto aspect-square w-full max-w-[18.8125rem] rounded-[1.875rem] bg-[rgba(255,255,255,0.9)] shadow-[0_12px_30px_rgba(29,29,49,0.08)]"
        />
      </section>

      <Divider />

      <section className="px-4 py-12 sm:px-8 lg:px-16">
        <article className="mx-auto grid max-w-[800px] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_4px_8px_rgba(0,0,0,0.02),0_6px_12px_rgba(0,0,0,0.03)] sm:grid-cols-[160px_minmax(0,1fr)]">
          <div
            aria-hidden="true"
            className="flex min-h-[11.5rem] items-center justify-center bg-[radial-gradient(circle_at_50%_22%,#fff7de_0,#f5ebc2_24%,#e5d8ee_58%,#d6d0f0_100%)]"
          >
            <div className="h-24 w-24 rounded-full border border-black/10 bg-white/70 shadow-[0_14px_30px_rgba(32,31,61,0.12)]" />
          </div>

          <div className="flex flex-col justify-center gap-6 p-6">
            <div className="flex flex-col gap-2">
              <h2 className="font-['Noto_Sans_KR',sans-serif] text-[1.5rem] leading-[1.45] font-bold tracking-[-0.02em] text-black sm:text-[1.75rem]">
                별마루에게 전하고 싶은 말이 있으신가요?
              </h2>
              <p className="font-['Noto_Sans_KR',sans-serif] text-[1.125rem] leading-[1.45] tracking-[-0.02em] text-black/55">
                문의사항이나 개선점을 보내주세요.
              </p>
            </div>

            <a
              className="inline-flex w-full items-center justify-start rounded-xl bg-black/[0.03] px-4 py-2 text-left font-['Noto_Sans_KR',sans-serif] text-base font-medium tracking-[-0.01em] text-black shadow-[0_4px_5px_rgba(0,0,0,0.15)] transition hover:bg-black/[0.05] sm:w-auto sm:min-w-[12rem]"
              href="https://mail.google.com/mail/?view=cm&to=hello@byulmaru.co"
              target="_blank"
              rel="noreferrer"
            >
              메일 보내기 →
            </a>
          </div>
        </article>
      </section>
    </section>
  );
}
