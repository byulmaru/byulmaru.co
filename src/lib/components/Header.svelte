<script lang="ts">
  import { MenuIcon, XIcon } from 'lucide-svelte';

  import { resolve } from '$app/paths';
  import logoBlackFull from '$lib/assets/logo-black-full.svg';

  type NavItem = {
    href: string;
    label: string;
  };

  let { navItems } = $props<{ navItems: readonly NavItem[] }>();

  let mobileMenuOpen = $state(false);
</script>

<header class="w-full px-5 py-6 sm:px-8 sm:py-7 lg:px-12 lg:py-6">
  <div
    class="mx-auto grid w-full max-w-[1280px] grid-cols-[1fr_auto] items-center gap-6 lg:grid-cols-[320px_1fr]"
  >
    <div class="flex items-center justify-between gap-4">
      <a class="w-fit shrink-0" href={resolve('/')}>
        <img class="h-auto w-40 sm:w-52 lg:w-[20rem]" src={logoBlackFull} alt="별마루 Byulmaru" />
      </a>

      <button
        type="button"
        class="flex h-12 w-12 items-center justify-center rounded-full text-black/80 lg:hidden"
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

    <nav aria-label="Primary" class="hidden lg:block">
      <ul class="flex items-center justify-center gap-10 px-10 py-4">
        {#each navItems as item (item.href)}
          <li>
            <a
              class="block px-1 py-1 font-['DM_Mono',monospace] text-base tracking-[-0.01em] text-black/85 underline underline-offset-4 transition-colors hover:text-black"
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
      class="mx-auto mt-4 w-full max-w-[1280px] rounded-3xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm lg:hidden"
    >
      <ul class="flex flex-col">
        {#each navItems as item (item.href)}
          <li>
            <a
              class="block rounded-2xl px-4 py-3 font-['DM_Mono',monospace] text-base text-black/85 transition-colors hover:bg-white/10"
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
