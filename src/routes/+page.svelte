<script lang="ts">
  import Divider from '$lib/components/Divider.svelte';

  const textRows = [
    {
      label: 'Mission',
      body: '저희의 미션은 뭘까요',
    },
    {
      label: 'Vision',
      body: '비전',
    },
    {
      label: 'Direction',
      body: '근데 뭐 필요없는ㄱ칸은 바꾸거나 없애고 재배치해도 되니까요~',
    },
  ] as const;
</script>

<svelte:head>
  <title>Byulmaru</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@500&family=Noto+Sans+KR:wght@400;500;700&family=Noto+Serif+KR:wght@400;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<section class="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-0 sm:px-8 lg:px-12 lg:pb-24">
  <section
    class="grid gap-12 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,699px)_301px] lg:items-center lg:gap-[4.1875rem] lg:px-[6.625rem] lg:py-[7.125rem]"
  >
    <div class="flex flex-col items-start gap-8">
      <h1
        class="font-['Noto_Serif_KR',serif] text-[clamp(2.7rem,6.9vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.05em] text-[#19192b]"
      >
        <span class="block">동인이 만드는,</span>
        <span class="block">동인을 위한 플랫폼</span>
      </h1>

      <p
        class="max-w-[24.75rem] font-['Noto_Sans_KR',sans-serif] text-[1.125rem] leading-[1.7] tracking-[-0.02em] text-black/60 sm:text-[1.5rem]"
      >
        클로드가 추천해준 배치를 해보고있어요.
      </p>
    </div>

    <div
      aria-hidden="true"
      class="mx-auto aspect-square w-full max-w-[18.8125rem] rounded-[1.875rem] bg-[rgba(255,255,255,0.9)] shadow-[0_12px_30px_rgba(29,29,49,0.08)]"
    ></div>
  </section>

  <Divider />

  <section class="px-4 py-[3.125rem] sm:px-8 lg:px-16">
    <blockquote
      class="border-l-4 border-[#22223b73] pl-8 font-['Noto_Serif_KR',serif] text-[clamp(2rem,4vw,2.5rem)] leading-[1.4] tracking-[-0.02em] text-[#22223b]"
    >
      “ 뭔가 멋진 말 ”
    </blockquote>
  </section>

  <Divider />

  <section class="px-4 py-12 sm:px-8 lg:px-16">
    <div class="grid gap-6">
      <div class="grid gap-6 lg:grid-cols-2">
        {#each textRows.slice(0, 2) as row (row.label)}
          <article
            class="min-h-[10.25rem] rounded-[1.875rem] border border-[#3c3b59] bg-white/[0.06] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <p
              class="mb-2 font-['DM_Mono',monospace] text-[0.75rem] leading-none tracking-[0.07em] text-white"
            >
              {row.label}
            </p>
            <p
              class="font-['Noto_Sans_KR',sans-serif] text-[1rem] leading-[1.75] tracking-[-0.005em] text-white/88 sm:text-[1.125rem]"
            >
              {row.body}
            </p>
          </article>
        {/each}
      </div>

      <article
        class="min-h-[10.25rem] rounded-[1.875rem] border border-[#3c3b59] bg-white/[0.06] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
      >
        <p
          class="mb-2 font-['DM_Mono',monospace] text-[0.75rem] leading-none tracking-[0.07em] text-white"
        >
          {textRows[2].label}
        </p>
        <p
          class="font-['Noto_Sans_KR',sans-serif] text-[1rem] leading-[1.75] tracking-[-0.005em] text-white/88 sm:text-[1.125rem]"
        >
          {textRows[2].body}
        </p>
      </article>
    </div>
  </section>

  <Divider />

  <section class="px-4 py-12 sm:px-8 lg:px-16">
    <article
      class="mx-auto grid max-w-[800px] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_4px_8px_rgba(0,0,0,0.02),0_6px_12px_rgba(0,0,0,0.03)] sm:grid-cols-[160px_minmax(0,1fr)]"
    >
      <div
        aria-hidden="true"
        class="flex min-h-[11.5rem] items-center justify-center bg-[radial-gradient(circle_at_50%_22%,#fff7de_0,#f5ebc2_24%,#e5d8ee_58%,#d6d0f0_100%)]"
      >
        <div
          class="h-24 w-24 rounded-full border border-black/10 bg-white/70 shadow-[0_14px_30px_rgba(32,31,61,0.12)]"
        ></div>
      </div>

      <div class="flex flex-col justify-center gap-6 p-6">
        <div class="flex flex-col gap-2">
          <h2
            class="font-['Noto_Sans_KR',sans-serif] text-[1.5rem] font-bold leading-[1.45] tracking-[-0.02em] text-black sm:text-[1.75rem]"
          >
            별마루에게 전하고 싶은 말이 있으신가요?
          </h2>
          <p
            class="font-['Noto_Sans_KR',sans-serif] text-[1.125rem] leading-[1.45] tracking-[-0.02em] text-black/55"
          >
            문의사항이나 개선점을 보내주세요.
          </p>
        </div>

        <a
          class="inline-flex w-full items-center justify-start rounded-xl bg-black/[0.03] px-4 py-2 text-left font-['Noto_Sans_KR',sans-serif] text-base font-medium tracking-[-0.01em] text-black shadow-[0_4px_5px_rgba(0,0,0,0.15)] transition hover:bg-black/[0.05] sm:w-auto sm:min-w-[12rem]"
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
