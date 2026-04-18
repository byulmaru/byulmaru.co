<script lang="ts">
  import './layout.css';

  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';

  let { children } = $props();

  const navItems = [
    { href: '/', label: 'About Team' },
    { href: '/about-us', label: 'About us' },
    { href: '/our-work', label: 'Our Work' },
  ] as const;
</script>

<div class="flex min-h-screen w-full flex-col">
  <Header {navItems} />

  <main class="flex-1">
    {@render children()}
  </main>

  <Footer {navItems} />
</div>
