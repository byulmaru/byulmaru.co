<script lang="ts">
  import Divider from '$lib/components/Divider.svelte';
  import avatarHyeju from '$lib/assets/avatar-hyeju.jpg';
  import avatarJiyu from '$lib/assets/avatar-jiyu.png';
  import avatarYeeun from '$lib/assets/avatar-yeeun.png';

  const profileCards = [
    {
      imageSrc: avatarJiyu,
      role: '팀장 / 풀스택',
      name: '박지유',
      nickname: '유키',
      highlights: [
        '마스토돈 인스턴스 플래닛 운영 (2017.10~)',
        '주식회사 펜슬컴퍼니 프로덕트 엔지니어 (2023.08~2025.10)',
        '성 파블로프 재단 타임키퍼',
      ],
    },
    {
      imageSrc: avatarYeeun,
      role: '보안 / 풀스택 / 디자인',
      name: '이예은',
      nickname: '샤샤',
      highlights: [
        '사이버보안전공 (2021.03~)',
        '4년차 빛의 전사 (5절클)',
        'Stargazing for 18+ months...'
      ],
    },
    {
      imageSrc: avatarHyeju,
      role: 'DevOps / 풀스택',
      name: '정혜주',
      nickname: '헤헤즈',
      highlights: ['건축공학과 (2021.03~)', '원피스 고생물 영화(투메)'],
    },
  ] as const;
</script>

<svelte:head>
  <title>About us</title>
</svelte:head>

<section class="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-0 sm:px-8 lg:px-12 lg:pb-24">
  <section class="px-4 py-14 sm:px-8 sm:py-20 lg:px-0 lg:py-[7.5rem]">
    <div class="mx-auto flex w-full max-w-[1280px] flex-col gap-10 lg:gap-[3.5rem]">
      <header class="flex flex-col items-center gap-8 text-center lg:gap-10">
        <h1
          class="max-w-[1120px] text-balance font-['Noto_Sans_KR',sans-serif] text-[clamp(2.7rem,6vw,5.6rem)] font-bold leading-[0.96] tracking-[-0.05em] text-[#19192b]"
        >
          <span class="block">당사자의 시선으로</span>
          <span class="block">생태계를 만듭니다.</span>
        </h1>

        <div
          class="max-w-[72rem] text-pretty px-2 font-['Noto_Sans_KR',sans-serif] text-[1rem] leading-[1.9] tracking-[-0.015em] text-[#f4f1ff]/86 sm:text-[1.125rem] lg:text-[1.375rem]"
        >
          <p>별마루는 동인 창작 문화의 당사자들이 모여 만든 팀입니다.</p>
        </div>
      </header>
    </div>
  </section>

  <Divider />

  <section class="px-4 py-12 sm:px-8 lg:px-0 lg:py-[3.625rem]">
    <div class="mx-auto flex w-full max-w-[1280px] flex-col gap-8 lg:gap-9">
      

      <div
        class="rounded-[2rem] sm:px-5 sm:py-5 lg:px-4 lg:py-3"
      >
        <section aria-label="Team members" class="grid gap-4 lg:grid-cols-3 lg:gap-4">
          {#each profileCards as card (card.name)}
            <article
              class="flex h-full flex-col rounded-[1.75rem] border border-white/15 bg-[rgba(22,21,39,0.2)] px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-8 sm:py-9"
            >
              <div class="mb-7 flex flex-col items-center text-center">
                <div
                  class="mb-6 h-36 w-36 overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_18px_40px_rgba(18,18,34,0.28)] sm:h-40 sm:w-40"
                >
                  <img
                    class="h-full w-full object-cover"
                    src={card.imageSrc}
                    alt={`${card.name} profile`}
                  />
                </div>

                <p
                  class="mb-2 font-['Noto_Sans_KR',sans-serif] text-sm tracking-[-0.02em] text-white/58 sm:text-base"
                >
                  {card.role}
                </p>
                <p class="mb-1 font-['Noto_Sans_KR',sans-serif] text-sm text-white/32">
                  {card.name}
                </p>
                <h2
                  class="font-['Noto_Sans_KR',sans-serif] text-[2rem] font-bold tracking-[-0.04em] text-white"
                >
                  {card.nickname}
                </h2>
              </div>

              <ul
                class="grid gap-3 font-['Noto_Sans_KR',sans-serif] text-[0.95rem] leading-[1.75] tracking-[-0.01em] text-white/78 sm:text-base"
              >
                {#each card.highlights as highlight (highlight)}
                  <li class="flex gap-3">
                    <span class="mt-[0.72rem] h-1.5 w-1.5 shrink-0 rounded-full bg-white/55"></span>
                    <span>{highlight}</span>
                  </li>
                {/each}
              </ul>
            </article>
          {/each}
        </section>
      </div>
    </div>
  </section>

  
</section>
