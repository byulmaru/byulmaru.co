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

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@500&family=Noto+Sans+KR:wght@400;500;700&family=Noto+Serif+KR:wght@400;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="flex min-h-screen w-full flex-col">
  <Header {navItems} />

  <main class="flex-1">
    {@render children()}
  </main>

  <Footer {navItems} />
</div>
