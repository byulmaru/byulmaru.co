<script lang="ts">
  import { resolve } from '$app/paths';
  import logoWhiteKorean from '$lib/assets/logo-white-korean.svg';

  type NavItem = {
    href: string;
    label: string;
  };

  let { navItems } = $props<{ navItems: readonly NavItem[] }>();
</script>

<footer class="w-full px-5 pb-10 pt-0 sm:px-8 sm:pb-12 lg:px-12">
  <div
    class="mx-auto flex w-full max-w-[1280px] flex-col gap-6 border-t border-white/10 px-3 py-8 text-white/55 sm:gap-8 sm:px-4 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-0 lg:py-16"
  >
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
      <a class="w-fit shrink-0" href={resolve('/')}>
        <img class="h-auto w-[7.75rem] opacity-55" src={logoWhiteKorean} alt="별마루" />
      </a>

      <nav aria-label="Footer" class="w-full lg:w-auto">
        <ul class="flex flex-wrap items-center gap-x-6 gap-y-2 text-base">
          {#each navItems as item (item.href)}
            <li>
              <a
                class="block px-0 py-1 font-['DM_Mono',monospace] tracking-[-0.01em] transition-colors hover:text-white/80"
                href={resolve(item.href)}
              >
                {item.label}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  </div>
</footer>
