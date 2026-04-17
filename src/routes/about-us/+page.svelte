<script lang="ts">
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
        '4년차 빛의 전사',
        'FF14 공대장 3년차 (5절클자)',
        'FF14 하드컨텐츠 공략 시트 & 시점 제작 (북미식 / 절에덴, 크루저급)',
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

<section class="px-5 pb-20 pt-8 sm:px-8 sm:pb-24 lg:px-12 lg:pt-12">
  <div class="mx-auto flex w-full max-w-6xl flex-col gap-14 sm:gap-18 lg:gap-24">
    <header class="flex flex-col items-center gap-8 text-center sm:gap-10">
      <h1
        class="max-w-5xl text-balance text-[clamp(2.4rem,7vw,5.5rem)] font-black leading-[0.95] tracking-[-0.04em] text-black"
      >
        <p>당사자의 시선으로</p>
        <p>생태계를 만듭니다.</p>
      </h1>

      <div
        class="max-w-3xl space-y-2 text-pretty text-base leading-7 text-white/80 sm:text-xl sm:leading-9"
      >
        <p>별마루는 동인 창작 문화의 당사자들이 모여 만든 팀입니다.</p>
      </div>
    </header>

    <section aria-label="Team layout preview" class="grid gap-5 lg:grid-cols-3 xl:gap-6">
      {#each profileCards as card (card.name)}
        <article
          class="rounded-[2rem] border border-white/25 bg-white/[0.03] px-6 py-8 shadow-[0_18px_60px_rgba(20,20,40,0.18)] backdrop-blur-[2px] sm:px-8 sm:py-10"
        >
          <div class="flex flex-col items-center text-center">
            <div
              class="mb-6 h-36 w-36 overflow-hidden rounded-full shadow-[0_16px_24px_rgba(25,25,45,0.22)] sm:h-40 sm:w-40"
            >
              <img
                class="h-full w-full object-cover"
                src={card.imageSrc}
                alt={`${card.name} profile`}
              />
            </div>

            <p class="mb-2 text-sm text-white/55 sm:text-base">{card.role}</p>
            <p class="mb-1 text-sm text-white/35">{card.name}</p>
            <h2 class="mb-3 text-3xl font-bold tracking-[-0.03em] text-white">{card.nickname}</h2>

            <ul class="w-full space-y-3 text-left text-base leading-7 text-white/75">
              {#each card.highlights as highlight (highlight)}
                <li class="flex gap-3">
                  <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-white/55"></span>
                  <span>{highlight}</span>
                </li>
              {/each}
            </ul>
          </div>
        </article>
      {/each}
    </section>
  </div>
</section>
