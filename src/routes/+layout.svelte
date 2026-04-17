<script lang="ts">
  import './layout.css';

  import { MenuIcon, XIcon } from 'lucide-svelte';

  import { resolve } from '$app/paths';
  import logoBlackFull from '$lib/assets/logo-black-full.svg';
  import logoWhiteKorean from '$lib/assets/logo-white-korean.svg';

  let { children } = $props();
  let mobileMenuOpen = $state(false);

  const navItems = [
    { href: '/', label: 'About Team' },
    { href: '/about-us', label: 'About us' },
    { href: '/our-work', label: 'Our Work' },
  ] as const;
</script>

<div class="flex min-h-screen w-full flex-col">
  <header class="w-full px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
    <div
      class="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
    >
      <div class="flex items-center justify-between gap-4 lg:w-auto lg:flex-1">
        <a class="w-fit shrink-0" href={resolve('/')}>
          <img class="h-auto w-48 sm:w-60 lg:w-76" src={logoBlackFull} alt="별마루 Byulmaru" />
        </a>

        <button
          type="button"
          class="flex h-12 w-12 items-center justify-center rounded-full lg:hidden"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
        >
          <span class="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
          {#if mobileMenuOpen}
            <XIcon class="h-5 w-5" strokeWidth={2.25} />
          {:else}
            <MenuIcon class="h-5 w-5" strokeWidth={2.25} />
          {/if}
        </button>
      </div>

      <nav aria-label="Primary" class="hidden w-full lg:block lg:w-auto">
        <ul class="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-5 lg:justify-center">
          {#each navItems as item (item.href)}
            <li>
              <a
                class="block px-3 py-2 text-base underline-offset-4 transition-colors hover:opacity-70 sm:px-5 sm:text-lg"
                href={resolve(item.href)}>{item.label}</a
              >
            </li>
          {/each}
        </ul>
      </nav>
    </div>

    {#if mobileMenuOpen}
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        class="mx-auto mt-4 w-full max-w-7xl rounded-3xl border border-black/10 bg-white/35 p-3 backdrop-blur-sm lg:hidden"
      >
        <ul class="flex flex-col">
          {#each navItems as item (item.href)}
            <li>
              <a
                class="block rounded-2xl px-4 py-3 text-base transition-colors hover:bg-black/5"
                href={resolve(item.href)}
                onclick={() => (mobileMenuOpen = false)}
              >
                {item.label}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    {/if}
  </header>

  <main class="flex-1">
    {@render children()}
  </main>

  <footer
    class="mt-16 w-full border-t border-white/40 px-5 py-8 text-white/55 sm:px-8 sm:py-10 lg:mt-24 lg:px-12"
  >
    <div
      class="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between"
    >
      <a class="w-fit shrink-0" href={resolve('/')}>
        <img class="h-auto w-24 sm:w-30" src={logoWhiteKorean} alt="별마루" />
      </a>

      <nav aria-label="Footer" class="w-full lg:w-auto">
        <ul class="flex flex-wrap items-center gap-x-4 gap-y-2 text-base sm:gap-x-8 sm:text-lg">
          {#each navItems as item (item.href)}
            <li>
              <a
                class="block px-2 py-1 transition-colors hover:text-white/80"
                href={resolve(item.href)}
              >
                {item.label}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  </footer>
</div>
